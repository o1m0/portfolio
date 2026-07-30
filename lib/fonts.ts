import { Geist, Geist_Mono } from "next/font/google"

export const geistSans = Geist({
  variable: "--font-app-sans",
  subsets: ["latin"],
})

export const geistMono = Geist_Mono({
  variable: "--font-app-mono",
  subsets: ["latin"],
})
