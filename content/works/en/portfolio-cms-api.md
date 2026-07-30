---
title: "Portfolio CMS API"
date: "2026-01-15"
stack: ["Go", "PostgreSQL", "JWT"]
categories: ["Backend", "Database", "Auth"]
summary: "A REST API for managing Works/Articles, with self-written category associations and JWT auth."
problem: "Wanted to add and edit Works/Articles without touching code directly."
actions:
  - "Built a simple REST API with Go + net/http"
  - "Designed the Works/Articles/Categories schema in PostgreSQL"
  - "Protected admin endpoints with JWT-based auth"
  - "Implemented a many-to-many category association API"
learning: "Writing the auth layer myself gave me a hands-on understanding of token verification and how to split responsibilities across middleware."
githubUrl: "https://github.com/o1m0/portfolio-cms-api"
---
