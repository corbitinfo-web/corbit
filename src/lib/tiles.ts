export type Tile = {
  src: string;
  left: number;
  top: number;
  w: number;
  h: number;
  rot: number;
  z: number;
  href?: string;
  external?: boolean;
  label?: string;
  alt?: string;
};

export const tiles: Tile[] = [
  { src: "/assets/tile_00.jpg", left: 5.0, top: 35.531, w: 125, h: 82, rot: -1, z: 2 },
  { src: "/assets/tile_02.jpg", left: 14.0, top: 28.853, w: 164, h: 95, rot: 0, z: 8 },
  { src: "/assets/tile_05.jpg", left: 35.0, top: 30.5225, w: 126, h: 129, rot: 1, z: 12 },
  { src: "/assets/tile_06.jpg", left: 37.2, top: 18.836, w: 165, h: 82, rot: 0, z: 11 },
  { src: "/assets/tile_07.jpg", left: 47.4, top: 29.966, w: 155, h: 108, rot: 0, z: 6 },
  { src: "/assets/tile_08.jpg", left: 52.1, top: 30.4112, w: 100, h: 104, rot: 1, z: 13 },
  { src: "/assets/tile_09.jpg", left: 58.5, top: 29.5208, w: 158, h: 105, rot: 0, z: 9 },
  { src: "/assets/tile_10.jpg", left: 67.7, top: 19.3925, w: 91, h: 166, rot: 0, z: 15 },
  { src: "/assets/tile_11.jpg", left: 74.3, top: 34.9745, w: 282, h: 86, rot: 0, z: 14 },
  { src: "/assets/tile_12.jpg", left: 80.3, top: 21.6185, w: 101, h: 87, rot: 0, z: 16 },
  { src: "/assets/tile_13.jpg", left: 87.2, top: 36.644, w: 110, h: 72, rot: 0, z: 5 },
  { src: "/assets/tile_14.jpg", left: 90.7, top: 42.209, w: 83, h: 95, rot: 0, z: 3 },
  { src: "/assets/tile_16.jpg", left: 13.5, top: 45.548, w: 104, h: 110, rot: 0, z: 4 },
  { src: "/assets/tile_17.jpg", left: 22.4, top: 44.435, w: 145, h: 123, rot: 0, z: 5 },
  { src: "/assets/tile_18.jpg", left: 29.6, top: 43.8785, w: 165, h: 108, rot: 0, z: 10 },
  { src: "/assets/tile_20.jpg", left: 48.7, top: 44.435, w: 130, h: 180, rot: 0, z: 18 },
  { src: "/assets/tile_21.jpg", left: 55.7, top: 43.322, w: 141, h: 174, rot: 0, z: 20 },
  { src: "/assets/tile_22.jpg", left: 63.0, top: 45.548, w: 157, h: 150, rot: 0, z: 11 },
  { src: "/assets/tile_23.jpg", left: 72.1, top: 47.774, w: 150, h: 140, rot: 0, z: 7 },
  { src: "/assets/tile_24.jpg", left: 79.8, top: 47.2175, w: 128, h: 154, rot: 0, z: 6 },
  { src: "/assets/tile_25.jpg", left: 86.0, top: 47.2175, w: 150, h: 155, rot: 0, z: 4 },
  { src: "/assets/tile_27.jpg", left: 25.74, top: 64.502, w: 160, h: 103, rot: -0.13, z: 8 },
  { src: "/assets/tile_28.jpg", left: 36.0, top: 65.381, w: 164, h: 117, rot: 0.42, z: 13 },
  { src: "/assets/tile_29.jpg", left: 46.71, top: 60.226, w: 158, h: 91, rot: -0.05, z: 7 },
  { src: "/assets/tile_30.jpg", left: 59.55, top: 63.271, w: 161, h: 105, rot: -0.56, z: 8 },
  { src: "/assets/tile_31.jpg", left: 69.38, top: 62.999, w: 154, h: 110, rot: -0.51, z: 5 },
  { src: "/assets/tile_32.jpg", left: 79.08, top: 68.021, w: 128, h: 105, rot: 0.8, z: 4 },
  { src: "/assets/tile_33.jpg", left: 18.88, top: 75.993, w: 115, h: 73, rot: -0.69, z: 14 },
  { src: "/assets/tile_35.jpg", left: 44.27, top: 73.79, w: 205, h: 83, rot: -0.84, z: 10 },
  { src: "/assets/tile_36.jpg", left: 60.76, top: 72.963, w: 155, h: 61, rot: -2.13, z: 12 },
];
