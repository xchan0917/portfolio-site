"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../snitch/snitch.module.css";
import pgh from "./pgh.module.css";

const WIREFRAMES = [
  {
    src: "/projects/pgh/wireframe-1.png",
    width: 464,
    height: 642,
    alt: "Hand-drawn wireframe of the landing page navigation",
    caption:
      "Early landing-page structure exhibits, schedule, tickets, and about.",
  },
  {
    src: "/projects/pgh/wireframe-2.png",
    width: 1018,
    height: 892,
    alt: "More detailed hand-drawn wireframes of multiple pages",
    caption:
      "Iterating on layouts quickly and collaboratively on whiteboard",
  },
] as const;

export function WireframePair() {
  const rightMediaRef = useRef<HTMLDivElement>(null);
  const [mediaHeight, setMediaHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = rightMediaRef.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 641px)");

    const measure = () => {
      if (!mq.matches) {
        setMediaHeight(null);
        return;
      }
      setMediaHeight(el.getBoundingClientRect().height);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className={`${styles.whiteboardPair} ${pgh.wireframePair}`}>
      {WIREFRAMES.map((img, i) => (
        <figure key={img.src} className={styles.figure}>
          <div
            ref={i === 1 ? rightMediaRef : undefined}
            className={pgh.wireframeMedia}
            style={
              i === 0 && mediaHeight != null ? { height: mediaHeight } : undefined
            }
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill={i === 0}
              {...(i === 1
                ? { width: img.width, height: img.height }
                : {})}
              className={
                i === 0
                  ? pgh.wireframeImg
                  : `${pgh.wireframeImg} ${pgh.wireframeImgNatural}`
              }
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <figcaption className={styles.caption}>{img.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
