/* Stonk Season — vanilla JS */
/* Uses the shared CONFIG from js/config.js (loaded before this file) */

const TICKERS = [
  "$STONKSZN",
  "GME",
  "AMC",
  "BB",
  "NOK",
  "BBBY",
  "TSLA",
  "NVDA",
  "PLTR",
  "HOOD",
  "MSTR",
  "COIN",
  "BYND",
  "SPCE",
  "SOFI",
  "RIVN",
  "LCID",
  "WISH",
  "CLOV",
  "TLRY",
  "TUP",
];

const STONKS = [
  {
    id: "gme",
    ticker: "GME",
    name: "GameStop",
    label: "Diamond saga",
    blurb:
      "GameStop (GME) — the original meme-stock legend. Cultural reference only; not affiliated with the company or $STONKSZN as a partner.",
    logo: "img/tokens/gme.png",
  },
  {
    id: "amc",
    ticker: "AMC",
    name: "AMC Entertainment",
    label: "Apes together",
    blurb:
      "AMC Entertainment (AMC) — popcorn, screens, and squeeze lore. Entertainment reference only — not an endorsement.",
    logo: "img/tokens/amc.png",
  },
  {
    id: "bb",
    ticker: "BB",
    name: "BlackBerry",
    label: "Keyboard classic",
    blurb: "BlackBerry (BB) — a staple of the meme-stock roster. Cultural reference only.",
    logo: "img/tokens/bb.png",
  },
  {
    id: "nok",
    ticker: "NOK",
    name: "Nokia",
    label: "Brick energy",
    blurb: "Nokia (NOK) — unbreakable meme energy. Cultural reference only.",
    logo: "img/tokens/nok.png",
  },
  {
    id: "bbby",
    ticker: "BBBY",
    name: "Bed Bath & Beyond",
    label: "Beyond towels",
    blurb: "Bed Bath & Beyond (BBBY) — retail chaos chronicles. Cultural reference only.",
    logo: "img/tokens/bbby.png",
  },
  {
    id: "tsla",
    ticker: "TSLA",
    name: "Tesla",
    label: "Rocket rides",
    blurb: "Tesla (TSLA) — chart theater favorite. Cultural reference only; not affiliated.",
    logo: "img/tokens/tsla.png",
  },
  {
    id: "nvda",
    ticker: "NVDA",
    name: "Nvidia",
    label: "Chip season",
    blurb: "Nvidia (NVDA) — green candles and GPU lore. Cultural reference only.",
    logo: "img/tokens/nvda.png",
  },
  {
    id: "pltr",
    ticker: "PLTR",
    name: "Palantir",
    label: "Data stonks",
    blurb: "Palantir (PLTR) — retail-favorite ticker energy. Cultural reference only.",
    logo: "img/tokens/pltr.png",
  },
  {
    id: "hood",
    ticker: "HOOD",
    name: "Robinhood",
    label: "Confetti taps",
    blurb: "Robinhood (HOOD) — app-era trading memes. Cultural reference only.",
    logo: "img/tokens/hood.png",
  },
  {
    id: "mstr",
    ticker: "MSTR",
    name: "MicroStrategy",
    label: "BTC treasury",
    blurb: "MicroStrategy (MSTR) — strategy + bitcoin lore. Cultural reference only.",
    logo: "img/tokens/mstr.png",
  },
  {
    id: "coin",
    ticker: "COIN",
    name: "Coinbase",
    label: "Exchange era",
    blurb: "Coinbase (COIN) — crypto market gateway vibes. Cultural reference only.",
    logo: "img/tokens/coin.png",
  },
  {
    id: "bynd",
    ticker: "BYND",
    name: "Beyond Meat",
    label: "Plant pump",
    blurb: "Beyond Meat (BYND) — meme-menu regular. Cultural reference only.",
    logo: "img/tokens/bynd.png",
  },
  {
    id: "spce",
    ticker: "SPCE",
    name: "Virgin Galactic",
    label: "To space",
    blurb: "Virgin Galactic (SPCE) — literal moon-adjacent ticker. Cultural reference only.",
    logo: "img/tokens/spce.png",
  },
  {
    id: "sofi",
    ticker: "SOFI",
    name: "SoFi",
    label: "Fintech wave",
    blurb: "SoFi (SOFI) — finance-app meme lane. Cultural reference only.",
    logo: "img/tokens/sofi.png",
  },
  {
    id: "rivn",
    ticker: "RIVN",
    name: "Rivian",
    label: "EV trail",
    blurb: "Rivian (RIVN) — adventure EV stonk energy. Cultural reference only.",
    logo: "img/tokens/rivn.png",
  },
  {
    id: "lcid",
    ticker: "LCID",
    name: "Lucid",
    label: "Luxury EV",
    blurb: "Lucid (LCID) — sleek EV ticker lore. Cultural reference only.",
    logo: "img/tokens/lcid.svg",
  },
  {
    id: "wish",
    ticker: "WISH",
    name: "ContextLogic / Wish",
    label: "Wishlist",
    blurb: "ContextLogic / Wish (WISH) — retail meme chronicles. Cultural reference only.",
    logo: "img/tokens/wish.png",
  },
  {
    id: "clov",
    ticker: "CLOV",
    name: "Clover Health",
    label: "Health bets",
    blurb: "Clover Health (CLOV) — classic retail-favorite ticker. Cultural reference only.",
    logo: "img/tokens/clov.png",
  },
  {
    id: "tlry",
    ticker: "TLRY",
    name: "Tilray",
    label: "Green wave",
    blurb: "Tilray (TLRY) — long-running meme-stock energy. Cultural reference only.",
    logo: "img/tokens/tlry.png",
  },
  {
    id: "tup",
    ticker: "TUP",
    name: "Tupperware",
    label: "Seal the bag",
    blurb: "Tupperware (TUP) — sealed-bag meme energy. Cultural reference only.",
    logo: "img/tokens/tup.png",
  },
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function simplifyMotion() {
  return prefersReducedMotion() || isMobile();
}

/* ---------- Loading ---------- */
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
    initAfterLoad();
  };

  if (prefersReducedMotion()) {
    fill.setAttribute("y", "20");
    fill.setAttribute("height", "90");
    pct.textContent = "100%";
    window.setTimeout(finish, 200);
    return;
  }

  const start = performance.now();
  const duration = 1600;

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    const bodyH = Math.max(8, 90 * eased);
    const bodyY = 110 - bodyH;
    fill.setAttribute("y", String(bodyY));
    fill.setAttribute("height", String(bodyH));
    pct.textContent = `${Math.round(eased * 100)}%`;
    if (t < 1) requestAnimationFrame(tick);
    else window.setTimeout(finish, 280);
  };

  requestAnimationFrame(tick);
}

