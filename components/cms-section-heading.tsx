"use client"

import { useEffect, useState } from "react"

import { stripHtml } from "@/lib/wordpress"

type CmsSectionHeadingProps = {
  slug: string
  fallbackTitle: string
  fallbackDescription: string
  titleClassName: string
  descriptionClassName: string
}

type CmsTextPage = {
  title: { rendered: string }
  content: { rendered: string }
}

export default function CmsSectionHeading({
  slug,
  fallbackTitle,
  fallbackDescription,
  titleClassName,
  descriptionClassName,
}: CmsSectionHeadingProps) {
  const [title, setTitle] = useState(fallbackTitle)
  const [description, setDescription] = useState(fallbackDescription)

  useEffect(() => {
    fetch(`/api/wordpress/pages?slug=${encodeURIComponent(slug)}`)
      .then((response) => {
        if (!response.ok) throw new Error("WordPress page unavailable")
        return response.json()
      })
      .then((page: CmsTextPage) => {
        setTitle(stripHtml(page.title.rendered) || fallbackTitle)
        setDescription(stripHtml(page.content.rendered) || fallbackDescription)
      })
      .catch((error: unknown) => {
        console.error(`Could not load ${slug} section copy from WordPress:`, error)
      })
  }, [fallbackDescription, fallbackTitle, slug])

  return (
    <div className="flex flex-col items-center text-center space-y-2 md:space-y-4 px-2">
      <h2 className={titleClassName}>{title}</h2>
      <p className={descriptionClassName}>{description}</p>
    </div>
  )
}
