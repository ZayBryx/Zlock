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
  load() || DEFAULT_TZ.map((tz) => ({ ...ZONES.find((z) => z.tz === tz) }));

// ══════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2600);
}

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
// ══════════════════════════════════════════════════
// WORLD CLOCK SCRUBBER & TIMELINE RIBBON ENGINE
// ══════════════════════════════════════════════════
let clockScrubOffset = 0; // Offset in hours relative to current time (-12 to +12)
let hoveredHourCol = null; // Currently hovered timeline column index (0 to 23)

const wrap = document.getElementById("zonesWrap");
const addBtn = document.getElementById("addBtn");

// Helper to get time zone abbreviation (e.g. BST, EEST, MSK, EST, PST, etc.)
function getTzAbbr(tz, date = new Date()) {
  try {
    const str = date.toLocaleDateString("en-US", { timeZone: tz, timeZoneName: "short" });
    const parts = str.split(" ");
    return parts[parts.length - 1] || "";
  } catch {
    return "";
  }
}

// Calculate relative offset in hours compared to the base (first active zone or local)
function getRelOffsetStr(tz) {
  if (!active || active.length === 0) return "";
  const baseTz = active[0].tz;
  if (tz === baseTz) return ""; // base city top indicator
  const now = new Date();
  const baseDate = new Date(now.toLocaleString("en-US", { timeZone: baseTz }));
  const cityDate = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const diffHours = Math.round((cityDate - baseDate) / 3600000);
  if (diffHours === 0) return "+0";
  return diffHours > 0 ? `+${diffHours}` : `−${Math.abs(diffHours)}`;
}

// Helper to get scrubbed Date object for a timeZone
function getScrubbedDate(tz) {
  const nowMs = Date.now() + clockScrubOffset * 3600000;
  const scrubbedNow = new Date(nowMs);
  return new Date(scrubbedNow.toLocaleString("en-US", { timeZone: tz }));
}

function fmtScrubbedTime(d) {
  let h = d.getHours(),
    m = d.getMinutes();
  const ampmStr = h >= 12 ? "p" : "a";
  h = h % 12 || 12;
  return {
    hm: `${h}:${pad(m)}`,
    ap: ampmStr
  };
}

function fmtScrubbedDate(d) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

let userSavedScrollLeft = null;

function renderCards(keepScrollPosition = false) {
  if (!wrap) return;

  const firstRibbon = wrap.querySelector(".timeline-ribbon-wrap");
  if (firstRibbon) {
    userSavedScrollLeft = firstRibbon.scrollLeft;
  }

  // Remove old cards (keep addBtn if present)
  wrap.querySelectorAll(".clock-card").forEach((el) => el.remove());

  const baseZone = active[0] ? active[0].tz : "UTC";
  const baseScrubbedDate = getScrubbedDate(baseZone);

  active.forEach((z, i) => {
    const cardDate = getScrubbedDate(z.tz);
    const { hm, ap } = fmtScrubbedTime(cardDate);
    const dateStr = fmtScrubbedDate(cardDate);
    const relOffset = getRelOffsetStr(z.tz);
    const tzAbbr = getTzAbbr(z.tz, cardDate);

    const card = document.createElement("div");
    card.className = "clock-card";
    card.style.setProperty("--ca", z.a);
    card.style.setProperty("--cb", z.b);
    card.dataset.i = i;

    // Generate 24-hour horizontal ribbon cells
    // Column 6 corresponds to the current scrubbed date/time
    let ribbonCellsHtml = "";
    let prevDay = null;

    for (let col = 0; col < 24; col++) {
      // Cell time is shifted (col - 6) hours relative to cardDate
      const cellMs = cardDate.getTime() + (col - 6) * 3600000;
      const cellDate = new Date(cellMs);
      const h = cellDate.getHours();
      const monthStr = cellDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
      const dayNum = cellDate.getDate();

      // Determine hour label (e.g. "1 am", "7 am", "12 pm", "6 pm")
      const h12 = h % 12 || 12;
      const ampm = h >= 12 ? "pm" : "am";
      const hourLabelHtml = `<span class="h-num">${h12}</span><span class="h-ap">${ampm}</span>`;

      // Color coding class based on daylight / business hours
      let timeOfDayClass = "night";
      if (h >= 6 && h < 8) timeOfDayClass = "early";
      else if (h >= 8 && h < 18) timeOfDayClass = "business";
      else if (h >= 18 && h < 24) timeOfDayClass = "evening";

      const isTargetHour = col === 6;
      const isHighlighted = hoveredHourCol === col;
      const isDateBoundary = col === 0 || (prevDay !== null && dayNum !== prevDay);

      prevDay = dayNum;

      if (isDateBoundary) {
        ribbonCellsHtml += `
          <div class="hour-cell date-badge-cell ${timeOfDayClass} ${isTargetHour ? 'current-hour' : ''} ${isHighlighted ? 'highlighted' : ''}" data-col="${col}">
            <div class="date-badge">
              <span class="date-month">${monthStr}</span>
              <span class="date-day">${dayNum}</span>
            </div>
            <div class="hour-label">${hourLabelHtml}</div>
          </div>
        `;
      } else {
        ribbonCellsHtml += `
          <div class="hour-cell ${timeOfDayClass} ${isTargetHour ? 'current-hour' : ''} ${isHighlighted ? 'highlighted' : ''}" data-col="${col}">
            <div class="hour-label">${hourLabelHtml}</div>
          </div>
        `;
      }
    }

    card.innerHTML = `
      <button class="remove-btn" data-i="${i}" title="Remove city">×</button>
      
      <div class="card-left-col">
        <div class="card-header-line">
          ${i === 0 ? `<span class="base-city-icon" title="Base Timezone">▲</span>` : `<span class="card-rel-offset">${relOffset}</span>`}
          <span class="card-city">${z.city}</span>
          ${tzAbbr ? `<span class="card-tz-abbr">${tzAbbr}</span>` : ""}
        </div>
        <div class="card-country">${z.country}</div>
        <div class="card-time-row" data-t="${i}">
          <span class="card-time-val">${hm}<span class="card-ampm">${ap}</span></span>
          <span class="card-date-val" data-d="${i}">${dateStr}</span>
        </div>
      </div>

      <div class="timeline-ribbon-wrap" data-row="${i}">
        ${ribbonCellsHtml}
      </div>
    `;

    if (addBtn && wrap.contains(addBtn)) {
      wrap.insertBefore(card, addBtn);
    } else {
      wrap.appendChild(card);
    }
  });

  // Attach event handlers for remove buttons
  wrap.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      active.splice(+btn.dataset.i, 1);
      save();
      renderCards();
      fillModal();
    });
  });

  // Attach interactive hover scrubber handlers & scroll sync for timeline ribbons
  setupTimelineHoverListeners();
  setupTimelineScrollSync();

  if (keepScrollPosition && userSavedScrollLeft !== null) {
    const ribbons = wrap.querySelectorAll(".timeline-ribbon-wrap");
    ribbons.forEach((r) => (r.scrollLeft = userSavedScrollLeft));
  }
}

let isSyncingRibbonScroll = false;

function setupTimelineScrollSync() {
  const ribbonWraps = wrap.querySelectorAll(".timeline-ribbon-wrap");
  ribbonWraps.forEach((ribbon) => {
    // Enable hover mouse wheel horizontal sliding left/right
    ribbon.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        ribbonWraps.forEach((r) => {
          r.scrollLeft += delta;
        });
      },
      { passive: false }
    );

    // Sync scroll position across all city ribbons
    ribbon.addEventListener(
      "scroll",
      () => {
        if (isSyncingRibbonScroll) return;
        isSyncingRibbonScroll = true;
        const scrollLeft = ribbon.scrollLeft;
        ribbonWraps.forEach((r) => {
          if (r !== ribbon) r.scrollLeft = scrollLeft;
        });
        requestAnimationFrame(() => {
          isSyncingRibbonScroll = false;
        });
      },
      { passive: true }
    );
  });
}

function setupTimelineHoverListeners() {
  const ribbonWraps = wrap.querySelectorAll(".timeline-ribbon-wrap");
  ribbonWraps.forEach((ribbon) => {
    ribbon.addEventListener("mousemove", (e) => {
      const cell = e.target.closest(".hour-cell");
      if (cell) {
        const col = parseInt(cell.dataset.col);
        if (!isNaN(col) && col !== hoveredHourCol) {
          hoveredHourCol = col;
          updateTimelineHighlights();
        }
      }
    });

    ribbon.addEventListener("mouseleave", () => {
      if (hoveredHourCol !== null) {
        hoveredHourCol = null;
        updateTimelineHighlights();
      }
    });
  });
}

