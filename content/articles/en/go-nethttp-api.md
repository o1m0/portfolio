---
title: "Building an API with only Go's net/http"
date: "2026-02-10"
categories: ["Go"]
summary: "What I learned by hand-rolling routing and middleware instead of relying on a framework."
---

Notes from building an API server using only `net/http`, without a framework.

## Why skip the framework

The first time I touched a framework like gin or echo, the routing and middleware were so convenient that I never really understood what was happening underneath. Since I'd rather understand the mechanics before moving on, I decided to build one using nothing but the standard library.

## What I did

- Routing with `http.ServeMux`, parsing path parameters by hand
- Wrote middleware as function wrappers (logging, CORS, auth)
- Passed request-scoped values around using `context`

## What I learned

I can now see, piece by piece, what a framework was actually doing for me. Even when I use gin now, I have a rough sense of what's happening under the hood.