/* ---------- Nav ---------- */
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

/* ---------- Ticker / coins / market ---------- */
function buildTicker() {
  const track = document.getElementById("ticker-track");
  const items = [...TICKERS, ...TICKERS];
  track.innerHTML = items
    .map(
      (sym) =>
        `<div class="ticker-item"><span class="ticker-dot"></span><span>${sym}</span><span class="ticker-up">▲</span><span style="opacity:.4">•</span></div>`,
    )
    .join("");
}

function buildHeroCoins() {
  if (simplifyMotion()) return;
  const wrap = document.getElementById("hero-coins");
  if (!wrap) return;

  // Real stonk logos rising behind the mascot
  const rising = [
    { logo: "img/tokens/gme.png", left: "8%", delay: "0s", dur: "7.5s", size: "3.5rem" },
    { logo: "img/tokens/amc.png", left: "18%", delay: "1.1s", dur: "8.2s", size: "2.9rem" },
    { logo: "img/tokens/bb.png", left: "26%", delay: "2.4s", dur: "6.8s", size: "3.1rem" },
    { logo: "img/tokens/nok.png", left: "68%", delay: "0.6s", dur: "7.9s", size: "3rem" },
    { logo: "img/tokens/tsla.png", left: "76%", delay: "1.7s", dur: "8.5s", size: "3.3rem" },
    { logo: "img/tokens/nvda.png", left: "86%", delay: "2.9s", dur: "7.1s", size: "2.8rem" },
    { logo: "img/tokens/hood.png", left: "12%", delay: "3.8s", dur: "8.8s", size: "3rem" },
    { logo: "img/tokens/coin.png", left: "82%", delay: "4.5s", dur: "6.6s", size: "2.7rem" },
  ];

  wrap.innerHTML = rising
    .map(
      (c) => `
      <div class="hero-coin" style="left:${c.left};animation-delay:${c.delay};animation-duration:${c.dur};width:${c.size};height:${c.size}">
        <img src="${c.logo}" alt="" width="64" height="64" decoding="async" />
      </div>`,
    )
    .join("");
}