function updateTimelineHighlights() {
  // Update hover line highlighting across all city ribbons
  wrap.querySelectorAll(".hour-cell").forEach((cell) => {
    const col = parseInt(cell.dataset.col);
    if (hoveredHourCol !== null && col === hoveredHourCol) {
      cell.classList.add("highlighted");
    } else {
      cell.classList.remove("highlighted");
    }
  });

  // Update scrub info label if hovering
  const scrubInfoEl = document.getElementById("clockScrubInfo");
  if (!scrubInfoEl) return;

  if (hoveredHourCol !== null && active.length > 0) {
    const baseZone = active[0].tz;
    const baseCardDate = getScrubbedDate(baseZone);
    const hoveredMs = baseCardDate.getTime() + (hoveredHourCol - 6) * 3600000;
    const hoveredDate = new Date(hoveredMs);
    const timeStr = hoveredDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const dateStr = hoveredDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    scrubInfoEl.textContent = `Hover slot: ${dateStr}, ${timeStr} (${active[0].city})`;
  } else {
    scrubInfoEl.textContent = "Scroll mouse wheel on timeline to slide hours left or right";
  }
}

// ══════════════════════════════════════════════════
// TICK
// ══════════════════════════════════════════════════
function tick() {
  // If live (clockScrubOffset === 0) and not currently scrubbing with mouse, update times and timeline
  if (clockScrubOffset === 0 && hoveredHourCol === null) {
    renderCards(true);
  }

  if (typeof updateClockifyTimerDisplay === "function") {
    updateClockifyTimerDisplay();
  }
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
  active.push({ ...z });
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
// WORK NOTES APPLICATION (RICH TEXT)
// ══════════════════════════════════════════════════
let notes = [];
const loadNotes = () => {
  try {
    return JSON.parse(localStorage.getItem("zlock-notes") || "null");
  } catch {
    return [];
  }
};
const saveNotes = () => {
  try {
    localStorage.setItem("zlock-notes", JSON.stringify(notes));
  } catch {}
};

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInitialContent(raw) {
  if (!raw) return "<p><br></p>";
  if (/<[a-z][\s\S]*>/i.test(raw)) {
    return raw;
  }
  return raw
    .split("\n")
    .map((line) => (line.trim() ? `<p>${escapeHtml(line)}</p>` : "<p><br></p>"))
    .join("");
}

// Seed a rich default note if empty
notes = loadNotes();
if (!notes || notes.length === 0) {
  notes = [
    {
      id: "welcome-note",
      title: "Welcome to Rich Notes 🚀",
      content: `<h1>Work Notes & Productivity</h1><p>Your upgraded rich-text workspace with live formatting and checklists.</p><h3>✨ Productivity Features</h3><ul><li><strong>Headings:</strong> H1 through H5 for clear document structure</li><li><strong>Formatting:</strong> <b>Bold</b>, <i>Italic</i>, <u>Underline</u>, <s>Strikethrough</s>, and <code>inline code</code></li><li><strong>Lists:</strong> Bullet points, numbered sequences, and divider lines</li></ul><h3>📋 Today's Checklist</h3><ul class="task-list"><li class="task-item completed"><input type="checkbox" checked="checked"> <span class="task-text">Explore rich text formatting tools</span></li><li class="task-item"><input type="checkbox"> <span class="task-text">Create a work task list</span></li><li class="task-item"><input type="checkbox"> <span class="task-text">Write your first formatted document</span></li></ul><blockquote><p>💡 Tip: Use the toolbar above to switch formats or click checkboxes directly to track your progress!</p></blockquote>`,
      updated: Date.now(),
    },
  ];
  saveNotes();
}

let activeNoteId = notes[0]?.id || null;

const notesList = document.getElementById("notesList");
const noteEditor = document.getElementById("noteEditor");

function renderNotesList() {
  notesList.innerHTML = "";
  const sorted = notes.slice().sort((a, b) => b.updated - a.updated);

  if (sorted.length === 0) {
    notesList.innerHTML = `<div class="tz-empty">All notes deleted</div>`;
    activeNoteId = null;
    renderEditor();
    return;
  }

  sorted.forEach((note) => {
    const item = document.createElement("div");
    item.className = `note-item ${note.id === activeNoteId ? "active" : ""}`;

    const d = new Date(note.updated);
    const dateStr =
      d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
      " " +
      d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    item.innerHTML = `
      <div class="note-item-title">${escapeHtml(note.title || "Untitled Note")}</div>
      <div class="note-item-date">${dateStr}</div>
      <button class="note-item-delete" data-id="${note.id}" title="Delete note">×</button>
    `;

    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("note-item-delete")) return;
      activeNoteId = note.id;
      renderNotesList();
      renderEditor();
    });

    const delBtn = item.querySelector(".note-item-delete");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteNote(note.id);
    });

    notesList.appendChild(item);
  });
}

