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

function useIsTouchOnly() {
  const [touchOnly, setTouchOnly] = useState(false);

  useEffect(() => {
    setTouchOnly(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches,
    );
  }, []);

  return touchOnly;
}

function CoverMedia({
  project,
  playing,
  inView,
}: {
  project: Project;
  playing: boolean;
  inView: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const startAt = project.coverStartAt ?? 0;
  const isTouchOnly = useIsTouchOnly();
  const poster = project.coverPoster;
  const isAnimatedGif = Boolean(project.cover?.endsWith(".gif"));

  // Mount the video only when the user is likely to see it play.
  useEffect(() => {
    if (!project.coverMp4) return;
    if (playing || (isTouchOnly && inView)) {
      setLoadVideo(true);
    }
  }, [project.coverMp4, playing, isTouchOnly, inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    const seekToStart = () => {
      try {
        video.currentTime = startAt;
      } catch {
        /* ignore seek errors before metadata */
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      seekToStart();
    } else {
      video.addEventListener("loadedmetadata", seekToStart, { once: true });
    }
  }, [loadVideo, startAt]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    if (isTouchOnly) {
      void video.play().then(() => setVideoVisible(true)).catch(() => {});
      return;
    }

    if (playing) {
      void video
        .play()
        .then(() => setVideoVisible(true))
        .catch(() => {});
    } else {
      video.pause();
      try {
        video.currentTime = startAt;
      } catch {
        /* ignore */
      }
      setVideoVisible(false);
    }
  }, [playing, startAt, isTouchOnly, loadVideo]);

  if (!project.coverMp4 && !poster && !project.cover) return null;

  return (
    <>
      {poster || project.cover ? (
        <Image
          src={poster || project.cover!}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
          className={styles.mediaImage}
          unoptimized={isAnimatedGif && !poster}
          loading="lazy"
        />
      ) : null}
      {loadVideo && project.coverMp4 ? (
        <video
          ref={videoRef}
          src={project.coverMp4}
          className={styles.mediaVideo}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          style={{ opacity: videoVisible ? 1 : 0 }}
        />
      ) : null}
    </>
  );
}

function CardContent({
  project,
  playing,
  inView,
}: {
  project: Project;
  playing: boolean;
  inView: boolean;
}) {
  const hasCoverMedia = Boolean(
    project.cover || project.coverMp4 || project.coverPoster,
  );

  return (
    <>
      <div className={styles.media}>
        <div
          className={`${styles.mediaInner} ${hasCoverMedia ? "" : styles.mediaEmpty}`}
          aria-hidden="true"
        />
        <CoverMedia project={project} playing={playing} inView={inView} />
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
          ...(project.coverScale
            ? { "--media-scale": project.coverScale }
            : {}),
          ...(project.coverScaleHover
            ? { "--media-scale-hover": project.coverScaleHover }
            : {}),
          ...(project.coverPosterShift != null
            ? { "--media-poster-shift": project.coverPosterShift }
            : {}),
          ...(project.coverPosterShiftY != null
            ? { "--media-poster-shift-y": project.coverPosterShiftY }
            : {}),
          ...(project.coverPosterScale != null
            ? { "--media-poster-scale": project.coverPosterScale }
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
          <CardContent project={project} playing={playing} inView={inView} />
        </div>
      ) : (
        <Link href={`/work/${project.slug}`} className={styles.link}>
          <CardContent project={project} playing={playing} inView={inView} />
        </Link>
      )}
    </article>
  );
}
