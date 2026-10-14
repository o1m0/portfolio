# 引き継ぎメモ：Portfolio v2

自宅サーバー（home-01）の Claude Code に作業を移すためのメモ。

---

## A. 先生役のルール（`~/.claude/CLAUDE.md` に貼る）

```markdown
# 学習方針

私は学生で、メガベンチャーのバックエンド/インフラエンジニアを目指している。
将来は個人開発や起業でプロダクトも作りたい。あなたは先生として振る舞うこと。

- コードは私が書く。頼まれない限り、ファイルを直接編集・作成しない
- 課題は「何を作るか・なぜか・ヒント」の形で出す。答えを丸ごと渡さない
- 骨組みを出すときは TODO を残し、埋めるのは私にやらせる
- 私が書いたコードは、面接官の目線でレビューする（良い点 → 指摘を優先度順に）
- 技術を選ぶときは、候補を比べて「要件 → 理由」で説明させる
- 一度に一つずつ、対話形式で進める
- 用語は初出で説明する。わかりにくいと言われたら、例え話で短く言い直す
- 情報が変わりやすいもの（Cloudflare、Astro など）は、公式ドキュメントで確認するよう促す
```

---

## B. プロジェクトの現在地（`docs/progress.md` としてリポジトリに置く）

### 決まったこと

| 項目 | 決定内容 |
|---|---|
| 目的 | 面接官に「理由を説明でき、運用している」「プロダクトを考えて作れる」を伝える |
| v0.1 のスコープ | 自己紹介、Skills、Works（homestat、oshiato）、Blog（1 記事以上）、連絡先（リンクのみ） |
| 非機能要件 | 0 円（ドメイン代除く）、SLO 99%（外部監視で計測）、1日 100 PV 以下、更新は数週間に 1 回 |
| 構成 | SSG + CDN、Astro v7、Cloudflare Workers（Static Assets）、DNS も Cloudflare |
| ドメイン | `https://0ba.dev`（Production のみ） |
| デプロイ | Cloudflare Workers Builds（GitHub の main に push すると自動デプロイ） |
| CSS | 普通の CSS（Tailwind は使わない） |
| トップの並び | ヒーロー → About → Skills → Works → Blog → Contact（About と Skills は短く） |
| ヒーロー | Haru Oba (o1m0) ／ Backend / Infra ・ 学生エンジニア ／ 気になったものには、ぜんぶかじりつく。 |
| フォント | 見出し：IBM Plex Sans JP（500、700）、本文：システムフォント、コード：IBM Plex Mono |
| 本文の最大幅 | 680px |

### デザイントークン

| トークン | ライト | ダーク |
|---|---|---|
| `--color-bg` | `#FFFFFF` | `#0A0A0A` |
| `--color-text` | `#111111` | `#FAFAFA` |
| `--color-muted` | `#525252` | `#A3A3A3` |
| `--color-border` | `#E5E5E5` | `#262626` |
| `--color-accent` | `#EA580C` | `#F97316` |
| `--color-accent-text` | `#C2410C` | `#F97316` |

ダークモードは `prefers-color-scheme` で自動切り替え。

### 終わったこと

- [x] 設計書 `docs/design.md`
- [x] Astro プロジェクト作成、`0ba.dev` に自動デプロイ
- [x] `wrangler.jsonc`（`compatibility_date`、`workers_dev: false`、`preview_urls: true`）
- [x] `src/styles/global.css`（デザイントークン）
- [x] `src/layouts/BaseLayout.astro`（Props、slot、ヘッダー、フッター）
- [x] `src/pages/index.astro`（ヒーロー、title、description）

### 残っている小さな作業

- [ ] フッターの年を `new Date().getFullYear()` にする
- [ ] `.editorconfig` を追加して、インデントをスペース 2 つにそろえる
- [ ] `<h1>` を `Haru Oba (o1m0)` に（カッコの前にスペース）
- [ ] 設計書に「7. デザイン」を追記する
- [ ] 設計書 4. の理由を ADR で補強する（`docs/adr/0001-use-astro.md`、`0002-use-cloudflare-workers.md`）
- [ ] Astro が作った `CLAUDE.md` / `AGENTS.md` を読んで、残すか決める

### 次の課題：Step 4-2 フォント

1. Astro v7 の公式ドキュメントで Fonts API を読む
2. `astro.config.mjs` に IBM Plex Sans JP（Google、500 と 700、`--font-heading`）を設定する
3. `BaseLayout.astro` の `<head>` で読み込む
4. `global.css` で `h1, h2, h3` に `var(--font-heading)` を使う
5. 開発者ツールの Network タブで、フォントが自分のドメインから配信されているか確認する

### その先

Content Collections（Work と Article のスキーマ）→ Works 一覧・詳細 → Blog 一覧・詳細 → About / Skills / Contact → v0.1 公開。
Work と Article の frontmatter の項目は `docs/design.md` の「5. データモデル」を参照。

### 身についてきた習慣（続けること）

- push の前に `npm run build` と `git status` を確認する
- 消す前に `ls` で中身を見る。すぐ消さずに名前を変えてよける
- `sudo` はむやみに使わない
- デフォルトに頼らず、設定は明示する
- 同じ情報は 1 か所にだけ書く（DRY）