function renderEditor() {
  const current = notes.find((n) => n.id === activeNoteId);
  if (!current) {
    noteEditor.innerHTML = `
      <div class="note-empty-state">
        <span class="note-empty-icon">📝</span>
        <div>No note selected.<br/>Create one to get started!</div>
      </div>
    `;
    return;
  }

  noteEditor.innerHTML = `
    <div class="note-editor-inner">
      <input class="note-title-input" id="noteTitle" type="text" placeholder="Untitled Note" value="${escapeHtml(current.title || "")}" autocomplete="off" spellcheck="false" />
      
      <!-- Rich Text Toolbar -->
      <div class="rt-toolbar" id="rtToolbar">
        <button type="button" class="rt-btn" data-cmd="undo" title="Undo (Ctrl+Z)">↶</button>
        <button type="button" class="rt-btn" data-cmd="redo" title="Redo (Ctrl+Y)">↷</button>
        <span class="rt-divider"></span>
        <select class="rt-format-select" id="rtFormat" title="Format Block">
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="blockquote">Quote</option>
          <option value="pre">Code Block</option>
        </select>
        <span class="rt-divider"></span>
        <button type="button" class="rt-btn" data-cmd="bold" title="Bold (Ctrl+B)"><b>B</b></button>
        <button type="button" class="rt-btn" data-cmd="italic" title="Italic (Ctrl+I)"><i>I</i></button>
        <button type="button" class="rt-btn" data-cmd="underline" title="Underline (Ctrl+U)"><u>U</u></button>
        <button type="button" class="rt-btn" data-cmd="strikeThrough" title="Strikethrough (Ctrl+Shift+X)"><s>S</s></button>
        <button type="button" class="rt-btn" id="rtCode" title="Inline Code (Ctrl+E)"><code>&lt;&gt;</code></button>
        <span class="rt-divider"></span>
        <button type="button" class="rt-btn" data-cmd="insertUnorderedList" title="Bullet List (Ctrl+Shift+8)">•≡</button>
        <button type="button" class="rt-btn" data-cmd="insertOrderedList" title="Numbered List (Ctrl+Shift+7)">1.≡</button>
        <button type="button" class="rt-btn" id="rtChecklist" title="Task Checklist (Ctrl+Shift+9)">☑</button>
        <span class="rt-divider"></span>
        <button type="button" class="rt-btn" data-cmd="insertHorizontalRule" title="Horizontal Divider">—</button>
        <button type="button" class="rt-btn" data-cmd="removeFormat" title="Clear Formatting">🧹</button>
      </div>

      <!-- Rich Text ContentEditable Area -->
      <div class="note-content-editor" id="noteContent" contenteditable="true" spellcheck="false" data-placeholder="Start typing your rich notes… (Try: # Header, - list, [ ] task)"></div>

      <!-- Status Bar -->
      <div class="note-status-bar">
        <span id="noteWordCount">0 words</span>
        <span class="status-dot">•</span>
        <span id="noteCharCount">0 chars</span>
        <span class="status-spacer"></span>
        <span class="note-save-badge" id="noteSaveBadge">✓ Saved</span>
      </div>
    </div>
  `;

  const titleInp = document.getElementById("noteTitle");
  const contentEditor = document.getElementById("noteContent");
  const formatSelect = document.getElementById("rtFormat");
  const toolbar = document.getElementById("rtToolbar");
  const wordCountEl = document.getElementById("noteWordCount");
  const charCountEl = document.getElementById("noteCharCount");
  const saveBadge = document.getElementById("noteSaveBadge");

  // Load initial rich content
  contentEditor.innerHTML = formatInitialContent(current.content);

  // Update status bar counts
  const updateCounts = () => {
    const text = contentEditor.innerText || "";
    const cleanText = text.trim();
    const words = cleanText ? cleanText.split(/\s+/).length : 0;
    const chars = text.replace(/\n/g, "").length;
    if (wordCountEl) wordCountEl.textContent = `${words} ${words === 1 ? "word" : "words"}`;
    if (charCountEl) charCountEl.textContent = `${chars} ${chars === 1 ? "char" : "chars"}`;
  };

  // Sync checkboxes completed class
  contentEditor.querySelectorAll(".task-item").forEach((item) => {
    const cb = item.querySelector("input[type='checkbox']");
    if (cb && cb.checked) {
      item.classList.add("completed");
    }
  });

  updateCounts();

  let saveTimeout = null;
  const saveCurrentNote = () => {
    current.content = contentEditor.innerHTML;
    current.updated = Date.now();
    saveNotes();
    updateCounts();

    if (saveBadge) {
      saveBadge.textContent = "Saving…";
      saveBadge.classList.add("saving");
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveBadge.textContent = "✓ Saved";
        saveBadge.classList.remove("saving");
      }, 400);
    }
  };

  titleInp.addEventListener("input", () => {
    current.title = titleInp.value;
    current.updated = Date.now();
    saveNotes();
    const activeItemTitle = notesList.querySelector(
      ".note-item.active .note-item-title",
    );
    if (activeItemTitle) {
      activeItemTitle.textContent = titleInp.value || "Untitled Note";
    }
  });

  contentEditor.addEventListener("input", () => {
    saveCurrentNote();
  });

  // Handle interactive checkboxes
  contentEditor.addEventListener("change", (e) => {
    if (e.target && e.target.type === "checkbox") {
      const taskItem = e.target.closest(".task-item");
      if (e.target.checked) {
        e.target.setAttribute("checked", "checked");
        if (taskItem) taskItem.classList.add("completed");
      } else {
        e.target.removeAttribute("checked");
        if (taskItem) taskItem.classList.remove("completed");
      }
      saveCurrentNote();
    }
  });



  // Toolbar button formatting actions
  toolbar.querySelectorAll(".rt-btn[data-cmd]").forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Prevent losing editor focus
      const cmd = btn.dataset.cmd;
      document.execCommand(cmd, false, null);
      saveCurrentNote();
      syncToolbarActiveState();
    });
  });

  // Format block dropdown (H1 - H5, P, Quote, Pre)
  formatSelect.addEventListener("change", () => {
    const val = formatSelect.value;
    contentEditor.focus();
    if (
      val === "p" ||
      val === "h1" ||
      val === "h2" ||
      val === "h3" ||
      val === "h4" ||
      val === "h5" ||
      val === "blockquote" ||
      val === "pre"
    ) {
      document.execCommand("formatBlock", false, `<${val}>`);
    }
    saveCurrentNote();
    syncToolbarActiveState();
  });

  // Inline Code formatting
  const toggleInlineCode = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const parentCode = selection.anchorNode.parentElement?.closest("code");
    if (parentCode) {
      // Unwrap code
      const text = document.createTextNode(parentCode.textContent);
      parentCode.parentNode.replaceChild(text, parentCode);
    } else {
      const codeEl = document.createElement("code");
      codeEl.appendChild(range.extractContents());
      range.insertNode(codeEl);
    }
    saveCurrentNote();
    syncToolbarActiveState();
  };

  const codeBtn = document.getElementById("rtCode");
  if (codeBtn) {
    codeBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      toggleInlineCode();
    });
  }

  // Insert or Convert Selection to Checklist
  const insertChecklist = () => {
    contentEditor.focus();
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    if (!selection.isCollapsed) {
      // Convert selected text into checklist items
      const fragment = range.cloneContents();
      const tempDiv = document.createElement("div");
      tempDiv.appendChild(fragment);

      const rawText = tempDiv.innerText || tempDiv.textContent || "";
      const lines = rawText.split(/\r?\n/).filter((l) => l.trim().length > 0);

      if (lines.length > 0) {
        const taskList = document.createElement("ul");
        taskList.className = "task-list";

        lines.forEach((line) => {
          const taskItem = document.createElement("li");
          taskItem.className = "task-item";
          const cb = document.createElement("input");
          cb.type = "checkbox";
          const textSpan = document.createElement("span");
          textSpan.className = "task-text";
          textSpan.textContent = line.trim();

          taskItem.appendChild(cb);
          taskItem.appendChild(textSpan);
          taskList.appendChild(taskItem);
        });

        range.deleteContents();
        range.insertNode(taskList);

        // Move cursor to end of taskList
        range.selectNodeContents(taskList);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);

        saveCurrentNote();
        syncToolbarActiveState();
        return;
      }
    }

    // Single empty task item
    const taskList = document.createElement("ul");
    taskList.className = "task-list";
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.innerHTML = "&nbsp;";

    taskItem.appendChild(cb);
    taskItem.appendChild(textSpan);
    taskList.appendChild(taskItem);

    range.deleteContents();
    range.insertNode(taskList);

    range.selectNodeContents(textSpan);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    saveCurrentNote();
    syncToolbarActiveState();
  };

  const checklistBtn = document.getElementById("rtChecklist");
  if (checklistBtn) {
    checklistBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      insertChecklist();
    });
  }

  // Live Markdown-style triggers and Document Keyboard Shortcuts
  contentEditor.addEventListener("keydown", (e) => {
    // ── Document Keyboard Shortcuts ──
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const cmdKey = isMac ? e.metaKey : e.ctrlKey;

    if (cmdKey) {
      // Ctrl+S: Quick Save
      if (e.key.toLowerCase() === "s" && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        saveCurrentNote();
        toast("✓ Note saved");
        return;
      }
      // Ctrl+E: Inline Code
      if (e.key.toLowerCase() === "e" && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        toggleInlineCode();
        return;
      }
      // Ctrl+Shift+X: Strikethrough
      if ((e.key.toLowerCase() === "x" && e.shiftKey) || (e.key === "5" && e.altKey && e.shiftKey)) {
        e.preventDefault();
        document.execCommand("strikeThrough", false, null);
        saveCurrentNote();
        syncToolbarActiveState();
        return;
      }
      // Ctrl+Shift+7 / Ctrl+Shift+O: Numbered list
      if ((e.key === "7" && e.shiftKey) || (e.key.toLowerCase() === "o" && e.shiftKey)) {
        e.preventDefault();
        document.execCommand("insertOrderedList", false, null);
        saveCurrentNote();
        syncToolbarActiveState();
        return;
      }
      // Ctrl+Shift+8 / Ctrl+Shift+U: Bullet list
      if ((e.key === "8" && e.shiftKey) || (e.key.toLowerCase() === "u" && e.shiftKey)) {
        e.preventDefault();
        document.execCommand("insertUnorderedList", false, null);
        saveCurrentNote();
        syncToolbarActiveState();
        return;
      }
      // Ctrl+Shift+9 / Ctrl+Shift+L: Task checklist
      if ((e.key === "9" && e.shiftKey) || (e.key.toLowerCase() === "l" && e.shiftKey)) {
        e.preventDefault();
        insertChecklist();
        return;
      }
      // Ctrl+Alt+1 .. 5: Headings
      if (e.altKey && ["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        document.execCommand("formatBlock", false, `<h${e.key}>`);
        saveCurrentNote();
        syncToolbarActiveState();
        return;
      }
      // Ctrl+Alt+0: Normal paragraph
      if (e.altKey && e.key === "0") {
        e.preventDefault();
        document.execCommand("formatBlock", false, "<p>");
        saveCurrentNote();
        syncToolbarActiveState();
        return;
      }
      // Ctrl+Alt+Q: Blockquote
      if (e.altKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        document.execCommand("formatBlock", false, "<blockquote>");
        saveCurrentNote();
        syncToolbarActiveState();
        return;
      }
    }

    // ── Tab Indentation ──
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        document.execCommand("outdent", false, null);
      } else {
        const inList = window.getSelection().anchorNode?.parentElement?.closest("li");
        if (inList) {
          document.execCommand("indent", false, null);
        } else {
          document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
        }
      }
      saveCurrentNote();
      return;
    }

    // ── Live Markdown Triggers on Space ──
    if (e.key === " " && !e.shiftKey && !cmdKey && !e.altKey) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0 && selection.isCollapsed) {
        const node = selection.anchorNode;
        if (node && node.nodeType === Node.TEXT_NODE) {
          const textBeforeCursor = node.textContent.slice(0, selection.anchorOffset);

          // Checklist trigger: [] or [ ]
          if (textBeforeCursor === "[]" || textBeforeCursor === "[ ]") {
            e.preventDefault();
            node.textContent = node.textContent.slice(selection.anchorOffset);
            insertChecklist();
            return;
          }
          // Bullet list trigger: - or *
          if (textBeforeCursor === "-" || textBeforeCursor === "*") {
            e.preventDefault();
            node.textContent = node.textContent.slice(selection.anchorOffset);
            document.execCommand("insertUnorderedList", false, null);
            saveCurrentNote();
            syncToolbarActiveState();
            return;
          }
          // Numbered list trigger: 1.
          if (textBeforeCursor === "1.") {
            e.preventDefault();
            node.textContent = node.textContent.slice(selection.anchorOffset);
            document.execCommand("insertOrderedList", false, null);
            saveCurrentNote();
            syncToolbarActiveState();
            return;
          }
          // Heading triggers: # to #####
          const headingMatch = textBeforeCursor.match(/^(#{1,5})$/);
          if (headingMatch) {
            e.preventDefault();
            const level = headingMatch[1].length;
            node.textContent = node.textContent.slice(selection.anchorOffset);
            document.execCommand("formatBlock", false, `<h${level}>`);
            saveCurrentNote();
            syncToolbarActiveState();
            return;
          }
          // Blockquote trigger: >
          if (textBeforeCursor === ">") {
            e.preventDefault();
            node.textContent = node.textContent.slice(selection.anchorOffset);
            document.execCommand("formatBlock", false, "<blockquote>");
            saveCurrentNote();
            syncToolbarActiveState();
            return;
          }
          // Code block trigger: ```
          if (textBeforeCursor === "```") {
            e.preventDefault();
            node.textContent = node.textContent.slice(selection.anchorOffset);
            document.execCommand("formatBlock", false, "<pre>");
            saveCurrentNote();
            syncToolbarActiveState();
            return;
          }
        }
      }
    }

    // ── Enter Key in Task List ──
    if (e.key === "Enter" && !e.shiftKey) {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const taskItem = selection.anchorNode.parentElement?.closest(".task-item");

      if (taskItem) {
        const textSpan = taskItem.querySelector(".task-text") || taskItem;
        const textContent = textSpan.textContent.trim();

        if (!textContent) {
          // Empty task item: exit checklist on Enter
          e.preventDefault();
          const taskList = taskItem.closest(".task-list");
          taskItem.remove();
          const p = document.createElement("p");
          p.innerHTML = "<br>";
          if (taskList && taskList.nextSibling) {
            taskList.parentNode.insertBefore(p, taskList.nextSibling);
          } else if (taskList) {
            taskList.parentNode.appendChild(p);
          } else {
            contentEditor.appendChild(p);
          }
          const range = document.createRange();
          range.selectNodeContents(p);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // Create new task item
          e.preventDefault();
          const newTaskItem = document.createElement("li");
          newTaskItem.className = "task-item";
          const cb = document.createElement("input");
          cb.type = "checkbox";
          const newSpan = document.createElement("span");
          newSpan.className = "task-text";
          newSpan.innerHTML = "&nbsp;";

          newTaskItem.appendChild(cb);
          newTaskItem.appendChild(newSpan);

          taskItem.parentNode.insertBefore(newTaskItem, taskItem.nextSibling);

          const range = document.createRange();
          range.selectNodeContents(newSpan);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        saveCurrentNote();
        syncToolbarActiveState();
      }
    }
  });
}

