"use client"

import { useState, useEffect } from "react"
import { Article } from "@/types"

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""

    useEffect(() => {
        fetch("http://localhost:8080/articles")
            .then(res => res.json())
            .then(data => setArticles(data))
    }, [])

    const handleCreate = async () => {
        await fetch("http://localhost:8080/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, body })
        })
        setTitle("")
        setBody("")
        // 一覧を再取得
        fetch("http://localhost:8080/articles")
            .then(res => res.json())
            .then(data => setArticles(data))
    }

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8080/articles/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        setArticles(articles.filter(a => a.ID !== id))
    }

    return (
        <div className="max-w-2xl mx-auto px-6 pt-24 pb-20 space-y-8">
            <h1 className="text-sm font-medium">Articles 管理</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
                <textarea
                    placeholder="本文"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded h-40"
                />
                <button
                    onClick={handleCreate}
                    className="border border-border px-4 py-2 text-sm rounded hover:bg-muted"
                >
                    投稿
                </button>
            </div>

            <div className="space-y-4">
                {articles.map((article) => (
                    <div key={article.ID} className="flex justify-between items-center">
                        <span className="text-sm">{article.Title}</span>
                        <button
                            onClick={() => handleDelete(article.ID)}
                            className="text-xs text-muted-foreground hover:text-foreground"
                        >
                            削除
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}