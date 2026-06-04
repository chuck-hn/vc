# Implementation Roadmap

A **phased, vertical-slice** build. Each phase ends in something runnable, and
the pure game logic stays framework-free so it can be tested headlessly with
`node --test`. No build step, no dependencies — the web app is plain ES modules.

> Reference oracle: [`sim/economy_sim.py`](sim/economy_sim.py). The browser
> engine mirrors it; parity tests guard against drift.

## Stack & principles
- **Vanilla ES modules + HTML/CSS.** Opens in any browser; serve with
  `python3 -m http.server` from `web/`. Zero install.
- **Pure core, thin shell.** `web/src/engine/*` and `web/src/game/*` are
  DOM-free and unit-tested in Node; `web/src/ui/*` only renders & handles input.
- **The cap table is sacred.** It's the curriculum — it must stay numerically
  identical to the Python sim (parity tests enforce this).

## Phases

| Phase | Deliverable | Status |
|---|---|---|
| **A — Engine** | Port `CapTable` + `exitWaterfall` + `FateDeck` to JS; Node parity tests vs the Python sim | ✅ done |
| **B — Playable Crossroads** | One interactive funding round: choose terms → see fate-deck odds → draw fate → watch ownership move | ✅ done |
| **C — Exit Waterfall** | Animated draining two-sided payout (senior→junior, founders last) + the counterfactual ("the road not taken", same fate / disciplined terms) | ✅ done |
| **D — Sprint loop** | Burn-Aggression dial → montage → runway, between Crossroads | ⬜ next |
| **E — Full run** | Phase 1 → Phase 2 → Exit, wired end to end with the Weather & relationships | ⬜ |

## Layout
```
web/
  index.html            # boots the prototype
  styles.css
  src/
    engine/             # PURE, tested
      captable.js        – CapTable, exitWaterfall, carry
      fate.js            – FateDeck (bands, stocking, odds, advantage draw)
      scenarios.js       – STANDARD_PATH / HOT_PATH term data
      format.js          – money / percent formatting
    game/
      run.js            – Run state machine (PURE, tested): rounds + fate → cap table
    ui/
      app.js            – the Crossroads screen (DOM)
  test/
    engine.test.mjs     – parity with Python numbers
    run.test.mjs        – run-state behavior
```

## Run it
```bash
# tests
node --test "web/test/*.test.mjs"

# the app
cd web && python3 -m http.server 8000   # then open http://localhost:8000
```
