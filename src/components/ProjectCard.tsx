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

function getCoverVideo(cover?: string) {
  return cover?.replace(/\.gif$/i, ".mp4");
}

function CoverPlayback({
  project,
}: {
  project: Project;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const coverVideo = getCoverVideo(project.cover);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !coverVideo) return;

    const startAt = project.coverStartAt ?? 0;

    const playFromOffset = () => {
      const duration = video.duration;
      video.currentTime =
        Number.isFinite(duration) && duration > 0
          ? Math.min(startAt, Math.max(duration - 0.05, 0))
          : startAt;
      void video.play();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      playFromOffset();
      return;
    }

    video.addEventListener("loadedmetadata", playFromOffset, { once: true });
  }, [coverVideo, project.coverStartAt]);

  if (coverVideo) {
    return (
      <video
        ref={videoRef}
        src={coverVideo}
        className={styles.mediaVideo}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  if (!project.cover) return null;

  return (
    <Image
      key="gif"
      src={project.cover}
      alt=""
      fill
      unoptimized
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
      className={styles.mediaImage}
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
        {project.cover && playing ? <CoverPlayback project={project} /> : null}
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
