const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const getArticles = async () => {
    const res = await fetch(`${BASE_URL}/articles`)
    return res.json()
}

export const getArticle = async (id: number) => {
    const res = await fetch(`${BASE_URL}/articles/${id}`)
    return res.json()
}

export const getWorks = async () => {
    const res = await fetch(`${BASE_URL}/works`)
    return res.json()
}

export const getWork = async (id: number) => {
    const res = await fetch(`${BASE_URL}/works/${id}`)
    return res.json()
}