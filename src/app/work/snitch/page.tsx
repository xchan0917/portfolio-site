import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import styles from "./snitch.module.css";

export const metadata: Metadata = {
  title: "Snitch — Agentic AI for Accountability | Cynthia Chan",
  description:
    "A NovaHacks case study: designing an agentic AI that proactively helps people follow through on the commitments they've already made.",
};

const META = [
  { label: "Role", value: "Product Designer · PM" },
  { label: "Team", value: "2 Designers · 2 Developers" },
  { label: "Stack", value: "Figma · SwiftUI" },
  { label: "Timeline", value: "7 hours · NovaHacks 2025" },
];

const GAPS = [
  {
    title: "AI is reactive, not proactive",
    body: "Most AI productivity tools help generate plans faster, but wait for user input. Few step in at the right moment to guide action or keep people on track in real time.",
  },
  {
    title: "Reminders lack context",
    body: "Static reminders are easy to dismiss. They don't adapt to shifting schedules or repeated delays, so they lose their power exactly when someone falls behind.",
  },
  {
    title: "Planning ≠ follow-through",
    body: "Calendars and to-do lists are great for organizing tasks, but stop once the plan is made. Execution is left entirely to the user — and important work slips.",
  },
];

const MODES = [
  {
    tag: "Solo",
    title: "Self accountability",
    body: "An AI agent initiates iMessage check-ins and requests real-time proof aligned with the user's calendar.",
    chosen: true,
  },
  {
    tag: "Buddy",
    title: "Social accountability",
    body: "Daily rotating buddy pairings encourage lightweight, mutual check-ins and conversation.",
    chosen: true,
  },
  {
    tag: "Pot",
    title: "Financial accountability",
    body: "Optional monetary stakes as a secondary motivator — reinforcement without relying on punishment.",
    chosen: false,
  },
];

const SOLUTION_STEPS = [
  {
    step: "01",
    title: "Set the commitment",
    body: "The agent reads the user's calendar to understand what they've already planned and when it matters.",
  },
  {
    step: "02",
    title: "Proactive check-in",
    body: "At the right moment, Snitch reaches out over iMessage — meeting users inside a channel they already live in.",
  },
  {
    step: "03",
    title: "Real-time proof",
    body: "Users respond with quick proof of progress, turning a passive reminder into an active, accountable moment.",
  },
  {
    step: "04",
    title: "Stay on track",
    body: "Rotating buddies and optional stakes layer in social and financial nudges to keep momentum going.",
  },
];

