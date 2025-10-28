import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Charlizze Eventos - Salón para Eventos",
  description: "Salón Charlizze - El lugar perfecto para tu evento especial",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
