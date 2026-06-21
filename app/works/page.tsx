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
                <WorksSection categoryId={selectedCategory} />
            </main>
            <Footer />
        </div>
    )
}