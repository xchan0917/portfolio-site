import { Reveal } from "@/components/Reveal";
import styles from "../snitch/snitch.module.css";
import cx from "./canvas.module.css";

const NEXT_STEPS = [
  {
    title: "Technical expansion",
    body: "Bring the full Calendar API integration to life, enabling real-time syncing across courses and centralized scheduling for students and instructors.",
    icon: "calendar",
    sketchClass: cx.nextStepSketchCalendar,
    cardClass: cx.nextStepCardCalendar,
  },
  {
    title: "Strategic growth",
    body: "Explore a premium tier and district-level offerings, using expanded functionality to create meaningful value for schools seeking more integrated academic tools.",
    icon: "growth",
    sketchClass: cx.nextStepSketchGrowth,
    cardClass: cx.nextStepCardGrowth,
  },
  {
    title: "Enhanced experience",
    body: "Refine navigation and assignment flows based on user feedback to make course management smoother, faster, and more intuitive across devices.",
    icon: "flow",
    sketchClass: cx.nextStepSketchFlow,
    cardClass: cx.nextStepCardFlow,
  },
] as const;

function NextStepSketch({
  type,
  className,
}: {
  type: (typeof NEXT_STEPS)[number]["icon"];
  className: string;
}) {
  const shared = {
    className,
    fill: "none" as const,
    "aria-hidden": true,
  };

  if (type === "calendar") {
    return (
      <svg viewBox="0 0 72 64" {...shared}>
        <path
          d="M 14 14 L 58 14 C 62 14 64 16 64 20 L 64 50 C 64 54 62 56 58 56 L 14 56 C 10 56 8 54 8 50 L 8 20 C 8 16 10 14 14 14 Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 8 24 L 64 24 M 20 10 L 20 18 M 52 10 L 52 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 18 34 L 26 34 M 18 42 L 30 42 M 38 34 L 46 34 M 38 42 L 50 42"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M 54 38 C 60 34, 66 36, 68 42 C 66 48, 58 50, 52 46"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 52 46 L 48 50 M 52 46 L 56 50"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "growth") {
    return (
      <svg viewBox="0 0 68 72" {...shared}>
        <path
          d="M 12 58 L 56 58"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M 18 58 L 18 44 L 34 44 L 34 30 L 50 30 L 50 16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 46 20 L 50 16 L 54 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 22 48 L 26 44 M 38 34 L 42 30"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <ellipse
          cx="14"
          cy="52"
          rx="4"
          ry="5"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M 52 52 C 56 50, 60 52, 62 56"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 72 68" {...shared}>
      <path
        d="M 14 52 L 14 18 C 14 14 16 12 20 12 L 48 12 C 52 12 54 14 54 18 L 54 52"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 22 22 L 46 22 M 22 30 L 40 30 M 22 38 L 34 38"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 38 46 C 44 42, 52 44, 58 40 C 62 46, 56 54, 48 56 C 42 57, 36 54, 34 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 48 56 L 44 60 M 48 56 L 52 60"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="58" cy="24" r="2.25" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

export function CanvasNextSteps() {
  return (
    <div className={styles.cardGrid}>
      {NEXT_STEPS.map((step, i) => (
        <Reveal key={step.title} delay={i * 90}>
          <article
            className={`${styles.gapCard} ${cx.nextStepCard} ${step.cardClass}`}
          >
            <NextStepSketch type={step.icon} className={step.sketchClass} />
            <h3 className={styles.gapTitle}>{step.title}</h3>
            <p className={styles.gapBody}>{step.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
