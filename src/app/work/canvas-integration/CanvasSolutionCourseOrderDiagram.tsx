import { CanvasSolutionPanelImage } from "./CanvasSolutionPanelImage";
import {
  COURSE_ORDER_ARROW,
  annotationArrowPath,
} from "./canvasAnnotationArrow";

type CanvasSolutionCourseOrderDiagramProps = {
  className?: string;
};

/** Right diagram — course ordering / color alignment (549×732 Figma crop). */
const VB_W = 549;
const VB_H = 732;

const BEFORE = { x: 4, y: 317.01, w: 356.023, h: 406.99 };
const AFTER = { x: 195.023, y: 0, w: 349.006, h: 434.01 };

const ANNOTATION_ARROW = "#6b4f5c";
const ANNOTATION_TEXT = "#1c1524";

/** Before-panel “Chinese Calligraphy” → after-panel pink “Application Design” square. */
const ARROW_TRANSFORM =
  "translate(190.50 342.98) rotate(-2.47) scale(0.7182) translate(-0.999 -287.38)";

/** Shrink mockups so annotation copy can sit on empty margin space. */
const UI_SCALE = 0.76;
const UI_OFFSET = { x: 108, y: 28 };
const UI_TRANSFORM = `translate(${UI_OFFSET.x} ${UI_OFFSET.y}) scale(${UI_SCALE})`;

/** Arrow is already in viewBox space — do not re-scale with the panel group. */
const ARROW_UI_TRANSFORM = ARROW_TRANSFORM;

export function CanvasSolutionCourseOrderDiagram({
  className,
}: CanvasSolutionCourseOrderDiagramProps) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Canvas course list redesign: consistent course order and color alignment with annotation arrow"
    >
      <text
        fill={ANNOTATION_TEXT}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="14"
        fontWeight="400"
        textAnchor="end"
      >
        <tspan x="218" y="98">
          Enhancing visualization
        </tspan>
        <tspan x="218" dy="20">
          through consistent course
        </tspan>
        <tspan x="218" dy="20">
          order and color alignment
        </tspan>
      </text>

      <g transform={UI_TRANSFORM}>
        <CanvasSolutionPanelImage
          {...BEFORE}
          src="/projects/canvas/figma/course-nav-3.png"
        />
        <CanvasSolutionPanelImage
          {...AFTER}
          src="/projects/canvas/figma/course-nav-0.png"
        />
      </g>

      <g transform={ARROW_UI_TRANSFORM}>
        <path d={annotationArrowPath(COURSE_ORDER_ARROW)} fill={ANNOTATION_ARROW} />
      </g>
    </svg>
  );
}
