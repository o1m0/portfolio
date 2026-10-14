# Portfolio v2 ロードマップ

旧版(v1: Next.js + GitHub を CMS 代わりにした構成)を捨てて、**バックエンド/インフラエンジニアとして見せられるシステム**として作り直す。
コードは自分で書く。各フェーズで「課題 → 実装 → レビュー」を回す。

## ゴール

見た人(面接官)に伝えたいことは「見た目がきれい」ではなく次の3つ。

1. **設計できる**: なぜこの構成にしたかを、トレードオフ込みで説明できる
2. **本番で動かせる**: IaC でインフラを作り、CI/CD でデプロイし、壊れたら気づける
3. **書いて残せる**: 設計ドキュメント・ADR・振り返り記事がある

## 全体構成(目標)

```
portfolio/
├── api/        # Go (net/http, 標準ライブラリ中心) — Works / Articles の REST API
├── web/        # Next.js — API から取得して表示するだけの薄いフロント
├── infra/      # Terraform — クラウド環境をコードで管理
├── docs/       # 設計書, ADR (Architecture Decision Records)
├── compose.yaml   # ローカル開発用 (api + postgres)
└── .github/workflows/  # CI/CD
```

```
[Browser] → [web: Next.js] → [api: Go] → [PostgreSQL]
                                  ↑
                         [admin: 認証付きで記事/作品を編集]
```

## フェーズ

各フェーズの「完了条件」を満たしたら PR を出してレビューを受ける。

### Phase 0: 準備と設計書
- [ ] 旧版に `v1` タグを打ち、リポジトリを空にする(履歴はタグから辿れる)
- [ ] 上記のディレクトリ構成を作る
- [ ] `docs/design.md` を書く: 目的 / 機能一覧 / 非機能要件(コスト上限、可用性の目標) / データモデル(ER図)
- [ ] `docs/adr/0001-*.md` に最初の技術選定(例: なぜ Go か)を1つ書く

**完了条件**: 設計書を読めば、コードを見なくても何を作るか分かる。

### Phase 1: Go API の土台(DB なし)
- [ ] `go mod init`、`cmd/api/main.go` でサーバー起動
- [ ] `GET /healthz` と `GET /works`, `GET /works/{slug}`(Go 1.22+ のルーティングを使う)
- [ ] データはまずメモリ上のスライスで返す
- [ ] `log/slog` で JSON ログ、環境変数で設定(PORT など)
- [ ] graceful shutdown(SIGTERM で処理中リクエストを待って終了)
- [ ] `httptest` を使ったテーブル駆動テスト

**完了条件**: `go test ./...` が通る。`curl localhost:8080/works` で JSON が返る。

### Phase 2: PostgreSQL とレイヤー設計
- [ ] `compose.yaml` で Postgres を起動
- [ ] マイグレーション(goose か golang-migrate)
- [ ] sqlc で型安全なクエリ生成
- [ ] handler / service / repository の責務分割(interface でテスト可能に)
- [ ] Works と Articles、カテゴリの多対多
- [ ] 実 DB を使う統合テスト(testcontainers-go)

**完了条件**: `docker compose up` だけで API + DB がローカルで動く。

### Phase 3: 管理 API と認証
- [ ] 作成/更新/削除エンドポイント
- [ ] 認証(セッション or JWT — 前回 JWT を書いたので、今回は比較して ADR に残す)
- [ ] 入力バリデーションとエラーレスポンスの統一形式
- [ ] ページネーション(offset と cursor の違いを説明できるように)

### Phase 4: フロントエンド(web)
- [ ] Next.js で API を叩いて表示
- [ ] キャッシュ戦略(ISR / revalidate、更新時に API から再検証を呼ぶ)
- [ ] 管理画面はシンプルでよい

### Phase 5: CI と Docker イメージ
- [ ] マルチステージビルドで小さい API イメージ(distroless など)
- [ ] GitHub Actions: lint (golangci-lint) / test / build を PR ごとに実行

### Phase 6: インフラ(Terraform)と CD
- [ ] クラウド選定を ADR に書く(コスト・学習価値・求人での需要で比較)
- [ ] Terraform で環境構築、state はリモート管理
- [ ] シークレット管理(Secret Manager 等。リポジトリに秘密を置かない)
- [ ] main マージで自動デプロイ、独自ドメイン + HTTPS

### Phase 7: 運用
- [ ] メトリクス / トレース(OpenTelemetry)
- [ ] アラート(エラー率・レイテンシ)
- [ ] k6 で負荷試験 → ボトルネックを1つ見つけて直し、記事にする
- [ ] 月額コストを記録

## 毎フェーズでやること

- 学んだこと・ハマったことを **記事として** このサイトに載せる(=コンテンツが自然に増える)
- 選択に迷ったら ADR を1枚書く
- PR は小さく。1 PR = 1つの目的
