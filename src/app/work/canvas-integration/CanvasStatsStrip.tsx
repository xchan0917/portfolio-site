"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import styles from "../snitch/snitch.module.css";
import cx from "./canvas.module.css";

export type CanvasStat = {
  value: number;
  suffix?: string;
  label: string;
};

const DURATION_MS = 1700;

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let start: number | null = null;
    let frame = 0;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return count;
}

function StatItem({
  stat,
  active,
  delay,
}: {
  stat: CanvasStat;
  active: boolean;
  delay: number;
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!active) {
      setStarted(false);
      return;
    }
    const timer = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(timer);
  }, [active, delay]);

  const count = useCountUp(stat.value, started);

  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>
        {count}
        {stat.suffix ?? ""}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export function CanvasStatsStrip({ stats }: { stats: CanvasStat[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <div ref={ref} className={`${styles.statsStrip} ${cx.stats3}`}>
      {stats.map((stat, index) => (
        <StatItem
          key={stat.label}
          stat={stat}
          active={inView}
          delay={index * 120}
        />
      ))}
    </div>
  );
}
