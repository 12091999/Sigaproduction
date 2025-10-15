"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

export function ContactInfo() {
  const email = "Sigaproduction03@gmail.com"
  const phone = "+62 819-3487-2954"
  const whatsapp = "6281934872954"
  const address = "Jl. Karimun Jawa No. 15 Lateng, Kec. Banyuwangi Kabpaten Banyuwangi, Jawa Timur 68413"
  const hours = "Senin–Minggu, 10.00–23.00 WIB"

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-pretty">Informasi Kontak</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="size-5 text-primary mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">Email</p>
            <Link href={`mailto:${email}`} className="text-muted-foreground underline-offset-4 hover:underline">
              {email}
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="size-5 text-primary mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">Telepon</p>
            <Link
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="text-muted-foreground underline-offset-4 hover:underline"
            >
              {phone}
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="size-5 text-primary mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">Alamat</p>
            <p className="text-muted-foreground">{address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="size-5 text-primary mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">Jam Operasional</p>
            <p className="text-muted-foreground">{hours}</p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=Sigaproduction03@gmail.com" target="_blank">Kirim Email</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              Chat WhatsApp
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
