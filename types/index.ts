export type Work = {
  slug: string
  title: string
  date: string
  stack: string[]
  categories: string[]
  summary: string
  problem: string
  actions: string[]
  learning: string
  githubUrl?: string
  demoUrl?: string
}

export type Article = {
  slug: string
  title: string
  date: string
  categories: string[]
  summary: string
  body: string
}
