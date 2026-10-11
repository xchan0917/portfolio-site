"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./FooterFlorals.module.css";

const FLORALS = [
  {
    src: "/florals/lavender.webp",
    alt: "Lavender illustration",
    width: 72,
    height: 120,
    top: "8%",
    left: "6%",
    rotate: -14,
    opacity: 0.92,
  },
  {
    src: "/florals/tulip.webp",
    alt: "Yellow tulip illustration",
    width: 64,
    height: 110,
    top: "22%",
    left: "28%",
    rotate: 6,
    opacity: 0.88,
  },
  {
    src: "/florals/iris.webp",
    alt: "Iris illustration",
    width: 80,
    height: 130,
    top: "55%",
    left: "12%",
    rotate: 10,
    opacity: 0.9,
  },
  {
    src: "/florals/lavender.webp",
    alt: "",
    width: 56,
    height: 94,
    top: "18%",
    left: "52%",
    rotate: 12,
    opacity: 0.75,
  },
  {
    src: "/florals/iris.webp",
    alt: "",
    width: 68,
    height: 110,
    top: "38%",
    left: "68%",
    rotate: -8,
    opacity: 0.85,
  },
  {
    src: "/florals/tulip.webp",
    alt: "",
    width: 52,
    height: 90,
    top: "62%",
    left: "42%",
    rotate: -18,
    opacity: 0.8,
  },
  {
    src: "/florals/lavender.webp",
    alt: "",
    width: 48,
    height: 80,
    top: "72%",
    left: "78%",
    rotate: -6,
    opacity: 0.7,
  },
  {
    src: "/florals/tulip.webp",
    alt: "",
    width: 58,
    height: 100,
    top: "12%",
    left: "82%",
    rotate: 15,
    opacity: 0.82,
  },
  {
    src: "/florals/iris.webp",
    alt: "",
    width: 54,
    height: 88,
    top: "78%",
    left: "58%",
    rotate: 4,
    opacity: 0.72,
  },
  {
    src: "/florals/lavender.webp",
    alt: "",
    width: 44,
    height: 74,
    top: "48%",
    left: "88%",
    rotate: 20,
    opacity: 0.65,
  },
] as const;

export function FooterFlorals() {
  return (
    <div className={styles.garden} aria-hidden="true">
      {FLORALS.map((floral, index) => (
        <div
          key={index}
          className={styles.floral}
          style={
            {
              top: floral.top,
              left: floral.left,
              "--base-opacity": floral.opacity,
              "--rotate": `${floral.rotate}deg`,
              "--sway-duration": `${9 + (index % 5) * 1.1}s`,
              "--sway-delay": `${-(index * 0.7)}s`,
              "--sway-angle": `${2.2 + (index % 3) * 0.6}deg`,
              "--blink-duration": `${4.5 + (index % 6) * 1.05}s`,
              "--blink-delay": `${-(index * 0.85)}s`,
            } as CSSProperties
          }
        >
          <div
            className={styles.floralSize}
            style={
              {
                width: Math.round(
                  floral.width * (floral.src.includes("lavender") ? 0.95 : 0.82),
                ),
                height: Math.round(
                  floral.height * (floral.src.includes("lavender") ? 0.95 : 0.82),
                ),
              } as CSSProperties
            }
          >
            <Image
              src={floral.src}
              alt={floral.alt}
              width={floral.width}
              height={floral.height}
              className={styles.floralImg}
              sizes="120px"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
