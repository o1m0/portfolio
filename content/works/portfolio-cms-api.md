---
title: "Portfolio CMS API"
date: "2026-01-15"
stack: ["Go", "PostgreSQL", "JWT"]
categories: ["Backend", "Database", "Auth"]
summary: "Works/Articlesを管理するREST API。カテゴリー関連付けとJWT認証を自分で書いた。"
problem: "Works/Articlesの追加・編集をコードを直接触らずに行えるようにしたかった。"
actions:
  - "Go + net/http でシンプルなREST APIを構築"
  - "PostgreSQLでWorks/Articles/Categoriesのスキーマを設計"
  - "JWTベースの認証で管理画面のエンドポイントを保護"
  - "カテゴリーの多対多関連付けAPIを実装"
learning: "認証まわりを自分で書いたことで、トークンの検証やミドルウェアの責務分割について実感を持って理解できた。"
githubUrl: "https://github.com/o1m0/portfolio-cms-api"
---
