import Link from "next/link"
import { getAllWorks, getAllArticles } from "@/lib/content"

export default function AdminDashboardPage() {
  const works = getAllWorks()
  const articles = getAllArticles()

  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)" }}>
        ダッシュボード
      </h1>

      <div className="sec" style={{ marginTop: 56 }}>
        <div className="sec-head-row">
          <h2>Works ({works.length})</h2>
          <Link className="view-toggle" href="/admin/works/new">
            + 新規作成
          </Link>
        </div>
        <p className="bio">最新: {works[0]?.title ?? "まだありません"}</p>
      </div>

      <div className="sec">
        <div className="sec-head-row">
          <h2>Articles ({articles.length})</h2>
          <Link className="view-toggle" href="/admin/articles/new">
            + 新規作成
          </Link>
        </div>
        <p className="bio">最新: {articles[0]?.title ?? "まだありません"}</p>
      </div>
    </div>
  )
}
