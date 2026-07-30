---
title: "Task Sync"
date: "2025-10-02"
stack: ["Next.js", "MongoDB"]
categories: ["Frontend", "Database"]
summary: "複数端末間でリアルタイムに同期するタスク管理アプリ。楽観的更新でUIの体感速度を上げた。"
problem: "複数端末で同じタスクリストを見ているとき、更新が反映されるまでのラグが気になっていた。"
actions:
  - "MongoDB Change Streamsで更新を検知"
  - "Server-Sent Eventsでクライアントに変更を配信"
  - "楽観的更新でUI側の体感速度を改善"
learning: "リアルタイム性とデータ整合性のトレードオフを、実際に手を動かして体感できた。"
githubUrl: "https://github.com/o1m0/task-sync"
---
