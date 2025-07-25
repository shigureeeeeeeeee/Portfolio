// GitHub APIから取得するリポジトリ情報の型定義
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
}

// 言語統計の型定義
export interface LanguageStats {
  [language: string]: number;
}

// プロジェクトの型定義（GitHub APIベース）
export interface GitHubProject {
  id: string;
  name: string;
  title: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  longDescription: {
    ja: string;
    en: string;
  };
  technologies: string[];
  link: string;
  github: string;
  category: 'web' | 'api' | 'tool' | 'library' | 'mobile';
  status: 'completed' | 'in-progress' | 'archived';
  featured?: boolean;
  stars: number;
  forks: number;
  language: string | null;
  lastUpdated: string;
}

// GitHub API設定
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'shigureeeeeeeeee'; // GitHubユーザー名

// プロジェクト情報のマッピング（日本語タイトルと説明を提供）
const PROJECT_METADATA: Record<string, {
  title: { ja: string; en: string };
  description: { ja: string; en: string };
  longDescription: { ja: string; en: string };
  category: 'web' | 'api' | 'tool' | 'library' | 'mobile';
  featured?: boolean;
}> = {
  'Portfolio': {
    title: {
      ja: 'ポートフォリオサイト',
      en: 'Portfolio Website'
    },
    description: {
      ja: 'Next.js、TypeScript、Tailwind CSSを駆使したインタラクティブな個人ポートフォリオサイト',
      en: 'An interactive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS'
    },
    longDescription: {
      ja: 'Next.js、TypeScript、Tailwind CSSを使用して作成した個人ポートフォリオサイトです。アニメーションにはFramer Motionを使用し、インタラクティブな要素を追加しています。レスポンシブデザインにより、様々なデバイスで最適な表示を実現しています。',
      en: 'A personal portfolio website created using Next.js, TypeScript, and Tailwind CSS. Interactive elements are added using Framer Motion for animations. The responsive design ensures optimal display across various devices.'
    },
    category: 'web',
    featured: true
  },
  'BlogCraft': {
    title: {
      ja: 'ブログ作成アプリ',
      en: 'Blog Creation App'
    },
    description: {
      ja: 'React、TypeScript、Firebaseを活用したフル機能のブログ管理システム',
      en: 'A full-featured blog management system built with React, TypeScript, and Firebase'
    },
    longDescription: {
      ja: 'React、TypeScript、Tailwind CSSを使用して開発したブログ管理アプリケーションです。Markdownエディタを実装し、記事の作成と編集を容易にしています。Firebaseを利用してユーザー認証とデータの永続化を実現。',
      en: 'A blog management application developed using React, TypeScript, and Tailwind CSS. Implements a Markdown editor for easy article creation and editing. User authentication and data persistence are achieved using Firebase.'
    },
    category: 'web'
  },
  'ScheduleGenerator': {
    title: {
      ja: 'スケジュールジェネレーター',
      en: 'Schedule Generator'
    },
    description: {
      ja: 'Python、Gemini1.5 Flash APIを組み合わせたAI駆動のスケジュール最適化ツール',
      en: 'An AI-driven schedule optimization tool combining Python and Gemini1.5 Flash API'
    },
    longDescription: {
      ja: 'Python、FastAPI、React、TypeScriptを使用して開発したAI駆動のスケジュール生成アプリケーションです。機械学習モデルを用いてユーザーの好みや制約を考慮し、最適なスケジュールを提案します。',
      en: 'An AI-driven schedule generation application developed using Python, FastAPI, React, and TypeScript. Using machine learning models, it suggests optimal schedules considering user preferences and constraints.'
    },
    category: 'tool'
  }
};

// カテゴリを推測する関数
const inferCategory = (repo: GitHubRepo, languages: string[]): 'web' | 'api' | 'tool' | 'library' | 'mobile' => {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const topics = repo.topics.map(t => t.toLowerCase());
  
  // 明示的なキーワードでカテゴリを判定
  if (topics.includes('mobile') || topics.includes('android') || topics.includes('ios') || languages.includes('Swift') || languages.includes('Kotlin')) {
    return 'mobile';
  }
  
  if (topics.includes('api') || description.includes('api') || name.includes('api') || languages.includes('Express')) {
    return 'api';
  }
  
  if (topics.includes('library') || name.includes('lib') || description.includes('library') || description.includes('package')) {
    return 'library';
  }
  
  if (topics.includes('web') || languages.includes('TypeScript') || languages.includes('JavaScript') || languages.includes('React') || languages.includes('Next.js')) {
    return 'web';
  }
  
  return 'tool'; // デフォルト
};

// リポジトリの言語統計を取得
export async function getRepositoryLanguages(owner: string, repo: string): Promise<string[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`);
    if (!response.ok) return [];
    
    const languages: LanguageStats = await response.json();
    return Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
  } catch (error) {
    console.error(`Failed to fetch languages for ${repo}:`, error);
    return [];
  }
}

// ユーザーのリポジトリ一覧を取得
export async function getUserRepositories(username: string = GITHUB_USERNAME): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?type=owner&sort=updated&per_page=100`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    // フォークされたリポジトリを除外し、アーカイブされていないもののみを返す
    return repos.filter(repo => 
      !repo.full_name.includes('/') || 
      repo.full_name.startsWith(username)
    );
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    return [];
  }
}

// GitHub APIから取得したデータをプロジェクト形式に変換
export async function transformRepoToProject(repo: GitHubRepo): Promise<GitHubProject> {
  const languages = await getRepositoryLanguages(GITHUB_USERNAME, repo.name);
  const metadata = PROJECT_METADATA[repo.name];
  
  // ステータスを判定
  const now = new Date();
  const lastUpdate = new Date(repo.pushed_at);
  const daysSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  
  let status: 'completed' | 'in-progress' | 'archived';
  if (repo.archived) {
    status = 'archived';
  } else if (daysSinceUpdate < 30) {
    status = 'in-progress';
  } else {
    status = 'completed';
  }
  
  return {
    id: repo.id.toString(),
    name: repo.name,
    title: metadata?.title || {
      ja: repo.name,
      en: repo.name
    },
    description: metadata?.description || {
      ja: repo.description || 'GitHubプロジェクト',
      en: repo.description || 'GitHub Project'
    },
    longDescription: metadata?.longDescription || {
      ja: repo.description || 'GitHubから取得したプロジェクトです。',
      en: repo.description || 'A project fetched from GitHub.'
    },
    technologies: languages.slice(0, 5), // 上位5つの言語
    link: repo.homepage || repo.html_url,
    github: repo.html_url,
    category: metadata?.category || inferCategory(repo, languages),
    status,
    featured: metadata?.featured || false,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    lastUpdated: repo.updated_at
  };
}

// メインの関数：GitHubからプロジェクト一覧を取得
export async function fetchGitHubProjects(): Promise<GitHubProject[]> {
  try {
    const repos = await getUserRepositories();
    
    // 重要なプロジェクトのみをフィルタリング
    const filteredRepos = repos.filter(repo => {
      // アーカイブされていない、ドットファイルではないリポジトリ
      return !repo.archived && 
             !repo.name.startsWith('.'); // ドットファイルを除外
    });
    
    // 並行して変換処理を実行
    const projects = await Promise.all(
      filteredRepos.map(repo => transformRepoToProject(repo))
    );
    
    // featured プロジェクトを先頭に、その後は更新日順
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });
    
  } catch (error) {
    console.error('Failed to fetch GitHub projects:', error);
    return [];
  }
}