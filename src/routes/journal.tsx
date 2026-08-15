import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";
import { initJournal } from "@/lib/journal-init";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — CORBIT Notes on Process" },
      {
        name: "description",
        content:
          "Notes on process, projects, and creative work from CORBIT — a handwritten-style journal.",
      },
      { property: "og:title", content: "Journal — CORBIT" },
      {
        property: "og:description",
        content: "Notes on process, projects, and creative work from CORBIT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/journal/" },
    ],
    links: [
      { rel: "canonical", href: "https://corbit.in/journal/" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Journal,
});

function Journal() {
  useEffect(() => initJournal(), []);

  return (
    <div className="corbit-journal">
      <TopBar />

      <main className="page journal-main">
        <div className="journal-title">
          <h1>Journal</h1>
          <p className="journal-autosave">Notes on process, kept in this browser.</p>
        </div>

        <div className="journal-layout">
          <div className="toolbar" id="toolbar" role="toolbar" aria-label="Journal tools">
            <div className="toolbar-label">Page</div>
            <button className="tool-btn" id="newPageBtn">
              + New Page
            </button>
            <hr className="toolbar-divider" />
            <div className="toolbar-label">Write &amp; Draw</div>
            <button className="tool-btn" id="typeBtn" data-tool="type">
              🖊 Type
            </button>
            <div className="format-row">
              <button className="fmt-btn" id="boldBtn" title="Bold">
                <b>B</b>
              </button>
              <button className="fmt-btn" id="italicBtn" title="Italic">
                <i>I</i>
              </button>
              <button className="fmt-btn" id="underlineBtn" title="Underline">
                <u>U</u>
              </button>
            </div>
            <div className="ink-row">
              <span>Size</span>
              <select id="fontSize" className="font-size-select" defaultValue="23">
                <option value="18">S</option>
                <option value="23">M</option>
                <option value="30">L</option>
                <option value="38">XL</option>
              </select>
            </div>
            <button className="tool-btn" id="penBtn" data-tool="pen">
              ✎ Pen
            </button>
            <div className="ink-row">
              <span>Ink</span>
              <input
                className="ink-swatch"
                id="inkColor"
                type="color"
                defaultValue="#241d13"
                title="Ink color"
              />
            </div>
            <button className="tool-btn" id="eraserBtn" data-tool="eraser">
              ⌫ Eraser
            </button>
            <button className="tool-btn" id="clearBtn">
              Clear Sketch
            </button>
            <hr className="toolbar-divider" />
            <div className="toolbar-label">Paper Style</div>
            <div className="ink-row">
              <select
                id="paperTheme"
                className="font-size-select"
                defaultValue="parchment"
                title="Paper Style"
              >
                <option value="parchment">📜 Vintage Parchment</option>
                <option value="blueprint">📐 Technical Blueprint</option>
                <option value="grid">▦ Architect Grid</option>
                <option value="dark">🌑 Moleskine Dark</option>
              </select>
            </div>
            <button className="tool-btn" id="exportBtn" title="Export current page as PNG">
              💾 Export Entry
            </button>
            <hr className="toolbar-divider" />
            <div className="toolbar-label">Photos</div>
            <label className="tool-btn" htmlFor="photoInput">
              📷 Add Photo
            </label>
            <input type="file" id="photoInput" accept="image/*" />
          </div>



          <div className="stage-wrap">
            <div className="stage">
              <div className="book" id="book">
                <div className="ribbon" />
              </div>
            </div>
            <div className="page-nav-row">
              <button className="tool-btn nav-btn" id="prevBtn">
                ‹ Previous Page
              </button>
              <span className="indicator" id="indicator" />
              <button className="tool-btn nav-btn" id="nextBtn">
                Next Page ›
              </button>
            </div>
          </div>
        </div>

        <p className="lede lede-bottom">
          Notes on projects, process, and what's inspiring the work right now — written like a real
          diary. Flip through entries, jot new ones in your own hand, sketch on the page, or pin a
          photo to it.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
