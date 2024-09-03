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
      "はじめまして。公立はこだて未来大学の学生で、Web開発とAI技術に情熱を注いでいます。私の目標は、技術を通じて人々の生活を豊かにし、社会に貢献することです。",
      "大学では情報科学を専攻し、アルゴリズム、データ構造、機械学習の基礎を学んでいます。授業外では、React、Next.js、TypeScriptを用いたWebアプリケーション開発に取り組み、ユーザー体験の向上に力を入れています。また、PythonとTensorFlowを活用し、画像認識や自然言語処理などのAIプロジェクトにも挑戦しています。",
      "最近は、Pythonを使って日常生活を便利にするアプリケーションの開発にも取り組んでいます。例えば、自動化スクリプトやスケジュール自動生成アプリなど、実用的なソリューションの作成に挑戦しています。",
      "技術の急速な進化に常に興味を持ち、新しい知識やスキルの習得に励んでいます。将来は、Web技術とAIを融合させた革新的なサービスを開発し、テクノロジーの力で社会課題の解決に貢献したいと考えています。"
    ]
  },
  education: [
    "公立はこだて未来大学 システム情報科学部 複雑系知能学科 在学中",
    "GPA: 2.14/4.0"
  ],
  achievements: [
    "AtCoder 茶色",
    "Paiza Sランク",
    "TOEIC スコア 645"
  ],
  interests: [
    "ウェブアプリケーション開発: React, Next.js, TypeScript",
    "機械学習と深層学習: TensorFlow, PyTorch",
    "クラウドコンピューティング: Vercel, Google Cloud Platform"
  ],
  hobbies: "コーヒー、読書、料理、Web開発、競技プログラミング",
  experience: [
    "現在作成中......"
  ]
};
