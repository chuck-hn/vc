// Playable Crossroads (Phase B) + a basic exit reveal (teaser for Phase C).
// Renders from a pure Run state machine; this file only touches the DOM.

import { Run } from "../game/run.js";
import { BAND_ORDER, BAND_LABEL, VAL_MULT } from "../engine/fate.js";
import { fmtMoney, fmtPct, fmtMoic } from "../engine/format.js";
import { carry } from "../engine/captable.js";

const ROUND_COLORS = ["#7c6cff", "#5aa9e6", "#69d2a0", "#f6c177", "#f2748b"];
const ALL_ROUNDS = ["Seed", "Series A", "Series B", "Series C", "Series D"];
const PEEK_EXIT = 300_000_000; // fixed reference: watch your take erode as you raise

const ui = {
  run: new Run(),
  selected: null, // "standard" | "hot"
  phase: "choose", // "choose" | "revealed" | "exit"
  reveal: null, // { record, prevPct }
  exitResult: null, // { exitValue, results }
};

const $ = (id) => document.getElementById(id);

// ── dashboard ──────────────────────────────────────────────────────────────
function renderDash() {
  const cap = ui.run.cap;
  const total = cap.totalShares();

  $("founderPct").textContent = fmtPct(cap.founderPct());

  const segs = [
    { label: "Founders", shares: cap.founderShares, color: "var(--founder)" },
    ...cap.rounds.map((r, i) => ({
      label: r.name,
      shares: r.shares,
      color: ROUND_COLORS[i % ROUND_COLORS.length],
    })),
    { label: "Option pool", shares: cap.poolShares, color: "var(--pool)" },
  ].filter((s) => s.shares > 0);

  $("stackbar").innerHTML = segs
    .map(
      (s) =>
        `<span style="width:${(s.shares / total) * 100}%;background:${s.color}"></span>`,
    )
    .join("");

  $("legend").innerHTML = segs
    .map(
      (s) =>
        `<li><span class="dot" style="background:${s.color}"></span>${s.label}<b>${fmtPct(
          s.shares / total,
        )}</b></li>`,
    )
    .join("");

  // fate deck
  const odds = ui.run.deck.odds();
  const counts = ui.run.deck.counts();
  $("oddsbar").innerHTML = BAND_ORDER.map(
    (b) => `<span class="band-${b}" style="width:${odds[b] * 100}%"></span>`,
  ).join("");
  $("deckTally").innerHTML = BAND_ORDER.map(
    (b) =>
      `<li><span class="chip band-${b}"></span>${b} <b>${counts[b]}</b></li>`,
  ).join("");

  // "if you sold today" peek
  const net = ui.run.founderNet(PEEK_EXIT);
  $("peekLine").innerHTML =
    `At a ${fmtMoney(PEEK_EXIT)} exit you'd net <b>${fmtMoney(net)}</b><br>` +
    `<small>${fmtPct(net / PEEK_EXIT)} of the headline number</small>`;

  // progress rail
  $("progress").innerHTML = [...ALL_ROUNDS, "Exit"]
    .map((name, i) => {
      let cls = "";
      if (i < ui.run.stepIndex) cls = "done";
      else if (i === ui.run.stepIndex && ui.phase !== "exit") cls = "active";
      else if (name === "Exit" && ui.phase === "exit") cls = "active";
      return `<li class="${cls}">${name}</li>`;
    })
    .join("");
}

// ── stage ──────────────────────────────────────────────────────────────────
function sheetCard(kind, terms) {
  const post = terms.preMoney + terms.raiseAmount;
  const toInvestor = terms.raiseAmount / post;
  const prefTxt = `${terms.prefMultiple}× ${terms.participating ? "participating" : "non-participating"}`;
  const prefClass = terms.participating || terms.prefMultiple > 1 ? "flag-bad" : "flag-good";
  const blurb =
    kind === "standard"
      ? "Disciplined. Smaller check, clean terms, more runway pressure."
      : "Hot money. Bigger check now — but worse terms and a Setback in your deck.";
  return `
    <div class="sheet ${ui.selected === kind ? "selected" : ""}" data-kind="${kind}">
      <h3>${kind === "standard" ? "Standard sheet" : "Hot money"}</h3>
      <p class="blurb">${blurb}</p>
      <dl>
        <dt>Raise</dt><dd>${fmtMoney(terms.raiseAmount)}</dd>
        <dt>Pre-money</dt><dd>${fmtMoney(terms.preMoney)}</dd>
        <dt>To investor</dt><dd>≈ ${fmtPct(toInvestor)}</dd>
        <dt>Option pool</dt><dd>${fmtPct(terms.poolTargetPct)}</dd>
        <dt>Liq. pref</dt><dd class="${prefClass}">${prefTxt}</dd>
      </dl>
    </div>`;
}

function renderChoose() {
  const { standard, hot } = ui.run.currentChoices();
  const odds = ui.run.deck.odds();
  const oddsTxt = BAND_ORDER.filter((b) => odds[b] > 0)
    .map((b) => `${fmtPct(odds[b])} ${b}`)
    .join(" · ");

  $("stage").innerHTML = `
    <div class="crossroads-head">
      <div class="kicker">Crossroads · Funding round</div>
      <h2>${standard.name} — choose your term sheet</h2>
      <p>Then you'll draw <em>fate</em> from the deck you've stocked: a good draw is an
         up round, a bad one a dilutive down round. The terms you sign echo all the way
         to the exit waterfall.</p>
    </div>
    <div class="sheets">${sheetCard("standard", standard)}${sheetCard("hot", hot)}</div>
    <div class="actions">
      <button class="primary" id="signBtn" ${ui.selected ? "" : "disabled"}>
        Sign &amp; draw fate
      </button>
      <span class="odds-note">${ui.selected ? `Deck odds: ${oddsTxt}${ui.selected === "hot" ? " — drawn at a disadvantage" : ""}` : "Pick a sheet to see your odds."}</span>
    </div>`;

  $("stage")
    .querySelectorAll(".sheet")
    .forEach((el) =>
      el.addEventListener("click", () => {
        ui.selected = el.dataset.kind;
        renderChoose();
      }),
    );
  const signBtn = $("signBtn");
  if (signBtn) signBtn.addEventListener("click", doSign);
}

