"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import {
  PLAYGROUND_TILE,
  type PlaygroundItem,
  playgroundIntro,
  playgroundItemHeight,
} from "@/lib/playground";
import styles from "./playground.module.css";

type PlaygroundCanvasProps = {
  items: PlaygroundItem[];
};

/** Repeat tiles in each direction so fast pans never show empty space. */
const TILE_RING = [-2, -1, 0, 1, 2] as const;

const FRICTION = 0.91;
const WHEEL_GAIN = 0.22;
const WHEEL_DIRECT_GAIN = 0.85;
const WHEEL_IDLE_MS = 800;
const DRIFT_BOOST = 1.35;
const MIN_VELOCITY = 0.35;
const MAX_VELOCITY = 42;

type Vec2 = { x: number; y: number };

const CLUSTER_LINEUP_GAP = 14;
const CLUSTER_CLICK_THRESHOLD = 10;

function clusterExpandedWidth(frames: NonNullable<PlaygroundItem["frames"]>): number {
  return frames.reduce(
    (total, frame, index) =>
      total + frame.w + (index < frames.length - 1 ? CLUSTER_LINEUP_GAP : 0),
    0,
  );
}

function clusterLineupPosition(
  frames: NonNullable<PlaygroundItem["frames"]>,
  index: number,
): { x: number; y: number; rotate: number; zIndex: number } {
  let x = 0;
  for (let i = 0; i < index; i += 1) {
    x += frames[i].w + CLUSTER_LINEUP_GAP;
  }

  return { x, y: 12, rotate: 0, zIndex: index + 1 };
}

function clampVelocity(v: Vec2): Vec2 {
  const speed = Math.hypot(v.x, v.y);
  if (speed <= MAX_VELOCITY) return v;
  const scale = MAX_VELOCITY / speed;
  return { x: v.x * scale, y: v.y * scale };
}

function PlaygroundClusterCard({
  item,
  dragging,
}: {
  item: PlaygroundItem;
  dragging: boolean;
}) {
  const frames = item.frames!;
  const mediaHeight = playgroundItemHeight(item);
  const expandedWidth = clusterExpandedWidth(frames);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pointerStartRef = useRef<Vec2 | null>(null);
  const active = hovered && !dragging && !expanded;

  const toggleExpanded = useCallback(() => {
    setExpanded((current) => !current);
  }, []);

  const onClusterPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.stopPropagation();
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
    },
    [],
  );

  const onClusterPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.stopPropagation();

      const start = pointerStartRef.current;
      pointerStartRef.current = null;
      if (!start || dragging) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.hypot(dx, dy) < CLUSTER_CLICK_THRESHOLD) {
        toggleExpanded();
      }
    },
    [dragging, toggleExpanded],
  );

  const onClusterKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleExpanded();
      }
    },
    [toggleExpanded],
  );

  return (
    <article
      className={`${styles.card} ${styles.cardCluster} ${expanded ? styles.cardClusterExpanded : ""} ${active ? styles.cardHovered : ""}`}
      data-frame-count={frames.length}
      style={{
        left: item.x,
        top: item.y,
        width: expanded ? expandedWidth : item.w,
        ["--card-rotate" as string]: expanded
          ? "0deg"
          : `${item.rotate ?? 0}deg`,
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        className={`${styles.clusterMedia} ${styles[`accent_${item.accent ?? "cream"}`]}`}
        style={{ height: mediaHeight }}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={
          expanded
            ? `Collapse ${item.title}`
            : `Expand ${item.title} into a row`
        }
        onPointerDown={onClusterPointerDown}
        onPointerUp={onClusterPointerUp}
        onPointerCancel={onClusterPointerUp}
        onKeyDown={onClusterKeyDown}
      >
        {frames.map((frame, index) => {
          const lineup = clusterLineupPosition(frames, index);
          const position = expanded
            ? lineup
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
      <div className={styles.cardCopy}>
        <p className={styles.cardTitle}>{item.title}</p>
        {item.caption ? (
          <p className={styles.cardCaption}>{item.caption}</p>
        ) : null}
      </div>
    </article>
  );
}

function PlaygroundInteractiveCard({
  item,
  dragging,
}: {
  item: PlaygroundItem;
  dragging: boolean;
}) {
  const mediaHeight = playgroundItemHeight(item);
  const fit = item.fit ?? "cover";
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const pointerStartRef = useRef<Vec2 | null>(null);
  const active = hovered && !dragging;
  const stillSrc = item.poster ?? item.image!;
  const gifSrc = item.image!;

  const stopCanvasDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    [],
  );

  const onMediaPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      stopCanvasDrag(event);
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
    },
    [stopCanvasDrag],
  );

  const onMediaPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      stopCanvasDrag(event);

      const start = pointerStartRef.current;
      pointerStartRef.current = null;
      if (!start || dragging || playing) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.hypot(dx, dy) < CLUSTER_CLICK_THRESHOLD) {
        setPlaying(true);
      }
    },
    [dragging, playing, stopCanvasDrag],
  );

  const onMediaKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (playing) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setPlaying(true);
      }
    },
    [playing],
  );

  return (
    <article
      className={`${styles.card} ${styles.cardInteractive} ${active ? styles.cardHovered : ""} ${playing ? styles.cardInteractivePlaying : ""}`}
      style={{
        left: item.x,
        top: item.y,
        width: item.w,
        zIndex: active || playing ? 8 : 6,
        ["--card-rotate" as string]: `${item.rotate ?? 0}deg`,
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPlaying(false);
      }}
    >
      <div
        className={`${styles.cardMedia} ${styles[`accent_${item.accent ?? "cream"}`]} ${fit === "contain" ? styles.cardMediaContain : ""}`}
        style={{ height: mediaHeight }}
        role="button"
        tabIndex={0}
        aria-label={
          playing
            ? "DoorDash AUI demo playing"
            : "Click to play DoorDash AUI demo"
        }
        onPointerDown={onMediaPointerDown}
        onPointerUp={onMediaPointerUp}
        onPointerCancel={onMediaPointerUp}
        onPointerLeave={() => setPlaying(false)}
        onKeyDown={onMediaKeyDown}
        onBlur={() => setPlaying(false)}
      >
        {playing ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={gifSrc}
            alt=""
            className={styles.cardImage}
            style={{ objectFit: fit }}
            draggable={false}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={stillSrc}
            alt=""
            className={styles.cardImage}
            style={{ objectFit: fit }}
            draggable={false}
          />
        )}
      </div>
      <div className={styles.cardCopy}>
        <p className={styles.cardTitle}>{item.title}</p>
        {item.caption ? (
          <p className={styles.cardCaption}>{item.caption}</p>
        ) : null}
      </div>
    </article>
  );
}

