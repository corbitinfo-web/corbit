import { useState, useRef, MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useMagnetic } from "@/hooks/useMagnetic";

interface PillarCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  specs: string[];
  link: string;
}

const PILLARS: PillarCard[] = [
  {
    number: "01",
    tag: "POST-PRODUCTION / CADENCE",
    title: "Kinetic Montage & Precision Rhythm",
    description:
      "Micro-frame cutting and organic analog film transitions engineered for narrative tension, spatial cadence, and high-impact sonic synchronization.",
    specs: ["DaVinci Resolve Studio", "Avid Media Composer", "Dehancer Pro 16mm", "ACEScc Rec.709"],
    link: "/services#video-editing",
  },
  {
    number: "02",
    tag: "SPATIAL 3D / PROCEDURAL SIMS",
    title: "Spectral Refraction & Dynamic Physics",
    description:
      "Raytraced volumetric caustic dispersion, zero-gravity noise turbulence, and computational simulations crafted for luxury brand visual artifacts.",
    specs: ["Houdini FX", "Octane & Redshift", "Blender Geometry Nodes", "DCI 4K Linear"],
    link: "/services#design",
  },
  {
    number: "03",
    tag: "EDITORIAL / BRAND ARCHIVES",
    title: "Brutalist Systems & Typographic Craft",
    description:
      "Precision Swiss editorial discipline meets physical print archive sensibilities. Bespoke identity languages designed for enduring cultural weight.",
    specs: ["Figma & Vector Systems", "FOGRA39 Offset Print", "Custom Type Specimens", "Design Direction"],
    link: "/journal",
  },
];

export function CinematicStorySection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const ctaMagneticRef = useMagnetic<HTMLAnchorElement>({ strength: 0.35, radius: 80 });

  return (
    <section className="cinematic-story-section" aria-label="Brand Philosophy & Spatial Discipline">
      {/* Ambient background lightfield */}
      <div className="story-ambient-glow" aria-hidden="true" />

      <div className="story-container">
        {/* Section Header & Staggered Typography */}
        <header className="story-header">
          <div className="story-eyebrow">
            <span className="eyebrow-bullet">✦</span>
            <span className="eyebrow-text">DISCIPLINE & CREATIVE DIRECTION</span>
          </div>

          <h2 className="story-title">
            Where kinetic storytelling converges with mathematical precision.
          </h2>

          <p className="story-lead">
            CORBIT operates at the intersection of cinema editing, procedural 3D motion, and archival
            graphic design. Every frame is treated as a standalone physical specimen.
          </p>
        </header>

        {/* 3D Tilt Pillar Cards */}
        <div className="story-pillars-grid">
          {PILLARS.map((pillar, idx) => (
            <StoryCard
              key={pillar.number}
              pillar={pillar}
              isHovered={activeCard === idx}
              onHover={() => setActiveCard(idx)}
              onLeave={() => setActiveCard(null)}
            />
          ))}
        </div>

        {/* Technical Archive Status Bar */}
        <div className="story-specs-bar">
          <div className="specs-col">
            <span className="specs-label">COLOR SCIENCE</span>
            <span className="specs-val">ACEScc / Linear sRGB / Rec.709</span>
          </div>
          <div className="specs-col">
            <span className="specs-label">FRAME ACCURACY</span>
            <span className="specs-val">Sample-Accurate 24.0 / 60.0 FPS</span>
          </div>
          <div className="specs-col">
            <span className="specs-label">SPATIAL RENDERING</span>
            <span className="specs-val">Octane GPU / Houdini Karma</span>
          </div>
          <div className="specs-col cta-col">
            <Link
              ref={ctaMagneticRef}
              to="/services"
              className="story-cta-btn"
              data-cursor="pointer"
              data-cursor-label="COMMISSION ↗"
            >
              Start Project Inquiry ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  pillar,
  isHovered,
  onHover,
  onLeave,
}: {
  pillar: PillarCard;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sheenX: 50, sheenY: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -6; // max 6deg tilt
    const ry = ((x - centerX) / centerX) * 6;

    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setTilt({ rx, ry, sheenX, sheenY });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, sheenX: 50, sheenY: 50 });
    onLeave();
  };

  return (
    <div
      ref={cardRef}
      className={`story-card ${isHovered ? "is-card-hovered" : ""}`}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          transform: `perspective(1000px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateZ(${isHovered ? 12 : 0}px)`,
          "--sheen-x": `${tilt.sheenX}%`,
          "--sheen-y": `${tilt.sheenY}%`,
        } as React.CSSProperties
      }
      data-cursor="inspect"
      data-cursor-label="EXPLORE ↗"
    >
      <div className="card-sheen" aria-hidden="true" />
      <div className="card-top">
        <span className="card-number">{pillar.number}</span>
        <span className="card-tag">{pillar.tag}</span>
      </div>

      <h3 className="card-title">{pillar.title}</h3>
      <p className="card-desc">{pillar.description}</p>

      <div className="card-specs-list">
        {pillar.specs.map((spec) => (
          <span key={spec} className="spec-badge">
            {spec}
          </span>
        ))}
      </div>

      <div className="card-footer">
        <Link to={pillar.link} className="card-link" data-cursor="pointer">
          <span>View Archive Disciplines</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
