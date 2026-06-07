import cx from "./canvas.module.css";

const SYNC_LOGOS = [
  { src: "/projects/canvas/sync-google.png", alt: "Google Calendar" },
  { src: "/projects/canvas/sync-apple.png", alt: "Apple Calendar" },
  { src: "/projects/canvas/sync-outlook.png", alt: "Microsoft Outlook" },
] as const;

const PHONE = { cx: 95, r: 52 };
const ARROW_START_X = PHONE.cx + PHONE.r + 2;
const PANEL = { x: 318, w: 400, h: 84, rx: 14 };
const TOP_Y = 38;
/** Room for sync arcs + label between the two panels. */
const PANEL_GAP = 88;
const BOTTOM_Y = TOP_Y + PANEL.h + PANEL_GAP;
const SYNC_CY = TOP_Y + PANEL.h + PANEL_GAP / 2;
const SYNC = { cx: PANEL.x + PANEL.w / 2, r: 26 };
const SYNC_MARKER_LEN = 4.5;
/** Degrees the marker tip extends past each path end. */
const SYNC_MARKER_ANGULAR_DEG = (SYNC_MARKER_LEN / SYNC.r) * (180 / Math.PI);
/** Visible gap between arrow tip and the next arc's tail. */
const SYNC_TIP_TAIL_GAP_DEG = 24;
/** Path endpoint inset at top/bottom junctions (accounts for marker length). */
const SYNC_ARC_GAP_DEG =
  (SYNC_MARKER_ANGULAR_DEG + SYNC_TIP_TAIL_GAP_DEG) / 2;
/** Left arc: bottom → top along the left side. Right arc: top → bottom along the right. */
const SYNC_ARC_LEFT = {
  start: 90 + SYNC_ARC_GAP_DEG,
  end: 270 - SYNC_ARC_GAP_DEG,
};
const SYNC_ARC_RIGHT = {
  start: 270 + SYNC_ARC_GAP_DEG,
  end: 90 - SYNC_ARC_GAP_DEG,
};

function syncArcPoint(
  cx: number,
  cy: number,
  r: number,
  degrees: number,
): { x: number; y: number } {
  const rad = (degrees * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function syncArcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const start = syncArcPoint(cx, cy, r, startDeg);
  const end = syncArcPoint(cx, cy, r, endDeg);
  return `M${start.x.toFixed(2)} ${start.y.toFixed(2)} A${r} ${r} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}
const ARROW_PANEL_GAP = 22;
const ARROW_END_X = PANEL.x - ARROW_PANEL_GAP;
const ARROW_SPAN = ARROW_END_X - ARROW_START_X;
const ARROW_CP1_X = ARROW_START_X + ARROW_SPAN * 0.45;
const ARROW_CP2_X = ARROW_END_X - ARROW_SPAN * 0.35;

export function CanvasExternalCalendarSyncDiagram() {
  const topCenterY = TOP_Y + PANEL.h / 2;
  const bottomCenterY = BOTTOM_Y + PANEL.h / 2;
  const hubY = (TOP_Y + BOTTOM_Y + PANEL.h) / 2;

  return (
    <svg
      className={cx.syncDiagramSvg}
      viewBox={`0 0 ${PANEL.x + PANEL.w + 24} ${BOTTOM_Y + PANEL.h + 18}`}
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="External calendar sync: mobile device connects Canvas Calendar with Google, Apple, and Outlook calendars"
    >
      <defs>
        <marker
          id="syncArrowHead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0 0L8 4L0 8Z" className={cx.syncDiagramMarker} />
        </marker>
        <marker
          id="syncArrowHeadSmall"
          markerWidth="5"
          markerHeight="5"
          refX="0"
          refY="2.25"
          orient="auto"
          markerUnits="userSpaceOnChange"
        >
          <path
            d="M0 0L4.5 2.25L0 4.5Z"
            className={cx.syncDiagramMarker}
            stroke="none"
          />
        </marker>
      </defs>

      {/* Device hub */}
      <circle
        cx={PHONE.cx}
        cy={hubY}
        r={PHONE.r}
        className={cx.syncDiagramPhoneCircle}
      />
      <g
        transform={`translate(${PHONE.cx} ${hubY})`}
        className={cx.syncDiagramPhoneIcon}
      >
        <rect
          x="-14"
          y="-24"
          width="28"
          height="48"
          rx="4"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle cx="0" cy="18" r="2.5" fill="currentColor" />
      </g>

      {/* Fork connectors */}
      <path
        d={`M${ARROW_START_X} ${hubY} C${ARROW_CP1_X} ${hubY} ${ARROW_CP2_X} ${topCenterY} ${ARROW_END_X} ${topCenterY}`}
        className={cx.syncDiagramConnector}
        markerEnd="url(#syncArrowHead)"
      />
      <path
        d={`M${ARROW_START_X} ${hubY} C${ARROW_CP1_X} ${hubY} ${ARROW_CP2_X} ${bottomCenterY} ${ARROW_END_X} ${bottomCenterY}`}
        className={cx.syncDiagramConnector}
        markerEnd="url(#syncArrowHead)"
      />

      {/* Canvas Calendar panel */}
      <rect
        x={PANEL.x}
        y={TOP_Y}
        width={PANEL.w}
        height={PANEL.h}
        rx={PANEL.rx}
        className={cx.syncDiagramPanel}
      />
      <text
        x={PANEL.x + PANEL.w / 2}
        y={TOP_Y + PANEL.h / 2 + 8}
        textAnchor="middle"
        className={cx.syncDiagramPanelTitle}
      >
        Canvas Calendar
      </text>

      {/* External calendars panel */}
      <rect
        x={PANEL.x}
        y={BOTTOM_Y}
        width={PANEL.w}
        height={PANEL.h}
        rx={PANEL.rx}
        className={cx.syncDiagramPanel}
      />
      <foreignObject
        x={PANEL.x + 50}
        y={BOTTOM_Y + 14}
        width={PANEL.w - 100}
        height={PANEL.h - 28}
      >
        <div className={cx.syncDiagramLogos}>
          {SYNC_LOGOS.map((logo) => (
            <span key={logo.alt} className={cx.syncDiagramLogoChip}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={logo.alt} />
            </span>
          ))}
        </div>
      </foreignObject>

      {/* Sync badge between panels */}
      <g transform={`translate(${SYNC.cx} ${SYNC_CY})`}>
        <g className={cx.syncDiagramSyncArrows}>
          <path
            d={syncArcPath(0, 0, SYNC.r, SYNC_ARC_LEFT.start, SYNC_ARC_LEFT.end)}
            className={cx.syncDiagramSyncArrow}
            markerEnd="url(#syncArrowHeadSmall)"
          />
          <path
            d={syncArcPath(0, 0, SYNC.r, SYNC_ARC_RIGHT.start, SYNC_ARC_RIGHT.end)}
            className={cx.syncDiagramSyncArrow}
            markerEnd="url(#syncArrowHeadSmall)"
          />
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="12s"
            repeatCount="indefinite"
          />
        </g>
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          className={cx.syncDiagramSyncLabel}
        >
          Sync
        </text>
      </g>
    </svg>
  );
}
