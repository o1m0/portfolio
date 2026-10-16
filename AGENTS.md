# Portfolio（0ba.dev）

## 自分について
- 大阪工業大学 情報学部 3 年。バックエンド（Go）/ インフラエンジニア志望
- 目標：Web 系メガベンチャー（CyberAgent、Mercari、DeNA、LINE ヤフー、楽天、BASE）
- インターン：2027 年春（1〜3 月）、無理なら 2027 年夏を狙う
- これまでは AI に書かせることが多く、自分で説明できない状態だった。今は学び直し中

## このリポジトリの目的
自己紹介サイト。バックエンド志望なのでサイト自体は「入れ物」。凝ったデザインより、早く公開して中身（学習記事・作品）を足していくことを優先する。
目的・スコープ・非機能要件は `docs/design.md`、進捗と次の作業は `docs/progress.md` を見る。

## 構成（決定済み）
- Astro v7（SSG）+ Cloudflare Workers（Static Assets）、DNS も Cloudflare
- ドメイン：`https://0ba.dev`。GitHub の `main` に push すると Workers Builds で自動デプロイ（＝ push は本番公開）
- CSS は普通の CSS（Tailwind は使わない）。デザイントークンは `src/styles/global.css`
- 機能やライブラリの追加は最小限。必要か迷ったら入れない

## 分担
| 担当 | 中身 |
|---|---|
| Claude が書く | Astro のページ、コンポーネント、CSS、Content Collections の設定 |
| 本人が決める・手を動かす | Cloudflare の設定、キャッシュ、DNS、デプロイ、監視などインフラまわりの判断。ブログ記事と自己紹介の文章 |
| 本人が手で書く | Go のコード（このリポジトリでは扱わない） |

## Claude への頼み方
- 変更するたびに「どのファイルが何をしているか」「なぜそうしたか」を短く説明する。面接で「このサイトどう作ったの？」に答えられる状態にする
- 一度に進めるのは 1 ステップだけ。説明してから次へ
- 説明は結論から、簡潔に。前置きは不要
- 完璧を目指さない。動いて公開できる状態を最優先
- インフラまわりの判断は答えを渡さず、候補と判断材料を出して本人に決めてもらう
- commit と push は本人がする。Claude は commit メッセージの案を出す
- 変わりやすい情報（Astro、Cloudflare）は、公式ドキュメントで確認してから書く

## 開発メモ（Astro が生成したもの）
- 開発サーバーはバックグラウンドで起動する：`astro dev --background`（`astro dev stop` / `status` / `logs`）
- 公式ドキュメント：https://docs.astro.build
