import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Work, Article } from '@/types'
import type { Locale } from '@/i18n/routing'

const WORKS_DIR = path.join(process.cwd(), 'content', 'works')
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')

function readSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

function localeDir(baseDir: string, locale: Locale): string {
  return locale === 'ja' ? baseDir : path.join(baseDir, locale)
}

function readWork(filePath: string, slug: string): Work | null {
  if (!fs.existsSync(filePath)) return null
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'))
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    stack: data.stack ?? [],
    categories: data.categories ?? [],
    summary: data.summary ?? '',
    problem: data.problem ?? '',
    actions: data.actions ?? [],
    learning: data.learning ?? '',
    githubUrl: data.githubUrl,
    demoUrl: data.demoUrl,
  }
}

function readArticle(filePath: string, slug: string): Article | null {
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    categories: data.categories ?? [],
    summary: data.summary ?? '',
    body: content.trim(),
  }
}

export function getAllWorks(locale: Locale = 'ja'): Work[] {
  return readSlugs(WORKS_DIR)
    .map((slug) => getWork(slug, locale))
    .filter((w): w is Work => w !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getWork(slug: string, locale: Locale = 'ja'): Work | null {
  const localized = readWork(path.join(localeDir(WORKS_DIR, locale), `${slug}.md`), slug)
  if (localized) return localized
  if (locale === 'ja') return null
  return readWork(path.join(WORKS_DIR, `${slug}.md`), slug)
}

export function getAllArticles(locale: Locale = 'ja'): Article[] {
  return readSlugs(ARTICLES_DIR)
    .map((slug) => getArticle(slug, locale))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticle(slug: string, locale: Locale = 'ja'): Article | null {
  const localized = readArticle(path.join(localeDir(ARTICLES_DIR, locale), `${slug}.md`), slug)
  if (localized) return localized
  if (locale === 'ja') return null
  return readArticle(path.join(ARTICLES_DIR, `${slug}.md`), slug)
}
