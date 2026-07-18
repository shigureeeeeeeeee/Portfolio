import {
  SiCmake,
  SiCplusplus,
  SiFastapi,
  SiGit,
  SiGradle,
  SiNextdotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

export const skillCategories = [
  {
    name: "web",
    description: {
      ja: "型安全なUI実装から、学習体験を支える状態設計まで。",
      en: "From type-safe interfaces to state design for learning experiences.",
    },
    skills: [
      { name: "TypeScript", icon: SiTypescript, evidence: "Portfolio" },
      { name: "Next.js", icon: SiNextdotjs, evidence: "Portfolio" },
      { name: "React", icon: SiReact, evidence: "Portfolio" },
      { name: "Vue 3", icon: SiVuedotjs, evidence: "Graduation Research" },
      { name: "Tailwind CSS", icon: SiTailwindcss, evidence: "Portfolio" },
    ],
  },
  {
    name: "backendAi",
    description: {
      ja: "API設計と、複数のLLMを扱うフォールバック可能な構成。",
      en: "API design and resilient integrations across multiple LLM providers.",
    },
    skills: [
      { name: "Python", icon: SiPython, evidence: "Graduation Research" },
      { name: "FastAPI", icon: SiFastapi, evidence: "Graduation Research" },
      { name: "Gemini API", icon: SiPython, evidence: "Graduation Research" },
      { name: "Ollama", icon: SiPython, evidence: "Graduation Research" },
    ],
  },
  {
    name: "nativeGame",
    description: {
      ja: "OSのAPIからゲームのワールド生成まで、目的に合わせて低い層にも降りる実装。",
      en: "Systems work ranging from native OS APIs to game world generation.",
    },
    skills: [
      { name: "C++17", icon: SiCplusplus, evidence: "Windows Tools" },
      { name: "Win32 API", icon: SiCplusplus, evidence: "Windows Tools" },
      { name: "Java 17", icon: SiOpenjdk, evidence: "Abyss World" },
      { name: "Minecraft Forge", icon: SiOpenjdk, evidence: "Abyss World" },
      { name: "CMake", icon: SiCmake, evidence: "Windows Tools" },
      { name: "Gradle", icon: SiGradle, evidence: "Abyss World" },
      { name: "Git", icon: SiGit, evidence: "All projects" },
    ],
  },
] as const;
