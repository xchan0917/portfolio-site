"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.visible : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
