import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { TopBar } from "@/components/corbit/TopBar";
import { SiteFooter } from "@/components/corbit/SiteFooter";
import { tiles } from "@/lib/tiles";
import { tileOverrides } from "@/lib/tile-overrides";
import { ProjectModal, type ProjectDetail } from "@/components/corbit/ProjectModal";
import { ScrollTelemetry } from "@/components/corbit/ScrollTelemetry";
import { useScrollPhysics } from "@/hooks/useScrollPhysics";

const crestBanner = { url: "/assets/banners/crest-banner.png" };
const creativeBanner = { url: "/assets/banners/creative-banner.png" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CORBIT — Visual Archive & Creative Studio" },
      {
        name: "description",
        content:
          "A floating visual archive of work across editing, 3D & motion, VFX, and art/design.",
      },
      { property: "og:title", content: "CORBIT — Visual Archive" },
      {
        property: "og:description",
        content: "A floating visual archive across editing, 3D & motion, VFX, and art/design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://corbit.in/" },
    ],
    links: [{ rel: "canonical", href: "https://corbit.in/" }],
  }),
  component: Home,
});

const TILE_METADATA: Record<
  number,
  {
    title: string;
    category: string;
    tag: string;
    desc: string;
    tools: string[];
    specs: { resolution: string; aspectRatio: string; fps: string; colorSpace: string };
    colors: string[];
  }
> = {
  0: {
    title: "Kinetic Montage",
    category: "editing",
    tag: "Timeline Reel",
    desc: "Fast-tempo cut with micro-frame synchronization and analog film transitions.",
    tools: ["DaVinci Resolve Studio", "Avid Media Composer", "Dehancer Pro"],
    specs: {
      resolution: "3840 × 2160 (4K UHD)",
      aspectRatio: "16:9",
      fps: "24.0 fps",
      colorSpace: "ACEScc / Rec.709",
    },
    colors: ["#1a1813", "#5c5038", "#e8d8ab", "#fdf3cb"],
  },
  1: {
    title: "Spectral Prism Dispersion",
    category: "vfx",
    tag: "3D Caustics",
    desc: "Raytraced chromatic refraction through custom procedural quartz geometry.",
    tools: ["Houdini 20", "Octane Render", "After Effects"],
    specs: {
      resolution: "4096 × 2160 (DCI 4K)",
      aspectRatio: "1.90:1",
      fps: "60.0 fps",
      colorSpace: "Linear sRGB",
    },
    colors: ["#141812", "#465935", "#a3b86c", "#e2ebd0"],
  },
  2: {
    title: "Brutalist Typographic Specimen",
    category: "design",
    tag: "Identity",
    desc: "Editorial publication layout inspired by early Swiss and brutalist print archives.",
    tools: ["Figma", "Adobe Illustrator", "InDesign"],
    specs: {
      resolution: "Vector / 300 DPI",
      aspectRatio: "3:4",
      fps: "Static Print",
      colorSpace: "CMYK / FOGRA39",
    },
    colors: ["#121214", "#444654", "#c8cbdb", "#ededf5"],
  },
  3: {
    title: "Grain & Glow 16mm Emulation",
    category: "cinema",
    tag: "Color Science",
    desc: "Photochemical negative emulation with organic halation curves and grain profiles.",
    tools: ["DaVinci Resolve", "FilmConvert Nitrate", "Colorfront"],
    specs: {
      resolution: "3840 × 1600",
      aspectRatio: "2.39:1 Anamorphic",
      fps: "24.0 fps",
      colorSpace: "Kodak 2383 Print",
    },
    colors: ["#1c160e", "#634725", "#f0be75", "#faeedd"],
  },
  4: {
    title: "Void Space Particle Sim",
    category: "motion",
    tag: "3D Motion",
    desc: "Zero-gravity parametric field drift generated via custom noise turbulence equations.",
    tools: ["Blender 4.2", "Cinema 4D", "Redshift"],
    specs: {
      resolution: "3840 × 2160",
      aspectRatio: "16:9",
      fps: "30.0 fps",
      colorSpace: "ACEScg",
    },
    colors: ["#0e1816", "#295447", "#7ecbb5", "#ddf5ee"],
  },
  5: {
    title: "Cadence Cut Pacing Breakdown",
    category: "editing",
    tag: "Short Form",
    desc: "Rhythm exploration balancing rapid cuts with contemplative visual rest periods.",
    tools: ["Premiere Pro", "DaVinci Resolve", "iZotope RX"],
    specs: {
      resolution: "2160 × 3840 (Vertical)",
      aspectRatio: "9:16",
      fps: "60.0 fps",
      colorSpace: "Rec.709",
    },
    colors: ["#1c1214", "#5c333b", "#e6a1aa", "#fae8ea"],
  },
};

