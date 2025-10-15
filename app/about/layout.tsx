// app/layout.tsx
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "v0 App",
  description: "Created with v0",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth light">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
