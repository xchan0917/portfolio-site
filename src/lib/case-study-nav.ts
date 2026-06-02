export type CaseStudyNavItem = {
  href: string;
  title: string;
  description: string;
};

export type CaseStudyNavLinks = {
  previous: CaseStudyNavItem;
  next: CaseStudyNavItem;
};

/** Prev/next links for published case studies (circular order). */
export const caseStudyNavBySlug: Record<string, CaseStudyNavLinks> = {
  "pgh-childrens-museum": {
    previous: {
      href: "/work/canvas-integration",
      title: "Canvas Integration",
      description:
        "Canvas restructured to reduce friction in everyday student workflows",
    },
    next: {
      href: "/work/snitch",
      title: "Snitch",
      description:
        "An agentic AI product for accountability\nin self scheduled work",
    },
  },
  snitch: {
    previous: {
      href: "/work/pgh-childrens-museum",
      title: "PGH Children's Museum",
      description:
        "Reimagining the Pittsburgh Children's Museum website to better serve its audience",
    },
    next: {
      href: "/work/canvas-integration",
      title: "Canvas Integration",
      description:
        "Canvas restructured to reduce friction in everyday student workflows",
    },
  },
  "canvas-integration": {
    previous: {
      href: "/work/snitch",
      title: "Snitch",
      description:
        "An agentic AI product for accountability\nin self scheduled work",
    },
    next: {
      href: "/work/pgh-childrens-museum",
      title: "PGH Children's Museum",
      description:
        "Reimagining the Pittsburgh Children's Museum website to better serve its audience",
    },
  },
};