function Home() {
  const mosaicRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [activeTileIndex, setActiveTileIndex] = useState<number | null>(null);

  const projectList: ProjectDetail[] = useMemo(() => {
    return tiles.map((t, i) => {
      const id = t.src
        .split("/")
        .pop()!
        .replace(/\.[a-z]+$/i, "");
      const src = tileOverrides[i] || t.src;
      const meta = TILE_METADATA[i % 6] ?? TILE_METADATA[0]!;
      return {
        id,
        title: `${meta.title} #${i + 1}`,
        category: meta.category,
        tag: meta.tag,
        src,
        year: "2026",
        client: "CORBIT Studio Archive",
        description: meta.desc,
        tools: meta.tools,
        specs: meta.specs,
        colors: meta.colors,
      };
    });
  }, []);

  const openProjectAt = (idx: number) => {
    setActiveTileIndex(idx);
    setActiveProject(projectList[idx] || null);
  };

  const handlePrev = () => {
    if (activeTileIndex === null) return;
    const nextIdx = (activeTileIndex - 1 + projectList.length) % projectList.length;
    openProjectAt(nextIdx);
  };

  const handleNext = () => {
    if (activeTileIndex === null) return;
    const nextIdx = (activeTileIndex + 1) % projectList.length;
    openProjectAt(nextIdx);
  };

  const { velocity } = useScrollPhysics();

  useEffect(() => {
    const m = mosaicRef.current;
    if (!m) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      scale = 1;

    const render = () => {
      const scrollParallaxY = Math.min(window.scrollY * 0.12, 120);
      const velocityPitch = Math.min(velocity * 0.15, 6);
      m.style.transform = `translate(-50%,-50%) scale(${scale}) translate3d(${cx * 22}px,${cy * 14 + scrollParallaxY}px,0) rotateX(${-cy * 2.2 + velocityPitch}deg) rotateY(${cx * 2.8}deg)`;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    };
    const animate = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      render();
      raf = requestAnimationFrame(animate);
    };

    const resize = () => {
      const isMobile = innerWidth <= 860;
      const base = isMobile ? 720 : 1500;
      scale = Math.min(1, (innerWidth - (isMobile ? 8 : 24)) / base);
      render();
    };
    addEventListener("resize", resize, { passive: true });
    resize();

    if (!reduceMotion) {
      addEventListener("pointermove", onMove, { passive: true });
      animate();
    }

    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [velocity]);

  return (
    <div className="corbit-index">
      <TopBar />

      {/* 3D Spatial Mosaic Archive Stage */}
      <div className="stage">
        <div className="mosaic" ref={mosaicRef}>
          {tiles.map((t, i) => {
            const src = tileOverrides[i] || t.src;
            const isCutout = /\.png(\?|$)/i.test(src);
            const isAboveFold = i < 6;

            const style = {
              "--x": t.left,
              "--y": t.top,
              "--w": `${t.w}px`,
              "--h": `${t.h}px`,
              "--r": `${t.rot}deg`,
              "--z": t.z,
              "--d": `${((i * 37) % 90) - 45}px`,
              "--rx": `${((i * 13) % 30) / 10 - 1.5}deg`,
              "--ry": `${((i * 7) % 30) / 10 - 1.5}deg`,
            } as React.CSSProperties;

            return (
              <button
                type="button"
                key={t.src}
                className={`tile${isCutout ? " tile--cutout" : ""}`}
                onClick={() => openProjectAt(i)}
                aria-label={t.label || `View archive item ${i + 1}`}
                style={style}
              >
                <img
                  src={src}
                  alt={t.alt || `Archive tile ${i + 1}`}
                  width={t.w}
                  height={t.h}
                  decoding="async"
                  loading={isAboveFold ? "eager" : "lazy"}
                  {...(isAboveFold ? { fetchPriority: "high" as const } : {})}
                  onError={(e) => e.currentTarget.closest(".tile")?.classList.add("tile--broken")}
                />
              </button>
            );
          })}
        </div>
        <div className="vignette" />
      </div>

      {/* Banners */}
      <div className="home-sections" style={{ flex: "1 0 auto" }}>
        <div className="banner banner--art">
          <img
            src={crestBanner.url}
            alt="Winged classical figure crest with ribbons and laurels"
            width={1200}
            height={420}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="banner banner--art">
          <img
            src={creativeBanner.url}
            alt="Video editing, creative design and 3D works collage"
            width={1200}
            height={420}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Interactive Project Inspector Lightbox */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Real-time Studio Telemetry & Navigation HUD */}
      <ScrollTelemetry />

      <SiteFooter />
    </div>
  );
}
