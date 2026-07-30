import Link from "next/link"
import { getAllArticles } from "@/lib/content"
import { deleteArticle } from "@/lib/admin-actions"

export default function AdminArticlesPage() {
  const articles = getAllArticles()

  return (
    <div>
      <div className="sec-head-row" style={{ marginTop: 0 }}>
        <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)", margin: 0 }}>
          Articles
        </h1>
        <Link className="view-toggle" href="/admin/articles/new">
          + 新規作成
        </Link>
      </div>

      <div style={{ marginTop: 40 }}>
        {articles.map((article) => (
          <div className="work" key={article.slug}>
            <div className="title">{article.title}</div>
            <div className="stack mono">{article.categories.join(" · ")}</div>
            <p>{article.summary}</p>
            <div className="contact" style={{ marginTop: 14 }}>
              <Link href={`/admin/articles/${article.slug}/edit`}>
                編集<span className="go">→</span>
              </Link>
              <form action={deleteArticle.bind(null, article.slug)}>
                <button type="submit" className="view-toggle">
                  削除
                </button>
              </form>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="bio">まだ記事がありません。</p>}
      </div>
    </div>
  )
}
