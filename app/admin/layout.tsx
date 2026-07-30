import type { Metadata } from "next"
import Script from "next/script"
import "../globals.css"
import { geistSans, geistMono } from "@/lib/fonts"
import { NO_FLASH_THEME_SCRIPT } from "@/lib/theme-script"

export const metadata: Metadata = {
  title: "Haru Oba — Admin",
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script id="no-flash-theme" strategy="beforeInteractive">
          {NO_FLASH_THEME_SCRIPT}
        </Script>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
