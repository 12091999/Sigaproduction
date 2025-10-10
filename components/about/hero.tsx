"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              CV.Sigaproduction — Kreatif, Musik, Film, dan Event dalam satu atap.
            </h1>
            <p className="text-pretty text-muted-foreground md:text-lg">
              Kami menghadirkan solusi end-to-end melalui empat unit: Merchandise, Studio Tiga Movie & Art, Studio 3
              Musik Studio, dan Studio Event Organize untuk semua event yang berkaitan dengan musik.
            </p>
            <div className="flex items-center gap-3">
              <Button asChild>
                <Link href="#unit-bisnis">Lihat Layanan</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="#kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
          <Card
            role="img"
            aria-label="Kolase karya CV.Sigaproduction"
            className="relative overflow-hidden border bg-card p-0"
          >
            <img
              src="/images/dark ui dashboard preview.jpg"
              alt="Pratinjau karya dan produksi CV.Sigaproduction"
              className="h-full w-full object-cover"
            />
          </Card>
        </div>
      </div>
    </header>
  )
}
