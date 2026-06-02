import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { BackLink } from "./BackLink";
import { DemoVideo } from "./DemoVideo";
import { SolutionCarousel } from "./SolutionCarousel";
import styles from "./snitch.module.css";

export const metadata: Metadata = {
  title: "Snitch — Agentic AI for Accountability | Cynthia Chan",
  description:
    "A NovaHacks case study: designing an agentic AI that proactively helps people follow through on the commitments they've already made.",
};

const META = [
  { label: "Timeline", values: ["7 hours", "NovaHacks 2025"] },
  { label: "Role", values: ["Product Designer", "PM"] },
  { label: "Team", values: ["2 Designers", "2 Developers"] },
  { label: "Tools", values: ["Figma", "SwiftUI"] },
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

const QUESTIONS = [
  "What makes people abandon plans they set for themselves?",
  "   When is the right moment for an AI agent like Snitch to check in?",
  "       How can a nudge feel supportive instead of naggy?",
];

const SKETCHES = [
  {
    src: "/projects/snitch/sketch-buddy.png",
    width: 908,
    height: 1640,
    alt: "Hand-drawn sketch of the buddy screen with a rotating buddy and streak",
    title: "Social Accountability",
    body: "Daily rotating buddy pairings encourage lightweight, mutual check-ins and convos.",
  },
  {
    src: "/projects/snitch/sketch-self.png",
    width: 968,
    height: 1640,
    alt: "Hand-drawn sketch of the Snitch iMessage check-in conversation",
    title: "Self Accountability",
    body: "An AI agent initiates iMessage check-ins and requests real-time proof aligned with the user's calendar.",
  },
  {
    src: "/projects/snitch/sketch-wallet.png",
    width: 928,
    height: 1644,
    alt: "Hand-drawn sketch of the wallet screen with balance and transactions",
    title: "Financial Accountability",
    body: "Optional monetary stakes as a secondary form of motivation, without relying on punishment.",
  },
];


export default function SnitchCaseStudy() {
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
                src="/projects/snitch/hero-mockups.png"
                alt="Snitch app splash screens shown across multiple phones"
                width={1753}
                height={1524}
                priority
                className={styles.heroMedia}
              />
            </figure>
          </Reveal>

          <div className={styles.heroRow} id="tldr">
            <header className={styles.hero}>
              <Reveal delay={60}>
                <h1 className={styles.title}>Snitch</h1>
              </Reveal>
              <Reveal delay={120} className={styles.heroTags}>
                <span className={styles.heroTag}>Agentic AI</span>
                <span className={styles.heroTag}>Hackathon</span>
              </Reveal>
            </header>

            <div className={styles.tldrCol}>
              <Reveal>
                <span className={styles.kicker}>TL;DR</span>
              </Reveal>
              <Reveal delay={80}>
                <p className={styles.statement}>
                  Snitch is an agentic AI that turns plans into follow-through committments.
                  It reads your calendar, checks in over iMessage at the moment
                  that matters, and asks for real-time proof.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className={styles.statementLead}>
                  Over a 7-hour hackathon, I designed the end-to-end experience
                  for a proactive accountability agent — pairing self, social,
                  and optional financial accountability into one system that
                  fits into the apps people already use.
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
                <h2 className={styles.sectionTitle}>Approaching the prompt</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                The challenge was to design a product powered by agentic AI,
                with real-world integrations. Our team read this as an invitation
                to explore agency in everyday productivity, and anchored on one
                question.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <blockquote className={styles.quote}>
                What would it look like if there was an AI agent that can actively help people
                follow through on the commitments they already made?
              </blockquote>
            </Reveal>
          </section>

          {/* 02 — Research */}
          <section className={`${styles.section} ${styles.wideSection}`}>
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
                every day. Three gaps kept getting in the way of follow-through.
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

          {/* 03 — My role + approach */}
          <section className={`${styles.section} ${styles.wideSection}`} id="role">
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>My role</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={`${styles.statement} ${styles.roleStatement}`}>
                As product designer and PM, I shaped the experience that moves
                people from &ldquo;I&apos;ll get to it&rdquo; to done.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className={`${styles.sectionLead} ${styles.leadNoWrap}`}>
                I treated follow-through as a behavior problem, not a scheduling
                one, and kept asking,
              </p>
            </Reveal>
            <div className={styles.questionList}>
              {QUESTIONS.map((q, i) => (
                <Reveal key={q} delay={i * 90}>
                  <p className={styles.question}>{q}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 04 — Exploring agentic concepts */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>
                  Exploring agentic concepts
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                We whiteboarded directions for how agentic AI could support
                accountability beyond reminders, landing on three distinct modes
                of accountability. We focused on modes that were feasible to 
                prototype end-to-end and kept financial stakes secondary.
              </p>
            </Reveal>

            <div className={styles.whiteboardPair}>
              <Reveal>
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
                    Brainstorming the different modes of accountability to pitch.
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={120}>
                <figure className={styles.figure}>
                  <Image
                    src="/projects/snitch/sketch-nav.png"
                    alt="Whiteboard sketch of the app's navigation order"
                    width={1484}
                    height={536}
                    unoptimized
                    className={styles.figureImg}
                  />
                  <figcaption className={styles.caption}>
                    Sketching the navigation order of our app — community,
                    buddy, pot, and account flows.
                  </figcaption>
                </figure>
              </Reveal>
            </div>

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

          {/* 05 — Shaping the product */}
          <section className={`${styles.section} ${styles.wideSection}`}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>
                  Shaping the product and narrowing down our decisions
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                After exploring multiple accountability models, I sketched three
                possible directions the app could take, each focused on a
                different form of motivation and follow-through. With limited
                hackathon time, our team used these sketches to assess alignment
                with the agentic AI prompt and how the iMessage API could work
                alongside the core app experience.
              </p>
            </Reveal>

            <div className={styles.sketchGrid}>
              {SKETCHES.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <div className={styles.sketchCard}>
                    <div className={styles.sketchFrame}>
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={s.width}
                        height={s.height}
                        unoptimized
                        className={styles.sketchImg}
                      />
                    </div>
                    <h3 className={styles.sketchTitle}>{s.title}</h3>
                    <p className={styles.sketchBody}>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className={styles.note}>
                <p>
                  We ultimately focused on <strong>social accountability</strong>{" "}
                  and <strong>self accountability</strong>, as they best matched
                  the hackathon&apos;s agentic AI prompt and were feasible to
                  prototype end-to-end.
                </p>
                <p>
                  The external/financial accountability was really promising,
                  but due to time constraints, we kept it secondary rather than
                  fully building it out.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className={styles.archBlock}>
                <div className={styles.archIntro}>
                  <span className={styles.archTag}>Under the hood</span>
                  <p className={styles.archNote}>
                    On the development end, this diagram outlines the system
                    architecture we used to retrieve and coordinate the
                    necessary data.
                  </p>
                </div>
                <svg
                  className={styles.archDiagram}
                  viewBox="0 0 691 320"
                  role="img"
                  aria-label="Software architecture: Mastra orchestrates iOS, Loop M, OR, and Rube, which connects to Gmail and GCal."
                >
                  <defs>
                    <marker
                      id="archArrow"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path className={styles.archHead} d="M0 0 L10 5 L0 10 z" />
                    </marker>
                  </defs>

                  <rect
                    className={styles.archBox}
                    x="90"
                    y="12"
                    width="600"
                    height="296"
                    rx="18"
                  />
                  <text className={styles.archTitle} x="390" y="36">
                    Software Architecture
                  </text>

                  <line className={styles.archEdge} x1="360" y1="84" x2="360" y2="150" markerEnd="url(#archArrow)" />
                  <line className={styles.archEdge} x1="305" y1="160" x2="205" y2="135" markerEnd="url(#archArrow)" />
                  <line className={styles.archEdge} x1="420" y1="165" x2="518" y2="132" markerEnd="url(#archArrow)" />
                  <line className={styles.archEdge} x1="360" y1="194" x2="360" y2="236" markerEnd="url(#archArrow)" />
                  <line className={styles.archEdge} x1="400" y1="258" x2="453" y2="258" markerEnd="url(#archArrow)" />
                  <path className={styles.archEdge} d="M155 152 C160 212 232 260 298 262" markerEnd="url(#archArrow)" />

                  <g>
                    <rect className={styles.archNodeRect} x="300" y="44" width="120" height="40" rx="10" />
                    <text className={styles.archNodeText} x="360" y="64">Loop M</text>
                  </g>
                  <g>
                    <rect className={styles.archNodeRect} x="110" y="112" width="90" height="40" rx="10" />
                    <text className={styles.archNodeText} x="155" y="132">iOS</text>
                  </g>
                  <g>
                    <rect className={styles.archNodeRect} x="520" y="108" width="90" height="40" rx="10" />
                    <text className={styles.archNodeText} x="565" y="128">OR</text>
                  </g>
                  <g>
                    <rect className={`${styles.archNodeRect} ${styles.archHub}`} x="300" y="150" width="120" height="44" rx="10" />
                    <text className={`${styles.archNodeText} ${styles.archNodeTextHub}`} x="360" y="172">Mastra</text>
                  </g>
                  <g>
                    <rect className={styles.archNodeRect} x="300" y="238" width="100" height="40" rx="10" />
                    <text className={styles.archNodeText} x="350" y="258">Rube</text>
                  </g>
                  <g>
                    <rect className={styles.archNodeRect} x="455" y="238" width="190" height="40" rx="10" />
                    <text className={styles.archNodeText} x="550" y="258">Gmail, GCal, etc.</text>
                  </g>
                </svg>
              </div>
            </Reveal>
          </section>

          {/* 06 — Solution */}
          <section className={styles.section} id="solution">
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>The solution</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={`${styles.sectionLead} ${styles.solutionLead}`}>
                An agent that meets people inside iMessage, aligned to their real
                calendar and designed for students {" "}
                <br className={styles.solutionLeadBreak} />
                managing self-scheduled work who plan ahead
                but struggle to follow through.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className={styles.solutionMedia}>
                <figure className={styles.solutionItem}>
                  <figcaption className={styles.solutionLabel}>
                    Demo Video
                  </figcaption>
                  <DemoVideo src="/projects/snitch/novahacks-demo.mp4" />
                </figure>

                <figure className={styles.solutionItem}>
                  <figcaption className={styles.solutionLabel}>
                    iMessage Check-ins
                  </figcaption>
                  <div className={styles.solutionScreen}>
                    <Image
                      src="/projects/snitch/imessage-cutout.png"
                      alt="Snitch iMessage check-in conversation"
                      width={634}
                      height={1284}
                      unoptimized
                      className={styles.solutionImg}
                    />
                  </div>
                </figure>
              </div>
            </Reveal>

            <SolutionCarousel steps={SOLUTION_STEPS} />
          </section>

          {/* 07 — Reflection */}
          <section className={styles.section}>
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>07</span>
                <h2 className={styles.sectionTitle}>What I learnt</h2>
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
              </figure>
            </Reveal>

            <div className={styles.reflectGrid}>
              <Reveal>
                <div
                  className={`${styles.reflectCard} ${styles.reflectCardHats}`}
                >
                  <svg
                    className={styles.reflectHatSketch}
                    viewBox="0 0 88 80"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M 10 62 C 20 57 34 60 44 59 C 54 58 68 57 78 61 C 70 66 52 64 44 65 C 26 66 12 65 10 62 Z"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 44 12 C 40 22 26 48 20 58 C 36 56 52 56 68 58 C 62 44 50 20 44 12 Z"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 36 50 L 44 40 L 52 50"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className={styles.reflectTitle}>Wearing multiple hats</h3>
                  <p className={styles.reflectBody}>
                    Working in a team of four gave me a real sense of a product
                    team. I stepped into both product designer and product
                    manager roles across UX and product direction, and my
                    business background helped us make quick tradeoffs and
                    articulate the idea clearly under time pressure.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div
                  className={`${styles.reflectCard} ${styles.reflectCardNext}`}
                >
                  <svg
                    className={styles.reflectArrowSketch}
                    viewBox="0 0 80 36"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M 6 20 C 18 14, 32 22, 46 18 C 54 16, 60 17, 64 18"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 64 18 L 74 18 M 74 18 L 68 12 M 74 18 L 68 24"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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

            <Reveal delay={120}>
              <p className={styles.closing}>
                &ldquo;This was my first full one-day hackathon and I loved
                collaborating with teammates who brought in different skills and
                perspectives. The constraints made the experience very
                fast-paced and exciting. I&apos;m looking forward to
                participating in more events like this in the future!&rdquo;
                &nbsp;&mdash; Cynthia, 2025
              </p>
            </Reveal>
          </section>

          <Reveal>
            <CaseStudyNav slug="snitch" />
          </Reveal>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
