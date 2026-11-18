"use client"

import { useEffect, useState } from "react"

import { Slide } from "@/components/slide"

type CmsImagePageSectionProps = {
  slug: string
  id: string
  label: string
  fallbackSrc: string
  fallbackAlt: string
  priority?: boolean
}

type CmsImagePage = {
  title: { rendered: string }
  featured_media_url: string | null
  featured_media_alt: string | null
}

export default function CmsImagePageSection({
  slug,
  id,
  label,
  fallbackSrc,
  fallbackAlt,
  priority,
}: CmsImagePageSectionProps) {
  const [image, setImage] = useState(fallbackSrc)
  const [alt, setAlt] = useState(fallbackAlt)

  useEffect(() => {
    fetch(`/api/wordpress/pages?slug=${encodeURIComponent(slug)}`)
      .then((response) => {
        if (!response.ok) throw new Error("WordPress page unavailable")
        return response.json()
      })
      .then((page: CmsImagePage) => {
        if (page.featured_media_url) setImage(page.featured_media_url)
        setAlt(page.featured_media_alt || page.title.rendered || fallbackAlt)
      })
      .catch((error: unknown) => {
        console.error(`Could not load ${slug} page image from WordPress:`, error)
      })
  }, [fallbackAlt, slug])

  return (
    <section id={id} aria-label={label} className="relative">
      <Slide src={image} alt={alt} priority={priority} />
    </section>
  )
}
