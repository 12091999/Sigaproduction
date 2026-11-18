import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products - Sigamerch",
  description: "Browse our wide selection of products from the Sigamerch",
}

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
