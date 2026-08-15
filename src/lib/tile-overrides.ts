/**
 * Scattered uploads placed on the non-interactive mosaic tiles.
 * Key = tile index in `tiles`, value = image URL.
 *
 * Previously these resolved through Lovable's asset CDN (`/__l5e/assets-v1/...`).
 * Now they point at local files — drop the matching originals into
 * `public/assets/tiles/` using the filenames below (see ASSETS_NEEDED.md).
 */
export const tileOverrides: Record<number, string> = {
  2: "/assets/tiles/upload-0.webp",
  5: "/assets/tiles/upload-1.webp",
  7: "/assets/tiles/upload-2.webp",
  11: "/assets/tiles/upload-3.png",
  13: "/assets/tiles/upload-4.webp",
  16: "/assets/tiles/upload-5.png",
  19: "/assets/tiles/upload-6.png",
  22: "/assets/tiles/upload-7.png",
  26: "/assets/tiles/upload-8.png",
  29: "/assets/tiles/upload-9.png",
  0: "/assets/tiles/upload-10.webp",
  4: "/assets/tiles/upload-11.webp",
  9: "/assets/tiles/upload-12.png",
  14: "/assets/tiles/upload-13.png",
  18: "/assets/tiles/upload-14.webp",
  23: "/assets/tiles/upload-15.jpg",
  27: "/assets/tiles/upload-16.png",
  1: "/assets/tiles/upload-17.png",
  8: "/assets/tiles/upload-18.png",
  12: "/assets/tiles/upload-19.png",
  20: "/assets/tiles/upload-20.png",
  25: "/assets/tiles/upload-21.png",
};
