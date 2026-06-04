"""
Venture Co-op — Economy & Cap-Table Balance Sim (v1)
====================================================

Purpose
-------
Pressure-test the DESIGN.md systems before any UI:

  1. Is the CAP-TABLE math right? (the curriculum)
  2. Does the EXIT WATERFALL teach "win the company, lose personally"?
  3. Does "raise less" actually beat "raise more" at the same exit?
  4. Do participating prefs visibly hollow out the founder?
  5. Does SKILL (fate-deck quality) dominate LUCK across a run? (Pillar 3)

The cap-table model is rigorous (standard pre-money option-pool method +
a liquidation-preference waterfall with non-participating conversion). The
run-loop is intentionally lightweight — just enough to Monte-Carlo the
fate deck and confirm the loop teaches the right lesson.

Run:  python3 sim/economy_sim.py
All numbers are illustrative placeholders (see DESIGN.md §14).
"""

from __future__ import annotations
from dataclasses import dataclass, field
import random
import statistics


# ───────────────────────────────────────────────────────────────────────────
#  CAP TABLE  (the curriculum — modeled faithfully)
# ───────────────────────────────────────────────────────────────────────────

@dataclass
class Round:
    """One financing round's preferred stock."""
    name: str
    invested: float            # $ put in
    shares: float              # shares issued to this investor
    pref_multiple: float = 1.0 # 1x, 1.5x ...
    participating: bool = False
    seniority: int = 0         # higher = paid first (later rounds usually senior)


@dataclass
class CapTable:
    """
    Tracks ownership in SHARES. Founders + an option pool are common stock;
    each financing round is preferred stock.

    Uses the standard *pre-money option-pool* method: a pool top-up is created
    out of the pre-money, so it dilutes founders (and prior investors) — NOT
    the incoming investor. That is the "pool shuffle" lesson.
    """
    founder_shares: float = 10_000_000.0
    pool_shares: float = 0.0          # unallocated option pool (common)
    rounds: list[Round] = field(default_factory=list)

    def total_shares(self) -> float:
        return self.founder_shares + self.pool_shares + sum(r.shares for r in self.rounds)

    def founder_pct(self) -> float:
        return self.founder_shares / self.total_shares()

    def raise_round(self, name, pre_money, raise_amount,
                    pool_target_pct=0.0, pref_multiple=1.0, participating=False):
        """
        Execute a priced round.

        Solve for post-money fully-diluted total T such that:
          investor_shares = (raise / post) * T
          total_pool      = pool_target_pct * T   (unallocated pool as % of post)
          existing non-pool shares stay constant in count.
        """
        post = pre_money + raise_amount
        existing_non_pool = self.founder_shares + sum(r.shares for r in self.rounds)

        denom = 1.0 - pool_target_pct - (raise_amount / post)
        if denom <= 0:
            raise ValueError("Round terms imply >=100% dilution; infeasible.")
        T = existing_non_pool / denom

        investor_shares = (raise_amount / post) * T
        total_pool_after = pool_target_pct * T
        new_pool = max(0.0, total_pool_after - self.pool_shares)

        seniority = (max((r.seniority for r in self.rounds), default=0) + 1)
        self.pool_shares += new_pool
        self.rounds.append(Round(name, raise_amount, investor_shares,
                                 pref_multiple, participating, seniority))
        # sanity: investor now owns raise/post of the company
        return investor_shares / T


# ───────────────────────────────────────────────────────────────────────────
#  EXIT WATERFALL  (the climax — two-sided)
# ───────────────────────────────────────────────────────────────────────────

def exit_waterfall(cap: CapTable, exit_value: float):
    """
    Distribute exit proceeds through the liquidation-preference stack.

    Non-participating preferred takes MAX(preference, as-converted common).
    Participating preferred takes preference FIRST, then shares pro-rata in the
    rest (uncapped in v1). Seniority is stacked: highest seniority paid first.

    Returns {holder: {'invested', 'payout', 'moic'}} and the common $/share.
    Uses a fixpoint to resolve which non-participating prefs convert.
    """
    rounds = cap.rounds
    converted = {r.name: False for r in rounds}  # non-participating only

    per_share = 0.0
    pref_payout = {}
    for _ in range(200):
        remaining = exit_value
        pref_payout = {}
        # pay preferences from most senior to least
        for r in sorted(rounds, key=lambda x: -x.seniority):
            takes_pref = r.participating or (not converted[r.name])
            if takes_pref:
                p = min(remaining, r.pref_multiple * r.invested)
                pref_payout[r.name] = p
                remaining -= p
            else:
                pref_payout[r.name] = 0.0

        # who shares the residual as common?
        part_shares = sum(r.shares for r in rounds if r.participating)
        conv_shares = sum(r.shares for r in rounds
                          if not r.participating and converted[r.name])
        common_base = cap.founder_shares + cap.pool_shares + part_shares + conv_shares
        per_share = remaining / common_base if common_base > 0 else 0.0

        # re-decide conversions: a non-part converts if as-converted > its pref
        changed = False
        for r in rounds:
            if r.participating:
                continue
            should = (per_share * r.shares) > (r.pref_multiple * r.invested)
            if should != converted[r.name]:
                converted[r.name] = should
                changed = True
        if not changed:
            break

    results = {}
    for r in rounds:
        payout = pref_payout[r.name]
        if r.participating or converted[r.name]:
            payout += per_share * r.shares
        results[r.name] = {
            "invested": r.invested,
            "payout": payout,
            "moic": payout / r.invested if r.invested else 0.0,
            "converted": converted[r.name],
            "participating": r.participating,
        }
    results["Option Pool"] = {"invested": 0.0,
                              "payout": per_share * cap.pool_shares, "moic": 0.0}
    results["Founders"] = {"invested": 0.0,
                           "payout": per_share * cap.founder_shares, "moic": 0.0}
    return results, per_share


