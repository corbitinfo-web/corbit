import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CORBIT Creative Studio" },
      {
        name: "description",
        content:
          "CORBIT's portfolio of services: video editing, design, creative writing, and research.",
      },
      { property: "og:title", content: "Services — CORBIT" },
      {
        property: "og:description",
        content: "Video editing, design, creative writing, and research work by CORBIT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/services/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/services/" }],
  }),
  component: Services,
});

const SECTIONS = [
  {
    id: "video-editing",
    title: "Video Editing",
    lede: "Narrative edits, short-form cuts, and motion work. Add your best 4–6 pieces here.",
    slug: "video-editing",
  },
  {
    id: "design",
    title: "Design",
    lede: "Brand, layout, and visual design work.",
    slug: "design",
  },
  {
    id: "creative-writing",
    title: "Creative Writing",
    lede: "Scripts, copy, and long-form pieces.",
    slug: "creative-writing",
  },
  {
    id: "research",
    title: "Research",
    lede: "Research-driven and analytical work.",
    slug: "research",
  },
];

const SERVICE_PROJECTS: Record<string, Array<{ title: string; meta: string }>> = {
  "video-editing": [
    { title: "Kinetic Brand Montage", meta: "High-tempo cut with seamless sound design." },
    { title: "Documentary Short", meta: "Narrative-driven cinematic pacing & color." },
    { title: "Commercial Spot 30s", meta: "Broadcast edit with dynamic motion graphics." },
    { title: "Music Video Cut", meta: "Rhythmic synchronization and stylization." },
  ],
  design: [
    { title: "Studio Visual Identity", meta: "Custom wordmark, stationery & system." },
    { title: "Editorial Book Layout", meta: "Swiss grid publication with archival print." },
    { title: "Exhibition Poster Series", meta: "Silkscreen and digital typographic art." },
    { title: "Digital Brand System", meta: "Design tokens, iconography & guidelines." },
  ],
  "creative-writing": [
    { title: "Spec Film Treatment", meta: "Narrative treatment and visual screenplay." },
    { title: "Brand Voice Architecture", meta: "Strategic copywriting and editorial essays." },
    { title: "Cinematic Essay Series", meta: "Deep dives on image-making & culture." },
    { title: "Audio Drama Script", meta: "Spatial voiceover and character dialogue." },
  ],
  research: [
    { title: "16mm Film Grain Emulation", meta: "Color science and halation study." },
    { title: "Cinematic Motion Semiotics", meta: "Visual theory and rhythm analysis." },
    { title: "Analog-to-Digital Workflows", meta: "Archival preservation methodologies." },
    { title: "Generative Media In Craft", meta: "Evaluating emerging VFX tools." },
  ],
};

function Carousel({ slug }: { slug: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const projects = SERVICE_PROJECTS[slug] || [
    { title: "Project Title", meta: "One-line description of the piece." },
  ];

  const scrollBy = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <button
        className="carousel-btn prev"
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
      >
        ‹
      </button>
      <div className="carousel-track" ref={trackRef}>
        {projects.map((proj, idx) => {
          const n = idx + 1;
          return (
            <div className="card" key={n}>
              <img
                src={`/assets/${slug}-${n}.jpg`}
                alt={proj.title}
                width={300}
                height={225}
                loading="lazy"
                decoding="async"
              />
              <div className="card-body">
                <p className="card-title">{proj.title}</p>
                <p className="card-meta">{proj.meta}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-btn next"
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
      >
        ›
      </button>
    </div>
  );
}

function Services() {
  return (
    <div className="corbit-collections">
      <TopBar />
      <main className="page">
        <h1>Services</h1>
        <p className="lede">
          A working portfolio across the four things CORBIT does: video editing, design, creative
          writing, and research. Each project card below is a placeholder — swap the image and title
          for real work as it's ready.
        </p>

        {SECTIONS.map((s) => (
          <div key={s.id}>
            <h2 id={s.id}>{s.title}</h2>
            <p className="lede" style={{ marginBottom: 20 }}>
              {s.lede}
            </p>
            <Carousel slug={s.slug} />
          </div>
        ))}

        <div className="ad-slot">Ad unit placeholder</div>
      </main>
      <SiteFooter />
    </div>
  );
}
