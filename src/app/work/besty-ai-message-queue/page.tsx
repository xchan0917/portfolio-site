import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal, RevealSequence } from "@/components/Reveal";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { BackLink } from "../snitch/BackLink";
import styles from "../snitch/snitch.module.css";
import cx from "./besty.module.css";
import { LoginFrictionSketch } from "./LoginFrictionSketch";
import { BestyProblemStats } from "./BestyProblemStats";

export const metadata: Metadata = {
  title: "Besty.AI Message Queue — Unified Multi-Account Messaging | Cynthia Chan",
  description:
    "Unifying incoming messages across multiple accounts into a single queue.",
};

const META = [
  { label: "Timeline", values: ["2 months", "2026"] },
  { label: "Role", values: ["Product Designer"] },
  {
    label: "Team",
    values: [
      "Product team",
      "Engineer team",
    ],
  },
  {
    label: "Focus",
    values: [
      "Internal Tools",
      "Access & Identity Design",
      "AI-Assisted Coding",
      "Solo Product & Design",
    ],
  },
];

const PROBLEM_STATS = [
  {
    value: 1.5,
    decimals: 1,
    suffix: "+ hrs",
    label:
      "spent each week by a product team member switching between accounts just to check the inbox.",
  },
  {
    value: 85,
    suffix: "",
    label:
      "average messages overlooked weekly, left waiting in an inbox that wasn't currently open.",
  },
  {
    value: 12.2,
    decimals: 1,
    suffix: "\u00a0min",
    label:
      "average wait before anyone could reach a conversation the AI had already given up on.",
  },
];

type MomentPart = {
  title: string;
  body: string;
  visual?: string;
  plain?: boolean;
  solo?: boolean;
  visualSide?: "left" | "right";
};

type Moment = {
  step: string;
  title: string;
  lead?: string;
  parts: MomentPart[];
  frame: string;
};

const MOMENTS: Moment[] = [
  {
    step: "01",
    title: "Claiming, then replying",
    parts: [
      {
        title: "Claim opens the conversation",
        body: "Claim loads the thread and shows “[name] is replying,” so a second person does not answer the same guest.",
        visual: "/projects/besty/someone-else-replying.mp4",
      },
      {
        title: "Sentiment, kept light",
        body: "See how the customer feels before opening the conversation. An emoji categorizes that sentiment from the most recent message.",
        plain: true,
      },
    ],
    frame: "Screen — to add",
  },
  {
    step: "02",
    title: "Visual aid",
    parts: [
      {
        title: "Live refresh",
        body: "The queue updates every two seconds on its own. A new message is already there, and nothing on the page should interrupt that.",
        visual: "/projects/besty/reload-time.mp4",
        visualSide: "left",
      },
      {
        title: "What has to be visible",
        body: "Guest, property, wait time, and a short preview sit on one line.",
        plain: true,
      },
    ],
    frame: "Screen — to add",
  },
  {
    step: "03",
    title: "Completion of task",
    parts: [
      {
        title: "The reply stays the same",
        body: "Drafting and sending still work like the existing inbox. Sending completes the task. A later message starts a new one.",
        visual: "/projects/besty/message.mp4",
      },
      {
        title: "Only that property",
        body: "The queue cannot open admin screens or change layouts.",
        plain: true,
      },
    ],
    frame: "Screen — to add",
  },
];

function MomentClip({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const poster = src.replace(/\.mp4$/, "-poster.webp");
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
    />
  );
}

function MissMark() {
  return (
    <svg viewBox="0 0 16 16" className={cx.lockMark} aria-hidden="true">
      <circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M8 4.6v4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.15" r="0.7" fill="currentColor" />
    </svg>
  );
}

function LockMark() {
  return (
    <svg viewBox="0 0 16 16" className={cx.lockMark} aria-hidden="true">
      <path
        d="M5 7.2V5.4a3 3 0 0 1 6 0V7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect
        x="3.4"
        y="7"
        width="9.2"
        height="6.4"
        rx="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function FutureIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={cx.futureIcon} aria-hidden="true">
      {children}
    </svg>
  );
}

