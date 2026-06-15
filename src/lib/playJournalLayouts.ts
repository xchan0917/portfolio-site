/** Wireframe composition from Figma frame 952:76 (Frame 17). */
export const FIGMA_STRIP = {
  frameWidth: 5353,
  frameHeight: 1031,
  pageWidths: {
    doordash: 1900,
    ceramics: 1061,
    murals: 800,
    wip: 869,
    photography: 1061,
    tma: 895,
  },
} as const;

export type WireframeSlot = {
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  rotate?: number;
};

export type PageWireframe = {
  figmaWidth: number;
  contentSlots: WireframeSlot[];
  sticky?: WireframeSlot;
};

function pct(
  x: number,
  y: number,
  w: number,
  h: number,
  pageX0: number,
  pageW: number,
  rotate?: number,
): WireframeSlot {
  return {
    xPct: ((x - pageX0) / pageW) * 100,
    yPct: (y / FIGMA_STRIP.frameHeight) * 100,
    wPct: (w / pageW) * 100,
    hPct: (h / FIGMA_STRIP.frameHeight) * 100,
    rotate,
  };
}

const { frameHeight: FH } = FIGMA_STRIP;
const CERAMICS_SCALE = 1.5;
const PHOTOGRAPHY_SCALE = 1.6;
/** ~1in at render scale (720px page height), in figma layout units. */
const JOURNAL_INCH = 96 * (FH / 720);
/** ~1in extra slot height at the rendered page scale (720px / 1031 figma). */
const CERAMICS_INCH_Y = JOURNAL_INCH;
/** Spread ceramics polaroids apart in the 2×2 grid. */
const CERAMICS_SPREAD = {
  plate: { x: -32, y: -50 },
  cup: { x: -32, y: 75 },
  vessel: { x: 38, y: -40 },
  fu: { x: 38, y: 55 },
} as const;
/** ~0.5cm extra slot height at the rendered page scale (720px / 1031 figma). */
const PHOTOGRAPHY_STRETCH_Y = 96 * (0.5 / 2.54) * (FH / 720);
/** Nudge photography polaroids left at figma coordinates. */
const PHOTOGRAPHY_SHIFT_X = 42;
/** Spread polaroids apart so corners show a sliver of page between overlaps. */
const PHOTOGRAPHY_SPREAD = {
  pgh: { x: -25, y: -60 },
  slopes: { x: 40, y: 54 },
  carmel: { x: -40, y: -15 },
} as const;

