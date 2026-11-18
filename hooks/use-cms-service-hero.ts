"use client"

import { useEffect, useState } from "react"

import { CmsServiceGroup, mapCmsServiceGroup } from "@/lib/wordpress"

const defaultCtas = [
  { label: "Shop Sigamerch Products", url: "/products" },
  { label: "Book a Sigaproduction", url: "/contact" },
  { label: "Find Your Offer", url: "/" },
]

export function useCmsServiceHero(
  slug: string,
  fallback: {
    title: string
    description: string
    image: string
    imageAlt: string
  }
) {
  const [content, setContent] = useState({
    title: fallback.title,
    description: fallback.description,
    image: fallback.image,
    imageAlt: fallback.imageAlt,
    ctas: defaultCtas,
  })

  useEffect(() => {
    let active = true
    fetch(`/api/wordpress/service-groups?slug=${encodeURIComponent(slug)}`)
      .then((response) => {
        if (!response.ok) throw new Error("WordPress service category unavailable")
        return response.json()
      })
      .then((post: CmsServiceGroup) => {
        if (!active) return
        const group = mapCmsServiceGroup(post)
        setContent({
          title: group.heroTitle || fallback.title,
          description: group.heroDescription || fallback.description,
          image: group.heroImage || fallback.image,
          imageAlt: group.heroImageAlt || fallback.imageAlt,
          ctas: group.ctas || defaultCtas,
        })
      })
      .catch((error: unknown) => {
        console.error(`Could not load ${slug} hero from WordPress:`, error)
      })

    return () => {
      active = false
    }
  }, [fallback.image, fallback.imageAlt, slug])

  return content
}
