export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  comingSoon?: boolean;
  accent: "purple" | "peach" | "pink" | "ink";
};

export const featuredProjects: Project[] = [
  {
    slug: "pgh-childrens-museum",
    title: "PGH Children's Museum",
    description:
      "Reimagining the Pittsburgh Children's Museum website to better serve its audience.",
    tags: ["Case Study", "User Research"],
    accent: "peach",
  },
  {
    slug: "snitch",
    title: "Snitch",
    description:
      "Agentic AI product for accountability in self-scheduled work.",
    tags: ["Agentic AI", "Hackathon"],
    accent: "purple",
  },
  {
    slug: "canvas-integration",
    title: "Canvas Integration",
    description:
      "Canvas restructured to reduce friction in everyday student workflows.",
    tags: ["App Design", "Hackathon"],
    accent: "pink",
  },
  {
    slug: "plus-rebrand",
    title: "PLUS Rebrand",
    description:
      "Refocusing the platform with interactivity and inclusive storytelling for investors and school sponsorships.",
    tags: ["Research", "Product Strategy"],
    comingSoon: true,
    accent: "ink",
  },
  {
    slug: "punchcard",
    title: "PunchCard",
    description:
      "A digital punchcard concept helping small businesses grow repeat customers through loyalty and discovery.",
    tags: ["Product Design", "Dashboard"],
    comingSoon: true,
    accent: "purple",
  },
];
