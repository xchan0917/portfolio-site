export type PlaygroundAccent = "peach" | "pink" | "purple" | "cream";

export type PlaygroundClusterFrame = {
  src: string;
  w: number;
  imgW: number;
  imgH: number;
  x: number;
  y: number;
  rotate?: number;
  zIndex?: number;
};

export type PlaygroundItem = {
  id: string;
  title: string;
  caption?: string;
  image?: string;
  /** Still frame shown until the user clicks to play animated media. */
  poster?: string;
  /** Animated media only starts after a click/tap on the card. */
  playOnClick?: boolean;
  /** Overlapping frames — when set, renders a cluster instead of a single image. */
  frames?: PlaygroundClusterFrame[];
  x: number;
  y: number;
  /** Display width in px — height follows native aspect ratio or clusterH. */
  w: number;
  imgW?: number;
  imgH?: number;
  /** Fixed media height for frame clusters. */
  clusterH?: number;
  rotate?: number;
  accent?: PlaygroundAccent;
  /** UI mockups keep their frame; photos fill the card. */
  fit?: "cover" | "contain";
};

export const PLAYGROUND_TILE = { w: 1780, h: 2480 } as const;

export const playgroundIntro = "[Bits and pieces of my work ♡ ]";

const STAIR_WALL_MURAL_SRC = "/play/stair-wall-mural.jpeg";

/** Shared metadata for every card that uses the stair wall mural photo. */
const stairWallMuralMeta = {
  title: "Stair Wall mural using acrylic paint (with Lily K)",
  image: STAIR_WALL_MURAL_SRC,
  imgW: 2784,
  imgH: 3075,
  w: 540,
  fit: "contain" as const,
  accent: "peach" as const,
};

const rawPlaygroundItems: PlaygroundItem[] = [
  {
    id: "tma-graphics",
    title: "Graphics for TMA posts",
    x: 150,
    y: 70,
    w: 320,
    clusterH: 265,
    rotate: -2.5,
    accent: "purple",
    frames: [
      {
        src: "/play/tma-graphics.png",
        w: 220,
        imgW: 402,
        imgH: 442,
        x: 0,
        y: 16,
        rotate: -5,
        zIndex: 1,
      },
      {
        src: "/play/tma-menu-pricing.png",
        w: 210,
        imgW: 1024,
        imgH: 1024,
        x: 98,
        y: 0,
        rotate: 4,
        zIndex: 2,
      },
    ],
  },
  {
    id: "stair-mural",
    title: "Stair mural using acrylic paint + spray paint (with Lily K)",
    image: "/play/stair-mural.jpeg",
    x: 500,
    y: 160,
    w: 460,
    imgW: 2429,
    imgH: 1224,
    rotate: 1.5,
    accent: "peach",
    fit: "cover",
  },
  {
    id: "stair-wall-mural",
    title: stairWallMuralMeta.title,
    image: stairWallMuralMeta.image,
    x: 1100,
    y: 40,
    w: stairWallMuralMeta.w,
    imgW: stairWallMuralMeta.imgW,
    imgH: stairWallMuralMeta.imgH,
    rotate: -2,
    accent: stairWallMuralMeta.accent,
    fit: stairWallMuralMeta.fit,
  },
  {
    id: "punchcard-web",
    title: "ScottyLabs Punchcard Web",
    caption: "WIP",
    image: "/play/punchcard-web.png",
    x: 70,
    y: 460,
    w: 280,
    imgW: 442,
    imgH: 802,
    rotate: 2,
    accent: "purple",
    fit: "contain",
  },
  {
    id: "ceramics-plate",
    title: "Ceramics 8in plate (thrown)",
    image: "/play/ceramics-plate.jpeg",
    x: 750,
    y: 640,
    w: 270,
    imgW: 3024,
    imgH: 4032,
    rotate: -3,
    accent: "cream",
    fit: "cover",
  },
  {
    id: "doordash-aui",
    title: "Experimenting with Doordash's AUI improvement",
    x: 520,
    y: 980,
    w: 420,
    clusterH: 380,
    rotate: -1.5,
    accent: "pink",
    frames: [
      {
        src: "/play/doordash-home.png",
        w: 168,
        imgW: 199,
        imgH: 397,
        x: 0,
        y: 24,
        rotate: -5,
        zIndex: 1,
      },
      {
        src: "/play/doordash-cart.png",
        w: 166,
        imgW: 198,
        imgH: 394,
        x: 108,
        y: 0,
        rotate: 2.5,
        zIndex: 3,
      },
      {
        src: "/play/doordash-cart-delete.png",
        w: 172,
        imgW: 200,
        imgH: 398,
        x: 82,
        y: 118,
        rotate: -2,
        zIndex: 2,
      },
      {
        src: "/play/doordash-order.png",
        w: 172,
        imgW: 199,
        imgH: 397,
        x: 228,
        y: 12,
        rotate: 4,
        zIndex: 4,
      },
    ],
  },
  {
    id: "ceramics-cup",
    title: "Ceramics 4.5in cup (thrown)",
    caption: "Glaze: Sea mist + Merlot",
    image: "/play/ceramics-cup-hand.jpeg",
    x: 1340,
    y: 1820,
    w: 260,
    imgW: 871,
    imgH: 1755,
    rotate: 3,
    accent: "cream",
    fit: "cover",
  },
  {
    id: "ceramics-vessel",
    title: "Ceramics 9in vessel (thrown)",
    image: "/play/ceramics-vessel.jpeg",
    x: 1180,
    y: 1580,
    w: 280,
    imgW: 2906,
    imgH: 3322,
    rotate: -2.5,
    accent: "cream",
    fit: "cover",
  },
  {
    id: "ceramics-fu",
    title: 'Ceramics CNY "fu" symbol (sculpt)',
    image: "/play/ceramics-fu.jpeg",
    x: 170,
    y: 1620,
    w: 260,
    imgW: 3024,
    imgH: 3390,
    rotate: 4,
    accent: "peach",
    fit: "cover",
  },
  {
    id: "iphone-lightroom",
    title: "Shot on iphone 14 pro and edited",
    caption: "in Adobe lightroom",
    image: "/play/iphone-lightroom.jpeg",
    x: 1240,
    y: 760,
    w: 270,
    imgW: 1080,
    imgH: 1920,
    rotate: -1,
    accent: "pink",
    fit: "cover",
  },
];

export const playgroundItems: PlaygroundItem[] = rawPlaygroundItems.map((item) => {
  if (!item.image || item.image !== STAIR_WALL_MURAL_SRC) return item;

  return {
    ...item,
    ...stairWallMuralMeta,
    caption: undefined,
    id: item.id,
    x: item.x,
    y: item.y,
    rotate: item.rotate ?? -2,
  };
});

export function playgroundItemHeight(item: PlaygroundItem): number {
  if (item.clusterH) return item.clusterH;
  if (!item.imgW || !item.imgH) return item.w;
  return Math.round(item.w * (item.imgH / item.imgW));
}
