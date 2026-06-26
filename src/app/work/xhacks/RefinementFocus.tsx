"use client";

import { useState } from "react";
import Image from "next/image";
import monet from "./monet.module.css";

export type RefinementItem = {
  label: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  wide?: boolean;
};

export function RefinementFocus({ items }: { items: RefinementItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className={monet.refinementGrid}>
      {items.map((item, i) => {
        const selected = i === active;
        return (
          <button
            key={item.label}
            type="button"
            className={`${monet.refinementItem} ${
              selected ? monet.refinementItemActive : ""
            }`}
            onClick={() => setActive(i)}
            aria-pressed={selected}
          >
            <span className={monet.refinementNum}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className={monet.refinementLabel}>{item.label}</p>
            <figure className={monet.refinementFigure}>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                unoptimized
                className={`${monet.refinementImg} ${
                  item.wide ? monet.refinementImgWide : ""
                }`}
              />
            </figure>
          </button>
        );
      })}
    </div>
  );
}
