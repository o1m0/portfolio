import Link from "next/link"
import { getAllWorks } from "@/lib/content"
import { deleteWork } from "@/lib/admin-actions"

export default function AdminWorksPage() {
  const works = getAllWorks()

  return (
    <div>
      <div className="sec-head-row" style={{ marginTop: 0 }}>
        <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)", margin: 0 }}>
          Works
        </h1>
        <Link className="view-toggle" href="/admin/works/new">
          + 新規作成
        </Link>
      </div>

      <div style={{ marginTop: 40 }}>
        {works.map((work) => (
          <div className="work" key={work.slug}>
            <div className="title">{work.title}</div>
            <div className="stack mono">{work.stack.join(" · ")}</div>
            <p>{work.summary}</p>
            <div className="contact" style={{ marginTop: 14 }}>
              <Link href={`/admin/works/${work.slug}/edit`}>
                編集<span className="go">→</span>
              </Link>
              <form action={deleteWork.bind(null, work.slug)}>
                <button type="submit" className="view-toggle">
                  削除
                </button>
              </form>
            </div>
          </div>
        ))}
        {works.length === 0 && <p className="bio">まだ作品がありません。</p>}
      </div>
    </div>
  )
}
