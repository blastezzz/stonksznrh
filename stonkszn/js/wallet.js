/* Stonk Season — Stonk Bag wallet lookup (read-only, no wallet connection) */
/* Uses the shared CONFIG / ROBINHOOD_CHAIN from js/config.js (loaded before this file) */

/* ---------- Shared page chrome (same behavior as js/main.js) ---------- */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function simplifyMotion() {
  return prefersReducedMotion() || isMobile();
}

function runLoading() {
  const screen = document.getElementById("loading");
  const fill = document.getElementById("candle-fill");
  const pct = document.getElementById("loading-pct");
  const main = document.getElementById("main");
  const footer = document.getElementById("site-footer");

  const finish = () => {
    screen.classList.add("is-done");
    main.hidden = false;
    footer.hidden = false;
    window.setTimeout(() => screen.remove(), 400);
    initCursor();
  };

  if (prefersReducedMotion()) {
    fill.setAttribute("y", "20");
    fill.setAttribute("height", "90");
    pct.textContent = "100%";
    window.setTimeout(finish, 200);
    return;
  }

  const start = performance.now();
  const duration = 1200;

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    const bodyH = Math.max(8, 90 * eased);
    const bodyY = 110 - bodyH;
    fill.setAttribute("y", String(bodyY));
    fill.setAttribute("height", String(bodyH));
    pct.textContent = `${Math.round(eased * 100)}%`;
    if (t < 1) requestAnimationFrame(tick);
    else window.setTimeout(finish, 220);
  };

  requestAnimationFrame(tick);
}

function initNav() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = toggle.classList.toggle("is-open");
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.classList.remove("is-open");
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

function initCursor() {
  if (simplifyMotion()) return;
  const dot = document.getElementById("cursor-dot");
  dot.hidden = false;
  document.documentElement.classList.add("has-custom-cursor");

  let x = 0;
  let y = 0;

  window.addEventListener(
    "mousemove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = "1";
    },
    { passive: true },
  );

  const loop = () => {
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function initFooterContract() {
  const address = CONFIG.contractAddress;
  const codeEl = document.getElementById("footer-contract");
  if (codeEl) codeEl.textContent = address;

  const btn = document.getElementById("copy-footer");
  if (!btn) return;
  const canCopy = address && address !== "CA SOON" && !address.startsWith("[");
  if (!canCopy) return;

  btn.disabled = false;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(address);
      const prev = btn.textContent;
      btn.textContent = "COPIED!";
      window.setTimeout(() => (btn.textContent = prev), 2000);
    } catch {
      /* ignore */
    }
  });
}

