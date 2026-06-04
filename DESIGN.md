# Venture Co-op — Game Design Document

> **Status:** Living design doc — vision & core systems locked; **v1 first-pass** of fate-deck rules, idea archetypes, and economic skeleton drafted (§12–14). Numbers are illustrative placeholders pending a balance sim.
> **Studio:** Venture Co-op
> **Working title:** **"Cap Table"** _(v1 placeholder — shortlist & decision in §10)_
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

v1 first-pass calls are made below; ✅ = decided for v1 (still revisitable),
⬜ = still genuinely open.

- ⬜ **Game title** — v1 working title **"Cap Table"** (nails the curriculum and
      is ownable). **Shortlist for your pick:** *Cap Table · Runway · Down Round ·
      Founder's Share · The Waterfall · Carry · Term Sheet.* _(Your creative call —
      confirm or override.)_
- ✅ **# of Phase 1 focus dials = 3** (Build / Users / Conserve). _(Revisit if
      playtests feel thin.)_
- ✅ **Weather forecast horizon ≈ 1–2 quarters** of partial visibility. _(Pure
      tuning dial.)_
- ✅ **Pedagogy = "burn first, explain in post-mortem"** — **with a safety net:**
      a dismissible **red-flag warning** before the truly punishing, irreversible
      cap-table mistakes (e.g. stacking participating prefs), so players don't lose
      40 turns later to something they never had a chance to understand. Everything
      else is learned by getting burned. (See §15.)
- ✅ **Session length ≈ 30–60 min** per full run ("like Cashflow online"): ~10–15
      Crossroads, Sprint montages a few seconds each. A faster "quick run" and a
      longer "campaign" mode are post-v1 ideas.
- ✅ **Fate-deck stocking rules** — first-pass spec in **§12**.
- ✅ **Idea / sector archetypes** — first-pass set of five in **§13**.
- ✅ **Economic skeleton** (burn, raises, valuations, pref multiples, fate bands)
      — illustrative v1 numbers in **§14**. **Still need a balance sim** before any
      of these are trustworthy.

---

## 12. Fate Deck — v1 Rules

The fate deck is the **core verb**: your choices stock it, and at Crossroads you
draw from it to resolve uncertain attempts. v1 spec below.

### 12.1 The five bands (cards map to graduated outcomes)
| Card | Outcome band | Role |
|---|---|---|
| **Breakthrough** | crit success | rare; earned by excellence — outsized Fit/revenue gain, sometimes a free term concession |
| **Momentum** | success | the backbone — solid progress |
| **Grind** | partial | the neutral filler — some progress, but slow or costly |
| **Setback** | failure | earned by cutting corners / overspending — lost time, a relationship ding |
| **Disaster** | crit failure | rare; earned by recklessness / ignored warnings — runway shock, a forced down round, can spawn a second Setback |

### 12.2 Starting composition (small & volatile in Phase 1)
Base Phase-1 deck ≈ **8 cards**: `Breakthrough ×1 · Momentum ×2 · Grind ×3 ·
Setback ×2 · Disaster ×0`. A small deck means each draw swings hard — the chaos
of zero-to-one. (Each Idea archetype tweaks this; see §13.) By late Phase 2 the
deck grows to ~16–20 and **stabilizes** (more Momentum, thinned Setbacks), so
variance compresses as competence compounds.

### 12.3 How cards enter, leave, and upgrade (the verb)
- **Burn Aggression is the central tradeoff:** cranking it yields more
  Fit-progress per month *but shuffles in Setback cards*. Speed literally
  poisons your luck — aggression is never free.
- **Quality execution** (code review, user research, proper hiring process) →
  +Momentum, and upgrades `Grind → Momentum`.
- **Recklessness / ignored red flags / zero runway buffer** → +Disaster.
- **A-/S-player hires** → **thin the deck**: remove Setback/Disaster *and* add
  Momentum. Great teams delete downside (Pillar of §6.2).
- **Upskilling** → upgrades (`Setback → Grind`, `Grind → Momentum`) and narrows
  band severity.
- **Relationships** → investor trust grants a **mulligan** at a raise; partner
  alignment adds Momentum; employee neglect adds Setback.
- **Weather** → bad climate *temporarily* injects "market" Setback cards that
  flush out when the climate passes (downturns worsen luck, recoverably).
- **Pivots** → partial reshuffle: discard a chunk of the deck (clears accumulated
  Setbacks *and* Momentum) for a fresh-but-costly start.

### 12.4 Drawing at a Crossroads
- Each check has a **difficulty** set by the Fit-bar gate for that round.
- **Advantage / disadvantage from your margin:** clear the gate comfortably →
  draw 2, keep the better; attempt while under-qualified ("reaching") → draw 2,
  keep the worse. This ties Fit bars directly to luck.
- **Odds preview** before every draw: deck composition shown as
  `≈ 60% Momentum+ / 30% Setback / 10% Disaster`, so the player faces the core
  tension — **ship one more win to improve the deck, or gamble now because
  runway's short.**
- **Anti-helplessness (Pillar 3):** cash reserves, investor trust, or "prepared"
  status can re-draw or **downgrade a Disaster to a Setback.** A careful player is
  never truly helpless — they bought insurance. This teaches risk management.
- Most cards reshuffle after use; Breakthroughs may be **consumed** (one-time).

