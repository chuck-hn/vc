// The Fate Deck — the core verb. Your choices stock it; Crossroads draw from it.
// PURE: no DOM. (DESIGN.md §12)

// Outcome bands, ranked best → worst.
export const BAND_ORDER = [
  "Breakthrough",
  "Momentum",
  "Grind",
  "Setback",
  "Disaster",
];

// How a drawn band bends a round's pre-money valuation (up round vs down round).
export const VAL_MULT = {
  Breakthrough: 1.4,
  Momentum: 1.15,
  Grind: 1.0,
  Setback: 0.8,
  Disaster: 0.55,
};

// Short flavor for the UI.
export const BAND_LABEL = {
  Breakthrough: "Breakthrough — an up round on great terms",
  Momentum: "Momentum — solid progress, a friendly round",
  Grind: "Grind — you get there, flat-ish terms",
  Setback: "Setback — a soft round, more dilution",
  Disaster: "Disaster — a down round guts your stake",
};

export class FateDeck {
  // Default Phase-1 deck: small & volatile (DESIGN.md §12.2).
  constructor(
    cards = [
      "Breakthrough",
      "Momentum",
      "Momentum",
      "Grind",
      "Grind",
      "Grind",
      "Setback",
      "Setback",
    ],
  ) {
    this.cards = [...cards];
  }

  counts() {
    const c = Object.fromEntries(BAND_ORDER.map((b) => [b, 0]));
    for (const x of this.cards) c[x]++;
    return c;
  }

  odds() {
    const c = this.counts();
    const t = this.cards.length || 1;
    return Object.fromEntries(BAND_ORDER.map((b) => [b, c[b] / t]));
  }

  add(band, n = 1) {
    for (let i = 0; i < n; i++) this.cards.push(band);
  }

  // Deck thinning — great teams delete downside (DESIGN.md §12.3).
  remove(band, n = 1) {
    for (let i = 0; i < n; i++) {
      const idx = this.cards.indexOf(band);
      if (idx >= 0) this.cards.splice(idx, 1);
    }
  }

  rank(band) {
    return BAND_ORDER.length - BAND_ORDER.indexOf(band); // higher = better
  }

  /**
   * Draw a band. advantage: +1 = draw two keep the better (you cleared the gate
   * comfortably); -1 = draw two keep the worse (you're "reaching"); 0 = single.
   * rng() returns [0,1).
   */
  draw(rng = Math.random, advantage = 0) {
    const pick = () => this.cards[Math.floor(rng() * this.cards.length)];
    if (advantage === 0) return pick();
    const a = pick();
    const b = pick();
    if (advantage > 0) return this.rank(a) >= this.rank(b) ? a : b;
    return this.rank(a) <= this.rank(b) ? a : b;
  }
}
