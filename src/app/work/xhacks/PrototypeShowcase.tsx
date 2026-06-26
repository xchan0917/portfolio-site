"use client";

import { useState } from "react";
import Image from "next/image";
import monet from "./monet.module.css";

export type PrototypeFeature = {
  id: string;
  num: string;
  title: string;
  body: string;
  callouts: string[];
  src: string;
  width: number;
  height: number;
  alt: string;
  kind?: "video" | "image";
};

export function PrototypeShowcase({ features }: { features: PrototypeFeature[] }) {
  const [active, setActive] = useState(features[0]?.id ?? "");

  const current = features.find((feature) => feature.id === active) ?? features[0];
  if (!current) return null;

  return (
    <div className={monet.showcaseExplorer}>
      <div
        className={monet.showcaseTabs}
        role="tablist"
        aria-label="Monet prototype features"
      >
        {features.map((feature) => {
          const selected = feature.id === active;
          return (
            <button
              key={feature.id}
              type="button"
              role="tab"
              id={`prototype-tab-${feature.id}`}
              aria-selected={selected}
              aria-controls={`prototype-panel-${feature.id}`}
              className={`${monet.showcaseTab} ${selected ? monet.showcaseTabActive : ""}`}
              onClick={() => setActive(feature.id)}
            >
              <span className={monet.showcaseTabNum}>{feature.num}</span>
              <span className={monet.showcaseTabTitle}>{feature.title}</span>
            </button>
          );
        })}
      </div>

      <div
        key={current.id}
        className={monet.showcasePanel}
        role="tabpanel"
        id={`prototype-panel-${current.id}`}
        aria-labelledby={`prototype-tab-${current.id}`}
      >
        <div className={monet.showcaseCopy}>
          <h3 className={monet.showcasePanelTitle}>{current.title}</h3>
          <p className={monet.showcasePanelBody}>{current.body}</p>
          {current.callouts.length > 0 && (
            <ul className={monet.showcaseCallouts}>
              {current.callouts.map((callout, i) => (
                <li key={callout} className={monet.showcaseCallout}>
                  <span className={monet.showcaseCalloutNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={monet.showcaseCalloutText}>{callout}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <figure className={monet.showcasePhone}>
          {current.kind === "video" ? (
            <video
              key={current.src}
              src={current.src}
              aria-label={current.alt}
              width={current.width}
              height={current.height}
              autoPlay
              loop
              muted
              playsInline
              className={monet.showcasePhoneImg}
            />
          ) : (
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              unoptimized
              className={monet.showcasePhoneImg}
            />
          )}
        </figure>
      </div>
    </div>
  );
}
