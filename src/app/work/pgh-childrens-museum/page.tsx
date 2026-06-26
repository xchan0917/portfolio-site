import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { BackLink } from "../snitch/BackLink";
import { AffinityGallery } from "./AffinityGallery";
import { WireframePair } from "./WireframePair";
import { FindingsExplorer } from "./FindingsExplorer";
import { PersonaCarousel } from "./PersonaCarousel";
import { SitemapFlow } from "./SitemapFlow";
import { HifiPrototypeBoard } from "./HifiPrototypeBoard";
import { BrandGuidelines } from "./BrandGuidelines";
import { ReflectionLearnings } from "./ReflectionLearnings";
import styles from "../snitch/snitch.module.css";
import pgh from "./pgh.module.css";

export const metadata: Metadata = {
  title: "Pittsburgh Children's Museum — Website Redesign | Cynthia Chan",
  description:
    "A 4-week case study redesigning the Pittsburgh Children's Museum website — restructuring navigation and information architecture so any visitor can quickly find what they need.",
};

const META = [
  { label: "Timeline", values: ["4 weeks", "Spring 2025"] },
  { label: "Role", values: ["Web Designer"] },
  { label: "Team", values: ["4 UI/UX Designers"] },
  { label: "Tools", values: ["Figma", "Framer"] },
];

const PROCESS_PHASES = [
  {
    phase: "Empathize",
    items: ["User Personas", "Affinity Mapping"],
  },
  {
    phase: "Ideation",
    items: ["Sitemaps", "Content Model"],
  },
  {
    phase: "Design + Prototyping",
    items: ["Wireframes", "Lo → Hi-fi Prototyping", "Style Guidelines"],
  },
  {
    phase: "Feedback",
    items: ["Takeaways", "Reflection"],
  },
];

const PERSONA_SLIDES = [
  {
    title: "Planning Parent",
    src: "/projects/pgh/persona-planning-parent.png",
    width: 1548,
    height: 960,
    alt: "Planning Parent persona journey: before, during, and after a museum visit",
  },
  {
    title: "Engaged Educator",
    src: "/projects/pgh/persona-engaged-educator.png",
    width: 1520,
    height: 960,
    alt: "Engaged Educator persona journey across pre-visit, on-site, and post-visit",
  },
  {
    title: "Curious Kid",
    src: "/projects/pgh/persona-curious-kid.png",
    width: 1548,
    height: 960,
    alt: "Curious Kid persona journey across pre-visit, on-site, and post-visit",
  },
  {
    title: "Supporting Member",
    src: "/projects/pgh/persona-supporting-member.png",
    width: 1548,
    height: 960,
    alt: "Supporting Member persona journey across pre-visit, on-site, and post-visit",
  },
  {
    title: "New Parent in Area",
    src: "/projects/pgh/persona-new-parent.png",
    width: 1492,
    height: 960,
    alt: "New Parent in Area persona journey across pre-visit, on-site, and post-visit",
  },
];

const FINDING_THEMES = [
  {
    id: "ticketing",
    num: "01",
    title: "Making ticketing clear",
    body: "Visitors constantly looked for pricing, discounts, and group options during early planning. Ticket information needed to surface earlier in navigation instead of buried several layers deep.",
    impact:
      "We prioritized ticket pricing, group options, and visit planning in the global nav and homepage hierarchy.",
  },
  {
    id: "scanning",
    num: "02",
    title: "Supporting quick scanning",
    body: "People came for exhibits, floor plans, and what was on today. They wanted to scan the site quickly without clicking through multiple pages to piece together basic visit information.",
    impact:
      "We structured landing pages and labels so high-intent information could be understood at a glance.",
  },
  {
    id: "memberships",
    num: "03",
    title: "Highlighting memberships",
    body: "Users wanted easier access to member perks, renewal details, and shop information while they were still planning a visit, not only after they had already decided to come.",
    impact:
      "We added shortcut paths to membership benefits and shop content from key planning moments in the experience.",
  },
];

const AFFINITY_IMAGES = [
  {
    src: "/projects/pgh/affinity-1.png",
    width: 1306,
    height: 902,
    alt: "Affinity mapping session with sticky notes clustered on a whiteboard",
    caption: "Clustering interview insights into emerging themes.",
  },
  {
    src: "/projects/pgh/affinity-2.png",
    width: 2340,
    height: 1588,
    alt: "Grouped sticky notes organized into prioritized findings",
    caption: "Grouping patterns to decide what the redesign should solve first.",
  },
];