export default function SnitchCaseStudy() {
  return (
    <div className="pageShell">
      <ScrollProgress />
      <SiteNav glass />
      <div className="pageContent">
        <main className={styles.study}>
          <header className={styles.hero}>
            <Reveal>
              <Link href="/#projects" className={styles.back}>
                ← All projects
              </Link>
            </Reveal>
            <Reveal delay={60}>
              <p className={styles.eyebrow}>Agentic AI · Hackathon</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className={styles.title}>Snitch</h1>
            </Reveal>
            <Reveal delay={180}>
              <p className={styles.lead}>
                Agentic AI for accountability in self-scheduled work — an agent
                that actively helps people follow through on the commitments
                they&apos;ve already made.
              </p>
            </Reveal>

            <Reveal delay={240} className={styles.metaGrid}>
              {META.map((m) => (
                <div key={m.label} className={styles.metaItem}>
                  <span className={styles.metaLabel}>{m.label}</span>
                  <span className={styles.metaValue}>{m.value}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={300}>
              <a href="#solution" className={styles.jump}>
                Jump to solution ↓
              </a>
            </Reveal>
          </header>

          <Reveal>
            <figure className={styles.heroFigure}>
              <Image
                src="/projects/snitch.gif"
                alt="Snitch product walkthrough"
                width={1000}
                height={750}
                unoptimized
                className={styles.heroMedia}
              />
            </figure>
          </Reveal>

          <Reveal>
            <section className={styles.tldr}>
              <span className={styles.tldrTag}>TL;DR</span>
              <p className={styles.tldrText}>
                Snitch is an agentic AI that turns plans into follow-through. It
                reads your calendar, checks in over iMessage at the moment that
                matters, and asks for real-time proof — pairing self, social,
                and optional financial accountability into one proactive system.
              </p>
            </section>
          </Reveal>

          {/* 01 — Background */}
          <section className={styles.section}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>Approaching the prompt</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.prose}>
                <p>
                  The challenge was to design a product powered by agentic AI,
                  with real-world integrations. Our team read this as an
                  invitation to explore agency in everyday productivity, and
                  anchored on one question:
                </p>
                <blockquote className={styles.quote}>
                  What would it look like if an AI agent could actively help
                  users follow through on the commitments they already made?
                </blockquote>
              </div>
            </Reveal>
          </section>

          {/* 02 — Research */}
          <section className={styles.section}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>
                  Why accountability breaks down
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                On a tight timeline, we audited the productivity tools we use
                every day and found three recurring gaps.
              </p>
            </Reveal>
            <div className={styles.cardGrid}>
              {GAPS.map((gap, i) => (
                <Reveal key={gap.title} delay={i * 90}>
                  <div className={styles.gapCard}>
                    <span className={styles.gapNum}>0{i + 1}</span>
                    <h3 className={styles.gapTitle}>{gap.title}</h3>
                    <p className={styles.gapBody}>{gap.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 03 — Ideation */}
          <section className={styles.section}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>
                  Three modes of accountability
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We whiteboarded how agentic AI could support accountability
                beyond simple reminders, landing on three distinct modes of
                pressure.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <figure className={styles.figure}>
                <Image
                  src="/projects/snitch/whiteboard-modes.png"
                  alt="Whiteboard exploring three accountability modes: solo, buddy, and pot"
                  width={1198}
                  height={1390}
                  unoptimized
                  className={styles.figureImg}
                />
                <figcaption className={styles.caption}>
                  Whiteboarding the three accountability modes and the core
                  feature set.
                </figcaption>
              </figure>
            </Reveal>

            <div className={styles.modeGrid}>
              {MODES.map((mode, i) => (
                <Reveal key={mode.tag} delay={i * 90}>
                  <div
                    className={`${styles.modeCard} ${mode.chosen ? styles.modeChosen : ""}`}
                  >
                    <span className={styles.modeTag}>{mode.tag}</span>
                    <h3 className={styles.modeTitle}>{mode.title}</h3>
                    <p className={styles.modeBody}>{mode.body}</p>
                    <span className={styles.modeFlag}>
                      {mode.chosen ? "Built end-to-end" : "Kept secondary"}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 04 — Design decisions */}
          <section className={styles.section}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>
                  From sketches to a system
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We sketched the navigation order and low-fi screens to test how
                the iMessage agent could work alongside the core app — fast
                enough to build inside the hackathon window.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <figure className={styles.figureWide}>
                <Image
                  src="/projects/snitch/sketch-nav.png"
                  alt="Hand-drawn sketch of the app's navigation order"
                  width={1484}
                  height={536}
                  unoptimized
                  className={styles.figureImg}
                />
                <figcaption className={styles.caption}>
                  Mapping the navigation order: community, buddy, pot, and
                  account flows.
                </figcaption>
              </figure>
            </Reveal>

            <div className={styles.sketchPair}>
              <Reveal>
                <figure className={styles.figure}>
                  <Image
                    src="/projects/snitch/sketch-buddy.png"
                    alt="Low-fidelity sketch of the buddy screen"
                    width={908}
                    height={1640}
                    unoptimized
                    className={styles.figureImg}
                  />
                  <figcaption className={styles.caption}>
                    Buddy pairing with streaks and lightweight messaging.
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={120}>
                <figure className={styles.figure}>
                  <Image
                    src="/projects/snitch/sketch-wallet.png"
                    alt="Low-fidelity sketch of the wallet and pot screen"
                    width={928}
                    height={1644}
                    unoptimized
                    className={styles.figureImg}
                  />
                  <figcaption className={styles.caption}>
                    Optional stakes — a pot users only see if they opt in.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </section>

          {/* 05 — Solution */}
          <section className={styles.section} id="solution">
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>The solution</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                An agent that meets people inside iMessage, aligned to their
                real calendar — turning a passive reminder into an accountable
                moment.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <figure className={styles.heroFigure}>
                <Image
                  src="/projects/snitch.gif"
                  alt="Snitch iMessage check-in flow"
                  width={1000}
                  height={750}
                  unoptimized
                  className={styles.heroMedia}
                />
              </figure>
            </Reveal>

            <div className={styles.stepGrid}>
              {SOLUTION_STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 80}>
                  <div className={styles.stepCard}>
                    <span className={styles.stepNum}>{s.step}</span>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 06 — Reflection */}
          <section className={styles.section}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>Reflection</h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <figure className={styles.figureWide}>
                <Image
                  src="/projects/snitch/team-nova.png"
                  alt="The Snitch team presenting at NovaHacks 2025"
                  width={2220}
                  height={1264}
                  unoptimized
                  className={styles.figureImg}
                />
                <figcaption className={styles.caption}>
                  The team at NovaHacks 2025 — Snitch on screen.
                </figcaption>
              </figure>
            </Reveal>

            <div className={styles.reflectGrid}>
              <Reveal>
                <div className={styles.reflectCard}>
                  <h3 className={styles.reflectTitle}>Wearing multiple hats</h3>
                  <p className={styles.reflectBody}>
                    I stepped into both product designer and product manager
                    roles, working across UX and product direction. My business
                    background helped the team make quick tradeoffs and
                    articulate the idea clearly under time pressure.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className={styles.reflectCard}>
                  <h3 className={styles.reflectTitle}>What&apos;s next</h3>
                  <p className={styles.reflectBody}>
                    The hackathon limited how deeply we could explore certain
                    areas, but we strongly believe in the potential here. With
                    more time, we&apos;d revisit our constraints and bring this
                    concept fully to life.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Next project */}
          <Reveal>
            <Link href="/work/canvas-integration" className={styles.nextCard}>
              <span className={styles.nextLabel}>Up next</span>
              <span className={styles.nextTitle}>Canvas Integration</span>
              <span className={styles.nextDesc}>
                Canvas restructured to reduce friction in everyday student
                workflows →
              </span>
            </Link>
          </Reveal>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
