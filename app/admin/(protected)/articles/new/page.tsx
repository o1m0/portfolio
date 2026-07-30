import ArticleForm from "@/components/admin/ArticleForm"

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)" }}>
        新しいArticle
      </h1>
      <ArticleForm />
    </div>
  )
}
