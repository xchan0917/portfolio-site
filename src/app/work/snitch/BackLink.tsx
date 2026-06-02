"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./snitch.module.css";

export function BackLink() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only shown near the very top of the page; scrolling down hides it,
    // scrolling back up toward the top brings it back.
    const NEAR_TOP = 60;

    const onScroll = () => {
      setVisible(window.scrollY <= NEAR_TOP);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/#projects"
      className={`${styles.back} ${visible ? "" : styles.backHidden}`}
    >
      ← All projects
    </Link>
  );
}
