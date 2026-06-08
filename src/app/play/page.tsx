import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { playgroundItems } from "@/lib/playground";
import { site } from "@/lib/site";
import { PlaygroundCanvas } from "./PlaygroundCanvas";
import styles from "./playground.module.css";

export const metadata: Metadata = {
  title: `Playground — ${site.name}`,
  description:
    "Bits and pieces of side projects, ceramics, murals, and visual experiments.",
};

export default function PlayPage() {
  return (
    <div className="pageShell">
      <SiteNav glass visibleAtTop />
      <div className={`pageContent ${styles.playPage}`}>
        <main className={styles.playMain}>
          <PlaygroundCanvas items={playgroundItems} />
        </main>
      </div>
    </div>
  );
}