def carry(moic_payout: float, invested: float, carry_pct=0.20) -> float:
    """The partner's *personal* take: carry on the profit of that investment."""
    return max(0.0, moic_payout - invested) * carry_pct


# ───────────────────────────────────────────────────────────────────────────
#  SCENARIO BUILDERS  (illustrative v1 numbers — DESIGN.md §14)
# ───────────────────────────────────────────────────────────────────────────

# (name, pre_money, raise, pool_target_pct, pref_x, participating)
STANDARD_PATH = [
    ("Seed",     6_000_000,    1_500_000, 0.10, 1.0, False),
    ("Series A", 30_000_000,  10_000_000, 0.15, 1.0, False),
    ("Series B", 120_000_000, 30_000_000, 0.12, 1.0, False),
    ("Series C", 350_000_000, 60_000_000, 0.10, 1.0, False),
    ("Series D", 800_000_000, 120_000_000, 0.10, 1.0, False),
]

# Same company, but the founder over-raises (bigger checks, more dilution).
HOT_PATH = [
    ("Seed",     8_000_000,    3_000_000, 0.12, 1.0, False),
    ("Series A", 35_000_000,  20_000_000, 0.18, 1.0, False),
    ("Series B", 130_000_000, 60_000_000, 0.15, 1.0, False),
    ("Series C", 360_000_000, 120_000_000, 0.12, 1.0, True),   # participating creeps in
    ("Series D", 820_000_000, 250_000_000, 0.10, 1.5, True),   # 1.5x participating
]


def build(path) -> CapTable:
    cap = CapTable()
    for name, pre, amt, pool, prefx, part in path:
        cap.raise_round(name, pre, amt, pool, prefx, part)
    return cap


def fmt(n):  # money formatter
    return f"${n/1e6:,.1f}M"


# ───────────────────────────────────────────────────────────────────────────
#  DEMOS
# ───────────────────────────────────────────────────────────────────────────

def demo_cap_table_journey():
    print("=" * 74)
    print("DEMO 1 — Cap-table journey + two-sided Exit Waterfall")
    print("=" * 74)
    cap = build(STANDARD_PATH)
    pcts, c = CapTable(), cap
    # show founder ownership decaying round by round
    walk = CapTable()
    print(f"\n  Start: founders own {walk.founder_pct():6.1%}")
    for name, pre, amt, pool, prefx, part in STANDARD_PATH:
        walk.raise_round(name, pre, amt, pool, prefx, part)
        print(f"  After {name:9s} (raised {fmt(amt):>8}): "
              f"founders own {walk.founder_pct():6.1%}")

    total_pref = sum(amt for _, _, amt, _, _, _ in STANDARD_PATH)
    print(f"\n  (Total raised / liquidation-pref stack ≈ {fmt(total_pref)} — "
          f"watch what an exit below this does to the founder.)")
    for exit_value in (180_000_000, 300_000_000, 900_000_000):
        res, ps = exit_waterfall(cap, exit_value)
        tag = ("underwater" if exit_value < total_pref
               else "good" if exit_value < 5e8 else "great")
        print(f"\n  --- EXIT at {fmt(exit_value)} (company '{tag}') ---")
        print(f"  {'Holder':<13}{'Invested':>11}{'Walks out':>12}"
              f"{'MOIC':>7}   note")
        for h in ["Founders", "Seed", "Series A", "Series B",
                  "Series C", "Series D", "Option Pool"]:
            r = res[h]
            note = ""
            if h not in ("Founders", "Option Pool"):
                note = "converted→common" if r.get("converted") else "took pref"
                if r.get("participating"):
                    note = "participating"
            inv = fmt(r["invested"]) if r["invested"] else "—"
            moic = f"{r['moic']:.1f}x" if r["invested"] else "—"
            print(f"  {h:<13}{inv:>11}{fmt(r['payout']):>12}{moic:>7}   {note}")
        # partner carry on the seed investment (the deal-maker for that fund)
        seed = res["Seed"]
        print(f"  → Seed partner's personal carry (20%): "
              f"{fmt(carry(seed['payout'], seed['invested']))}")
        print(f"  → Founders keep {res['Founders']['payout']/exit_value:5.1%} "
              f"of the headline number.")


