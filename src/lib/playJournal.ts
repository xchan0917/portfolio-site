export type JournalAccent = "peach" | "pink" | "purple" | "cream";

export type JournalDoodleType =
  | "arrow"
  | "star"
  | "spark"
  | "scribble"
  | "flower"
  | "sticker";

export type FlowerColor = "blue" | "pink" | "lightPurple";

export type JournalDoodle = {
  type: JournalDoodleType;
  top: string;
  left: string;
  width?: string;
  rotate?: number;
  variant?: "large" | "small";
  flowerColor?: FlowerColor;
  stickerSrc?: string;
};

export const flowerStickerSrc: Record<
  FlowerColor,
  Record<"large" | "small", string>
> = {
  blue: {
    large: "/play/decorations/flower-blue-large.png",
    small: "/play/decorations/flower-blue-small.png",
  },
  pink: {
    large: "/play/decorations/flower-pink-large.png",
    small: "/play/decorations/flower-pink-small.png",
  },
  lightPurple: {
    large: "/play/decorations/flower-light-purple-large.png",
    small: "/play/decorations/flower-light-purple-small.png",
  },
};

export function playSticker(name: string): string {
  return `/play/decorations/doodles/${name}.png`;
}

export type JournalClusterFrame = {
  src: string;
  w: number;
  imgW: number;
  imgH: number;
  x: number;
  y: number;
  rotate?: number;
  zIndex?: number;
};

export type JournalPolaroid = {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
  /** Scale media inside its frame (< 1 zooms out). */
  mediaScale?: number;
};

export type JournalPage = {
  id: string;
  title: string;
  subtitle?: string;
  /** Handwritten one-liner — journal voice, separate from factual captions. */
  journalNote?: string;
  accent: JournalAccent;
  kind: "cluster" | "grid" | "stack" | "showcase" | "feature" | "combine";
  doodles?: JournalDoodle[];
  /** Final image for combine pages (two sources mix into one). */
  revealSrc?: string;
  revealAlt?: string;
  /** Shared caption for combine pages. */
  caption?: string;
  /** Overlapping frames for cluster pages (e.g. DoorDash phones). */
  frames?: JournalClusterFrame[];
  clusterH?: number;
  clusterW?: number;
  /** Polaroid-style items for grid/stack layouts. */
  items?: JournalPolaroid[];
};

/** Encode folder paths that contain spaces for static assets under /play. */
export function playAsset(relativePath: string): string {
  return `/play/${relativePath.split("/").map(encodeURIComponent).join("/")}`;
}

export const journalIntro = "bits & pieces ♡";

/** Sticky-note fill per project cluster (collage strip). */
export const projectStickyColors: Record<string, string> = {
  doordash: "#A8D8EA",
  ceramics: "#F8B195",
  murals: "#F7B2C4",
  wip: "#C3B1E1",
  photography: "#FCE38A",
  tma: "#C8E06A",
};

export const projectStickyTilts: Record<string, number> = {
  doordash: -2.5,
  ceramics: 3,
  murals: -1.5,
  wip: 2,
  photography: -3,
  tma: 1.5,
};

/** Divider indices (1 = between pages 0–1) that get a decorative sticker. */
export const dividerDecorations: Record<number, string> = {};

