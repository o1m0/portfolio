"use client"

import { useState, useEffect } from "react"
import { Work } from "@/types"

export default function AdminWorksPage() {
    const [works, setWorks] = useState<Work[]>([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [githubURL, setGithubURL] = useState("")
    const [demoURL, setDemoURL] = useState("")
    const [imageURL, setImageURL] = useState("")

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""

    useEffect(() => {
        fetch("http://localhost:8080/works")
            .then(res => res.json())
            .then(data => setWorks(data))
    }, [])

    const handleCreate = async () => {
        await fetch("http://localhost:8080/works", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                Title: title,
                Description: description,
                GithubURL: githubURL,
                DemoURL: demoURL,
                ImageURL: imageURL
            })
        })
        setTitle("")
        setDescription("")
        setGithubURL("")
        setDemoURL("")
        setImageURL("")
        fetch("http://localhost:8080/works")
            .then(res => res.json())
            .then(data => setWorks(data))
    }

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8080/works/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        setWorks(works.filter(w => w.ID !== id))
    }

    return (
        <div className="max-w-2xl mx-auto px-6 pt-24 pb-20 space-y-8">
            <h1 className="text-sm font-medium">Works 管理</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
                <textarea
                    placeholder="説明"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded h-24"
                />
                <input
                    type="text"
                    placeholder="GitHub URL"
                    value={githubURL}
                    onChange={(e) => setGithubURL(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
                <input
                    type="text"
                    placeholder="Demo URL"
                    value={demoURL}
                    onChange={(e) => setDemoURL(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
                <button
                    onClick={handleCreate}
                    className="border border-border px-4 py-2 text-sm rounded hover:bg-muted"
                >
                    追加
                </button>
            </div>

            <div className="space-y-4">
                {works.map((work) => (
                    <div key={work.ID} className="flex justify-between items-center">
                        <span className="text-sm">{work.Title}</span>
                        <button
                            onClick={() => handleDelete(work.ID)}
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