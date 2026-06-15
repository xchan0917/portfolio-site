export const aboutHeroName = "I'm Cynthia!";
export const aboutHeroSub = "Nice to meet you ☺";

export const aboutWelcome =
  "Welcome to my corner of the internet! Take your time exploring, and thanks for being here!";

export const aboutIntro =
  "I'm Cynthia (XinJie) Chan, an aspiring product designer focusing on AI products and service design. I excel in strategic thinking and understanding the transformation of ideas → products from all perspectives.";

export const aboutPivot =
  "But I wasn't always into product design…";

export const aboutOrigin =
  "My background started in consulting, where I developed skills in analytical thinking and learning to solve problems from a client-focused perspective. Over time, I realized what excited me most was not just solving problems, but shaping how solutions take form—visually, functionally, and experientially. That curiosity naturally led me to product design!";

export const aboutCurrently =
  "I'm a product designer based in NYC, currently studying Business + Human-Computer Interaction at Carnegie Mellon University. My multidisciplinary background helps me stay flexible and bring an unconventional perspective to my work.";

export const aboutJumpLinks = [
  { label: "How did I get here?", href: "#journey" },
  { label: "What shapes me?", href: "#life" },
  { label: "Snapshots from my life", href: "#gallery" },
  { label: "Any fun facts?", href: "#facts" },
] as const;

export const aboutExperience = [
  {
    org: "Carnegie Mellon University",
    role: "Business + Human-Computer Interaction",
    period: "Present",
  },
  {
    org: "Consulting",
    role: "Analytical thinking & client-focused problem solving",
    period: "Prior experience",
  },
  {
    org: "DoorDash AUI",
    role: "Product exploration — interface improvements",
    period: "Side project",
  },
  {
    org: "PGH Children's Museum",
    role: "UX / service design — museum digital experience",
    period: "Case study",
  },
  {
    org: "Canvas Integration",
    role: "Product design — LMS workflow improvements",
    period: "Case study",
  },
  {
    org: "Snitch",
    role: "Product design — campus safety app concept",
    period: "Case study",
  },
] as const;

export const aboutJourney = [
  {
    year: "Before CMU",
    title: "Consulting roots",
    body: "I started by solving problems from a client-focused lens — building analytical thinking habits that still ground how I design today.",
  },
  {
    year: "Discovery",
    title: "Finding product design",
    body: "What excited me most wasn't only the answer — it was shaping how solutions take form: visually, functionally, and experientially.",
  },
  {
    year: "2024–2025",
    title: "Studying Business + HCI",
    body: "At Carnegie Mellon, I began focusing on AI products and service design — connecting strategy, systems thinking, and human-centered craft.",
  },
  {
    year: "Present",
    title: "Designing for impact",
    body: "I'm building portfolio work across product explorations, museum UX, and AI-forward interfaces while refining my visual and interaction skills.",
  },
  {
    year: "Looking ahead",
    title: "What's next",
    body: "I'm excited to keep learning, growing, and deepening my practice as a designer — especially where AI meets thoughtful product experiences.",
  },
] as const;

export const aboutLifeSections = [
  {
    id: "pittsburgh",
    title: "Pittsburgh explorer",
    subtitle: "Pottery, parks, and new cities",
    body: "Outside of design, I love to explore Pittsburgh where my school is located. I enjoy taking pottery workshops and meeting locals at the parks! It feels extremely rewarding to visit places other than home and learn about their history and culture.",
    images: [
      {
        src: "/about/pittsburgh-1.jpeg",
        alt: "Cynthia exploring Pittsburgh",
        caption: "Exploring Pittsburgh",
      },
      {
        src: "/about/pittsburgh-2.jpeg",
        alt: "Pottery workshop moment in Pittsburgh",
        caption: "Pottery workshop day",
      },
    ],
  },
  {
    id: "nails",
    title: "Nail artist",
    subtitle: "Two-hour conversations, one set at a time",
    body: "Oh! I am also a nail artist :) I am the go-to nail person for most of the people in my year. This is definitely one of my favorite activities because I get to learn so much about the other person during our two-hour nail sessions!",
    images: [
      {
        src: "/about/nails.jpeg",
        alt: "Nail art by Cynthia",
        caption: "Nail art sessions with friends",
      },
    ],
  },
  {
    id: "food",
    title: "Food enthusiast",
    subtitle: "Beli-powered city adventures",
    body: "And I LOVE food. I am a huge Beli enthusiast. Catch me on the app at least twice a day either logging my new grub/matcha or finding the best reccs in a new city!!",
    images: [
      {
        src: "/about/food.jpeg",
        alt: "Food and matcha finds",
        caption: "Latest grub + matcha log",
      },
    ],
  },
] as const;

export const aboutGallery = [
  {
    src: "/about/hero-portrait.png",
    alt: "Portrait of Cynthia Chan",
    caption: "Hi, I'm Cynthia",
  },
  {
    src: "/about/hero-collage.png",
    alt: "Collage of Cynthia's interests and work",
    caption: "A little collage of me",
  },
  {
    src: "/about/pittsburgh-1.jpeg",
    alt: "Pittsburgh outing",
    caption: "Pittsburgh adventures",
  },
  {
    src: "/about/nails.jpeg",
    alt: "Nail art",
    caption: "Nail art night",
  },
  {
    src: "/about/food.jpeg",
    alt: "Food spread",
    caption: "Beli-approved bites",
  },
  {
    src: "/about/pittsburgh-2.jpeg",
    alt: "Pottery workshop",
    caption: "Clay day",
  },
] as const;

export const aboutFacts = [
  {
    title: "I'm the go-to nail person",
    body: "Most people in my year come to me for nail art — two-hour sessions are my favorite way to catch up.",
  },
  {
    title: "Beli is a daily ritual",
    body: "I'm on the app at least twice a day logging grub, matcha, or hunting for the best recs in a new city.",
  },
  {
    title: "Pottery workshops are my reset",
    body: "Throwing clay and exploring Pittsburgh parks keeps me grounded outside of screens and sprints.",
  },
  {
    title: "Consulting came before Figma",
    body: "I didn't grow up dreaming in wireframes — I found design after realizing I loved shaping how solutions take form.",
  },
] as const;

export const aboutSkills = [
  "Product Design",
  "UX / UI Design",
  "AI Prototyping",
  "Service Design",
  "Strategic Thinking",
  "Visual Design",
  "User Research",
  "Design Systems",
] as const;
