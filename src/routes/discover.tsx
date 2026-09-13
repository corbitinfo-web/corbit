import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — CORBIT Archive" },
      { name: "description", content: "Browse and search the full CORBIT archive." },
      { property: "og:title", content: "Discover — CORBIT" },
      { property: "og:description", content: "Browse and search the full CORBIT archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/discover/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/discover/" }],
  }),
  component: Discover,
});

const FILTERS = ["all", "camera", "audio", "lighting", "accessories"] as const;

const PRODUCTS = [
  {
    category: "accessories",
    name: "Amazon Basics 67 Inch (170CM) Tripod for DSLR",
    price: "₹879",
    link: "https://link.amazon/B0bbc5IZf",
    img: "https://m.media-amazon.com/images/I/51OVhYBq5tL._SL1500_.jpg",
  },
  {
    category: "accessories",
    name: "TECHONTO 360° Degree Cell Phone Holder with Adjustable Clamp",
    price: "₹155",
    link: "https://link.amazon/B0azyjEKW",
    img: "https://m.media-amazon.com/images/I/61ny+rqFQYL._SL1500_.jpg",
  },
  {
    category: "accessories",
    name: "DIGITEK (DTR 550 LW) 67 Inch Foldable Tripod Stand with Phone Holder & 360° Ball Head",
    price: "₹1,799",
    link: "https://link.amazon/B04LDAC1P",
    img: "https://m.media-amazon.com/images/I/51zvtBwm8iL._SL1200_.jpg",
  },
  {
    category: "audio",
    name: "OnePlus Nord Buds 3r TWS Earbuds up to 54 Hours Playback",
    price: "₹1,771",
    link: "https://link.amazon/B05hI6YkM",
    img: "https://m.media-amazon.com/images/I/51nBTTG3hNL._SL1500_.jpg",
  },
  {
    category: "accessories",
    name: "SanDisk Extreme Pro SD UHS I 128GB Card for 4K Video (200MB/s Read)",
    price: "₹3,800",
    link: "https://link.amazon/B038aO9dx",
    img: "https://m.media-amazon.com/images/I/81wwLOgkLgL._SL1500_.jpg",
  },
  {
    category: "camera",
    name: "Sony Alpha ZV-E10K with SELP1650 Power Zoom Lens | 24.2 MP Mirrorless Vlog Camera",
    price: "₹63,990",
    link: "https://link.amazon/B04VwDzsg",
    img: "https://m.media-amazon.com/images/I/712ywHZbdNL._SL1500_.jpg",
  },
  {
    category: "audio",
    name: "Digitek DWM 121 Wireless Microphone System, Type C & LTC Connector, 80M Range",
    price: "₹5,499",
    link: "https://link.amazon/B05wmRkL4",
    img: "https://m.media-amazon.com/images/I/71EBZfBakhL._SL1500_.jpg",
  },
  {
    category: "audio",
    name: "Digitek DWM 101 Wireless Microphone System with ANC Noise Reduction, 12 Hrs Working Time",
    price: "₹3,999",
    link: "https://link.amazon/B0a90ud8a",
    img: "https://m.media-amazon.com/images/I/71bd2iJ18bL._SL1500_.jpg",
  },
  {
    category: "lighting",
    name: "DIGITEK LED-D6W RGB Portable Mini Video Light, 360° HSI Full Color, 9 FX Modes",
    price: "₹1,299",
    link: "https://link.amazon/B023xPXj1",
    img: "https://m.media-amazon.com/images/I/51Xqnu+iyQL._SL1500_.jpg",
  },
];

function Discover() {
  const [filter, setFilter] = useState<string>("all");
  const [disclosureOpen, setDisclosureOpen] = useState(true);

  const visible = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="corbit-discover">
      <TopBar />
      <main className="page">
        <div className="shop-banner" aria-hidden="true" />

        {disclosureOpen && (
          <div className="disclosure" id="disclosure">
            <button
              className="disclosure-close"
              type="button"
              aria-label="Dismiss disclosure"
              onClick={() => setDisclosureOpen(false)}
            >
              ×
            </button>
            <strong>Disclosure:</strong> As an Amazon Associate, CORBIT earns from qualifying
            purchases. Product links below go to Amazon; prices and availability shown on Amazon are
            accurate as of the date shown there, not here. See the{" "}
            <Link to="/privacy">Privacy &amp; Disclosure</Link> page for full details.
          </div>
        )}

        <h2>Kit</h2>
        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-chip${filter === f ? " active" : ""}`}
              type="button"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid">
          {visible.map((p) => (
            <a
              key={p.link}
              className="card"
              data-category={p.category}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              <img src={p.img} alt={p.name} loading="lazy" referrerPolicy="no-referrer" />
              <div className="card-body">
                <p className="card-title">{p.name}</p>
                <p className="card-price">{p.price}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="ad-slot">Ad unit placeholder</div>

        <p className="lede">
          Gear, software, and equipment used in this work. These are Amazon affiliate links — CORBIT
          earns a small commission on qualifying purchases, at no extra cost to you.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
