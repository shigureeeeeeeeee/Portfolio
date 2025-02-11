export interface AboutMeContent {
  profile: {
    paragraphs: string[];
  };
  education: string[];
  achievements: string[];
  interests: string[];
  hobbies: string;
  experience: string[];
}

export const aboutMeContent: AboutMeContent = {
  profile: {
    paragraphs: [
      "はじめまして！函館で情報系の勉強をしている大学生です。",
      "Web開発とAIに情熱を持ち、特にフロントエンド開発とUI/UXデザインに強い興味があります。",
      "新しい技術を学ぶことが大好きで、常に最新のトレンドをキャッチアップしています。",
    ],
  },
  education: [
    "2021 - 公立はこだて未来大学 - 情報システムコース",
    "2020 - 函館工業高等専門学校 - 情報工学科",
    "2018 - 函館高等学校 - 普通科",
  ],
  achievements: [
    "技術賞 - 全国高専プログラミングコンテストで技術賞を受賞",
    "最優秀賞 - 学内ハッカソンで最優秀賞を受賞",
    "認定資格 - AWS Certified Solutions Architect Associate取得",
    "研究発表 - 情報処理学会で研究発表を行う",
  ],
  interests: [
    "Web開発 - モダンなフレームワークを使用したWebアプリケーション開発",
    "AI/ML - 機械学習モデルの開発と実装",
    "UI/UXデザイン - ユーザー中心の直感的なインターフェース設計",
    "クラウド技術 - AWSやGCPを活用したスケーラブルなシステム構築",
  ],
  experience: [
    "2023 - インターンシップ - 大手IT企業でフロントエンド開発",
    "2022 - 研究プロジェクト - AIを活用した画像認識システムの開発",
    "2021 - アルバイト - Webサイトの制作と保守",
  ],
  hobbies: "プログラミング、音楽鑑賞、写真撮影、読書",
};
