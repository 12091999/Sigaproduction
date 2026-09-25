
"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Plus, Search, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// =========================================================
// PROPERTY TYPE
// =========================================================

type Property = {
  id?: string | number
  slug: string
  title: string
  description?: string
  location: string
  address?: string
  price: number
  priceType: string
  type: string
  category?: string
  area?: string
  images: string[]
  featured: boolean
  contact?: {
    name?: string
    phone?: string
    email?: string
    hours?: string
  }
  createdAt?: string
}


// =========================================================
// DEFAULT PROPERTIES
// =========================================================

const defaultProperties: Property[] = [
  {
    id: "default-guitar",
    slug: "Gitar",
    title: "Gitar",
    location: "Studio 3 Banyuwangi",
    price: 450000,
    priceType: "day",
    type: "Rent",
    category: "Guitar",
    images: ["/images/gitar1.jpg"],
    featured: true,
  },

  {
    id: "default-bass",
    slug: "Bass",
    title: "Bass",
    location: "Studio 3 Banyuwangi",
    price: 750000,
    priceType: "day",
    type: "Rent",
    category: "Bass",
    images: ["/images/bass1.jpg"],
    featured: false,
  },

  {
    id: "default-drum",
    slug: "Drum-Set",
    title: "Drum Set",
    location: "Studio 3 Banyuwangi",
    price: 350000,
    priceType: "day",
    type: "Rent",
    category: "Drum Set",
    images: ["/images/drum1.jpg"],
    featured: true,
  },

  {
    id: "default-keyboard",
    slug: "keyboard",
    title: "Keyboard",
    location: "Studio 3 Banyuwangi",
    price: 125000,
    priceType: "day",
    type: "Rent",
    category: "Keyboard",
    images: ["/images/keyboard1.jpg"],
    featured: true,
  },

  {
    id: "default-amplifier",
    slug: "amplifier-for-events",
    title: "Amplifier for Event",
    location: "Studio 3 Banyuwangi",
    price: 180000,
    priceType: "day",
    type: "Rent",
    category: "Amplifier for Event",
    images: ["/images/ampli1.jpg"],
    featured: false,
  },

  {
    id: "default-effect",
    slug: "Effect",
    title: "Effect",
    location: "Studio 3 Banyuwangi",
    price: 550000,
    priceType: "day",
    type: "Rent",
    category: "Effect",
    images: ["/images/effect1.jpg"],
    featured: false,
  },

  {
    id: "default-fullset",
    slug: "Fullset",
    title: "Fullset",
    location: "Studio 3 Banyuwangi",
    price: 1000000,
    priceType: "day",
    type: "Rent",
    category: "Fullset",
    images: ["/placeholder.svg?height=300&width=500"],
    featured: false,
  },
]


// =========================================================
// PROPERTIES PAGE
// =========================================================