function PlaygroundCard({
  item,
  dragging,
}: {
  item: PlaygroundItem;
  dragging: boolean;
}) {
  const mediaHeight = playgroundItemHeight(item);
  const fit = item.fit ?? "cover";
  const isCluster = Boolean(item.frames?.length);

  if (isCluster) {
    return <PlaygroundClusterCard item={item} dragging={dragging} />;
  }

  if (item.playOnClick && item.poster && item.image) {
    return <PlaygroundInteractiveCard item={item} dragging={dragging} />;
  }

  const isGif = item.image?.toLowerCase().endsWith(".gif") ?? false;

  return (
    <article
      className={`${styles.card} ${styles.cardStatic}`}
      style={{
        left: item.x,
        top: item.y,
        width: item.w,
        ["--card-rotate" as string]: `${item.rotate ?? 0}deg`,
      }}
    >
      <div
        className={`${styles.cardMedia} ${styles[`accent_${item.accent ?? "cream"}`]} ${fit === "contain" ? styles.cardMediaContain : ""}`}
        style={{ height: mediaHeight }}
      >
        <Image
          key={item.image}
          src={item.image!}
          alt=""
          fill
          sizes={`${item.w}px`}
          unoptimized={isGif}
          className={styles.cardImage}
          style={{ objectFit: fit }}
          draggable={false}
        />
      </div>
      <div className={styles.cardCopy}>
        <p className={styles.cardTitle}>{item.title}</p>
        {item.caption ? (
          <p className={styles.cardCaption}>{item.caption}</p>
        ) : null}
      </div>
    </article>
  );
}

