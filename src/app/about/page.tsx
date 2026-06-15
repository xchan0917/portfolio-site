import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { site } from "@/lib/site";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description:
    "Cynthia Chan is an aspiring product designer focusing on AI products and service design. Business + HCI at Carnegie Mellon.",
};

export default function AboutPage() {
  return (
    <div className="pageShell">
      <SiteNav glass visibleAtTop />
      <div className="pageContent">
        <AboutContent />
        <SiteFooter />
      </div>
    </div>
  );
}
