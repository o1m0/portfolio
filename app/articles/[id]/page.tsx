import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getArticle } from '@/lib/api'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const article: Article = await getArticle(Number(id))

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="w-full max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 flex-1">
                <p className="text-xs text-muted-foreground mb-2">{formatDate(article.CreatedAt)}</p>
                <h1 className="text-2xl font-semibold tracking-tight mb-8">{article.Title}</h1>
                <div className="prose prose-sm text-muted-foreground leading-loose">
                    <ReactMarkdown>{article.Body}</ReactMarkdown>
                </div>
            </main>
            <Footer />
        </div>
    )
}