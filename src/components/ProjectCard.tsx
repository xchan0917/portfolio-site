"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function CoverMedia({
  project,
  playing,
}: {
  project: Project;
  playing: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startAt = project.coverStartAt ?? 0;

  // Seek to start frame so video shows a still by default
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const seekToStart = () => { video.currentTime = startAt; };
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      seekToStart();
    } else {
      video.addEventListener("loadedmetadata", seekToStart, { once: true });
    }
  }, [startAt]);

  // Play on hover, pause and reset when not hovering
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      void video.play();
    } else {
      video.pause();
      video.currentTime = startAt;
    }
  }, [playing, startAt]);

  if (!project.coverMp4) {
    if (!project.cover) return null;
    return (
      <Image
        src={project.cover}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
        className={styles.mediaImage}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={project.coverMp4}
      className={styles.mediaImage}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

function CardContent({
  project,
  playing,
}: {
  project: Project;
  playing: boolean;
}) {
  return (
    <>
      <div className={styles.media}>
        <div className={styles.mediaInner} aria-hidden="true" />
        <CoverMedia project={project} playing={playing} />
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
      style={
        {
          "--reveal-delay": `${index * 90}ms`,
          ...(project.idleColor ? { "--media-idle": project.idleColor } : {}),
          ...(project.coverShift ? { "--media-shift": project.coverShift } : {}),
          ...(project.coverShiftY
            ? { "--media-shift-y": project.coverShiftY }
            : {}),
        } as CSSProperties
      }
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
