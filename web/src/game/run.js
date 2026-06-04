// Run state machine — sequences Crossroads (funding rounds) and resolves each
// with a fate draw that bends the round's valuation. PURE: no DOM, unit-tested.

import { CapTable, exitWaterfall } from "../engine/captable.js";
import { FateDeck, VAL_MULT } from "../engine/fate.js";
import { STANDARD_PATH, HOT_PATH } from "../engine/scenarios.js";

export class Run {
  constructor({ rng = Math.random } = {}) {
    this.rng = rng;
    this.cap = new CapTable();
    this.deck = new FateDeck();
    this.stepIndex = 0;
    this.history = []; // [{ name, choice, band, preMoney, founderPct, participating }]
  }

  done() {
    return this.stepIndex >= STANDARD_PATH.length;
  }

  // The term sheets on the table for the current round.
  currentChoices() {
    const i = this.stepIndex;
    return { standard: STANDARD_PATH[i], hot: HOT_PATH[i] };
  }

  /**
   * Resolve a Crossroads.
   *   choice: "standard" | "hot"
   *   forcedBand: optional, for deterministic tests
   * Chasing "hot" money stocks a Setback and draws with disadvantage —
   * hot terms buy speed at the cost of fragility (DESIGN.md §12.3).
   */
  playRound(choice, forcedBand = null) {
    if (this.done()) throw new Error("Run already complete.");
    const terms = (choice === "hot" ? HOT_PATH : STANDARD_PATH)[this.stepIndex];

    let advantage = 0;
    if (choice === "hot") {
      this.deck.add("Setback", 1);
      advantage = -1;
    } else {
      this.deck.add("Momentum", 1);
    }

    const band = forcedBand ?? this.deck.draw(this.rng, advantage);
    const preMoney = terms.preMoney * VAL_MULT[band];

    this.cap.raiseRound({ ...terms, preMoney });
    this.stepIndex++;

    const record = {
      name: terms.name,
      choice,
      band,
      preMoney,
      participating: terms.participating,
      founderPct: this.cap.founderPct(),
    };
    this.history.push(record);
    return record;
  }

  exit(exitValue) {
    return exitWaterfall(this.cap, exitValue);
  }

  /** Founder's net at a given exit (used for the live "if you sold now" peek). */
  founderNet(exitValue) {
    return exitWaterfall(this.cap, exitValue).results["Founders"].payout;
  }
}

/**
 * The counterfactual ("the road not taken"). Replays the run holding FATE
 * CONSTANT (same band each round) but substituting different term-sheet
 * choices — isolating the cost of decisions from luck (DESIGN.md §8.2, Pillar 3).
 *   chooseFn(record, i) -> "standard" | "hot"
 */
export function replayWithChoices(history, chooseFn) {
  const cap = new CapTable();
  history.forEach((h, i) => {
    const choice = chooseFn(h, i);
    const terms = (choice === "hot" ? HOT_PATH : STANDARD_PATH)[i];
    cap.raiseRound({ ...terms, preMoney: terms.preMoney * VAL_MULT[h.band] });
  });
  return cap;
}
