"use client"

import { useState, useEffect } from "react"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import WorksSection from '@/components/WorksSection'

type Category = {
    ID: number
    Name: string
}

export default function WorksPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="w-full max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 flex-1">
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
                    Works
                </p>
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="作品を検索"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-border px-3 py-2 text-sm rounded"
                    />
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-border px-3 py-2 text-sm rounded"
                    >
                        <option value="">並び替え</option>
                        <option value="created_at DESC">新しい順</option>
                        <option value="created_at ASC">古い順</option>
                    </select>
                </div>
                <div className="flex gap-2 mb-8 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory(undefined)}
                        className={`text-xs border px-3 py-1 rounded-full ${!selectedCategory ? 'border-foreground' : 'border-border text-muted-foreground'}`}
                    >
                        すべて
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.ID}
                            onClick={() => setSelectedCategory(category.ID)}
                            className={`text-xs border px-3 py-1 rounded-full ${selectedCategory === category.ID ? 'border-foreground' : 'border-border text-muted-foreground'}`}
                        >
                            {category.Name}
                        </button>
                    ))}
                </div>
                <WorksSection categoryId={selectedCategory} search={search} sort={sort} page={page} />
                <div className="flex gap-4 justify-center mt-8">
    <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        className="text-xs border border-border px-3 py-1 rounded disabled:opacity-30"
    >
        前へ
    </button>
    <span className="text-xs text-muted-foreground">{page}</span>
    <button
        onClick={() => setPage(p => p + 1)}
        className="text-xs border border-border px-3 py-1 rounded"
    >
        次へ
    </button>
</div>
            </main>
            <Footer />
        </div>
    )
}