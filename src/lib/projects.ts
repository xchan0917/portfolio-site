export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  comingSoon?: boolean;
  accent: "purple" | "peach" | "pink" | "ink";
  cover?: string;
  /** Solid media placeholder before hover. Overrides the accent default. */
  idleColor?: string;
  /** Seconds to skip into the hover clip before playback starts. */
  coverStartAt?: number;
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
  },
  {
    slug: "canvas-integration",
    title: "Canvas Integration",
    description:
      "Canvas restructured to reduce friction in everyday student workflows.",
    tags: ["App Design", "Hackathon"],
    accent: "pink",
    cover: "/projects/canvas-integration.gif",
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
    idleColor: "#e6ddd0",
  },
];
