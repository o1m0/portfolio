---
title: "I stopped using JWT auth by vibes"
date: "2026-03-01"
categories: ["Auth"]
summary: "A record of rebuilding JWT auth by checking signature verification, expiry, and refresh handling one at a time."
---

I used to copy-paste JWT auth without really thinking about it. I rewrote it, checking how each piece worked along the way.

## What I checked

- The difference between signing algorithms (HS256 / RS256) and how to choose one
- Where and how to handle expired tokens
- Where to store refresh tokens and how revocation works

## What I learned

Things I'd been waving off with "it works, so it's fine" actually had real choices behind them. Refresh token handling in particular only clicked once I understood it as a trade-off between security and convenience — after that, I could implement it with confidence.
