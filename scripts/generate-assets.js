import fs from "fs";
import path from "path";

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

ensureDir("public/assets/banners");
ensureDir("public/assets/tiles");

// Helper to create richly styled SVGs that mimic editorial photography, 3D artwork, and archive specimens
function generateSvgTile(title, category, subtitle, colorScheme, isCutout = false) {
  const schemes = {
    gold: { bg1: "#1a1813", bg2: "#2d281e", accent: "#e8d8ab", text: "#f5edd6", line: "#5c5038" },
    olive: { bg1: "#141812", bg2: "#212b1a", accent: "#a3b86c", text: "#e2ebd0", line: "#465935" },
    charcoal: {
      bg1: "#121214",
      bg2: "#222329",
      accent: "#c8cbdb",
      text: "#ededf5",
      line: "#444654",
    },
    crimson: {
      bg1: "#1c1214",
      bg2: "#2e1b1f",
      accent: "#e6a1aa",
      text: "#fae8ea",
      line: "#5c333b",
    },
    amber: { bg1: "#1c160e", bg2: "#302315", accent: "#f0be75", text: "#faeedd", line: "#634725" },
    emerald: {
      bg1: "#0e1816",
      bg2: "#162b25",
      accent: "#7ecbb5",
      text: "#ddf5ee",
      line: "#295447",
    },
  };

  const scheme = schemes[colorScheme] || schemes.gold;

  if (isCutout) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="100%" height="100%">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="rgba(0,0,0,0.7)"/>
    </filter>
    <linearGradient id="g_${title}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${scheme.accent}"/>
      <stop offset="100%" stop-color="${scheme.bg2}"/>
    </linearGradient>
  </defs>
  <g filter="url(#shadow)">
    <circle cx="160" cy="160" r="110" fill="none" stroke="${scheme.accent}" stroke-width="2" stroke-dasharray="6,4"/>
    <circle cx="160" cy="160" r="95" fill="${scheme.bg1}" stroke="${scheme.line}" stroke-width="1.5"/>
    <polygon points="160,80 230,200 90,200" fill="none" stroke="${scheme.accent}" stroke-width="2"/>
    <circle cx="160" cy="160" r="30" fill="url(#g_${title})" opacity="0.85"/>
    <text x="160" y="250" text-anchor="middle" fill="${scheme.accent}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="2">${title.toUpperCase()}</text>
  </g>
</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${title.replace(/\s+/g, "_")}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${scheme.bg1}"/>
      <stop offset="60%" stop-color="${scheme.bg2}"/>
      <stop offset="100%" stop-color="${scheme.bg1}"/>
    </linearGradient>
    <radialGradient id="vignette_${title.replace(/\s+/g, "_")}" cx="50%" cy="50%" r="60%">
      <stop offset="50%" stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.6)"/>
    </radialGradient>
    <pattern id="grid_${title.replace(/\s+/g, "_")}" width="20" height="20" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="20" y2="0" stroke="${scheme.line}" stroke-width="0.5" opacity="0.3"/>
      <line x1="0" y1="0" x2="0" y2="20" stroke="${scheme.line}" stroke-width="0.5" opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg_${title.replace(/\s+/g, "_")})"/>
  <rect width="100%" height="100%" fill="url(#grid_${title.replace(/\s+/g, "_")})"/>
  <rect width="100%" height="100%" fill="url(#vignette_${title.replace(/\s+/g, "_")})"/>
  
  <!-- Subtle Framing -->
  <rect x="14" y="14" width="372" height="272" fill="none" stroke="${scheme.line}" stroke-width="1" opacity="0.6"/>
  <rect x="18" y="18" width="364" height="264" fill="none" stroke="${scheme.accent}" stroke-width="0.5" opacity="0.3"/>

  <!-- Decorative Corner Marks -->
  <path d="M 14 26 L 14 14 L 26 14" fill="none" stroke="${scheme.accent}" stroke-width="1.5"/>
  <path d="M 386 26 L 386 14 L 374 14" fill="none" stroke="${scheme.accent}" stroke-width="1.5"/>
  <path d="M 14 274 L 14 286 L 26 286" fill="none" stroke="${scheme.accent}" stroke-width="1.5"/>
  <path d="M 386 274 L 386 286 L 374 286" fill="none" stroke="${scheme.accent}" stroke-width="1.5"/>

  <!-- Geometric Artwork in Center -->
  <g transform="translate(200, 130)" opacity="0.9">
    <circle cx="0" cy="0" r="50" fill="none" stroke="${scheme.accent}" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="0" cy="0" r="38" fill="${scheme.bg1}" stroke="${scheme.line}" stroke-width="1"/>
    <polygon points="0,-35 30,20 -30,20" fill="none" stroke="${scheme.accent}" stroke-width="1.5"/>
    <line x1="-45" y1="0" x2="45" y2="0" stroke="${scheme.line}" stroke-width="1"/>
    <line x1="0" y1="-45" x2="0" y2="45" stroke="${scheme.line}" stroke-width="1"/>
    <circle cx="0" cy="0" r="4" fill="${scheme.accent}"/>
  </g>

  <!-- Typography -->
  <text x="32" y="44" fill="${scheme.accent}" font-family="'Courier New', monospace" font-size="10" font-weight="700" letter-spacing="1.5">${category.toUpperCase()}</text>
  <text x="32" y="240" fill="${scheme.text}" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" letter-spacing="0.5">${title}</text>
  <text x="32" y="260" fill="${scheme.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="11" opacity="0.85">${subtitle}</text>
  <text x="368" y="260" text-anchor="end" fill="${scheme.line}" font-family="'Courier New', monospace" font-size="9">CORBIT // ARCHIVE</text>
