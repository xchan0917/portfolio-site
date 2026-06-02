import Image from "next/image";
import { Josefin_Sans, Red_Hat_Display } from "next/font/google";
import pgh from "./pgh.module.css";

const redHat = Red_Hat_Display({ subsets: ["latin"], weight: "400" });
const josefin = Josefin_Sans({ subsets: ["latin"], weight: "400" });

const COLORS = [
  { hex: "#01ACD8" },
  { hex: "#F275AD" },
  { hex: "#FBFBFB" },
  { hex: "#FFE571" },
] as const;

export function BrandGuidelines() {
  return (
    <div className={pgh.brandPanel}>
      <div className={pgh.brandGrid}>
        <section className={`${pgh.brandCell} ${pgh.brandCellInset}`}>
          <span className={pgh.brandLabel}>[Logo]</span>
          <div className={pgh.logoPair}>
            <Image
              src="/projects/pgh/logo-badge.png"
              alt="Children's Museum logo on yellow badge"
              width={1476}
              height={1072}
              className={pgh.logoBadge}
            />
            <Image
              src="/projects/pgh/logo.png"
              alt="Children's Museum wordmark"
              width={320}
              height={120}
              className={pgh.logoWordmark}
            />
          </div>
        </section>

        <section className={pgh.brandCell}>
          <span className={pgh.brandLabel}>[Brand Colors]</span>
          <div className={pgh.swatchRow}>
            {COLORS.map((c) => (
              <div key={c.hex} className={pgh.swatch}>
                <span
                  className={pgh.swatchChip}
                  style={{ backgroundColor: c.hex }}
                />
                <span className={pgh.swatchHex}>{c.hex}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={`${pgh.brandCell} ${pgh.brandCellInset}`}>
          <span className={pgh.brandLabel}>[Components]</span>
          <div className={pgh.componentList}>
            <div className={pgh.componentItem}>
              <span className={pgh.componentSublabel}>[ellipsis menu]</span>
              <div className={pgh.ellipsisMenu} aria-hidden>
                <span className={pgh.ellipsisDot} />
                <span className={`${pgh.ellipsisDot} ${pgh.ellipsisDotMuted}`} />
                <span className={`${pgh.ellipsisDot} ${pgh.ellipsisDotMuted}`} />
              </div>
            </div>
            <div className={pgh.componentItem}>
              <span className={pgh.componentSublabel}>[Swipe feature]</span>
              <div className={pgh.swipePair} aria-hidden>
                <span className={`${pgh.swipeCard} ${pgh.swipeCardGreen}`} />
                <span className={`${pgh.swipeCard} ${pgh.swipeCardBlue}`} />
              </div>
            </div>
          </div>
        </section>

        <section className={pgh.brandCell}>
          <span className={pgh.brandLabel}>[Typography]</span>
          <div className={pgh.typeList}>
            <div className={pgh.typeItem}>
              <span className={`${pgh.typeSample} ${redHat.className}`}>
                Red Hat Display Regular
              </span>
            </div>
            <div className={pgh.typeItem}>
              <span className={`${pgh.typeSample} ${josefin.className}`}>
                Josefin Sans Regular
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
