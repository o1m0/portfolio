import { getArticles } from "@/lib/api"
import { Article } from "@/types"

export default async function ArticlesPage() {
    const articles: Article[] = await getArticles()

        return (
        <div>
            <h1>記事一覧</h1>
            {articles.map((article) => (
                <div key={article.ID}>
                    <h2>{article.Title}</h2>
                    <p>{article.Body}</p>
                </div>
            ))}
        </div>
    )
}