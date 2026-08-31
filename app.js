// ══════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════
const ZONES = [
  {
    city: "New York",
    country: "USA",
    flag: "🗽",
    tz: "America/New_York",
    a: "#63b3ed",
    b: "#4299e1",
  },
  {
    city: "London",
    country: "UK",
    flag: "🎡",
    tz: "Europe/London",
    a: "#68d391",
    b: "#38a169",
  },
  {
    city: "Paris",
    country: "France",
    flag: "🗼",
    tz: "Europe/Paris",
    a: "#f687b3",
    b: "#d53f8c",
  },
  {
    city: "Dubai",
    country: "UAE",
    flag: "🏙️",
    tz: "Asia/Dubai",
    a: "#f6ad55",
    b: "#ed8936",
  },
  {
    city: "Mumbai",
    country: "India",
    flag: "🕌",
    tz: "Asia/Kolkata",
    a: "#fc8181",
    b: "#e53e3e",
  },
  {
    city: "Singapore",
    country: "Singapore",
    flag: "🦁",
    tz: "Asia/Singapore",
    a: "#76e4f7",
    b: "#0bc5ea",
  },
  {
    city: "Tokyo",
    country: "Japan",
    flag: "🗾",
    tz: "Asia/Tokyo",
    a: "#f687b3",
    b: "#b83280",
  },
  {
    city: "Sydney",
    country: "Australia",
    flag: "🦘",
    tz: "Australia/Sydney",
    a: "#68d391",
    b: "#276749",
  },
  {
    city: "Los Angeles",
    country: "USA",
    flag: "🎬",
    tz: "America/Los_Angeles",
    a: "#b794f4",
    b: "#9f7aea",
  },
  {
    city: "Chicago",
    country: "USA",
    flag: "🌆",
    tz: "America/Chicago",
    a: "#63b3ed",
    b: "#3182ce",
  },
  {
    city: "Toronto",
    country: "Canada",
    flag: "🍁",
    tz: "America/Toronto",
    a: "#fc8181",
    b: "#c53030",
  },
  {
    city: "São Paulo",
    country: "Brazil",
    flag: "🌿",
    tz: "America/Sao_Paulo",
    a: "#68d391",
    b: "#276749",
  },
  {
    city: "Cairo",
    country: "Egypt",
    flag: "🏺",
    tz: "Africa/Cairo",
    a: "#f6ad55",
    b: "#c05621",
  },
  {
    city: "Nairobi",
    country: "Kenya",
    flag: "🌍",
    tz: "Africa/Nairobi",
    a: "#68d391",
    b: "#276749",
  },
  {
    city: "Moscow",
    country: "Russia",
    flag: "🏛️",
    tz: "Europe/Moscow",
    a: "#fc8181",
    b: "#e53e3e",
  },
  {
    city: "Berlin",
    country: "Germany",
    flag: "🍺",
    tz: "Europe/Berlin",
    a: "#f6ad55",
    b: "#dd6b20",
  },
  {
    city: "Seoul",
    country: "South Korea",
    flag: "🎎",
    tz: "Asia/Seoul",
    a: "#b794f4",
    b: "#805ad5",
  },
  {
    city: "Bangkok",
    country: "Thailand",
    flag: "🐘",
    tz: "Asia/Bangkok",
    a: "#f6ad55",
    b: "#c05621",
  },
  {
    city: "Jakarta",
    country: "Indonesia",
    flag: "🌴",
    tz: "Asia/Jakarta",
    a: "#68d391",
    b: "#276749",
  },
  {
    city: "Auckland",
    country: "New Zealand",
    flag: "🥝",
    tz: "Pacific/Auckland",
    a: "#63b3ed",
    b: "#2b6cb0",
  },
  {
    city: "Honolulu",
    country: "Hawaii",
    flag: "🌺",
    tz: "Pacific/Honolulu",
    a: "#f687b3",
    b: "#97266d",
  },
  {
    city: "Mexico City",
    country: "Mexico",
    flag: "🌵",
    tz: "America/Mexico_City",
    a: "#68d391",
    b: "#276749",
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    flag: "🥩",
    tz: "America/Argentina/Buenos_Aires",
    a: "#63b3ed",
    b: "#2c5282",
  },
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    flag: "🕌",
    tz: "Asia/Riyadh",
    a: "#f6ad55",
    b: "#744210",
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    flag: "🇲🇾",
    tz: "Asia/Kuala_Lumpur",
    a: "#68d391",
    b: "#276749",
  },
  {
    city: "Taipei",
    country: "Taiwan",
    flag: "🇹🇼",
    tz: "Asia/Taipei",
    a: "#76e4f7",
    b: "#0bc5ea",
  },
  {
    city: "Manila",
    country: "Philippines",
    flag: "🇵🇭",
    tz: "Asia/Manila",
    a: "#f6ad55",
    b: "#c05621",
  },
];
const DEFAULT_TZ = [
  "Asia/Manila",
  "America/Chicago",
];

