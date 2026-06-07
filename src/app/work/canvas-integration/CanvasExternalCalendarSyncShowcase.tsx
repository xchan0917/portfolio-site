import { CanvasExternalCalendarSyncDiagram } from "./CanvasExternalCalendarSyncDiagram";
import cx from "./canvas.module.css";

export function CanvasExternalCalendarSyncShowcase() {
  return (
    <figure
      className={`${cx.solutionShowcase} ${cx.syncShowcase}`}
      aria-label="External calendar sync diagram"
    >
      <CanvasExternalCalendarSyncDiagram />
    </figure>
  );
}
