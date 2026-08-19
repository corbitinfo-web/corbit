/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* Ported from the original CORBIT journal.html script. Imperative DOM app. */
/* eslint-disable */
export function initJournal(options?: {
  initialPages?: any[] | null;
  onSave?: (pages: any[]) => void;
}): () => void {
  const STORAGE_KEY = "corbit-journal-v1";
  const bookEl = document.getElementById("book");
  const toolbarEl = document.getElementById("toolbar");
  const adRailEl = document.getElementById("adRail");
  const indicatorEl = document.getElementById("indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const typeBtn = document.getElementById("typeBtn");
  const penBtn = document.getElementById("penBtn");
  const eraserBtn = document.getElementById("eraserBtn");
  const boldBtn = document.getElementById("boldBtn");
  const italicBtn = document.getElementById("italicBtn");
  const underlineBtn = document.getElementById("underlineBtn");
  const fontSizeSel = document.getElementById("fontSize");
  const clearBtn = document.getElementById("clearBtn");
  const newPageBtn = document.getElementById("newPageBtn");
  const photoInput = document.getElementById("photoInput");
  const inkColor = document.getElementById("inkColor");

  let tool = "type"; // 'type' | 'pen' | 'eraser'
  let current = 0;
  let pages = [];

  function activeTextEl() {
    return bookEl.querySelector('.leaf[data-index="' + current + '"] .leaf-text');
  }

  function todayLabel() {
    return new Date()
      .toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
      .toUpperCase();
  }

  function defaultPages() {
    return [
      {
        date: todayLabel(),
        text: "Dear Journal — this archive belongs to CORBIT.<br><br>A repository of creative notes, timing graphs, cinematography treatments, and graphic specimens. Tap Type, Pen, or Add Photo above to make your entry. Flip forward to read studio notes on cutting and color science.",
        fontSize: 23,
        drawing: null,
        photos: [],
      },
      {
        date: "ARCHIVE NOTE // 01",
        text: "<b>On Pacing &amp; The Invisible Cut:</b><br><br>Editing isn't about cutting fast — it is about the cadence between tension and breath. In commercial reels, trimming two frames before the subject's gaze settles creates forward momentum that pulls the viewer into the next shot without disorientation.",
        fontSize: 22,
        drawing: null,
        photos: [],
      },
      {
        date: "ARCHIVE NOTE // 02",
        text: "<b>Caustics &amp; Prismatic Color:</b><br><br>When rendering refractive glass in Octane/Houdini, a dispersion coefficient of 0.042 paired with a 5500K warm key gives that signature 1970s photochemical film look. Less digital perfection, more tactile grit.",
        fontSize: 22,
        drawing: null,
        photos: [],
      },
      {
        date: todayLabel(),
        text: "",
        fontSize: 23,
        drawing: null,
        photos: [],
      },
    ];
  }

  function load() {
    const seeded = options && options.initialPages;
    if (Array.isArray(seeded) && seeded.length) return seeded;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) {}
    return defaultPages();
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch (e) {}
    try {
      options && options.onSave && options.onSave(pages);
    } catch (e) {}
  }

  const paperThemeSel = document.getElementById("paperTheme");
  if (paperThemeSel) {
    paperThemeSel.addEventListener("change", () => {
      bookEl.className = "book theme-" + paperThemeSel.value;
    });
  }

  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      try {
        const leaf = bookEl.querySelector('.leaf[data-index="' + current + '"]');
        if (!leaf) return;
        const canvas = leaf.querySelector("canvas");
        const link = document.createElement("a");
        link.download = `corbit-journal-page-${current + 1}.png`;
        link.href = canvas ? canvas.toDataURL("image/png") : "";
        link.click();
      } catch {
        // Export failed - user cancelled or canvas not ready
      }
    });
  }

  function setTool(next, opts) {
    tool = next;
    typeBtn.classList.toggle("active", tool === "type");
    penBtn.classList.toggle("active", tool === "pen");
    eraserBtn.classList.toggle("active", tool === "eraser");
    document.querySelectorAll(".leaf-canvas").forEach((c) => {
      c.classList.toggle("drawable", tool === "pen" || tool === "eraser");
    });
    if (tool === "type" && (!opts || opts.focus !== false)) {
      const el = activeTextEl();
      if (el) el.focus();
    }
  }

  typeBtn.addEventListener("click", () => setTool("type"));
  penBtn.addEventListener("click", () => setTool("pen"));
  eraserBtn.addEventListener("click", () => setTool("eraser"));

  function applyFormat(cmd) {
    setTool("type");
    const el = activeTextEl();
    if (!el) return;
    el.focus();
    document.execCommand(cmd);
    pages[current].text = el.innerHTML;
    save();
  }
  boldBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    applyFormat("bold");
  });
  italicBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    applyFormat("italic");
  });
  underlineBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    applyFormat("underline");
  });

  fontSizeSel.addEventListener("change", () => {
    pages[current].fontSize = Number(fontSizeSel.value);
    const el = activeTextEl();
    if (el) {
      el.style.fontSize = fontSizeSel.value + "px";
      el.style.lineHeight = Math.round(fontSizeSel.value * 1.45) + "px";
    }
    save();
  });

  clearBtn.addEventListener("click", () => {
    const leafEl = bookEl.querySelector('.leaf[data-index="' + current + '"] canvas');
    if (!leafEl) return;
    const ctx = leafEl.getContext("2d");
    ctx.clearRect(0, 0, leafEl.width, leafEl.height);
    pages[current].drawing = null;
    save();
  });

  newPageBtn.addEventListener("click", () => {
    pages.push({ date: todayLabel(), text: "", fontSize: 23, drawing: null, photos: [] });
    save();
    render();
    goTo(pages.length - 1);
  });

  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      pages[current].photos.push({
        src: ev.target.result,
        x: 30 + Math.random() * 20,
        y: 30 + Math.random() * 20,
        rot: (Math.random() * 10 - 5).toFixed(1),
      });
      save();
      renderPhotos(current);
    };
    reader.readAsDataURL(file);
    photoInput.value = "";
  });

  function makeLeaf(pageData, index) {
    const leaf = document.createElement("div");
    leaf.className = "leaf";
    leaf.dataset.index = index;
    leaf.style.zIndex = pages.length - index;

    const inner = document.createElement("div");
    inner.className = "leaf-inner";

    const dateEl = document.createElement("div");
    dateEl.className = "leaf-date";
    dateEl.textContent = pageData.date;

    const numEl = document.createElement("div");
    numEl.className = "leaf-num";
    numEl.textContent = index + 1 + " / " + pages.length;

    const textEl = document.createElement("div");
    textEl.className = "leaf-text";
    textEl.contentEditable = "true";
    textEl.spellcheck = false;
    textEl.setAttribute("data-placeholder", "Write your entry…");
    textEl.innerHTML = pageData.text || "";
    const fsize = pageData.fontSize || 23;
    textEl.style.fontSize = fsize + "px";
    textEl.style.lineHeight = Math.round(fsize * 1.45) + "px";
    textEl.addEventListener("input", () => {
      pages[index].text = textEl.innerHTML;
      save();
    });
    textEl.addEventListener("focus", () => {
      if (tool !== "type") setTool("type");
      fontSizeSel.value = String(pages[index].fontSize || 23);
    });
    textEl.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
    });

    const canvas = document.createElement("canvas");
    canvas.className = "leaf-canvas" + (tool === "pen" || tool === "eraser" ? " drawable" : "");

    const photosLayer = document.createElement("div");
    photosLayer.className = "photos-layer";

    inner.appendChild(dateEl);
    inner.appendChild(numEl);
    inner.appendChild(textEl);
    inner.appendChild(canvas);
    inner.appendChild(photosLayer);
    leaf.appendChild(inner);
    return leaf;
  }

  function setupCanvas(index) {
    const leaf = bookEl.querySelector('.leaf[data-index="' + index + '"]');
    if (!leaf) return;
    const canvas = leaf.querySelector("canvas");
    const inner = leaf.querySelector(".leaf-inner");
    const ctx = canvas.getContext("2d");

    let drawing = false;
    let last = null;

    function pos(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    canvas.addEventListener("pointerdown", (e) => {
      if (tool !== "pen" && tool !== "eraser") return;
      e.preventDefault();
      drawing = true;
      last = pos(e);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {}
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!drawing || (tool !== "pen" && tool !== "eraser")) return;
      const p = pos(e);
      ctx.beginPath();
      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 18;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = inkColor.value;
        ctx.lineWidth = 2.4;
      }
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    });
    function stop() {
      if (!drawing) return;
      drawing = false;
      pages[index].drawing = canvas.toDataURL("image/png");
      save();
    }
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointerleave", stop);
    canvas.addEventListener("pointercancel", stop);
  }

  // Canvases can only be measured while their leaf is visible, so size them
  // lazily whenever a page becomes current (or the window resizes).
  function sizeCanvas(index) {
    const leaf = bookEl.querySelector('.leaf[data-index="' + index + '"]');
    if (!leaf) return;
    const canvas = leaf.querySelector("canvas");
    const inner = leaf.querySelector(".leaf-inner");
    const rect = inner.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratio = window.devicePixelRatio || 1;
    const w = Math.round(rect.width * ratio);
    const h = Math.round(rect.height * ratio);
    if (canvas.width === w && canvas.height === h && canvas.dataset.sized === "1") return;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    canvas.dataset.sized = "1";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (pages[index] && pages[index].drawing) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = pages[index].drawing;
    }
  }

  function renderPhotos(index) {
    const leaf = bookEl.querySelector('.leaf[data-index="' + index + '"]');
    if (!leaf) return;
    const layer = leaf.querySelector(".photos-layer");
    layer.innerHTML = "";
    pages[index].photos.forEach((p, pi) => {
      const note = document.createElement("div");
      note.className = "photo-note";
      note.style.left = p.x + "%";
      note.style.top = p.y + "%";
      note.style.transform = "rotate(" + p.rot + "deg)";

      const img = document.createElement("img");
      img.src = p.src;
      note.appendChild(img);

      const del = document.createElement("button");
      del.className = "photo-del";
      del.type = "button";
      del.textContent = "×";
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        pages[index].photos.splice(pi, 1);
        save();
        renderPhotos(index);
      });
      note.appendChild(del);

      note.addEventListener("pointerdown", (e) => {
        if (e.target === del) return;
        e.preventDefault();
        const inner = leaf.querySelector(".leaf-inner");
        const rect = inner.getBoundingClientRect();
        note.setPointerCapture(e.pointerId);
        function move(ev) {
          const nx = ((ev.clientX - rect.left) / rect.width) * 100;
          const ny = ((ev.clientY - rect.top) / rect.height) * 100;
          note.style.left = nx + "%";
          note.style.top = ny + "%";
        }
        function up(ev) {
          const nx = ((ev.clientX - rect.left) / rect.width) * 100;
          const ny = ((ev.clientY - rect.top) / rect.height) * 100;
          p.x = Math.max(0, Math.min(85, nx));
          p.y = Math.max(0, Math.min(80, ny));
          save();
          note.removeEventListener("pointermove", move);
          note.removeEventListener("pointerup", up);
        }
        note.addEventListener("pointermove", move);
        note.addEventListener("pointerup", up);
      });

      layer.appendChild(note);
    });
  }

  function alignToolbar() {
    if (getComputedStyle(toolbarEl).position !== "fixed") return;
    const r = bookEl.getBoundingClientRect();
    toolbarEl.style.top = r.top + "px";
    toolbarEl.style.height = r.height + "px";
    if (adRailEl && getComputedStyle(adRailEl).display !== "none") {
      adRailEl.style.top = r.top + "px";
      adRailEl.style.height = r.height + "px";
    }
  }

  let adsLoaded = false;
  function loadAds() {
    if (adsLoaded || !adRailEl) return;
    if (getComputedStyle(adRailEl).display === "none") return;
    adsLoaded = true;
    adRailEl.querySelectorAll("ins.adsbygoogle").forEach(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    });
  }

  function render() {
    bookEl.querySelectorAll(".leaf").forEach((el) => el.remove());
    pages.forEach((p, i) => {
      const leaf = makeLeaf(p, i);
      bookEl.appendChild(leaf);
    });
    pages.forEach((p, i) => {
      setupCanvas(i);
      renderPhotos(i);
    });
    updateStack();
    alignToolbar();
  }

  function updateStack() {
    bookEl.querySelectorAll(".leaf").forEach((el) => {
      const i = Number(el.dataset.index);
      el.classList.toggle("current", i === current);
    });
    sizeCanvas(current);
    prevBtn.disabled = current <= 0;
    nextBtn.disabled = current >= pages.length - 1;
    indicatorEl.textContent = "Page " + (current + 1) + " of " + pages.length;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(pages.length - 1, index));
    updateStack();
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  pages = load();
  render();
  setTool("type", { focus: false });
  function onResize() {
    alignToolbar();
    const leaf = bookEl.querySelector('.leaf[data-index="' + current + '"] canvas');
    if (leaf) leaf.dataset.sized = "";
    sizeCanvas(current);
  }
  window.addEventListener("resize", onResize);
  requestAnimationFrame(() => sizeCanvas(current));
  loadAds();

  return () => {
    window.removeEventListener("resize", onResize);
  };
}
