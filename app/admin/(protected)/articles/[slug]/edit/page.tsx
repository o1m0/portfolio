import { notFound } from "next/navigation"
import ArticleForm from "@/components/admin/ArticleForm"
import { getArticle } from "@/lib/content"

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <div>
      <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)" }}>
        {article.title} を編集
      </h1>
      <ArticleForm article={article} />
    </div>
  )
}