> _TODO: exact gain/loss magnitudes per band, advantage thresholds, and how many
> cards a pivot discards — all pending the balance sim (§14)._

---

## 13. Idea / Sector Archetypes — v1

Each archetype is a different **risk/reward shape** that teaches a different
financial lesson. It sets capital/knowledge intensity (burn shape), TAM &
multiple (valuation), which Fit bar gates hardest, and a starting fate-deck
tweak. v1 ships **five**; more are a post-v1 content pool.

| Archetype | Capital / Knowledge | Gating Fit bar | Fate-deck flavor | Teaches |
|---|---|---|---|---|
| **B2B SaaS** | moderate / high | Problem/Solution (long sales cycles) | steady (fewer Breakthroughs *and* Disasters) | capital efficiency, recurring revenue & retention, the slow grind to enterprise traction |
| **Marketplace** | high / moderate | Initial Market Traction (liquidity) | volatile (more Breakthroughs *and* Disasters) | network effects, the cold-start (chicken-and-egg) problem, why marketplaces raise big |
| **Consumer App** | low-start / moderate | Product/Market (engagement & retention) | extreme variance, small deck (lottery ticket) | virality, the "great engagement, no revenue" trap, why VCs want a waitlist first |
| **Deep Tech / Hardware** | very high / very high | Vision/Founder + technical milestones | front-loaded Disasters, game-changing Breakthroughs | capital intensity, long runways, milestone de-risking, **the biggest dilution lesson** |
| **Fintech** | high / high | compliance & trust milestones | low Breakthrough, rare-but-severe Disaster (tail risk) | regulated-market risk, trust as a moat, catastrophic single-point failures |

The game still sets each run's **default business model, TAM, and industry
multiple** (which scales with revenue) on top of the Founder card's starting
skill & capital, per the original design.

> _TODO: per-archetype starting numbers (burn curve, TAM size, multiple range,
> exact deck tweak) — feed the balance sim (§14)._

---

## 14. Economic Skeleton — v1 (illustrative placeholders)

**⚠️ These numbers are first-pass and almost certainly unbalanced.** Their only
job is to make the systems concrete enough to prototype. A paper/spreadsheet
economy sim should replace them before any UI work.

### 14.1 Capital & burn (Phase 1)
- Starting personal capital: **$50K–$150K** (set by Founder card).
- Monthly burn: **$10K–$40K** depending on team size & admin.
- Goal: reach MVP + first traction inside 24 months without hitting $0.

### 14.2 Funding rounds (illustrative)
| Round | Raise | Post-money | ~Dilution | Default pref (founder-friendly baseline) |
|---|---|---|---|---|
| Seed | $0.5–2M | $4–8M | ~20–25% | 1× non-participating |
| Series A | $5–15M | $20–60M | ~20% | 1× non-participating |
| Series B | $20–40M | $80–200M | ~18% | 1× non-participating |
| Series C | $40–80M | $200–600M | ~15% | 1× (participating creeps in if you're "reaching") |
| Series D | $80–150M | $600M–1.5B | ~12% | 1×–1.5×, participation more likely |

- **Option pool:** 10–20% refreshed **pre-money** each round (comes out of *your*
  slice — the shuffle).
- **Tough Weather or under-qualified raises** push terms worse: participating
  prefs, higher multiples, anti-dilution ratchets, bigger pool refreshes — the
  levers that hollow out the founder's waterfall.

### 14.3 Upskilling (from the original design — kept)
- Level 1 (B-player): **$5K** · Level 2 (A-player): **$25K** · Level 3
  (S-player): **$50K**. Adds +3/+1 effective turns in Phase 1/2 (L1–2) or +6/+2
  (L3); L3 surfaces a strategy hint ~once every 6 turns.

### 14.4 Fate band effects (placeholder magnitudes)
- Breakthrough: ++Fit / ++revenue, occasional free term concession.
- Momentum: +Fit progress on the focused dial.
- Grind: small +Fit but +extra runway cost.
- Setback: lose ~1 month of progress and/or a relationship tick.
- Disaster: runway shock (e.g. −3–6 months), possible forced down round, may
  spawn a Setback.

> _TODO: the actual balance sim — convert all ranges above into tuned curves and
> verify the loop is fun and the math teaches the intended lessons._

---

## 15. Pedagogy — v1 Dosage

**Burn first, explain in the post-mortem** — concepts are learned by getting
burned and fully understood at the waterfall; this teaches harder and fuels
replay. **One safety net:** a **dismissible red-flag warning** fires before the
*truly punishing, irreversible* cap-table mistakes (stacking participating prefs,
accepting a full ratchet, an over-large pool refresh). The player can wave it
away and learn the hard way — but they always had the chance to understand the
stakes. Teaching channels that already exist reinforce this: **Founder-card
skills** that reveal factual knowledge, and **S-player mentors** (rate-limited
hints). The **post-mortem counterfactual** (§8.2) is where the deepest learning
lands.

---

## 16. Inspirations

- **Cashflow** (Robert Kiyosaki) — financial literacy made legible & playable;
  the settle-in turn cadence; income statement / balance sheet as the heart.
- **Modern RPG / trading-card platforms** (Slay the Spire, Marvel Snap,
  Hearthstone, etc.) — the deck-as-identity, deck-as-probability feel; drama and
  "one more run"; the polished web-platform presentation.