function createNote() {
  const newNote = {
    id: "note_" + Date.now(),
    title: "",
    content: "<p><br></p>",
    updated: Date.now(),
  };
  notes.push(newNote);
  saveNotes();
  activeNoteId = newNote.id;
  renderNotesList();
  renderEditor();
  const titleInp = document.getElementById("noteTitle");
  if (titleInp) titleInp.focus();
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  if (activeNoteId === id) {
    activeNoteId = notes.length > 0 ? notes[0].id : null;
  }
  renderNotesList();
  renderEditor();
}

// Toolbar active states synchronization
function syncToolbarActiveState() {
  const contentEditor = document.getElementById("noteContent");
  const toolbar = document.getElementById("rtToolbar");
  const formatSelect = document.getElementById("rtFormat");
  if (!contentEditor || !toolbar || !formatSelect) return;

  if (
    document.activeElement !== contentEditor &&
    !contentEditor.contains(document.activeElement)
  ) {
    return;
  }
  // Update basic formatting buttons
  toolbar.querySelectorAll(".rt-btn[data-cmd]").forEach((btn) => {
    const cmd = btn.dataset.cmd;
    try {
      if (document.queryCommandState(cmd)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    } catch {}
  });

  // Check heading / block format
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    let node = selection.anchorNode;
    if (node && node.nodeType === Node.TEXT_NODE) node = node.parentNode;

    const heading = node?.closest("h1, h2, h3, h4, h5, blockquote, pre, p");
    if (heading) {
      const tag = heading.tagName.toLowerCase();
      formatSelect.value = tag;
    } else {
      formatSelect.value = "p";
    }

    // Check checklist active state
    const taskItem = node?.closest(".task-item");
    const checklistBtn = document.getElementById("rtChecklist");
    if (checklistBtn) {
      if (taskItem) checklistBtn.classList.add("active");
      else checklistBtn.classList.remove("active");
    }

    // Check inline code active state
    const codeEl = node?.closest("code");
    const codeBtn = document.getElementById("rtCode");
    if (codeBtn) {
      if (codeEl) codeBtn.classList.add("active");
      else codeBtn.classList.remove("active");
    }
  }
}

document.addEventListener("selectionchange", syncToolbarActiveState);

const btnNewNote = document.getElementById("newNoteBtn");
if (btnNewNote) {
  btnNewNote.addEventListener("click", createNote);
}

// ══════════════════════════════════════════════════
// TAB SWITCHING (HANDLED BY MODE LAUNCHER)
// ══════════════════════════════════════════════════

// ══════════════════════════════════════════════════
// SIDEBAR RESIZER
// ══════════════════════════════════════════════════
const notesSidebar = document.getElementById("notesSidebar");
const notesResizer = document.getElementById("notesResizer");

const savedSidebarWidth = localStorage.getItem("zlock-sidebar-width");
if (savedSidebarWidth && notesSidebar) {
  notesSidebar.style.width = `${Math.max(100, Math.min(260, parseInt(savedSidebarWidth, 10)))}px`;
}

if (notesResizer && notesSidebar) {
  let isResizing = false;

  notesResizer.addEventListener("mousedown", (e) => {
    isResizing = true;
    document.body.classList.add("is-resizing");
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const panelRect = notesPanel.getBoundingClientRect();
    const newWidth = e.clientX - panelRect.left;
    const clamped = Math.max(100, Math.min(260, newWidth));
    notesSidebar.style.width = `${clamped}px`;
  });

  document.addEventListener("mouseup", () => {
    if (isResizing) {
      isResizing = false;
      document.body.classList.remove("is-resizing");
      const currentWidth = parseInt(notesSidebar.style.width, 10);
      if (currentWidth) {
        localStorage.setItem("zlock-sidebar-width", currentWidth);
      }
    }
  });
}

// ══════════════════════════════════════════════════
// CLOCKIFY INTEGRATION
// ══════════════════════════════════════════════════
const DEFAULT_CLOCKIFY_API = "MjM4NDNkNDYtZWU2MC00YjhhLTljMGUtNmU4YjA0ZmIxOWFi";
const CLOCKIFY_BASE_URL = "https://api.clockify.me/api/v1";

let clockifyState = {
  apiKey: localStorage.getItem("zlock-clockify-api") || DEFAULT_CLOCKIFY_API,
  user: null,
  workspaces: [],
  activeWorkspaceId: localStorage.getItem("zlock-clockify-workspace") || null,
  projects: [],
  clients: [],
  recentProjects: [],
  recentClients: [],
  timeEntries: [],
  bookmarks: JSON.parse(localStorage.getItem("zlock-clockify-bookmarks") || '{"projects":[], "clients":[]}'),
  activeTimer: null,
  activeFilter: localStorage.getItem("zlock-clockify-active-filter") || "all",
  searchQuery: "",
  isLoading: false,
};

const CLOCKIFY_CACHE_KEY = "zlock-clockify-cache-v1";

function saveClockifyCache() {
  try {
    const cacheObj = {
      user: clockifyState.user,
      workspaces: clockifyState.workspaces,
      activeWorkspaceId: clockifyState.activeWorkspaceId,
      projects: clockifyState.projects,
      clients: clockifyState.clients,
      timeEntries: clockifyState.timeEntries,
      recentProjects: clockifyState.recentProjects,
      recentClients: clockifyState.recentClients,
      activeTimer: clockifyState.activeTimer,
      timestamp: Date.now()
    };
    localStorage.setItem(CLOCKIFY_CACHE_KEY, JSON.stringify(cacheObj));
  } catch (err) {
    console.warn("Clockify Cache Save Error:", err);
  }
}

function loadClockifyCache() {
  try {
    const raw = localStorage.getItem(CLOCKIFY_CACHE_KEY);
    if (!raw) return false;
    const cache = JSON.parse(raw);
    if (cache.user) clockifyState.user = cache.user;
    if (cache.workspaces) clockifyState.workspaces = cache.workspaces;
    if (cache.activeWorkspaceId) clockifyState.activeWorkspaceId = cache.activeWorkspaceId;
    if (cache.projects) clockifyState.projects = cache.projects;
    if (cache.clients) clockifyState.clients = cache.clients;
    if (cache.timeEntries) clockifyState.timeEntries = cache.timeEntries;
    if (cache.recentProjects) clockifyState.recentProjects = cache.recentProjects;
    if (cache.recentClients) clockifyState.recentClients = cache.recentClients;
    if (cache.activeTimer !== undefined) clockifyState.activeTimer = cache.activeTimer;
    return Boolean(clockifyState.projects && clockifyState.projects.length > 0);
  } catch (err) {
    console.warn("Clockify Cache Load Error:", err);
    return false;
  }
}

function toggleProjectBookmark(projectId, fallbackObj = null) {
  if (!clockifyState.bookmarks) clockifyState.bookmarks = { projects: [], clients: [] };
  if (!clockifyState.bookmarks.projects) clockifyState.bookmarks.projects = [];

  if (fallbackObj && !clockifyState.projects.some(p => p.id === projectId)) {
    clockifyState.projects.push(fallbackObj);
  }

  const idx = clockifyState.bookmarks.projects.indexOf(projectId);
  if (idx >= 0) {
    clockifyState.bookmarks.projects.splice(idx, 1);
    showToast("Bookmark removed");
  } else {
    clockifyState.bookmarks.projects.push(projectId);
    showToast("✓ Service added to Services & Clients Bookmarks!");
  }
  localStorage.setItem("zlock-clockify-bookmarks", JSON.stringify(clockifyState.bookmarks));
  saveClockifyCache();
  renderClockifyContent();
  if (typeof renderClockifyHistory === "function") renderClockifyHistory();
}

