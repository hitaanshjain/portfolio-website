import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { CompactProjects } from "@/components/CompactProjects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <FeaturedProjects />
      <CompactProjects />
      <Skills />
      <About />
    </main>
  );
}
