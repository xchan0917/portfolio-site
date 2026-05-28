"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import styles from "./FooterFlorals.module.css";

const FLORALS = [
  {
    src: "/florals/lavender.png",
    alt: "Lavender illustration",
    width: 72,
    height: 120,
    top: "8%",
    left: "6%",
    rotate: -14,
    opacity: 0.92,
  },
  {
    src: "/florals/tulip.png",
    alt: "Yellow tulip illustration",
    width: 64,
    height: 110,
    top: "22%",
    left: "28%",
    rotate: 6,
    opacity: 0.88,
  },
  {
    src: "/florals/iris.png",
    alt: "Iris illustration",
    width: 80,
    height: 130,
    top: "55%",
    left: "12%",
    rotate: 10,
    opacity: 0.9,
  },
  {
    src: "/florals/lavender.png",
    alt: "",
    width: 56,
    height: 94,
    top: "18%",
    left: "52%",
    rotate: 12,
    opacity: 0.75,
  },
  {
    src: "/florals/iris.png",
    alt: "",
    width: 68,
    height: 110,
    top: "38%",
    left: "68%",
    rotate: -8,
    opacity: 0.85,
  },
  {
    src: "/florals/tulip.png",
    alt: "",
    width: 52,
    height: 90,
    top: "62%",
    left: "42%",
    rotate: -18,
    opacity: 0.8,
  },
  {
    src: "/florals/lavender.png",
    alt: "",
    width: 48,
    height: 80,
    top: "72%",
    left: "78%",
    rotate: -6,
    opacity: 0.7,
  },
  {
    src: "/florals/tulip.png",
    alt: "",
    width: 58,
    height: 100,
    top: "12%",
    left: "82%",
    rotate: 15,
    opacity: 0.82,
  },
  {
    src: "/florals/iris.png",
    alt: "",
    width: 54,
    height: 88,
    top: "78%",
    left: "58%",
    rotate: 4,
    opacity: 0.72,
  },
  {
    src: "/florals/lavender.png",
    alt: "",
    width: 44,
    height: 74,
    top: "48%",
    left: "88%",
    rotate: 20,
    opacity: 0.65,
  },
] as const;

function toTransparentPngDataUrl(image: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;

  // Remove near-white background while keeping soft watercolor edges.
  const threshold = 246; // 0..255
  const softness = 22; // fade range

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] ?? 0;
    const g = data[i + 1] ?? 0;
    const b = data[i + 2] ?? 0;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const isNeutral = max - min < 16;

    if (!isNeutral) continue;

    const brightness = (r + g + b) / 3;
    if (brightness < threshold - softness) continue;

    const t = Math.min(1, Math.max(0, (brightness - (threshold - softness)) / softness));
    const alpha = data[i + 3] ?? 255;
    data[i + 3] = Math.round(alpha * (1 - t));
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

function FloralImage({ src, alt }: { src: string; alt: string }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    image.onload = () => {
      if (cancelled) return;
      const url = toTransparentPngDataUrl(image);
      if (!cancelled && url) setDataUrl(url);
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <Image
      src={dataUrl ?? src}
      alt={alt}
      width={1}
      height={1}
      className={styles.floralImg}
      unoptimized={Boolean(dataUrl)}
      sizes="(max-width: 768px) 80px, 120px"
    />
  );
}

export function FooterFlorals() {
  return (
    <div className={styles.garden} aria-hidden="true">
      {FLORALS.map((floral, index) => (
        <div
          key={index}
          className={styles.floral}
          style={
            {
              top: floral.top,
              left: floral.left,
              "--base-opacity": floral.opacity,
              "--rotate": `${floral.rotate}deg`,
              "--sway-duration": `${9 + (index % 5) * 1.1}s`,
              "--sway-delay": `${-(index * 0.7)}s`,
              "--sway-angle": `${2.2 + (index % 3) * 0.6}deg`,
              "--blink-duration": `${4.5 + (index % 6) * 1.05}s`,
              "--blink-delay": `${-(index * 0.85)}s`,
            } as CSSProperties
          }
        >
          <div
            className={styles.floralSize}
            style={
              {
                width: Math.round(
                  floral.width * (floral.src.includes("lavender") ? 0.95 : 0.82)
                ),
                height: Math.round(
                  floral.height * (floral.src.includes("lavender") ? 0.95 : 0.82)
                ),
              } as CSSProperties
            }
          >
            <FloralImage src={floral.src} alt={floral.alt} />
          </div>
        </div>
      ))}
    </div>
  );
}
