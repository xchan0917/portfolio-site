"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/lib/useInView";
import cx from "./canvas.module.css";

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cx.mvpFlowIcon}>
      <path d="M6 4h9l5 5v13a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 22V5.5A1.5 1.5 0 0 1 6 4z" />
      <path d="M15 4v5h5M8 12h8M8 16h6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cx.mvpFlowIcon}>
      <path d="M7 3v2M17 3v2M5 7h14v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z" />
      <path d="M5 11h14" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cx.mvpFlowIcon}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 10l4 4 4-4" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cx.mvpFlowIcon}>
      <path d="M5 6h14M5 12h10M5 18h8" />
      <path d="M17 12l2 2 4-4" />
    </svg>
  );
}

type CellIcon = "book" | "calendar" | "chevron" | "checklist";

function CellIconGraphic({ type }: { type: CellIcon }) {
  switch (type) {
    case "book":
      return <BookIcon />;
    case "calendar":
      return <CalendarIcon />;
    case "chevron":
      return <ChevronDownIcon />;
    case "checklist":
      return <ChecklistIcon />;
  }
}

type FlowCellProps = {
  label: string;
  header?: boolean;
  dashed?: boolean;
  icon?: CellIcon;
  className?: string;
  style?: CSSProperties;
};

function FlowCell({
  label,
  header,
  dashed,
  icon,
  className,
  style,
}: FlowCellProps) {
  return (
    <div
      className={`${cx.mvpFlowCell} ${header ? cx.mvpFlowCellHeader : ""} ${dashed ? cx.mvpFlowCellDashed : ""} ${cx.mvpFlowCellAnimated} ${className ?? ""}`}
      style={style}
    >
      {icon ? (
        <span className={cx.mvpFlowCellIcon}>
          <CellIconGraphic type={icon} />
        </span>
      ) : null}
      <span className={cx.mvpFlowCellLabel}>{label}</span>
    </div>
  );
}

function MvpFlowArrow({ tick, delay }: { tick?: boolean; delay: number }) {
  return (
    <div
      className={`${cx.mvpFlowArrow} ${cx.mvpFlowCellAnimated}`}
      style={{ "--mvp-cell-delay": `${delay}ms` } as CSSProperties}
      aria-hidden
    >
      <svg viewBox="0 0 48 16" className={cx.mvpFlowArrowSvg}>
        <line x1="2" y1="8" x2="38" y2="8" />
        <path d="M38 4L46 8L38 12" />
        {tick ? <line x1="34" y1="4" x2="34" y2="12" /> : null}
      </svg>
    </div>
  );
}

export function CanvasMvpIntegrationDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${cx.mvpFlow} ${inView ? cx.mvpFlowVisible : ""}`}
      role="img"
      aria-label="MVP comparison: Core LMS courses and calendar map to prototype dropdown and assignments, enabling view courses and detail expansion"
    >
      <div className={cx.mvpFlowCol}>
        <FlowCell label="MVP (Core LMS)" header style={{ "--mvp-cell-delay": "0ms" } as CSSProperties} />
        <FlowCell label="Courses" icon="book" style={{ "--mvp-cell-delay": "140ms" } as CSSProperties} />
        <FlowCell label="Calendar" icon="calendar" style={{ "--mvp-cell-delay": "280ms" } as CSSProperties} />
      </div>

      <div className={cx.mvpFlowArrowCol}>
        <div className={cx.mvpFlowArrowGap} aria-hidden />
        <MvpFlowArrow delay={210} />
        <MvpFlowArrow delay={350} />
      </div>

      <div
        className={`${cx.mvpFlowProtoWrap} ${cx.mvpFlowCellAnimated}`}
        style={{ "--mvp-cell-delay": "70ms" } as CSSProperties}
      >
        <FlowCell label="Prototype Implementation" header style={{ "--mvp-cell-delay": "70ms" } as CSSProperties} />
        <FlowCell
          label="Dropdown arrow"
          icon="chevron"
          dashed
          style={{ "--mvp-cell-delay": "210ms" } as CSSProperties}
        />
        <FlowCell
          label="Assignments"
          icon="checklist"
          dashed
          style={{ "--mvp-cell-delay": "350ms" } as CSSProperties}
        />
      </div>

      <div className={cx.mvpFlowArrowCol}>
        <div className={cx.mvpFlowArrowGap} aria-hidden />
        <MvpFlowArrow tick delay={280} />
        <MvpFlowArrow tick delay={420} />
      </div>

      <div className={cx.mvpFlowCol}>
        <div className={cx.mvpFlowHeaderSpacer} aria-hidden />
        <FlowCell label="View courses" style={{ "--mvp-cell-delay": "350ms" } as CSSProperties} />
        <FlowCell label="Detail Expansion" style={{ "--mvp-cell-delay": "490ms" } as CSSProperties} />
      </div>
    </div>
  );
}
