import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { BackLink } from "../snitch/BackLink";
import { CanvasEcosystem } from "./CanvasEcosystem";
import { CanvasMvpIntegrationDiagram } from "./CanvasMvpIntegrationDiagram";
import { CanvasNextSteps } from "./CanvasNextSteps";
import { CanvasExternalCalendarSyncShowcase } from "./CanvasExternalCalendarSyncShowcase";
import { CanvasSolutionCalendarTodoShowcase } from "./CanvasSolutionCalendarTodoShowcase";
import { CanvasSolutionShowcase } from "./CanvasSolutionShowcase";
import { CanvasSolutionSteps } from "./CanvasSolutionSteps";
import { CanvasStatsStrip } from "./CanvasStatsStrip";
import styles from "../snitch/snitch.module.css";
import cx from "./canvas.module.css";

export const metadata: Metadata = {
  title: "Canvas Integration — Restructuring an LMS | Cynthia Chan",
  description:
    "A hackathon case study: restructuring Canvas to reduce friction in everyday student workflows through clearer navigation, a merged calendar, and external calendar sync.",
};

const META = [
  { label: "Timeline", values: ["1 week", "2025"] },
  { label: "Role", values: ["Product Designer", "PM"] },
  { label: "Team", values: ["2 Designers", "2 PMs"] },
  { label: "Tools", values: ["Figma", "After Effects"] },
];

const STATS = [
  {
    value: 72,
    suffix: "%",
    label:
      "of students struggled to manage assignments across the dashboard, to-do list, and calendar.",
  },
  {
    value: 5,
    suffix: "+ min",
    label: "spent per task just toggling between separate pages.",
  },
  {
    value: 3,
    suffix: " / 4",
    label: "participants wanted shortcut access to key landing pages.",
  },
];

const SOLUTION_STEPS = [
  {
    step: "01",
    title: "Course navigation",
    body: "Improved color consistency and visual hierarchy across course navigation, with a dropdown that shortcuts students straight to the page they need.",
  },
  {
    step: "02",
    title: "Calendar + to-do, merged",
    body: "Two overlapping features collapsed into one streamlined view, so assignment details live right inside the calendar instead of buried in each course.",
  },
  {
    step: "03",
    title: "External calendar sync",
    body: "Academic and personal schedules centralized into a single interface by syncing with Google, Apple, and Outlook calendars.",
  },
];

