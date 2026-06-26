import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { BackLink } from "../snitch/BackLink";
import styles from "../snitch/snitch.module.css";
import monet from "./monet.module.css";
import {
  PrototypeShowcase,
  type PrototypeFeature,
} from "./PrototypeShowcase";
import { RefinementFocus } from "./RefinementFocus";

export const metadata: Metadata = {
  title: "Monet — Closet Remix App | Cynthia Chan",
  description:
    "An XHacks case study: designing Monet, an AI closet remix app that helps people style what they already own before buying anything new.",
};

const FASHION_STATS: {
  num: string;
  body: ReactNode;
  source: string;
}[] = [
  {
    num: "A",
    body: (
      <>
        <strong>10%</strong> of global carbon emissions come from the fashion
        industry. That&apos;s <strong>more</strong> than aviation and shipping
        combined.
      </>
    ),
    source: "UNEP, 2023 · UN Climate Change, 2018",
  },
  {
    num: "B",
    body: (
      <>
        The average times a garment is worn before disposal is{" "}
        <strong>~10x — down 36%</strong> since 2000, with production{" "}
        <strong>doubling</strong> in that same period.
      </>
    ),
    source: "Ellen MacArthur Foundation, 2017 · McKinsey & Company, 2016",
  },
  {
    num: "C",
    body: (
      <>
        <strong>92m tonnes</strong> of textile waste produced globally every year
        = <strong>one garbage truck every second</strong>
      </>
    ),
    source: "Global Fashion Agenda, Pulse Report, 2017",
  },
];

const META = [
  { label: "Timeline", values: ["3 days", "XHacks 2026"] },
  { label: "Role", values: ["Product Designer"] },
  { label: "Team", values: ["2 Designers", "2 Developers"] },
  { label: "Tools", values: ["Figma", "v0 dev"] },
];

const PAIN_POINTS = [
  {
    title: "Closets already feel full",
    quote: "I have too many clothes sitting in my closet.",
    body: "People own more than they wear, but those pieces stay invisible once they land on a hanger.",
  },
  {
    title: "Inspiration runs dry",
    quote: "I do not feel creative enough to pull it off.",
    body: "Most participants wanted novelty, but did not trust themselves to remix what they already had.",
  },
  {
    title: "Convenience still wins",
    quote: "Purchasing new clothes is very time consuming.",
    body: "Even when sustainability mattered, buying something new felt faster than styling from scratch.",
  },
];

const PAIN_CARD_TONES = [
  monet.painCardLavender,
  monet.painCardBlush,
  monet.painCardCream,
] as const;

const COMPETITORS = [
  {
    name: "Stylebook",
    tag: "Manual catalog",
    body: "Photo-based closet tracking without AI styling or upcycling guidance.",
    highlight: false,
  },
  {
    name: "Whering",
    tag: "Digital closet",
    body: "Strong outfit planning and social features, but less focus on DIY transformation.",
    highlight: false,
  },
  {
    name: "Cladwell",
    tag: "Capsule wardrobe",
    body: "Helps people buy less through minimalism, not by remixing pieces they already own.",
    highlight: false,
  },
  {
    name: "Monet",
    tag: "Our approach",
    body: "AI outfit generation, light alterations, and upcycling ideas built around clothes already in your closet.",
    highlight: true,
  },
];

const SOLUTION_STEPS = [
  {
    step: "01",
    title: "Styled",
    body: "AI pairs and layers existing items in ways you may never have thought of, creating new combinations with zero waste.",
  },
  {
    step: "02",
    title: "Remixed",
    body: "Try cropping, cinching, or rolling sleeves. Alterations are visualized before you commit to the scissors.",
  },
  {
    step: "03",
    title: "Transformed",
    body: "Go further with patchwork, lace trim, fringe, or embroidery so pieces become fully one-of-a-kind.",
  },
];

const LOADING_PAGE_VIDEO = "/projects/xhacks/loading.mov";