// ══════════════════════════════════════════════════
// STATE — clears saved data if defaults change
// ══════════════════════════════════════════════════
let _mem = null;
const load = () => {
  try {
    return JSON.parse(localStorage.getItem("zlock") || "null");
  } catch {
    return _mem;
  }
};
const save = () => {
  try {
    localStorage.setItem("zlock", JSON.stringify(active));
  } catch {
    _mem = active.slice();
  }
};
// Reset saved zones if the defaults version changed (v4 = Manila+Chicago defaults)
try {
  if (localStorage.getItem("zlock-v") !== "4") {
    localStorage.removeItem("zlock");
    localStorage.setItem("zlock-v", "4");
  }
} catch {}
const active =
  load() || DEFAULT_TZ.map((tz) => ZONES.find((z) => z.tz === tz));

// ══════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════
const pad = (n) => String(n).padStart(2, "0");
const zDate = (tz) =>
  new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
const fmt = (d) => {
  let h = d.getHours(),
    m = d.getMinutes();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return { hm: `${pad(h)}:${pad(m)}`, ap };
};
const offset = (tz) => {
  const diff = (zDate(tz) - new Date()) / 3600000;
  const s = diff >= 0 ? "+" : "−";
  const h = Math.floor(Math.abs(diff));
  const m = Math.round((Math.abs(diff) - h) * 60);
  return `UTC${s}${pad(h)}:${pad(m)}`;
};
const dayRel = (tz) => {
  const there = zDate(tz),
    here = new Date();
  const d = there.getDate() - here.getDate();
  if (d === 1 || d < -20) return "tmr";
  if (d === -1 || d > 20) return "ysd";
  return "";
};

// ══════════════════════════════════════════════════
// RENDER CARDS
// ══════════════════════════════════════════════════
const wrap = document.getElementById("zonesWrap");
const addBtn = document.getElementById("addBtn");

function renderCards() {
  // Remove old cards (keep addBtn)
  wrap.querySelectorAll(".clock-card").forEach((el) => el.remove());

  active.forEach((z, i) => {
    const rel = dayRel(z.tz);
    const card = document.createElement("div");
    card.className = "clock-card";
    card.style.setProperty("--ca", z.a);
    card.style.setProperty("--cb", z.b);
    card.dataset.i = i;
    card.innerHTML = `
  <button class="remove-btn" data-i="${i}" title="Remove">×</button>
  <div class="card-flag">${z.flag}</div>
  <div class="card-info">
    <div class="card-city">${z.city}</div>
    <div class="card-country">${z.country}</div>
  </div>
  <div class="card-time-col">
    <div class="card-time" data-t="${i}">
      <span class="hm">--:--</span><span class="card-ampm">--</span>
    </div>
    <div class="card-meta">
      <span class="card-date" data-d="${i}">—</span>
      <span class="card-offset">${offset(z.tz)}</span>
      ${rel ? `<span class="card-day ${rel}">${rel === "tmr" ? "tomorrow" : "yesterday"}</span>` : ""}
    </div>
  </div>
`;
    wrap.insertBefore(card, addBtn);
  });

  wrap.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      active.splice(+btn.dataset.i, 1);
      save();
      renderCards();
      fillModal();
    });
  });
}

