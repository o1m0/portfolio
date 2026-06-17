import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getWorks } from '@/lib/api'
import { Work } from '@/types'

export default async function WorksPage() {
    const works: Work[] = await getWorks()

    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="w-full max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 flex-1">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
                Works
            </p>
            <div className="space-y-8">
                {works.map((work) => (
                    <div key={work.ID} className="space-y-2">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium">{work.Title}</h3>
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
                        </div>
                        <p className="text-sm text-muted-foreground leading-loose">
                            {work.Description}
                        </p>
                    </div>
                ))}
            </div>
        </main>
        <Footer />
        </div>
    )
}