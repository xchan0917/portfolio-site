"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import pgh from "./pgh.module.css";

const RECONSTRUCTED_DELAY_MS = 2000;
const SCROLL_DELTA_PX = 12;

export function SitemapFlow() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.42,
    rootMargin: "-18% 0px -22% 0px",
    delay: 280,
  });

  const [originalActive, setOriginalActive] = useState(false);
  const [reconstructedActive, setReconstructedActive] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setOriginalActive(true);
  }, [inView]);

  useEffect(() => {
    if (!originalActive || reconstructedActive) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setReconstructedActive(true);
      return;
    }

    let revealed = false;
    const revealReconstructed = () => {
      if (revealed) return;
      revealed = true;
      setReconstructedActive(true);
    };

    const timer = window.setTimeout(revealReconstructed, RECONSTRUCTED_DELAY_MS);
    const scrollStartY = window.scrollY;

    const onUserScroll = () => {
      if (Math.abs(window.scrollY - scrollStartY) >= SCROLL_DELTA_PX) {
        revealReconstructed();
      }
    };

    window.addEventListener("scroll", onUserScroll, { passive: true });
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onUserScroll);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
    };
  }, [originalActive, reconstructedActive]);

  return (
    <figure className={pgh.sitemapFigure}>
      <div
        ref={ref}
        className={`${pgh.sitemapStage} ${originalActive ? pgh.sitemapStageOriginal : ""} ${reconstructedActive ? pgh.sitemapStageReconstructed : ""}`}
      >
        <div className={pgh.sitemapStack}>
          <div className={pgh.sitemapCompareRow}>
            <article
              className={`${pgh.sitemapPanelCard} ${pgh.sitemapPanelBefore} ${pgh.sitemapPanelFromLeft}`}
            >
              <span
                className={`${pgh.sitemapPanelLabel} ${pgh.sitemapPanelLabelBefore}`}
              >
                Original
              </span>
              <div className={pgh.sitemapMedia}>
                <Image
                  src="/projects/pgh/sitemap-original.png"
                  alt="Original Pittsburgh Children's Museum website sitemap"
                  fill
                  className={pgh.sitemapImg}
                  sizes="(max-width: 720px) 100vw, 720px"
                />
              </div>
            </article>

            <article
              className={`${pgh.sitemapPanelCard} ${pgh.sitemapPanelAfter} ${pgh.sitemapPanelFromRight}`}
            >
              <span
                className={`${pgh.sitemapPanelLabel} ${pgh.sitemapPanelLabelAfter}`}
              >
                Reconstructed
              </span>
              <div className={pgh.sitemapMedia}>
                <Image
                  src="/projects/pgh/sitemap-reconstructed.png"
                  alt="Reconstructed Pittsburgh Children's Museum website sitemap"
                  fill
                  className={`${pgh.sitemapImg} ${pgh.sitemapImgReconstructed}`}
                  sizes="(max-width: 720px) 100vw, 720px"
                />
              </div>
            </article>
          </div>

          <figcaption className={pgh.sitemapCaption}>
            Reorganizing pages around how visitors plan a trip: visit, explore,
            and support, instead of mirroring internal departments.
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
