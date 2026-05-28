"use client";

import { useLayoutEffect } from "react";

export function ScrollToTop() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollTop = () => {
      // Prevent native hash scroll on refresh (e.g. /#projects).
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
      window.scrollTo(0, 0);
    };

    scrollTop();
    window.addEventListener("pageshow", scrollTop);
    return () => window.removeEventListener("pageshow", scrollTop);
  }, []);

  return null;
}
