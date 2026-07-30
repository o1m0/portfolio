import { Octokit } from "octokit"

function getConfig() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || "main"
  if (!token || !owner || !repo) {
    throw new Error("GitHub integration is not configured (GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO)")
  }
  return { token, owner, repo, branch }
}

function getClient() {
  const { token } = getConfig()
  return new Octokit({ auth: token })
}

function isNotFoundError(err: unknown): boolean {
  return typeof err === "object" && err !== null && "status" in err && (err as { status?: number }).status === 404
}

/** Create or update a text file in the repo, committing directly to the configured branch. */
export async function upsertContentFile(path: string, content: string, message: string) {
  const { owner, repo, branch } = getConfig()
  const octokit = getClient()

  let sha: string | undefined
  try {
    const existing = await octokit.rest.repos.getContent({ owner, repo, path, ref: branch })
    if (!Array.isArray(existing.data) && existing.data.type === "file") {
      sha = existing.data.sha
    }
  } catch (err) {
    if (!isNotFoundError(err)) throw err
  }

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch,
    sha,
  })
}

/** Delete a file from the repo, committing directly to the configured branch. */
export async function deleteContentFile(path: string, message: string) {
  const { owner, repo, branch } = getConfig()
  const octokit = getClient()

  const existing = await octokit.rest.repos.getContent({ owner, repo, path, ref: branch })
  if (Array.isArray(existing.data) || existing.data.type !== "file") {
    throw new Error(`${path} is not a file`)
  }

  await octokit.rest.repos.deleteFile({
    owner,
    repo,
    path,
    message,
    sha: existing.data.sha,
    branch,
  })
}
