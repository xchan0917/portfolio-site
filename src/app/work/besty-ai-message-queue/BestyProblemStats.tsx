"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import styles from "../snitch/snitch.module.css";
import cx from "./besty.module.css";

export type ProblemStat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const SPIN_MS = 1100;
const SPIN_CYCLES = 5;

function formatValue(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

function DigitSpin({
  digit,
  active,
  delay,
}: {
  digit: number;
  active: boolean;
  delay: number;
}) {
  const offset = active ? SPIN_CYCLES * 10 + digit : 0;
  const ticks = SPIN_CYCLES * 10 + 10;

  return (
    <span className={cx.digitWindow}>
      <span
        className={cx.digitReel}
        style={{
          transform: `translateY(-${offset}em)`,
          transitionDuration: `${SPIN_MS}ms`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {Array.from({ length: ticks }, (_, i) => (
          <span key={i} className={cx.digit}>
            {i % 10}
          </span>
        ))}
      </span>
    </span>
  );
}

function NumberSpin({
  value,
  decimals,
  active,
  delay,
}: {
  value: number;
  decimals: number;
  active: boolean;
  delay: number;
}) {
  const chars = formatValue(value, decimals).split("");
  let digitIndex = 0;

  return (
    <>
      {chars.map((char, i) => {
        if (char === ".") {
          return (
            <span key={`dot-${i}`} className={cx.decimal}>
              .
            </span>
          );
        }
        const thisDigit = digitIndex++;
        return (
          <DigitSpin
            key={`${i}-${char}`}
            digit={Number(char)}
            active={active}
            delay={delay + thisDigit * 70}
          />
        );
      })}
    </>
  );
}

function StatItem({
  stat,
  active,
  delay,
}: {
  stat: ProblemStat;
  active: boolean;
  delay: number;
}) {
  const decimals = stat.decimals ?? 0;
  const finalLabel = `${stat.prefix ?? ""}${formatValue(stat.value, decimals)}${stat.suffix ?? ""}`;

  return (
    <div className={`${styles.statItem} ${cx.statBlock}`}>
      <span className={`${styles.statValue} ${cx.statValue}`} aria-label={finalLabel}>
        {stat.prefix}
        <NumberSpin
          value={stat.value}
          decimals={decimals}
          active={active}
          delay={delay}
        />
        {stat.suffix ? <span className={cx.statSuffix}>{stat.suffix}</span> : null}
      </span>
      <span className={`${styles.statLabel} ${cx.statCopy}`}>{stat.label}</span>
    </div>
  );
}

export function BestyProblemStats({ stats }: { stats: ProblemStat[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    rootMargin: "0px 0px -12% 0px",
    once: true,
  });
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(() => setSpinning(true), 80);
    return () => window.clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className={cx.stats2}>
      {stats.map((stat, index) => (
        <StatItem
          key={stat.label}
          stat={stat}
          active={spinning}
          delay={index * 90}
        />
      ))}
    </div>
  );
}
