import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getWork } from '@/lib/api'
import { Work } from '@/types'
import NextImage from 'next/image'

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const work: Work = await getWork(Number(id))

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="w-full max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 flex-1">
                {work.ImageURL && (
                    <NextImage
                        src={work.ImageURL}
                        alt={work.Title}
                        width={800}
                        height={400}
                        className="w-full object-cover rounded mb-8"
                        style={{ height: '300px' }}
                    />
                )}
                <h1 className="text-2xl font-semibold tracking-tight mb-4">{work.Title}</h1>
                <p className="text-sm text-muted-foreground leading-loose mb-4">{work.Description}</p>
                {work.Categories && work.Categories.length > 0 && (
                    <div className="flex gap-2 mb-8">
                        {work.Categories.map((category) => (
                            <span key={category.ID} className="text-xs border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                                {category.Name}
                            </span>
                        ))}
                    </div>
                )}
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