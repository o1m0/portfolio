import Footer from '@/components/Footer'
import Header from '@/components/Header'
import WorksSection from '@/components/WorksSection'

export default function WorksPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="w-full max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 flex-1">
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
                    Works
                </p>
                <WorksSection />
            </main>
            <Footer />
        </div>
    )
}