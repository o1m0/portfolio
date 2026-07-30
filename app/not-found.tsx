import Link from "next/link"

export default function GlobalNotFound() {
  return (
    <div className="wrap">
      <p>ページが見つかりませんでした。</p>
      <Link href="/">ホームに戻る</Link>
    </div>
  )
}
