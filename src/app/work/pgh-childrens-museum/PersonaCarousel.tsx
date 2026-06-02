"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import pgh from "./pgh.module.css";

export type PersonaSlide = {
  title: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export function PersonaCarousel({ slides }: { slides: PersonaSlide[] }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  const slide = slides[index];

  return (
    <div className={pgh.personaCarousel}>
      <div
        className={pgh.personaViewport}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (start == null) return;
          const end = e.changedTouches[0]?.clientX;
          if (end == null) return;
          const delta = end - start;
          if (Math.abs(delta) < 48) return;
          go(delta < 0 ? 1 : -1);
        }}
      >
        <button
          type="button"
          className={`${pgh.personaArrow} ${pgh.personaArrowPrev}`}
          onClick={() => go(-1)}
          aria-label="Previous persona"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M12.5 4.5 7 10l5.5 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <figure className={pgh.personaFigure}>
          <div className={pgh.personaSlide}>
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              className={pgh.personaImg}
              sizes="(max-width: 900px) 100vw, min(1200px, 92vw)"
              priority={index === 0}
            />
          </div>
          <figcaption className={pgh.personaCaption}>
            <span className={pgh.personaTitle}>{slide.title}</span>
            <span className={pgh.personaCounter}>
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          className={`${pgh.personaArrow} ${pgh.personaArrowNext}`}
          onClick={() => go(1)}
          aria-label="Next persona"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M7.5 4.5 13 10l-5.5 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