def demo_raise_less_counterfactual():
    print("\n" + "=" * 74)
    print("DEMO 2 — 'Raising more isn't winning' (same $600M exit)")
    print("=" * 74)
    exit_value = 600_000_000
    for label, path in (("Disciplined raises", STANDARD_PATH),
                        ("Over-raised / hot", HOT_PATH)):
        cap = build(path)
        res, _ = exit_waterfall(cap, exit_value)
        f = res["Founders"]["payout"]
        print(f"  {label:<20}: founders own {cap.founder_pct():5.1%} → "
              f"net {fmt(f):>8} at a {fmt(exit_value)} exit")
    print("  Lesson: bigger checks + worse terms can cost the founder millions")
    print("  at the SAME outcome — raising more is not the same as winning.")


def demo_participating_pref():
    print("\n" + "=" * 74)
    print("DEMO 3 — Participating vs non-participating pref (modest $120M exit)")
    print("=" * 74)
    exit_value = 120_000_000
    base = [("Seed", 6_000_000, 1_500_000, 0.10, 1.0, False),
            ("Series A", 30_000_000, 10_000_000, 0.15, 1.0, False),
            ("Series B", 120_000_000, 30_000_000, 1.0, 1.0, False)]
    for label, last in (("1x non-participating", (1.0, False)),
                        ("1x participating", (1.0, True)),
                        ("1.5x participating", (1.5, True))):
        path = base[:2] + [("Series B", 120_000_000, 30_000_000, 0.12,
                            last[0], last[1])]
        cap = build(path)
        res, _ = exit_waterfall(cap, exit_value)
        print(f"  Series B {label:<22}: founders net "
              f"{fmt(res['Founders']['payout']):>8}  |  "
              f"Series B walks {fmt(res['Series B']['payout']):>8} "
              f"({res['Series B']['moic']:.1f}x)")
    print("  Lesson: the SAME exit pays the founder very differently depending")
    print("  on terms they often don't fully understand when signing.")


# ───────────────────────────────────────────────────────────────────────────
#  RUN-LOOP MONTE CARLO  (does skill beat luck? — Pillar 3)
# ───────────────────────────────────────────────────────────────────────────

# Fate bands → progress multiplier applied to a Sprint's fit gain.
BANDS = {"Breakthrough": 2.0, "Momentum": 1.3, "Grind": 0.7,
         "Setback": 0.2, "Disaster": -0.6}


def make_deck(disciplined: bool):
    """Disciplined play thins downside & adds upside; reckless does the reverse."""
    if disciplined:
        return (["Breakthrough"] * 2 + ["Momentum"] * 6 + ["Grind"] * 3
                + ["Setback"] * 1 + ["Disaster"] * 0)
    return (["Breakthrough"] * 1 + ["Momentum"] * 2 + ["Grind"] * 3
            + ["Setback"] * 4 + ["Disaster"] * 2)


def simulate_run(disciplined: bool, rng: random.Random) -> float:
    """
    Ultra-light run: 12 Sprints with a cash flywheel. Each Sprint draws a fate
    band that scales fit progress; fit drives revenue, revenue extends runway.
    Reckless play grows FASTER when it works but burns more and has a worse
    deck → boom-or-bust. Disciplined play raises the floor. Returns founder $.
    """
    deck = make_deck(disciplined)
    fit = 0.0
    cash = 2_000_000.0                          # post a small seed
    burn = 400_000.0 if not disciplined else 250_000.0   # per Sprint
    base_gain = 16.0 if not disciplined else 11.0        # reckless swings bigger
    for _ in range(12):
        band = rng.choice(deck)
        fit = max(0.0, fit + base_gain * BANDS[band])
        revenue = fit * 12_000.0                # the flywheel: fit → revenue
        cash += revenue - burn
        if cash <= 0:
            return 0.0                          # ran out of capital → bust
    exit_value = (fit / 100.0) * 300_000_000.0  # fit maps to a valuation
    cap = build(STANDARD_PATH)
    res, _ = exit_waterfall(cap, exit_value)
    return res["Founders"]["payout"]


def demo_skill_beats_luck(n=4000):
    print("\n" + "=" * 74)
    print(f"DEMO 4 — Does SKILL beat LUCK? ({n} runs each)")
    print("=" * 74)
    for label, disc in (("Disciplined (good deck, lean burn)", True),
                        ("Reckless (bad deck, fast burn)", False)):
        rng = random.Random(42)
        outs = sorted(simulate_run(disc, rng) for _ in range(n))
        busts = sum(1 for o in outs if o == 0.0) / n
        p90 = outs[int(0.90 * n)]
        print(f"  {label:<38}: median {fmt(statistics.median(outs)):>8} | "
              f"top-10% {fmt(p90):>8} | bust {busts:4.0%}")
    print("  Lesson: reckless play can spike (fat right tail) but busts often;")
    print("  discipline raises the FLOOR. Outcomes track CHOICES, not the dice.")


if __name__ == "__main__":
    demo_cap_table_journey()
    demo_raise_less_counterfactual()
    demo_participating_pref()
    demo_skill_beats_luck()
    print("\n(All numbers illustrative — see DESIGN.md §14. This sim exists to")
    print(" check that the systems behave and teach, not to be balanced yet.)")
