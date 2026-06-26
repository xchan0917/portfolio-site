export const aboutHeroName = "I'm Cynthia!";

export const aboutHeroWelcome = [
  "Welcome to my corner of the internet!",
  "Take your time exploring, and thanks for being here!",
] as const;

export const aboutIntroChineseName = "鑫洁";

export const aboutIntro =
  "I'm Cynthia (鑫洁) Chan! I actually started college on a consulting track, which meant two years of learning to pull apart problems from a business and systems angle before I ever opened Figma. Then I found HCI and it just clicked. Now I design products that bring both of those things together.";

export const aboutPivot =
  "But I wasn't always into product design…";

export const aboutJumpLinks = [
  { label: "How did I get here?", href: "#journey" },
  { label: "What shapes me?", href: "#life" },
  { label: "What I bring to the table?", href: "#skills" },
] as const;

export const aboutJourney = [
  {
    year: "Freshman to Sophomore @ CMU",
    title: "Consulting track",
    body: "My first two years at Carnegie Mellon, I was all in on consulting. It helped me develop my skills in analytical thinking and learning to solve problems from a client-focused perspective.",
  },
  {
    year: "Discovery",
    title: "Exploring design for the first time",
    body: "I started peeking outside my major and chasing a minor. I signed up for design-oriented classes because I wanted to know what they actually felt like, and finally try something I never really got to explore growing up.",
  },
  {
    year: "The pivot",
    title: "Falling for design...",
    body: "Then I fell in love with interaction design. The classes hooked me, and so did how kind the professors were. I knew I wanted to design for real, and went for an additional major instead of stopping at a minor.",
  },
  {
    year: "Summer, Sophomore Year",
    title: "A financial services internship",
    body: "However, I still interned at a financial services company that summer but realized pretty fast it wasn't where my passion lived. By the end of it, I was fully committed to making the switch into design.",
  },
  {
    year: "Present",
    title: "Building toward design",
    body: "Now I'm studying Business + HCI at CMU, going deep on AI products and service design while building portfolio work and side projects that mix strategy with human-centered craft.",
  },
  {
    year: "Looking ahead",
    title: "What's next?",
    body: "I want to work on products where the design problems are genuinely hard and the people making them actually care about getting them right!",
  },
] as const;

export const aboutLifeSections = [
  {
    id: "pittsburgh",
    title: "Wanderer at heart",
    subtitle: "Pittsburgh parks and everywhere else",
    body: "My dream is to travel to every continent at least once and go backpacking someday. For now, I love exploring Pittsburgh where my school is located and meeting locals at the parks! It feels extremely rewarding to visit places other than home and learn about their history and culture.",
    images: [
      {
        src: "/about/travel-1.png",
        alt: "Trekking through Acadia National Park",
        caption: "Trekking through arcadia national park",
        orientation: "landscape",
        width: 1024,
        height: 768,
        displayScale: "small",
      },
      {
        src: "/about/travel-2.png",
        alt: "Camel riding in Dubai with my best friend",
        caption: "Camel riding in dubai with my bestfriend",
        orientation: "portrait",
        width: 769,
        height: 1024,
      },
      {
        src: "/about/travel-3.png",
        alt: "Wild monkey sightings in Costa Rica",
        caption: "Wild monkey sightings in costa rica",
        orientation: "portrait",
        width: 360,
        height: 480,
        displayScale: "large",
      },
    ],
  },
  {
    id: "nails",
    title: "Nail artist",
    subtitle: "Two-hour conversations (sometimes with strangers)",
    body: "Oh! I am also a nail artist :) I am the go-to nail person for most of the people in my year. This is definitely one of my favorite activities because I get to learn so much about my clients during our nail sesh!",
    images: [
      {
        src: "/about/nails-1.png",
        alt: "French fade almond nails with silver accents",
        caption: "soft french ombre with silver gems",
        orientation: "portrait",
        width: 768,
        height: 1024,
      },
      {
        src: "/about/nails-2.png",
        alt: "Hand-painted y2k coquette nail art",
        caption: "Y2k pastel coquette set",
        orientation: "portrait",
        width: 768,
        height: 1024,
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
        src: "/about/food-1.png",
        alt: "Giant pastrami sandwich",
        caption: "pastrami bigger than my head",
        orientation: "portrait",
        width: 768,
        height: 1024,
      },
      {
        src: "/about/food-2.png",
        alt: "Truffle fries at a restaurant",
        caption: "truffle fry tower moment",
        orientation: "portrait",
        width: 768,
        height: 1024,
      },
      {
        src: "/about/food-3.png",
        alt: "Omakase sashimi grid",
        caption: "omakase sashimi grid",
        orientation: "portrait",
        width: 768,
        height: 1024,
      },
      {
        src: "/about/food-4.png",
        alt: "Sashimi board with friends",
        caption: "feast courtesy of my sister",
        orientation: "portrait",
        width: 769,
        height: 1024,
      },
      {
        src: "/about/food.jpeg",
        alt: "Food and matcha finds",
        caption: "delectable matchas in sf",
        orientation: "portrait",
        width: 3024,
        height: 4032,
      },
    ],
  },
] as const;

