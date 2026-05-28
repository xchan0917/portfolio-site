import Link from "next/link";
import { FooterFlorals } from "@/components/FooterFlorals";
import { LocalTime } from "@/components/LocalTime";
import { site } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="footer">
      <FooterFlorals />

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <p className={styles.tagline}>
              Glad you&apos;ve made it here,
              <br />
              <span className={styles.taglineSecond}>let&apos;s talk!</span>
            </p>
            <p className={styles.madeWith}>
              Made with <span aria-label="love">♥</span> and lots of matcha
            </p>
            <p className={styles.localTime}>
              <LocalTime label="Your local time" />
            </p>
          </div>

          <div className={styles.linkColumns}>
            <ul className={styles.linkList}>
              <li>
                <Link
                  href={site.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>Contact</a>
              </li>
              <li>
                <Link href="/resume">Resume</Link>
              </li>
            </ul>
            <ul className={styles.linkList}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/play">Playground</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
