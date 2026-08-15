import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";

export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "Assets — Tools & Resources CORBIT Uses" },
      {
        name: "description",
        content: "Tools, stock resources, and inspiration links used by CORBIT.",
      },
      { property: "og:title", content: "Assets — CORBIT" },
      {
        property: "og:description",
        content: "Tools, stock resources, and inspiration links used by CORBIT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/assets/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/assets/" }],
  }),
  component: AssetsPage,
});

function AssetsPage() {
  return (
    <div className="corbit-assets">
      <TopBar />
      <main className="page">
        <h1>Assets</h1>
        <p className="lede">
          Tools and resources CORBIT actually uses — stock footage, design assets, and inspiration
          boards.
        </p>

        <h2>Stock &amp; Design Assets</h2>
        <div className="grid">
          <a
            className="card"
            href="https://elements.envato.com/"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            <img
              src="/assets/asset-envato.jpg"
              alt="Envato Elements"
              width={300}
              height={225}
              loading="lazy"
              decoding="async"
            />
            <div className="card-body">
              <p className="card-title">Envato Elements</p>
              <p className="card-meta">
                Templates, stock footage, music, and design assets used in edits.
              </p>
            </div>
          </a>
          <a
            className="card"
            href="https://www.vecteezy.com/"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            <img
              src="/assets/asset-vecteezy.jpg"
              alt="Vecteezy"
              width={300}
              height={225}
              loading="lazy"
              decoding="async"
            />
            <div className="card-body">
              <p className="card-title">Vecteezy</p>
              <p className="card-meta">Vectors, stock photos, and footage for design work.</p>
            </div>
          </a>
        </div>

        <h2>Inspiration</h2>
        <div className="grid">
          <a
            className="card"
            href="https://pin.it/40lFy047E"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/asset-pinterest.jpg"
              alt="Pinterest Boards"
              width={300}
              height={225}
              loading="lazy"
              decoding="async"
            />
            <div className="card-body">
              <p className="card-title">Pinterest Boards</p>
              <p className="card-meta">Moodboards and references behind the visual direction.</p>
            </div>
          </a>
        </div>

        <div className="ad-slot">Ad unit placeholder</div>
      </main>
      <SiteFooter />
    </div>
  );
}
