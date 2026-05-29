"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useState } from "react";
import { useInView } from "@/lib/useInView";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function getPoster(cover?: string) {
  return cover ? cover.replace(/\.gif$/, "-poster.jpg") : undefined;
}

function CardContent({
  project,
  playing,
}: {
  project: Project;
  playing: boolean;
}) {
  const poster = getPoster(project.cover);

  return (
    <>
      <div className={styles.media}>
        {project.cover ? (
          playing ? (
            // Mount the GIF only while hovered so it restarts and plays.
            <Image
              key="gif"
              src={project.cover}
              alt={`${project.title} cover`}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
              className={styles.mediaImage}
            />
          ) : (
            <Image
              key="poster"
              src={poster as string}
              alt={`${project.title} cover`}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
              className={styles.mediaImage}
            />
          )
        ) : (
          <div className={styles.mediaInner} />
        )}
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
  const { ref, inView } = useInView<HTMLElement>();
  const [playing, setPlaying] = useState(false);

  const play = () => setPlaying(true);
  const stop = () => setPlaying(false);

  return (
    <article
      ref={ref}
      className={`${styles.card} ${styles[`accent_${project.accent}`]} ${inView ? styles.cardVisible : ""}`}
      style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      {project.comingSoon ? (
        <div
          className={`${styles.link} ${styles.linkStatic}`}
          aria-label={project.title}
        >
          <CardContent project={project} playing={playing} />
        </div>
      ) : (
        <Link href={`/work/${project.slug}`} className={styles.link}>
          <CardContent project={project} playing={playing} />
        </Link>
      )}
    </article>
  );
}