/* ---------- Tracked stonk tokens on Robinhood Chain ---------- */
const PORTFOLIO_TOKENS = [
  { ticker: "AAPL", address: "0xaF3D76f1834A1d425780943C99Ea8A608f8a93f9" },
  { ticker: "AMC", address: "0x05a3d1cd21d0c88145e82600e62e7e496e0f222b" },
  { ticker: "AMD", address: "0x86923f96303D656E4aa86D9d42D1e57ad2023fdC" },
  { ticker: "AMZN", address: "0x12f190a9F9d7D37a250758b26824B97CE941bF54" },
  { ticker: "BABA", address: "0xad25Ac6C84D497db898fa1E8387bf6Af3532a1c4" },
  { ticker: "BB", address: "0x48E39E56aCdbA37b09020C0b734A613C9a2f100A" },
  { ticker: "BE", address: "0x822CC93fFD030293E9842c30BBD678F530701867" },
  { ticker: "BULL", address: "0xcef9027c7d6985b85f0ba431125073529a947a68" },
  { ticker: "COIN", address: "0x6330D8C3178a418788dF01a47479c0ce7CCF450b" },
  { ticker: "COST", address: "0x4EA005168D7F09a7A0Ba9D1DEf21a479950E44C2" },
  { ticker: "CRCL", address: "0xdF0992E440dD0be65BD8439b609d6D4366bf1CB5" },
  { ticker: "DELL", address: "0x941AE714EC6D8130c7B75d67160Ca08f1e7d11Dd" },
  { ticker: "DJT", address: "0x1D11f0496982706C5e14A514D4E79F2e6BdE4516" },
  { ticker: "F", address: "0x25C288E6D899b9BC30160965aD9644c67e73bE0C" },
  { ticker: "FIG", address: "0x41F4267525a8AFf329540eF24fD83d9044758B33" },
  { ticker: "GLD", address: "0xC9a981FEE1F9DEc688bb123ccDeCc63D0deBFC4e" },
  { ticker: "GME", address: "0x1b0E319c6A659F002271B69dB8A7df2F911c153E" },
  { ticker: "GOOGL", address: "0x2e0847E8910a9732eB3fb1bb4b70a580ADAD4FE3" },
  { ticker: "HIMS", address: "0xCceE82fE024c36fA15E1005edE3E9e4787e23D09" },
  { ticker: "IBM", address: "0x980dcf6766fa79f5cf0c4aadb3ab477ff15a9619" },
  { ticker: "INDA", address: "0xacef2e09adb47ad6abebad9ff06689e60615c2b6" },
  { ticker: "JNJ", address: "0x03dfbbe0ac4e7bcdafd08ed41a400326b77d8c80" },
  { ticker: "LLY", address: "0x8005d266423c7ea827372c9c864491e5786600ea" },
  { ticker: "LULU", address: "0x4e62068525Ab11FE768e29dfD00ef909B9803016" },
  { ticker: "META", address: "0xc0D6457C16Cc70d6790Dd43521C899C87ce02f35" },
  { ticker: "MRNA", address: "0x43B07D15cE533bEc5476d70C22a78a1B2B662155" },
  { ticker: "MRVL", address: "0x62fd0668e10D8B72339BE2DCF7643001688ff13B" },
  { ticker: "MSFT", address: "0xe93237C50D904957Cf27E7B1133b510C669c2e74" },
  { ticker: "MSTR", address: "0xec262a75e413fAfD0dF80480274532C79D42da09" },
  { ticker: "MU", address: "0xfF080c8ce2E5feadaCa0Da81314Ae59D232d4afD" },
  { ticker: "NFLX", address: "0xE0444EF8BF4eD74f74FD73686e2ddF4C1c5591E8" },
  { ticker: "NU", address: "0x408c14038a04f7bD235329E26d2bf569ee20e250" },
  { ticker: "NVDA", address: "0xd0601CE157Db5bdC3162BbaC2a2C8aF5320D9EEC" },
  { ticker: "PFE", address: "0x7066A64c24e4206CD62E83bf198c1E7EB361F51e" },
  { ticker: "PLTR", address: "0x894E1EC2D74FFE5AEF8Dc8A9e84686acCB964F2A" },
  { ticker: "QQQ", address: "0xD5f3879160bc7c32ebb4dC785F8a4F505888de68" },
  { ticker: "RBLX", address: "0xF0C4BF4C582cb3836e98394b1d4e7B7281101bE8" },
  { ticker: "RDDT", address: "0x05b37Fb53A299a1b874A619e1c4C404D52C36F4C" },
  { ticker: "RIVN", address: "0xB1BF26c1D20ff267A4f93550d1E0d06ac40a114B" },
  { ticker: "SGOV", address: "0x92FD66527192E3e61d4DDd13322Aa222DE86F9B5" },
  { ticker: "SHOP", address: "0xF53F66751B1Eff985311b693531E3290F600c410" },
  { ticker: "SKHY", address: "0x84CAb63bc87912E71ad199ff14A0bA45de68FeF8" },
  { ticker: "SLV", address: "0x411eFb0E7f985935DAec3D4C3ebaEa0d0AD7D89f" },
  { ticker: "SNAP", address: "0xF6589F11Bc40b669e584073F428B05562F568733" },
  { ticker: "SNDK", address: "0xB90A19fF0Af67f7779afF50A882A9CfF42446400" },
  { ticker: "SPCX", address: "0x4a0E65A3EcceC6dBe60AE065F2e7bb85Fae35eEa" },
  { ticker: "SPY", address: "0x117cc2133c37B721F49dE2A7a74833232B3B4C0C" },
  { ticker: "TSLA", address: "0x322F0929c4625eD5bAd873c95208D54E1c003b2d" },
  { ticker: "TSM", address: "0x58FfE4a942d3885bAa22D7520691F611EF09e7AA" },
  { ticker: "TTWO", address: "0x5e81213613b6B86EaB4c6c50d718d34359459786" },
  { ticker: "UPS", address: "0xf23250dac154D05Bb671CB0d0eBEf3c635c79CE2" },
  { ticker: "USO", address: "0xa30FA36Db767ad9eD3f7a60fC79526fB4d56D344" },
  { ticker: "WYFI", address: "0x9e7ABD3C9139D14E4c86DcE0e455AAB7A0C2FB3E" },
];

