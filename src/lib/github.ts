import "server-only";

import { projects as curatedProjects, type Project } from "@/data/projects";

interface GitHubLanguage {
  name: string;
}

interface PinnedRepository {
  __typename: "Repository";
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  isArchived: boolean;
  pushedAt: string | null;
  languages: {
    nodes: Array<GitHubLanguage | null>;
  };
}

interface PinnedRepositoriesData {
  user: {
    pinnedItems: {
      nodes: Array<PinnedRepository | null>;
    };
  } | null;
}

interface GitHubGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_PROFILE_REVALIDATE_SECONDS = 60 * 60;
const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME ??
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ??
  "shigureeeeeeeeee";

const PINNED_REPOSITORIES_QUERY = `
  query PinnedRepositories($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            __typename
            id
            name
            description
            url
            homepageUrl
            isArchived
            pushedAt
            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const getRepositoryName = (githubUrl: string): string => {
  const pathname = new URL(githubUrl).pathname.replace(/\/$/, "");
  return pathname.split("/").at(-1)?.toLowerCase() ?? "";
};

const isPortfolioRepository = (repositoryName: string): boolean =>
  repositoryName.toLowerCase() === "portfolio";

const fallbackProjects = (): Project[] =>
  curatedProjects.filter(
    (project) => !isPortfolioRepository(getRepositoryName(project.github))
  );

const inferCategory = (
  repository: PinnedRepository,
  technologies: string[]
): Project["category"] => {
  const searchableText =
    `${repository.name} ${repository.description ?? ""}`.toLowerCase();
  const normalizedTechnologies = technologies.map((technology) =>
    technology.toLowerCase()
  );

  if (
    normalizedTechnologies.some((technology) =>
      ["swift", "kotlin", "dart"].includes(technology)
    ) ||
    /\b(android|ios|mobile)\b/.test(searchableText)
  ) {
    return "mobile";
  }

  if (/\b(api|server|backend)\b/.test(searchableText)) {
    return "api";
  }

  if (/\b(library|package|sdk)\b/.test(searchableText)) {
    return "library";
  }

  if (
    normalizedTechnologies.some((technology) =>
      ["typescript", "javascript", "html", "css", "vue", "svelte"].includes(
        technology
      )
    ) ||
    /\b(web|website|frontend|react|next\.js)\b/.test(searchableText)
  ) {
    return "web";
  }

  return "tool";
};

const getStatus = (repository: PinnedRepository): Project["status"] => {
  if (repository.isArchived) {
    return "archived";
  }

  if (!repository.pushedAt) {
    return "completed";
  }

  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const updatedRecently =
    Date.now() - new Date(repository.pushedAt).getTime() < thirtyDays;
  return updatedRecently ? "in-progress" : "completed";
};

const transformRepository = (repository: PinnedRepository): Project => {
  const curatedProject = curatedProjects.find(
    (project) =>
      getRepositoryName(project.github) === repository.name.toLowerCase()
  );
  const fetchedTechnologies = repository.languages.nodes
    .flatMap((language) => (language ? [language.name] : []))
    .slice(0, 5);
  const technologies =
    fetchedTechnologies.length > 0
      ? fetchedTechnologies
      : (curatedProject?.technologies ?? []);
  const description = repository.description?.trim() || repository.name;

  return {
    id: repository.id,
    title: curatedProject?.title ?? {
      ja: repository.name,
      en: repository.name,
    },
    description: curatedProject?.description ?? {
      ja: description,
      en: description,
    },
    longDescription: curatedProject?.longDescription ?? {
      ja: description,
      en: description,
    },
    image: curatedProject?.image,
    technologies,
    link: repository.homepageUrl?.trim() || repository.url,
    github: repository.url,
    category:
      curatedProject?.category ?? inferCategory(repository, technologies),
    status: getStatus(repository),
    featured: curatedProject?.featured,
  };
};

export async function fetchPinnedGitHubProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_PROFILE_TOKEN ?? process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn(
      "GITHUB_PROFILE_TOKEN is not set. Falling back to curated project data."
    );
    return fallbackProjects();
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PINNED_REPOSITORIES_QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
      next: {
        revalidate: GITHUB_PROFILE_REVALIDATE_SECONDS,
        tags: ["github-pinned-repositories"],
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL API returned ${response.status}.`);
    }

    const result =
      (await response.json()) as GitHubGraphQLResponse<PinnedRepositoriesData>;

    if (result.errors?.length) {
      throw new Error(result.errors.map((error) => error.message).join("; "));
    }

    if (!result.data?.user) {
      throw new Error(`GitHub user "${GITHUB_USERNAME}" was not found.`);
    }

    return result.data.user.pinnedItems.nodes
      .flatMap((repository) => (repository ? [repository] : []))
      .filter((repository) => !isPortfolioRepository(repository.name))
      .map(transformRepository);
  } catch (error) {
    console.error("Failed to fetch pinned GitHub repositories:", error);
    return fallbackProjects();
  }
}