export const aboutSkills = [
  {
    id: "product-design",
    title: "Product Design",
    body: "I like taking ideas from messy early problems all the way through to polished flows that are ready to ship.",
    fruit: "/about/fruits/watercolor/strawberry.png",
    fruitWidth: 163,
    fruitHeight: 257,
    fruitSize: "3.4rem",
    top: "20%",
    left: "calc(30% - 0.3in)",
    jumpDelay: 0.15,
    jumpDuration: 2.4,
  },
  {
    id: "ai-prototyping",
    title: "AI Prototyping",
    body: "I build quick prototypes with AI to test concepts and make emerging tech feel tangible and human.",
    fruit: "/about/fruits/watercolor/kiwi.svg",
    fruitWidth: 123,
    fruitHeight: 92,
    fruitSize: "3rem",
    top: "22%",
    left: "calc(54% + 0.8in)",
    jumpDelay: 0.9,
    jumpDuration: 3.1,
  },
  {
    id: "service-design",
    title: "Service Design",
    body: "I map how people, touchpoints, and systems connect so services feel seamless, even behind the scenes.",
    fruit: "/about/fruits/watercolor/blueberries.svg",
    fruitWidth: 216,
    fruitHeight: 200,
    fruitSize: "3rem",
    top: "38%",
    left: "calc(26% + 0.4in)",
    jumpDelay: 1.6,
    jumpDuration: 2.8,
  },
  {
    id: "strategic-thinking",
    title: "Strategic Thinking",
    body: "I connect what users need with what the business cares about, so teams know what to prioritize and why.",
    fruit: "/about/fruits/watercolor/pear.svg",
    fruitWidth: 73,
    fruitHeight: 86,
    fruitSize: "3.4rem",
    top: "calc(40% - 1cm)",
    left: "60%",
    jumpDelay: 0.45,
    jumpDuration: 3.4,
  },
  {
    id: "visual-design",
    title: "Visual Design",
    body: "I care about typography, color, and the little details that make an interface feel considered and expressive.",
    fruit: "/about/fruits/watercolor/grapes.svg",
    fruitWidth: 94,
    fruitHeight: 88,
    fruitSize: "3.1rem",
    top: "56%",
    left: "36%",
    jumpDelay: 2.1,
    jumpDuration: 2.6,
  },
  {
    id: "user-research",
    title: "User Research",
    body: "I talk to real people, run tests, and synthesize what I hear so design decisions come from evidence, not guesses.",
    fruit: "/about/fruits/watercolor/watermelon.svg",
    fruitWidth: 122,
    fruitHeight: 81,
    fruitSize: "3rem",
    top: "54%",
    left: "calc(64% + 0.3in)",
    jumpDelay: 1.2,
    jumpDuration: 3,
  },
  {
    id: "design-systems",
    title: "Design Systems",
    body: "I build component libraries and patterns that help products stay consistent as they grow.",
    fruit: "/about/fruits/watercolor/apple.png",
    fruitWidth: 194,
    fruitHeight: 262,
    fruitSize: "3.3rem",
    top: "70%",
    left: "48%",
    jumpDelay: 0.7,
    jumpDuration: 2.9,
  },
] as const;
