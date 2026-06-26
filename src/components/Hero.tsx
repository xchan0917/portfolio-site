"use client";

import styles from "./Hero.module.css";

const MEET_ARROW_BODY =
  "M66 6 C84 3 90 19 76 24 C65 28 66 13 77 15 C90 17 88 34 72 38 C59 41 62 25 74 28 C86 31 82 52 64 58 C56 61 51 63 50 67";
const MEET_ARROW_HEAD = "M46 78 L55.4 68.8 M46 78 L44.6 65.2";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">

      {/* ── Top-left botanical cluster ── */}
      <svg
        aria-hidden="true"
        className={`${styles.botanical} ${styles.botanicalTL}`}
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main stem */}
        <path d="M0 0 C25 28 15 60 38 88 C55 110 46 145 65 170 C76 188 70 218 85 242" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Upper leaf pair */}
        <path d="M20 52 C4 40 0 24 10 16 C14 30 17 42 20 52Z" fill="var(--purple-light)" opacity="0.52"/>
        <path d="M20 52 C36 40 40 24 30 16 C26 30 23 42 20 52Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Mid leaf pair */}
        <path d="M38 88 C18 76 10 56 22 46 C28 62 34 76 38 88Z" fill="var(--purple)" opacity="0.38"/>
        <path d="M38 88 C58 76 66 56 54 46 C48 62 42 76 38 88Z" fill="var(--purple)" opacity="0.28"/>
        {/* Lower leaf pair */}
        <path d="M65 170 C45 158 37 138 49 128 C55 144 61 158 65 170Z" fill="var(--purple-light)" opacity="0.5"/>
        <path d="M65 170 C85 158 93 138 81 128 C75 144 69 158 65 170Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Side branch */}
        <path d="M45 110 C32 122 20 136 14 150" stroke="var(--purple)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M14 150 C6 158 4 172 12 166 C12 160 13 155 14 150Z" fill="var(--purple-light)" opacity="0.46"/>
        {/* Flowers */}
        <circle cx="4" cy="10" r="5" fill="#c9a8b8" opacity="0.65"/>
        <circle cx="16" cy="4" r="3.5" fill="#c9a8b8" opacity="0.55"/>
        <circle cx="26" cy="10" r="3" fill="#c9a8b8" opacity="0.48"/>
        <circle cx="10" cy="20" r="2.5" fill="var(--purple-light)" opacity="0.6"/>
        <circle cx="30" cy="20" r="2" fill="var(--purple-light)" opacity="0.5"/>
        {/* Berries */}
        <circle cx="78" cy="235" r="3.5" fill="var(--purple)" opacity="0.3"/>
        <circle cx="90" cy="246" r="2.5" fill="var(--purple)" opacity="0.24"/>
        <circle cx="70" cy="248" r="2" fill="var(--purple-light)" opacity="0.34"/>
      </svg>

      {/* ── Top-right botanical cluster ── */}
      <svg
        aria-hidden="true"
        className={`${styles.botanical} ${styles.botanicalTR}`}
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main stem (mirrored) */}
        <path d="M200 0 C175 28 185 60 162 88 C145 110 154 145 135 170 C124 188 130 218 115 242" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Upper leaf pair */}
        <path d="M180 52 C196 40 200 24 190 16 C186 30 183 42 180 52Z" fill="var(--purple-light)" opacity="0.52"/>
        <path d="M180 52 C164 40 160 24 170 16 C174 30 177 42 180 52Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Mid leaf pair */}
        <path d="M162 88 C182 76 190 56 178 46 C172 62 166 76 162 88Z" fill="var(--purple)" opacity="0.38"/>
        <path d="M162 88 C142 76 134 56 146 46 C152 62 158 76 162 88Z" fill="var(--purple)" opacity="0.28"/>
        {/* Lower leaf pair */}
        <path d="M135 170 C155 158 163 138 151 128 C145 144 139 158 135 170Z" fill="var(--purple-light)" opacity="0.5"/>
        <path d="M135 170 C115 158 107 138 119 128 C125 144 131 158 135 170Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Side branch */}
        <path d="M155 110 C168 122 180 136 186 150" stroke="var(--purple)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M186 150 C194 158 196 172 188 166 C188 160 187 155 186 150Z" fill="var(--purple-light)" opacity="0.46"/>
        {/* Flowers */}
        <circle cx="196" cy="10" r="5" fill="#c9a8b8" opacity="0.65"/>
        <circle cx="184" cy="4" r="3.5" fill="#c9a8b8" opacity="0.55"/>
        <circle cx="174" cy="10" r="3" fill="#c9a8b8" opacity="0.48"/>
        <circle cx="190" cy="20" r="2.5" fill="var(--purple-light)" opacity="0.6"/>
        <circle cx="170" cy="20" r="2" fill="var(--purple-light)" opacity="0.5"/>
        {/* Berries */}
        <circle cx="122" cy="235" r="3.5" fill="var(--purple)" opacity="0.3"/>
        <circle cx="110" cy="246" r="2.5" fill="var(--purple)" opacity="0.24"/>
        <circle cx="130" cy="248" r="2" fill="var(--purple-light)" opacity="0.34"/>
      </svg>

      {/* ── Bottom-left botanical cluster — lemon ── */}
      <svg
        aria-hidden="true"
        className={`${styles.botanical} ${styles.botanicalBL}`}
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main stem */}
        <path d="M0 280 C22 254 12 224 38 196 C56 176 48 142 68 118 C80 100 74 72 90 52" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Lemon */}
        <ellipse cx="28" cy="248" rx="18" ry="13" fill="#f0d878" opacity="0.68" transform="rotate(-22 28 248)"/>
        <path d="M22 235 C25 229 30 229 33 235" stroke="#c8a820" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        <path d="M18 258 C20 264 26 266 28 260" stroke="#c8a820" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
        {/* Leaf pair at ~196 */}
        <path d="M38 196 C18 184 10 164 22 154 C28 170 34 184 38 196Z" fill="var(--purple-light)" opacity="0.5"/>
        <path d="M38 196 C58 184 66 164 54 154 C48 170 42 184 38 196Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Leaf pair at ~118 */}
        <path d="M68 118 C48 106 40 86 52 76 C58 92 64 106 68 118Z" fill="var(--purple)" opacity="0.42"/>
        <path d="M68 118 C88 106 96 86 84 76 C78 92 72 106 68 118Z" fill="var(--purple)" opacity="0.32"/>
        {/* Side branch lower */}
        <path d="M38 196 C24 210 12 224 6 238" stroke="var(--purple)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M6 238 C-2 248 0 262 8 256 C8 250 7 244 6 238Z" fill="var(--purple-light)" opacity="0.44"/>
        {/* Upper leaves */}
        <path d="M90 52 C70 40 62 20 74 10 C80 26 86 40 90 52Z" fill="var(--purple-light)" opacity="0.5"/>
        <path d="M90 52 C110 40 118 20 106 10 C100 26 94 40 90 52Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Flower buds */}
        <circle cx="90" cy="44" r="4" fill="#c9a8b8" opacity="0.58"/>
        <circle cx="82" cy="38" r="3" fill="#c9a8b8" opacity="0.48"/>
        <circle cx="98" cy="38" r="2.5" fill="#c9a8b8" opacity="0.42"/>
      </svg>

      {/* ── Bottom-right botanical cluster — cherries ── */}
      <svg
        aria-hidden="true"
        className={`${styles.botanical} ${styles.botanicalBR}`}
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main stem (mirrored) */}
        <path d="M200 280 C178 254 188 224 162 196 C144 176 152 142 132 118 C120 100 126 72 110 52" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Cherries */}
        <circle cx="172" cy="244" r="11" fill="#c05060" opacity="0.65"/>
        <circle cx="188" cy="236" r="11" fill="#a03048" opacity="0.58"/>
        <path d="M172 233 C174 222 180 216 184 222 C186 226 186 230 188 225" stroke="#5a8030" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
        {/* Leaf pair at ~196 */}
        <path d="M162 196 C182 184 190 164 178 154 C172 170 166 184 162 196Z" fill="var(--purple-light)" opacity="0.5"/>
        <path d="M162 196 C142 184 134 164 146 154 C152 170 158 184 162 196Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Leaf pair at ~118 */}
        <path d="M132 118 C152 106 160 86 148 76 C142 92 136 106 132 118Z" fill="var(--purple)" opacity="0.42"/>
        <path d="M132 118 C112 106 104 86 116 76 C122 92 128 106 132 118Z" fill="var(--purple)" opacity="0.32"/>
        {/* Side branch */}
        <path d="M162 196 C176 210 188 224 194 238" stroke="var(--purple)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M194 238 C202 248 200 262 192 256 C192 250 193 244 194 238Z" fill="var(--purple-light)" opacity="0.44"/>
        {/* Upper leaves */}
        <path d="M110 52 C130 40 138 20 126 10 C120 26 114 40 110 52Z" fill="var(--purple-light)" opacity="0.5"/>
        <path d="M110 52 C90 40 82 20 94 10 C100 26 106 40 110 52Z" fill="var(--purple-light)" opacity="0.38"/>
        {/* Flower buds */}
        <circle cx="110" cy="44" r="4" fill="#c9a8b8" opacity="0.58"/>
        <circle cx="118" cy="38" r="3" fill="#c9a8b8" opacity="0.48"/>
        <circle cx="102" cy="38" r="2.5" fill="#c9a8b8" opacity="0.42"/>
      </svg>

      <div className={styles.introBlock}>
        <div className={styles.meetAnnotation} aria-hidden="true">
          <span className={styles.meetText}>meet cynthia</span>
          <svg
            className={styles.meetArrow}
            viewBox="0 0 100 88"
            fill="none"
          >
            <path
              className={styles.meetArrowPath}
              pathLength={1}
              d={MEET_ARROW_BODY}
            />
            <path
              className={styles.meetArrowHead}
              pathLength={1}
              d={MEET_ARROW_HEAD}
            />
          </svg>
        </div>

        <h1
          id="hero-heading"
          className={styles.heading}
        >
          Hi! I design impactful products with good intentions. My unconventional background shapes my perspective and the way I work.
        </h1>

        <div
          id="hero-credentials"
          className={styles.credentials}
        >
          <span className={styles.chip}>Carnegie Mellon University</span>
          <span className={styles.chip}>Business + HCI</span>
          <span className={styles.chip}>Product designer · NYC</span>
        </div>
      </div>
    </section>
  );
}
