import Link from "next/link";
import { caseStudyNavBySlug } from "@/lib/case-study-nav";
import styles from "@/app/work/snitch/snitch.module.css";

type CaseStudyNavProps = {
  slug: string;
};

export function CaseStudyNav({ slug }: CaseStudyNavProps) {
  const links = caseStudyNavBySlug[slug];
  if (!links) return null;

  const { previous, next } = links;

  return (
    <nav className={styles.caseStudyNav} aria-label="Case study navigation">
      <Link
        href={previous.href}
        className={`${styles.caseStudyNavCard} ${styles.caseStudyNavPrev}`}
      >
        <div className={styles.caseStudyNavText}>
          <span className={styles.caseStudyNavLabel}>Previous</span>
          <span className={styles.caseStudyNavTitle}>{previous.title}</span>
          <span className={styles.caseStudyNavDesc}>
            <span className={styles.caseStudyNavArrow} aria-hidden>
              ←{" "}
            </span>
            {previous.description}
          </span>
        </div>
      </Link>
      <Link
        href={next.href}
        className={`${styles.caseStudyNavCard} ${styles.caseStudyNavNext}`}
      >
        <div className={styles.caseStudyNavText}>
          <span className={styles.caseStudyNavLabel}>Up next</span>
          <span className={styles.caseStudyNavTitle}>{next.title}</span>
          <span className={styles.caseStudyNavDesc}>
            {next.description}{" "}
            <span className={styles.caseStudyNavArrow} aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </nav>
  );
}
