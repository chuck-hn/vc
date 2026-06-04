# Venture Co-op — Game Design Document

> **Status:** Living design doc — vision & core systems locked in brainstorm; numbers and content TBD.
> **Studio:** Venture Co-op
> **Working title:** _TBD_ (see [Open Knobs](#open-knobs--todos))
> **Last updated:** 2026-06-04

---

## 1. Vision

A **solo, web-based founder's-journey game** that teaches the hard financial
truths of building a startup — the things exiting founders *wish they'd known
before they signed*. You play the entrepreneur, guiding one company from idea →
MVP → Seed → Series A–D → Exit or IPO.

The **soul is education**; the **body is a modern card/RPG game**. Inspired by
Robert Kiyosaki's *Cashflow* (financial literacy made legible and playable) and
by online trading-card-game platforms (the feel, drama, and "one more run" of
games like Slay the Spire, Marvel Snap, Hearthstone). The card-game machinery is
the vehicle that makes the lesson go down; the point is that a player finishes a
run *understanding something real* and restarts because they can **see a better
path they didn't take** — not because a leaderboard nags them.

### The thesis in one screen

The emotional and educational climax is the **Exit Waterfall**: at the end of a
run, the payout is dealt out *in order, in front of you* — liquidation
preferences, the preference stack, the option pool — and *then* common stock.
Your name. The number that's left. *"You built a $180M company and walked away
with $9M — here's exactly why."*

---

## 2. Design Pillars

1. **Teach the hidden half of the cap table.** Simple dilution is the visible
   half; **liquidation preferences, option-pool shuffles, and down-round
   anti-dilution** are the hidden half that actually determines net proceeds to
   founders. We model these faithfully. This is the curriculum.
2. **Show the whole table, both sides.** The waterfall also reveals what each
   *investor* made (their multiple/return) and what the *partner personally*
   made (carry) — so the player understands **why VCs behave the way they do**.
   Empathy through mechanics.
3. **Agency over luck — always.** An educational game must never teach "it's all
   luck." Skill must visibly dominate variance across a run, and the post-mortem
   must separate the two.
4. **Every random thing is either yours to build or yours to forecast.** No bolts
   from the blue.
5. **Interesting decisions, not filler.** The game lives in ~10–15 pivotal
   moments; the months between them run themselves.
6. **Replay is regret made legible.** The hook to play again is beating your own
   past self, now that you can see the road you didn't take.

---

## 3. The Player & The Goal

You are the **founder**. "VC" is the gauntlet you run, not the role you play.

### Win conditions
- Achieve a successful **Exit** (post–Series D), **or**
- File for an **IPO** with valuation ≥ $100M, **or**
- Reach **profitability** with a $100M+ valuation by the end of turn 48 of Phase 2.

…while **maximizing your outcome**. Crucially: you can "win" the company and
still lose *personally* (and vice versa). Personal outcome is its own scoreline.

### Lose conditions
- Run out of **capital** (runway hits zero), or
- Run out of **time** (turns) — a forced exit from your investors.

### Two outcome scorelines (you are taught the gap between them)
- **Company outcome** — exit/IPO valuation, the "headline number."
- **Personal outcome** — what *you* actually net, made of:
  - **Net proceeds** — your real cash from the Exit Waterfall (the headline lesson).
  - **Relationships** — standing with **investors, partners, and employees**
    (see §7). Not a vanity meter — a *lever on the financial model itself*.

---

## 4. Structure: Two Phases

| | **Phase 1 — The Search** | **Phase 2 — The Machine** |
|---|---|---|
| Goal | Build an MVP, find fit, raise Seed (or bootstrap) | Scale through Series A–D, then Exit or IPO |
| Turns | 24 (1 month each ≈ 2 years) | 48 (1 quarter each ≈ 12 years) |
| Your verb | **You** build & talk to users | You **delegate** through leaders you hire |
| Focus dials | Build / Users / Conserve (3 — see Open Knobs) | Eng / GTM / Sales departments |
| New systems | — | The **board** (investor directors), org scaling, live cap-table defense |
| Fate deck | small & **volatile** | larger & **steadier** (competence compounds) |
| Pivots | cheap, frequent | **expensive** (you have customers now) |
| The enemy | the unknown | your own scaling mistakes & the stack |

At turn 24, if the MVP is done, choose: **raise Seed** or **bootstrap** into
Phase 2. Phase 2 keeps the *same grammar* (set dials → run sprints → hit
crossroads) but transforms the *nouns and stakes* — it should feel like a
**promotion** from doer to leader, not a reskin.

---

## 5. The Core Loop

The clock advances in months/quarters, but the player only **steers**. Filler is
eliminated by two turn types.

> **Set** your Sprint plan → **Run** the montage → **Interrupts** fork you
> mid-run → **Crossroads** for the pivotal calls (draw fate) → **Phase shift**
> changes the dials & stakes → **End:** two-sided waterfall + counterfactual.

### 5.1 Sprints (the months between)
You set a plan, hit **Run**, and the clock fast-forwards month-by-month in a
short animated montage: income accrues, burn drains, Fit bars climb, the
**Weather** (§6.2) modulates how efficiently burn converts to progress. The
montage runs until it reaches the next Crossroads or trips an alarm.

The plan is built from:
- **Burn Aggression** — the master dial. Crank it → more Fit-progress per month,
  less runway. Ease off → safe but slow. The whole grow-fast-vs-don't-die tension
  in one slider.
- **Focus split** — how team effort is divided across the phase's dials.

Because you're locked in once you hit Run, the montage is *tension, not
passivity*: "will my runway reach the milestone?" **Agency lives at the
boundaries; the simulation runs the middle.**

### 5.2 Interrupts (mid-Sprint forks)
An event can pause the clock for a snap decision, e.g. *"A rival poached your
lead engineer: backfill now (−runway) or absorb it (−Fit)?"* Every interrupt is
sourced from **your fate deck** (accumulated risk coming due) or the **Weather**
(a forecastable climate shift) — never a third random bag (§6).

### 5.3 Crossroads (the ~10–15 pivotal moments)
Full-attention, high-stakes decisions: each **raise**, **pivot**, **crisis**,
**key hire**, and the **exit**. **This is where you draw fate** (§6.1). Before
the draw, you see the odds your own deck implies — creating the core tension:
**ship one more win to improve the deck, or gamble now because runway's short?**

---

## 6. Resources & Randomness

### 6.1 Runway is the clock (the economy)
The master resource is **months of runway**, not dollars. Every choice is priced
in runway. We deliberately **drop the "capital = mana" metaphor**: startup
capital doesn't refresh each turn, it *depletes* until a lump-sum raise. This is
a *Cashflow* economy, not a TCG one.

- **Income** — MRR (Phase 1) / ARR (Phase 2) accrues each Sprint month (the
  "paycheck"), softening net burn.
- **Burn** — team + admin + projects, drains each month.
- **Raises** — lumps that buy runway months in exchange for **equity** (the
  cap-table cost; see §8).

### 6.2 Two honest layers of randomness
Three RNG sources collapse into two, each with a *distinct player relationship*:

- **The Fate Deck — you build it.** A deck stocked entirely through play, drawn
  only at Crossroads to resolve *uncertain attempts* (raises, milestone
  attempts, big bets). Skill = deck quality.
  - **Legibility is mandatory** (the central metaphor dies if it's opaque):
    - Always-on tally: `Momentum ×6 · Setback ×3 · Disaster ×1`.
    - Inline causality the instant the deck changes: *"Skipped code review →
      +1 Setback,"* *"Hired an A-player CTO → +2 Momentum, −1 Disaster."*
    - Crossroads odds preview before every draw.
    - **Deck thinning:** great operators don't just *add* Momentum, they
      *remove* Setback/Disaster — teaching that strong teams **delete downside**.
  - **Graduated outcomes**, never binary: each draw maps to a band
    (crit / success / partial / setback / disaster) so a turn rarely yields
    *nothing*.
  - **Variance shrinks as you grow:** upskilling both lowers thresholds and
    narrows the outcome band. Mastery = predictability.
- **The Weather — you forecast it.** Market dynamics are a *visible, forecasted
  climate*, not a hidden roll. *"Funding winter in ~1–2 quarters: valuations
  down, raises harder."* You can see it coming and prepare (raise early, cut
  burn, bank runway). It changes **prices and thresholds; it never instakills.**

Old "Life/Business/Market events" now resolve into *either* a fate card (your
risk coming due) *or* a Weather shift. **No bolts from the blue.**

---

## 7. Relationships (a lever, not a vanity meter)

Three tracks — **Investors, Partners, Employees** — that *bend the financial
model itself*:

- **Investor relationships → term friendliness.** A trusted investor offers
  **1× non-participating** instead of participating preferred, a cleaner
  option-pool refresh, a founder-friendly **bridge** when you're drowning, warm
  intros to the next round. Good relationships literally reshape the waterfall in
  your favor; burned ones punish you via the stack later.
- **Partner relationships (cofounders / strategic) → execution & deal flow.**
  Discord slows projects and tanks Fit bars; alignment speeds milestones and
  unlocks better opportunities.
- **Employee relationships → retention, option-pool pressure, key-person risk.**
  Treat the team well and your burn buys more progress; neglect them and a key
  departure stalls a round.

The non-obvious lesson: **how you treat the table is itself a financial
instrument.** The soft stuff shows up, hard, in the waterfall.

---

## 8. The Cap Table (the curriculum — modeled faithfully)

We go **deep here** specifically, while keeping everything else approachable.
The model includes:

- **Dilution** per round (the visible half).
- **Liquidation preferences & the preference stack** — 1× vs. participating;
  stacked by round. *The real reason a $100M exit can pay the founder almost
  nothing.*
- **Option-pool shuffle** — the employee pool that comes out of *your* slice,
  pre-money, each round.
- **Anti-dilution / down rounds** — raise high, miss, raise lower → ratchet /
  weighted-average provisions quietly transfer ownership away from you.

### 8.1 The Exit Waterfall (the climax)
At exit, the payout is dealt **in order, on screen**, two-sided:

| At the exit | Put in | Walked out with | What it *meant* |
|---|---|---|---|
| **You (founder)** | years + the idea | net cash, final % | life-changing — or a letdown vs. what you pictured |
| **Each investor** | their checks | their multiple / return | why the seed investor (most risk) made the most ×, and why the late investor demanded the pref |
| **The partner, personally** | championed you | **carry** | why they pushed you to swing bigger |

Two lessons land at once: the **power law from the VC's seat** (the terms are
downside protection, not villainy), and **carry** (the partner needs your
*enormous* outcome, not merely your *good* one).

### 8.2 The Counterfactual (the replay engine)
After the waterfall, show the road not taken — *"Had you raised $8M instead of
$20M at Series B, you'd have held 31% instead of 14% and netted ~$25M more at
this same exit."* And — critical for Pillar 3 — replay the run **holding luck at
"average"** to separate outcome-from-decisions from outcome-from-variance, so the
player attributes the result correctly. The hook to run it back: **beat your past
self**, not a stranger.

---

## 9. Progression Within a Run

- **Founder card** — your hero/identity; a starting skill that *reveals factual
  knowledge* (a teaching channel) plus starting personal capital.
- **Idea / Opportunity card** — your starting archetype; the game sets its
  business model, TAM, and industry multiple.
- **Fit bars** — Vision/Founder, Problem/Solution, Product/Market — the gates
  that determine fundraising success (Seed: moderate P/S + Vision; Series A:
  high PMF; Series B–D: all bars high).
- **Upskilling** — Engineering / Finance / Sales / Marketing / Design, three
  levels ($5K / $25K / $50K). Higher skill lowers thresholds and narrows the
  fate band.
- **Talent** — B / A / S players. S-players occasionally surface strategy hints
  (teaching channel; rate-limited so as not to overwhelm).
- **Pedagogy (leaning):** *burn first, explain in the post-mortem.* Concepts are
  learned by getting burned and fully understood at the waterfall — this teaches
  harder and fuels replay. (See Open Knobs — this is a values call about audience.)

---

## 10. Open Knobs & TODOs

These are deliberately unresolved; flagged so we don't pretend they're decided.

- [ ] **Game title** (studio is Venture Co-op).
- [ ] **# of Phase 1 focus dials** — provisionally **3** (Build / Users /
      Conserve) to avoid analysis paralysis. _(Judgment call — revisit.)_
