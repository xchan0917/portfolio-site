import { CanvasSolutionCalendarTodoDiagram } from "./CanvasSolutionCalendarTodoDiagram";
import cx from "./canvas.module.css";

export function CanvasSolutionCalendarTodoShowcase() {
  return (
    <figure
      className={cx.solutionShowcase}
      aria-label="Calendar and to-do list merged into one view with inline assignment details"
    >
      <CanvasSolutionCalendarTodoDiagram className={cx.solutionShowcaseDiagram} />
    </figure>
  );
}