export function PlaygroundCanvas({ items }: PlaygroundCanvasProps) {
  const [ready, setReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<Vec2>({ x: 0, y: 0 });
  const velocityRef = useRef<Vec2>({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastPointerRef = useRef<Vec2>({ x: 0, y: 0 });
  const pendingDriftRef = useRef<Vec2>({ x: 0, y: 0 });
  const wheelIdleTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const applyTransform = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;
    const { x, y } = offsetRef.current;
    world.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const velocity = velocityRef.current;
    const offset = offsetRef.current;

    if (!draggingRef.current) {
      offset.x += velocity.x;
      offset.y += velocity.y;
      velocity.x *= FRICTION;
      velocity.y *= FRICTION;

      if (Math.abs(velocity.x) < MIN_VELOCITY) velocity.x = 0;
      if (Math.abs(velocity.y) < MIN_VELOCITY) velocity.y = 0;
    }

    applyTransform();

    const moving =
      draggingRef.current ||
      Math.abs(velocity.x) > 0 ||
      Math.abs(velocity.y) > 0;

    if (moving) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, [applyTransform]);

  const startLoop = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const markInteracted = useCallback(() => {
    setHasInteracted((current) => (current ? current : true));
  }, []);

  const clearWheelIdleTimer = useCallback(() => {
    if (wheelIdleTimerRef.current != null) {
      window.clearTimeout(wheelIdleTimerRef.current);
      wheelIdleTimerRef.current = null;
    }
  }, []);

  const scheduleWheelDrift = useCallback(() => {
    clearWheelIdleTimer();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    wheelIdleTimerRef.current = window.setTimeout(() => {
      wheelIdleTimerRef.current = null;

      const pending = pendingDriftRef.current;
      const speed = Math.hypot(pending.x, pending.y);
      if (speed < 2) return;

      velocityRef.current = clampVelocity({
        x: pending.x * DRIFT_BOOST,
        y: pending.y * DRIFT_BOOST,
      });
      pendingDriftRef.current = { x: 0, y: 0 };
      startLoop();
    }, WHEEL_IDLE_MS);
  }, [clearWheelIdleTimer, startLoop]);

  const panBy = useCallback(
    (dx: number, dy: number, { fromWheel = false } = {}) => {
      markInteracted();

      if (fromWheel) {
        offsetRef.current.x -= dx * WHEEL_DIRECT_GAIN;
        offsetRef.current.y -= dy * WHEEL_DIRECT_GAIN;
        pendingDriftRef.current = clampVelocity({
          x: pendingDriftRef.current.x * 0.68 - dx * WHEEL_GAIN,
          y: pendingDriftRef.current.y * 0.68 - dy * WHEEL_GAIN,
        });
        velocityRef.current = { x: 0, y: 0 };
        applyTransform();
        scheduleWheelDrift();
        return;
      }

      clearWheelIdleTimer();
      pendingDriftRef.current = { x: 0, y: 0 };
      offsetRef.current.x += dx;
      offsetRef.current.y += dy;
      velocityRef.current = clampVelocity({ x: dx, y: dy });
      applyTransform();
    },
    [
      applyTransform,
      clearWheelIdleTimer,
      markInteracted,
      scheduleWheelDrift,
    ],
  );

  useEffect(() => {
    const centerCanvas = () => {
      offsetRef.current = {
        x: window.innerWidth / 2 - PLAYGROUND_TILE.w / 2,
        y: window.innerHeight / 2 - PLAYGROUND_TILE.h / 2,
      };
      velocityRef.current = { x: 0, y: 0 };
      applyTransform();
      setReady(true);
    };

    centerCanvas();
    window.addEventListener("resize", centerCanvas);
    return () => window.removeEventListener("resize", centerCanvas);
  }, [applyTransform]);

  useEffect(() => {
    return () => {
      stopLoop();
      clearWheelIdleTimer();
    };
  }, [clearWheelIdleTimer, stopLoop]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;

      draggingRef.current = true;
      setIsDragging(true);
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      velocityRef.current = { x: 0, y: 0 };
      clearWheelIdleTimer();
      pendingDriftRef.current = { x: 0, y: 0 };
      event.currentTarget.setPointerCapture(event.pointerId);
      startLoop();
    },
    [clearWheelIdleTimer, startLoop],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;

      const dx = event.clientX - lastPointerRef.current.x;
      const dy = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };

      if (dx !== 0 || dy !== 0) {
        panBy(dx, dy);
      }
    },
    [panBy],
  );

  const stopDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;

      draggingRef.current = false;
      setIsDragging(false);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      startLoop();
    },
    [startLoop],
  );

  const onWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      panBy(event.deltaX, event.deltaY, { fromWheel: true });
    },
    [panBy],
  );

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const preventScroll = (event: WheelEvent) => {
      event.preventDefault();
    };

    node.addEventListener("wheel", preventScroll, { passive: false });
    return () => node.removeEventListener("wheel", preventScroll);
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`${styles.viewport} ${ready ? styles.viewportReady : ""} ${isDragging ? styles.viewportDragging : ""}`}
      onWheel={onWheel}
    >
      <p
        className={`${styles.hint} ${hasInteracted ? styles.hintHidden : ""}`}
      >
        SCROLL / DRAG TO MOVE
      </p>
      <p className={styles.intro}>{playgroundIntro}</p>

      <div
        ref={worldRef}
        className={styles.world}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        {TILE_RING.flatMap((tileX) =>
          TILE_RING.map((tileY) => (
            <div
              key={`${tileX}-${tileY}`}
              className={styles.tile}
              style={{
                left: tileX * PLAYGROUND_TILE.w,
                top: tileY * PLAYGROUND_TILE.h,
                width: PLAYGROUND_TILE.w,
                height: PLAYGROUND_TILE.h,
              }}
              aria-hidden={tileX !== 0 || tileY !== 0}
            >
              {items.map((item) => (
                <PlaygroundCard
                  key={`${tileX}-${tileY}-${item.id}`}
                  item={item}
                  dragging={isDragging}
                />
              ))}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
