import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function CardContent({ project }: { project: Project }) {
  return (
    <>
      <div className={styles.media}>
        <div className={styles.mediaInner} />
        {project.comingSoon ? (
          <span className={styles.badge}>Coming soon</span>
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <span className={styles.cta}>
          {project.comingSoon ? "In progress" : "View case study →"}
        </span>
      </div>
    </>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className={`${styles.card} ${styles[`accent_${project.accent}`]}`}
      style={{ "--card-index": index } as CSSProperties}
    >
      {project.comingSoon ? (
        <div
          className={`${styles.link} ${styles.linkStatic}`}
          aria-label={project.title}
        >
          <CardContent project={project} />
        </div>
      ) : (
        <Link href={`/work/${project.slug}`} className={styles.link}>
          <CardContent project={project} />
        </Link>
      )}
    </article>
  );
}