const FUTURE = [
  {
    title: "Resolving the access model itself",
    body: "The concept assumes one identity can be assigned to multiple portfolios, but the backend change that would make that possible was never scoped. That is the real prerequisite, and it belongs in any next phase of this work.",
    icon: (
      <FutureIcon>
        <circle cx="8" cy="14.5" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.4 12.6 19 4.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15.6 7.2 17.8 9.4M13.8 9l2 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </FutureIcon>
    ),
  },
  {
    title: "A manager view across people",
    body: "If individual interns get a unified queue, a manager overseeing several interns' portfolios would likely need their own view: one that shows coverage and response times across people, not just across portfolios for one person.",
    icon: (
      <FutureIcon>
        <circle cx="9" cy="8.2" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="9" r="1.9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.6 18.2c.55-2.5 2.45-3.9 4.4-3.9s3.85 1.4 4.4 3.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14.2 14.5c1.15-.45 2.3-.5 3.25-.1 1.3.5 2.15 1.7 2.4 3.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </FutureIcon>
    ),
  },
  {
    title: "Testing whether sentiment labels help",
    body: "The idea that showing guest sentiment improves triage decisions has not been validated. It is a reasonable hypothesis, not a confirmed result.",
    icon: (
      <FutureIcon>
        <circle cx="12" cy="12" r="7.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="10.4" r="0.8" fill="currentColor" />
        <circle cx="15" cy="10.4" r="0.8" fill="currentColor" />
        <path d="M8.8 14c.85 1.15 1.9 1.7 3.2 1.7s2.35-.55 3.2-1.7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </FutureIcon>
    ),
  },
];

