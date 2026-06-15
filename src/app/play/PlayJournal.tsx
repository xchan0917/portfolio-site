"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type SyntheticEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  dividerDecorations,
  flowerStickerSrc,
  journalIntro,
  journalPages,
  projectStickyColors,
  projectStickyTilts,
  type JournalDoodle,
  type JournalPage,
  type JournalPolaroid,
} from "@/lib/playJournal";
import {
  figmaPageWidthPx,
  pageWireframes,
  slotsBoundingBox,
  type WireframeSlot,
} from "@/lib/playJournalLayouts";
import styles from "./playJournal.module.css";

const AUTO_SCROLL_PX_PER_SEC = 42;
const INACTIVITY_MS = 3200;
const LOOP_COPIES = 3;
const CLUSTER_GAP = 12;
const CLUSTER_CLICK_THRESHOLD = 10;
const MURAL_MIX_ANIMATION_MS = 1500;
const MURAL_REVEAL_HOLD_MS = 2000;

type ShowcaseLightboxContextValue = {
  openItem: (item: JournalPolaroid) => void;
};

const ShowcaseLightboxContext =
  createContext<ShowcaseLightboxContextValue | null>(null);

function mediaKind(src: string): "video" | "gif" | "image" {
  const lower = src.toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".webm")) return "video";
  if (lower.endsWith(".gif")) return "gif";
  return "image";
}

function CollageMedia({
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

  const mediaStyle =
    item.objectFit || item.objectPosition || item.mediaScale != null
      ? ({
          objectFit: item.objectFit,
          objectPosition: item.objectPosition,
          ...(item.mediaScale != null
            ? { transform: `scale(${item.mediaScale})` }
            : {}),
        } as CSSProperties)
      : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt}
      className={className}
      style={mediaStyle}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
}

function stopStripPointer(event: ReactPointerEvent | ReactWheelEvent) {
  event.stopPropagation();
}

function slotStyle(slot: WireframeSlot): CSSProperties {
  return {
    ["--slot-x" as string]: `${slot.xPct}%`,
    ["--slot-y" as string]: `${slot.yPct}%`,
    ["--slot-w" as string]: `${slot.wPct}%`,
    ["--slot-h" as string]: `${slot.hPct}%`,
    ["--slot-rotate" as string]: `${slot.rotate ?? 0}deg`,
  };
}

