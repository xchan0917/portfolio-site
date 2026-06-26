"use client";

import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { useInView } from "@/lib/useInView";
import { aboutJourney } from "@/lib/about";
import styles from "./about.module.css";

type JourneyStepData = (typeof aboutJourney)[number];

function JourneyStep({
  step,
  index,
  isLast,
}: {
  step: JourneyStepData;
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView<HTMLLIElement>({
    threshold: 0.28,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <li
      ref={ref}
      className={`${styles.journeyItem} ${inView ? styles.journeyItemVisible : ""} ${isLast ? styles.journeyItemLast : ""}`}
      style={
        {
          "--journey-index": index,
          "--journey-parity": index % 2,
        } as CSSProperties
      }
    >
      <span className={styles.journeyDot} aria-hidden="true" />
      <span className={styles.journeyYear}>{step.year}</span>
      <div className={styles.journeyBody}>
        <h4 className={styles.journeyTitle}>{step.title}</h4>
        <p className={styles.journeyText}>{step.body}</p>
      </div>
    </li>
  );
}

export function JourneyTimeline() {
  return (
    <div className={styles.journeyTimeline}>
      <Reveal>
        <h2
          id="journey-heading"
          className={`${styles.sectionTitle} ${styles.journeyHeading}`}
        >
          My design journey
        </h2>
      </Reveal>
      <ol className={styles.journeyList}>
        {aboutJourney.map((step, index) => (
          <JourneyStep
            key={step.year}
            step={step}
            index={index}
            isLast={index === aboutJourney.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
