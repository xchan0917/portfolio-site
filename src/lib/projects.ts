export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  comingSoon?: boolean;
  accent: "purple" | "peach" | "pink" | "ink";
  /** Static optimized poster shown before hover video loads. */
  coverPoster?: string;
  /** Legacy/animated still; prefer coverPoster for LCP. */
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
  coverScale?: number;
  coverScaleHover?: number;
  /** Optional static-poster framing; falls back to coverShift/coverScale. */
  coverPosterShift?: string;
  coverPosterShiftY?: string;
  coverPosterScale?: number;
};

export const featuredProjects: Project[] = [
  {
    slug: "snitch",
    title: "Snitch",
    description:
      "Agentic AI product for accountability in self-scheduled work.",
    tags: ["Agentic AI", "Hackathon"],
    accent: "purple",
    coverPoster: "/projects/snitch-poster.webp",
    cover: "/projects/snitch.gif",
    coverMp4: "/projects/snitch.mp4",
    coverStartAt: 1.5,
  },
  {
    slug: "besty-ai-message-queue",
    title: "Besty.AI Message Queue",
    description: "Unify incoming messages across multiple accounts.",
    tags: ["Product Design", "Messaging"],
    accent: "purple",
    coverPoster: "/projects/besty-ai-message-queue-poster-v5.webp",
    coverMp4: "/projects/besty-ai-message-queue.mp4",
    coverStartAt: 0,
    /* Hover clip framing */
    coverShift: "-1.5cm",
    coverShiftY: "0",
    coverScale: 1.25,
    coverScaleHover: 1.3,
    /* Full two-laptop hero (same art as case study), fitted to 4:3 */
    coverPosterShift: "0",
    coverPosterShiftY: "0",
    coverPosterScale: 1,
  },
  {
    slug: "xhacks",
    title: "Monet",
    description:
      "An AI closet remix app that turns what you already own into fresh outfits.",
    tags: ["Product Design", "XHacks"],
    accent: "peach",
    coverPoster: "/projects/xhacks-poster-v2.webp",
    cover: "/projects/xhacks.gif",
    coverMp4: "/projects/xhacks.mp4",
    coverStartAt: 1,
    /* Horizontal Monet cover — keep full two-phone frame */
    coverShift: "0",
    coverShiftY: "0",
    coverScale: 1.05,
    coverScaleHover: 1.08,
    coverPosterShift: "0",
    coverPosterShiftY: "0",
    coverPosterScale: 1,
  },
  {
    slug: "pgh-childrens-museum",
    title: "PGH Children's Museum",
    description:
      "Reimagining the Pittsburgh Children's Museum website to better serve its audience.",
    tags: ["Case Study", "User Research"],
    accent: "peach",
    coverPoster: "/projects/pgh-childrens-museum-poster.webp",
    cover: "/projects/pgh-childrens-museum.gif",
    coverMp4: "/projects/pgh-childrens-museum.mp4",
    coverStartAt: 1,
    coverShift: "-2.2cm",
    coverShiftY: "calc(0.5in - 2.5cm - 1in + 2cm + 0.5cm)",
    coverScale: 1.42,
    coverScaleHover: 1.47,
  },
  {
    slug: "canvas-integration",
    title: "Canvas Integration",
    description:
      "Canvas restructured to reduce friction in everyday student workflows.",
    tags: ["App Design", "Hackathon"],
    accent: "pink",
    coverPoster: "/projects/canvas-integration-poster-v3.webp",
    cover: "/projects/canvas-integration.gif",
    coverMp4: "/projects/canvas-integration.mp4",
    /* Match the All Courses laptop still used as the static poster. */
    coverStartAt: 0.65,
    /* +0.3 scale crops the jitter.video mark at the bottom-right. */
    coverShift: "-1.5cm",
    coverShiftY: "0",
    coverScale: 1.3,
    coverScaleHover: 1.35,
  },
  {
    slug: "plus-rebrand",
    title: "PLUS Rebrand",
    description:
      "Refocusing the platform with interactivity and inclusive storytelling for investors and school sponsorships.",
    tags: ["Research", "Product Strategy"],
    comingSoon: true,
    accent: "ink",
    coverPoster: "/projects/plus-rebrand-poster-v3.webp",
    cover: "/projects/plus-rebrand.gif",
    coverMp4: "/projects/plus-rebrand.mp4",
    /* Clip is 5s; static still is ~0.7s (the laptop hero frame). */
    coverStartAt: 0.7,
    /* +0.3 scale crops the bottom-right mark. */
    coverShift: "0",
    coverShiftY: "0",
    coverScale: 1.3,
    coverScaleHover: 1.35,
  },
  {
    slug: "punchcard",
    title: "PunchCard",
    description:
      "A digital punchcard concept helping small businesses grow repeat customers through loyalty and discovery.",
    tags: ["Product Design", "Dashboard"],
    comingSoon: true,
    accent: "purple",
    coverPoster: "/projects/punchcard-poster.webp",
    cover: "/projects/punchcard.gif",
    coverMp4: "/projects/punchcard.mp4",
    coverStartAt: 1,
    idleColor: "#e6ddd0",
  },
];
