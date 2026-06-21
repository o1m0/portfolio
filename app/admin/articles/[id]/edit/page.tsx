"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Article } from "@/types"

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const router = useRouter()

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""

    useEffect(() => {
        const load = async () => {
            const { id } = await params
            const res = await fetch(`http://localhost:8080/articles/${id}`)
            const article: Article = await res.json()
            setTitle(article.Title)
            setBody(article.Body)
        }
        load()
    }, [params])

    const handleUpdate = async () => {
        const { id } = await params
        await fetch(`http://localhost:8080/articles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, body })
        })
        router.push("/admin/articles")
    }

    return (
        <div className="max-w-2xl mx-auto px-6 pt-24 pb-20 space-y-8">
            <h1 className="text-sm font-medium">記事編集</h1>
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
                    onClick={handleUpdate}
                    className="border border-border px-4 py-2 text-sm rounded hover:bg-muted"
                >
                    更新
                </button>
            </div>
        </div>
    )
}