import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haru | Portfolio",
  description:
    "大阪工業大学 情報知能学科 在学中。WebエンジニアになるためにNext.js・MongoDB・GoでWebアプリを開発しています。",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🗄️</text></svg>",
  },
  openGraph: {
    title: "Haru | Portfolio",
    description:
      "大阪工業大学 情報知能学科 在学中。WebエンジニアになるためにNext.js・MongoDB・GoでWebアプリを開発しています。",
    url: "https://portfolio-two-hazel-28.vercel.app/",
    siteName: "Haru Portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Haru | Portfolio",
    description:
      "大阪工業大学 情報知能学科 在学中。WebエンジニアになるためにNext.js・MongoDB・GoでWebアプリを開発しています。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
