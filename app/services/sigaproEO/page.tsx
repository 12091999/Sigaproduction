import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Car, Clock, Home, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "SIGAPRO EO - SIGAPRO_EO",
  description: "Book Our Service",
}

// Sample taxi services data with rupee pricing
const taxiServices = [
  {
    id: 1,
    name: "Brotherhood",
    description: "Brotherhood is an annual event held to commemorate the anniversary of Studio Tiga Banyuwangi.",
    price: 150000,
    rating: 4.8,
    image: "/images/sigaproeo1.jpeg",
  },
  {
    id: 2,
    name: "Music Festival",
    description: "a regular music festival organized by a school, university, or certain government agency.",
    price: 100000,
    rating: 4.7,
    image: "/images/sigaproeo2.jpeg",
  },
  {
    id: 3,
    name: "Banyuwangi Festival",
    description: "an annual event commemorating Banyuwangi's anniversary which is held in the middle of the year and is located at Gesibu Belambangan",
    price: 115000,
    priceUnit: "per km",
    rating: 4.9,
    image: "/images/sigaproeo3.jpeg",
  },
  {
    id: 4,
    name: "Student Music Festival",
    description: "A music festival for students which is usually held by the Department of Education to fill the series of events for Banyuwangi's anniversary every year.",
    price: 100000,
    rating: 4.6,
    image: "/images/sigaproeo4.jpeg",
  },
]

export default function TaxiServicesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-start">
        <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:pr-6">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Book Our Services</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="Event">Event</Label>
                    <div className="relative">
                      <Home className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="Event" placeholder="Enter event address in The SIGAPRO_EO" className="pl-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Event Location</Label>
                    <div className="relative">
                      <Home className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="Event Location" placeholder="Enter Event Location in the SIGAPRO_EO" className="pl-8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Availbe Until</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="date" type="date" className="pl-8" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="time" type="time" className="pl-8" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-type">Type Event</Label>
                    <Select defaultValue="Select">
                      <SelectTrigger id="service-type">
                        <SelectValue placeholder="Select Event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Music</SelectItem>
                        <SelectItem value="premium">Festival</SelectItem>
                        <SelectItem value="Bundle">Event Organize</SelectItem>
                        <SelectItem value="Limited">Ect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Check Availability</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SIGAPRO EO</h1>
            <p className="text-muted-foreground mb-6">
                Book Our Event Organizer Services for your special occasions. We provide professional event management services to make your events memorable.
            </p>
          </div>

          <Separator className="mb-6" />

          <div className="space-y-6">
            {taxiServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image
                      src={service.image || "/sigaproeo.jpeg"}
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
                        <Link href={`/services/sigaproEO/${service.id}`}>Pre-Order</Link>
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
  )
}
