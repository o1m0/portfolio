"use client"

import { useState, useEffect } from "react"
import { Work } from "@/types"

type Category = {
    ID: number
    Name: string
}

export default function AdminWorksPage() {
    const [works, setWorks] = useState<Work[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [githubURL, setGithubURL] = useState("")
    const [demoURL, setDemoURL] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const [newCategoryName, setNewCategoryName] = useState("")

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""

    useEffect(() => {
        fetch("http://localhost:8080/works")
            .then(res => res.json())
            .then(data => setWorks(data))
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const toggleCategory = (id: number) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

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

    const handleCreate = async () => {
        const res = await fetch("http://localhost:8080/works", {
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
        const newWork = await res.json()

        for (const categoryId of selectedCategories) {
            await fetch(`http://localhost:8080/works/${newWork.ID}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ category_id: categoryId })
            })
        }

        setTitle("")
        setDescription("")
        setGithubURL("")
        setDemoURL("")
        setImageURL("")
        setSelectedCategories([])
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
            <h1 className="text-lg font-medium">Works 管理</h1>

            <div className="space-y-4 border border-border rounded-lg p-6">
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
                    追加
                </button>
            </div>

            <div className="space-y-4">
                {works.map((work) => (
                    <div key={work.ID} className="flex justify-between items-center border-b border-border pb-4">
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