function doSign() {
  const prevPct = ui.run.cap.founderPct();
  const record = ui.run.playRound(ui.selected);
  ui.reveal = { record, prevPct };
  ui.phase = "revealed";
  render();
}

function renderRevealed() {
  const { record, prevPct } = ui.reveal;
  const mult = VAL_MULT[record.band];
  $("stage").innerHTML = `
    <div class="crossroads-head">
      <div class="kicker">${record.name} · fate drawn</div>
      <h2>${record.name} closed</h2>
    </div>
    <div class="reveal flash">
      <div class="band-name band-text-${record.band}">${record.band}</div>
      <div class="band-desc">${BAND_LABEL[record.band]}</div>
      <div class="delta">
        Pre-money moved to <b>${fmtMoney(record.preMoney)}</b> (×${mult.toFixed(2)}).<br>
        Your stake: <b>${fmtPct(prevPct)}</b> → <b>${fmtPct(record.founderPct)}</b>
      </div>
    </div>
    <div class="actions">
      <button class="primary" id="nextBtn">
        ${ui.run.done() ? "Head to the exit →" : "Continue →"}
      </button>
    </div>`;
  $("nextBtn").addEventListener("click", () => {
    ui.selected = null;
    ui.reveal = null;
    ui.phase = ui.run.done() ? "exit" : "choose";
    render();
  });
}

function renderExit() {
  if (!ui.exitResult) {
    $("stage").innerHTML = `
      <div class="crossroads-head">
        <div class="kicker">The exit</div>
        <h2>Time to sell. For how much?</h2>
        <p>Same company, three outcomes. Watch how much of the headline number actually
           reaches <em>you</em> once the liquidation-preference stack is paid.</p>
      </div>
      <div class="exit-buttons">
        <button data-exit="180000000"><b>Modest</b><br>$180M exit</button>
        <button data-exit="300000000"><b>Good</b><br>$300M exit</button>
        <button data-exit="900000000"><b>Great</b><br>$900M exit</button>
      </div>`;
    $("stage")
      .querySelectorAll("[data-exit]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          const exitValue = Number(b.dataset.exit);
          ui.exitResult = { exitValue, ...ui.run.exit(exitValue) };
          render();
        }),
      );
    return;
  }

  const { exitValue, results } = ui.exitResult;
  const founder = results["Founders"].payout;
  const seed = results["Seed"];
  const rows = ["Founders", ...ui.run.cap.rounds.map((r) => r.name), "Option Pool"]
    .map((h) => {
      const r = results[h];
      const note = h === "Founders" || h === "Option Pool"
        ? ""
        : r.participating ? "participating" : r.converted ? "converted → common" : "took pref";
      const zero = r.payout < 1 ? "zero" : "";
      return `<tr class="${h === "Founders" ? "founder-row" : ""}">
        <td>${h}</td>
        <td>${r.invested ? fmtMoney(r.invested) : "—"}</td>
        <td class="${zero}">${fmtMoney(r.payout)}</td>
        <td>${r.invested ? fmtMoic(r.moic) : "—"}</td>
        <td style="text-align:left;color:var(--muted)">${note}</td>
      </tr>`;
    })
    .join("");

  const lesson =
    founder < 1
      ? `You built a <b>${fmtMoney(exitValue)}</b> company and walked away with <b>$0</b>. The
         ${fmtMoney(ui.run.cap.rounds.reduce((s, r) => s + r.invested, 0))} preference stack was paid
         in full before common stock saw a cent.`
      : `You own ${fmtPct(ui.run.cap.founderPct())} of the company, but netted
         <b>${fmtMoney(founder)}</b> — ${fmtPct(founder / exitValue)} of the
         ${fmtMoney(exitValue)} headline. The gap is the preference stack and the option pool.`;

  $("stage").innerHTML = `
    <div class="crossroads-head">
      <div class="kicker">Exit waterfall · ${fmtMoney(exitValue)}</div>
      <h2>Who got paid</h2>
    </div>
    <table class="waterfall">
      <thead><tr><th>Holder</th><th>Invested</th><th>Walks out</th><th>MOIC</th><th>&nbsp;</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="odds-note" style="margin-top:10px">
      The Seed partner's personal carry on this deal: <b>${fmtMoney(carry(seed.payout, seed.invested))}</b>.
    </p>
    <div class="lesson">${lesson}</div>
    <div class="actions">
      <button class="ghost" id="tryAnother">Try another exit</button>
      <button class="primary" id="replay">Run it back</button>
    </div>`;
  $("tryAnother").addEventListener("click", () => {
    ui.exitResult = null;
    render();
  });
  $("replay").addEventListener("click", () => {
    Object.assign(ui, { run: new Run(), selected: null, phase: "choose", reveal: null, exitResult: null });
    render();
  });
}

// ── top-level render ─────────────────────────────────────────────────────────
function render() {
  renderDash();
  if (ui.phase === "choose") renderChoose();
  else if (ui.phase === "revealed") renderRevealed();
  else renderExit();
}

render();
