"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { aboutSkills } from "@/lib/about";
import styles from "./about.module.css";

export function SkillsPlate() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeSkill = aboutSkills.find((skill) => skill.id === activeId) ?? null;

  const toggleSkill = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  const closeSkill = () => {
    setActiveId(null);
  };

  useEffect(() => {
    if (!activeId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSkill();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        closeSkill();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activeId]);

  return (
    <div
      ref={wrapRef}
      className={styles.skillsPlateWrap}
      onClick={closeSkill}
    >
      <Image
        src="/about/skills-plate.png"
        alt=""
        width={1024}
        height={729}
        className={styles.skillsPlate}
        sizes="(max-width: 768px) 92vw, 720px"
        aria-hidden="true"
      />

      <ul className={styles.fruitGrid} aria-label="Skills">
        {aboutSkills.map((skill) => {
          const isActive = activeId === skill.id;

          return (
            <li
              key={skill.id}
              className={styles.fruitItem}
              style={
                {
                  "--fruit-top": skill.top,
                  "--fruit-left": skill.left,
                  "--fruit-size": skill.fruitSize,
                  "--jump-delay": `${skill.jumpDelay}s`,
                  "--jump-duration": `${skill.jumpDuration}s`,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className={`${styles.fruitButton} ${
                  isActive ? styles.fruitButtonActive : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSkill(skill.id);
                }}
                aria-expanded={isActive}
                aria-controls={isActive ? "skill-reveal" : undefined}
              >
                {skill.fruit.endsWith(".svg") ? (
                  <img
                    src={skill.fruit}
                    alt=""
                    width={skill.fruitWidth}
                    height={skill.fruitHeight}
                    className={styles.fruitIcon}
                    aria-hidden="true"
                  />
                ) : (
                  <Image
                    src={skill.fruit}
                    alt=""
                    width={skill.fruitWidth}
                    height={skill.fruitHeight}
                    unoptimized
                    className={styles.fruitIcon}
                    aria-hidden="true"
                  />
                )}
                <span className={styles.srOnly}>{skill.title}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {activeSkill ? (
        <div
          id="skill-reveal"
          className={styles.skillReveal}
          role="region"
          aria-live="polite"
          onClick={(event) => event.stopPropagation()}
        >
          <span className={styles.skillRevealTag}>{activeSkill.title}</span>
          <p className={styles.skillRevealBody}>{activeSkill.body}</p>
        </div>
      ) : null}
    </div>
  );
}
