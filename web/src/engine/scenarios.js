// Illustrative term data (DESIGN.md §14, mirrors sim/economy_sim.py).
// Each round offers two term sheets at a Crossroads: "standard" (disciplined)
// and "hot" (raise more, worse terms) — embodying "raising more isn't winning".

export const STANDARD_PATH = [
  { name: "Seed",     preMoney: 6_000_000,   raiseAmount: 1_500_000,  poolTargetPct: 0.10, prefMultiple: 1.0, participating: false },
  { name: "Series A", preMoney: 30_000_000,  raiseAmount: 10_000_000, poolTargetPct: 0.15, prefMultiple: 1.0, participating: false },
  { name: "Series B", preMoney: 120_000_000, raiseAmount: 30_000_000, poolTargetPct: 0.12, prefMultiple: 1.0, participating: false },
  { name: "Series C", preMoney: 350_000_000, raiseAmount: 60_000_000, poolTargetPct: 0.10, prefMultiple: 1.0, participating: false },
  { name: "Series D", preMoney: 800_000_000, raiseAmount: 120_000_000, poolTargetPct: 0.10, prefMultiple: 1.0, participating: false },
];

export const HOT_PATH = [
  { name: "Seed",     preMoney: 8_000_000,   raiseAmount: 3_000_000,  poolTargetPct: 0.12, prefMultiple: 1.0, participating: false },
  { name: "Series A", preMoney: 35_000_000,  raiseAmount: 20_000_000, poolTargetPct: 0.18, prefMultiple: 1.0, participating: false },
  { name: "Series B", preMoney: 130_000_000, raiseAmount: 60_000_000, poolTargetPct: 0.15, prefMultiple: 1.0, participating: false },
  { name: "Series C", preMoney: 360_000_000, raiseAmount: 120_000_000, poolTargetPct: 0.12, prefMultiple: 1.0, participating: true },
  { name: "Series D", preMoney: 820_000_000, raiseAmount: 250_000_000, poolTargetPct: 0.10, prefMultiple: 1.5, participating: true },
];