function toggleClientBookmark(clientId, fallbackObj = null) {
  if (!clockifyState.bookmarks) clockifyState.bookmarks = { projects: [], clients: [] };
  if (!clockifyState.bookmarks.clients) clockifyState.bookmarks.clients = [];

  if (fallbackObj && !clockifyState.clients.some(c => c.id === clientId)) {
    clockifyState.clients.push(fallbackObj);
  }

  const idx = clockifyState.bookmarks.clients.indexOf(clientId);
  if (idx >= 0) {
    clockifyState.bookmarks.clients.splice(idx, 1);
    showToast("Bookmark removed");
  } else {
    clockifyState.bookmarks.clients.push(clientId);
    showToast("✓ Client added to Services & Clients Bookmarks!");
  }
  localStorage.setItem("zlock-clockify-bookmarks", JSON.stringify(clockifyState.bookmarks));
  saveClockifyCache();
  renderClockifyContent();
  if (typeof renderClockifyHistory === "function") renderClockifyHistory();
}

function getClockifyKey() {
  return clockifyState.apiKey || DEFAULT_CLOCKIFY_API;
}

async function clockifyFetch(endpoint, options = {}) {
  const apiKey = getClockifyKey();
  if (!apiKey) {
    throw new Error("No Clockify API key configured.");
  }

  const headers = {
    "X-Api-Key": apiKey,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(`${CLOCKIFY_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `Clockify API error (${response.status})`;
    try {
      const errJson = await response.json();
      if (errJson.message) errorMsg = errJson.message;
    } catch {}
    throw new Error(errorMsg);
  }

  if (response.status === 204) return null;
  return await response.json();
}

async function initClockify() {
  const statusEl = document.getElementById("clockifyUserStatus");
  const loadingEl = document.getElementById("clockifyLoadingState");
  const sectionsEl = document.getElementById("clockifySectionsContainer");
  const emptyEl = document.getElementById("clockifyEmptyState");

  // 1. Instantly render from local cache if available
  const hasCache = loadClockifyCache();

  if (hasCache) {
    if (statusEl) statusEl.textContent = "Connected (Cached)";
    if (loadingEl) loadingEl.classList.add("hidden");
    if (sectionsEl) sectionsEl.classList.remove("hidden");
    if (emptyEl) emptyEl.classList.add("hidden");

    renderClockifyHeader();
    renderClockifyContent();
    renderClockifyTimer();
    renderClockifyHistory();
    updateClockifyStats();
  } else {
    if (statusEl) statusEl.textContent = "Connecting...";
    if (loadingEl) loadingEl.classList.remove("hidden");
    if (sectionsEl) sectionsEl.classList.add("hidden");
    if (emptyEl) emptyEl.classList.add("hidden");
  }

  // 2. Fetch fresh data in the background to update cache (stale-while-revalidate)
  try {
    const user = await clockifyFetch("/user");
    clockifyState.user = user;
    if (!clockifyState.activeWorkspaceId && user) {
      clockifyState.activeWorkspaceId = user.defaultWorkspace;
    }

    const workspaces = await clockifyFetch("/workspaces");
    clockifyState.workspaces = workspaces || [];

    // Automatically lock active workspace to "JAR Consulting Group"
    const jarWorkspace = clockifyState.workspaces.find(
      w => w.name && w.name.trim().toLowerCase().includes("jar consulting group")
    );

    if (jarWorkspace) {
      clockifyState.activeWorkspaceId = jarWorkspace.id;
    } else if (!clockifyState.activeWorkspaceId && clockifyState.workspaces.length > 0) {
      clockifyState.activeWorkspaceId = clockifyState.workspaces[0].id;
    }

    renderClockifyHeader();

    if (clockifyState.activeWorkspaceId) {
      await loadClockifyWorkspaceData(clockifyState.activeWorkspaceId, true);
    }
  } catch (err) {
    console.error("Clockify Init Error:", err);
    if (!hasCache) {
      if (statusEl) statusEl.textContent = "Connection Failed";
      showToast(err.message || "Failed to load Clockify services");
      if (loadingEl) loadingEl.classList.add("hidden");
      if (emptyEl) {
        emptyEl.classList.remove("hidden");
        const textEl = document.getElementById("clockifyEmptyText");
        if (textEl) textEl.textContent = `Error: ${err.message}. Check API Key.`;
      }
    }
  }
}

async function loadClockifyWorkspaceData(workspaceId, isBackgroundRefresh = false) {
  const loadingEl = document.getElementById("clockifyLoadingState");
  const statusEl = document.getElementById("clockifyUserStatus");
  const sectionsEl = document.getElementById("clockifySectionsContainer");
  const emptyEl = document.getElementById("clockifyEmptyState");

  if (!isBackgroundRefresh && !clockifyState.projects.length) {
    if (loadingEl) loadingEl.classList.remove("hidden");
    if (sectionsEl) sectionsEl.classList.add("hidden");
    if (emptyEl) emptyEl.classList.add("hidden");
  }

  try {
    const userId = clockifyState.user ? clockifyState.user.id : null;

    const [projects, clients, timeEntries, inProgressEntries] = await Promise.all([
      clockifyFetch(`/workspaces/${workspaceId}/projects?page-size=500&archived=false`).catch(() => []),
      clockifyFetch(`/workspaces/${workspaceId}/clients?page-size=500`).catch(() => []),
      userId ? clockifyFetch(`/workspaces/${workspaceId}/user/${userId}/time-entries?page-size=50`).catch(() => []) : Promise.resolve([]),
      userId ? clockifyFetch(`/workspaces/${workspaceId}/user/${userId}/time-entries?in-progress=true`).catch(() => []) : Promise.resolve([])
    ]);

    clockifyState.projects = projects || [];
    clockifyState.clients = clients || [];
    clockifyState.timeEntries = timeEntries || [];

    const clientMap = new Map((clients || []).map(c => [c.id, c.name]));
    clockifyState.projects.forEach(p => {
      p.clientName = p.clientId ? clientMap.get(p.clientId) || "Client" : "General";
    });

    // Derive Recent Projects & Clients from Time Entries
    const recentProjIds = [];
    const recentCliIds = [];

    (timeEntries || []).forEach(entry => {
      if (entry.projectId && !recentProjIds.includes(entry.projectId)) {
        recentProjIds.push(entry.projectId);
      }
      const proj = clockifyState.projects.find(p => p.id === entry.projectId);
      if (proj && proj.clientId && !recentCliIds.includes(proj.clientId)) {
        recentCliIds.push(proj.clientId);
      }
    });

    clockifyState.recentProjects = recentProjIds
      .map(id => clockifyState.projects.find(p => String(p.id) === String(id)))
      .filter(Boolean);

    clockifyState.recentClients = recentCliIds
      .map(id => clockifyState.clients.find(c => String(c.id) === String(id)))
      .filter(Boolean);

    if (clockifyState.recentProjects.length === 0 && clockifyState.projects.length > 0) {
      clockifyState.recentProjects = clockifyState.projects.slice(0, 4);
    }
    if (clockifyState.recentClients.length === 0 && clockifyState.clients.length > 0) {
      clockifyState.recentClients = clockifyState.clients.slice(0, 2);
    }

    if (inProgressEntries && inProgressEntries.length > 0) {
      clockifyState.activeTimer = inProgressEntries[0];
    } else {
      clockifyState.activeTimer = null;
    }

    // Update local cache
    saveClockifyCache();

    if (statusEl) statusEl.textContent = "Connected";
    renderClockifyContent();
    renderClockifyTimer();
    renderClockifyHistory();
    updateClockifyStats();
  } catch (err) {
    console.error("Workspace Data Fetch Error:", err);
    if (!isBackgroundRefresh) {
      showToast("Error pulling workspace services");
    }
  } finally {
    if (loadingEl) loadingEl.classList.add("hidden");
  }
}

function renderClockifyHeader() {
  const nameEl = document.getElementById("clockifyUserName");
  const avatarEl = document.getElementById("clockifyAvatar");

  if (clockifyState.user) {
    if (nameEl) nameEl.textContent = clockifyState.user.name || "JAR Consulting Group";
    if (avatarEl) {
      const initials = (clockifyState.user.name || "J").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
      avatarEl.textContent = initials;
      if (clockifyState.user.profilePicture) {
        avatarEl.style.backgroundImage = `url(${clockifyState.user.profilePicture})`;
      }
    }
  }
}

function renderClockifyContent() {
  const sectionsEl = document.getElementById("clockifySectionsContainer");
  const emptyEl = document.getElementById("clockifyEmptyState");
  const bookmarksSection = document.getElementById("clockifyBookmarksSection");
  const bookmarksGrid = document.getElementById("clockifyBookmarksGrid");
  const recentSection = document.getElementById("clockifyRecentSection");
  const recentGrid = document.getElementById("clockifyRecentGrid");
  const clientsSection = document.getElementById("clockifyClientsSection");
  const clientsGrid = document.getElementById("clockifyClientsGrid");
  const servicesSection = document.getElementById("clockifyServicesSection");
  const servicesGrid = document.getElementById("clockifyServicesGrid");

  // Sync active filter pill UI
  const currentFilter = clockifyState.activeFilter || "all";
  document.querySelectorAll(".clockify-filter-pills .filter-pill").forEach(p => {
    if (p.dataset.filter === currentFilter) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  const query = clockifyState.searchQuery.toLowerCase().trim();
  const filter = clockifyState.activeFilter; // "all", "bookmarks", "recent", "clients", "services", "billable"

  const bookmarkedProjIds = (clockifyState.bookmarks.projects || []).map(id => String(id));
  const bookmarkedCliIds = (clockifyState.bookmarks.clients || []).map(id => String(id));

  // 1. Filter Bookmarked Projects & Clients
  let filteredBookmarkedProjects = clockifyState.projects.filter(p => {
    const isBk = bookmarkedProjIds.includes(String(p.id));
    if (!isBk) return false;
    const matchesQuery = !query || p.name.toLowerCase().includes(query) || (p.clientName && p.clientName.toLowerCase().includes(query));
    if (!matchesQuery) return false;
    if (filter === "billable") return p.billable;
    return true;
  });

  let filteredBookmarkedClients = clockifyState.clients.filter(c => {
    const isBk = bookmarkedCliIds.includes(String(c.id));
    if (!isBk) return false;
    const matchesQuery = !query || c.name.toLowerCase().includes(query);
    if (!matchesQuery) return false;
    if (filter === "billable") return false;
    return true;
  });

  // 2. Filter Recent Projects & Clients
  let filteredRecentProjects = clockifyState.recentProjects.filter(p => {
    const matchesQuery = !query || p.name.toLowerCase().includes(query) || (p.clientName && p.clientName.toLowerCase().includes(query));
    if (!matchesQuery) return false;
    if (filter === "billable") return p.billable;
    return true;
  });

  let filteredRecentClients = clockifyState.recentClients.filter(c => {
    const matchesQuery = !query || c.name.toLowerCase().includes(query);
    if (!matchesQuery) return false;
    if (filter === "billable") return false;
    return true;
  });

  // 3. Filter All Clients
  let filteredClients = clockifyState.clients.filter(c => {
    return !query || c.name.toLowerCase().includes(query);
  });

  // 4. Filter All Projects / Services
  let filteredProjects = clockifyState.projects.filter(p => {
    const matchesQuery = !query || p.name.toLowerCase().includes(query) || (p.clientName && p.clientName.toLowerCase().includes(query));
    if (!matchesQuery) return false;
    if (filter === "billable") return p.billable;
    return true;
  });

  const isSearching = Boolean(query !== "");

  // Visibility flags per section based on active filter pill and search query
  const hasBookmarksContent = (filteredBookmarkedProjects.length > 0 || filteredBookmarkedClients.length > 0);
  const hasRecentContent = (filteredRecentProjects.length > 0 || filteredRecentClients.length > 0);

  // Bookmarked and Recent sections are hidden when searching (query !== "") or filtering for specific categories
  const showBookmarks = (filter === "bookmarks" || (filter === "all" && !isSearching)) && hasBookmarksContent;
  const showRecent = (filter === "recent" || (filter === "all" && !isSearching)) && hasRecentContent;

  const showClientsSection = (filter === "all" || filter === "clients") && filteredClients.length > 0;
  const showServicesSection = (filter === "all" || filter === "services" || filter === "billable") && filteredProjects.length > 0;

  // Determine overall visibility for empty state
  let isAnythingVisible = false;
  if (filter === "all") {
    if (isSearching) {
      isAnythingVisible = (filteredClients.length > 0 || filteredProjects.length > 0);
    } else {
      isAnythingVisible = (hasBookmarksContent || hasRecentContent || filteredClients.length > 0 || filteredProjects.length > 0);
    }
  } else if (filter === "bookmarks") {
    isAnythingVisible = hasBookmarksContent;
  } else if (filter === "recent") {
    isAnythingVisible = hasRecentContent;
  } else if (filter === "clients") {
    isAnythingVisible = filteredClients.length > 0;
  } else if (filter === "services") {
    isAnythingVisible = filteredProjects.length > 0;
  } else if (filter === "billable") {
    isAnythingVisible = filteredProjects.length > 0;
  }

  if (!isAnythingVisible) {
    sectionsEl.classList.add("hidden");
    emptyEl.classList.remove("hidden");
    const emptyText = document.getElementById("clockifyEmptyText");
    if (emptyText) {
      if (query) {
        emptyText.textContent = `No results found matching "${escapeHtml(query)}"`;
      } else if (filter === "bookmarks") {
        emptyText.textContent = "No bookmarked items yet. Click the ★ icon on any service or client to bookmark it!";
      } else if (filter === "recent") {
        emptyText.textContent = "No recent items found. Start a timer on any service to see it here!";
      } else if (filter === "billable") {
        emptyText.textContent = "No billable services found in this workspace.";
      } else if (filter === "clients") {
        emptyText.textContent = "No clients found in this workspace.";
      } else if (filter === "services") {
        emptyText.textContent = "No services or projects found in this workspace.";
      } else {
        emptyText.textContent = "No services or clients found in this workspace.";
      }
    }
    return;
  }

  emptyEl.classList.add("hidden");
  sectionsEl.classList.remove("hidden");

  // 1. Render BOOKMARKS Section
  if (showBookmarks && hasBookmarksContent && bookmarksSection && bookmarksGrid) {
    bookmarksSection.classList.remove("hidden");
    let bookmarkHtml = "";
    filteredBookmarkedProjects.forEach(p => {
      const color = p.color || "var(--blue)";
      const clientName = p.clientName || "General";
      bookmarkHtml += `
        <div class="service-card" style="--card-color: ${color}">
          <div class="service-card-head">
            <div class="service-title-wrap">
              <span class="service-name" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</span>
              <span class="service-client" title="${escapeHtml(clientName)}">📌 Bookmarked • ${escapeHtml(clientName)}</span>
            </div>
            <div class="service-badges">
              <button class="btn-bookmark bookmarked" data-type="project" data-id="${p.id}" title="Remove Bookmark">★</button>
              ${p.billable ? `<span class="billable-tag" title="Billable Service">$</span>` : ""}
            </div>
          </div>
          <div class="service-card-foot">
            <div class="service-color-badge">
              <span class="service-dot" style="background: ${color}"></span>
              <span>${p.public ? "Public" : "Private"}</span>
            </div>
            <button class="btn-start-service" data-project-id="${p.id}" data-project-name="${escapeHtml(p.name)}">
              ▶ Start
            </button>
          </div>
        </div>
      `;
    });

    filteredBookmarkedClients.forEach(c => {
      const count = clockifyState.projects.filter(p => p.clientId === c.id).length;
      bookmarkHtml += `
        <div class="client-card">
          <div class="client-card-head">
            <div class="client-name" title="${escapeHtml(c.name)}">${escapeHtml(c.name)}</div>
            <button class="btn-bookmark bookmarked" data-type="client" data-id="${c.id}" title="Remove Bookmark">★</button>
          </div>
          <div class="client-count">📌 Bookmarked • ${count} service${count === 1 ? "" : "s"}</div>
          <div class="client-card-foot">
            <span class="service-color-badge">🏢 Client</span>
            <button class="btn-view-client" data-client-name="${escapeHtml(c.name)}">View Services</button>
          </div>
        </div>
      `;
    });
    bookmarksGrid.innerHTML = bookmarkHtml;
  } else if (bookmarksSection) {
    bookmarksSection.classList.add("hidden");
  }

  // 2. Render RECENT Section
  if (showRecent && hasRecentContent && recentSection && recentGrid) {
    recentSection.classList.remove("hidden");
    let recentHtml = "";
    filteredRecentProjects.slice(0, 4).forEach(p => {
      const color = p.color || "var(--blue)";
      const clientName = p.clientName || "General";
      const isBookmarked = bookmarkedProjIds.includes(String(p.id));
      recentHtml += `
        <div class="service-card" style="--card-color: ${color}">
          <div class="service-card-head">
            <div class="service-title-wrap">
              <span class="service-name" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</span>
              <span class="service-client" title="${escapeHtml(clientName)}">⭐ Recent Service • ${escapeHtml(clientName)}</span>
            </div>
            <div class="service-badges">
              <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-type="project" data-id="${p.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Service'}">${isBookmarked ? '★' : '☆'}</button>
              ${p.billable ? `<span class="billable-tag" title="Billable Service">$</span>` : ""}
            </div>
          </div>
          <div class="service-card-foot">
            <div class="service-color-badge">
              <span class="service-dot" style="background: ${color}"></span>
              <span>${p.public ? "Public" : "Private"}</span>
            </div>
            <button class="btn-start-service" data-project-id="${p.id}" data-project-name="${escapeHtml(p.name)}">
              ▶ Start
            </button>
          </div>
        </div>
      `;
    });

    filteredRecentClients.slice(0, 2).forEach(c => {
      const clientProjectsCount = clockifyState.projects.filter(p => p.clientId === c.id).length;
      const isBookmarked = bookmarkedCliIds.includes(String(c.id));
      recentHtml += `
        <div class="client-card">
          <div class="client-card-head">
            <div class="client-name" title="${escapeHtml(c.name)}">${escapeHtml(c.name)}</div>
            <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-type="client" data-id="${c.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Client'}">${isBookmarked ? '★' : '☆'}</button>
          </div>
          <div class="client-count">⭐ Recent Client • ${clientProjectsCount} service${clientProjectsCount === 1 ? "" : "s"}</div>
          <div class="client-card-foot">
            <span class="service-color-badge">🏢 Client</span>
            <button class="btn-view-client" data-client-name="${escapeHtml(c.name)}">View Services</button>
          </div>
        </div>
      `;
    });
    recentGrid.innerHTML = recentHtml;
  } else if (recentSection) {
    recentSection.classList.add("hidden");
  }

  // 3. Render CLIENTS Section
  if (showClientsSection && clientsSection && clientsGrid) {
    clientsSection.classList.remove("hidden");
    clientsGrid.innerHTML = filteredClients.map(c => {
      const clientProjects = clockifyState.projects.filter(p => p.clientId === c.id);
      const count = clientProjects.length;
      const isBookmarked = bookmarkedCliIds.includes(String(c.id));
      return `
        <div class="client-card">
          <div class="client-card-head">
            <div class="client-name" title="${escapeHtml(c.name)}">${escapeHtml(c.name)}</div>
            <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-type="client" data-id="${c.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Client'}">${isBookmarked ? '★' : '☆'}</button>
          </div>
          <div class="client-count">${count} service${count === 1 ? "" : "s"}</div>
          <div class="client-card-foot">
            <span class="service-color-badge">🏢 Client</span>
            <button class="btn-view-client" data-client-name="${escapeHtml(c.name)}">View Services (${count})</button>
          </div>
        </div>
      `;
    }).join("");
  } else if (clientsSection) {
    clientsSection.classList.add("hidden");
  }

  // 4. Render SERVICES Section
  if (showServicesSection && servicesSection && servicesGrid) {
    servicesSection.classList.remove("hidden");
    servicesGrid.innerHTML = filteredProjects.map(p => {
      const color = p.color || "var(--blue)";
      const clientName = p.clientName || "General";
      const isBillable = p.billable;
      const isBookmarked = bookmarkedProjIds.includes(String(p.id));

      return `
        <div class="service-card" style="--card-color: ${color}">
          <div class="service-card-head">
            <div class="service-title-wrap">
              <span class="service-name" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</span>
              <span class="service-client" title="${escapeHtml(clientName)}">${escapeHtml(clientName)}</span>
            </div>
            <div class="service-badges">
              <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-type="project" data-id="${p.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Service'}">${isBookmarked ? '★' : '☆'}</button>
              ${isBillable ? `<span class="billable-tag" title="Billable Service">$</span>` : ""}
            </div>
          </div>
          <div class="service-card-foot">
            <div class="service-color-badge">
              <span class="service-dot" style="background: ${color}"></span>
              <span>${p.public ? "Public" : "Private"}</span>
            </div>
            <button class="btn-start-service" data-project-id="${p.id}" data-project-name="${escapeHtml(p.name)}">
              ▶ Start
            </button>
          </div>
        </div>
      `;
    }).join("");
  } else {
    servicesSection.classList.add("hidden");
  }

  // Attach button click listeners
  sectionsEl.querySelectorAll(".btn-start-service").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const projId = e.currentTarget.dataset.projectId;
      const projName = e.currentTarget.dataset.projectName;
      startClockifyTimerForProject(projId, projName);
    });
  });

  sectionsEl.querySelectorAll(".btn-view-client").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const clientName = e.currentTarget.dataset.clientName;
      const searchInp = document.getElementById("clockifySearchInput");

      // Switch filter to "all" so services section is shown for this client
      clockifyState.activeFilter = "all";
      try {
        localStorage.setItem("zlock-clockify-active-filter", "all");
      } catch {}

      if (searchInp) {
        searchInp.value = clientName;
        clockifyState.searchQuery = clientName;
      }
      renderClockifyContent();
    });
  });

  sectionsEl.querySelectorAll(".btn-bookmark").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const type = e.currentTarget.dataset.type;
      const id = e.currentTarget.dataset.id;
      if (type === "project") toggleProjectBookmark(id);
      else if (type === "client") toggleClientBookmark(id);
    });
  });
}



function renderClockifyTimer() {
  const card = document.getElementById("clockifyTimerCard");
  const badge = document.getElementById("clockifyTimerBadge");
  const display = document.getElementById("clockifyTimerDisplay");
  const descInp = document.getElementById("clockifyTimerDesc");
  const btnToggle = document.getElementById("btnClockifyTimerToggle");

  if (!card || !badge || !display || !btnToggle) return;

  if (clockifyState.activeTimer && clockifyState.activeTimer.timeInterval) {
    card.classList.add("active-running");
    badge.innerHTML = `<span class="pulse-dot"></span> TIMER RUNNING`;

    const entryDesc = clockifyState.activeTimer.description || "In Progress";
    if (descInp && document.activeElement !== descInp) {
      descInp.value = entryDesc;
    }

    btnToggle.textContent = "■ Stop";
    btnToggle.className = "timer-action-btn stop";
    updateClockifyTimerDisplay();
  } else {
    card.classList.remove("active-running");
    badge.innerHTML = `<span class="pulse-dot"></span> NO TIMER ACTIVE`;
    display.textContent = "00:00:00";
    btnToggle.textContent = "▶ Start";
    btnToggle.className = "timer-action-btn start";
  }
}

function updateClockifyTimerDisplay() {
  const display = document.getElementById("clockifyTimerDisplay");
  if (!display || !clockifyState || !clockifyState.activeTimer || !clockifyState.activeTimer.timeInterval) return;

  const startIso = clockifyState.activeTimer.timeInterval.start;
  if (!startIso) return;

  const startTime = new Date(startIso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - startTime) / 1000));

  const hrs = String(Math.floor(diffSec / 3600)).padStart(2, "0");
  const mins = String(Math.floor((diffSec % 3600) / 60)).padStart(2, "0");
  const secs = String(diffSec % 60).padStart(2, "0");

  display.textContent = `${hrs}:${mins}:${secs}`;
}

function formatClockifyDuration(entry) {
  if (entry.timeInterval && entry.timeInterval.start && entry.timeInterval.end) {
    const s = new Date(entry.timeInterval.start).getTime();
    const e = new Date(entry.timeInterval.end).getTime();
    const diffSec = Math.max(0, Math.floor((e - s) / 1000));
    const h = Math.floor(diffSec / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    const sec = diffSec % 60;
    if (h > 0) return `${h}h ${m}m ${sec}s`;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec}s`;
  }
  return "In Progress";
}

function renderClockifyHistory() {
  const listEl = document.getElementById("clockifyHistoryList");
  const totalEl = document.getElementById("clockifyHistoryTotal");
  if (!listEl) return;

  const entries = clockifyState.timeEntries || [];
  const completedEntries = entries.filter(e => e.timeInterval && e.timeInterval.end);

  if (completedEntries.length === 0) {
    listEl.innerHTML = `<div class="history-empty">No recent time logs found.</div>`;
    if (totalEl) totalEl.textContent = "Today: 0h 0m";
    return;
  }

  const todayStr = new Date().toDateString();
  let totalSecToday = 0;

  completedEntries.forEach(entry => {
    if (entry.timeInterval && entry.timeInterval.start && entry.timeInterval.end) {
      const sDate = new Date(entry.timeInterval.start);
      if (sDate.toDateString() === todayStr) {
        const s = sDate.getTime();
        const e = new Date(entry.timeInterval.end).getTime();
        totalSecToday += Math.max(0, Math.floor((e - s) / 1000));
      }
    }
  });

  const totH = Math.floor(totalSecToday / 3600);
  const totM = Math.floor((totalSecToday % 3600) / 60);
  if (totalEl) totalEl.textContent = `Today Total: ${totH}h ${totM}m`;

  listEl.innerHTML = completedEntries.slice(0, 30).map(entry => {
    const proj = clockifyState.projects.find(p => p.id === entry.projectId);
    const projName = proj ? proj.name : "General Project";
    const projColor = proj ? (proj.color || "var(--blue)") : "var(--blue)";
    const clientId = proj ? proj.clientId : null;
    const clientName = proj ? (proj.clientName || "General") : "General";
    const desc = entry.description || projName;
    const durStr = formatClockifyDuration(entry);

    const isProjBookmarked = entry.projectId && (clockifyState.bookmarks?.projects || []).includes(entry.projectId);
    const isClientBookmarked = clientId && (clockifyState.bookmarks?.clients || []).includes(clientId);

    let startTimeFmt = "";
    if (entry.timeInterval && entry.timeInterval.start) {
      const d = new Date(entry.timeInterval.start);
      startTimeFmt = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    }

    return `
      <div class="history-entry-item">
        <div class="history-entry-main">
          <span class="history-entry-desc" title="${escapeHtml(desc)}">${escapeHtml(desc)}</span>
          <span class="history-entry-meta">
            <span class="service-dot" style="background: ${projColor}"></span>
            ${escapeHtml(projName)} (${escapeHtml(clientName)}) ${startTimeFmt ? `• ${startTimeFmt}` : ''}
          </span>
        </div>
        <div class="history-actions">
          <div class="history-bookmarks">
            ${entry.projectId ? `
              <button class="btn-bookmark ${isProjBookmarked ? 'bookmarked' : ''}" data-project-id="${entry.projectId}" data-project-name="${escapeHtml(projName)}" data-client-name="${escapeHtml(clientName)}" title="${isProjBookmarked ? 'Unbookmark Service' : 'Bookmark Service'}">
                ${isProjBookmarked ? '★' : '☆'}
              </button>
            ` : ''}
            ${clientId ? `
              <button class="btn-bookmark ${isClientBookmarked ? 'bookmarked' : ''}" data-client-id="${clientId}" data-client-name="${escapeHtml(clientName)}" title="${isClientBookmarked ? 'Unbookmark Client' : 'Bookmark Client'}">
                🏢
              </button>
            ` : ''}
          </div>
          <div class="history-entry-duration">${durStr}</div>
          <button class="btn-restart-entry" data-project-id="${entry.projectId || ''}" data-desc="${escapeHtml(desc)}" title="Restart timer for this task">
            ▶ Restart
          </button>
        </div>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll(".btn-bookmark").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const pId = e.currentTarget.dataset.projectId;
      const cId = e.currentTarget.dataset.clientId;
      const pName = e.currentTarget.dataset.projectName || "Service";
      const cName = e.currentTarget.dataset.clientName || "Client";

      if (pId) {
        toggleProjectBookmark(pId, { id: pId, name: pName, clientName: cName });
      } else if (cId) {
        toggleClientBookmark(cId, { id: cId, name: cName });
      }
    });
  });

  listEl.querySelectorAll(".btn-restart-entry").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const pId = e.currentTarget.dataset.projectId;
      const desc = e.currentTarget.dataset.desc;

      const descInp = document.getElementById("clockifyTimerDesc");
      if (descInp) descInp.value = desc;

      if (pId) {
        const proj = clockifyState.projects.find(p => p.id === pId);
        startClockifyTimerForProject(pId, proj ? proj.name : "Service");
      } else if (clockifyState.projects.length > 0) {
        startClockifyTimerForProject(clockifyState.projects[0].id, clockifyState.projects[0].name);
      }
    });
  });
}

function updateClockifyStats() {
  const servicesCountEl = document.getElementById("statServicesCount");
  const clientsCountEl = document.getElementById("statClientsCount");
  const activeWsEl = document.getElementById("statActiveWorkspace");

  if (servicesCountEl) servicesCountEl.textContent = clockifyState.projects.length;
  if (clientsCountEl) clientsCountEl.textContent = clockifyState.clients.length;

  if (activeWsEl) {
    const ws = clockifyState.workspaces.find(w => w.id === clockifyState.activeWorkspaceId);
    activeWsEl.textContent = ws ? ws.name : "Workspace";
  }
}

async function startClockifyTimerForProject(projectId, projectName) {
  if (!clockifyState.activeWorkspaceId) return;

  const descInp = document.getElementById("clockifyTimerDesc");
  const description = (descInp && descInp.value.trim()) || `Working on ${projectName}`;

  showToast(`Starting timer for ${projectName}...`);

  try {
    const body = {
      start: new Date().toISOString(),
      projectId: projectId,
      description: description
    };

    const newEntry = await clockifyFetch(`/workspaces/${clockifyState.activeWorkspaceId}/time-entries`, {
      method: "POST",
      body: JSON.stringify(body)
    });

    clockifyState.activeTimer = newEntry;
    renderClockifyTimer();
    showToast(`Timer started: ${projectName}`);
    await loadClockifyWorkspaceData(clockifyState.activeWorkspaceId);
  } catch (err) {
    console.error("Start Timer Error:", err);
    showToast(err.message || "Failed to start timer");
  }
}

async function stopActiveClockifyTimer() {
  if (!clockifyState.activeWorkspaceId || !clockifyState.user) return;

  showToast("Stopping timer...");

  try {
    const body = {
      end: new Date().toISOString()
    };

    await clockifyFetch(`/workspaces/${clockifyState.activeWorkspaceId}/user/${clockifyState.user.id}/time-entries/end`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });

    clockifyState.activeTimer = null;
    renderClockifyTimer();
    showToast("Timer stopped");
    await loadClockifyWorkspaceData(clockifyState.activeWorkspaceId);
  } catch (err) {
    console.error("Stop Timer Error:", err);
    showToast(err.message || "Failed to stop timer");
  }
}


function setupClockifyEvents() {
  const tabClockify = document.getElementById("tabClockify");
  const tabClock = document.getElementById("tabClock");
  const tabNotes = document.getElementById("tabNotes");
  const clockifyPanel = document.getElementById("clockifyPanel");
  const clockPanel = document.getElementById("clockPanel");
  const notesPanel = document.getElementById("notesPanel");

  if (tabClockify) {
    tabClockify.addEventListener("click", () => {
      tabClockify.classList.add("active");
      if (tabClock) tabClock.classList.remove("active");
      if (tabNotes) tabNotes.classList.remove("active");

      if (clockifyPanel) clockifyPanel.classList.add("active");
      if (clockPanel) clockPanel.classList.remove("active");
      if (notesPanel) notesPanel.classList.remove("active");

      if (!clockifyState.user) {
        initClockify();
      }
    });
  }

  document.querySelectorAll(".clockify-nav-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetSubtab = e.currentTarget.dataset.subtab;
      document.querySelectorAll(".clockify-nav-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");

      const viewServices = document.getElementById("clockifyViewServices");
      const viewHistory = document.getElementById("clockifyViewHistory");

      if (targetSubtab === "history") {
        if (viewServices) { viewServices.classList.remove("active"); viewServices.classList.add("hidden"); }
        if (viewHistory) { viewHistory.classList.add("active"); viewHistory.classList.remove("hidden"); }
      } else {
        if (viewHistory) { viewHistory.classList.remove("active"); viewHistory.classList.add("hidden"); }
        if (viewServices) { viewServices.classList.add("active"); viewServices.classList.remove("hidden"); }
      }
    });
  });

  const searchInp = document.getElementById("clockifySearchInput");
  if (searchInp) {
    searchInp.addEventListener("input", (e) => {
      clockifyState.searchQuery = e.target.value;
      renderClockifyContent();
    });
  }

  document.querySelectorAll(".clockify-filter-pills .filter-pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      const filter = e.currentTarget.dataset.filter;
      clockifyState.activeFilter = filter;
      try {
        localStorage.setItem("zlock-clockify-active-filter", filter);
      } catch {}
      renderClockifyContent();
    });
  });

  const btnTimerToggle = document.getElementById("btnClockifyTimerToggle");
  if (btnTimerToggle) {
    btnTimerToggle.addEventListener("click", () => {
      if (clockifyState.activeTimer && clockifyState.activeTimer.timeInterval) {
        stopActiveClockifyTimer();
      } else {
        const descInp = document.getElementById("clockifyTimerDesc");
        const desc = (descInp && descInp.value.trim()) || "General Time Entry";
        if (clockifyState.projects.length > 0) {
          startClockifyTimerForProject(clockifyState.projects[0].id, clockifyState.projects[0].name);
        } else {
          showToast("No services available to start timer");
        }
      }
    });
  }
}

// ══════════════════════════════════════════════════
// MODE LAUNCHER & SCREEN SWITCHING
// ══════════════════════════════════════════════════
const MODE_TITLES = {
  launcher: "Zlock",
  clock: "Zlock • World Clock",
  notes: "Zlock • Work Notes",
  clockify: "Zlock • Clockify Tracker"
};

function switchMode(modeName) {
  const targetMode = MODE_TITLES[modeName] ? modeName : "launcher";

  // 1. Set body class for dynamic sizing per mode
  document.body.className = `mode-${targetMode}`;

  // 2. Update titlebar name
  const titleEl = document.getElementById("titlebarName");
  if (titleEl) {
    titleEl.textContent = MODE_TITLES[targetMode];
  }

  // 3. Toggle back button visibility
  const btnBack = document.getElementById("btnBackLauncher");
  if (btnBack) {
    if (targetMode === "launcher") {
      btnBack.classList.add("hidden");
    } else {
      btnBack.classList.remove("hidden");
    }
  }

  // 4. Activate target tab-panel
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.remove("active");
  });

  const panelId = targetMode === "launcher" ? "launcherPanel" : `${targetMode}Panel`;
  const targetPanel = document.getElementById(panelId);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }

  // Save mode preference
  try {
    localStorage.setItem("zlock-active-mode", targetMode);
  } catch {}

  // Trigger service initializations if needed
  if (targetMode === "notes") {
    if (typeof renderNotesList === "function") renderNotesList();
    if (typeof renderEditor === "function") renderEditor();
  } else if (targetMode === "clockify" && typeof initClockify === "function") {
    initClockify();
  }
}

function setupLauncherEvents() {
  document.querySelectorAll(".launcher-card").forEach((card) => {
    card.addEventListener("click", () => {
      const mode = card.dataset.mode;
      if (mode) switchMode(mode);
    });
  });

  const btnBack = document.getElementById("btnBackLauncher");
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      switchMode("launcher");
    });
  }

  const savedMode = localStorage.getItem("zlock-active-mode") || "launcher";
  switchMode(savedMode);
}

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
renderCards();
tick();
setInterval(tick, 1000);
setupClockifyEvents();
setupLauncherEvents();



