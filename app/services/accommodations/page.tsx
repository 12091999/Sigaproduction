import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Star, Wifi, Utensils, Tv, Car } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Hotels & Lodges - Nanga Market",
  description: "Find comfortable accommodations for your stay",
}

// Sample accommodations data
const accommodations = [
  {
    id: 1,
    name: "Nanga Grand Hotel",
    description: "Luxury hotel with stunning views and premium amenities",
    price: 199.99,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400",
    type: "Hotel",
    location: "City Center",
    features: ["Free WiFi", "Restaurant", "Swimming Pool", "Parking"],
    badge: "Popular",
  },
  {
    id: 2,
    name: "Riverside Lodge",
    description: "Comfortable lodge by the river with beautiful natural surroundings",
    price: 149.99,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400",
    type: "Lodge",
    location: "Riverside",
    features: ["Free WiFi", "Restaurant", "Nature Trails", "Parking"],
    badge: "Best Value",
  },
  {
    id: 3,
    name: "Mountain View Hotel",
    description: "Modern hotel with panoramic mountain views",
    price: 179.99,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=400",
    type: "Hotel",
    location: "Mountain Area",
    features: ["Free WiFi", "Restaurant", "Spa", "Parking"],
    badge: null,
  },
  {
    id: 4,
    name: "Safari Lodge",
    description: "Authentic lodge experience with easy access to wildlife",
    price: 159.99,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400",
    type: "Lodge",
    location: "Safari Zone",
    features: ["Free WiFi", "Restaurant", "Safari Tours", "Parking"],
    badge: "Top Rated",
  },
]

export default function AccommodationsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-start">
        <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:pr-6">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Find Accommodations</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="Where are you going?" className="pl-8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="check-in">Check-in</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="check-in" type="date" className="pl-8" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="check-out">Check-out</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="check-out" type="date" className="pl-8" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guests">Guests</Label>
                      <Select defaultValue="2">
                        <SelectTrigger id="guests">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5">5+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rooms">Rooms</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="rooms">
                          <SelectValue placeholder="Select rooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Room</SelectItem>
                          <SelectItem value="2">2 Rooms</SelectItem>
                          <SelectItem value="3">3 Rooms</SelectItem>
                          <SelectItem value="4">4+ Rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Accommodation Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="hotel">Hotels</SelectItem>
                        <SelectItem value="lodge">Lodges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Search</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hotels & Lodges</h1>
            <p className="text-muted-foreground mb-6">Find comfortable accommodations for your stay</p>
          </div>

          <Separator className="mb-6" />

          <div className="space-y-6">
            {accommodations.map((accommodation) => (
              <Card key={accommodation.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image
                      src={accommodation.image || "/placeholder.svg"}
                      alt={accommodation.name}
                      fill
                      className="object-cover"
                    />
                    {accommodation.badge && (
                      <Badge className="absolute top-2 right-2 bg-emerald-600">{accommodation.badge}</Badge>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle>{accommodation.name}</CardTitle>
                      <Badge variant="outline">{accommodation.type}</Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {accommodation.location}
                    </div>

                    <p className="text-muted-foreground mb-4">{accommodation.description}</p>

                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{accommodation.rating} rating</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                      {accommodation.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {feature.includes("WiFi") && <Wifi className="h-4 w-4 text-emerald-600" />}
                          {feature.includes("Restaurant") && <Utensils className="h-4 w-4 text-emerald-600" />}
                          {feature.includes("TV") && <Tv className="h-4 w-4 text-emerald-600" />}
                          {feature.includes("Parking") && <Car className="h-4 w-4 text-emerald-600" />}
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="font-bold text-lg">${accommodation.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">per night</div>
                      </div>
                      <Button asChild>
                        <Link href={`/services/accommodations/${accommodation.id}`}>Book Now</Link>
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
