export type LocalizedText = {
  ja: string;
  en: string;
};

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  highlights: {
    ja: string[];
    en: string[];
  };
  technologies: string[];
  link?: string;
  github: string;
  category: "web" | "tool" | "game";
  status: "completed" | "in-progress" | "research";
  statusLabel: LocalizedText;
  role: LocalizedText;
  period: string;
  featured?: boolean;
}

/**
 * Portfolio copy is deliberately curated here instead of being generated from
 * GitHub descriptions. GitHub metadata can supplement these entries, but the
 * story a reviewer reads must remain accurate and useful even when the API is
 * unavailable.
 */
export const projects: Project[] = [
  {
    id: "graduation-research",
    title: {
      ja: "AIプログラミング学習支援システム",
      en: "AI-assisted Programming Learning System",
    },
    description: {
      ja: "AIとの対話とシミュレーションを組み合わせ、学習者の省察的思考を支援する卒業研究のWebアプリケーション。",
      en: "A graduation research web app that combines AI dialogue and simulation to encourage reflective thinking in programming learners.",
    },
    longDescription: {
      ja: "センサーとアクションを組み合わせる課題を題材に、ルール構築、4条件での動作確認、ソクラテス式のAI対話を一つの学習フローに統合しました。Gemini、Ollama、ルールベースのフォールバックを切り替えられる構成です。",
      en: "The app unifies rule construction, simulation across four conditions, and Socratic AI dialogue into one learning flow. Its provider layer supports Gemini, Ollama, and a rule-based fallback.",
    },
    highlights: {
      ja: [
        "Vue 3とFastAPIを分離したフロントエンド／API構成",
        "Gemini・Ollama・ルールベースを切り替えるLLM層",
        "複数AIの発言をJSON Linesで順次配信する討論機能",
      ],
      en: [
        "Separated Vue 3 frontend and FastAPI backend",
        "Provider layer for Gemini, Ollama, and rule-based fallback",
        "Streaming multi-agent discussion over JSON Lines",
      ],
    },
    technologies: ["Vue 3", "Python", "FastAPI", "Gemini API", "Ollama"],
    github: "https://github.com/shigureeeeeeeeee/GraduationResearch",
    category: "web",
    status: "research",
    statusLabel: { ja: "卒業研究", en: "Graduation research" },
    role: { ja: "企画・設計・実装", en: "Concept, design & development" },
    period: "2025–2026",
    featured: true,
  },
  {
    id: "abyss-world",
    title: { ja: "Abyss World", en: "Abyss World" },
    description: {
      ja: "5つの深淵階層を探索し、魔術・機械・装備を発展させるMinecraft Forge向けコンテンツMod。",
      en: "A Minecraft Forge content mod built around five abyss layers, exploration, magic, machinery, and equipment progression.",
    },
    longDescription: {
      ja: "独自バイオーム、構造物、敵、ボスに加え、魔力ネットワーク、鉱石処理、自動化、グリフ魔術まで横断して設計しています。データ生成と日英ローカライズを含む大規模なJavaプロジェクトです。",
      en: "The project spans custom biomes, structures, enemies, bosses, a magic network, ore processing, automation, and glyph-based spells, with data generation and bilingual localization.",
    },
    highlights: {
      ja: [
        "5階層それぞれのワールド生成・進行・ボス設計",
        "魔力ネットワークと多段階の鉱石自動処理",
        "専用サーバーを含むクライアント／サーバー両対応",
      ],
      en: [
        "World generation, progression, and bosses across five layers",
        "Magic network and multi-stage automated ore processing",
        "Client and dedicated-server support",
      ],
    },
    technologies: ["Java 17", "Minecraft Forge", "Gradle", "TerraBlender"],
    github: "https://github.com/shigureeeeeeeeee/MinecraftMod-AbbysWorld",
    category: "game",
    status: "in-progress",
    statusLabel: { ja: "開発中", en: "In development" },
    role: { ja: "ゲーム設計・実装", en: "Game design & development" },
    period: "2026",
    featured: true,
  },
  {
    id: "audio-switcher",
    title: { ja: "Audio Switcher", en: "Audio Switcher" },
    description: {
      ja: "Windowsの既定再生デバイスを、画面操作またはグローバルホットキーで切り替える軽量な常駐アプリ。",
      en: "A lightweight Windows tray app for switching the default playback device from the UI or a global hotkey.",
    },
    longDescription: {
      ja: "外部ランタイムやPowerShellモジュールを必要とせず、Core Audio APIを直接利用。設定保存、二重起動防止、Explorer再起動後のトレイ復元、高DPI表示まで実装しています。",
      en: "Built directly on the Core Audio API without an external runtime or PowerShell module. It includes persistent settings, single-instance behavior, tray recovery, and high-DPI support.",
    },
    highlights: {
      ja: [
        "Core Audio APIによる再生デバイス制御",
        "デバイス別ホットキーと設定の自動保存",
        "管理者権限不要・単体で動作するC++17アプリ",
      ],
      en: [
        "Playback-device control through the Core Audio API",
        "Per-device hotkeys with persistent settings",
        "Standalone C++17 app that requires no administrator privileges",
      ],
    },
    technologies: ["C++17", "Win32 API", "Core Audio API", "CMake"],
    github: "https://github.com/shigureeeeeeeeee/AudioSwitcher",
    category: "tool",
    status: "completed",
    statusLabel: { ja: "公開中", en: "Published" },
    role: { ja: "設計・実装", en: "Design & development" },
    period: "2026",
    featured: true,
  },
];