// ══════════════════════════════════════════════════
// TICK
// ══════════════════════════════════════════════════
function tick() {
  // Cards only
  active.forEach((z, i) => {
    const el = document.querySelector(`[data-t="${i}"]`);
    if (!el) return;
    const targetDate = zDate(z.tz);
    const { hm, ap } = fmt(targetDate);
    el.querySelector(".hm").textContent = hm;
    el.querySelector(".card-ampm").textContent = ap;

    // Update card date (e.g. Aug 29)
    const dateEl = document.querySelector(`[data-d="${i}"]`);
    if (dateEl) {
      dateEl.textContent = targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  });
}

// ══════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════
let _tt = null;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  if (_tt) clearTimeout(_tt);
  _tt = setTimeout(() => el.classList.remove("show"), 2000);
}

// ══════════════════════════════════════════════════
// MODAL
// ══════════════════════════════════════════════════
const overlay = document.getElementById("overlay");
const tzList = document.getElementById("tzList");
const search = document.getElementById("tzSearch");
let query = "";

function available() {
  const set = new Set(active.map((z) => z.tz));
  const q = query.toLowerCase().trim();
  return ZONES.filter(
    (z) =>
      !set.has(z.tz) &&
      (!q ||
        z.city.toLowerCase().includes(q) ||
        z.country.toLowerCase().includes(q) ||
        z.tz.toLowerCase().includes(q)),
  );
}

function addZone(z) {
  active.push(z);
  save();
  renderCards();
  toast(`✓ ${z.city} added`);
  fillModal();
}

function fillModal() {
  tzList.innerHTML = "";
  const list = available();
  if (!list.length) {
    tzList.innerHTML = `<div class="tz-empty">${
      query
        ? `No results for "<strong>${query}</strong>"`
        : "All zones added!"
    }</div>`;
    return;
  }
  list.forEach((z) => {
    const d = document.createElement("div");
    d.className = "tz-opt";
    d.tabIndex = 0;
    d.setAttribute("role", "button");
    d.innerHTML = `
  <span class="tz-opt-flag">${z.flag}</span>
  <div class="tz-opt-info">
    <div class="tz-opt-name">${z.city}, ${z.country}</div>
    <div class="tz-opt-tz">${z.tz.replace(/_/g, " ")}</div>
  </div>
  <span class="tz-opt-off">${offset(z.tz)}</span>
`;
    const go = () => addZone(z);
    d.addEventListener("click", go);
    d.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
    tzList.appendChild(d);
  });
}

function openModal() {
  query = "";
  search.value = "";
  document.getElementById("customInput").value = "";
  fillModal();
  document.body.classList.add("modal-open");
  overlay.classList.add("open");
  setTimeout(() => search.focus(), 60);
}
function closeModal() {
  document.body.classList.remove("modal-open");
  overlay.classList.remove("open");
}

search.addEventListener("input", () => {
  query = search.value;
  fillModal();
});
document
  .getElementById("modalClose")
  .addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Custom TZ
function tryCustom() {
  const inp = document.getElementById("customInput");
  const raw = inp.value.trim();
  if (!raw) return;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: raw }).format(
      new Date(),
    );
  } catch {
    inp.classList.add("err");
    setTimeout(() => inp.classList.remove("err"), 500);
    toast("⚠ Invalid timezone");
    return;
  }
  if (active.some((z) => z.tz === raw)) {
    toast("Already added");
    closeModal();
    return;
  }
  const parts = raw.split("/");
  const c = [
    "#63b3ed",
    "#68d391",
    "#f687b3",
    "#f6ad55",
    "#b794f4",
    "#76e4f7",
  ][active.length % 6];
  addZone({
    city: parts[parts.length - 1].replace(/_/g, " "),
    country: parts[0] || "Custom",
    flag: "🌐",
    tz: raw,
    a: c,
    b: c,
  });
  inp.value = "";
  closeModal();
}
document.getElementById("customAdd").addEventListener("click", tryCustom);
document
  .getElementById("customInput")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryCustom();
  });

addBtn.addEventListener("click", openModal);

document.getElementById("btnClose").addEventListener("click", () => {
  window.close();
});

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
renderCards();
tick();
setInterval(tick, 1000);
