"use client";

import { useEffect, useRef } from "react";
import styles from "./snitch.module.css";

export type SolutionStep = {
  step: string;
  title: string;
  body: string;
};

const SPEED = 42; // px per second for the continuous auto-scroll

export function SolutionCarousel({ steps }: { steps: SolutionStep[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const hoverRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();

    const stepDistance = () => {
      const kids = track.children;
      if (kids.length < 2) return 0;
      return (
        (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
      );
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const setWidth = stepDistance() * steps.length;
      let off = offsetRef.current;

      if (!hoverRef.current && !reducedRef.current) off += SPEED * dt;
      if (setWidth > 0) {
        while (off >= setWidth) off -= setWidth;
      }

      offsetRef.current = off;
      track.style.transform = `translate3d(${-off}px, 0, 0)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [steps.length]);

  // Render several copies so the row stays filled while wrapping, even on
  // very wide full-bleed viewports.
  const loopItems = [...steps, ...steps, ...steps];

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselViewport}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        <div className={styles.carouselTrack} ref={trackRef}>
          {loopItems.map((s, i) => (
            <div
              key={`${s.step}-${i}`}
              className={styles.carouselCard}
              aria-hidden={i >= steps.length ? true : undefined}
            >
              <span className={styles.carouselBar} aria-hidden />
              <span className={styles.carouselNum}>{s.step}</span>
              <h3 className={styles.carouselTitle}>{s.title}</h3>
              <p className={styles.carouselBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
