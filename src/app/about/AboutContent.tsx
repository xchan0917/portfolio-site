"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Reveal } from "@/components/Reveal";
import { JourneyTimeline } from "@/app/about/JourneyTimeline";
import { SkillsPlate } from "@/app/about/SkillsPlate";
import {
  aboutHeroName,
  aboutHeroWelcome,
  aboutIntroChineseName,
  aboutJumpLinks,
  aboutLifeSections,
  aboutPivot,
} from "@/lib/about";
import styles from "./about.module.css";

const ABOUT_STARS = [
  { top: "6%", left: "3%", size: 14, rotate: -12, delay: 0.2, duration: 3.4 },
  { top: "14%", left: "94%", size: 18, rotate: 18, delay: 0.8, duration: 4.2 },
  { top: "38%", left: "1%", size: 11, rotate: 6, delay: 1.4, duration: 3.1 },
  { top: "20%", left: "52%", size: 13, rotate: -10, delay: 0.5, duration: 3.7 },
  { top: "34%", left: "48%", size: 11, rotate: 12, delay: 1.1, duration: 3.5 },
  { top: "46%", left: "56%", size: 15, rotate: -18, delay: 1.7, duration: 4.1 },
] as const;

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduceMotion;
}

function AboutStars({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className={styles.starCluster} aria-hidden="true">
      {ABOUT_STARS.map((star, index) => (
        <span
          key={index}
          className={`${styles.star} ${reduceMotion ? styles.starStatic : styles.starTwinkle}`}
          style={
            {
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              "--star-rotate": `${star.rotate}deg`,
              "--twinkle-delay": `${star.delay}s`,
              "--twinkle-duration": `${star.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function PhotoCarousel({
  images,
}: {
  images: readonly {
    src: string;
    alt: string;
    caption: string;
    orientation?: "portrait" | "landscape";
    width?: number;
    height?: number;
    displayScale?: "large" | "small";
  }[];
}) {
  const [index, setIndex] = useState(0);
  const [orientations, setOrientations] = useState<
    Record<string, "portrait" | "landscape">
  >({});
  const count = images.length;
  const activeImage = images[index];
  const activeIsPortrait =
    (activeImage?.orientation ?? orientations[activeImage?.src ?? ""]) ===
    "portrait";

  const markOrientation = useCallback(
    (src: string, width: number, height: number) => {
      const orientation = height > width ? "portrait" : "landscape";
      setOrientations((current) =>
        current[src] === orientation ? current : { ...current, [src]: orientation },
      );
    },
    [],
  );

  const go = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  return (
    <div
      className={`${styles.carousel} ${
        activeIsPortrait ? styles.carouselPortrait : ""
      }`}
    >
      <div className={styles.carouselViewport}>
        {images.map((image, imageIndex) => {
          const orientation = image.orientation ?? orientations[image.src];
          const isPortrait = orientation === "portrait";
          const imageWidth = image.width ?? 900;
          const imageHeight = image.height ?? 1100;

          const isLargePortrait = isPortrait && image.displayScale === "large";
          const isSmallLandscape = !isPortrait && image.displayScale === "small";

          return (
          <figure
            key={image.src}
            className={`${styles.carouselSlide} ${
              imageIndex === index ? styles.carouselSlideActive : ""
            } ${isPortrait ? styles.carouselSlidePortrait : ""} ${
              isLargePortrait ? styles.carouselSlidePortraitLarge : ""
            } ${isSmallLandscape ? styles.carouselSlideLandscapeSmall : ""}`}
          >
            <div
              className={`${styles.polaroid} ${
                isPortrait ? styles.polaroidPortrait : ""
              } ${isSmallLandscape ? styles.polaroidCompact : ""}`}
            >
              <div
                className={`${styles.polaroidFrame} ${
                  isPortrait
                    ? styles.polaroidFramePortrait
                    : styles.polaroidFrameLandscape
                } ${isSmallLandscape ? styles.polaroidFrameLandscapeSmall : ""}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={imageWidth}
                  height={imageHeight}
                  className={`${styles.polaroidImage} ${
                    isLargePortrait ? styles.polaroidImageLarge : ""
                  }`}
                  sizes={
                    isLargePortrait
                      ? "(max-width: 768px) 80vw, 560px"
                      : isSmallLandscape
                        ? "(max-width: 768px) 55vw, 225px"
                        : isPortrait
                        ? "(max-width: 768px) 56vw, 200px"
                        : "(max-width: 768px) 88vw, 360px"
                  }
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    markOrientation(image.src, naturalWidth, naturalHeight);
                  }}
                />
              </div>
            </div>
            <figcaption className={styles.carouselCaption}>
              {image.caption}
            </figcaption>
          </figure>
          );
        })}
      </div>

      {count > 1 ? (
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.carouselButton}
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            ←
          </button>
          <span className={styles.carouselCount}>
            {index + 1} / {count}
          </span>
          <button
            type="button"
            className={styles.carouselButton}
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function AboutContent() {
  const reduceMotion = useReducedMotion();
  const [heroReady, setHeroReady] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setHeroReady(true);
      return;
    }
    const timer = window.setTimeout(() => setHeroReady(true), 420);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <main className={styles.about}>
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={styles.heroBackdrop} aria-hidden="true">
          <div className={styles.glowOrb} />
          <AboutStars reduceMotion={reduceMotion} />
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Student @ CMU</p>
            <h1 id="about-hero-title" className={styles.heroTitle}>
              <span
                className={`${styles.heroLine} ${
                  heroReady ? styles.heroLineVisible : ""
                }`}
              >
                {aboutHeroName}
              </span>
              <span
                className={`${styles.heroLineWelcome} ${
                  heroReady ? styles.heroLineVisible : ""
                }`}
              >
                {aboutHeroWelcome.map((line, index) => (
                  <span key={line} className={styles.heroWelcomeLine}>
                    {line}
                    {index === 0 ? (
                      <span className={styles.heroSmiley} aria-hidden="true">
                        {" "}
                        ☺
                      </span>
                    ) : null}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div
            className={`${styles.heroPhotos} ${
              heroReady ? styles.heroPhotosVisible : ""
            }`}
          >
            <figure className={`${styles.heroPhoto} ${styles.heroPhotoPrimary}`}>
              <Image
                src="/about/hero-portrait.png"
                alt="Portrait of Cynthia Chan"
                width={644}
                height={812}
                className={styles.heroPhotoImage}
                priority
                sizes="(max-width: 900px) 72vw, 320px"
              />
            </figure>
            <figure className={`${styles.heroPhoto} ${styles.heroPhotoSecondary}`}>
              <Image
                src="/about/hero-collage.png"
                alt="Collage of Cynthia's interests"
                width={636}
                height={775}
                className={styles.heroPhotoImage}
                priority
                sizes="(max-width: 900px) 56vw, 240px"
              />
            </figure>
          </div>
        </div>
      </section>

      <nav className={styles.jumpNav} aria-label="About page sections">
        <ul className={styles.jumpList}>
          {aboutJumpLinks.map((link, index) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.jumpLink}
                style={{ "--jump-delay": `${index * 70}ms` } as CSSProperties}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className={styles.introSection} aria-label="About Cynthia">
        <Reveal>
          <p className={styles.lead}>
            I&apos;m Cynthia (
            <span className={styles.handwrittenName}>
              {aboutIntroChineseName}
            </span>
            ) Chan, an aspiring product designer focusing on AI products and
            service design. I excel in strategic thinking and understanding the
            transformation of ideas → products from all perspectives.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className={styles.pivot}>
            <span className={styles.pivotScript}>{aboutPivot}</span>
          </p>
        </Reveal>
      </section>

      <section
        id="journey"
        className={styles.journeySection}
        aria-labelledby="journey-heading"
      >
        <JourneyTimeline />
      </section>

      <section
        id="life"
        className={styles.lifeSection}
        aria-labelledby="life-heading"
      >
        <Reveal>
          <p className={styles.sectionKicker}>Beyond the screen</p>
          <h2 id="life-heading" className={styles.sectionTitle}>
            What shapes me
          </h2>
        </Reveal>

        <div className={styles.lifeGrid}>
          {aboutLifeSections.map((section, index) => (
            <article
              key={section.id}
              className={styles.lifeCard}
              style={{ "--life-index": index } as CSSProperties}
            >
              <Reveal delay={index * 80}>
                <div className={styles.lifeCardInner}>
                  <div className={styles.lifeCopy}>
                    <p className={styles.lifeSubtitle}>{section.subtitle}</p>
                    <h3 className={styles.lifeTitle}>{section.title}</h3>
                    <p className={styles.bodyText}>{section.body}</p>
                  </div>
                  <PhotoCarousel images={section.images} />
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section
        id="skills"
        className={styles.skillsSection}
        aria-labelledby="skills-heading"
      >
        <Reveal>
          <p className={styles.sectionKicker}>What I bring to the table</p>
          <h2 id="skills-heading" className={styles.skillsHeading}>
            <span>Strategy, craft, and</span>
            <span>everything in between</span>
          </h2>
        </Reveal>

        <div className={styles.skillsTable}>
          <Reveal delay={80}>
            <SkillsPlate />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
