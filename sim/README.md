# Economy & Cap-Table Balance Sim

A standalone Python sim (no dependencies) that pressure-tests the systems in
[`../DESIGN.md`](../DESIGN.md) **before any UI** — it checks that the cap-table
math is correct and that the numbers actually *teach* the intended lessons.

```bash
python3 sim/economy_sim.py
```

## What it models

- **`CapTable`** — ownership in shares, using the standard **pre-money
  option-pool** method (a pool top-up dilutes founders, not the new investor —
  the "pool shuffle").
- **`exit_waterfall`** — distributes exit proceeds through the
  **liquidation-preference stack** (stacked seniority), with correct
  **non-participating conversion** (take MAX of preference vs. as-converted) and
  **participating** preferred (preference first, then pro-rata). Also computes
  each investor's **MOIC** and the partner's personal **carry**.
- A lightweight **fate-deck run loop** for Monte-Carlo testing of skill vs. luck.

## What it confirms (v1 illustrative numbers)

| Demo | Lesson | Result |
|---|---|---|
| 1 | "Win the company, lose personally" | $180M exit → founder **$0**; $300M → **$41M but only 13.7%** of headline; $900M → full 27% |
| 2 | Raising more isn't winning | Same $600M exit: disciplined **$150.9M** vs over-raised **$4.0M** |
| 3 | Terms matter at a fixed exit | 1× non-part → founder **$42M**; 1.5× participating → **$28M** |
| 4 | Skill beats luck (Pillar 3) | Disciplined **$105M median, 0% bust**; reckless **$42M median, 25% bust** |

## Caveats

All numbers are **illustrative placeholders** (DESIGN.md §14), chosen to make the
systems concrete — not balanced. Known v1 simplifications: participating prefs
are **uncapped**; seniority is **stacked** (not pari passu); the run loop is a toy
flywheel, not the full Sprint/Crossroads model. Next: turn the §14 ranges into
tuned curves and verify the loop is *fun*, not just correct.
