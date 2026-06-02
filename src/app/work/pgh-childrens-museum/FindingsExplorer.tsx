"use client";

import { useState } from "react";
import pgh from "./pgh.module.css";

export type FindingTheme = {
  id: string;
  num: string;
  title: string;
  body: string;
  impact: string;
};

export function FindingsExplorer({ themes }: { themes: FindingTheme[] }) {
  const [active, setActive] = useState(themes[0]?.id ?? "");

  const current = themes.find((t) => t.id === active) ?? themes[0];

  return (
    <div className={pgh.findingsExplorer}>
      <div className={pgh.findingsTabs} role="tablist" aria-label="Redesign themes">
        {themes.map((theme) => {
          const selected = theme.id === active;
          return (
            <button
              key={theme.id}
              type="button"
              role="tab"
              id={`tab-${theme.id}`}
              aria-selected={selected}
              aria-controls={`panel-${theme.id}`}
              className={`${pgh.findingsTab} ${selected ? pgh.findingsTabActive : ""}`}
              onClick={() => setActive(theme.id)}
              onMouseEnter={() => setActive(theme.id)}
            >
              <span className={pgh.findingsTabNum}>{theme.num}</span>
              <span className={pgh.findingsTabTitle}>{theme.title}</span>
            </button>
          );
        })}
      </div>

      {current && (
        <div
          key={current.id}
          className={pgh.findingsPanel}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
        >
          <h3 className={pgh.findingsPanelTitle}>{current.title}</h3>
          <p className={pgh.findingsPanelBody}>{current.body}</p>
          <div className={pgh.findingsImpact}>
            <span className={pgh.findingsImpactLabel}>Shaped the redesign</span>
            <p>{current.impact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
