import { CanvasSolutionPanelImage } from "./CanvasSolutionPanelImage";

type CanvasSolutionCalendarTodoDiagramProps = {
  className?: string;
};

/** Calendar + to-do merge diagram (1199×1021 Figma frame, visual crop). */
const VB_W = 1199;
const VB_Y = 200;

const ANNOTATION = "#7c5cad";

const TODO = { x: 21.8718, y: 222, w: 475, h: 270 };
const CALENDAR = { x: 699, y: 222, w: 479, h: 270 };

/** Gap between Y-merge arrow tip and merged calendar panel top. */
const MERGED_BELOW_ARROW = 20;
const MERGE_ARROW_BOTTOM = 567 + 91;
const MERGED = {
  x: 272.872,
  y: MERGE_ARROW_BOTTOM + MERGED_BELOW_ARROW,
  w: 651,
  h: 409,
};

const MERGED_Y_SHIFT = MERGED.y - 604;
const VB_H = 821 + MERGED_Y_SHIFT;

const PLUS_PATH =
  "M613.395 355.119V360.217H584.157V355.119H613.395ZM601.501 342.668V373.723H596.081V342.668H601.501Z";

/** Y-merge arrow from Figma node 545:168 — positioned in the 1199×1021 frame. */
const MERGE_ARROW = { x: 482, y: 567, w: 238.465, h: 91 };

const MERGE_ARROW_HEAD =
  "M118.293 90.7069C118.683 91.0974 119.317 91.0974 119.707 90.7069L126.071 84.3429C126.462 83.9524 126.462 83.3192 126.071 82.9287C125.681 82.5382 125.047 82.5382 124.657 82.9287L119 88.5855L113.343 82.9287C112.953 82.5382 112.319 82.5382 111.929 82.9287C111.538 83.3192 111.538 83.9524 111.929 84.3429L118.293 90.7069ZM119 49.9998L118 49.9998L118 89.9998L119 89.9998L120 89.9998L120 49.9998L119 49.9998Z";

const MERGE_ARROW_RIGHT =
  "M119 49.9998C160.046 8.14663 236.967 8.61968 236.967 8.61968";

const MERGE_ARROW_LEFT =
  "M119 49.9998C78.4183 8.14663 1.49768 8.61968 1.49768 8.61968";

export function CanvasSolutionCalendarTodoDiagram({
  className,
}: CanvasSolutionCalendarTodoDiagramProps) {
  return (
    <svg
      className={className}
      viewBox={`0 ${VB_Y} ${VB_W} ${VB_H}`}
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Calendar and to-do merge: dashboard and calendar views combined into one calendar with inline assignment details"
    >
      <defs>
        <filter
          id="canvasCalendarPanelShadow"
          x="-4%"
          y="-4%"
          width="108%"
          height="112%"
          filterUnits="objectBoundingBox"
        >
          <feDropShadow dx="0" dy="4" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#canvasCalendarPanelShadow)">
        <CanvasSolutionPanelImage
          {...TODO}
          src="/projects/canvas/figma/todo-list-ui.png"
        />
        <CanvasSolutionPanelImage
          {...CALENDAR}
          src="/projects/canvas/figma/calendar-month-ui.png"
        />
        <CanvasSolutionPanelImage
          {...MERGED}
          src="/projects/canvas/figma/calendar-merged-ui.png"
        />
      </g>

      <path d={PLUS_PATH} fill={ANNOTATION} />

      {/* After panels — foreignObject would otherwise occlude the merge arrow. */}
      <g transform={`translate(${MERGE_ARROW.x} ${MERGE_ARROW.y})`}>
        <path d={MERGE_ARROW_HEAD} fill={ANNOTATION} />
        <path
          d={MERGE_ARROW_RIGHT}
          stroke={ANNOTATION}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={MERGE_ARROW_LEFT}
          stroke={ANNOTATION}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <text
        fill={ANNOTATION}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="14"
        fontWeight="400"
      >
        <tspan x="944" y={632 + MERGED_Y_SHIFT}>
          Users will be able to view descriptions
        </tspan>
        <tspan x="944" dy="20">
          of all their assignments directly in
        </tspan>
        <tspan x="944" dy="20">
          their calendars instead of navigating
        </tspan>
        <tspan x="944" dy="20">
          into specific courses
        </tspan>
      </text>
    </svg>
  );
}
