---
title: "Task Sync"
date: "2025-10-02"
stack: ["Next.js", "MongoDB"]
categories: ["Frontend", "Database"]
summary: "A task manager that syncs in real time across devices, with optimistic updates to make the UI feel instant."
problem: "Watching the same task list from multiple devices, the lag before an update showed up bothered me."
actions:
  - "Detected changes with MongoDB Change Streams"
  - "Pushed changes to clients over Server-Sent Events"
  - "Improved perceived UI speed with optimistic updates"
learning: "Got a hands-on feel for the trade-off between real-time responsiveness and data consistency."
githubUrl: "https://github.com/o1m0/task-sync"
---
