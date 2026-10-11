"use client";

import {
  Children,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useInView } from "@/lib/useInView";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  /** Softer, slower fade for large compositions. */
  soft?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  soft = false,
  threshold,
  rootMargin,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
  });

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${soft ? styles.soft : ""} ${inView ? styles.visible : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

type RevealSequenceProps = {
  children: ReactNode;
  /** Delay between each child, in milliseconds. */
  step?: number;
  soft?: boolean;
  threshold?: number;
  rootMargin?: string;
  className?: string;
};

/** Fades children in order when the group enters view. */
export function RevealSequence({
  children,
  step = 380,
  soft = false,
  threshold = 0.28,
  rootMargin = "0px 0px -10% 0px",
  className = "",
}: RevealSequenceProps) {
  const items = Children.toArray(children);
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
  });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;

    setShown(1);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < items.length; i += 1) {
      timers.push(setTimeout(() => setShown(i + 1), i * step));
    }
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [inView, items.length, step]);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={`${styles.reveal} ${soft ? styles.soft : ""} ${i < shown ? styles.visible : ""}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
