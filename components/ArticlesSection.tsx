"use client"

import { useState, useEffect } from "react"
import { Article } from "@/types"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export default function ArticlesSection() {
    const [articles, setArticles] = useState<Article[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        fetch("http://localhost:8080/articles")
            .then(res => res.json())
            .then(data => setArticles(data))
    }, [])

    if (!mounted) return null

    return (
        <div className="space-y-6">
            {articles.map((article) => (
                <Link href={`/articles/${article.ID}`} key={article.ID} className="block group">
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium group-hover:underline">{article.Title}</h3>
                            <span className="text-xs text-muted-foreground">{formatDate(article.CreatedAt)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{article.Body.slice(0, 80)}...</p>
                        {article.Categories && article.Categories.length > 0 && (
                            <div className="flex gap-2">
                                {article.Categories.map((category) => (
                                    <span key={category.ID} className="text-xs border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                                        {category.Name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </Link>
            ))}
            <Link href="/articles" className="text-xs text-muted-foreground hover:text-foreground">
                すべての記事を見る →
            </Link>
        </div>
    )
}