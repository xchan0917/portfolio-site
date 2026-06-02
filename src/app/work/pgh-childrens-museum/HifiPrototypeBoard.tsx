import Image from "next/image";
import pgh from "./pgh.module.css";

const COL_1 = {
  src: "/projects/pgh/hifi-board-1.png",
  width: 295,
  height: 647,
  alt: "Early high-fidelity homepage wireframe with featured exhibits",
};

const COL_2A = {
  src: "/projects/pgh/hifi-board-2a.png",
  width: 438,
  height: 782,
  alt: "Wireframe exploring upcoming programs and featured exhibits",
};

const COL_2B = {
  src: "/projects/pgh/hifi-board-2b.png",
  width: 436,
  height: 230,
  alt: "Reference screenshot from other museum websites for inspiration",
};

const COL_3 = {
  src: "/projects/pgh/hifi-board-3.png",
  width: 246,
  height: 647,
  alt: "Refined wireframe with navigation, exhibits, and membership sections",
};

const COL_4 = {
  src: "/projects/pgh/hifi-board-4.png",
  width: 316,
  height: 647,
  alt: "Polished high-fidelity prototype with carousels and footer structure",
};

const IMG_QUALITY = 100;

function HifiFrame({
  image,
  tall,
}: {
  image: { src: string; width: number; height: number; alt: string };
  tall?: boolean;
}) {
  return (
    <div
      className={`${pgh.hifiBoardFrame} ${tall ? pgh.hifiBoardFrameTall : ""}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={IMG_QUALITY}
        className={pgh.hifiBoardImg}
        sizes={
          tall
            ? "(max-width: 900px) 48vw, 360px"
            : "(max-width: 900px) 28vw, 240px"
        }
      />
    </div>
  );
}

export function HifiPrototypeBoard() {
  return (
    <figure className={pgh.hifiBoard}>
      <div className={pgh.hifiBoardCanvas}>
        <svg
          className={pgh.hifiBoardAnnotations}
          viewBox="0 0 1200 832"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {/* Top bracket — dots on top edge of each wireframe (grid top y=79) */}
          <path
            d="M 148 64 H 1041 M 148 64 V 79 M 446 64 V 79 M 719 64 V 79 M 1041 64 V 79"
            className={pgh.hifiBoardBracketStroke}
          />
          <circle cx="148" cy="79" r="2" className={pgh.hifiBoardBracketDot} />
          <circle cx="446" cy="79" r="2" className={pgh.hifiBoardBracketDot} />
          <circle cx="719" cy="79" r="2" className={pgh.hifiBoardBracketDot} />
          <circle cx="1041" cy="79" r="2" className={pgh.hifiBoardBracketDot} />

          {/* Inspiration — stem from callout to top of reference screenshot */}
          <path d="M 446 556 V 611" className={pgh.hifiBoardBracketStroke} />
          <circle cx="446" cy="611" r="2" className={pgh.hifiBoardBracketDot} />

          {/* Bottom bracket — dots on footer tops (cols 1, 3, 4) */}
          <path
            d="M 148 752 H 1041 M 148 752 V 726 M 719 752 V 726 M 1041 752 V 726"
            className={pgh.hifiBoardBracketStroke}
          />
          <circle cx="148" cy="726" r="2" className={pgh.hifiBoardBracketDot} />
          <circle cx="719" cy="726" r="2" className={pgh.hifiBoardBracketDot} />
          <circle cx="1041" cy="726" r="2" className={pgh.hifiBoardBracketDot} />
        </svg>

        <p className={`${pgh.hifiBoardCallout} ${pgh.hifiBoardCalloutLogo}`}>
          Maintaining similar logo
        </p>
        <p
          className={`${pgh.hifiBoardCallout} ${pgh.hifiBoardCalloutInspire}`}
        >
          <span>Drew inspiration from</span>
          <span>different museum websites</span>
        </p>
        <p
          className={`${pgh.hifiBoardCallout} ${pgh.hifiBoardCalloutFooter}`}
        >
          Include similar structures and information for footers
        </p>
        <p className={pgh.hifiBoardLabel}>High-fi wireframes</p>

        <div className={pgh.hifiBoardGrid}>
          <HifiFrame image={COL_1} tall />
          <div className={pgh.hifiBoardStack}>
            <HifiFrame image={COL_2A} />
            <HifiFrame image={COL_2B} />
          </div>
          <HifiFrame image={COL_3} tall />
          <HifiFrame image={COL_4} tall />
        </div>
      </div>
    </figure>
  );
}