</svg>`;
}

// Banners
const crestBannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_crest" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141412"/>
      <stop offset="50%" stop-color="#1f1e19"/>
      <stop offset="100%" stop-color="#141412"/>
    </linearGradient>
    <linearGradient id="gold_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf3cb"/>
      <stop offset="50%" stop-color="#d4be7a"/>
      <stop offset="100%" stop-color="#998348"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg_crest)" rx="16"/>
  <rect x="12" y="12" width="1176" height="396" fill="none" stroke="#4a422d" stroke-width="1.5" rx="12" opacity="0.6"/>
  <rect x="18" y="18" width="1164" height="384" fill="none" stroke="#d4be7a" stroke-width="0.5" rx="8" opacity="0.3"/>

  <!-- Crest Art Center -->
  <g transform="translate(600, 160)">
    <!-- Laurel Wreath -->
    <path d="M -80 40 C -120 0, -110 -60, -40 -90 C -60 -50, -40 -10, 0 -10 C 40 -10, 60 -50, 40 -90 C 110 -60, 120 0, 80 40 C 40 80, -40 80, -80 40 Z" fill="none" stroke="url(#gold_grad)" stroke-width="2.5" opacity="0.85"/>
    <circle cx="0" cy="-20" r="32" fill="#141412" stroke="url(#gold_grad)" stroke-width="2"/>
    <text x="0" y="-12" text-anchor="middle" fill="url(#gold_grad)" font-family="Georgia, serif" font-size="22" font-weight="700">C</text>
    
    <!-- Ribbons -->
    <path d="M -140 50 L -60 45 L 0 55 L 60 45 L 140 50 L 120 70 L 60 60 L 0 70 L -60 60 L -120 70 Z" fill="#2d281c" stroke="url(#gold_grad)" stroke-width="1.5"/>
    <text x="0" y="63" text-anchor="middle" fill="#fdf3cb" font-family="'Courier New', monospace" font-size="10" font-weight="700" letter-spacing="4">VERITAS ET ARS</text>
  </g>

  <!-- Typography -->
  <text x="600" y="275" text-anchor="middle" fill="url(#gold_grad)" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="700" letter-spacing="6">CORBIT VISUAL ARCHIVE</text>
  <text x="600" y="310" text-anchor="middle" fill="#c4baa2" font-family="system-ui, sans-serif" font-size="14" font-weight="500" letter-spacing="3">CREATIVE STUDIO // EDITING • 3D MOTION • VFX • RESEARCH</text>
  <line x1="420" y1="330" x2="780" y2="330" stroke="#665b40" stroke-width="1"/>
  <text x="600" y="352" text-anchor="middle" fill="#8f856e" font-family="'Courier New', monospace" font-size="11" letter-spacing="2">EST. MMXXVI • REPOSITORY OF CRAFT</text>
</svg>`;

const creativeBannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_creative" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111317"/>
      <stop offset="50%" stop-color="#181d24"/>
      <stop offset="100%" stop-color="#111317"/>
    </linearGradient>
    <linearGradient id="cyan_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d4e8fa"/>
      <stop offset="50%" stop-color="#8bb7e0"/>
      <stop offset="100%" stop-color="#46729e"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg_creative)" rx="16"/>
  <rect x="12" y="12" width="1176" height="396" fill="none" stroke="#2d3a4d" stroke-width="1.5" rx="12" opacity="0.6"/>

  <!-- Abstract Motion Film Strips -->
  <g opacity="0.25">
    <line x1="80" y1="60" x2="1120" y2="60" stroke="#8bb7e0" stroke-width="1" stroke-dasharray="16,8"/>
    <line x1="80" y1="360" x2="1120" y2="360" stroke="#8bb7e0" stroke-width="1" stroke-dasharray="16,8"/>
  </g>

  <g transform="translate(600, 160)">
    <!-- 3D Perspective Isometric Cube Grid -->
    <polygon points="0,-60 60,-25 0,10 -60,-25" fill="none" stroke="url(#cyan_grad)" stroke-width="2"/>
    <polygon points="60,-25 60,45 0,80 0,10" fill="none" stroke="url(#cyan_grad)" stroke-width="2" opacity="0.8"/>
    <polygon points="-60,-25 -60,45 0,80 0,10" fill="none" stroke="url(#cyan_grad)" stroke-width="2" opacity="0.6"/>
    <circle cx="0" cy="10" r="18" fill="url(#cyan_grad)" opacity="0.7"/>
  </g>

  <!-- Typography -->
  <text x="600" y="275" text-anchor="middle" fill="url(#cyan_grad)" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800" letter-spacing="4">MOTION, CINEMA &amp; CODE</text>
  <text x="600" y="308" text-anchor="middle" fill="#a4bcd4" font-family="system-ui, sans-serif" font-size="13" font-weight="500" letter-spacing="2">CUTS THAT HOLD ATTENTION • DESIGNS THAT ENDURE</text>
  <line x1="450" y1="330" x2="750" y2="330" stroke="#364963" stroke-width="1"/>
  <text x="600" y="352" text-anchor="middle" fill="#6d839e" font-family="'Courier New', monospace" font-size="11" letter-spacing="2">CORBIT CREATIVE STUDIO ARCHIVE</text>
