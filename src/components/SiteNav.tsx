"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { navLinks, site } from "@/lib/site";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const getThreshold = () => {
      const credentials = document.getElementById("hero-credentials");
      if (!credentials) return 380;
      return credentials.offsetTop + credentials.offsetHeight + 24;
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const threshold = getThreshold();

      if (currentY <= threshold) {
        setHeaderVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      const delta = currentY - lastScrollY.current;

      if (delta < -4) {
        setHeaderVisible(true);
      } else if (delta > 4) {
        setHeaderVisible(false);
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${!headerVisible && !menuOpen ? styles.headerHidden : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandMark}>[</span>
          {site.name}
          <span className={styles.brandMark}>]</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileNav} ref={menuRef}>
          <button
            ref={buttonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span
                className={`${styles.menuBar} ${menuOpen ? styles.menuBarOpen : ""}`}
              />
              <span
                className={`${styles.menuBar} ${menuOpen ? styles.menuBarOpen : ""}`}
              />
            </span>
            <span className={styles.menuLabel}>Menu</span>
          </button>

          <div
            id={menuId}
            className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ""}`}
            aria-hidden={!menuOpen}
          >
            <ul className={styles.dropdownList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.dropdownLink}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? undefined : -1}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
