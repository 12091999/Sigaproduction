import type React from "react"
import type { Metadata, Viewport} from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

import { SiteHeader } from "@/components/site-header"
import { Providers } from "@/components/providers"
import { ThemeHandler } from "@/components/theme-handler"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sigaproduction",
  description: "Your Music Clothing for local products...",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth light">
      <body className={inter.className}>
        <Providers>
          <ThemeHandler>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-4 md:py-6">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground md:text-left">
                  © {new Date().getFullYear()} SIGAMERCH. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Link href="/terms">Terms</Link>
                  <span>·</span>
                  <Link href="/privacy">Privacy</Link>
                  <span>·</span>
                  <Link href="/contact">Contact</Link>
                </div>
              </div>
            </footer>
          </div>
          </ThemeHandler>
        </Providers>
      </body>
    </html>
  )
}
