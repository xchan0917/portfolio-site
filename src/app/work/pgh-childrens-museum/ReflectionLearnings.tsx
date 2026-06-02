import { Reveal } from "@/components/Reveal";
import styles from "../snitch/snitch.module.css";
import pgh from "./pgh.module.css";

const LEARNINGS = [
  {
    title: "Color drives accessibility",
    body: "Choosing shades that stay clear and visible to as many people as possible is essential, not decorative.",
    icon: "palette",
    cardClass: pgh.learningCardPalette,
    sketchClass: pgh.learningSketchPalette,
  },
  {
    title: "Communication is a design skill",
    body: "From pitching ideas confidently to knowing when to step back and embrace others' perspectives.",
    icon: "speech",
    cardClass: pgh.learningCardSpeech,
    sketchClass: pgh.learningSketchSpeech,
  },
  {
    title: "Start on paper",
    body: "Embracing trial and error early boosts creativity, and staying open to reworking ideas leads to stronger designs.",
    icon: "paper",
    cardClass: pgh.learningCardPaper,
    sketchClass: pgh.learningSketchPaper,
  },
] as const;

function LearningSketch({
  type,
  className,
}: {
  type: (typeof LEARNINGS)[number]["icon"];
  className: string;
}) {
  const shared = {
    className,
    fill: "none" as const,
    "aria-hidden": true,
  };

  if (type === "palette") {
    return (
      <svg viewBox="0 0 72 64" {...shared}>
        <path
          d="M 24 11 C 40 7, 58 13, 62 29 C 64 41, 54 53, 38 57 C 22 59, 10 49, 8 35 C 6 23, 14 13, 24 11 Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse
          cx="15"
          cy="33"
          rx="5"
          ry="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="33"
          cy="21"
          r="3"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <circle
          cx="45"
          cy="19"
          r="3"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <circle
          cx="52"
          cy="31"
          r="2.75"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <circle
          cx="40"
          cy="37"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.35"
        />
      </svg>
    );
  }

  if (type === "speech") {
    return (
      <svg viewBox="0 0 64 56" {...shared}>
        <path
          d="M 10 14 C 10 14 10 40 10 40 L 24 30 L 50 30 C 58 30 62 24 62 16 C 62 8 54 8 46 8 L 10 14 Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Hand-drawn message scribble inside the bubble */}
        <path
          d="M 20 17 C 24 15.5, 30 18.5, 40 17"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 19 22 C 25 20.5, 33 23.5, 48 22"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 21 27 C 24 25.5, 30 28, 36 27"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 38 17 C 42 18.5, 46 15.5, 52 17.5 C 50 19, 44 18, 42 17"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 72" {...shared}>
      <path
        d="M 16 10 L 48 10 C 52 10 54 12 54 16 L 54 56 C 54 60 52 62 48 62 L 16 62 C 12 62 10 60 10 56 L 10 16 C 10 12 12 10 16 10 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 18 24 L 46 24 M 18 34 L 42 34 M 18 44 L 36 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 48 8 L 58 2 L 56 14 Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReflectionLearnings() {
  return (
    <div className={pgh.learningGrid}>
      {LEARNINGS.map((item, i) => (
        <Reveal key={item.title} delay={i * 90} className={pgh.learningReveal}>
          <article
            className={`${styles.reflectCard} ${pgh.learningCard} ${item.cardClass}`}
          >
            <LearningSketch type={item.icon} className={item.sketchClass} />
            <span className={pgh.learningIndex}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={`${styles.reflectTitle} ${pgh.learningTitle}`}>
              {item.title}
            </h3>
            <p className={styles.reflectBody}>{item.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
