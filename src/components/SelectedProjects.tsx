import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import styles from "./SelectedProjects.module.css";

export function SelectedProjects() {
  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-heading"
    >
      <Reveal className={styles.header}>
        <h2 id="projects-heading" className={styles.heading}>
          Projects
          <span className={styles.arrow} aria-hidden="true">
            ↓
          </span>
        </h2>
      </Reveal>

      <div className={styles.grid}>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
