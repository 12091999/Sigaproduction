import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Car, Clock, User, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import HeroSection from "@/components/hero-sectionS"

export const metadata: Metadata = {
  title: "Studio Tiga Banyuwangi",
  description: "Book Our Music",
}

// Sample taxi services data with rupee pricing
const taxiServices = [
  {
    id: 1,
    name: "Platinum",
    description: "Platinum Studio it's Commercial useable for record's and express your energy .",
    price: 26000,
    rating: 4.8,
    image: "/images/studio 1.jpeg",
    priceUnit: "/Hours"
  },
  {
    id: 2,
    name: "Gold",
    description: "Gold Studio it's soft feel like a genre pop, jazz, reggae .",
    price: 26000,
    rating: 4.7,
    image: "/images/studio 2.jpeg",
    priceUnit: "/Hours"
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
            <h1 className="text-3xl font-bold tracking-tight">Music Studio</h1>
            <p className="text-muted-foreground mb-6">
              Chosse our Studio for your music recording needs. We offer a range of services to help you create the perfect sound.
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
                        <Link href="https://api.whatsapp.com/send/?phone=6281934872954">Book Now</Link>
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
