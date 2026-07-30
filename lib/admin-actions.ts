"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import matter from "gray-matter"
import { createSessionToken, verifyPassword, SESSION_COOKIE_NAME } from "@/lib/auth"
import { upsertContentFile, deleteContentFile } from "@/lib/github"

function splitList(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "")
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1")
  }

  const token = createSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  redirect("/admin")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
  redirect("/admin/login")
}

export async function saveWork(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim()
  const originalSlug = String(formData.get("originalSlug") ?? "").trim()
  if (!slug) throw new Error("スラッグは必須です")

  const data: Record<string, unknown> = {
    title: String(formData.get("title") ?? ""),
    date: String(formData.get("date") ?? ""),
    stack: splitList(String(formData.get("stack") ?? "")),
    categories: splitList(String(formData.get("categories") ?? "")),
    summary: String(formData.get("summary") ?? ""),
    problem: String(formData.get("problem") ?? ""),
    actions: splitList(String(formData.get("actions") ?? "")),
    learning: String(formData.get("learning") ?? ""),
  }
  const githubUrl = String(formData.get("githubUrl") ?? "").trim()
  const demoUrl = String(formData.get("demoUrl") ?? "").trim()
  if (githubUrl) data.githubUrl = githubUrl
  if (demoUrl) data.demoUrl = demoUrl

  const fileContent = matter.stringify("", data)
  await upsertContentFile(`content/works/${slug}.md`, fileContent, `feat(works): update ${slug}`)

  if (originalSlug && originalSlug !== slug) {
    await deleteContentFile(
      `content/works/${originalSlug}.md`,
      `chore(works): remove ${originalSlug} (renamed to ${slug})`
    )
  }

  redirect("/admin/works")
}

export async function deleteWork(slug: string) {
  await deleteContentFile(`content/works/${slug}.md`, `chore(works): delete ${slug}`)
  redirect("/admin/works")
}

export async function saveArticle(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim()
  const originalSlug = String(formData.get("originalSlug") ?? "").trim()
  if (!slug) throw new Error("スラッグは必須です")

  const data = {
    title: String(formData.get("title") ?? ""),
    date: String(formData.get("date") ?? ""),
    categories: splitList(String(formData.get("categories") ?? "")),
    summary: String(formData.get("summary") ?? ""),
  }
  const body = String(formData.get("body") ?? "")

  const fileContent = matter.stringify(body, data)
  await upsertContentFile(`content/articles/${slug}.md`, fileContent, `feat(articles): update ${slug}`)

  if (originalSlug && originalSlug !== slug) {
    await deleteContentFile(
      `content/articles/${originalSlug}.md`,
      `chore(articles): remove ${originalSlug} (renamed to ${slug})`
    )
  }

  redirect("/admin/articles")
}

export async function deleteArticle(slug: string) {
  await deleteContentFile(`content/articles/${slug}.md`, `chore(articles): delete ${slug}`)
  redirect("/admin/articles")
}
