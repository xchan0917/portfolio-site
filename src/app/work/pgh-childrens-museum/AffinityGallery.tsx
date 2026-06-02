"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../snitch/snitch.module.css";
import pgh from "./pgh.module.css";

export type AffinityImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export function AffinityGallery({ images }: { images: AffinityImage[] }) {
  const rightMediaRef = useRef<HTMLDivElement>(null);
  const [mediaHeight, setMediaHeight] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const el = rightMediaRef.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 901px)");

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

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <>
      <div className={pgh.affinityGallery}>
        {images.map((img, i) => (
          <figure key={img.src} className={pgh.affinityFigure}>
            <button
              type="button"
              className={pgh.affinityTrigger}
              onClick={() => setActive(i)}
              aria-haspopup="dialog"
              aria-expanded={active === i}
              aria-label={`Click to expand: ${img.alt}`}
              title="Click to expand"
            >
              <div
                ref={i === 1 ? rightMediaRef : undefined}
                className={pgh.affinityMedia}
                style={
                  i === 0 && mediaHeight != null
                    ? { height: mediaHeight }
                    : { aspectRatio: `${img.width} / ${img.height}` }
                }
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`${pgh.affinityImg} ${
                    i === 0 ? pgh.affinityImgCover : ""
                  }`}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <span className={pgh.affinityZoomHint}>Click to expand</span>
              </div>
            </button>
            <figcaption className={styles.caption}>{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {portalReady &&
        active != null &&
        images[active] &&
        createPortal(
          <div
            className={pgh.affinityPopover}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged affinity mapping view"
            onClick={close}
          >
            <div className={pgh.affinityPopoverInner}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[active].src}
                alt={images[active].alt}
                className={pgh.affinityPopoverImg}
                onClick={close}
              />
              <p className={pgh.affinityPopoverCaption}>
                {images[active].caption}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
