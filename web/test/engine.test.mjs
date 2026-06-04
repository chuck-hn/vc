// Parity tests: the JS engine must match the Python sim (sim/economy_sim.py).
import test from "node:test";
import assert from "node:assert/strict";
import { CapTable, exitWaterfall, carry } from "../src/engine/captable.js";
import { STANDARD_PATH } from "../src/engine/scenarios.js";

const approx = (a, b, tol = 0.001) =>
  assert.ok(Math.abs(a - b) <= tol, `${a} ≉ ${b} (tol ${tol})`);

function buildStandard() {
  const cap = new CapTable();
  for (const t of STANDARD_PATH) cap.raiseRound(t);
  return cap;
}

test("founder dilution matches Python sim, round by round", () => {
  const cap = new CapTable();
  const expected = [0.7, 0.46667, 0.37333, 0.31934, 0.27331];
  STANDARD_PATH.forEach((t, i) => {
    cap.raiseRound(t);
    approx(cap.founderPct(), expected[i], 0.0005);
  });
});

test("underwater exit ($180M < $221.5M pref stack) wipes founders to $0", () => {
  const cap = buildStandard();
  const { results } = exitWaterfall(cap, 180_000_000);
  approx(results.Founders.payout, 0, 1);
  approx(results.Seed.payout, 0, 1); // early money wiped too
  approx(results["Series D"].payout, 120_000_000, 1); // senior pref paid first
});

test("good $300M exit: founder nets ~$41.1M = only ~13.7% of headline", () => {
  const cap = buildStandard();
  const { results } = exitWaterfall(cap, 300_000_000);
  approx(results.Founders.payout, 41_100_000, 200_000);
  approx(results.Founders.payout / 300_000_000, 0.137, 0.003);
});

test("great $900M exit: everyone converts, founder gets full ~27.2%", () => {
  const cap = buildStandard();
  const { results } = exitWaterfall(cap, 900_000_000);
  approx(results.Founders.payout / 900_000_000, 0.2722, 0.002);
  assert.equal(results.Seed.converted, true);
  approx(results.Seed.moic, 46.7, 0.3);
});

test("carry = 20% of profit on the investment", () => {
  approx(carry(70_100_000, 1_500_000), (70_100_000 - 1_500_000) * 0.2, 1);
  approx(carry(0, 1_500_000), 0, 0.001); // no profit, no carry
});

test("participating pref pays the investor more at a fixed exit", () => {
  const mk = (participating, prefMultiple) => {
    const cap = new CapTable();
    cap.raiseRound({ name: "Seed", preMoney: 6e6, raiseAmount: 1.5e6, poolTargetPct: 0.1 });
    cap.raiseRound({ name: "Series A", preMoney: 30e6, raiseAmount: 10e6, poolTargetPct: 0.15 });
    cap.raiseRound({ name: "Series B", preMoney: 120e6, raiseAmount: 30e6, poolTargetPct: 0.12, prefMultiple, participating });
    return exitWaterfall(cap, 120_000_000).results;
  };
  const nonPart = mk(false, 1.0);
  const part = mk(true, 1.0);
  assert.ok(part["Series B"].payout > nonPart["Series B"].payout);
  assert.ok(part.Founders.payout < nonPart.Founders.payout);
});
