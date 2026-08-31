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

document.getElementById("newNoteBtn").addEventListener("click", createNote);

// ══════════════════════════════════════════════════
// TAB SWITCHING
// ══════════════════════════════════════════════════
const tabClock = document.getElementById("tabClock");
const tabNotes = document.getElementById("tabNotes");
const clockPanel = document.getElementById("clockPanel");
const notesPanel = document.getElementById("notesPanel");

tabClock.addEventListener("click", () => {
  tabClock.classList.add("active");
  tabNotes.classList.remove("active");
  clockPanel.classList.add("active");
  notesPanel.classList.remove("active");
});

tabNotes.addEventListener("click", () => {
  tabNotes.classList.add("active");
  tabClock.classList.remove("active");
  notesPanel.classList.add("active");
  clockPanel.classList.remove("active");

  renderNotesList();
  renderEditor();
});

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
// INIT
// ══════════════════════════════════════════════════
renderCards();
tick();
setInterval(tick, 1000);
