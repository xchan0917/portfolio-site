"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./snitch.module.css";

export function DemoVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const skip = () => {
    const v = videoRef.current;
    if (!v) return;
    const target = v.currentTime + 10;
    v.currentTime =
      Number.isFinite(v.duration) && v.duration > 0
        ? target % v.duration
        : target;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <>
      <div className={styles.solutionScreen}>
        <video
          ref={videoRef}
          className={styles.solutionVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <div className={styles.videoControls}>
        <button
          type="button"
          className={styles.videoBtn}
          onClick={togglePlay}
          aria-label={playing ? "Pause demo video" : "Play demo video"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className={styles.videoBtn}
          onClick={skip}
          aria-label="Skip forward 10 seconds"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
            <path d="M5 5v14l9-7z" fill="currentColor" />
            <rect x="16" y="5" width="3" height="14" rx="1" fill="currentColor" />
          </svg>
        </button>

        <button
          type="button"
          className={styles.videoBtn}
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? "Unmute demo video" : "Mute demo video"}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
              <path
                d="M5 9v6h4l5 4V5L9 9H5z"
                fill="currentColor"
              />
              <path
                d="M16 9l5 6M21 9l-5 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
              <path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor" />
              <path
                d="M16.5 8.5a5 5 0 0 1 0 7M18.5 6.5a8 8 0 0 1 0 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
