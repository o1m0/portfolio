"use client"

import { useState, useEffect } from "react"
import { Article } from "@/types"
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

type Category = {
    ID: number
    Name: string
}

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""

    const [newCategoryName, setNewCategoryName] = useState("")

const handleCreateCategory = async () => {
    if (!newCategoryName) return
    const res = await fetch("http://localhost:8080/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ Name: newCategoryName })
    })
    const newCategory = await res.json()
    setCategories([...categories, newCategory])
    setNewCategoryName("")
}

    useEffect(() => {
        fetch("http://localhost:8080/articles")
            .then(res => res.json())
            .then(data => setArticles(data))
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const toggleCategory = (id: number) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const handleCreate = async () => {
        const res = await fetch("http://localhost:8080/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, body })
        })
        const newArticle = await res.json()

        // カテゴリーを紐付け
        for (const categoryId of selectedCategories) {
            await fetch(`http://localhost:8080/articles/${newArticle.ID}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ category_id: categoryId })
            })
        }

        setTitle("")
        setBody("")
        setSelectedCategories([])
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
            <h1 className="text-lg font-medium">Articles 管理</h1>

            <div className="space-y-4 border border-border rounded-lg p-6">
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
<div className="grid grid-cols-2 gap-4">
    <textarea
        placeholder="本文（マークダウン）"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border border-border px-3 py-2 text-sm rounded h-96 font-mono"
    />
    <div className="border border-border rounded p-4 overflow-y-auto h-96 prose prose-sm">
        <ReactMarkdown>{body}</ReactMarkdown>
    </div>
</div>
                <div className="flex gap-2">
    <input
        type="text"
        placeholder="新しいカテゴリー"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        className="flex-1 border border-border px-3 py-2 text-sm rounded"
    />
    <button
        onClick={handleCreateCategory}
        className="border border-border px-4 py-2 text-sm rounded hover:bg-muted"
    >
        追加
    </button>
</div>
                <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.ID}
                            onClick={() => toggleCategory(category.ID)}
                            className={`text-xs border px-3 py-1 rounded-full ${selectedCategories.includes(category.ID) ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground'}`}
                        >
                            {category.Name}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleCreate}
                    className="border border-border px-4 py-2 text-sm rounded hover:bg-muted"
                >
                    投稿
                </button>
            </div>

            <div className="space-y-4">
                {articles.map((article) => (
                    <div key={article.ID} className="flex justify-between items-center border-b border-border pb-4">
                        <div>
                            <span className="text-sm font-medium">{article.Title}</span>
                            <p className="text-xs text-muted-foreground">{article.Body.slice(0, 50)}...</p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                href={`/admin/articles/${article.ID}/edit`}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                編集
                            </Link>
                            <button
                                onClick={() => handleDelete(article.ID)}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}