function buildStonkGrid() {
  const grid = document.getElementById("stonk-grid");
  grid.innerHTML = STONKS.map(
    (coin) => `
    <li>
      <button type="button" class="comic-panel coin-card reveal-up" data-stonk="${coin.id}">
        <img class="coin-art" src="${coin.logo}" alt="" width="80" height="80" loading="lazy" />
        <span class="coin-name">${coin.name}</span>
        <span class="coin-ticker">$${coin.ticker}</span>
        <span class="coin-label">${coin.label}</span>
      </button>
    </li>`,
  ).join("");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-stonk]");
    if (!btn) return;
    const coin = STONKS.find((c) => c.id === btn.dataset.stonk);
    if (coin) openModal(coin);
  });
}

function buildMarketChart() {
  const chart = document.getElementById("market-chart");
  if (!chart) return;

  const candles = [
    { h: 28, wick: 10, logo: "img/tokens/gme.png", ticker: "GME" },
    { h: 36, wick: 12, logo: "img/tokens/amc.png", ticker: "AMC" },
    { h: 32, wick: 8, logo: "img/tokens/bb.png", ticker: "BB" },
    { h: 44, wick: 14, logo: "img/tokens/nok.png", ticker: "NOK" },
    { h: 52, wick: 11, logo: "img/tokens/tsla.png", ticker: "TSLA" },
    { h: 48, wick: 9, logo: "img/tokens/nvda.png", ticker: "NVDA" },
    { h: 62, wick: 13, logo: "img/tokens/pltr.png", ticker: "PLTR" },
    { h: 70, wick: 10, logo: "img/tokens/hood.png", ticker: "HOOD" },
    { h: 78, wick: 12, logo: "img/tokens/mstr.png", ticker: "MSTR" },
    { h: 88, wick: 15, logo: "img/tokens/coin.png", ticker: "COIN" },
  ];

  chart.innerHTML = `
    <div class="market-grid" aria-hidden="true"></div>
    <svg class="market-trend" viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="stonkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5CE31E" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#5CE31E" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      <path class="market-area" d="M40 250 L130 230 L220 240 L310 200 L400 175 L490 185 L580 145 L670 120 L760 95 L860 60 L960 40 L960 300 L40 300 Z" fill="url(#stonkFill)"/>
      <path class="market-line" d="M40 250 L130 230 L220 240 L310 200 L400 175 L490 185 L580 145 L670 120 L760 95 L860 60 L960 40" fill="none" stroke="#5CE31E" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="market-line-ink" d="M40 250 L130 230 L220 240 L310 200 L400 175 L490 185 L580 145 L670 120 L760 95 L860 60 L960 40" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="market-arrow">
        <path d="M920 28 L990 18 L955 55 Z" fill="#5CE31E" stroke="#000" stroke-width="4" stroke-linejoin="round"/>
      </g>
    </svg>
    <div class="market-candles">
      ${candles
        .map(
          (c, i) => `
        <div class="market-col" style="--i:${i}">
          <div class="market-coin-wrap">
            <img class="market-coin" src="${c.logo}" alt="${c.ticker}" loading="lazy" width="64" height="64" />
            <span class="market-ticker-tag">$${c.ticker}</span>
          </div>
          <div class="market-wick" style="height:${c.wick}%"></div>
          <div class="market-candle" style="--h:${c.h}%">
            <span class="market-candle-shine"></span>
          </div>
        </div>`,
        )
        .join("")}
    </div>
    <div class="market-burst" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
  `;

  const panel = document.getElementById("market-panel");
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      panel.classList.add("is-playing");
      io.disconnect();
    },
    { threshold: 0.35 },
  );
  if (panel) io.observe(panel);
}

