"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      dot.style.opacity = "1";

      const footer = document.getElementById("footer");
      if (!footer) return;

      const { top } = footer.getBoundingClientRect();
      dot.classList.toggle(styles.cursorSun, e.clientY >= top);
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      dot.classList.remove(styles.cursorSun);
    };

    const onEnter = () => {
      dot.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={styles.cursor}
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
}
