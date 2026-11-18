"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CmsProperty, mapCmsProperty, Property } from "@/lib/wordpress"

export default function CmsPropertyDetail({ slug }: { slug: string }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetch(`/api/wordpress/properties?slug=${encodeURIComponent(slug)}`)
      .then((response) => {
        if (response.status === 404) throw new Error("Properti tidak ditemukan.")
        if (!response.ok) throw new Error("Data properti tidak dapat dimuat.")
        return response.json()
      })
      .then((post: CmsProperty) => {
        if (active) setProperty(mapCmsProperty(post))
      })
      .catch((cause: unknown) => {
        console.error(`Could not load property ${slug} from WordPress:`, cause)
        if (active) setError(cause instanceof Error ? cause.message : "Terjadi kesalahan.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return <p className="container py-12 text-center" role="status">Memuat detail properti...</p>
  }

  if (error || !property) {
    return (
      <div className="container py-12 text-center">
        <p role="alert" className="mb-4 text-destructive">{error || "Properti tidak ditemukan."}</p>
        <Button asChild variant="outline">
          <Link href="/properties">Kembali ke daftar properti</Link>
        </Button>
      </div>
    )
  }

  const image = property.images[0] || "/placeholder.svg"

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/properties">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke daftar properti
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={image} alt={property.title} fill className="object-cover" />
            <Badge className="absolute right-4 top-4">For {property.type}</Badge>
            {property.featured && <Badge className="absolute left-4 top-4">Featured</Badge>}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
            <p className="mt-2 flex items-center text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {property.location}
            </p>
          </div>
          <section>
            <h2 className="mb-2 text-xl font-semibold">Deskripsi</h2>
            <p className="whitespace-pre-line text-muted-foreground">
              {property.description || "Informasi lebih lanjut dapat ditanyakan melalui halaman kontak."}
            </p>
          </section>
          {property.address && (
            <section>
              <h2 className="mb-2 text-xl font-semibold">Alamat</h2>
              <p className="text-muted-foreground">{property.address}</p>
            </section>
          )}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Rp{property.price.toLocaleString("id-ID")}
              <span className="ml-1 text-base font-normal text-muted-foreground">
                /{property.priceType}
              </span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{property.category}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" asChild>
              <Link href={`/contact?property=${encodeURIComponent(property.slug)}`}>Hubungi Kami</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/contact?property=${encodeURIComponent(property.slug)}`}>Jadwalkan Penyewaan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