</svg>`;

// Write Banners
fs.writeFileSync("public/assets/banners/crest-banner.png", crestBannerSvg);
fs.writeFileSync("public/assets/banners/creative-banner.png", creativeBannerSvg);

// Define categories & themes for tiles
const tileItems = [
  { title: "Kinetic Montage", cat: "Edit", sub: "Timeline Reel Vol. 1", scheme: "gold" },
  { title: "Spectral Prism", cat: "VFX", sub: "3D Light Refraction", scheme: "olive" },
  { title: "Brutalist Type", cat: "Design", sub: "Editorial Specimen", scheme: "charcoal" },
  { title: "Grain & Glow", cat: "Color", sub: "16mm Emulation", scheme: "amber" },
  { title: "Void Space", cat: "Motion", sub: "Particle Simulation", scheme: "emerald" },
  { title: "Cadence Cut", cat: "Edit", sub: "Rhythm & Pacing", scheme: "crimson" },
  { title: "Monolith 04", cat: "3D", sub: "Architectural Form", scheme: "charcoal" },
  { title: "Amber Silhouette", cat: "Cinema", sub: "Anamorphic Flare", scheme: "amber" },
  { title: "Acoustic Waves", cat: "Audio", sub: "Foley & Score", scheme: "olive" },
  { title: "Minimal Grid", cat: "Layout", sub: "Swiss Typography", scheme: "gold" },
  { title: "Chromatic Shift", cat: "VFX", sub: "Lens Distortion", scheme: "emerald" },
  { title: "Studio Emblem", cat: "Identity", sub: "Vector Monogram", scheme: "gold", cutout: true },
  { title: "Film Negative", cat: "Archive", sub: "Contact Sheet", scheme: "charcoal" },
  { title: "Fluid Dynamics", cat: "Motion", sub: "Viscosity Study", scheme: "crimson" },
  { title: "Glyph Specimen", cat: "Type", sub: "Custom Foundry", scheme: "olive", cutout: true },
  { title: "Neon Horizon", cat: "3D", sub: "Volumetric Fog", scheme: "amber" },
  { title: "Macro Texture", cat: "Art", sub: "Analog Printmaking", scheme: "gold" },
  { title: "Neural Drift", cat: "Research", sub: "Generative Logic", scheme: "emerald" },
  { title: "Echo Chamber", cat: "Sound", sub: "Spatial Audio", scheme: "charcoal" },
  { title: "Orbit Rig", cat: "3D", sub: "Parametric Mesh", scheme: "crimson", cutout: true },
  { title: "Paper Archive", cat: "Doc", sub: "Manuscript Scan", scheme: "olive" },
  { title: "Zenith Cut", cat: "Edit", sub: "Final Master", scheme: "gold" },
  { title: "Strobe Study", cat: "Motion", sub: "High Frequency", scheme: "amber" },
  { title: "Signal Path", cat: "Design", sub: "Diagrammatic Art", scheme: "charcoal" },
  { title: "Prismatic Wave", cat: "VFX", sub: "Caustics & Glow", scheme: "emerald" },
  { title: "Vesper Frame", cat: "Cinema", sub: "Golden Hour Cut", scheme: "gold" },
  { title: "Aura Mask", cat: "Design", sub: "Vector Crest", scheme: "olive", cutout: true },
  { title: "Static Pulse", cat: "Motion", sub: "Oscilloscope", scheme: "crimson" },
  { title: "Lapis Specimen", cat: "Archive", sub: "Mineral Pigment", scheme: "charcoal" },
  { title: "Apex Render", cat: "3D", sub: "Subdivision Surface", scheme: "emerald" },
  { title: "Nocturne Reel", cat: "Edit", sub: "Midnight Cuts", scheme: "amber" },
  { title: "Foundry Key", cat: "Identity", sub: "Seal & Signature", scheme: "gold", cutout: true },
  { title: "Horizon Line", cat: "Cinema", sub: "Wide Aspect 2.39", scheme: "charcoal" },
  { title: "Chroma Matrix", cat: "Color", sub: "LUT Breakdown", scheme: "olive" },
  { title: "Resonance", cat: "Sound", sub: "Sub-bass Resonance", scheme: "crimson" },
  { title: "Archive Index", cat: "Doc", sub: "Master Catalog", scheme: "gold" },
  { title: "Final Slate", cat: "Cinema", sub: "Timecode 01:00:00", scheme: "amber" },
];

// Generate standard tile images: public/assets/tile_XX.jpg
const tileIndices = [
  0, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31,
  32, 33, 35, 36,
];
tileIndices.forEach((idx, i) => {
  const item = tileItems[i % tileItems.length];
  const pad = String(idx).padStart(2, "0");
  const svg = generateSvgTile(item.title, item.cat, item.sub, item.scheme, item.cutout);
  fs.writeFileSync(`public/assets/tile_${pad}.jpg`, svg);
});

// Generate uploads for tileOverrides: public/assets/tiles/upload-X.webp/png/jpg
for (let i = 0; i <= 21; i++) {
  const item = tileItems[(i + 5) % tileItems.length];
  const isCutout = [3, 5, 6, 7, 8, 9, 12, 13, 16, 17, 18, 19, 20, 21].includes(i);
  const svg = generateSvgTile(item.title, item.cat, item.sub, item.scheme, isCutout);

  fs.writeFileSync(`public/assets/tiles/upload-${i}.webp`, svg);
  fs.writeFileSync(`public/assets/tiles/upload-${i}.png`, svg);
  fs.writeFileSync(`public/assets/tiles/upload-${i}.jpg`, svg);
}

// Generate Services card images
const services = ["video-editing", "design", "creative-writing", "research"];
services.forEach((s) => {
  for (let n = 1; n <= 4; n++) {
    const title = `${s.replace("-", " ").toUpperCase()} 0${n}`;
    const svg = generateSvgTile(
      title,
      s,
      `Selected Case Study #${n}`,
      n % 2 === 0 ? "gold" : "olive",
    );
    fs.writeFileSync(`public/assets/${s}-${n}.jpg`, svg);
  }
});

// Generate Assets page images
fs.writeFileSync(
  "public/assets/asset-envato.jpg",
  generateSvgTile("Envato Elements", "Tools", "Stock & Templates Library", "gold"),
);
fs.writeFileSync(
  "public/assets/asset-vecteezy.jpg",
  generateSvgTile("Vecteezy Pro", "Vectors", "Illustrations & Vector Art", "olive"),
);
fs.writeFileSync(
  "public/assets/asset-pinterest.jpg",
  generateSvgTile("Pinterest Boards", "Inspiration", "Visual Moodboards & Style", "crimson"),
);

console.log("All visual assets generated successfully!");
