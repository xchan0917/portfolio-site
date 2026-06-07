import { CanvasSolutionNavDiagram } from "./CanvasSolutionNavDiagram";
import { CanvasSolutionCourseOrderDiagram } from "./CanvasSolutionCourseOrderDiagram";
import cx from "./canvas.module.css";

export function CanvasSolutionShowcase() {
  return (
    <figure
      className={cx.solutionShowcase}
      aria-label="Course navigation UI changes: dropdown menu pathway and course ordering improvements"
    >
      <div className={cx.solutionComparisonGrid}>
        <CanvasSolutionNavDiagram className={cx.solutionComparisonDiagramLeft} />
        <CanvasSolutionCourseOrderDiagram
          className={cx.solutionComparisonDiagramRight}
        />
      </div>
    </figure>
  );
}
