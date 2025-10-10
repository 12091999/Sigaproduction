"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const units = [
  {
    key: "merch",
    title: "Merchandise",
    desc: "Produksi dan distribusi merchandise resmi: desain kustom, sourcing, quality control, dan fulfillment.",
  },
  {
    key: "movie-art",
    title: "Studio Tiga Movie & Art",
    desc: "Produksi film pendek, video klip, dokumenter, dan creative direction untuk visual yang kuat.",
  },
  {
    key: "music-studio",
    title: "Studio 3 Musik Studio",
    desc: "Rekaman, aransemen, produksi musik, serta mixing & mastering untuk artis dan brand.",
  },
  {
    key: "event-organize",
    title: "Studio Event Organize",
    desc: "Perencanaan dan eksekusi event musik: konser, peluncuran, tur, panggung, talent & teknis audio.",
  },
]

export function BusinessUnits() {
  return (
    <section id="unit-bisnis" aria-labelledby="unit-title" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <h2 id="unit-title" className="text-2xl font-semibold md:text-3xl">
            Layanan & Unit Bisnis
          </h2>
          <p className="mt-2 text-muted-foreground">
            Empat unit terintegrasi untuk kebutuhan kreatif hingga event musik Anda.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {units.map((u) => (
            <Card key={u.key} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{u.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{u.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BusinessUnits
