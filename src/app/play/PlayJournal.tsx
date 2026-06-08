"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  journalIntro,
  journalPages,
  type JournalPage,
  type JournalPolaroid,
} from "@/lib/playJournal";
import styles from "./playJournal.module.css";

const CLUSTER_GAP = 12;
const CLUSTER_CLICK_THRESHOLD = 10;

function clusterExpandedWidth(
  frames: NonNullable<JournalPage["frames"]>,
): number {
  return frames.reduce(
    (total, frame, index) =>
      total + frame.w + (index < frames.length - 1 ? CLUSTER_GAP : 0),
    0,
  );
}

function clusterLineupX(
  frames: NonNullable<JournalPage["frames"]>,
  index: number,
): number {
  let x = 0;
  for (let i = 0; i < index; i += 1) {
    x += frames[i].w + CLUSTER_GAP;
  }
  return x;
}

function mediaKind(src: string): "video" | "gif" | "image" {
  const lower = src.toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".webm")) return "video";
  if (lower.endsWith(".gif")) return "gif";
  return "image";
}

function JournalMedia({
  item,
  className,
}: {
  item: JournalPolaroid;
  className?: string;
}) {
  const kind = mediaKind(item.src);

  if (kind === "video") {
    return (
      <video
        src={item.src}
        className={className}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt}
      className={className}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}

function JournalCluster({ page }: { page: JournalPage }) {
  const frames = page.frames!;
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const expandedWidth = clusterExpandedWidth(frames);
  const clusterW = page.clusterW ?? 360;
  const clusterH = page.clusterH ?? 320;

  const toggleExpanded = useCallback(() => {
    setExpanded((current) => !current);
  }, []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.stopPropagation();
      const start = pointerStartRef.current;
      pointerStartRef.current = null;
      if (!start) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.hypot(dx, dy) < CLUSTER_CLICK_THRESHOLD) {
        toggleExpanded();
      }
    },
    [toggleExpanded],
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleExpanded();
      }
    },
    [toggleExpanded],
  );

  return (
    <div
      className={`${styles.cluster} ${expanded ? styles.clusterExpanded : ""} ${hovered ? styles.clusterHovered : ""}`}
      style={{ width: expanded ? expandedWidth : clusterW }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        className={styles.clusterStage}
        style={{ height: clusterH }}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={
          expanded
            ? `Collapse ${page.title}`
            : `Expand ${page.title} into a row`
        }
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {frames.map((frame, index) => {
          const lineupX = clusterLineupX(frames, index);
          const position = expanded
            ? { x: lineupX, y: 10, rotate: 0, zIndex: index + 1 }
            : {
                x: frame.x,
                y: frame.y,
                rotate: frame.rotate ?? 0,
                zIndex: frame.zIndex ?? 1,
              };

          return (
            <div
              key={frame.src}
              className={styles.clusterFrame}
              style={{
                left: position.x,
                top: position.y,
                width: frame.w,
                aspectRatio: `${frame.imgW} / ${frame.imgH}`,
                transform: `rotate(${position.rotate}deg)`,
                zIndex: position.zIndex,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={frame.src}
                alt=""
                className={styles.clusterFrameImage}
                draggable={false}
              />
            </div>
          );
        })}
      </div>
      <p className={styles.clusterHint}>tap to {expanded ? "collapse" : "spread"}</p>
    </div>
  );
}

function JournalGrid({ items }: { items: JournalPolaroid[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <figure
          key={item.src}
          className={styles.polaroid}
          style={{ ["--tilt" as string]: `${item.rotate ?? 0}deg` }}
        >
          <div className={styles.polaroidPhoto}>
            <JournalMedia item={item} className={styles.polaroidImage} />
          </div>
          {item.caption ? (
            <figcaption className={styles.polaroidCaption}>{item.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

function ShowcaseLightboxMedia({
  item,
  className,
}: {
  item: JournalPolaroid;
  className?: string;
}) {
  const kind = mediaKind(item.src);

  if (kind === "video") {
    return (
      <video
        src={item.src}
        className={className}
        muted
        loop
        playsInline
        autoPlay
        controls
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt}
      className={className}
      draggable={false}
    />
  );
}

function JournalShowcase({ items }: { items: JournalPolaroid[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active == null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  const activeItem = active != null ? items[active] : null;

  return (
    <>
      <div className={styles.showcase}>
        {items.map((item, index) => (
          <figure key={item.src} className={styles.showcaseCard}>
            <button
              type="button"
              className={styles.showcaseTrigger}
              onClick={() => setActive(index)}
              aria-haspopup="dialog"
              aria-expanded={active === index}
              aria-label={`Click to enlarge: ${item.alt}`}
            >
              <div className={styles.showcaseMedia}>
                <JournalMedia item={item} className={styles.showcaseImage} />
                <span className={styles.showcaseZoomHint}>Click to enlarge</span>
              </div>
            </button>
            {item.caption ? (
              <figcaption className={styles.showcaseCaption}>
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {portalReady &&
        activeItem &&
        createPortal(
          <div
            className={styles.showcaseLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged view: ${activeItem.alt}`}
            onClick={close}
          >
            <div
              className={styles.showcaseLightboxInner}
              onClick={(event) => event.stopPropagation()}
            >
              <ShowcaseLightboxMedia
                item={activeItem}
                className={styles.showcaseLightboxMedia}
              />
              {activeItem.caption ? (
                <p className={styles.showcaseLightboxCaption}>
                  {activeItem.caption}
                </p>
              ) : null}
              <button
                type="button"
                className={styles.showcaseLightboxClose}
                onClick={close}
                aria-label="Close enlarged view"
              >
                Close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function JournalFeature({ items }: { items: JournalPolaroid[] }) {
  const item = items[0];
  if (!item) return null;

  return (
    <figure
      className={styles.feature}
      style={{ ["--tilt" as string]: `${item.rotate ?? 0}deg` }}
    >
      <div className={styles.featurePhoto}>
        <JournalMedia item={item} className={styles.featureImage} />
      </div>
      {item.caption ? (
        <figcaption className={styles.featureCaption}>{item.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function JournalFlipCard({ item }: { item: JournalPolaroid }) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = useCallback(() => {
    setFlipped((current) => !current);
  }, []);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFlip();
      }
    },
    [toggleFlip],
  );

  return (
    <button
      type="button"
      className={styles.flipCard}
      onClick={toggleFlip}
      onKeyDown={handleKeyDown}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? "Show mural detail panels"
          : "Show full stair mural installation"
      }
    >
      <div
        className={`${styles.flipInner} ${flipped ? styles.flipFlipped : ""}`}
      >
        <div className={styles.flipFace}>
          <JournalMedia item={item} className={styles.flipImage} />
        </div>
        <div className={`${styles.flipFace} ${styles.flipBack}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.flipSrc}
            alt={item.flipAlt ?? item.alt}
            className={styles.flipImage}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </button>
  );
}

function JournalStack({ items }: { items: JournalPolaroid[] }) {
  return (
    <div className={styles.stack}>
      {items.map((item, index) => (
        <figure
          key={item.src}
          className={styles.stackCard}
          style={{
            ["--tilt" as string]: `${item.rotate ?? 0}deg`,
            ["--stack-i" as string]: String(index),
          }}
        >
          {item.flipSrc ? (
            <JournalFlipCard item={item} />
          ) : (
            <JournalMedia item={item} className={styles.stackImage} />
          )}
          {item.caption ? (
            <figcaption className={styles.stackCaption}>{item.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

function JournalPageBody({ page }: { page: JournalPage }) {
  if (page.kind === "cluster" && page.frames?.length) {
    return <JournalCluster page={page} />;
  }
  if (page.kind === "stack" && page.items?.length) {
    return <JournalStack items={page.items} />;
  }
  if (page.kind === "showcase" && page.items?.length) {
    return <JournalShowcase items={page.items} />;
  }
  if (page.kind === "feature" && page.items?.length) {
    return <JournalFeature items={page.items} />;
  }
  if (page.items?.length) {
    return <JournalGrid items={page.items} />;
  }
  return null;
}

export function PlayJournal() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToPage = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const next = Math.max(0, Math.min(index, journalPages.length - 1));
    const pageEl = viewport.querySelector<HTMLElement>(
      `[data-page-index="${next}"]`,
    );
    pageEl?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveIndex(next);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => {
      const pages = viewport.querySelectorAll<HTMLElement>("[data-page-index]");
      const left = viewport.scrollLeft;
      let closest = 0;
      let minDist = Infinity;

      pages.forEach((page) => {
        const index = Number(page.dataset.pageIndex);
        const dist = Math.abs(page.offsetLeft - left);
        if (dist < minDist) {
          minDist = dist;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToPage(activeIndex + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToPage(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, scrollToPage]);

  return (
    <div className={styles.journal}>
      <p className={styles.intro}>{journalIntro}</p>
      <p className={styles.hint}>scroll →</p>

      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.track}>
          {journalPages.map((page, index) => (
            <article
              key={page.id}
              data-page-index={index}
              className={`${styles.spread} ${styles[`accent_${page.accent}`]}`}
            >
              <div
                className={`${styles.paper} ${page.kind === "showcase" ? styles.paperShowcase : ""}`}
              >
                <div className={styles.paperTexture} aria-hidden="true" />
                <header className={styles.pageHeader}>
                  <div>
                    <h2 className={styles.pageTitle}>{page.title}</h2>
                    {page.subtitle ? (
                      <p className={styles.pageSubtitle}>{page.subtitle}</p>
                    ) : null}
                  </div>
                </header>
                <div
                  className={`${styles.pageBody} ${page.kind === "showcase" ? styles.pageBodyShowcase : ""}`}
                >
                  <JournalPageBody page={page} />
                </div>
                <div className={styles.doodles} aria-hidden="true">
                  <span>✦</span>
                  <span>☁</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <nav className={styles.pager} aria-label="Journal pages">
        {journalPages.map((page, index) => (
          <button
            key={page.id}
            type="button"
            className={`${styles.pagerDot} ${index === activeIndex ? styles.pagerDotActive : ""}`}
            aria-label={`Go to ${page.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => scrollToPage(index)}
          />
        ))}
      </nav>
    </div>
  );
}
