// Cap table + liquidation-preference waterfall.
// Mirror of sim/economy_sim.py — kept numerically identical (parity-tested).
// PURE: no DOM, no globals.

export class CapTable {
  constructor(founderShares = 10_000_000) {
    this.founderShares = founderShares;
    this.poolShares = 0; // unallocated option pool (common)
    this.rounds = []; // [{ name, invested, shares, prefMultiple, participating, seniority }]
  }

  totalShares() {
    return (
      this.founderShares +
      this.poolShares +
      this.rounds.reduce((s, r) => s + r.shares, 0)
    );
  }

  founderPct() {
    return this.founderShares / this.totalShares();
  }

  /**
   * Execute a priced round using the standard PRE-MONEY option-pool method:
   * a pool top-up is created out of the pre-money, diluting founders (and prior
   * investors) but NOT the incoming investor — the "pool shuffle" lesson.
   * Returns the investor's resulting ownership fraction.
   */
  raiseRound({
    name,
    preMoney,
    raiseAmount,
    poolTargetPct = 0,
    prefMultiple = 1,
    participating = false,
  }) {
    const post = preMoney + raiseAmount;
    const existingNonPool =
      this.founderShares + this.rounds.reduce((s, r) => s + r.shares, 0);

    const denom = 1 - poolTargetPct - raiseAmount / post;
    if (denom <= 0) {
      throw new Error("Round terms imply >=100% dilution; infeasible.");
    }
    const T = existingNonPool / denom;

    const investorShares = (raiseAmount / post) * T;
    const totalPoolAfter = poolTargetPct * T;
    const newPool = Math.max(0, totalPoolAfter - this.poolShares);
    const seniority =
      this.rounds.reduce((m, r) => Math.max(m, r.seniority), 0) + 1;

    this.poolShares += newPool;
    this.rounds.push({
      name,
      invested: raiseAmount,
      shares: investorShares,
      prefMultiple,
      participating,
      seniority,
    });
    return investorShares / T;
  }

  clone() {
    const c = new CapTable(this.founderShares);
    c.poolShares = this.poolShares;
    c.rounds = this.rounds.map((r) => ({ ...r }));
    return c;
  }
}

/**
 * Distribute exit proceeds through the liquidation-preference stack.
 * Non-participating preferred takes MAX(preference, as-converted common);
 * participating takes preference first, then shares pro-rata (uncapped in v1).
 * Seniority is stacked (highest paid first). A fixpoint resolves which
 * non-participating prefs convert. Returns { results, perShare }.
 */
export function exitWaterfall(cap, exitValue) {
  const rounds = cap.rounds;
  const converted = {};
  rounds.forEach((r) => (converted[r.name] = false));

  let perShare = 0;
  let prefPayout = {};

  for (let iter = 0; iter < 200; iter++) {
    let remaining = exitValue;
    prefPayout = {};
    const bySeniority = [...rounds].sort((a, b) => b.seniority - a.seniority);
    for (const r of bySeniority) {
      const takesPref = r.participating || !converted[r.name];
      if (takesPref) {
        const p = Math.min(remaining, r.prefMultiple * r.invested);
        prefPayout[r.name] = p;
        remaining -= p;
      } else {
        prefPayout[r.name] = 0;
      }
    }

    const partShares = rounds
      .filter((r) => r.participating)
      .reduce((s, r) => s + r.shares, 0);
    const convShares = rounds
      .filter((r) => !r.participating && converted[r.name])
      .reduce((s, r) => s + r.shares, 0);
    const commonBase =
      cap.founderShares + cap.poolShares + partShares + convShares;
    perShare = commonBase > 0 ? remaining / commonBase : 0;

    let changed = false;
    for (const r of rounds) {
      if (r.participating) continue;
      const should = perShare * r.shares > r.prefMultiple * r.invested;
      if (should !== converted[r.name]) {
        converted[r.name] = should;
        changed = true;
      }
    }
    if (!changed) break;
  }

  const results = {};
  for (const r of rounds) {
    let payout = prefPayout[r.name];
    if (r.participating || converted[r.name]) payout += perShare * r.shares;
    results[r.name] = {
      invested: r.invested,
      payout,
      moic: r.invested ? payout / r.invested : 0,
      converted: converted[r.name],
      participating: r.participating,
    };
  }
  results["Option Pool"] = {
    invested: 0,
    payout: perShare * cap.poolShares,
    moic: 0,
  };
  results["Founders"] = {
    invested: 0,
    payout: perShare * cap.founderShares,
    moic: 0,
  };
  return { results, perShare };
}

/** The partner's personal take: carry on the profit of that investment. */
export const carry = (payout, invested, carryPct = 0.2) =>
  Math.max(0, payout - invested) * carryPct;
