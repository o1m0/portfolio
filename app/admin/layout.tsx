import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="fixed top-0 left-0 right-0 border-b border-border bg-background z-50">
                <div className="max-w-2xl mx-auto px-6 py-4 flex gap-6 items-center">
                    <Link href="/admin/articles" className="text-xs text-muted-foreground hover:text-foreground">
                        Articles
                    </Link>
                    <Link href="/admin/works" className="text-xs text-muted-foreground hover:text-foreground">
                        Works
                    </Link>
                </div>
            </nav>
            {children}
        </div>
    )
}