export type Language = "ja" | "en";

type Strength = { title: string; description: string };
type TimelineItem = {
  year: string;
  type: "research" | "work" | "education";
  title: string;
  description: string;
};

interface Translation {
  common: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
  };
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    location: string;
    role: string;
    heading: string;
    accent: string;
    tagline: string;
    availability: string;
    viewProjects: string;
    contactMe: string;
    github: string;
    facts: Array<{ value: string; label: string }>;
  };
  about: {
    title: string;
    heading: string;
    lead: string;
    paragraphs: string[];
    strengthsLabel: string;
    strengths: Strength[];
    timelineLabel: string;
    timeline: TimelineItem[];
  };
  skills: {
    title: string;
    heading: string;
    description: string;
    evidenceLabel: string;
    categories: {
      web: string;
      backendAi: string;
      nativeGame: string;
    };
  };
  projects: {
    title: string;
    heading: string;
    description: string;
    featured: string;
    repository: string;
    liveDemo: string;
    highlights: string;
    role: string;
  };
  contact: {
    title: string;
    heading: string;
    description: string;
    availability: string;
    emailLabel: string;
    emailCta: string;
    githubCta: string;
  };
  footer: {
    tagline: string;
    backToTop: string;
  };
}

export const translations: Record<Language, Translation> = {
  ja: {
    common: {
      skipToContent: "本文へ移動",
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる",
    },
    nav: {
      home: "ホーム",
      about: "自己紹介",
      skills: "スキル",
      projects: "プロジェクト",
      contact: "お問い合わせ",
    },
    hero: {
      location: "Hakodate, Japan",
      role: "Software Engineer · Web / AI / Native",
      heading: "考えて、作って、",
      accent: "使える形まで。",
      tagline:
        "WebとAIを軸に、学習課題から日常の小さな不便まで、ソフトウェアで解決しています。要件を整理し、設計・実装・改善まで一貫して取り組むエンジニアです。",
      availability: "新しい機会・技術交流のご連絡を歓迎します",
      viewProjects: "制作実績を見る",
      contactMe: "メールで連絡",
      github: "GitHub",
      facts: [
        { value: "3", label: "公開プロジェクト" },
        { value: "Web · AI · Native", label: "実装領域" },
        { value: "JA / EN", label: "ポートフォリオ言語" },
      ],
    },
    about: {
      title: "about",
      heading: "課題を理解し、最後まで実装する",
      lead:
        "公立はこだて未来大学で情報システムを学びながら、Web、AI、Windowsネイティブ、ゲームModまで幅広く開発しています。",
      paragraphs: [
        "卒業研究では、プログラミング学習者の省察を促すAI対話システムを設計。Vue 3とFastAPIで学習画面、シミュレーション、複数LLMを扱うAPIを実装しています。",
        "技術そのものよりも、利用者が迷わず使えることと、後から改善できる構造を大切にしています。README、セットアップ手順、責務分離まで含めてプロダクトとして整えます。",
      ],
      strengthsLabel: "開発で大切にしていること",
      strengths: [
        {
          title: "課題から設計する",
          description:
            "機能を作り始める前に、誰のどんな問題を解くのかを言葉にし、必要な体験と構成へ落とし込みます。",
        },
        {
          title: "領域をまたいで実装する",
          description:
            "UI、API、LLM連携、OS APIまで、目的に必要な技術を選び、境界をつないで動く形にします。",
        },
        {
          title: "使い続けられる形にする",
          description:
            "責務分離、フォールバック、日英対応、ドキュメントを含め、運用と改善を意識して仕上げます。",
        },
      ],
      timelineLabel: "Experience & Education",
      timeline: [
        {
          year: "2025–2026",
          type: "research",
          title: "卒業研究 · AIプログラミング学習支援",
          description:
            "AIとの対話が学習者の省察的思考を促進できるかを検証するWebシステムを設計・実装。",
        },
        {
          year: "2024",
          type: "work",
          title: "スタートアップ企業 · 開発インターン",
          description:
            "フロントエンドとバックエンドの実装を経験し、プロダクト開発の流れを実務で学習。",
        },
        {
          year: "2023",
          type: "work",
          title: "ハッカソン · Webアプリ開発",
          description:
            "限られた期間でアイデアを整理し、チームでWebアプリケーションを実装。",
        },
        {
          year: "2022–",
          type: "education",
          title: "公立はこだて未来大学",
          description: "情報システムコースで、ソフトウェアと情報技術を学習。",
        },
      ],
    },
    skills: {
      title: "skills",
      heading: "作ったものに結びつく技術",
      description:
        "自己評価のパーセンテージではなく、実際のプロジェクトで使用した技術と、その利用先を掲載しています。",
      evidenceLabel: "使用実績",
      categories: {
        web: "Web / Frontend",
        backendAi: "Backend / AI",
        nativeGame: "Native / Game",
      },
    },
    projects: {
      title: "projects",
      heading: "課題・実装・工夫が分かる制作実績",
      description:
        "実在するリポジトリから、目的と技術的な工夫を説明できる3作品を選びました。各リンクから実装とドキュメントを確認できます。",
      featured: "Featured project",
      repository: "コードと詳細を見る",
      liveDemo: "デモを見る",
      highlights: "実装のポイント",
      role: "担当",
    },
    contact: {
      title: "contact",
      heading: "一緒に作れることを、話しましょう",
      description:
        "開発のご相談、採用に関するご連絡、技術交流など、お気軽にメールをお送りください。内容を確認のうえ返信します。",
      availability: "現在、新しい機会やコラボレーションのご相談を受け付けています。",
      emailLabel: "Email",
      emailCta: "メールを送る",
      githubCta: "GitHubを見る",
    },
    footer: {
      tagline: "Designed and built by Shigure with Next.js and TypeScript.",
      backToTop: "ページ上部へ",
    },
  },
  en: {
    common: {
      skipToContent: "Skip to content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      location: "Hakodate, Japan",
      role: "Software Engineer · Web / AI / Native",
      heading: "From an idea to",
      accent: "software people can use.",
      tagline:
        "I solve learning challenges and everyday friction through software, with a focus on Web and AI. I take projects from problem framing through design, implementation, and iteration.",
      availability: "Open to opportunities and conversations about technology",
      viewProjects: "View selected work",
      contactMe: "Send an email",
      github: "GitHub",
      facts: [
        { value: "3", label: "Public projects" },
        { value: "Web · AI · Native", label: "Engineering range" },
        { value: "JA / EN", label: "Portfolio languages" },
      ],
    },
    about: {
      title: "about",
      heading: "Understand the problem. Build through the finish.",
      lead:
        "I study Information Systems at Future University Hakodate and build across the Web, AI, Windows native development, and game modding.",
      paragraphs: [
        "For my graduation research, I designed an AI dialogue system that encourages programming learners to reflect. I am implementing the learning interface, simulator, and multi-provider LLM API with Vue 3 and FastAPI.",
        "I care less about using technology for its own sake and more about making products understandable to users and maintainable by developers. That includes documentation, setup, fallback behavior, and clear responsibilities.",
      ],
      strengthsLabel: "How I approach development",
      strengths: [
        {
          title: "Start with the problem",
          description:
            "Before building features, I clarify who I am helping and why, then translate that into an experience and architecture.",
        },
        {
          title: "Work across boundaries",
          description:
            "I connect interfaces, APIs, LLM integrations, and native OS APIs using the tools the problem calls for.",
        },
        {
          title: "Build for continued use",
          description:
            "Separation of concerns, fallbacks, localization, and documentation make software easier to operate and improve.",
        },
      ],
      timelineLabel: "Experience & Education",
      timeline: [
        {
          year: "2025–2026",
          type: "research",
          title: "Graduation research · AI learning support",
          description:
            "Designed and built a web system investigating whether AI dialogue can encourage reflective thinking in programming learners.",
        },
        {
          year: "2024",
          type: "work",
          title: "Development internship · Startup",
          description:
            "Worked across frontend and backend implementation and learned the flow of product development in practice.",
        },
        {
          year: "2023",
          type: "work",
          title: "Hackathon · Web application",
          description:
            "Scoped an idea and collaborated on a working web application within a limited timeframe.",
        },
        {
          year: "2022–",
          type: "education",
          title: "Future University Hakodate",
          description: "Studying software and information technology in the Information Systems course.",
        },
      ],
    },
    skills: {
      title: "skills",
      heading: "Skills backed by shipped work",
      description:
        "Instead of arbitrary percentages, each technology is connected to a project where I used it.",
      evidenceLabel: "Used in",
      categories: {
        web: "Web / Frontend",
        backendAi: "Backend / AI",
        nativeGame: "Native / Game",
      },
    },
    projects: {
      title: "projects",
      heading: "Selected work with context",
      description:
        "Three real repositories selected for the problem they address and the engineering decisions behind them. Each link leads to the implementation and documentation.",
      featured: "Featured project",
      repository: "View code & details",
      liveDemo: "View live demo",
      highlights: "Implementation highlights",
      role: "Role",
    },
    contact: {
      title: "contact",
      heading: "Let’s talk about what we can build",
      description:
        "Feel free to email me about development work, opportunities, collaboration, or technology. I will reply after reviewing your message.",
      availability: "I am currently open to new opportunities and collaborations.",
      emailLabel: "Email",
      emailCta: "Send an email",
      githubCta: "View GitHub",
    },
    footer: {
      tagline: "Designed and built by Shigure with Next.js and TypeScript.",
      backToTop: "Back to top",
    },
  },
};
