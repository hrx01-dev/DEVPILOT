export type GitHubRepo = {
  owner: string
  name: string
  fullName: string
  description: string
  defaultBranch: string
  stars: number
  visibility: string
  updatedAt: string
  htmlUrl: string
}

export type RepoFile = {
  path: string
  sha: string
  size?: number
  type: "blob" | "tree"
}

export type GitHubIssue = {
  number: number
  title: string
  body: string
  state: string
  htmlUrl: string
  author: string
  createdAt: string
  labels: string[]
}

export type Dependency = {
  name: string
  version: string
  kind: "runtime" | "development"
}

export type ProjectAnalysis = {
  repo: GitHubRepo
  files: RepoFile[]
  languages: Record<string, number>
  technologies: string[]
  dependencies: Dependency[]
  entryPoints: string[]
  testFiles: string[]
  importantFiles: string[]
  analyzedAt: string
  truncated: boolean
}

const API = "https://api.github.com"

async function request<T>(url: string): Promise<T> {
  const path = url.startsWith(API) ? url.slice(API.length) : url
  const response = await fetch(
    `/api/github/rest?path=${encodeURIComponent(path)}`,
    { credentials: "same-origin" },
  )
  if (!response.ok) {
    const rateRemaining = response.headers.get("x-ratelimit-remaining")
    if (response.status === 403 && rateRemaining === "0") {
      throw new Error(
        "Your authenticated GitHub API allowance has been reached. Wait until the rate-limit reset before retrying.",
      )
    }
    if (response.status === 401)
      throw new Error("Your GitHub session has expired. Sign in again.")
    if (response.status === 404)
      throw new Error(
        "Repository not found or your GitHub authorization does not grant access.",
      )
    throw new Error(`GitHub request failed (${response.status}).`)
  }
  return response.json() as Promise<T>
}

export function parseGitHubUrl(
  value: string,
): { owner: string; repo: string } | null {
  try {
    const url = new URL(value.trim())
    if (url.hostname !== "github.com") return null
    const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/")
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") }
  } catch {
    return null
  }
}

function detectTechnologies(
  paths: string[],
  dependencies: Dependency[],
  languages: Record<string, number>,
): string[] {
  const names = new Set(dependencies.map((item) => item.name))
  const found = new Set<string>(Object.keys(languages).slice(0, 5))
  const rules: Array<[string, boolean]> = [
    ["React", names.has("react")],
    ["Next.js", names.has("next")],
    ["Vue", names.has("vue")],
    ["Svelte", names.has("svelte") || names.has("@sveltejs/kit")],
    ["Express", names.has("express")],
    ["Vite", names.has("vite")],
    ["Tailwind CSS", names.has("tailwindcss")],
    ["Vitest", names.has("vitest")],
    ["Jest", names.has("jest")],
    [
      "Pytest",
      paths.some((path) => /(^|\/)pytest\.ini$|(^|\/)conftest\.py$/.test(path)),
    ],
    ["Docker", paths.some((path) => /(^|\/)Dockerfile$/.test(path))],
  ]
  rules.forEach(([label, matches]) => matches && found.add(label))
  return [...found].slice(0, 10)
}

function deriveImportantFiles(paths: string[]): string[] {
  const rank = (path: string) => {
    const name = path.toLowerCase()
    if (
      /^(readme|contributing|package\.json|pyproject\.toml|cargo\.toml|go\.mod)/.test(
        name,
      )
    )
      return 0
    if (/(^|\/)(main|index|app|server)\.(tsx?|jsx?|py|go|rs)$/.test(name))
      return 1
    if (/config|router|routes|schema/.test(name)) return 2
    return 3
  }
  return paths
    .filter((path) => rank(path) < 3)
    .sort((a, b) => rank(a) - rank(b) || a.length - b.length)
    .slice(0, 18)
}

export async function fetchTextFile(
  owner: string,
  repo: string,
  branch: string,
  path: string,
): Promise<string> {
  const params = new URLSearchParams({ owner, repo, branch, path })
  const response = await fetch(`/api/github/file?${params}`, {
    credentials: "same-origin",
  })
  if (!response.ok)
    throw new Error(`Unable to load ${path} (${response.status}).`)
  return response.text()
}

export type AccessibleRepository = {
  fullName: string
  htmlUrl: string
  private: boolean
  description: string
  updatedAt: string
}

export async function fetchAccessibleRepositories(): Promise<
  AccessibleRepository[]
> {
  const data = await request<any[]>(
    `${API}/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&sort=updated&per_page=100`,
  )
  return data.map((repo) => ({
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    private: Boolean(repo.private),
    description: repo.description || "No description provided.",
    updatedAt: repo.updated_at,
  }))
}

