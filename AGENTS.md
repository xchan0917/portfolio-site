<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Play Journal — Design Guardrails

Fixed decisions for every journal page in `/play`. When a rule lives here, do not re-invent or drift from it.

**Implementation files:** `src/app/play/PlayJournal.tsx`, `src/app/play/playJournal.module.css`, `src/lib/playJournal.ts`, `src/lib/playJournalLayouts.ts`

---

## Page & canvas

- **Page size:** `880 × 1100 px` (4:5 portrait). Every page uses this same fixed size — varying it is the number one reason pages stop looking like the same notebook.
- **Inner padding:** `64 px` between the page edge and its contents. Nothing touches the edge.
- **Backdrop:** Reuse the homepage surface — soft cream-to-blush gradient with the lavender glow (see `.pageShell` and `.pageShell::after` in `src/app/globals.css`). Keep it low-contrast so the page stays the hero.

---

## Palette

Exact codes only — never colour names like "cream" or "lavender".

| Role | Hex |
|------|-----|
| Paper | `#FAF6F3` |
| Ink — body text | `#1E1725` |
| Handwriting / script + headers | `#513A7B` |
| Accent — lavender | `#BBAFC5` |
| Accent — blush | `#F8EFEE` |
| Hairlines, stars, secondary marks | `#D5CDD7` |
| Sticky note — lavender | `#E4DCEC` |
| Sticky note — blush | `#F3E4E6` |

---

## Type

Use the site's existing font variables from `src/app/layout.tsx` — coherence beats novelty.

| Role | Font | CSS variable | Size |
|------|------|--------------|------|
| Title | Instrument Serif | `var(--font-display)` | `60px` |
| Handwritten captions + faint narrative | Caveat | `var(--font-cursive)` | `18px` |
| Byline + footer labels | IBM Plex Mono | `var(--font-mono)` | `13px` |
| Body (when needed) | DM Sans | `var(--font-sans)` | — |

---

## Photo frames (polaroids)

- Frame colour: `#FFFFFF`
- Border thickness: `10 px` top and sides, `40 px` bottom (classic polaroid proportion)
- Shadow: `0 4px 12px rgba(30, 23, 37, 0.16)` (tinted with ink, not flat black)
- Faint label at the bottom: yes

---

## Sticky notes

- **Allowed colours (two only):** `#E4DCEC` and `#F3E4E6`
- Style: soft shadow `0 3px 8px rgba(30, 23, 37, 0.14)`, slight corner curl, optional washi-tape strip at the top

---

## Rotation range

Keep every tilted element inside **−6° to +6°**. Small varied tilt reads handmade; more reads chaotic.

---

## Decoration rules

Sparse accents only. Echo the homepage vocabulary:

- **Allowed:** small four-point stars (`#D5CDD7`), thin indigo squiggles / arrows (`#513A7B`), washi tape in blush or lavender, a small doodle or two
- **Maximum per page:** `5`

---

## Layering order (front to back)

1. Backdrop
2. The notebook page + binding
3. Faint handwritten narrative text
4. Photos (polaroids)
5. Sticky notes + tape + paperclips
6. Doodles / stars

---

## Fixed chrome vs. per-page slots

**Fixed every page (chrome):** backdrop, the page, the binding, the footer (handle + year)

**Changes per page (slots):** title text, byline, 2–3 photos, one sticky-note caption, the faint narrative line, decoration placement

Do not modify chrome when filling slots.

---

## Behavioural rules (add as mistakes appear)

_Add specific "never do X / always do Y" rules here after watching real build sessions — do not guess in advance._
