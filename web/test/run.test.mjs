// Run state-machine behavior.
import test from "node:test";
import assert from "node:assert/strict";
import { Run } from "../src/game/run.js";

const approx = (a, b, tol) =>
  assert.ok(Math.abs(a - b) <= tol, `${a} ≉ ${b} (tol ${tol})`);

test("all-Grind run reproduces the standard dilution path", () => {
  // Grind has VAL_MULT 1.0, so terms are unchanged → must match the sim.
  const run = new Run();
  const expected = [0.7, 0.46667, 0.37333, 0.31934, 0.27331];
  let i = 0;
  while (!run.done()) {
    const rec = run.playRound("standard", "Grind");
    approx(rec.founderPct, expected[i++], 0.0005);
  }
  assert.equal(run.history.length, 5);
});

test("a Breakthrough (up round) dilutes the founder less than a Setback", () => {
  const up = new Run().playRound("standard", "Breakthrough").founderPct;
  const down = new Run().playRound("standard", "Setback").founderPct;
  assert.ok(up > down, `up ${up} should beat down ${down}`);
});

test("choosing 'hot' stocks a Setback into the fate deck", () => {
  const run = new Run();
  const before = run.deck.counts().Setback;
  run.playRound("hot", "Grind");
  assert.equal(run.deck.counts().Setback, before + 1);
});

test("founderNet peek rises with a bigger exit", () => {
  const run = new Run();
  while (!run.done()) run.playRound("standard", "Grind");
  assert.ok(run.founderNet(900e6) > run.founderNet(300e6));
  approx(run.founderNet(180e6), 0, 1); // underwater
});
