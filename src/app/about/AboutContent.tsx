"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Reveal } from "@/components/Reveal";
import {
  aboutCurrently,
  aboutExperience,
  aboutFacts,
  aboutGallery,
  aboutHeroName,
  aboutHeroSub,
  aboutIntro,
  aboutJourney,
  aboutJumpLinks,
  aboutLifeSections,
  aboutOrigin,
  aboutPivot,
  aboutSkills,
  aboutWelcome,
} from "@/lib/about";
import styles from "./about.module.css";

const ABOUT_STARS = [
  { top: "6%", left: "3%", size: 10, rotate: -12, delay: 0.2, duration: 3.4 },
  { top: "14%", left: "94%", size: 14, rotate: 18, delay: 0.8, duration: 4.2 },
  { top: "38%", left: "1%", size: 8, rotate: 6, delay: 1.4, duration: 3.1 },
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
  images: readonly { src: string; alt: string; caption: string }[];
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => go(1), 5200);
    return () => window.clearInterval(timer);
  }, [count, go]);

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselViewport}>
        {images.map((image, imageIndex) => (
          <figure
            key={image.src}
            className={`${styles.carouselSlide} ${
              imageIndex === index ? styles.carouselSlideActive : ""
            }`}
          >
            <div className={styles.polaroid}>
              <Image
                src={image.src}
                alt={image.alt}
                width={900}
                height={1100}
                className={styles.polaroidImage}
                sizes="(max-width: 768px) 88vw, 360px"
              />
            </div>
            <figcaption className={styles.carouselCaption}>
              {image.caption}
            </figcaption>
          </figure>
        ))}
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

function FactCard({
  title,
  body,
  index,
}: (typeof aboutFacts)[number] & { index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 70}>
      <button
        type="button"
        className={`${styles.factCard} ${open ? styles.factCardOpen : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className={styles.factIndex}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.factTitle}>{title}</span>
        <p className={styles.factBody}>{body}</p>
      </button>
    </Reveal>
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
                className={`${styles.heroLineSub} ${
                  heroReady ? styles.heroLineVisible : ""
                }`}
              >
                {aboutHeroSub}
              </span>
            </h1>

            <div
              className={`${styles.credentials} ${
                heroReady ? styles.credentialsVisible : ""
              }`}
            >
              <span className={styles.chip}>Carnegie Mellon University</span>
              <span className={styles.chip}>Business + HCI</span>
              <span className={styles.chip}>Product designer · NYC</span>
            </div>

            <p
              className={`${styles.scrollHint} ${
                heroReady ? styles.scrollHintVisible : ""
              }`}
              aria-hidden="true"
            >
              Scroll to view!
            </p>
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
          <p className={styles.lead}>{aboutIntro}</p>
        </Reveal>
        <Reveal delay={80}>
          <p className={styles.pivot}>
            <span className={styles.pivotScript}>{aboutPivot}</span>
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className={styles.bodyText}>{aboutOrigin}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className={styles.bodyText}>{aboutCurrently}</p>
        </Reveal>
        <Reveal delay={260}>
          <p className={styles.welcome}>{aboutWelcome}</p>
        </Reveal>
      </section>

      <section
        id="journey"
        className={styles.experienceSection}
        aria-labelledby="experience-heading"
      >
        <Reveal>
          <h2 id="experience-heading" className={styles.sectionTitle}>
            Experience
          </h2>
        </Reveal>

        <ul className={styles.experienceList}>
          {aboutExperience.map((item, index) => (
            <Reveal key={`${item.org}-${item.role}`} delay={index * 50}>
              <li className={styles.experienceItem}>
                <p className={styles.experienceOrg}>{item.org}</p>
                <p className={styles.experienceRole}>{item.role}</p>
                <p className={styles.experiencePeriod}>{item.period}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={80}>
          <h3 className={styles.journeyHeading}>My design journey</h3>
        </Reveal>

        <ol className={styles.journeyList}>
          {aboutJourney.map((step, index) => (
            <Reveal key={step.year} delay={index * 70}>
              <li className={styles.journeyItem}>
                <span className={styles.journeyYear}>{step.year}</span>
                <div className={styles.journeyBody}>
                  <h4 className={styles.journeyTitle}>{step.title}</h4>
                  <p className={styles.journeyText}>{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
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
        id="gallery"
        className={styles.gallerySection}
        aria-labelledby="gallery-heading"
      >
        <Reveal>
          <p className={styles.sectionKicker}>Dillydallying with life</p>
          <h2 id="gallery-heading" className={styles.sectionTitle}>
            Snapshots from my corner of the internet
          </h2>
        </Reveal>

        <div className={styles.galleryGrid}>
          {aboutGallery.map((image, index) => (
            <Reveal key={image.src} delay={index * 50}>
              <figure
                className={styles.galleryItem}
                style={{ "--gallery-tilt": `${(index % 3) - 1}` } as CSSProperties}
              >
                <div className={styles.galleryFrame}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={1000}
                    className={styles.galleryImage}
                    sizes="(max-width: 640px) 88vw, (max-width: 1100px) 44vw, 280px"
                  />
                </div>
                <figcaption className={styles.galleryCaption}>
                  {image.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="facts"
        className={styles.factsSection}
        aria-labelledby="facts-heading"
      >
        <Reveal>
          <p className={styles.sectionKicker}>Tap to reveal</p>
          <h2 id="facts-heading" className={styles.sectionTitle}>
            4 random facts about me
          </h2>
        </Reveal>

        <div className={styles.factsGrid}>
          {aboutFacts.map((fact, index) => (
            <FactCard key={fact.title} {...fact} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.skillsSection} aria-labelledby="skills-heading">
        <Reveal>
          <p className={styles.sectionKicker}>What I bring to the table</p>
          <h2 id="skills-heading" className={styles.sectionTitle}>
            Always exploring emerging tools to expand my design toolkit
          </h2>
        </Reveal>

        <ul className={styles.skillGrid} aria-label="Skills">
          {aboutSkills.map((skill, index) => (
            <Reveal key={skill} delay={60 + index * 40}>
              <li className={styles.skillChip}>{skill}</li>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
