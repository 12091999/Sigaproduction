import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Home, MapPin, Plus, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Properties for rent from Studio 3 Banyuwangi",
  description: "Browse properties available for rent and sale in the Sigamerch",
}

// Sample properties data
const properties = [
  {
    slug: "Gitar",
    title: "Gitar",
    location: "Studio 3 Banyuwangi",
    price: 45000,
    priceType: "day",
    type: "Rent",
    images: ["/placeholder.svg?height=300&width=500"],
    featured: true,
  },
  {
    slug: "Bass",
    title: "Bass",
    location: "Studio 3 Banyuwangi",
    price: 7500000,
    priceType: "day",
    type: "Rent",
    images: ["/placeholder.svg?height=300&width=500"],
    featured: false,
  },
  {
    slug: "Drum-Set",
    title: "Drum Set",
    location: "Studio 3 Banyuwangi",
    price: 35000,
    priceType: "day",
    type: "Rent",
    images: ["/placeholder.svg?height=300&width=500"],
    featured: true,
  },
  {
    slug: "keyboard",
    title: "Keyboard",
    location: "Studio 3 Banyuwangi",
    price: 12500000,
    priceType: "day",
    type: "Rent",
    images: ["/placeholder.svg?height=300&width=500"],
    featured: true,
  },
  {
    slug: "Amplifier-for-Events" ,
    title: "Amplifier for Events",
    location: "Studio 3 Banyuwangi",
    price: 18000,
    priceType: "day",
    type: "Rent",
    images: ["/placeholder.svg?height=300&width=500"],
    featured: false,
  },
  {
    slug: "Effect",
    title: "Effect",
    location: "Studio 3 Banyuwangi",
    price: 5500000,
    priceType: "day",
    type: "Rent",
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
          <p className="text-muted-foreground">Browse properties for rent in The Studio 3 Banyuwangi</p>
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
                <Input placeholder="Search by item's or keyword" />
              </div>
              <div>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="Gitar">Guitar</SelectItem>
                    <SelectItem value="Bass">Bass</SelectItem>
                    <SelectItem value="keyboard">Keyboard</SelectItem>
                    <SelectItem value="Drum Set">Drum Set</SelectItem>
                    <SelectItem value="Amplifer for Event">Sound</SelectItem>
                    <SelectItem value="Effect">Effect</SelectItem>
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
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.slug} property={property} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="rent" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties
                  .filter((property) => property.type === "Rent")
                  .map((property) => (
                    <PropertyCard key={property.slug} property={property} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="sale" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties
                  .filter((property) => property.type === "Rent")
                  .map((property) => (
                    <PropertyCard key={property.slug} property={property} />
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
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/properties/${property.slug}`}>View Details</Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