export const journalPages: JournalPage[] = [
  {
    id: "ceramics",
    title: "Ceramics",
    subtitle: "Thrown + sculpted pieces",
    journalNote: "wheel work + a few sculpt pieces from the kiln.",
    accent: "cream",
    kind: "grid",
    doodles: [
      {
        type: "flower",
        variant: "large",
        flowerColor: "blue",
        top: "90%",
        left: "calc(3% - 2in)",
        rotate: -6,
        width: "52px",
      },
      {
        type: "flower",
        variant: "small",
        flowerColor: "pink",
        top: "78%",
        left: "calc(2% - 2in)",
        rotate: 8,
        width: "36px",
      },
      { type: "star", top: "6%", left: "90%", rotate: 0, width: "22px" },
      { type: "spark", top: "78%", left: "6%", rotate: -15, width: "20px" },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-12"),
        top: "14%",
        left: "6%",
        rotate: 6,
        width: "38px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-20"),
        top: "58%",
        left: "92%",
        rotate: -10,
        width: "40px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-24"),
        top: "86%",
        left: "88%",
        rotate: 14,
        width: "32px",
      },
    ],
    items: [
      {
        src: playAsset("ceramics/ceramics-plate.jpeg"),
        alt: "Ceramics 8 inch plate",
        caption: "8in plate (thrown)",
        rotate: -3,
      },
      {
        src: playAsset("ceramics/ceramics-cup.jpeg"),
        alt: "Ceramics cup",
        caption: '4.5in cup — Sea mist + Merlot',
        rotate: 4,
        objectFit: "cover",
        objectPosition: "center center",
        mediaScale: 0.9,
      },
      {
        src: playAsset("ceramics/ceramics-vessel.jpeg"),
        alt: "Ceramics vessel",
        caption: "9in vessel (thrown)",
        rotate: 2,
      },
      {
        src: playAsset("ceramics/ceramics-fu.jpeg"),
        alt: 'Ceramics fu symbol',
        caption: 'CNY "fu" symbol (sculpt)',
        rotate: -5,
      },
    ],
  },
  {
    id: "murals",
    title: "Murals",
    subtitle: "Stair and wall mural —\nacrylic + spray paint\n(with Lily K)",
    accent: "peach",
    kind: "combine",
    revealSrc: playAsset("murals/stair-mural-complete.jpeg"),
    revealAlt: "Full British Invasion stair mural installation",
    doodles: [
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-14"),
        top: "10%",
        left: "8%",
        rotate: -6,
        width: "36px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-17"),
        top: "72%",
        left: "6%",
        rotate: 10,
        width: "34px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-28"),
        top: "18%",
        left: "90%",
        rotate: -12,
        width: "30px",
      },
    ],
    items: [
      {
        src: playAsset("murals/stair-mural.png"),
        alt: "Stair mural detail panels",
        rotate: -1.5,
      },
      {
        src: playAsset("murals/stair-wall-mural.png"),
        alt: "Stair wall mural",
        rotate: 2,
      },
    ],
  },
  {
    id: "wip",
    title: "WIP screens",
    subtitle: "ScottyLabs Punchcard + AI experiments",
    journalNote: "click a screen to enlarge.",
    accent: "purple",
    kind: "showcase",
    doodles: [
      { type: "star", top: "88%", left: "10%", rotate: -8, width: "18px" },
      {
        type: "flower",
        variant: "large",
        flowerColor: "blue",
        top: "5%",
        left: "90%",
        rotate: -8,
        width: "52px",
      },
      {
        type: "flower",
        variant: "small",
        flowerColor: "pink",
        top: "17%",
        left: "93%",
        rotate: 6,
        width: "38px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-15"),
        top: "8%",
        left: "6%",
        rotate: 8,
        width: "34px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-19"),
        top: "72%",
        left: "88%",
        rotate: -14,
        width: "36px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-29"),
        top: "42%",
        left: "4%",
        rotate: 5,
        width: "28px",
      },
    ],
    items: [
      {
        src: playAsset("punchcard web.gif"),
        alt: "ScottyLabs Dashboard",
        caption: "ScottyLabs Dashboard",
      },
      {
        src: playAsset("Worktrip Autopilot.mp4"),
        alt: "Work trip autopilot screen recording",
        caption: "AI Agent Work Trip Autopilot",
      },
    ],
  },
  {
    id: "photography",
    title: "Through the lens",
    subtitle: "Shot on iPhone 14 Pro and edited in Lightroom.",
    journalNote: "hover to zoom!",
    accent: "pink",
    kind: "grid",
    doodles: [
      { type: "star", top: "4%", left: "4%", rotate: 8, width: "18px" },
      { type: "spark", top: "88%", left: "92%", rotate: -20, width: "16px" },
      {
        type: "flower",
        variant: "large",
        flowerColor: "pink",
        top: "4%",
        left: "92%",
        rotate: -5,
        width: "50px",
      },
      {
        type: "flower",
        variant: "small",
        flowerColor: "blue",
        top: "16%",
        left: "94%",
        rotate: 10,
        width: "34px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-16"),
        top: "52%",
        left: "92%",
        rotate: -8,
        width: "42px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-21"),
        top: "28%",
        left: "4%",
        rotate: 11,
        width: "34px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-25"),
        top: "90%",
        left: "78%",
        rotate: -6,
        width: "30px",
      },
    ],
    items: [
      {
        src: playAsset("photography/iphone-lightroom.jpeg"),
        alt: "Sunset over the water",
        caption: "PGH golden hour",
        rotate: 2,
      },
      {
        src: playAsset("photography/F90BB91F-9A20-4290-9B19-48E699F4F852_1_201_a.jpeg"),
        alt: "Snowy mountains at golden hour",
        caption: "Sunsets over the slopes",
        rotate: -4,
      },
      {
        src: playAsset("photography/FEF96BE6-A915-4B76-AF00-98962C2F1D6C_1_201_a.jpeg"),
        alt: "Couple watching sunset by the coast",
        caption: "romantic Carmel by the Sea",
        rotate: 3,
      },
    ],
  },
  {
    id: "doordash",
    title: "DoorDash AUI",
    subtitle: "Experimenting with Doordash's AUI improvement.",
    journalNote: "iPhone mocks — tap to spread the stack.",
    accent: "pink",
    kind: "cluster",
    clusterW: 621,
    clusterH: 667,
    doodles: [
      {
        type: "flower",
        variant: "large",
        flowerColor: "pink",
        top: "4%",
        left: "5%",
        rotate: 5,
        width: "48px",
      },
      {
        type: "flower",
        variant: "small",
        flowerColor: "lightPurple",
        top: "16%",
        left: "3%",
        rotate: -10,
        width: "34px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-11"),
        top: "68%",
        left: "7%",
        rotate: -8,
        width: "36px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-18"),
        top: "34%",
        left: "88%",
        rotate: 12,
        width: "34px",
      },
    ],
    frames: [
      {
        src: playAsset("doordash/doordash-home.png"),
        w: 251,
        imgW: 199,
        imgH: 397,
        x: 0,
        y: 28,
        rotate: -5,
        zIndex: 1,
      },
      {
        src: playAsset("doordash/doordash-cart.png"),
        w: 248,
        imgW: 198,
        imgH: 394,
        x: 163,
        y: 0,
        rotate: 2.5,
        zIndex: 3,
      },
      {
        src: playAsset("doordash/doordash-cart-delete.png"),
        w: 253,
        imgW: 200,
        imgH: 398,
        x: 124,
        y: 136,
        rotate: -2,
        zIndex: 2,
      },
      {
        src: playAsset("doordash/doordash-order.png"),
        w: 253,
        imgW: 199,
        imgH: 397,
        x: 338,
        y: 14,
        rotate: 4,
        zIndex: 4,
      },
    ],
  },
  {
    id: "tma",
    title: "TMA posters",
    subtitle: "Matcha + fruit sando pop up graphics for fundraising.",
    accent: "purple",
    kind: "cluster",
    clusterW: 560,
    clusterH: 400,
    doodles: [
      { type: "star", top: "10%", left: "6%", rotate: -12, width: "20px" },
      {
        type: "flower",
        variant: "large",
        flowerColor: "lightPurple",
        top: "42%",
        left: "3%",
        rotate: 4,
        width: "50px",
      },
      {
        type: "flower",
        variant: "small",
        flowerColor: "blue",
        top: "54%",
        left: "2%",
        rotate: -12,
        width: "34px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-22"),
        top: "8%",
        left: "88%",
        rotate: 7,
        width: "36px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-26"),
        top: "78%",
        left: "90%",
        rotate: -9,
        width: "32px",
      },
      {
        type: "sticker",
        stickerSrc: playSticker("doodle-30"),
        top: "62%",
        left: "6%",
        rotate: 12,
        width: "28px",
      },
    ],
    frames: [
      {
        src: playAsset("tma poster/matcha sando collab 1.png"),
        w: 370,
        imgW: 1080,
        imgH: 1080,
        x: 0,
        y: 14,
        rotate: -5,
        zIndex: 1,
      },
      {
        src: playAsset("tma poster/tma-menu-pricing.png"),
        w: 370,
        imgW: 1080,
        imgH: 1080,
        x: 156,
        y: 0,
        rotate: 4,
        zIndex: 2,
      },
    ],
  },
];
