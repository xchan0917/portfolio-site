import { CanvasSolutionPanelImage } from "./CanvasSolutionPanelImage";
import {
  NAV_DROPDOWN_ARROW,
  annotationArrowheadPath,
} from "./canvasAnnotationArrow";

type CanvasSolutionNavDiagramProps = {
  className?: string;
};

/** Left diagram — dropdown menu pathway (526×639 Figma crop). */
const VB_W = 526;
/** Extra headroom so the arrow arch above 70332 is not clipped. */
const VB_TOP = -102;
const VB_H = 639 - VB_TOP;

const BEFORE = { x: 0, y: 0, w: 214.066, h: 376.755 };
const AFTER = { x: 194.022, y: 220.73, w: 327.912, h: 410.124 };

const ANNOTATION_ARROW = "#6b4f5c";
const ANNOTATION_TEXT = "#1c1524";
/** Tail → 70332 header; tip → 67272 ^ caret (viewBox coords, panels at UI_SCALE). */
const ARROW_TRANSFORM = "matrix(0.6825 0 0 2.0883 83.02 40.80)";
/** Shrink mockups so annotation copy can sit on empty margin space. */
const UI_SCALE = 0.76;
const UI_OFFSET = { x: 8, y: 82 };

const UI_TRANSFORM = `translate(${UI_OFFSET.x} ${UI_OFFSET.y}) scale(${UI_SCALE})`;

/** Arrow is in viewBox space — do not re-scale with the panel group. */
const ARROW_UI_TRANSFORM = ARROW_TRANSFORM;

export function CanvasSolutionNavDiagram({ className }: CanvasSolutionNavDiagramProps) {
  return (
    <svg
      className={className}
      viewBox={`0 ${VB_TOP} ${VB_W} ${VB_H}`}
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Course navigation before and after: dropdown menu pathway with annotation arrow"
    >
      <text
        fill={ANNOTATION_TEXT}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="14"
        fontWeight="400"
      >
        <tspan x="278" y="50">
          Increasing user pathway to
        </tspan>
        <tspan x="278" dy="20">
          include a dropdown menu
        </tspan>
      </text>

      <g transform={UI_TRANSFORM}>
        <CanvasSolutionPanelImage
          {...BEFORE}
          src="/projects/canvas/figma/course-nav-1.png"
        />
        <CanvasSolutionPanelImage
          {...AFTER}
          src="/projects/canvas/figma/course-nav-4.png"
        />
      </g>

      <g transform={ARROW_UI_TRANSFORM}>
        <path d={NAV_DROPDOWN_ARROW.bodyPath} fill={ANNOTATION_ARROW} />
        <path
          d={annotationArrowheadPath(NAV_DROPDOWN_ARROW)}
          fill={ANNOTATION_ARROW}
        />
      </g>
    </svg>
  );
}
