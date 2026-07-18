import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ContactSection } from "@/sections/ContactSection";
import { projects } from "@/data/projects";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Shigure",
    url: "https://aboutme-shigure.vercel.app",
    email: "mailto:shigure.tk1090@gmail.com",
    homeLocation: {
      "@type": "Place",
      name: "Hakodate, Japan",
    },
    sameAs: ["https://github.com/shigureeeeeeeeee"],
    knowsAbout: [
      "TypeScript",
      "Next.js",
      "Vue.js",
      "Python",
      "FastAPI",
      "C++",
      "Java",
      "Artificial Intelligence",
    ],
  },
};

export default function Home() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
