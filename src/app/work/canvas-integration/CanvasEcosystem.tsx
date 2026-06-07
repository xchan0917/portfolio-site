"use client";

import Image from "next/image";
import { useCallback, useState, type CSSProperties } from "react";
import cx from "./canvas.module.css";

type OrbitNode = {
  label: string;
  icon: React.ReactNode;
};

const NODES: OrbitNode[] = [
  {
    label: "calendar",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden className={cx.ecosystemIcon}>
        <rect x="5" y="7" width="22" height="20" rx="2.5" />
        <path d="M5 12h22M11 5v4M21 5v4" />
      </svg>
    ),
  },
  {
    label: "assignments",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden className={cx.ecosystemIcon}>
        <path d="M8 6h12l6 6v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        <path d="M20 6v6h6M10 17h12M10 22h8" />
      </svg>
    ),
  },
  {
    label: "deadlines",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden className={cx.ecosystemIcon}>
        <circle cx="16" cy="17" r="10" />
        <path d="M16 11v7l4.5 2.5M13 5h6" />
      </svg>
    ),
  },
  {
    label: "communication",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden className={cx.ecosystemIcon}>
        <path d="M5 9h22v12a2 2 0 0 1-2 2H11l-6 5V9z" />
        <circle cx="23" cy="23" r="5" />
        <path d="M21.5 23l1.2 1.2 2.8-2.8" />
      </svg>
    ),
  },
  {
    label: "quizzes",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden className={cx.ecosystemIcon}>
        <path d="M9 7h14v18H9z" />
        <path d="M12 12h8M12 16h8M12 20h5" />
        <path d="M12 12l2 2-2 2M20 16h-3" />
      </svg>
    ),
  },
];

const NODE_COUNT = NODES.length;
const ORBIT_DURATION_S = 72;

export function CanvasEcosystem() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const onNodeEnter = useCallback((index: number) => {
    setActiveIndex(index);
    setPaused(true);
  }, []);

  const onNodeLeave = useCallback(() => {
    setActiveIndex(null);
    setPaused(false);
  }, []);

  return (
    <div
      className={`${cx.ecosystem} ${paused ? cx.ecosystemPaused : ""}`}
      role="img"
      aria-label="Canvas at the center of student workflows: calendar, assignments, deadlines, communication, and quizzes orbit around the platform"
      onMouseLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onNodeLeave();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onNodeLeave();
      }}
    >
      <div className={cx.ecosystemHub}>
        <Image
          src="/projects/canvas/canvas-logo.png"
          alt=""
          width={492}
          height={389}
          className={cx.ecosystemHubLogo}
          priority={false}
        />
      </div>

      <div
        className={cx.ecosystemOrbitTrack}
        style={{ "--orbit-duration": `${ORBIT_DURATION_S}s` } as CSSProperties}
      >
        {NODES.map((node, index) => (
          <div
            key={node.label}
            className={cx.ecosystemOrbitNode}
            style={
              {
                "--node-angle": `${-90 + (360 / NODE_COUNT) * index}deg`,
              } as CSSProperties
            }
          >
            <div className={cx.ecosystemOrbitNodeUpright}>
              <div className={cx.ecosystemOrbitNodeCounter}>
                <button
                  type="button"
                  className={`${cx.ecosystemNodeBtn} ${activeIndex === index ? cx.ecosystemNodeBtnActive : ""}`}
                  onMouseEnter={() => onNodeEnter(index)}
                  onFocus={() => onNodeEnter(index)}
                  aria-label={node.label}
                >
                <span className={cx.ecosystemNodeCircle}>{node.icon}</span>
                <span className={cx.ecosystemNodeLabel}>{node.label}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
