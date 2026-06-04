// Formatting helpers shared across engine + UI.

export const fmtMoney = (n) => {
  const m = n / 1e6;
  const s = Math.abs(m).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${n < 0 ? "-" : ""}$${s}M`;
};

export const fmtPct = (n) => `${(n * 100).toFixed(1)}%`;

export const fmtMoic = (n) => `${n.toFixed(1)}x`;
