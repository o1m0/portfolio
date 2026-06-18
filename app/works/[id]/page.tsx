import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getWork } from '@/lib/api'
import { Work } from '@/types'

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const work: Work = await getWork(Number(id))

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="w-full max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 flex-1">
                <h1 className="text-2xl font-semibold tracking-tight mb-4">{work.Title}</h1>
                <p className="text-sm text-muted-foreground leading-loose mb-8">{work.Description}</p>
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
            </main>
            <Footer />
        </div>
    )
}