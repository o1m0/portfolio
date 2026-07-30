import { login } from "@/lib/admin-actions"

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="wrap" style={{ maxWidth: 420 }}>
      <p className="eyebrow">Admin</p>
      <h1 className="name" style={{ fontSize: "clamp(2rem,6vw,2.6rem)" }}>
        ログイン
      </h1>
      {error && (
        <p className="bio" style={{ color: "var(--accent)" }}>
          パスワードが違います。
        </p>
      )}
      <form action={login} style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          required
          autoFocus
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid var(--line)",
            background: "var(--card)",
            color: "var(--ink)",
            fontSize: 15,
          }}
        />
        <button type="submit" className="cmdk-trigger" style={{ justifyContent: "center" }}>
          ログイン
        </button>
      </form>
    </div>
  )
}