function CompositionSlot({
  slot,
  className,
  children,
  stackIndex,
}: {
  slot: WireframeSlot;
  className?: string;
  children: ReactNode;
  stackIndex?: number;
}) {
  return (
    <div
      className={`${styles.compositionSlot} ${className ?? ""}`}
      style={
        {
          ...slotStyle(slot),
          ...(stackIndex != null ? { zIndex: stackIndex + 2 } : {}),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

function CollageSticky({
  page,
  slot,
}: {
  page: JournalPage;
  slot: WireframeSlot;
}) {
  const color = projectStickyColors[page.id] ?? "#C8E06A";
  const tilt = slot.rotate ?? projectStickyTilts[page.id] ?? -2;

  return (
    <header
      className={`${styles.stickyNote} ${styles.stickyComposition} ${
        page.id === "ceramics"
          ? styles.stickyCeramics
          : page.id === "murals"
            ? styles.stickyMurals
            : ""
      }`}
      style={
        {
          ...slotStyle(slot),
          "--sticky-color": color,
          "--note-tilt": `${tilt}deg`,
        } as CSSProperties
      }
      onPointerDown={stopStripPointer}
    >
      <h2 className={styles.stickyTitle}>{page.title}</h2>
      {page.subtitle ? (
        <p className={styles.stickySubtitle}>{page.subtitle}</p>
      ) : null}
    </header>
  );
}

const DOODLE_CLASS: Record<
  Exclude<JournalDoodle["type"], "flower" | "sticker">,
  string
> = {
  arrow: styles.pageDoodleArrow,
  star: styles.pageDoodleStar,
  spark: styles.pageDoodleSpark,
  scribble: styles.pageDoodleScribble,
};

function PageDoodles({ doodles }: { doodles?: JournalDoodle[] }) {
  if (!doodles?.length) return null;

  return (
    <div className={styles.pageDoodles} aria-hidden="true">
      {doodles.map((doodle, index) => {
        const style = {
          top: doodle.top,
          left: doodle.left,
          width: doodle.width ?? "24px",
          ["--doodle-rotate" as string]: `${doodle.rotate ?? 0}deg`,
        } as CSSProperties;

        if (doodle.type === "flower") {
          const variant = doodle.variant ?? "large";
          const color = doodle.flowerColor ?? "blue";
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${doodle.type}-${color}-${variant}-${doodle.top}-${index}`}
              src={flowerStickerSrc[color][variant]}
              alt=""
              className={`${styles.pageDoodle} ${styles.pageDoodleFlower}`}
              style={style}
              draggable={false}
            />
          );
        }

        if (doodle.type === "sticker") {
          if (!doodle.stickerSrc) return null;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${doodle.type}-${doodle.stickerSrc}-${doodle.top}-${index}`}
              src={doodle.stickerSrc}
              alt=""
              className={`${styles.pageDoodle} ${styles.pageDoodleSticker}`}
              style={style}
              draggable={false}
            />
          );
        }

        return (
          <span
            key={`${doodle.type}-${doodle.top}-${doodle.left}-${index}`}
            className={`${styles.pageDoodle} ${DOODLE_CLASS[doodle.type]}`}
            style={style}
          />
        );
      })}
    </div>
  );
}

function PageDivider({ dividerIndex }: { dividerIndex: number }) {
  const decorationSrc = dividerDecorations[dividerIndex];

  return (
    <div className={styles.pageDivider} aria-hidden="true">
      <span className={styles.dividerLine} />
      {decorationSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={decorationSrc}
          alt=""
          className={styles.dividerSticker}
          draggable={false}
        />
      ) : null}
    </div>
  );
}

function CollagePolaroid({
  item,
  className,
  variant = "tape",
}: {
  item: JournalPolaroid;
  className?: string;
  variant?: "tape" | "polaroid" | "polaroidFrame";
}) {
  if (variant === "polaroidFrame") {
    return (
      <figure
        className={`${styles.polaroid} ${styles.polaroidFramed} ${className ?? ""}`}
        style={{ ["--tilt" as string]: `${item.rotate ?? 0}deg` }}
        onPointerDown={stopStripPointer}
      >
        <div className={styles.polaroidFrameShell}>
          <div className={styles.polaroidPhotoWindow}>
            <CollageMedia
              item={item}
              className={styles.polaroidImage}
            />
          </div>
          {item.caption ? (
            <figcaption className={styles.polaroidCaptionInFrame}>
              {item.caption}
            </figcaption>
          ) : null}
        </div>
      </figure>
    );
  }

  const frameClass =
    variant === "polaroid" ? styles.polaroidClassic : styles.clipping;

  return (
    <figure
      className={`${styles.polaroid} ${frameClass} ${className ?? ""}`}
      style={{ ["--tilt" as string]: `${item.rotate ?? 0}deg` }}
      onPointerDown={stopStripPointer}
    >
      <div className={styles.polaroidPhoto}>
        <CollageMedia item={item} className={styles.polaroidImage} />
      </div>
      {item.caption ? (
        <figcaption className={styles.polaroidCaption}>{item.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function clusterExpandedWidth(
  frames: NonNullable<JournalPage["frames"]>,
): number {
  return frames.reduce(
    (total, frame, index) =>
      total + frame.w + (index < frames.length - 1 ? CLUSTER_GAP : 0),
    0,
  );
}

const PAGE_HORIZONTAL_PADDING = 96;
/** Trim empty margin on the DoorDash spread (2cm per side at 96dpi). */
const DOORDASH_PAGE_WIDTH_TRIM = Math.round(((2 * 96) / 2.54) * 2);

function resolvePageWidthPx(
  page: JournalPage,
  layout: (typeof pageWireframes)[string],
): number {
  const figmaWidth = figmaPageWidthPx(layout.figmaWidth);
  let width: number;
  if (page.kind === "cluster" && page.frames?.length) {
    const expanded = clusterExpandedWidth(page.frames);
    width = Math.max(figmaWidth, expanded + PAGE_HORIZONTAL_PADDING);
  } else {
    width = figmaWidth;
  }
  if (page.id === "doordash") {
    width -= DOORDASH_PAGE_WIDTH_TRIM;
  }
  return width;
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

function CollageClusterFrames({ page }: { page: JournalPage }) {
  const frames = page.frames!;
  const [expanded, setExpanded] = useState(false);
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
      className={`${styles.compositionClusterFit} ${
        page.id === "doordash" ? styles.compositionClusterFitDoordash : ""
      }`}
    >
      <div
        className={styles.clusterBlock}
        style={{ width: expanded ? expandedWidth : clusterW }}
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

          const isPhoneScreen = page.id === "doordash";

          return (
            <div
              key={frame.src}
              className={`${styles.clusterFrame} ${isPhoneScreen ? styles.clusterFrameScreen : ""} ${isPhoneScreen ? styles.clippingScreen : styles.clipping}`}
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
      {page.id !== "doordash" ? (
        <p className={styles.clusterHint}>
          tap to {expanded ? "collapse" : "spread"}
        </p>
      ) : null}
      </div>
    </div>
  );
}

function CollageSlotGrid({
  page,
  slots,
}: {
  page: JournalPage;
  slots: WireframeSlot[];
}) {
  const items = page.items ?? [];

  return (
    <>
      {items.map((item, index) => {
        const slot = slots[index];
        if (!slot) return null;

        const usePolaroidFrame =
          page.id === "ceramics" || page.id === "photography";
        const polaroidClass =
          page.id === "ceramics"
            ? `${styles.slotPolaroid} ${styles.slotPolaroidCeramics}`
            : page.id === "photography"
              ? `${styles.slotPolaroid} ${styles.slotPolaroidPhotography}`
              : styles.slotPolaroid;

        return (
          <CompositionSlot
            key={item.src}
            slot={slot}
            stackIndex={usePolaroidFrame ? index : undefined}
          >
            <CollagePolaroid
              item={item}
              variant={usePolaroidFrame ? "polaroidFrame" : "tape"}
              className={polaroidClass}
            />
          </CompositionSlot>
        );
      })}
    </>
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

function ShowcaseLightbox({
  item,
  onClose,
}: {
  item: JournalPolaroid;
  onClose: () => void;
}) {
  const close = useCallback(
    (event?: SyntheticEvent) => {
      event?.stopPropagation();
      onClose();
    },
    [onClose],
  );

  return (
    <div
      className={styles.showcaseLightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${item.alt}`}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close(event);
        }
      }}
    >
      <div className={styles.showcaseLightboxInner}>
        <ShowcaseLightboxMedia
          item={item}
          className={styles.showcaseLightboxMedia}
        />
        {item.caption ? (
          <p className={styles.showcaseLightboxCaption}>{item.caption}</p>
        ) : null}
        <button
          type="button"
          className={styles.showcaseLightboxClose}
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            close(event);
          }}
          onClick={(event) => {
            event.stopPropagation();
            close(event);
          }}
          aria-label="Close enlarged view"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function CollageShowcase({
  page,
  slots,
}: {
  page: JournalPage;
  slots: WireframeSlot[];
}) {
  const items = page.items ?? [];
  const showcaseLightbox = useContext(ShowcaseLightboxContext);
  const openItem = showcaseLightbox?.openItem;

  return (
    <>
      {items.map((item, index) => {
        const slot = slots[index];
        if (!slot) return null;

        return (
          <CompositionSlot key={item.src} slot={slot}>
            <figure
              className={`${styles.showcaseCard} ${styles.clipping} ${styles.slotShowcase}`}
              style={{
                ["--tilt" as string]: `${item.rotate ?? (index % 2 === 0 ? -2 : 2)}deg`,
              }}
              onPointerDown={stopStripPointer}
            >
              <button
                type="button"
                className={styles.showcaseTrigger}
                onClick={() => openItem?.(item)}
                aria-haspopup="dialog"
                aria-label={`Click to enlarge: ${item.alt}`}
              >
                <div className={styles.showcaseMedia}>
                  <CollageMedia item={item} className={styles.showcaseImage} />
                  <span className={styles.showcaseZoomHint}>Click to enlarge</span>
                </div>
              </button>
              {item.caption ? (
                <figcaption className={styles.showcaseCaption}>
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          </CompositionSlot>
        );
      })}
    </>
  );
}

function CollageMuralCombine({ page }: { page: JournalPage }) {
  const items = page.items ?? [];
  const [revealed, setRevealed] = useState(false);
  const [animating, setAnimating] = useState(false);

  const triggerCombine = useCallback(() => {
    if (animating || revealed) return;
    setAnimating(true);
    setRevealed(true);
  }, [animating, revealed]);

  const triggerUnmix = useCallback(() => {
    if (animating || !revealed) return;
    setAnimating(true);
    setRevealed(false);
  }, [animating, revealed]);

  useEffect(() => {
    if (!animating) return;
    const id = window.setTimeout(
      () => setAnimating(false),
      MURAL_MIX_ANIMATION_MS,
    );
    return () => window.clearTimeout(id);
  }, [animating]);

  useEffect(() => {
    if (animating || !revealed) return;
    const id = window.setTimeout(triggerUnmix, MURAL_REVEAL_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [animating, revealed, triggerUnmix]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        triggerCombine();
      }
    },
    [triggerCombine],
  );

  if (items.length < 2 || !page.revealSrc) return null;

  const [top, bottom] = items;

  return (
    <figure className={styles.muralCombine} onPointerDown={stopStripPointer}>
      <button
        type="button"
        className={styles.mixCard}
        onClick={triggerCombine}
        onKeyDown={handleKeyDown}
        aria-pressed={revealed}
        aria-label="Mix murals together to reveal full installation"
        disabled={animating || revealed}
      >
        <div
          className={`${styles.muralCombineStage} ${revealed ? styles.mixRevealed : ""} ${animating ? (revealed ? styles.mixAnimating : styles.mixUnmixing) : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.revealSrc}
            alt={page.revealAlt ?? "Combined mural installation"}
            className={styles.mixReveal}
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <div className={styles.muralCombinePair}>
            <div
              className={`${styles.muralCombinePanel} ${styles.muralCombineTop} ${styles.clipping}`}
              style={{ ["--tilt" as string]: `${top.rotate ?? 0}deg` }}
            >
              <CollageMedia item={top} className={styles.muralCombineImage} />
            </div>
            <div
              className={`${styles.muralCombinePanel} ${styles.muralCombineBottom} ${styles.clipping}`}
              style={{ ["--tilt" as string]: `${bottom.rotate ?? 0}deg` }}
            >
              <CollageMedia item={bottom} className={styles.muralCombineImage} />
            </div>
          </div>

          <div className={styles.mixSwirls} aria-hidden="true">
            <span className={`${styles.mixBlob} ${styles.mixBlobRed}`} />
            <span className={`${styles.mixBlob} ${styles.mixBlobGreen}`} />
            <span className={`${styles.mixBlob} ${styles.mixBlobBlue}`} />
            <span className={`${styles.mixBlob} ${styles.mixBlobPink}`} />
            <span className={`${styles.mixBlob} ${styles.mixBlobGold}`} />
          </div>
        </div>

        {!revealed && !animating ? (
          <span className={styles.mixHint}>tap to mix</span>
        ) : null}
      </button>

      {page.caption && page.id !== "murals" ? (
        <figcaption className={styles.muralCombineCaption}>
          {page.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function CollageClusterBody({
  page,
  layout,
}: {
  page: JournalPage;
  layout: (typeof pageWireframes)[string];
}) {
  if (page.kind === "cluster" && page.frames?.length) {
    return (
      <CompositionSlot slot={slotsBoundingBox(layout.contentSlots)}>
        <CollageClusterFrames page={page} />
      </CompositionSlot>
    );
  }
  if (page.kind === "combine" && page.items?.length) {
    return (
      <CompositionSlot
        slot={slotsBoundingBox(layout.contentSlots)}
        className={styles.compositionSlotMural}
      >
        <CollageMuralCombine page={page} />
      </CompositionSlot>
    );
  }
  if (page.kind === "showcase" && page.items?.length) {
    return (
      <CollageShowcase page={page} slots={layout.contentSlots} />
    );
  }
  if (page.items?.length) {
    return <CollageSlotGrid page={page} slots={layout.contentSlots} />;
  }
  return null;
}

const PAGE_PAPER_VARIANTS = [
  styles.pagePaperDot,
  styles.pagePaperLined,
  styles.pagePaperKraft,
] as const;

function CollageCluster({
  page,
  copyIndex,
  pageIndex,
}: {
  page: JournalPage;
  copyIndex: number;
  pageIndex: number;
}) {
  const layout = pageWireframes[page.id];
  const paperClass = PAGE_PAPER_VARIANTS[pageIndex % PAGE_PAPER_VARIANTS.length];
  const pageWidth = resolvePageWidthPx(page, layout);

  return (
    <section
      className={`${styles.collagePage} ${paperClass}`}
      aria-label={page.title}
      data-copy={copyIndex}
      style={{ width: `${pageWidth}px`, maxWidth: "92vw" }}
    >
      <div className={styles.pageInner}>
        <div className={styles.pageComposition}>
          {layout.sticky ? (
            <CollageSticky page={page} slot={layout.sticky} />
          ) : null}
          <CollageClusterBody page={page} layout={layout} />
          <PageDoodles doodles={page.doodles} />
        </div>
        {page.journalNote ? (
          <p
            className={`${styles.clusterNote} ${
              page.id === "doordash" || page.id === "murals"
                ? styles.clusterNoteSide
                : ""
            }`}
          >
            {page.journalNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function CollageSequence({
  copyIndex,
  sequenceRef,
}: {
  copyIndex: number;
  sequenceRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={copyIndex === 0 ? sequenceRef : undefined}
      className={styles.stripSequence}
      aria-hidden={copyIndex > 0 ? true : undefined}
    >
      {journalPages.map((page, pageIndex) => (
          <div key={`${copyIndex}-${page.id}`} className={styles.stripSpread}>
            {pageIndex > 0 ? (
              <PageDivider dividerIndex={pageIndex} />
            ) : null}
            <CollageCluster
              page={page}
              copyIndex={copyIndex}
              pageIndex={pageIndex}
            />
          </div>
        ))}
    </div>
  );
}

function normalizeOffset(offset: number, sequenceWidth: number): number {
  if (sequenceWidth <= 0) return offset;
  let next = offset;
  while (next <= -sequenceWidth) next += sequenceWidth;
  while (next > 0) next -= sequenceWidth;
  return next;
}

export function PlayJournal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const stripViewportRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const sequenceWidthRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const lastDragXRef = useRef(0);
  const lastPointerPosRef = useRef<{ x: number; y: number } | null>(null);

  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<JournalPolaroid | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  const openLightboxItem = useCallback((item: JournalPolaroid) => {
    setLightboxItem(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
  }, []);

  const showcaseLightboxContext = useMemo(
    () => ({ openItem: openLightboxItem }),
    [openLightboxItem],
  );

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!lightboxItem) return;

    setIsInteracting(true);

    const strip = stripViewportRef.current;
    const pointerId = dragPointerIdRef.current;
    if (strip && pointerId != null) {
      try {
        if (strip.hasPointerCapture(pointerId)) {
          strip.releasePointerCapture(pointerId);
        }
      } catch {
        // Ignore release errors when capture was already cleared.
      }
      dragPointerIdRef.current = null;
      setIsDragging(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [closeLightbox, lightboxItem]);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  const measureSequence = useCallback(() => {
    const sequence = sequenceRef.current;
    if (!sequence) return;
    sequenceWidthRef.current = sequence.offsetWidth;
    offsetRef.current = normalizeOffset(offsetRef.current, sequenceWidthRef.current);
    applyTransform();
  }, [applyTransform]);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current != null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    setIsInteracting(true);
    resumeTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
      resumeTimerRef.current = null;
    }, INACTIVITY_MS);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const last = lastPointerPosRef.current;
      const next = { x: event.clientX, y: event.clientY };
      if (
        last &&
        Math.hypot(next.x - last.x, next.y - last.y) < 3
      ) {
        return;
      }
      lastPointerPosRef.current = next;
      scheduleResume();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [scheduleResume]);

  const onWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      offsetRef.current -= delta;
      offsetRef.current = normalizeOffset(
        offsetRef.current,
        sequenceWidthRef.current,
      );
      applyTransform();
      scheduleResume();
    },
    [applyTransform, scheduleResume],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      dragPointerIdRef.current = event.pointerId;
      lastDragXRef.current = event.clientX;
      setIsDragging(true);
      setIsInteracting(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragPointerIdRef.current !== event.pointerId) return;
      const dx = event.clientX - lastDragXRef.current;
      lastDragXRef.current = event.clientX;
      offsetRef.current += dx;
      offsetRef.current = normalizeOffset(
        offsetRef.current,
        sequenceWidthRef.current,
      );
      applyTransform();
    },
    [applyTransform],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragPointerIdRef.current !== event.pointerId) return;
      dragPointerIdRef.current = null;
      setIsDragging(false);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      scheduleResume();
    },
    [scheduleResume],
  );

  useEffect(() => {
    measureSequence();
    const sequence = sequenceRef.current;
    if (!sequence) return;

    const observer = new ResizeObserver(measureSequence);
    observer.observe(sequence);

    const onLoad = () => measureSequence();
    sequence.querySelectorAll("img").forEach((node) => {
      node.addEventListener("load", onLoad);
    });

    window.addEventListener("resize", measureSequence);
    return () => {
      observer.disconnect();
      sequence.querySelectorAll("img").forEach((node) => {
        node.removeEventListener("load", onLoad);
      });
      window.removeEventListener("resize", measureSequence);
    };
  }, [measureSequence]);

  useEffect(() => {
    const tick = (time: number) => {
      const last = lastFrameRef.current;
      lastFrameRef.current = time;

      if (
        last != null &&
        !isInteracting &&
        !isDragging &&
        sequenceWidthRef.current > 0
      ) {
        const dt = (time - last) / 1000;
        offsetRef.current -= AUTO_SCROLL_PX_PER_SEC * dt;
        offsetRef.current = normalizeOffset(
          offsetRef.current,
          sequenceWidthRef.current,
        );
        applyTransform();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [applyTransform, isDragging, isInteracting]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current != null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const copies = Array.from({ length: LOOP_COPIES }, (_, index) => index);

  return (
    <ShowcaseLightboxContext.Provider value={showcaseLightboxContext}>
      <div className={styles.collage}>
        <div className={styles.collageBackdrop} aria-hidden="true" />
        <p className={styles.intro}>{journalIntro}</p>

        <div
          ref={stripViewportRef}
          className={`${styles.stripViewport} ${isDragging ? styles.stripDragging : ""} ${lightboxItem ? styles.stripModalOpen : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onWheel={onWheel}
        >
          <div className={styles.stripPaper}>
            <div ref={trackRef} className={styles.stripTrack}>
              {copies.map((copyIndex) => (
                <CollageSequence
                  key={copyIndex}
                  copyIndex={copyIndex}
                  sequenceRef={copyIndex === 0 ? sequenceRef : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {portalReady &&
        lightboxItem &&
        createPortal(
          <ShowcaseLightbox item={lightboxItem} onClose={closeLightbox} />,
          document.body,
        )}
    </ShowcaseLightboxContext.Provider>
  );
}