export default function BestyCaseStudy() {
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
                src="/projects/besty/hero-mockups.webp"
                alt="Besty.AI Message Queue shown across two laptop mockups"
                width={1920}
                height={1080}
                unoptimized
                priority
                className={styles.heroMedia}
              />
            </figure>
          </Reveal>

          <div className={styles.heroRow} id="tldr">
            <header className={styles.hero}>
              <Reveal delay={60}>
                <h1 className={`${styles.title} ${cx.heroTitle}`}>
                  <span className={cx.heroTitleLine}>Besty.AI</span>
                  <span className={cx.heroTitleLine}>Message Queue</span>
                </h1>
              </Reveal>
              <Reveal delay={140} className={styles.heroTags}>
                <span className={styles.heroTag}>Product Design</span>
                <span className={styles.heroTag}>Messaging</span>
              </Reveal>
            </header>

            <div className={styles.tldrCol}>
              <Reveal>
                <span className={styles.kicker}>TL;DR</span>
              </Reveal>
              <Reveal delay={80}>
                <p className={styles.statement}>
                  Within Besty AI&apos;s guest-communications tool, Message Queue
                  is a unified view of every conversation the AI autopilot could
                  not resolve.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className={styles.statementLead}>
                  There is no need to lose productivity in switching around to
                  different accounts. Simply open the queue, claim a
                  conversation, and reply.
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
              <a href="#system" className={styles.jump}>
                Jump to solution ↓
              </a>
            </Reveal>
          </div>

          {/* 01 — The problem */}
          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="problem"
          >
            <Reveal>
              <div className={`${styles.sectionHead} ${cx.problemHead}`}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>
                  Every portfolio lived behind its own login
                </h2>
                <figure className={cx.problemSketchWrap}>
                  <LoginFrictionSketch />
                </figure>
              </div>
            </Reveal>
            <Reveal delay={80} className={cx.problemProse}>
              <p>
                As the product intern and the only designer at Besty.AI, I found
                myself managing between the product and the property management
                clients who relied on our platform every day. Through
                conversations with my coworkers, I noticed a recurring
                challenge: managing multiple client portfolios is fragmented.
                Every product intern was responsible for two to three accounts,
                and each portfolio could contain anywhere from 50 to 250
                properties.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className={cx.frictionSplit}>
                <div className={cx.frictionSteps}>
                  <ol className={cx.frictionStepList}>
                    <li>Create a +1, +2, +3 email address.</li>
                    <li>Log out of account.</li>
                    <li>Sign in to other created accounts.</li>
                    <li>Learn other portfolio&apos;s workflow content.</li>
                    <li>Check for missed messages.</li>
                    <li>Repeat for the next portfolio account.</li>
                  </ol>
                </div>
                <div className={cx.frictionVisual}>
                  <ul className={cx.accountStack}>
                    <li className={cx.accountCard}>
                      <span className={cx.accountMark} aria-hidden="true">
                        <LockMark />
                      </span>
                      <span className={cx.accountText}>
                        <strong>+1 account</strong>
                        <em>work+1@besty.ai</em>
                      </span>
                      <span className={cx.accountState}>Logged out</span>
                    </li>
                    <li className={`${cx.accountCard} ${cx.accountOpen}`}>
                      <span className={cx.accountMark} aria-hidden="true">
                        <span className={cx.accountDot} />
                      </span>
                      <span className={cx.accountText}>
                        <strong>+2 account</strong>
                        <em>work+2@besty.ai · learning workflow</em>
                      </span>
                      <span className={cx.accountState}>Signed in</span>
                    </li>
                    <li className={cx.accountCard}>
                      <span className={cx.accountMark} aria-hidden="true">
                        <MissMark />
                      </span>
                      <span className={cx.accountText}>
                        <strong>+3 account</strong>
                        <em>work+3@besty.ai</em>
                      </span>
                      <span className={cx.accountState}>Missed messages</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className={cx.frictionCaption}>
                Each portfolio lived on its own +1, +2, or +3 login. Signing in
                meant learning that workflow again, while missed messages sat in
                the accounts you had logged out of.
              </p>
            </Reveal>

            <Reveal delay={120} className={cx.costBlock}>
              <span className={styles.kicker}>The cost</span>
            </Reveal>
            <BestyProblemStats stats={PROBLEM_STATS} />

            <Reveal delay={140}>
              <blockquote className={styles.quote}>
                How might we let one person see every flagged conversation across
                their portfolios in one place, reply without switching logins,
                and keep two people from answering the same guest?
              </blockquote>
            </Reveal>
          </section>

          {/* 02 — The opportunity */}
          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="solution"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>The opportunity</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.prose}>
                <p>
                  I explored this opportunity through Message Queue, a single
                  view that surfaces every conversation the AI autopilot could
                  not resolve, across every portfolio a person is assigned to,
                  ranked by how long it has been waiting. Instead of checking
                  three accounts in sequence, the person checks one queue, then
                  claims a conversation and replies without ever switching
                  accounts.
                </p>
              </div>
            </Reveal>

            <Reveal soft threshold={0.28} rootMargin="0px 0px -12% 0px">
              <figure
                className={cx.identityMap}
                aria-label="Identity model: today each portfolio is a separate login; the queue needs one identity assigned to every portfolio."
              >
                <div className={cx.mapPanel}>
                  <span className={cx.mapEyebrow}>
                    Today · three individual logins
                  </span>
                  <div className={cx.mapPanelBody}>
                    <ol className={cx.mapStack}>
                      {["Portfolio A", "Portfolio B", "Portfolio C"].map(
                        (name) => (
                          <li key={name} className={cx.mapCard}>
                            <span className={cx.mapCardIcon} aria-hidden>
                              <svg viewBox="0 0 20 20" width="16" height="16">
                                <circle
                                  cx="10"
                                  cy="7"
                                  r="3.2"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                />
                                <path
                                  d="M4.2 16c.6-3 3-4.6 5.8-4.6S15.2 13 15.8 16"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            <span className={cx.mapCardText}>
                              <strong>{name}</strong>
                            </span>
                          </li>
                        ),
                      )}
                    </ol>
                    <p className={cx.mapCaption}>
                      Seeing every flagged conversation meant logging out and
                      back in.
                    </p>
                  </div>
                </div>

                <div className={cx.mapBridge} aria-hidden>
                  <span className={cx.mapBridgeLabel}>
                    One identity for every portfolio
                  </span>
                  <span className={cx.mapBridgeArrow}>→</span>
                </div>

                <div className={cx.mapPanel}>
                  <span className={cx.mapEyebrow}>Needed · one identity</span>
                  <div className={cx.mapPanelBody}>
                    <div className={cx.mapFlow}>
                      <div className={cx.mapIdentity}>One identity</div>

                      <svg
                        className={cx.mapConnectors}
                        viewBox="0 0 360 120"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden
                      >
                        <defs>
                          <marker
                            id="bestyFlowArrow"
                            markerWidth="7"
                            markerHeight="7"
                            refX="6"
                            refY="3.5"
                            orient="auto"
                            markerUnits="userSpaceOnUse"
                          >
                            <path
                              d="M0 0.5 L6.5 3.5 L0 6.5 Z"
                              fill="currentColor"
                            />
                          </marker>
                        </defs>
                        <g className={cx.mapLink}>
                          <line
                            x1="180"
                            y1="8"
                            x2="48"
                            y2="108"
                            markerEnd="url(#bestyFlowArrow)"
                          />
                          <line
                            x1="180"
                            y1="8"
                            x2="180"
                            y2="108"
                            markerEnd="url(#bestyFlowArrow)"
                          />
                          <line
                            x1="180"
                            y1="8"
                            x2="312"
                            y2="108"
                            markerEnd="url(#bestyFlowArrow)"
                          />
                        </g>
                      </svg>

                      <ul className={cx.mapPorts}>
                        {["Portfolio A", "Portfolio B", "Portfolio C"].map(
                          (name) => (
                            <li key={name}>{name}</li>
                          ),
                        )}
                      </ul>

                      <svg
                        className={cx.mapConnectors}
                        viewBox="0 0 360 120"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden
                      >
                        <defs>
                          <marker
                            id="bestyFlowArrowUp"
                            markerWidth="7"
                            markerHeight="7"
                            refX="6"
                            refY="3.5"
                            orient="auto"
                            markerUnits="userSpaceOnUse"
                          >
                            <path
                              d="M0 0.5 L6.5 3.5 L0 6.5 Z"
                              fill="currentColor"
                            />
                          </marker>
                        </defs>
                        <g className={cx.mapLink}>
                          <line
                            x1="180"
                            y1="108"
                            x2="180"
                            y2="14"
                            markerEnd="url(#bestyFlowArrowUp)"
                          />
                        </g>
                      </svg>

                      <div className={cx.mapQueue}>
                        <strong>Message Queue</strong>
                        <em>one shared view</em>
                      </div>
                    </div>
                    <p className={cx.mapCaption}>
                      One assigned identity can pull A, B, and C into a single
                      queue.
                    </p>
                  </div>
                </div>
              </figure>
            </Reveal>
          </section>

          {/* 04 — System overview */}
          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="system"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>System overview</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.sectionLead}>
                The queue is less about making a new decision and more about
                getting to an incoming message quickly. That is what keeps
                relations with guests, property owners, and management.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <figure className={cx.protoFigure}>
                <video
                  className={cx.protoVideo}
                  src="/projects/besty/prototype.mp4"
                  poster="/projects/besty/prototype-poster.webp"
                  aria-label="Besty AI Message Queue prototype"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                />
                <figcaption className={styles.caption}>
                  Besty AI Message Queue prototype
                </figcaption>
              </figure>
            </Reveal>
          </section>

          {/* 05 — Design breakdown */}
          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="design-breakdown"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>04</span>
                <h2 className={styles.sectionTitle}>Design breakdown</h2>
              </div>
            </Reveal>

            <div className={cx.stepList}>
              {MOMENTS.map((moment) => (
                <div key={moment.step} className={cx.step}>
                    <Reveal soft threshold={0.35} rootMargin="0px 0px -10% 0px">
                      <div className={cx.stepText}>
                        <span className={cx.stepNum}>Moment {moment.step}</span>
                        <h3 className={cx.stepTitle}>{moment.title}</h3>
                        {moment.lead ? (
                          <p className={cx.stepLead}>{moment.lead}</p>
                        ) : null}
                      </div>
                    </Reveal>
                    {moment.parts.some(
                      (part) => (part.visual || part.plain) && !part.solo,
                    ) ? (
                      <div
                        className={
                          moment.parts.some((part) => part.visualSide === "left")
                            ? cx.refreshRow
                            : cx.claimRow
                        }
                      >
                        {moment.parts.some((part) => part.visualSide === "left")
                          ? moment.parts
                              .filter((part) => part.visual && !part.solo)
                              .map((part) => (
                                <Reveal
                                  key={part.visual}
                                  soft
                                  delay={80}
                                  threshold={0.3}
                                  rootMargin="0px 0px -10% 0px"
                                >
                                  <MomentClip
                                    className={cx.refreshVisual}
                                    src={part.visual!}
                                    alt="The message queue refreshing, with a new guest message already in the list."
                                  />
                                </Reveal>
                              ))
                          : null}
                        <RevealSequence
                          soft
                          step={420}
                          threshold={0.3}
                          rootMargin="0px 0px -12% 0px"
                          className={cx.claimStack}
                        >
                          {moment.parts
                            .filter(
                              (part) => (part.visual || part.plain) && !part.solo,
                            )
                            .map((part, partIndex) => (
                              <div key={part.title} className={cx.claimCopy}>
                                <h4 className={cx.momentCardTitle}>
                                  <span>
                                    {String(partIndex + 1).padStart(2, "0")}
                                  </span>
                                  {part.title}
                                </h4>
                                <p className={cx.momentCardBody}>{part.body}</p>
                              </div>
                            ))}
                        </RevealSequence>
                        {moment.parts.some((part) => part.visualSide === "left")
                          ? null
                          : moment.parts
                              .filter((part) => part.visual && !part.solo)
                              .map((part) => (
                                <Reveal
                                  key={part.visual}
                                  soft
                                  delay={100}
                                  threshold={0.3}
                                  rootMargin="0px 0px -10% 0px"
                                >
                                  <MomentClip
                                    className={cx.claimVisual}
                                    src={part.visual!}
                                    alt="Maria Alvarez’s row shows Daniel K. is replying, while the other conversations still offer Claim."
                                  />
                                </Reveal>
                              ))}
                      </div>
                    ) : null}
                    {moment.parts
                      .filter((part) => part.solo && part.visual)
                      .map((part) => (
                        <div key={part.title} className={cx.claimRow}>
                          <div className={cx.claimStack}>
                            <div className={cx.claimCopy}>
                              <h4 className={cx.momentCardTitle}>
                                <span>01</span>
                                {part.title}
                              </h4>
                              <p className={cx.momentCardBody}>{part.body}</p>
                            </div>
                          </div>
                          <MomentClip
                            className={cx.claimVisual}
                            src={part.visual!}
                            alt="Amanda McSherry’s thread in the existing inbox, with a reply typed and sent."
                          />
                        </div>
                      ))}
                    {moment.parts.some((part) => !part.visual && !part.plain) ? (
                    <ul
                      className={
                        moment.parts.filter((part) => !part.visual && !part.plain)
                          .length === 2
                          ? `${cx.momentCards} ${cx.momentCardsPair}`
                          : cx.momentCards
                      }
                    >
                      {moment.parts
                        .filter((part) => !part.visual && !part.plain)
                        .map((part, partIndex) => (
                          <li key={part.title} className={cx.momentCard}>
                            <h4 className={cx.momentCardTitle}>
                              <span>
                                {String(
                                  partIndex +
                                    moment.parts.filter(
                                      (item) =>
                                        (item.visual || item.plain) && !item.solo,
                                    ).length +
                                    1,
                                ).padStart(2, "0")}
                              </span>
                              {part.title}
                            </h4>
                            <p className={cx.momentCardBody}>{part.body}</p>
                          </li>
                        ))}
                    </ul>
                    ) : null}
                    {moment.parts.some((part) => part.visual) ? null : (
                      <div className={`${cx.placeholderFrame} ${cx.momentFrame}`}>
                        <span className={cx.placeholderLabel}>
                          {moment.frame}
                        </span>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </section>

          {/* 07 — Future opportunities */}
          <section
            className={`${styles.section} ${styles.wideSection}`}
            id="future"
          >
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>05</span>
                <h2 className={styles.sectionTitle}>
                  Extending message queue beyond its current abilities
                </h2>
              </div>
            </Reveal>
            <div className={cx.futureList}>
              {FUTURE.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <div className={cx.futureRow}>
                    {item.icon}
                    <div className={cx.futureCopy}>
                      <h3 className={cx.futureTitle}>{item.title}</h3>
                      <p className={cx.futureBody}>{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 08 — Reflections */}
          <section className={styles.section} id="reflections">
            <Reveal>
              <div className={styles.sectionHead}>
                <span className={styles.sectionNum}>06</span>
                <h2 className={styles.sectionTitle}>Reflections</h2>
              </div>
            </Reveal>

            <div className={styles.reflectGrid}>
              <Reveal delay={120}>
                <div className={styles.reflectCard}>
                  <h3 className={styles.reflectTitle}>
                    Working across product and design at once
                  </h3>
                  <p className={styles.reflectBody}>
                    As the only designer and the person involved with both the
                    product and the clients we served, I understood the accounts
                    and the inefficiencies of the old method from the inside.
                    The design opportunity had been there all along.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className={styles.reflectCard}>
                  <h3 className={styles.reflectTitle}>
                    From framing with Claude to building in Cursor
                  </h3>
                  <p className={styles.reflectBody}>
                    The concept took shape through back-and-forth with Claude,
                    first on framing the problem, then on the interaction logic.
                    I built Message Queue in Cursor as a clickable system instead
                    of static mockups, so I could describe an interaction, test
                    it, catch where the mental model broke, and revise design
                    and code in the same cycle. Running claim, live refresh, and
                    reply made states and transitions easier to judge than in
                    Figma alone.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <Reveal>
            <CaseStudyNav slug="besty-ai-message-queue" />
          </Reveal>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
