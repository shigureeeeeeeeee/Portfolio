interface HobbyItem {
  title: string;
  description: string;
}

interface Translation {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    welcome: string;
    description: string;
    viewProjects: string;
  };
  about: {
    title: string;
    profile: {
      paragraphs: string[];
    };
    tabs: {
      profile: string;
      education: string;
      interests: string;
      experience: string;
    };
    education: string[];
    interests: string[];
    experience: string[];
    hobbies: {
      title: string;
      items: HobbyItem[];
    };
  };
  skills: {
    title: string;
    categories: {
      all: string;
      frontend: string;
      backend: string;
      tools: string;
    };
  };
  projects: {
    title: string;
    viewDetails: string;
    viewGithub: string;
    viewSite: string;
    close: string;
    technologies: string;
  };
  footer: {
    navigation: string;
    contact: string;
    social: string;
    copied: string;
    copyFailed: string;
  };
}

export const translations: { [key: string]: Translation } = {
  ja: {
    nav: {
      home: "ホーム",
      about: "自己紹介",
      skills: "スキル",
      projects: "プロジェクト",
      contact: "お問い合わせ",
    },
    hero: {
      welcome: "ようこそ!",
      description: "Web開発とAI技術に情熱を持つ開発者です",
      viewProjects: "プロジェクトを見る",
    },
    about: {
      title: "自己紹介",
      profile: {
        paragraphs: [
          "はじめまして！函館で情報系の勉強をしている大学生です。",
          "Web開発とAIに情熱を持ち、特にフロントエンド開発とUI/UXデザインに強い興味があります。",
          "新しい技術を学ぶことが大好きで、常に最新のトレンドをキャッチアップしています。",
        ],
      },
      tabs: {
        profile: "プロフィール",
        education: "学歴",
        interests: "興味",
        experience: "経験",
      },
      education: [
        "2022 - 公立はこだて未来大学 - 情報システムコース",
        "2019 - 士別翔雲高等学校 - 普通科",
        "2016 - 士別南中学校 - 普通科",
      ],
      interests: [
        "Web開発 - モダンなフレームワークを使用したWebアプリケーション開発",
        "AI/ML - 機械学習モデルの開発と実装",
        "UI/UXデザイン - ユーザー中心の直感的なインターフェース設計",
        "クラウド技術 - AWSやGCPを活用したスケーラブルなシステム構築",
      ],
      experience: [
        "2025 - 研究 - LLMを利用したプログラミング学習支援システムの作成",
        "2024 - インターンシップ - スタートアップ企業でのフロントエンド、バックエンド開発",
        "2023 - ハッカソン - webアプリの開発",
      ],
      hobbies: {
        title: "趣味",
        items: [
          {
            title: "ゲーム",
            description: "FPSゲームやインディーズゲームが好きです。",
          },
          {
            title: "音楽",
            description: "J-POPからクラシックまで幅広く聴きます。",
          },
          {
            title: "写真撮影",
            description:
              "風景や街並みの撮影が好きです。時々写真展にも足を運びます。",
          },
          {
            title: "読書",
            description: "技術書から小説まで。新しい知識を得るのが楽しみです。",
          },
          {
            title: "デザイン",
            description: "UIデザインやグラフィックデザインに関心があります。",
          },
        ],
      },
    },
    skills: {
      title: "スキル",
      categories: {
        all: "すべて",
        frontend: "フロントエンド",
        backend: "バックエンド",
        tools: "開発ツール",
      },
    },
    projects: {
      title: "プロジェクト",
      viewDetails: "詳細を見る",
      viewGithub: "GitHubを見る",
      viewSite: "サイトを見る",
      close: "閉じる",
      technologies: "使用技術：",
    },
    footer: {
      navigation: "ナビゲーション",
      contact: "お問い合わせ",
      social: "ソーシャル",
      copied: "コピーしました！",
      copyFailed: "コピーに失敗しました。もう一度お試しください。",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      welcome: "Welcome!",
      description:
        "A passionate developer focused on Web Development and AI Technology",
      viewProjects: "View Projects",
    },
    about: {
      title: "About Me",
      profile: {
        paragraphs: [
          "Hello! I'm a university student studying Information Systems in Hakodate.",
          "I'm passionate about Web Development and AI, with a particular interest in Frontend Development and UI/UX Design.",
          "I love learning new technologies and always keep up with the latest trends.",
        ],
      },
      tabs: {
        profile: "Profile",
        education: "Education",
        interests: "Interests",
        experience: "Experience",
      },
      education: [
        "2022 - Future University Hakodate - Information Systems Course",
        "2019 - Shibetsu Shoun High School - General Course",
        "2016 - Shibetsu Minami Junior High School",
      ],
      interests: [
        "Web Development - Building web applications using modern frameworks",
        "AI/ML - Developing and implementing machine learning models",
        "UI/UX Design - Creating intuitive user-centered interfaces",
        "Cloud Technology - Building scalable systems with AWS and GCP",
      ],
      experience: [
        "2025 - Research - Development of programming learning support system using LLM",
        "2024 - Internship - Frontend and Backend development at a startup company",
        "2023 - Hackathon - Web application development",
      ],
      hobbies: {
        title: "Hobbies",
        items: [
          {
            title: "Gaming",
            description: "I enjoy FPS and indie games.",
          },
          {
            title: "Music",
            description:
              "I listen to various genres from J-POP to classical music.",
          },
          {
            title: "Photography",
            description:
              "I enjoy capturing landscapes and cityscapes. I occasionally visit photo exhibitions.",
          },
          {
            title: "Reading",
            description:
              "From technical books to novels. I enjoy gaining new knowledge.",
          },
          {
            title: "Design",
            description: "I'm interested in UI design and graphic design.",
          },
        ],
      },
    },
    skills: {
      title: "Skills",
      categories: {
        all: "All",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools",
      },
    },
    projects: {
      title: "Projects",
      viewDetails: "View Details",
      viewGithub: "View GitHub",
      viewSite: "Visit Site",
      close: "Close",
      technologies: "Technologies Used:",
    },
    footer: {
      navigation: "Navigation",
      contact: "Contact",
      social: "Social",
      copied: "Copied!",
      copyFailed: "Failed to copy. Please try again.",
    },
  },
};