export const pageWireframes: Record<string, PageWireframe> = {
  doordash: {
    figmaWidth: FIGMA_STRIP.pageWidths.doordash,
    contentSlots: [
      pct(0, 80, 1900, 760, 0, 1900, 0),
    ],
    sticky: pct(1550, 7, 267, 155, 0, 1900, 10.77),
  },
  ceramics: {
    figmaWidth: FIGMA_STRIP.pageWidths.ceramics,
    contentSlots: [
      // Figma 972:132 — pink boxes, scaled 1.5× (plate, cup, vessel, fu)
      pct(
        215 + CERAMICS_SPREAD.plate.x,
        140 + CERAMICS_SPREAD.plate.y,
        231.83 * CERAMICS_SCALE,
        250.98 * CERAMICS_SCALE,
        0,
        1061,
        -4.72,
      ),
      pct(
        236 + CERAMICS_SPREAD.cup.x,
        370 + CERAMICS_SPREAD.cup.y,
        218.37 * CERAMICS_SCALE,
        238.91 * CERAMICS_SCALE + CERAMICS_INCH_Y,
        0,
        1061,
        -3,
      ),
      pct(
        533.7 + CERAMICS_SPREAD.vessel.x,
        180 + CERAMICS_SPREAD.vessel.y,
        237.45 * CERAMICS_SCALE,
        255.97 * CERAMICS_SCALE,
        0,
        1061,
        3.56,
      ),
      pct(
        539.38 + CERAMICS_SPREAD.fu.x,
        500 + CERAMICS_SPREAD.fu.y,
        242.44 * CERAMICS_SCALE,
        260.38 * CERAMICS_SCALE,
        0,
        1061,
        -2.21,
      ),
    ],
    sticky: pct(
      737.78 + JOURNAL_INCH,
      134 - JOURNAL_INCH,
      251.42 - JOURNAL_INCH,
      199.87,
      0,
      1061,
      -8.94,
    ),
  },
  murals: {
    figmaWidth: FIGMA_STRIP.pageWidths.murals,
    contentSlots: [
      // Centered stage for the mix transform + reveal
      pct(1690 + 50, 90, 700, 750, 1690, 800, 0),
    ],
    sticky: pct(2165 + 2 * JOURNAL_INCH, 42, 210 - JOURNAL_INCH, 155, 1690, 800, 8),
  },
  wip: {
    figmaWidth: FIGMA_STRIP.pageWidths.wip,
    contentSlots: [
      pct(2655.23, 160, 495, 312, 2490, 869, 0.23),
      pct(2676.01, 490.14, 520, 368, 2490, 869, 6.17),
    ],
    sticky: pct(
      3233.74 - JOURNAL_INCH,
      759.72 - JOURNAL_INCH + 2 * JOURNAL_INCH,
      231,
      155,
      2490,
      869,
      -10.04,
    ),
  },
  photography: {
    figmaWidth: FIGMA_STRIP.pageWidths.photography,
    contentSlots: [
      // Figma 972:132 — pink boxes (PGH, slopes, Carmel), scaled 1.6× + 0.5cm height
      pct(
        436.95 - PHOTOGRAPHY_SHIFT_X + PHOTOGRAPHY_SPREAD.pgh.x,
        191.48 + PHOTOGRAPHY_SPREAD.pgh.y,
        237.45 * PHOTOGRAPHY_SCALE,
        255.97 * PHOTOGRAPHY_SCALE + PHOTOGRAPHY_STRETCH_Y,
        0,
        1061,
        -6.53,
      ),
      pct(
        565.87 - PHOTOGRAPHY_SHIFT_X + PHOTOGRAPHY_SPREAD.slopes.x,
        518.48 + PHOTOGRAPHY_SPREAD.slopes.y,
        222.61 * PHOTOGRAPHY_SCALE,
        242.73 * PHOTOGRAPHY_SCALE + PHOTOGRAPHY_STRETCH_Y,
        0,
        1061,
        -1,
      ),
      pct(
        190.55 - PHOTOGRAPHY_SHIFT_X + PHOTOGRAPHY_SPREAD.carmel.x,
        565 + PHOTOGRAPHY_SPREAD.carmel.y,
        246.83 * PHOTOGRAPHY_SCALE,
        264.23 * PHOTOGRAPHY_SCALE + PHOTOGRAPHY_STRETCH_Y,
        0,
        1061,
        3,
      ),
    ],
    sticky: pct(35.12, 102, 231.49, 155.18, 0, 1061, 0),
  },
  tma: {
    figmaWidth: FIGMA_STRIP.pageWidths.tma,
    contentSlots: [pct(4458, 100, 895, 720, 4458, 895, 0)],
    sticky: pct(5077, 786, 231, 155, 4458, 895, -4),
  },
};

export function figmaPageWidthPx(
  figmaWidth: number,
  pageHeightPx = 720,
): number {
  return Math.round(figmaWidth * (pageHeightPx / FH));
}

export function slotsBoundingBox(slots: WireframeSlot[]): WireframeSlot {
  const minX = Math.min(...slots.map((slot) => slot.xPct));
  const minY = Math.min(...slots.map((slot) => slot.yPct));
  const maxX = Math.max(...slots.map((slot) => slot.xPct + slot.wPct));
  const maxY = Math.max(...slots.map((slot) => slot.yPct + slot.hPct));
  return {
    xPct: minX,
    yPct: minY,
    wPct: maxX - minX,
    hPct: maxY - minY,
  };
}
