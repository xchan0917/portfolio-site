"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./Hero.module.css";

const HERO_STARS = [
  { top: "4%", left: "2%", size: 9, rotate: -18, peak: 0.75, delay: 0, duration: 3.2 },
  { top: "11%", left: "91%", size: 16, rotate: 12, peak: 0.9, delay: 0.6, duration: 4.1 },
  { top: "24%", left: "-3%", size: 13, rotate: 8, peak: 0.85, delay: 1.1, duration: 3.6 },
  { top: "38%", left: "95%", size: 7, rotate: -24, peak: 0.7, delay: 0.3, duration: 2.8 },
  { top: "50%", left: "5%", size: 18, rotate: -6, peak: 0.95, delay: 1.8, duration: 4.5 },
  { top: "58%", left: "88%", size: 11, rotate: 20, peak: 0.8, delay: 0.9, duration: 3.4 },
  { top: "71%", left: "14%", size: 8, rotate: 14, peak: 0.72, delay: 2.2, duration: 3.9 },
  { top: "76%", left: "82%", size: 15, rotate: -10, peak: 0.88, delay: 1.4, duration: 4.2 },
  { top: "86%", left: "48%", size: 10, rotate: 6, peak: 0.78, delay: 0.2, duration: 3.1 },
  { top: "16%", left: "7%", size: 6, rotate: -32, peak: 0.65, delay: 2.6, duration: 2.6 },
  { top: "63%", left: "93%", size: 12, rotate: 28, peak: 0.82, delay: 1.6, duration: 3.8 },
] as const;

type Segment =
  | { kind: "text"; value: string }
  | { kind: "loves"; value: string };

const HERO_COPY: Segment[] = [
  {
    kind: "text",
    value:
      "She is an interdisciplinary designer focusing on AI products. Her work is centered around human experiences and good intentions.",
  },
];

const FULL_HEADING = HERO_COPY.map((s) => s.value).join("");
const TYPE_SPEED_MS = 42;
const TYPING_START_MS = 900;

function sliceSegment(value: string, remaining: number) {
  if (remaining <= 0) return { text: "", remaining: 0 };
  if (remaining >= value.length) return { text: value, remaining: remaining - value.length };
  return { text: value.slice(0, remaining), remaining: 0 };
}

function renderLovesWord(text: string, animateHeart: boolean) {
  const loveText = text.slice(0, 4);
  const sText = text.slice(4, 5);
  const loveComplete = loveText.length === 4;
  const sComplete = sText.length === 1;

  if (!loveText && !sText) return null;

  return (
    <span className={styles.lovesWrap}>
      {loveText ? (
        <span className={styles.loveHeart}>
          <svg
            className={styles.heartFrame}
            viewBox="0 0 120 96"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={`${styles.heartOutline} ${animateHeart && loveComplete ? styles.heartPulse : ""}`}
              d="M60 86 C60 86, 10 54, 10 34 C10 16, 30 6, 60 24 C90 6, 110 16, 110 34 C110 54, 60 86, 60 86 Z"
            />
          </svg>
          <span className={styles.scriptAccent}>{loveText}</span>
        </span>
      ) : null}
      {sText ? (
        <span className={styles.lovesS}>
          {sComplete ? (
            <svg
              className={styles.sConnector}
              viewBox="0 0 48 36"
              aria-hidden="true"
            >
              <path
                d="M6 30 C18 22, 28 12, 44 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : null}
          <span className={styles.scriptAccent}>{sText}</span>
        </span>
      ) : null}
    </span>
  );
}

function renderTypedHeading(visibleChars: number, animateHeart: boolean) {
  let remaining = visibleChars;
  const nodes: ReactNode[] = [];
  let key = 0;

  for (const segment of HERO_COPY) {
    if (remaining <= 0) break;

    const { text, remaining: next } = sliceSegment(segment.value, remaining);
    remaining = next;

    if (!text) continue;

    if (segment.kind === "loves") {
      nodes.push(
        <Fragment key={key++}>{renderLovesWord(text, animateHeart)}</Fragment>
      );
    } else {
      nodes.push(<span key={key++}>{text}</span>);
    }
  }

  return nodes;
}

function getLovesEndIndex() {
  let index = 0;
  for (const segment of HERO_COPY) {
    index += segment.value.length;
    if (segment.kind === "loves") break;
  }
  return index;
}

export function Hero() {
  const totalChars = useMemo(
    () => HERO_COPY.reduce((sum, s) => sum + s.value.length, 0),
    []
  );

  const [visibleChars, setVisibleChars] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const prefersReduced = mq.matches;
      setReduceMotion(prefersReduced);
      if (prefersReduced) {
        setVisibleChars(totalChars);
        setTypingDone(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [totalChars]);

  useEffect(() => {
    if (reduceMotion) return;

    const startTimer = window.setTimeout(() => {
      setVisibleChars(1);
    }, TYPING_START_MS);

    return () => window.clearTimeout(startTimer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || visibleChars === 0) return;

    if (visibleChars >= totalChars) {
      setTypingDone(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisibleChars((count) => Math.min(count + 1, totalChars));
    }, TYPE_SPEED_MS);

    return () => window.clearTimeout(timer);
  }, [visibleChars, totalChars, reduceMotion]);

  const lovesEndIndex = getLovesEndIndex();
  const showHeart = visibleChars >= lovesEndIndex;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.introBlock}>
        <div className={styles.backdrop} aria-hidden="true">
          <div className={`${styles.glowOrb} ${styles.glowVisible}`} />
          <div className={styles.starCluster}>
            {HERO_STARS.map((star, index) => (
              <span
                key={index}
                className={`${styles.star} ${reduceMotion ? styles.starStatic : styles.starTwinkle}`}
                style={
                  {
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                    "--star-rotate": `${star.rotate}deg`,
                    "--star-peak": star.peak,
                    "--twinkle-delay": `${star.delay}s`,
                    "--twinkle-duration": `${star.duration}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>

        {typingDone || reduceMotion ? (
          <div className={styles.meetAnnotation} aria-hidden="true">
            <span className={styles.meetText}>meet cynthia</span>
            <svg
              className={styles.meetArrow}
              viewBox="0 0 100 88"
              fill="none"
            >
              <path
                className={styles.meetArrowPath}
                pathLength={1}
                d="M66 6 C84 3 90 19 76 24 C65 28 66 13 77 15 C90 17 88 34 72 38 C59 41 62 25 74 28 C86 31 82 52 64 58 C56 61 50 66 46 78"
              />
              <path
                className={styles.meetArrowHead}
                pathLength={1}
                d="M46 78 L58 75 M46 78 L50 65"
              />
            </svg>
          </div>
        ) : null}

        <h1
          id="hero-heading"
          className={`${styles.heading} ${visibleChars > 0 || reduceMotion ? styles.headingVisible : styles.headingHidden}`}
          aria-label={FULL_HEADING}
        >
          {renderTypedHeading(visibleChars, showHeart)}
          {!reduceMotion && visibleChars > 0 && visibleChars < totalChars ? (
            <span className={styles.caret} aria-hidden="true" />
          ) : null}
        </h1>

        <div
          id="hero-credentials"
          className={`${styles.credentials} ${typingDone || reduceMotion ? styles.revealVisible : styles.revealHidden}`}
        >
          <span className={styles.chip}>Carnegie Mellon University</span>
          <span className={styles.chip}>Business + HCI</span>
          <span className={styles.chip}>Product designer · NYC</span>
        </div>
      </div>
    </section>
  );
}
