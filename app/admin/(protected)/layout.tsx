import Link from "next/link"
import { logout } from "@/lib/admin-actions"

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap">
      <nav style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48, fontSize: 13 }}>
        <Link className="back-link" style={{ marginBottom: 0 }} href="/admin">
          Dashboard
        </Link>
        <Link className="back-link" style={{ marginBottom: 0 }} href="/admin/works">
          Works
        </Link>
        <Link className="back-link" style={{ marginBottom: 0 }} href="/admin/articles">
          Articles
        </Link>
        <form action={logout} style={{ marginLeft: "auto" }}>
          <button type="submit" className="view-toggle">
            ログアウト
          </button>
        </form>
      </nav>
      {children}
    </div>
  )
}