/* Real art we already have on hand — everything else gets a generated avatar badge */
const LOGO_OVERRIDES = {
  GME: "img/tokens/gme.png",
  AMC: "img/tokens/amc.png",
  BB: "img/tokens/bb.png",
  TSLA: "img/tokens/tsla.png",
  NVDA: "img/tokens/nvda.png",
  PLTR: "img/tokens/pltr.png",
  MSTR: "img/tokens/mstr.png",
  COIN: "img/tokens/coin.png",
  RIVN: "img/tokens/rivn.png",
};

const AVATAR_COLORS = [
  "#5CE31E", "#2563EB", "#E11D48", "#F5C518", "#0B3D2E",
  "#7CFF3A", "#9333EA", "#0891B2", "#EA580C", "#DB2777",
];

function colorForTicker(ticker) {
  let hash = 0;
  for (let i = 0; i < ticker.length; i++) hash = (hash * 31 + ticker.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getTrackedTokens() {
  const list = PORTFOLIO_TOKENS.map((t) => ({ ...t, isStonk: false }));
  const stonkAddr = CONFIG.contractAddress;
  if (isValidAddress(stonkAddr)) {
    list.unshift({ ticker: "STONKSZN", address: stonkAddr, isStonk: true });
  }
  return list;
}

/* ---------- Address / hex helpers ---------- */
function isValidAddress(addr) {
  return typeof addr === "string" && /^0x[0-9a-fA-F]{40}$/.test(addr.trim());
}

function shortAddr(addr) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function padAddress(addr) {
  return addr.toLowerCase().replace(/^0x/, "").padStart(64, "0");
}

function hexToBigInt(hex) {
  if (!hex || hex === "0x") return 0n;
  try {
    return BigInt(hex);
  } catch {
    return 0n;
  }
}

function formatTokenAmount(rawBalanceHex, decimalsHex) {
  const decimals = decimalsHex ? Number(hexToBigInt(decimalsHex)) : 18;
  const safeDecimals = Number.isFinite(decimals) && decimals >= 0 && decimals <= 36 ? decimals : 18;
  const value = hexToBigInt(rawBalanceHex);
  const base = 10n ** BigInt(safeDecimals);
  const whole = value / base;
  const frac = value % base;
  let fracStr = frac.toString().padStart(safeDecimals, "0").slice(0, 4).replace(/0+$/, "");
  let display = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (fracStr) display += `.${fracStr}`;
  return { display, raw: value };
}

/* ---------- RPC (direct, read-only — no wallet involved) ---------- */
const RPC_URL = ROBINHOOD_CHAIN.rpcUrls[0];
const BALANCE_OF_SELECTOR = "0x70a08231";
const DECIMALS_SELECTOR = "0x313ce567";

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/* The public RPC occasionally answers a request with a malformed CORS header
   (some upstream node duplicating Access-Control-Allow-Origin), which the
   browser rejects outright as a network error. It's transient — retrying
   a beat later almost always goes through — so wrap every RPC fetch in a
   couple of quiet retries instead of surfacing a scary error on one blip. */
async function fetchRpc(body, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return res;
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await wait(350 * (i + 1));
    }
  }
  throw lastErr;
}

async function rpcSingle(method, params) {
  const res = await fetchRpc({ jsonrpc: "2.0", id: 1, method, params });
  if (!res.ok) throw new Error(`RPC request failed (${res.status})`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || "RPC error");
  return json.result;
}

async function rpcBatchChunk(calls) {
  const body = calls.map((c, i) => ({
    jsonrpc: "2.0",
    id: i,
    method: "eth_call",
    params: [{ to: c.to, data: c.data }, "latest"],
  }));
  try {
    const res = await fetchRpc(body);
    const json = await res.json();
    const list = Array.isArray(json) ? json : [json];
    const byId = new Map(list.map((r) => [r.id, r]));
    return calls.map((_, i) => {
      const r = byId.get(i);
      return r && !r.error && r.result && r.result !== "0x" ? r.result : null;
    });
  } catch {
    return calls.map(() => null);
  }
}

async function rpcBatchCall(calls, chunkSize = 40) {
  if (!calls.length) return [];
  const chunks = [];
  for (let i = 0; i < calls.length; i += chunkSize) chunks.push(calls.slice(i, i + chunkSize));
  const resultsPerChunk = await Promise.all(chunks.map(rpcBatchChunk));
  return resultsPerChunk.flat();
}

/* ---------- UI state ---------- */
function showState(state) {
  document.getElementById("portfolio-idle").hidden = state !== "idle";
  document.getElementById("portfolio-loading").hidden = state !== "loading";
  document.getElementById("portfolio-error").hidden = state !== "error";
  document.getElementById("portfolio-results-content").hidden = state !== "results";
}

