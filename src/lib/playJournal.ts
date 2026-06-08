export type JournalAccent = "peach" | "pink" | "purple" | "cream";

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
  /** Back face for tap-to-flip cards (e.g. mural detail → full install). */
  flipSrc?: string;
  flipAlt?: string;
};

export type JournalPage = {
  id: string;
  title: string;
  subtitle?: string;
  accent: JournalAccent;
  kind: "cluster" | "grid" | "stack" | "showcase" | "feature";
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

export const journalPages: JournalPage[] = [
  {
    id: "tma",
    title: "TMA posters",
    subtitle: "Matcha + fruit sando pop-up graphics",
    accent: "purple",
    kind: "cluster",
    clusterW: 380,
    clusterH: 275,
    frames: [
      {
        src: playAsset("tma poster/matcha sando collab 1.png"),
        w: 260,
        imgW: 1080,
        imgH: 1080,
        x: 0,
        y: 14,
        rotate: -5,
        zIndex: 1,
      },
      {
        src: playAsset("tma poster/tma-menu-pricing.png"),
        w: 260,
        imgW: 1080,
        imgH: 1080,
        x: 108,
        y: 0,
        rotate: 4,
        zIndex: 2,
      },
    ],
  },
  {
    id: "doordash",
    title: "DoorDash AUI",
    subtitle: "Experimenting with Doordash's AUI improvement",
    accent: "pink",
    kind: "cluster",
    clusterW: 360,
    clusterH: 320,
    frames: [
      {
        src: playAsset("doordash/doordash-home.png"),
        w: 148,
        imgW: 199,
        imgH: 397,
        x: 0,
        y: 20,
        rotate: -5,
        zIndex: 1,
      },
      {
        src: playAsset("doordash/doordash-cart.png"),
        w: 146,
        imgW: 198,
        imgH: 394,
        x: 96,
        y: 0,
        rotate: 2.5,
        zIndex: 3,
      },
      {
        src: playAsset("doordash/doordash-cart-delete.png"),
        w: 150,
        imgW: 200,
        imgH: 398,
        x: 74,
        y: 100,
        rotate: -2,
        zIndex: 2,
      },
      {
        src: playAsset("doordash/doordash-order.png"),
        w: 150,
        imgW: 199,
        imgH: 397,
        x: 200,
        y: 10,
        rotate: 4,
        zIndex: 4,
      },
    ],
  },
  {
    id: "ceramics",
    title: "Ceramics",
    subtitle: "Thrown + sculpted pieces",
    accent: "cream",
    kind: "grid",
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
    subtitle: "CMU Booth!",
    accent: "peach",
    kind: "stack",
    items: [
      {
        src: playAsset("murals/stair-mural.jpeg"),
        alt: "Stair mural detail panels",
        caption: "Stair mural — acrylic + spray paint (with Lily K)",
        rotate: -1.5,
        flipSrc: playAsset("murals/stair-mural-complete.jpeg"),
        flipAlt: "Full British Invasion stair mural installation",
      },
      {
        src: playAsset("murals/stair-wall-mural.jpeg"),
        alt: "Stair wall mural",
        caption: "Stair wall mural — acrylic paint (with Lily K)",
        rotate: 2,
      },
    ],
  },
  {
    id: "wip",
    title: "WIP screens",
    subtitle: "ScottyLabs Punchcard + AI experiments",
    accent: "purple",
    kind: "showcase",
    items: [
      {
        src: playAsset("punchcard web.gif"),
        alt: "ScottyLabs Punchcard web mockup",
        caption: "ScottyLabs Punchcard Web — WIP",
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
    accent: "pink",
    kind: "grid",
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
];