export default function PropertiesPage() {

  // Semua property
  const [properties, setProperties] =
    useState<Property[]>(defaultProperties)

  // Search
  const [search, setSearch] = useState("")

  // Category filter
  const [categoryFilter, setCategoryFilter] =
    useState("all")

  // Price filter
  const [priceFilter, setPriceFilter] =
    useState("all")


  // =======================================================
  // LOAD PROPERTY DARI LOCAL STORAGE
  // =======================================================

  useEffect(() => {
    try {
      const savedProperties =
        localStorage.getItem("rentalProperties")

      if (!savedProperties) {
        setProperties(defaultProperties)
        return
      }

      const parsedProperties = JSON.parse(savedProperties)

      if (!Array.isArray(parsedProperties)) {
        setProperties(defaultProperties)
        return
      }

      // Gabungkan property default + property baru
      setProperties([
        ...defaultProperties,
        ...parsedProperties,
      ])

    } catch (error) {
      console.error(
        "Failed to load rental properties:",
        error
      )

      setProperties(defaultProperties)
    }
  }, [])


  // =======================================================
  // FILTER PROPERTY
  // =======================================================

  const filteredProperties = useMemo(() => {

    return properties.filter((property) => {

      // -------------------------------
      // SEARCH
      // -------------------------------

      const searchText =
        search.toLowerCase().trim()

      const matchesSearch =
        !searchText ||
        property.title
          .toLowerCase()
          .includes(searchText) ||
        property.location
          .toLowerCase()
          .includes(searchText) ||
        property.category
          ?.toLowerCase()
          .includes(searchText)


      // -------------------------------
      // CATEGORY
      // -------------------------------

      const matchesCategory =
        categoryFilter === "all" ||
        property.type === categoryFilter


      // -------------------------------
      // PRICE
      // -------------------------------

      let matchesPrice = true

      if (priceFilter === "0-200000") {
        matchesPrice =
          property.price <= 200000
      }

      if (priceFilter === "200000-500000") {
        matchesPrice =
          property.price > 200000 &&
          property.price <= 500000
      }

      if (priceFilter === "500000-1000000") {
        matchesPrice =
          property.price > 500000 &&
          property.price <= 1000000
      }

      if (priceFilter === "1000000+") {
        matchesPrice =
          property.price > 1000000
      }


      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      )
    })

  }, [
    properties,
    search,
    categoryFilter,
    priceFilter,
  ])


  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="container py-8">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Properties
          </h1>

          <p className="text-muted-foreground">
            Browse properties for rent in The Studio 3 Banyuwangi
          </p>
        </div>

        <Button
          className="mt-4 md:mt-0"
          asChild
        >
          <Link href="/properties/add">

            <Plus className="mr-2 h-4 w-4" />

            List Your Property

          </Link>
        </Button>

      </div>


      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        {/* ================================================= */}
        {/* SIDEBAR FILTER */}
        {/* ================================================= */}

        <div className="md:col-span-1 space-y-4">

          <div className="bg-muted p-4 rounded-lg">

            <h2 className="font-semibold mb-4">
              Search Properties
            </h2>

            <div className="space-y-4">

              {/* SEARCH */}
              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  className="pl-9"
                  placeholder="Search by item or keyword"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>


              {/* CATEGORY */}
              <div>

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="all">
                      All Properties
                    </SelectItem>

                    <SelectItem value="Guitar">
                      Guitar
                    </SelectItem>

                    <SelectItem value="Bass">
                      Bass
                    </SelectItem>

                    <SelectItem value="Keyboard">
                      Keyboard
                    </SelectItem>

                    <SelectItem value="Drum Set">
                      Drum Set
                    </SelectItem>

                    <SelectItem value="Amplifier for Event">
                      Amplifier for Event
                    </SelectItem>

                    <SelectItem value="Effect">
                      Effect
                    </SelectItem>

                    <SelectItem value="Fullset">
                      Fullset
                    </SelectItem>

                  </SelectContent>

                </Select>

              </div>


              {/* PRICE */}
              <div>

                <Select
                  value={priceFilter}
                  onValueChange={setPriceFilter}
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="all">
                      Any Price
                    </SelectItem>

                    <SelectItem value="0-200000">
                      Rp0 - Rp200.000
                    </SelectItem>

                    <SelectItem value="200000-500000">
                      Rp200.000 - Rp500.000
                    </SelectItem>

                    <SelectItem value="500000-1000000">
                      Rp500.000 - Rp1.000.000
                    </SelectItem>

                    <SelectItem value="1000000+">
                      Rp1.000.000+
                    </SelectItem>

                  </SelectContent>

                </Select>

              </div>


              {/* RESET */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearch("")
                  setCategoryFilter("all")
                  setPriceFilter("all")
                }}
              >
                Reset Filter
              </Button>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* PROPERTY LIST */}
        {/* ================================================= */}

        <div className="md:col-span-3">

          <Tabs
            defaultValue="all"
            className="mb-6"
          >

            <TabsList>

              <TabsTrigger value="all">
                All ({filteredProperties.length})
              </TabsTrigger>

              <TabsTrigger value="rent">
                For Rent
              </TabsTrigger>

            </TabsList>


            {/* ============================================= */}
            {/* ALL */}
            {/* ============================================= */}

            <TabsContent
              value="all"
              className="mt-6"
            >

              {filteredProperties.length > 0 ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {filteredProperties.map(
                    (property) => (
                      <PropertyCard
                        key={`${property.slug}-${property.id ?? "default"}`}
                        property={property}
                      />
                    )
                  )}

                </div>

              ) : (

                <EmptyState />

              )}

            </TabsContent>


            {/* ============================================= */}
            {/* RENT */}
            {/* ============================================= */}

            <TabsContent
              value="rent"
              className="mt-6"
            >

              {filteredProperties.filter(
                (property) =>
                  property.type === "Rent"
              ).length > 0 ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {filteredProperties
                    .filter(
                      (property) =>
                        property.type === "Rent"
                    )
                    .map((property) => (

                      <PropertyCard
                        key={`${property.slug}-${property.id ?? "default"}`}
                        property={property}
                      />

                    ))}

                </div>

              ) : (

                <EmptyState />

              )}

            </TabsContent>

          </Tabs>

        </div>

      </div>

    </div>
  )
}


// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState() {

  return (
    <div className="border rounded-lg p-10 text-center">

      <h3 className="text-lg font-semibold mb-2">
        No properties found
      </h3>

      <p className="text-muted-foreground mb-5">
        Try changing your search or filter.
      </p>

      <Button asChild>

        <Link href="/properties/add">

          <Plus className="mr-2 h-4 w-4" />

          Add Rental Property

        </Link>

      </Button>

    </div>
  )
}


// =========================================================
// PROPERTY CARD
// =========================================================

function PropertyCard({
  property,
}: {
  property: Property
}) {

  const image =
    property.images?.[0] ||
    "/placeholder.svg"


  return (
    <Card className="overflow-hidden group h-full flex flex-col">

      {/* IMAGE */}

      <div className="relative">

        <div className="relative h-48 w-full overflow-hidden">

          <Image
            src={image}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

        </div>


        {/* RENT BADGE */}

        <Badge
          className={`absolute top-2 right-2 ${
            property.type === "Rent"
              ? "bg-blue-600"
              : "bg-emerald-600"
          } text-xs`}
        >
          For {property.type}
        </Badge>


        {/* FEATURED */}

        {property.featured && (

          <Badge
            className="absolute top-2 left-2 bg-amber-600 text-xs"
          >
            Featured
          </Badge>

        )}

      </div>


      {/* CONTENT */}

      <CardContent className="p-4 flex-grow">

        {/* LOCATION */}

        <div className="flex items-center text-sm text-muted-foreground mb-2">

          <MapPin className="h-4 w-4 mr-1" />

          {property.location}

        </div>


        {/* TITLE */}

        <h3 className="font-semibold text-lg mb-2 line-clamp-1">

          {property.title}

        </h3>


        {/* CATEGORY */}

        {property.category && (

          <div className="text-sm text-muted-foreground mb-2">

            {property.category}

          </div>

        )}


        {/* PRICE */}

        <div className="font-bold text-lg mb-3">

          Rp{Number(property.price || 0).toLocaleString("id-ID")}

          {property.priceType === "day" && "/day"}

          {property.priceType === "event" && "/event"}

          {property.priceType === "week" && "/week"}

        </div>

      </CardContent>


      {/* FOOTER */}

      <CardFooter className="p-4 pt-0 flex justify-between">

        <Button
          variant="outline"
          size="sm"
          asChild
        >

          <Link
            href={`/properties/${property.slug}`}
          >
            View Details
          </Link>

        </Button>


        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.share) {
              navigator.share({
                title: property.title,
                text: `Check out ${property.title}`,
                url: window.location.origin +
                  `/properties/${property.slug}`,
              })
            }
          }}
        >

          <Share2 className="h-4 w-4" />

        </Button>

      </CardFooter>

    </Card>
  )
}
