"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { navLinks, site } from "@/lib/site";
import styles from "./SiteNav.module.css";

export function SiteNav({ glass = false }: { glass?: boolean } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    // Hidden at the top; reveals when scrolling up, hides when scrolling down.
    const TOP_GUARD = 60;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= TOP_GUARD) {
        setHeaderVisible(false);
      } else if (delta < -4) {
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
      className={`${styles.header} ${glass ? styles.headerGlass : ""} ${!headerVisible && !menuOpen ? styles.headerHidden : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={closeMenu} aria-label={site.name}>
          <span className={styles.brandChar}>鑫洁</span>
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
