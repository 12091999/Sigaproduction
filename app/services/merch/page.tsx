import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Car, Clock, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import HeroSection from "@/components/hero-sectionM"


export const metadata: Metadata = {
  title: "Sigaproduction Services - SIGAMERCH",
  description: "Book Our Service",
}

// Sample taxi services data with rupee pricing
const taxiServices = [
  {
    id: 1,
    name: "Gandrung Edition",
    description: "The word (Gandrung) is interpreted as the fascination of the agrarian Blambangan people with Dewi Sri as the Goddess of Rice.",
    price: 150000,
    rating: 4.8,
    image: "/images/siga3.jpeg",
  },
  {
    id: 2,
    name: "Seblang Edition",
    description: "The Seblang ritual is one of the Osing people's ceremonial rituals which can only be found in two villages in the Glagah sub-district of Banyuwangi.",
    price: 100000,
    rating: 4.7,
    image: "/images/siga4.jpeg",
  },
  {
    id: 3,
    name: "Brotherhood Edition",
    description: "The Limited Edition, Brotherhood Merch Bundling",
    price: 115000,
    priceUnit: "per km",
    rating: 4.9,
    image: "/images/brotherhood.jpeg",
  },
  {
    id: 4,
    name: "Mental Disoder",
    description: "Damage or harm to human mental health or human psychological suffering",
    price: 100000,
    rating: 4.6,
    image: "/images/siga1.jpeg",
  },
]

export default function TaxiServicesPage() {
  return (
    <>
    <HeroSection />
    <div className="flex justify-center mb-4 md:mb-6">
      <div className="w-full md:w-11/12 lg:w-4/5 text-center">
        <div className="text-center">
          <div className="sticky top-24 space-y-6">
            <div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 lg:w-3/4 mx-auto py-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sigamerch ORDER</h1>
            <p className="text-muted-foreground mb-6">
              See Availble Product And Pre-Order T-shirt and the Bundle
            </p>
          </div>

          <Separator className="mb-6" />

          <div className="space-y-6">
            {taxiServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <CardTitle className="mb-2">{service.name}</CardTitle>
                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{service.rating} rating</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="font-bold text-lg">
                        Rp{service.price.toLocaleString("in-IN")}
                        {service.priceUnit && <span className="text-sm font-normal"> {service.priceUnit}</span>}
                      </div>
                      <Button asChild>
                        <Link href="https://shopee.co.id/">Order</Link>
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
