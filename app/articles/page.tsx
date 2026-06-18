import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getArticles } from '@/lib/api'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function ArticlesPage() {
    const articles: Article[] = await getArticles()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="w-full max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 flex-1">
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
                    Articles
                </p>
                <div className="space-y-8">
                    {articles.map((article) => (
                        <Link href={`/articles/${article.ID}`} key={article.ID}>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">{article.Title}</h3>
                                <p className="text-xs text-muted-foreground">{formatDate(article.CreatedAt)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}