function showError(msg) {
  document.getElementById("portfolio-error-text").textContent = msg;
  showState("error");
}

function tokenCardHTML(t) {
  const override = LOGO_OVERRIDES[t.ticker];
  const art = override
    ? `<img class="coin-art" src="${override}" alt="" width="80" height="80" loading="lazy">`
    : `<span class="coin-art coin-art--avatar" style="background:${colorForTicker(t.ticker)}">${t.ticker.slice(0, 2)}</span>`;
  const label = t.isStonk ? "$STONKSZN" : t.ticker;
  return `<li>
    <div class="comic-panel coin-card coin-card--static">
      ${art}
      <span class="coin-name">${label}</span>
      <span class="coin-balance">${t.display}</span>
      <span class="coin-ticker">${t.ticker}</span>
    </div>
  </li>`;
}

function renderResults({ address, nativeHex, holdings, zero, total }) {
  document.getElementById("address-echo").textContent = shortAddr(address);
  document.getElementById("native-balance").textContent = formatTokenAmount(nativeHex, "0x12").display;

  const grid = document.getElementById("holdings-grid");
  const noHoldingsEl = document.getElementById("no-holdings");
  if (!holdings.length) {
    grid.innerHTML = "";
    noHoldingsEl.hidden = false;
  } else {
    noHoldingsEl.hidden = true;
    grid.innerHTML = holdings.map(tokenCardHTML).join("");
  }

  const trackedList = document.getElementById("tracked-pill-list");
  const allSorted = [...holdings, ...zero].sort((a, b) => a.ticker.localeCompare(b.ticker));
  trackedList.innerHTML = allSorted
    .map((t) => `<li class="tracked-pill${t.raw > 0n ? " is-held" : ""}">${t.ticker}</li>`)
    .join("");
  document.getElementById("tracked-count").textContent = String(total);
}

/* decimals() never changes for a given contract — cache it in memory so a
   second lookup this session (a different wallet, or the same one again)
   skips those calls and comes back roughly twice as fast. */
const decimalsCache = new Map();

async function lookupWallet(address) {
  showState("loading");
  try {
    const tokens = getTrackedTokens();
    const balanceOfCalls = tokens.map((t) => ({ to: t.address, data: BALANCE_OF_SELECTOR + padAddress(address) }));
    const uncached = tokens.filter((t) => !decimalsCache.has(t.address));
    const decimalsCalls = uncached.map((t) => ({ to: t.address, data: DECIMALS_SELECTOR }));

    const [nativeHex, balanceResults, decimalsResults] = await Promise.all([
      rpcSingle("eth_getBalance", [address, "latest"]),
      rpcBatchCall(balanceOfCalls),
      rpcBatchCall(decimalsCalls),
    ]);

    uncached.forEach((t, i) => decimalsCache.set(t.address, decimalsResults[i]));

    const holdings = [];
    const zero = [];
    tokens.forEach((t, i) => {
      const { display, raw } = formatTokenAmount(balanceResults[i], decimalsCache.get(t.address));
      const item = { ...t, display, raw };
      if (raw > 0n) holdings.push(item);
      else zero.push(item);
    });
    holdings.sort((a, b) => (b.raw > a.raw ? 1 : b.raw < a.raw ? -1 : 0));

    renderResults({ address, nativeHex, holdings, zero, total: tokens.length });
    showState("results");
  } catch (err) {
    console.error(err);
    showError(
      "Couldn't reach Robinhood Chain right now. Check your connection and try again in a moment.",
    );
  }
}

function initSearch() {
  const input = document.getElementById("wallet-input");
  const btn = document.getElementById("wallet-search-btn");
  const hint = document.getElementById("wallet-hint");

  const submit = () => {
    const addr = input.value.trim();
    if (!isValidAddress(addr)) {
      hint.textContent = "That doesn't look like a valid wallet address (0x followed by 40 hex characters).";
      hint.classList.add("is-error");
      return;
    }
    hint.textContent = "";
    hint.classList.remove("is-error");
    lookupWallet(addr);
  };

  btn.addEventListener("click", submit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submit();
  });

  const params = new URLSearchParams(window.location.search);
  const preset = params.get("address");
  if (preset && isValidAddress(preset)) {
    input.value = preset;
    submit();
  }
}

/* ---------- Boot ---------- */
document.getElementById("year").textContent = String(new Date().getFullYear());
initNav();
initFooterContract();
initSearch();
showState("idle");
runLoading();
