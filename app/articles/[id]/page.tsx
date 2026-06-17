import { getArticle } from '@/lib/api'
import { Article } from '@/types'

export default async function ArticlePage({ params }: { params: { id: string } }) {
    const { id } = await params
    const article: Article = await getArticle(Number(id))
    
    return (
        <div>
            <h1>{article.Title}</h1>
            <p>{article.Body}</p>
        </div>
    )
}