async function readPackageJson(
  owner: string,
  repo: string,
  branch: string,
  paths: string[],
): Promise<Dependency[]> {
  const packagePath = paths.find((path) => path === "package.json")
  if (!packagePath) return []
  try {
    const text = await fetchTextFile(owner, repo, branch, packagePath)
    const parsed = JSON.parse(text) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    return [
      ...Object.entries(parsed.dependencies ?? {}).map(([name, version]) => ({
        name,
        version,
        kind: "runtime" as const,
      })),
      ...Object.entries(parsed.devDependencies ?? {}).map(
        ([name, version]) => ({ name, version, kind: "development" as const }),
      ),
    ]
  } catch {
    return []
  }
}

export async function analyzeRepository(url: string): Promise<ProjectAnalysis> {
  const parsed = parseGitHubUrl(url)
  if (!parsed)
    throw new Error(
      "Enter a public GitHub repository URL in the form https://github.com/owner/repository.",
    )
  const encoded = `${encodeURIComponent(parsed.owner)}/${encodeURIComponent(parsed.repo)}`
  const repoData = await request<any>(`${API}/repos/${encoded}`)
  const branch = repoData.default_branch as string
  const [treeData, languages] = await Promise.all([
    request<{
      tree: Array<{
        path: string
        type: "blob" | "tree"
        sha: string
        size?: number
      }>
      truncated: boolean
    }>(
      `${API}/repos/${encoded}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
    ),
    request<Record<string, number>>(`${API}/repos/${encoded}/languages`),
  ])
  const files = treeData.tree.map((item) => ({
    path: item.path,
    type: item.type,
    sha: item.sha,
    size: item.size,
  }))
  const blobPaths = files
    .filter((item) => item.type === "blob")
    .map((item) => item.path)
  const dependencies = await readPackageJson(
    parsed.owner,
    parsed.repo,
    branch,
    blobPaths,
  )
  const testFiles = blobPaths
    .filter((path) =>
      /(^|\/)(__tests__|tests?|spec)(\/|\.)|\.(test|spec)\.[^.]+$/i.test(path),
    )
    .slice(0, 100)
  const entryPoints = blobPaths
    .filter((path) =>
      /(^|\/)(main|index|app|server|cli)\.(tsx?|jsx?|py|go|rs|java|rb|php)$/i.test(
        path,
      ),
    )
    .slice(0, 30)
  return {
    repo: {
      owner: parsed.owner,
      name: parsed.repo,
      fullName: repoData.full_name,
      description:
        repoData.description || "No repository description provided.",
      defaultBranch: branch,
      stars: repoData.stargazers_count,
      visibility: repoData.visibility || "public",
      updatedAt: repoData.updated_at,
      htmlUrl: repoData.html_url,
    },
    files,
    languages,
    dependencies,
    technologies: detectTechnologies(blobPaths, dependencies, languages),
    entryPoints,
    testFiles,
    importantFiles: deriveImportantFiles(blobPaths),
    analyzedAt: new Date().toISOString(),
    truncated: treeData.truncated,
  }
}

export async function fetchIssues(
  owner: string,
  repo: string,
): Promise<GitHubIssue[]> {
  const data = await request<any[]>(
    `${API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues?state=all&per_page=60&sort=updated`,
  )
  return data
    .filter((item) => !item.pull_request)
    .map((item) => ({
      number: item.number,
      title: item.title,
      body: item.body || "No description provided.",
      state: item.state,
      htmlUrl: item.html_url,
      author: item.user?.login || "unknown",
      createdAt: item.created_at,
      labels: item.labels.map((label: any) =>
        typeof label === "string" ? label : label.name,
      ),
    }))
}

export function sourceFilePaths(files: RepoFile[]): string[] {
  return files
    .filter(
      (file) =>
        file.type === "blob" &&
        /\.(tsx?|jsx?|py|go|rs|java|rb|php|cs|cpp|c|h|vue|svelte)$/i.test(
          file.path,
        ),
    )
    .map((file) => file.path)
}

export function inferRelevantFiles(
  issue: GitHubIssue,
  analysis: ProjectAnalysis,
): Array<{ path: string; score: number; reason: string }> {
  const stop = new Set([
    "this",
    "that",
    "with",
    "from",
    "when",
    "after",
    "before",
    "into",
    "does",
    "have",
    "will",
    "issue",
    "error",
    "feature",
    "request",
    "should",
    "could",
    "would",
  ])
  const terms =
    `${issue.title} ${issue.body}`
      .toLowerCase()
      .match(/[a-z][a-z0-9_-]{2,}/g)
      ?.filter((term) => !stop.has(term)) ?? []
  const unique = [...new Set(terms)]
  return analysis.files
    .filter((file) => file.type === "blob")
    .map((file) => {
      const lower = file.path.toLowerCase()
      const matches = unique.filter((term) => lower.includes(term))
      const testBoost = /test|spec/.test(lower) ? 8 : 0
      const sourceBoost = /(^|\/)src\//.test(lower) ? 5 : 0
      return {
        path: file.path,
        score: matches.length * 20 + testBoost + sourceBoost,
        reason: matches.length
          ? `Path matches ${matches.slice(0, 3).join(", ")}`
          : /test|spec/.test(lower)
            ? "Existing test coverage"
            : "Source candidate",
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
}
