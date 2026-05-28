import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./SelectedProjects.module.css";

export function SelectedProjects() {
  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-heading"
    >
      <div className={styles.header}>
        <h2 id="projects-heading" className={styles.heading}>
          Selected projects
          <span className={styles.arrow} aria-hidden="true">
            ↓
          </span>
        </h2>
        <p className={styles.subheading}>
          Strategy-led work across research, product, and emerging AI.
        </p>
      </div>

      <div className={styles.grid}>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