export default function PghCaseStudy() {
  return (
    <div className="pageShell">
      <ScrollProgress />
      <SiteNav glass />
      <BackLink />
      <div className="pageContent">
        <main className={styles.study}>
          <Reveal>
            <figure className={styles.heroFigure}>
              <Image
                src="/projects/pgh-childrens-museum.gif"
                alt="Animated preview of the redesigned Pittsburgh Children's Museum website"
                width={800}
                height={600}
                unoptimized
                priority
                className={`${styles.heroMedia} ${pgh.previewCrop}`}
              />
            </figure>
          </Reveal>

          <div className={styles.heroRow} id="tldr">
            <header className={styles.hero}>
              <Reveal delay={60}>
                <h1 className={`${styles.title} ${pgh.heroTitle}`}>
                  <span className={pgh.heroTitleLine}>Pittsburgh</span>
                  <span className={pgh.heroTitleLine}>
                    Children&apos;s Museum
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={120} className={styles.heroTags}>
                <span className={styles.heroTag}>Case Study</span>
                <span className={styles.heroTag}>User Research</span>
              </Reveal>
            </header>

            <div className={styles.tldrCol}>
              <Reveal>
                <span className={styles.kicker}>TL;DR</span>
              </Reveal>
              <Reveal delay={80}>
                <p className={styles.statement}>
                  A redesign of the Pittsburgh Children&apos;s Museum website tailored to different visitor types so
                 they can quickly find what they need.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className={styles.statementLead}>
                  Over four weeks with a team of four, we ran user research,
                  rebuilt the sitemap, and shipped a hi-fidelity prototype so
                  tickets, exhibits, and programs surfaced earlier in the
                  journey.
                </p>
              </Reveal>
            </div>
          </div>

          <div className={styles.metaRow}>
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
              <a href="#solution" className={styles.jump}>
                Jump to solution ↓
              </a>
            </Reveal>
          </div>

          {/* 01 — Discover */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>Understanding the problem</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                The existing website lacked clear navigation and a logical
                information structure, making it hard for different types of
                visitors to quickly find what they needed.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className={`${styles.sectionLead} ${pgh.roleStatement}`}>
                As a business student and designer of the team, I saw an opportunity not only to improve usability but also to align the site with the museum’s broader goals, which were increasing engagement and improving clarity around its offerings. 
              </p>
            </Reveal>
            <Reveal delay={140}>
              <blockquote className={`${styles.quote} ${pgh.sectionQuote}`}>
                The goal was to create a more structured, welcoming experience
                that made it easy for any visitor to explore, learn, and take
                action: whether that meant buying tickets, browsing exhibits, or
                finding educational programs.
              </blockquote>
            </Reveal>
            <Reveal delay={180}>
              <div className={pgh.processOutline}>
                <span className={pgh.processKicker}>Process outline</span>
                <div className={pgh.processTrack} aria-hidden>
                  {PROCESS_PHASES.map((_, i) => (
                    <span key={i} className={pgh.processNode} />
                  ))}
                </div>
                <div className={pgh.processGrid}>
                  {PROCESS_PHASES.map((col, i) => (
                    <div key={col.phase} className={pgh.processCol}>
                      <div className={pgh.processPhaseHead}>
                        <span className={pgh.processNum}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={pgh.processPhase}>{col.phase}</span>
                      </div>
                      <ul className={pgh.processItems}>
                        {col.items.map((item) => (
                          <li key={item} className={pgh.processItem}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* 02 — User Research */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>
                  Developing visitor archetypes
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We identified five key personas and tracked each archetype&apos;s
                path through the museum website experience. These maps helped us
                understand how different visitors, from families to educators to
                members, approached the site with different goals, levels of
                urgency, and information needs. The images show how we organized
                each archetype&apos;s motivations, pain points, and decision paths
                to better understand where the existing experience created
                friction.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <PersonaCarousel slides={PERSONA_SLIDES} />
            </Reveal>
          </section>

          {/* 03 — Affinity mapping */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>
                  Sorting through the findings
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We affinity-mapped everything we heard from interviews and
                think-aloud sessions, grouping observations until clear patterns
                emerged. That synthesis became the foundation for the redesign.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className={pgh.synthesisBlock}>
                <span className={pgh.synthesisLabel}>Affinity mapping</span>
                <p className={pgh.synthesisIntro}>
                  These boards capture how we moved from raw notes to organized
                  themes, comparing pain points across visitors before deciding
                  what to design for.
                </p>
                <AffinityGallery images={AFFINITY_IMAGES} />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <h3 className={pgh.themesHeading}>
                Three themes that shaped the redesign
              </h3>
            </Reveal>
            <Reveal delay={200}>
              <FindingsExplorer themes={FINDING_THEMES} />
            </Reveal>
          </section>

          {/* 04 — Ideation */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>
                  Constructing sitemaps and wireframes
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We sketched a content model and explored what the landing page
                could be, then wireframed on whiteboards as building digitally
                can feel limiting and make it harder to start fresh.
              </p>
            </Reveal>
            <div className={pgh.ideationFlow}>
              <Reveal delay={120}>
                <WireframePair />
              </Reveal>
              <SitemapFlow />
            </div>
          </section>

          {/* 05 — Designing & prototyping */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>Lo-fi to high-fi</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We transformed wireframes into high-fidelity prototypes, drawing
                inspiration from other museum sites while keeping a consistent
                structure. Building several homepage variations let us see which
                features belonged in the final design and how to blend styles
                together.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <HifiPrototypeBoard />
            </Reveal>
          </section>

          {/* 06 — Brand identity */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>Style guideline</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                A lightweight brand direction that feels playful and youthful
                through specific color and type choices.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <BrandGuidelines />
            </Reveal>
          </section>

          <div className={pgh.solutionReflectionCluster}>
            {/* 07 — Final prototype */}
            <section
              className={`${styles.section} ${pgh.solutionSection}`}
              id="solution"
            >
              <Reveal>
                <div className={styles.sectionHead}>
                  <span className={styles.sectionNum}>07</span>
                  <h2 className={styles.sectionTitle}>Design solution</h2>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <figure className={`${styles.figureWide} ${pgh.solutionFigure}`}>
                  <Image
                    src="/projects/pgh/solution.gif"
                    alt="Animated final design of the Pittsburgh Children's Museum website on a laptop"
                    width={720}
                    height={900}
                    unoptimized
                    className={`${styles.heroMedia} ${pgh.solutionGif}`}
                  />
                </figure>
              </Reveal>
            </section>

            {/* 08 — Reflection */}
            <section className={`${styles.section} ${pgh.reflectionSection}`}>
              <Reveal>
                <div className={styles.sectionHead}>
                  <span className={styles.sectionNum}>08</span>
                  <h2 className={styles.sectionTitle}>What I learned</h2>
                </div>
              </Reveal>
              <ReflectionLearnings />
            </section>
          </div>

          <Reveal>
            <CaseStudyNav slug="pgh-childrens-museum" />
          </Reveal>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