const SOLUTION_SCREENS = [
  {
    src: LOADING_PAGE_VIDEO,
    width: 533,
    height: 1155,
    alt: "Monet loading screen with logo and upcycling theme",
    kind: "video" as const,
  },
  {
    src: "/projects/xhacks/closet-showcase.mov",
    width: 776,
    height: 1574,
    alt: "Monet closet screen with library and uploaded items",
    kind: "video" as const,
  },
  {
    src: "/projects/xhacks/styling.mov",
    width: 753,
    height: 1555,
    alt: "Monet styling and transformation flow",
    kind: "video" as const,
  },
];

const SOLUTION_PILL_TONES = [
  monet.solutionPillLight,
  monet.solutionPillLavender,
  monet.solutionPillNeutral,
] as const;

const PROCESS_COLLAGE = [
  {
    src: "/projects/xhacks/process-team.png",
    width: 768,
    height: 1024,
    alt: "Team whiteboarding and sketching Monet concepts together",
    tile: monet.processTileTeam,
  },
  {
    src: "/projects/xhacks/process-sketch-tl.png",
    width: 768,
    height: 1024,
    alt: "Crazy 8s storyboard sketches exploring Monet user flows",
    tile: monet.processTileTl,
  },
  {
    src: "/projects/xhacks/process-sketch-tr.png",
    width: 768,
    height: 1024,
    alt: "Wireframe sketches for virtual closet and sharing features",
    tile: monet.processTileTr,
  },
  {
    src: "/projects/xhacks/process-sketch-bl.png",
    width: 768,
    height: 1024,
    alt: "Low-fidelity mobile wireframes for closet and upload flows",
    tile: monet.processTileBl,
  },
  {
    src: "/projects/xhacks/process-sketch-br.png",
    width: 768,
    height: 1024,
    alt: "Concept sketches for upcycling, marketplace, and weather styling",
    tile: monet.processTileBr,
  },
];

const PROTOTYPE_FEATURES: PrototypeFeature[] = [
  {
    id: "loading",
    num: "A",
    title: "Loading screen",
    body: "Introduces the brand and reinforces the app\u2019s upcycling mission through the logo, slogan, and \u201cre-\u201d focused visual design.",
    callouts: [
      "Incorporation of clothing rack in logo",
      "Personal slogan",
      "Emphasize Monet\u2019s mission",
    ],
    src: LOADING_PAGE_VIDEO,
    width: 533,
    height: 1155,
    alt: "Monet loading screen with logo and upcycling theme",
    kind: "video" as const,
  },
  {
    id: "upload",
    num: "B",
    title: "Upload photos",
    body: "Import or take photos of clothing to add to your closet. Don\u2019t want to upload? Select from our library of clothes you own or would like to explore.",
    callouts: [
      "Access to photo library and camera",
      "Pre-load clothing selection",
    ],
    src: "/projects/xhacks/upload-photo.mov",
    width: 779,
    height: 1548,
    alt: "Monet upload flow with camera access and clothing library",
    kind: "video" as const,
  },
  {
    id: "select",
    num: "C",
    title: "Article selections",
    body: "Access the freedom and creativity of choosing any clothes in your closet or our pre-loaded library to view the potential some of your clothes can have.",
    callouts: [
      "Pick clothes to style from your closet and our library",
      "Select as many articles as you choose to style",
    ],
    src: "/projects/xhacks/closet-showcase.mov",
    width: 776,
    height: 1574,
    alt: "Monet article selection screen with multi-select from closet",
    kind: "video" as const,
  },
  {
    id: "transformation",
    num: "D",
    title: "Transformation",
    body: "This is where the magic happens. Select models and closet items to describe the exact look. The creativity slider adjusts alterations, emphasizing the re-use at the heart of our brand.",
    callouts: [
      "Horizontal scroll to choose a model similar to your figure",
      "Option to make modifications to your clothing selections",
      "Input the kind of outcome you are looking for",
      "Slider to signify the level of embellishments performed",
    ],
    src: "/projects/xhacks/transformation.mov",
    width: 753,
    height: 1555,
    alt: "Monet transformation screen with model, vibe input, and creativity slider",
    kind: "video" as const,
  },
  {
    id: "generated",
    num: "E",
    title: "Generate outfits",
    body: "A look-book style outfit generator. Explore multiple options in a few taps, with additional recommendations believed to best suit your look.",
    callouts: [
      "Tap to enlarge the closet item chosen to be embellished",
      "Additional accessory and clothing recommendations to pair with look",
      "Explore variations of curated looks tailored to your preferences",
    ],
    src: "/projects/xhacks/generating.mov",
    width: 750,
    height: 1554,
    alt: "Monet generated outfits look-book with recommendations",
    kind: "video" as const,
  },
  {
    id: "save",
    num: "F",
    title: "Save outfits",
    body: "Bookmark favorite generated looks and save them to a personalized \u201cSaved Looks\u201d collection for future inspiration and easy access.",
    callouts: ["Tap to bookmark this look"],
    src: "/projects/xhacks/saved.mov",
    width: 759,
    height: 1557,
    alt: "Monet save flow bookmarking a look to Saved Looks",
    kind: "video" as const,
  },
];

