"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Camera, Home, Hotel, Music, ShoppingBag } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { mapCmsServiceGroup } from "@/lib/wordpress"
import type { CmsServiceGroup, ServiceGroup } from "@/lib/wordpress"

const fallbackCategories: ServiceGroup[] = [
  {
    id: 1,
    slug: "studiomusic",
    title: "STUDIO 3 MUSIC STUDIO",
    description: "Music Studio",
    pageTitle: "Music Studio",
    pageDescription: "Choose our studio for your music recording needs. We offer a range of services to help you create the perfect sound.",
  },
  {
    id: 2,
    slug: "sigaproeo",
    title: "SIGAPRO EO",
    description: "Event Organizer",
    pageTitle: "SIGAPRO EO",
    pageDescription: "Book our event organizer services for your special occasions. We provide professional event management services to make your events memorable.",
  },
  {
    id: 3,
    slug: "sigma",
    title: "SIGMA",
    description: "Studio Tiga Movie And Art",
    pageTitle: "SIGMA",
    pageDescription: "You Can Pre Order Studio Tiga Movie And Art for make your Expresion Easy",
  },
  {
    id: 4,
    slug: "merch",
    title: "SIGAMERCH",
    description: "Merchandise",
    pageTitle: "Sigamerch ORDER",
    pageDescription: "See Available Products and Pre-Order T-shirts and bundles",
  },
  {
    id: 5,
    slug: "areatiga",
    title: "AREATIGA",
    description: "Discover Musiclopedia",
    pageTitle: "AREATIGA",
    pageDescription: "You Can Search Music Encyclopedia",
  },
]

const categoryPresentation: Record<
  string,
  { icon: LucideIcon; href: string; color: string }
> = {
  studiomusic: { icon: Music, href: "/services/studiomusic", color: "bg-purple-100 text-purple-700" },
  sigaproeo: { icon: Home, href: "/services/sigaproEO", color: "bg-emerald-100 text-emerald-700" },
  sigma: { icon: Camera, href: "/services/SIGMA", color: "bg-amber-100 text-amber-700" },
  merch: { icon: ShoppingBag, href: "/services/merch", color: "bg-rose-100 text-rose-700" },
  areatiga: { icon: Hotel, href: "/services/areatiga", color: "bg-sky-100 text-sky-700" },
}

export default function ServiceCategories() {
  const [categories, setCategories] = useState(fallbackCategories)

  useEffect(() => {
    fetch("/api/wordpress/service-groups")
      .then((response) => {
        if (!response.ok) throw new Error("WordPress service categories unavailable")
        return response.json()
      })
      .then((groups: CmsServiceGroup[]) => {
        if (groups.length) setCategories(groups.map(mapCmsServiceGroup))
      })
      .catch((error: unknown) => {
        console.error("Could not load service categories from WordPress:", error)
      })
  }, [])

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 sm:gap-4">
			{categories.map((category) => {
        const presentation = categoryPresentation[category.slug]
        if (!presentation) return null
        const Icon = presentation.icon
        return (
				<Link
					key={category.id}
					href={presentation.href}
					className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-lg transition-all hover:bg-muted"
				>
					<div
						className={cn(
							"p-2 sm:p-3 rounded-full mb-2 sm:mb-3",
							presentation.color
						)}
					>
						<Icon className="h-5 w-5 sm:h-6 sm:w-6" />
					</div>
					<h3 className="font-medium text-sm sm:text-base">
						{category.title}
					</h3>
					<p className="text-xs sm:text-sm text-muted-foreground">
						{category.description}
					</p>
				</Link>
        )
      })}
		</div>
	)
}
