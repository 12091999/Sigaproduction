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

export const metadata: Metadata = {
  title: "Sigaproduction Services - SIGAMERCH",
  description: "Book Our Service",
}

// Sample taxi services data with rupee pricing
const taxiServices = [
  {
    id: 1,
    name: "Film",
    description: "Reliable Filming to movie art official music video",
    price: 2799,
    rating: 4.8,
    image: "/images/taxi-service.jpg",
    features: ["Fixed price", "24/7 availability", "Flight tracking"],
  },
  {
    id: 2,
    name: "Nilgiri Hills Tour",
    description: "Explore the beautiful Nilgiri hills with a knowledgeable driver",
    price: 3599,
    rating: 4.7,
    image: "/images/city-tour.jpg",
    features: ["Hourly rate", "Customizable stops", "Local insights"],
  },
  {
    id: 3,
    name: "Nilgiri Mountain Travel",
    description: "Comfortable transportation between mountain towns",
    price: 60,
    priceUnit: "per km",
    rating: 4.9,
    image: "/images/airport-taxi.jpg",
    features: ["Comfortable vehicles", "Experienced drivers", "Stops on request"],
  },
  {
    id: 4,
    name: "Nilgiri Group Transfer",
    description: "Spacious vehicles for group transportation around Nilgiri district",
    price: 4999,
    rating: 4.6,
    image: "/images/taxi-service.jpg",
    features: ["Up to 8 passengers", "Luggage space", "Air conditioning"],
  },
]

export default function TaxiServicesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-start">
        <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:pr-6">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Book a Taxi in The Nilgiris</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="pickup" placeholder="Enter pickup address in The Nilgiris" className="pl-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="destination" placeholder="Enter destination in The Nilgiris" className="pl-8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
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
                    <Label htmlFor="service-type">Service Type</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="service-type">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Taxi</SelectItem>
                        <SelectItem value="premium">Premium Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="van">Minivan</SelectItem>
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
            <h1 className="text-3xl font-bold tracking-tight">Nilgiri Taxi Services</h1>
            <p className="text-muted-foreground mb-6">
              Reliable transportation for all your needs in the Nilgiri hills
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="font-bold text-lg">
                        ₹{service.price.toLocaleString("en-IN")}
                        {service.priceUnit && <span className="text-sm font-normal"> {service.priceUnit}</span>}
                      </div>
                      <Button asChild>
                        <Link href={`/services/taxi/${service.id}`}>Book Now</Link>
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
