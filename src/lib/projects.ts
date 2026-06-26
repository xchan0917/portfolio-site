export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  comingSoon?: boolean;
  accent: "purple" | "peach" | "pink" | "ink";
  cover?: string;
  /** MP4 hover clip when available; gif-only projects omit this. */
  coverMp4?: string;
  /** Solid media placeholder before hover. Overrides the accent default. */
  idleColor?: string;
  /** Seconds to skip into the hover clip before playback starts. */
  coverStartAt?: number;
  /** Homepage cover translate overrides (e.g. "-0.8in"). */
  coverShift?: string;
  coverShiftY?: string;
};

export const featuredProjects: Project[] = [
  {
    slug: "snitch",
    title: "Snitch",
    description:
      "Agentic AI product for accountability in self-scheduled work.",
    tags: ["Agentic AI", "Hackathon"],
    accent: "purple",
    cover: "/projects/snitch.gif",
    coverMp4: "/projects/snitch.mp4",
    coverStartAt: 1,
  },
  {
    slug: "pgh-childrens-museum",
    title: "PGH Children's Museum",
    description:
      "Reimagining the Pittsburgh Children's Museum website to better serve its audience.",
    tags: ["Case Study", "User Research"],
    accent: "peach",
    cover: "/projects/pgh-childrens-museum.gif",
    coverMp4: "/projects/pgh-childrens-museum.mp4",
  },
  {
    slug: "canvas-integration",
    title: "Canvas Integration",
    description:
      "Canvas restructured to reduce friction in everyday student workflows.",
    tags: ["App Design", "Hackathon"],
    accent: "pink",
    cover: "/projects/canvas-integration.gif",
    coverMp4: "/projects/canvas-integration.mp4",
  },
  {
    slug: "xhacks",
    title: "Monet",
    description:
      "An AI closet remix app that turns what you already own into fresh outfits.",
    tags: ["Product Design", "XHacks"],
    accent: "peach",
    cover: "/projects/xhacks.gif",
    coverMp4: "/projects/xhacks.mp4",
    coverShift: "-0.6in",
    coverShiftY: "0.3in",
  },
  {
    slug: "plus-rebrand",
    title: "PLUS Rebrand",
    description:
      "Refocusing the platform with interactivity and inclusive storytelling for investors and school sponsorships.",
    tags: ["Research", "Product Strategy"],
    comingSoon: true,
    accent: "ink",
    cover: "/projects/plus-rebrand.gif",
    coverMp4: "/projects/plus-rebrand.mp4",
  },
  {
    slug: "punchcard",
    title: "PunchCard",
    description:
      "A digital punchcard concept helping small businesses grow repeat customers through loyalty and discovery.",
    tags: ["Product Design", "Dashboard"],
    comingSoon: true,
    accent: "purple",
    cover: "/projects/punchcard.gif",
    coverMp4: "/projects/punchcard.mp4",
    idleColor: "#e6ddd0",
  },
];
