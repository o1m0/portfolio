"use client"

import { useState, useEffect } from "react"
import { Work } from "@/types"
import NextImage from 'next/image'
import Link from 'next/link'

export default function WorksSection({ categoryId, search, sort, page }: { categoryId?: number, search?: string, sort?: string, page?: number }) {
    const [works, setWorks] = useState<Work[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const params = new URLSearchParams()
        if (categoryId) params.append("category_id", String(categoryId))
        if (search) params.append("search", search)
        if (sort) params.append("sort", sort)
        if (page) params.append("page", String(page))
        const url = `http://localhost:8080/works${params.toString() ? '?' + params.toString() : ''}`
        fetch(url)
            .then(res => res.json())
            .then(data => setWorks(data))
    }, [categoryId, search, sort, page])

    if (!mounted) return null

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {works.map((work) => (
                <div key={work.ID} className="border border-border rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <Link href={`/works/${work.ID}`}>
                        {work.ImageURL && (
                            <NextImage
                                src={work.ImageURL}
                                alt={work.Title}
                                width={600}
                                height={400}
                                className="w-full object-cover"
                                style={{ height: '200px' }}
                            />
                        )}
                    </Link>
                    <div className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                            <Link href={`/works/${work.ID}`}>
                                <h3 className="text-sm font-medium hover:underline">{work.Title}</h3>
                            </Link>
                            <div className="flex gap-4">
                                {work.DemoURL && (
                                    <a href={work.DemoURL} target="_blank" className="text-xs text-muted-foreground">
                                        Demo →
                                    </a>
                                )}
                                {work.GithubURL && (
                                    <a href={work.GithubURL} target="_blank" className="text-xs text-muted-foreground">
                                        GitHub →
                                    </a>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-loose">{work.Description}</p>
                        {work.Categories && work.Categories.length > 0 && (
                            <div className="flex gap-2">
                                {work.Categories.map((category) => (
                                    <span key={category.ID} className="text-xs border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                                        {category.Name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}