export default function CanvasCaseStudy() {
  return (
    <div className="pageShell">
      <ScrollProgress />
      <SiteNav glass />
      <BackLink />
      <div className="pageContent">
        <main className={styles.study}>
          <Reveal>
            <figure className={`${styles.heroFigure} ${cx.heroFigure}`}>
              <Image
                src="/projects/canvas/hero-artwork-v2.png"
                alt="Laptop mockup of the redesigned Canvas course interface"
                width={1920}
                height={1080}
                priority
                className={styles.heroMedia}
              />
            </figure>
          </Reveal>

          <div className={styles.heroRow} id="tldr">
            <header className={styles.hero}>
              <Reveal delay={60}>
                <h1 className={`${styles.title} ${cx.heroTitle}`}>
                  <span className={cx.heroTitleLine}>Canvas</span>
                  <span className={cx.heroTitleLine}>Intergration</span>
                </h1>
              </Reveal>
              <Reveal delay={120} className={styles.heroTags}>
                <span className={styles.heroTag}>App Design</span>
                <span className={styles.heroTag}>Hackathon</span>
              </Reveal>
            </header>

            <div className={styles.tldrCol}>
              <Reveal>
                <span className={styles.kicker}>TL;DR</span>
              </Reveal>
              <Reveal delay={80}>
                <p className={styles.statement}>
                  A redesign of Canvas that reduces friction in everyday student
                  workflows and creates a smoother, more intuitive experience.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className={styles.statementLead}>
                  Over a one-week hackathon, our team reimagined the learning
                  management system students rely on daily, focusing on making
                  it faster, simpler, and more reliable.
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

          {/* 01 — Background */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>Understanding the prompt</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                Our team had one week to take on this challenge at the Microsoft
                × WealthMeUp × BTG Hackathon:
              </p>
            </Reveal>
            <Reveal delay={140}>
              <blockquote className={styles.quote}>
                Propose innovative strategies that revitalize product growth and
                enhance digital efficiency.
              </blockquote>
            </Reveal>
          </section>

          {/* 02 — Product research */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>Why Canvas?</h2>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className={cx.whyCanvasExperience}>
                <div className={cx.whyCanvasVisual}>
                  <CanvasEcosystem />
                </div>
                <div className={cx.whyCanvasCopy}>
                  <p className={`${styles.sectionLead} ${cx.whyCanvasLead}`}>
                    Of all the platforms we explored, we focused on the one most
                    woven into our daily lives as students: Canvas by
                    Instructure. As one of the most widely used learning
                    management systems, Canvas supports over 7,000 institutions
                    worldwide, including Carnegie Mellon University. Since
                    students use it every day to check grades, submit
                    assignments, and reach professors, it was the perfect chance
                    to reimagine a platform we personally rely on.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 03 — User journey */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>
                  How does each user engage with Canvas?
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We mapped the key user groups of Canvas and explored how each
                one interacts with the platform, trying to understand the experience
                from every perspective making any changes.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <figure className={`${styles.figureWide} ${cx.journeyMapFigure}`}>
                <div className={cx.journeyMapFrame}>
                  <Image
                    src="/projects/canvas/user-journeys.png"
                    alt="User journey map across student, teacher, and administration roles"
                    width={2047}
                    height={1953}
                    unoptimized
                    className={cx.journeyMapImg}
                  />
                </div>
                <figcaption className={styles.caption}>
                  Journey mapping how students, teachers, and administrators
                  each move through Canvas.
                </figcaption>
              </figure>
            </Reveal>
          </section>

          {/* 04 — User interviews */}
          <section className={`${styles.section} ${styles.wideSection}`} id="research">
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>
                  Finding out what users actually need
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We ran think-aloud sessions and contextual interviews with CMU
                students to surface common patterns in how they navigate Canvas
                for coursework, assignments, and communication.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className={cx.centeredFlow}>
                <CanvasStatsStrip stats={STATS} />
              </div>
            </Reveal>
          </section>

          <div className={cx.centeredFlow}>
          {/* 05 — Competitive analysis */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>
                  Understanding more about learning management systems
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                To understand Canvas&apos;s strengths and weaknesses, we
                compared it against other leading platforms like Google
                Classroom and Blackboard Learn — and why so many institutions
                keep choosing it as their primary LMS.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <figure className={cx.competitiveFigure}>
                <div className={cx.competitiveFrame}>
                  <Image
                    src="/projects/canvas/competitive-table.png"
                    alt="Competitive analysis comparing Canvas, Google Classroom, and Blackboard Learn"
                    width={1302}
                    height={1066}
                    className={cx.competitiveImg}
                  />
                </div>
                <figcaption
                  className={`${styles.caption} ${cx.competitiveCaption}`}
                >
                  Comparing Canvas against Google Classroom and Blackboard
                  Learn across audience, pricing, and experience.
                </figcaption>
              </figure>
            </Reveal>
          </section>
          </div>

          {/* 06 — Solution (full study width for diagram showcase) */}
          <section className={`${styles.section} ${styles.wideSection}`} id="solution">
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>
                  Transforming Canvas in three steps
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                Three focused changes that let students stay organized and actually
                utilize Canva's existing features without relearning the platform.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <CanvasSolutionSteps
                leadStep={SOLUTION_STEPS[0]}
                leadContent={<CanvasSolutionShowcase />}
                steps={[
                  {
                    ...SOLUTION_STEPS[1],
                    showcase: <CanvasSolutionCalendarTodoShowcase />,
                  },
                  {
                    ...SOLUTION_STEPS[2],
                    showcase: <CanvasExternalCalendarSyncShowcase />,
                  },
                ]}
              />
            </Reveal>
          </section>

          <div className={cx.centeredFlow}>
          {/* 07 — MVP */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>07</span>
                <h2 className={styles.sectionTitle}>
                  Integrating an MVP into our solution
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We began with a stripped-down LMS to validate core needs:
                assignments, grading, and tool integrations. The goal was to
                confirm student and instructor workflows before investing in
                full-scale UX improvements.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <CanvasMvpIntegrationDiagram />
            </Reveal>
          </section>

          {/* 08 — Reflection */}
          <section className={styles.section}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>08</span>
                <h2 className={styles.sectionTitle}>
                  Main takeaways and next steps
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                This hackathon gave me real insight into the end-to-end product
                process, and sharing our final solution was a highlight. I loved
                getting to bring together both my business background and my
                design skills. With more time, these are the directions
                we&apos;d build toward.
              </p>
            </Reveal>

            <CanvasNextSteps />
          </section>

          <Reveal>
            <CaseStudyNav slug="canvas-integration" />
          </Reveal>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