const REFINEMENTS = [
  {
    label: "Default clothing library to lower onboarding friction",
    src: "/projects/xhacks/refinement-library.png",
    width: 534,
    height: 732,
    alt: "Monet onboarding screen with a default clothing library users can add to their closet",
  },
  {
    label:
      "Reduce discomfort around self-representation by using mannequins or fictional models",
    src: "/projects/xhacks/refinement-models.png",
    width: 528,
    height: 256,
    alt: "Monet model selection screen with mannequin options",
    wide: true,
  },
  {
    label:
      "Emphasize the upcycling theme through playful transformations that brighten everyday pieces",
    src: "/projects/xhacks/refinement-upcycling.png",
    width: 490,
    height: 654,
    alt: "Monet branding and upcycling screens highlighting re-wear and transformation",
  },
];

export default function XhacksCaseStudy() {
  return (
    <div className="pageShell">
      <ScrollProgress />
      <SiteNav glass />
      <BackLink />
      <div className="pageContent">
        <main className={styles.study}>
          <Reveal>
            <figure className={`${styles.heroFigure} ${monet.heroFigure}`}>
              <Image
                src="/projects/xhacks/monet-cover.png"
                alt="Monet closet remix app shown on two phones"
                width={1920}
                height={1080}
                priority
                className={`${styles.heroMedia} ${monet.heroCover}`}
              />
            </figure>
          </Reveal>

          <div className={`${styles.heroRow} ${monet.heroRow}`} id="tldr">
            <header className={styles.hero}>
              <Reveal delay={60}>
                <h1 className={`${styles.title} ${monet.heroTitle}`}>Monet</h1>
                <p className={monet.heroSubtitle}>
                  Remix your closet, your way
                </p>
              </Reveal>
              <Reveal delay={120} className={styles.heroTags}>
                <span className={styles.heroTag}>Product Design</span>
                <span className={styles.heroTag}>XHacks</span>
              </Reveal>
            </header>

            <div className={styles.tldrCol}>
              <Reveal>
                <span className={styles.kicker}>TL;DR</span>
              </Reveal>
              <Reveal delay={80}>
                <p className={styles.statement}>
                  Monet uses AI to generate outfit looks and upcycling ideas from
                  clothes people already own, so they can shop their own closet
                  before buying anything new.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className={styles.statementLead}>
                  Over three days at XHacks, our team designed a mobile
                  experience that turns sustainable fashion into something
                  playful and personal: novelty without always reaching for
                  another purchase.
                </p>
              </Reveal>
            </div>

            <div className={`${styles.metaRow} ${monet.heroMetaRow}`}>
              <Reveal delay={180} className={styles.metaGrid}>
                {META.map((m) => (
                  <div key={m.label} className={styles.metaItem}>
                    <span className={styles.metaLabel}>{m.label}</span>
                    <span className={styles.metaValue}>
                      {m.values.map((v) => (
                        <span key={v} className={styles.metaLine}>
                          {v}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={240}>
                <a href="#prototype" className={styles.jump}>
                  Jump to solution ↓
                </a>
              </Reveal>
            </div>
          </div>

          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>
                  Finding the right fit
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                XHacks asked us to brighten the mundane and turn everyday
                routines into playful, shared experiences. We kept coming back to
                something embedded in daily life that also carries a heavy
                environmental cost.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className={monet.focusBox}>
                <span className={monet.focusLabel}>Narrowing down on a focus</span>
                <p className={monet.focusQuote}>
                  What is something that is embedded in our daily life and is
                  simultaneously affecting our planet?
                </p>
              </div>
            </Reveal>
          </section>

          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>
                  Fashion is one of the world&apos;s largest industrial polluters
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                Fast fashion is not just a trend problem. Production keeps
                climbing while garments are worn fewer times before they are
                discarded.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className={monet.statsGrid}>
                {FASHION_STATS.map((stat, i) => (
                  <Reveal key={stat.num} delay={i * 80}>
                    <div className={monet.statCol}>
                      <span className={monet.statBadge}>{stat.num}</span>
                      <p className={monet.statBody}>{stat.body}</p>
                      <p className={monet.statSource}>{stat.source}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </section>

          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="research"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>
                  What 16 interviews surfaced
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We spoke with Gen Z and millennial participants who cared about
                personal style, convenience, and sustainability. Three pain
                points kept resurfacing.
              </p>
            </Reveal>
            <div className={monet.painGrid}>
              {PAIN_POINTS.map((point, i) => (
                <Reveal key={point.title} delay={i * 90}>
                  <article
                    className={`${monet.painCard} ${PAIN_CARD_TONES[i]}`}
                  >
                    <div className={monet.painCardHead}>
                      <span className={monet.painNum}>0{i + 1}</span>
                      <h3 className={monet.painTitle}>{point.title}</h3>
                    </div>
                    <blockquote className={monet.painQuote}>
                      &ldquo;{point.quote}&rdquo;
                    </blockquote>
                    <p className={monet.painInsight}>{point.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>
                  Where existing tools stop short
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We compared leading closet and styling apps to understand what
                was already solved and where a sustainable remix experience could
                differentiate.
              </p>
            </Reveal>
            <div className={monet.competitiveGrid}>
              {COMPETITORS.map((item, i) => (
                <Reveal
                  key={item.name}
                  delay={i * 70}
                  className={monet.competitiveReveal}
                >
                  <div
                    className={`${monet.competitiveCard} ${
                      item.highlight ? monet.competitiveCardHighlight : ""
                    }`}
                  >
                    <span className={monet.competitiveTag}>{item.tag}</span>
                    <h3 className={monet.competitiveName}>{item.name}</h3>
                    <p className={monet.competitiveBody}>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>
                  From insights to interactions
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                After interviews, we ran crazy 8s and surfaced 25 concepts
                before honing in on the overlapping ideas. Low-fi flows, style
                explorations, and team whiteboarding helped us reduce friction
                and strengthen the playful XHacks theme.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className={monet.processBoard}>
                {PROCESS_COLLAGE.map((item, i) => (
                  <Reveal
                    key={item.src}
                    delay={i * 70}
                    className={`${monet.processReveal} ${item.tile}`}
                  >
                    <figure className={monet.processTile}>
                      <div className={monet.processImgWrap}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          unoptimized
                          className={monet.processImg}
                        />
                      </div>
                    </figure>
                  </Reveal>
                ))}
              </div>
              <p className={styles.caption}>
                Sketches, wireframes, and in-person ideation sessions that
                shaped the final Monet flows.
              </p>
            </Reveal>
          </section>

          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="solution"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>
                  Novelty without always buying more
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={`${styles.sectionLead} ${styles.solutionLead}`}>
                Monet gives people a digital closet, AI-generated looks, and
                upcycling prompts so getting dressed feels fresh while extending
                the life of what they already own.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className={monet.solutionPhones}>
                {SOLUTION_SCREENS.map((screen) => (
                  <figure key={screen.src} className={monet.solutionPhone}>
                    {screen.kind === "video" ? (
                      <video
                        key={screen.src}
                        src={screen.src}
                        aria-label={screen.alt}
                        width={screen.width}
                        height={screen.height}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={monet.solutionPhoneImg}
                      />
                    ) : (
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={screen.width}
                        height={screen.height}
                        unoptimized
                        className={monet.solutionPhoneImg}
                      />
                    )}
                  </figure>
                ))}
              </div>
            </Reveal>
            <div className={monet.solutionFeatures}>
              {SOLUTION_STEPS.map((step, i) => (
                <Reveal key={step.title} delay={160 + i * 80}>
                  <div className={monet.solutionFeatureRow}>
                    <div
                      className={`${monet.solutionPill} ${SOLUTION_PILL_TONES[i]}`}
                    >
                      {step.title}
                    </div>
                    <p className={monet.solutionFeatureBody}>{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>07</span>
                <h2 className={styles.sectionTitle}>
                  Features we chose to focus on
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                After ideation, we decided to focus on specific design choices
                we believed would shape the overall experience most. They may be
                small on their own, but together they make Monet easier to start
                using, more comfortable to see yourself in, and grounded in
                sustainability as a core product goal.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <RefinementFocus items={REFINEMENTS} />
            </Reveal>
          </section>

          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="prototype"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>08</span>
                <h2 className={styles.sectionTitle}>Prototype showcase</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                A walkthrough of the hi-fi prototype we built during XHacks,
                from the loading screen through closet setup, styling,
                transformation, and saved looks.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <PrototypeShowcase features={PROTOTYPE_FEATURES} />
            </Reveal>
          </section>

          <section
            className={styles.section}
            id="reflection"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>09</span>
                <h2 className={styles.sectionTitle}>Reflection</h2>
              </div>
            </Reveal>

            <div className={styles.reflectGrid}>
              <Reveal>
                <div
                  className={`${styles.reflectCard} ${monet.reflectCardResearch}`}
                >
                  <svg
                    className={monet.reflectSketchPeople}
                    viewBox="0 0 80 56"
                    fill="none"
                    aria-hidden
                  >
                    <circle
                      cx="22"
                      cy="14"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    />
                    <path
                      d="M 14 24 C 16 22, 20 21, 22 21 C 26 21, 28 23, 30 26 L 30 42"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="58"
                      cy="14"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    />
                    <path
                      d="M 50 24 C 52 22, 56 21, 58 21 C 62 21, 64 23, 66 26 L 66 42"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 34 18 C 37 15, 40 14, 40 14 C 40 14, 43 15, 46 18"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 36 24 C 39 22, 41 22, 44 24"
                      stroke="currentColor"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className={styles.reflectTitle}>Grounded in interviews</h3>
                  <p className={styles.reflectBody}>
                    At the start of XHacks, interviews felt like a risk because
                    we only had three days. But making time for them changed the
                    project. We learned that people did not just want to buy less.
                    They wanted their own clothes to feel new again, but they
                    needed help seeing those possibilities.
                  </p>
                  <p className={styles.reflectBody}>
                    That insight shifted Monet from a sustainability idea into a
                    behavior-focused product. It was not about telling people to
                    consume less. It was about making reuse feel easier, more
                    creative, and more personal.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div
                  className={`${styles.reflectCard} ${monet.reflectCardForward}`}
                >
                  <svg
                    className={monet.reflectSketchSprout}
                    viewBox="0 0 64 72"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M 10 58 L 54 58"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 32 58 C 32 58 34 38 32 22"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 32 26 C 24 20 16 24 20 32"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 32 26 C 40 20 48 24 44 32"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 28 18 C 30 15 34 15 36 18"
                      stroke="currentColor"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className={styles.reflectTitle}>Just getting started</h3>
                  <p className={styles.reflectBody}>
                    This sprint reminded me that product design is often about
                    finding the clearest tension and building around it. We did
                    not have time to make everything perfect, so every feature
                    had to serve a purpose.
                  </p>
                  <p className={styles.reflectBody}>
                    By the end, the demo gave people something they could
                    understand and imagine using. That made the project feel less
                    like a hackathon concept and more like the birth of a real
                    product.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <Reveal>
            <CaseStudyNav slug="xhacks" />
          </Reveal>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
