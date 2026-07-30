import { saveWork } from "@/lib/admin-actions"
import type { Work } from "@/types"

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

export default function WorkForm({ work }: { work?: Work }) {
  return (
    <form action={saveWork} style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 40 }}>
      {work && <input type="hidden" name="originalSlug" defaultValue={work.slug} />}

      <div>
        <label style={labelStyle} htmlFor="slug">
          スラッグ（URL用、半角英数とハイフン）
        </label>
        <input style={fieldStyle} id="slug" name="slug" defaultValue={work?.slug} required />
      </div>

      <div>
        <label style={labelStyle} htmlFor="title">
          タイトル
        </label>
        <input style={fieldStyle} id="title" name="title" defaultValue={work?.title} required />
      </div>

      <div>
        <label style={labelStyle} htmlFor="date">
          日付（YYYY-MM-DD）
        </label>
        <input style={fieldStyle} id="date" name="date" defaultValue={work?.date} placeholder="2026-01-15" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="stack">
          技術スタック（カンマ区切り）
        </label>
        <input style={fieldStyle} id="stack" name="stack" defaultValue={work?.stack.join(", ")} placeholder="Go, PostgreSQL, JWT" />
      </div>

      <div>
        <label style={labelStyle} htmlFor="categories">
          カテゴリー（カンマ区切り、構成比グラフに使われます）
        </label>
        <input
          style={fieldStyle}
          id="categories"
          name="categories"
          defaultValue={work?.categories.join(", ")}
          placeholder="Backend, Database, Auth"
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="summary">
          概要（一覧に表示される一文）
        </label>
        <textarea style={{ ...fieldStyle, minHeight: 70 }} id="summary" name="summary" defaultValue={work?.summary} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="problem">
          課題
        </label>
        <textarea style={{ ...fieldStyle, minHeight: 90 }} id="problem" name="problem" defaultValue={work?.problem} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="actions">
          やったこと（1行に1つ）
        </label>
        <textarea
          style={{ ...fieldStyle, minHeight: 120 }}
          id="actions"
          name="actions"
          defaultValue={work?.actions.join("\n")}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="learning">
          学び
        </label>
        <textarea style={{ ...fieldStyle, minHeight: 90 }} id="learning" name="learning" defaultValue={work?.learning} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="githubUrl">
          GitHub URL（任意）
        </label>
        <input style={fieldStyle} id="githubUrl" name="githubUrl" defaultValue={work?.githubUrl} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="demoUrl">
          Demo URL（任意）
        </label>
        <input style={fieldStyle} id="demoUrl" name="demoUrl" defaultValue={work?.demoUrl} />
      </div>

      <button type="submit" className="cmdk-trigger" style={{ justifyContent: "center", marginTop: 8 }}>
        保存してコミット
      </button>
    </form>
  )
}
