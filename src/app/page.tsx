import { Hero } from "@/components/Hero";
import { SelectedProjects } from "@/components/SelectedProjects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <div className="pageShell">
      <SiteNav />
      <div className="pageContent">
        <main>
          <Hero />
          <SelectedProjects />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
