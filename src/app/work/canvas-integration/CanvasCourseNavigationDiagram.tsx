import {
  COURSE_NAV_ARROW_2,
  NAV_DROPDOWN_ARROW,
  annotationArrowPath,
} from "./canvasAnnotationArrow";

type CanvasCourseNavigationDiagramProps = {
  className?: string;
};

const VB_W = 1200;
const VB_H = 857;
const ANNOTATION = "#7c5cad";

/** Panel rects from `course-navigation-ui.svg` (Figma export). */
const LEFT_BEFORE = { x: 0, y: 144, w: 214.066, h: 376.755 };
const LEFT_AFTER = { x: 194.022, y: 364.73, w: 327.912, h: 410.124 };
const RIGHT_AFTER = { x: 846, y: 125, w: 349.006, h: 434.01 };
const RIGHT_BEFORE = { x: 654.977, y: 442.01, w: 356.023, h: 406.99 };

function PanelImage({
  x,
  y,
  w,
  h,
  src,
  clipId,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  clipId: string;
}) {
  return (
    <g clipPath={`url(#${clipId})`}>
      <image
        href={src}
        x={x}
        y={y}
        width={w}
        height={h}
        preserveAspectRatio="xMidYMid slice"
      />
    </g>
  );
}

export function CanvasCourseNavigationDiagram({
  className,
}: CanvasCourseNavigationDiagramProps) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Course navigation UI changes: dropdown menu pathway and course ordering improvements"
    >
      <defs>
        <filter
          id="courseNavPanelShadow"
          x="-8%"
          y="-6%"
          width="116%"
          height="116%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.22" />
        </filter>
        <clipPath id="courseNavLeftBeforeClip">
          <rect
            x={LEFT_BEFORE.x}
            y={LEFT_BEFORE.y}
            width={LEFT_BEFORE.w}
            height={LEFT_BEFORE.h}
            rx="10"
          />
        </clipPath>
        <clipPath id="courseNavLeftAfterClip">
          <rect
            x={LEFT_AFTER.x}
            y={LEFT_AFTER.y}
            width={LEFT_AFTER.w}
            height={LEFT_AFTER.h}
            rx="10"
          />
        </clipPath>
        <clipPath id="courseNavRightAfterClip">
          <rect
            x={RIGHT_AFTER.x}
            y={RIGHT_AFTER.y}
            width={RIGHT_AFTER.w}
            height={RIGHT_AFTER.h}
            rx="10"
          />
        </clipPath>
        <clipPath id="courseNavRightBeforeClip">
          <rect
            x={RIGHT_BEFORE.x}
            y={RIGHT_BEFORE.y}
            width={RIGHT_BEFORE.w}
            height={RIGHT_BEFORE.h}
            rx="10"
          />
        </clipPath>
      </defs>

      <rect width={VB_W} height={VB_H} fill="#f5f3f0" />

      <g filter="url(#courseNavPanelShadow)">
        <PanelImage
          {...LEFT_BEFORE}
          src="/projects/canvas/figma/course-nav-1.png"
          clipId="courseNavLeftBeforeClip"
        />
        <PanelImage
          {...LEFT_AFTER}
          src="/projects/canvas/figma/course-nav-4.png"
          clipId="courseNavLeftAfterClip"
        />
        <PanelImage
          {...RIGHT_AFTER}
          src="/projects/canvas/figma/course-nav-0.png"
          clipId="courseNavRightAfterClip"
        />
        <PanelImage
          {...RIGHT_BEFORE}
          src="/projects/canvas/figma/course-nav-3.png"
          clipId="courseNavRightBeforeClip"
        />
      </g>

      <g transform="matrix(1.534 0 0 3.714 303 -69.4)">
        <path d={annotationArrowPath(NAV_DROPDOWN_ARROW)} fill={ANNOTATION} />
      </g>
      <g transform="matrix(1.12 0 0 1.12 668 358)">
        <path d={annotationArrowPath(COURSE_NAV_ARROW_2)} fill={ANNOTATION} />
      </g>

      <text
        fill={ANNOTATION}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="16"
        fontWeight="400"
      >
        <tspan x="307" y="241">
          Increasing user pathway to
        </tspan>
        <tspan x="307" dy="22">
          include a dropdown menu
        </tspan>
      </text>

      <text
        fill={ANNOTATION}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="16"
        fontWeight="400"
      >
        <tspan x="564" y="357">
          Enhancing visualization
        </tspan>
        <tspan x="564" dy="22">
          through consistent course
        </tspan>
        <tspan x="564" dy="22">
          order and color alignment
        </tspan>
      </text>
    </svg>
  );
}
