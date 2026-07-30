import { saveArticle } from "@/lib/admin-actions"
import type { Article } from "@/types"

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--line)",
  background: "var(--card)",
  color: "var(--ink)",
  fontSize: 14,
  fontFamily: "inherit",
}

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "var(--muted)",
  display: "block",
  marginBottom: 6,
}

export default function ArticleForm({ article }: { article?: Article }) {
  return (
    <form action={saveArticle} style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 40 }}>
      {article && <input type="hidden" name="originalSlug" defaultValue={article.slug} />}

      <div>
        <label style={labelStyle} htmlFor="slug">
          スラッグ（URL用、半角英数とハイフン）
        </label>
        <input style={fieldStyle} id="slug" name="slug" defaultValue={article?.slug} required />
      </div>

      <div>
        <label style={labelStyle} htmlFor="title">
          タイトル
        </label>
        <input style={fieldStyle} id="title" name="title" defaultValue={article?.title} required />
      </div>

      <div>
        <label style={labelStyle} htmlFor="date">
          日付（YYYY-MM-DD）
        </label>
        <input style={fieldStyle} id="date" name="date" defaultValue={article?.date} placeholder="2026-01-15" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="categories">
          カテゴリー（カンマ区切り）
        </label>
        <input style={fieldStyle} id="categories" name="categories" defaultValue={article?.categories.join(", ")} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="summary">
          概要（一覧に表示される一文）
        </label>
        <textarea style={{ ...fieldStyle, minHeight: 70 }} id="summary" name="summary" defaultValue={article?.summary} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="body">
          本文（Markdown）
        </label>
        <textarea
          style={{ ...fieldStyle, minHeight: 320, fontFamily: "var(--font-app-mono, monospace)" }}
          id="body"
          name="body"
          defaultValue={article?.body}
        />
      </div>

      <button type="submit" className="cmdk-trigger" style={{ justifyContent: "center", marginTop: 8 }}>
        保存してコミット
      </button>
    </form>
  )
}
