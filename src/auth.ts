export type GitHubUser = {
  login: string
  name: string
  avatarUrl: string
}

export type AuthStatus = {
  configured: boolean
  authenticated: boolean
  user: GitHubUser | null
}

export async function getAuthStatus(): Promise<AuthStatus> {
  const response = await fetch("/api/auth/status", {
    credentials: "same-origin",
  })
  if (!response.ok) throw new Error("Unable to check GitHub authentication.")
  return response.json() as Promise<AuthStatus>
}

export function startGitHubLogin() {
  window.location.assign("/api/auth/github?returnTo=%2F%3Fgithub%3Dconnected")
}

export async function signOutGitHub() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "same-origin",
  })
  if (!response.ok) throw new Error("Unable to sign out of GitHub.")
}
