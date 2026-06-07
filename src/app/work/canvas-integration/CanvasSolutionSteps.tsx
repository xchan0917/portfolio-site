import type { ReactNode } from "react";
import cx from "./canvas.module.css";

export type CanvasSolutionStep = {
  step: string;
  title: string;
  body: string;
  /** Optional full-width visual rendered below this step card. */
  showcase?: ReactNode;
};

function SolutionStepCard({ step, title, body }: CanvasSolutionStep) {
  return (
    <article className={cx.solutionStep}>
      <span className={cx.solutionStepBar} aria-hidden />
      <span className={cx.solutionStepNum}>{step}</span>
      <h3 className={cx.solutionStepTitle}>{title}</h3>
      <p className={cx.solutionStepBody}>{body}</p>
    </article>
  );
}

export function CanvasSolutionSteps({
  steps,
  leadStep,
  leadContent,
}: {
  steps: CanvasSolutionStep[];
  /** First step rendered full-width above the grid, with optional content below it. */
  leadStep?: CanvasSolutionStep;
  leadContent?: ReactNode;
}) {
  return (
    <>
      {leadStep ? (
        <div className={cx.solutionLeadBlock}>
          <SolutionStepCard {...leadStep} />
          {leadContent}
        </div>
      ) : null}

      {steps.map((step) =>
        step.showcase ? (
          <div key={step.step} className={cx.solutionLeadBlock}>
            <SolutionStepCard {...step} />
            {step.showcase}
          </div>
        ) : null,
      )}

      {steps.some((step) => !step.showcase) ? (
        <div className={cx.solutionSteps}>
          {steps
            .filter((step) => !step.showcase)
            .map((step) => (
              <SolutionStepCard key={step.step} {...step} />
            ))}
        </div>
      ) : null}
    </>
  );
}
