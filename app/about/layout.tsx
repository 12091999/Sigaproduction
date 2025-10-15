import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <Analytics />
    </>
  )
}
