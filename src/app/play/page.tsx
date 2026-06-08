import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { site } from "@/lib/site";
import { PlayJournal } from "./PlayJournal";
import styles from "./playJournal.module.css";

export const metadata: Metadata = {
  title: `Playground — ${site.name}`,
  description:
    "A digital journal of side projects, ceramics, murals, and visual experiments.",
};

export default function PlayPage() {
  return (
    <div className="pageShell">
      <SiteNav glass visibleAtTop />
      <div className={`pageContent ${styles.playPage}`}>
        <main className={styles.playMain}>
          <PlayJournal />
        </main>
      </div>
    </div>
  );
}