/* ---------- Modal ---------- */
function openModal(coin) {
  const modal = document.getElementById("stonk-modal");
  document.getElementById("modal-logo").src = coin.logo;
  document.getElementById("modal-title").textContent = coin.name;
  document.getElementById("modal-ticker").textContent = `$${coin.ticker}`;
  document.getElementById("modal-label").textContent = coin.label;
  document.getElementById("modal-blurb").textContent = coin.blurb;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("stonk-modal").hidden = true;
  document.body.style.overflow = "";
}

function initModal() {
  const modal = document.getElementById("stonk-modal");
  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

/* ---------- Copy / confetti ---------- */
function canCopyContract() {
  return (
    CONFIG.contractAddress &&
    CONFIG.contractAddress !== "[CONTRACT ADDRESS]" &&
    CONFIG.contractAddress !== "CA SOON" &&
    !CONFIG.contractAddress.startsWith("[")
  );
}

function initCopy() {
  const address = CONFIG.contractAddress;
  document.getElementById("contract-address").textContent = address;
  document.getElementById("footer-contract").textContent = address;
  document.getElementById("hero-contract-address").textContent = address;

  const buttons = [
    document.getElementById("copy-contract"),
    document.getElementById("copy-footer"),
    document.getElementById("copy-hero"),
  ];

  if (!canCopyContract()) return;

  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(address);
        const prev = btn.textContent;
        btn.textContent = "COPIED. MORE STONKS.";
        window.setTimeout(() => {
          btn.textContent = prev;
        }, 2200);
      } catch {
        /* ignore */
      }
    });
  });
}

function spawnConfetti(origin) {
  if (prefersReducedMotion()) return;
  const rect = origin.getBoundingClientRect();
  const colors = ["#5CE31E", "#F5C518", "#3B82F6", "#E11D48", "#FFF"];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement("span");
    el.className = "confetti-burst-piece";
    el.style.left = `${rect.left + rect.width / 2}px`;
    el.style.top = `${rect.top + rect.height / 2}px`;
    el.style.setProperty("--dx", `${(Math.random() - 0.5) * 180}px`);
    el.style.setProperty("--dy", `${-40 - Math.random() * 140}px`);
    el.style.setProperty("--rot", `${(Math.random() - 0.5) * 720}deg`);
    el.style.background = colors[i % colors.length];
    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), 900);
  }
}

function initConfetti() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-confetti]");
    if (btn) spawnConfetti(btn);
  });
}

/* ---------- Scroll reveals / traveler ---------- */
function initReveals() {
  const nodes = document.querySelectorAll(".reveal, .reveal-up");
  if (prefersReducedMotion()) {
    nodes.forEach((n) => n.classList.add("is-in"));
    return;
  }

  // Hero sequence
  const heroBits = document.querySelectorAll("[data-hero]");
  heroBits.forEach((el, i) => {
    window.setTimeout(() => el.classList.add("is-in"), 80 + i * 120);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  nodes.forEach((n) => {
    if (!n.hasAttribute("data-hero")) io.observe(n);
  });
}

function initBuyTraveler() {
  const section = document.getElementById("how-to-buy");
  const traveler = document.getElementById("buy-traveler");
  if (!section || !traveler || simplifyMotion()) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const view = window.innerHeight;
    const start = view * 0.6;
    const end = -rect.height + view * 0.4;
    const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
    traveler.style.left = `${progress * 92}%`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Custom cursor ---------- */
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

function initAfterLoad() {
  initReveals();
  initBuyTraveler();
  initCursor();
}

/* ---------- Boot ---------- */
document.getElementById("year").textContent = String(new Date().getFullYear());
buildTicker();
buildHeroCoins();
buildStonkGrid();
buildMarketChart();
initNav();
initModal();
initCopy();
initConfetti();
runLoading();