- [ ] **Weather forecast horizon** — provisionally **~1–2 quarters** of partial
      visibility. Pure tuning dial: more foresight = gentler & more teaching;
      less = harsher. _(Judgment call — revisit.)_
- [ ] **Pedagogy dosage** — confirm "burn first, explain in post-mortem" vs.
      warning players *before* they sign (gentler, less punishing).
- [ ] **Session length target** — "like Cashflow online" implies a settle-in
      30–60 min run; confirm and design pacing to it.
- [ ] **Fate deck stocking — exact rules.** Which specific actions add/remove
      which cards, and the starting composition per Idea archetype. _(Next
      brainstorm topic.)_
- [ ] **Idea / sector archetypes** — the card pools that make each run feel
      different (B2B SaaS, marketplace, …). _(Next brainstorm topic.)_
- [ ] **All numbers** — burn, income curves, valuations, pref multiples, fate
      band thresholds. Recommend a paper/spreadsheet economy sim before UI.

---

## 11. Inspirations

- **Cashflow** (Robert Kiyosaki) — financial literacy made legible & playable;
  the settle-in turn cadence; income statement / balance sheet as the heart.
- **Modern RPG / trading-card platforms** (Slay the Spire, Marvel Snap,
  Hearthstone, etc.) — the deck-as-identity, deck-as-probability feel; drama and
  "one more run"; the polished web-platform presentation.
