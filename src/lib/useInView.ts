"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  /** Reveal only once (default) or toggle every time it enters/leaves. */
  once?: boolean;
  /** Wait before setting inView after the element enters the viewport band. */
  delay?: number;
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  delay = 0,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    let revealTimer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          const reveal = () => {
            setInView(true);
            if (once) observer.unobserve(el);
          };
          if (delay > 0) {
            revealTimer = setTimeout(reveal, delay);
          } else {
            reveal();
          }
        } else if (!once) {
          if (revealTimer) clearTimeout(revealTimer);
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => {
      if (revealTimer) clearTimeout(revealTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, delay]);

  return { ref, inView };
}
