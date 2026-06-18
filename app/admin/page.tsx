"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async () => {
        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (data.token) {
            localStorage.setItem("token", data.token)
            router.push("/admin/articles")
        }
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <div className="space-y-4 w-80">
                <h1 className="text-sm font-medium">Admin Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-border px-3 py-2 text-sm rounded"
                />
                <button
                    onClick={handleLogin}
                    className="w-full border border-border px-3 py-2 text-sm rounded hover:bg-muted"
                >
                    Login
                </button>
            </div>
        </div>
    )
}