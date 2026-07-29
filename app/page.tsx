import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <Skills />
    </main>
  );
}
