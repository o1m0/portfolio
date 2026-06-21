"use client"

import { useState, useEffect } from "react"
import { Work } from "@/types"
import NextImage from 'next/image'

export default function WorksSection() {
    const [works, setWorks] = useState<Work[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        fetch("http://localhost:8080/works")
            .then(res => res.json())
            .then(data => setWorks(data))
    }, [])

    if (!mounted) return null

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {works.map((work) => (
                <div key={work.ID} className="border border-border rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
                    <div className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium">{work.Title}</h3>
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