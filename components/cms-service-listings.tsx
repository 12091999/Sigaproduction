"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CmsService,
  CmsServiceGroup,
  mapCmsService,
  mapCmsServiceGroup,
  Service,
} from "@/lib/wordpress"

type CmsServiceListingsProps = {
  group: string
  title: string
  description: string
  hero: ReactNode
}

export default function CmsServiceListings({
  group,
  title,
  description,
  hero,
}: CmsServiceListingsProps) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageTitle, setPageTitle] = useState(title)
  const [pageDescription, setPageDescription] = useState(description)

  useEffect(() => {
    fetch(`/api/wordpress/service-groups?slug=${encodeURIComponent(group)}`)
      .then((response) => {
        if (!response.ok) throw new Error("WordPress service category unavailable")
        return response.json()
      })
      .then((category: CmsServiceGroup) => {
        const content = mapCmsServiceGroup(category)
        setPageTitle(content.pageTitle)
        setPageDescription(content.pageDescription)
      })
      .catch((cause: unknown) => {
        console.error(`Could not load ${group} category from WordPress:`, cause)
      })

    fetch(`/api/wordpress/services?group=${encodeURIComponent(group)}`)
      .then((response) => {
        if (!response.ok) throw new Error("WordPress API unavailable")
        return response.json()
      })
      .then((posts: CmsService[]) => setServices(posts.map(mapCmsService)))
      .catch((cause: unknown) => {
        console.error(`Could not load ${group} services from WordPress:`, cause)
        setError("Layanan tidak dapat dimuat. Silakan coba lagi nanti.")
      })
      .finally(() => setLoading(false))
  }, [group])

  return (
    <>
      {hero}
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="w-full md:w-11/12 lg:w-4/5 text-center">
          <div className="md:w-2/3 lg:w-3/4 mx-auto py-10">
            <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
            <p className="text-muted-foreground mb-6">{pageDescription}</p>
            <Separator className="mb-6" />

            {loading && <p role="status">Memuat layanan...</p>}
            {error && <p role="alert" className="text-destructive">{error}</p>}
            {!loading && !error && services.length === 0 && (
              <p>Belum ada layanan untuk kategori ini.</p>
            )}

            <div className="space-y-6">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden text-left">
                  <div className="md:flex">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <CardTitle className="mb-2">{service.name}</CardTitle>
                      <p className="text-muted-foreground mb-4">
                        {service.description}
                      </p>

                      {service.rating !== null && (
                        <div className="flex items-center gap-1 mb-4">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">
                            {service.rating} rating
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        {service.price !== null ? (
                          <div className="font-bold text-lg">
                            Rp{service.price.toLocaleString("id-ID")}
                            {service.priceUnit && (
                              <span className="text-sm font-normal">
                                {" "}{service.priceUnit}
                              </span>
                            )}
                          </div>
                        ) : <span />}
                        <Button asChild>
                          <a
                            href={service.actionUrl}
                            target={service.actionUrl.includes("instagram.com") ? "_blank" : undefined}
                            rel={service.actionUrl.includes("instagram.com") ? "noopener noreferrer" : undefined}
                          >
                            {service.actionLabel}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
