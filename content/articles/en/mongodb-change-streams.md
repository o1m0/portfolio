---
title: "Instant updates with MongoDB Change Streams"
date: "2025-11-20"
categories: ["MongoDB"]
summary: "Design notes from switching a task manager off polling and onto real-time sync."
---

Notes from switching Task Sync, a task management app, off polling and onto real-time sync.

## The problem

With polling — querying the DB at a fixed interval — I was bothered by both the lag before updates showed up and the sheer number of wasted requests.

## What I did

Switched to detecting changes with MongoDB Change Streams and pushing them to clients over Server-Sent Events.

## What I learned

The more real-time you make something, the harder it gets to handle simultaneous updates from multiple clients (conflict resolution). This time I went with the simple rule "the last update wins" — and really feeling the weight of that decision was the biggest takeaway.
