# 進捗メモ：Portfolio v2

## 決まったこと

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
| ヒーロー | Haru Oba (o1m0) ／ Backend ・ 学生エンジニア ／ 気になったものには、ぜんぶかじりつく。 |
| フォント | 見出し：IBM Plex Sans JP（500、700）、本文：システムフォント、コード：IBM Plex Mono |
| 本文の最大幅 | 680px |

## デザイントークン

| トークン | ライト | ダーク |
|---|---|---|
| `--color-bg` | `#FFFFFF` | `#0A0A0A` |
| `--color-text` | `#111111` | `#FAFAFA` |
| `--color-muted` | `#525252` | `#A3A3A3` |
| `--color-border` | `#E5E5E5` | `#262626` |
| `--color-accent` | `#EA580C` | `#F97316` |
| `--color-accent-text` | `#C2410C` | `#F97316` |

ダークモードは `prefers-color-scheme` で自動切り替え。

## 終わったこと

- [x] 設計書 `docs/design.md`
- [x] Astro プロジェクト作成、`0ba.dev` に自動デプロイ
- [x] `wrangler.jsonc`（`compatibility_date`、`workers_dev: false`、`preview_urls: true`）
- [x] `src/styles/global.css`（デザイントークン）
- [x] `src/layouts/BaseLayout.astro`（Props、slot、ヘッダー、フッター）
- [x] `src/pages/index.astro`（ヒーロー、title、description）
- [x] フォント：Fonts API で IBM Plex Sans JP（見出し）と IBM Plex Mono（コード）をセルフホスト
  - 日本語フォントは約 120 個に分割されて配られる（`unicode-range`）。`preload` をつけると全部（242 個）先に読み込むので外した
- [x] `public/_headers`：ハッシュつきのファイル（`/_astro/*`）を 1 年キャッシュ（`immutable`）。HTML と `public/` のファイルはデフォルト（毎回確認）のまま
- [x] `CLAUDE.md`（実体は `AGENTS.md`）に分担と方針を書いた
- [x] Content Collections（`src/content.config.ts`）、Works 一覧・詳細、Blog 一覧・詳細（本番では `draft: true` を除外）
- [x] Works：homestat を掲載
- [x] Blog：1 記事目「古いノートPCで自宅サーバーを立ててみた」を公開
- [x] トップに About / Skills / Works / Blog / Contact。Works：OSHIATO を掲載

## 残っている小さな作業

- [ ] `.editorconfig` を追加して、インデントをスペース 2 つにそろえる
- [ ] 設計書に「7. デザイン」を追記する
- [ ] 設計書 4. の理由を ADR で補強する（`docs/adr/0001-use-astro.md`、`0002-use-cloudflare-workers.md`）
- [ ] `README.md` が Astro のテンプレートのまま。書き直すか消す

## 分担（2026-10-16 に決定）

Astro のページ・CSS は Claude が書き、本人はインフラの判断・文章・Go に時間を使う。詳しくは `CLAUDE.md`。

## v0.1 公開までの残り

| # | 作業 | 担当 | 状態 |
|---|---|---|---|
| 1 | Content Collections | Claude | ✅ |
| 2 | Works 一覧・詳細ページ | Claude | ✅ |
| 3 | Blog 一覧・詳細ページ | Claude | ✅ |
| 4 | トップに About / Skills / Works / Blog / Contact のセクション | Claude | ✅ |
| 5 | Works の中身：homestat、OSHIATO | 本人 | ✅（OSHIATO は構想段階。リポジトリと技術は未定） |
| 6 | ブログ 1 記事目 | 本人 | ✅ |
| 7 | 外部監視で SLO 99% を計測する（サービスの選定から） | 本人 | |
| 8 | HTML が 193 KB ある問題（`@font-face` 245 個が HTML に入っている）と、HTML に etag がない問題を調べる | 本人 | |

Work と Article の frontmatter の項目は `docs/design.md` の「5. データモデル」を参照。

## 今日学んだこと（2026-10-15）

- キャッシュバスティング：HTML は毎回確認し、ほかのファイルは中身が変わったら名前（ハッシュ）を変える
- etag と `304 Not Modified`：名前が固定のファイルは、指紋（etag）を送って変わったかを確認する
- 設定したら出力（`dist/`、本番の `curl`）で確かめる。変えてはいけないところが変わっていないかも見る

## 今日学んだこと（2026-10-16）

- 「手元で動く」は本番で動く証拠にならない。Cloudflare は commit した中身だけで、まっさらな状態からビルドする（commit し忘れ、`node_modules/.astro` のキャッシュで 2 回ハマった）
- ビルドが失敗しても、Cloudflare は前に成功したバージョンを出し続ける
- frontmatter で値を空にすると `null` になり、スキーマで止まる
- 自宅サーバーの設定を理解し直した：`/proc` と `/sys`、カーネルとユーザーランド、SSH と鍵（秘密鍵・公開鍵・共通鍵）、Tailscale、tmux、TLP、`logind.conf.d`（`.d` は追加設定のフォルダ）

## 記事に書いた疑問（あとで調べる）

- 自宅サーバーのノート PC は、バッテリーを外すべきか
- ユーザーを追加して運用すると、何が変わるか
- tmux の良い使い方
- SSH の強化：パスワードでのログイン禁止、Tailscale からだけ受け付ける

## 身についてきた習慣（続けること）

- push の前に `npm run build` と `git status` を確認する
- 消す前に `ls` で中身を見る。すぐ消さずに名前を変えてよける
- `sudo` はむやみに使わない
- デフォルトに頼らず、設定は明示する
- 同じ情報は 1 か所にだけ書く（DRY）
- ビルドのログの `WARN` を読む