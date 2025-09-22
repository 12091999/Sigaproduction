import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, Home, MapPin, Plus, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Properties for Rent & Sale - Nanga Market",
  description: "Browse properties available for rent and sale in the Nilgiris region",
}

// Sample properties data
const properties = [
  {
    id: 1,
    title: "Modern Villa with Mountain View",
    location: "Coonoor, The Nilgiris",
    price: 45000,
    priceType: "month",
    type: "Rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: ["/placeholder.svg?height=300&width=500"],
    featured: true,
  },
  {
    id: 2,
    title: "Cozy Cottage near Tea Gardens",
    location: "Kotagiri, The Nilgiris",
    price: 7500000,
    priceType: "total",
    type: "Sale",
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    images: ["/placeholder.svg?height=300&width=500"],
    featured: false,
  },
  {
    id: 3,
    title: "Luxury Apartment in City Center",
    location: "Ooty, The Nilgiris",
    price: 35000,
    priceType: "month",
    type: "Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    images: ["/placeholder.svg?height=300&width=500"],
    featured: true,
  },
  {
    id: 4,
    title: "Heritage Bungalow with Garden",
    location: "Coonoor, The Nilgiris",
    price: 12500000,
    priceType: "total",
    type: "Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    images: ["/placeholder.svg?height=300&width=500"],
    featured: true,
  },
  {
    id: 5,
    title: "Studio Apartment near Market",
    location: "Ooty, The Nilgiris",
    price: 18000,
    priceType: "month",
    type: "Rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    images: ["/placeholder.svg?height=300&width=500"],
    featured: false,
  },
  {
    id: 6,
    title: "Commercial Space for Business",
    location: "Ooty, The Nilgiris",
    price: 5500000,
    priceType: "total",
    type: "Sale",
    bedrooms: 0,
    bathrooms: 1,
    area: 1200,
    images: ["/placeholder.svg?height=300&width=500"],
    featured: false,
  },
]

export default function PropertiesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Browse properties for rent and sale in The Nilgiris region</p>
        </div>
        <Button className="mt-4 md:mt-0" asChild>
          <Link href="/properties/add">
            <Plus className="mr-2 h-4 w-4" />
            List Your Property
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h2 className="font-semibold mb-4">Search Properties</h2>
            <div className="space-y-4">
              <div>
                <Input placeholder="Search by location or keyword" />
              </div>
              <div>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="house">Guitar</SelectItem>
                    <SelectItem value="apartment">Bass</SelectItem>
                    <SelectItem value="villa">Drum</SelectItem>
                    <SelectItem value="cottage">Sound</SelectItem>
                    <SelectItem value="commercial">Full Set</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-20000">Rp0 - Rp20,000/day</SelectItem>
                    <SelectItem value="20000-40000">Rp20,000 - Rp40,000/day</SelectItem>
                    <SelectItem value="40000-60000">Rp40,000 - Rp60,000/day</SelectItem>
                    <SelectItem value="60000+">Rp60,000+/day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Search</Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="rent">For Rent</TabsTrigger>
              <TabsTrigger value="sale">For Sale</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="rent" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties
                  .filter((property) => property.type === "Rent")
                  .map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="sale" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties
                  .filter((property) => property.type === "Sale")
                  .map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function PropertyCard({ property }: { property: any }) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <Badge
          className={`absolute top-2 right-2 ${property.type === "Rent" ? "bg-blue-600" : "bg-emerald-600"} text-xs`}
        >
          For {property.type}
        </Badge>
        {property.featured && <Badge className="absolute top-2 left-2 bg-amber-600 text-xs">Featured</Badge>}
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
        <div className="font-bold text-lg mb-3">
          Rp{property.price.toLocaleString("in-IN")}
          {property.priceType === "day" ? "/day" : ""}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span>{property.area} sq.ft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
