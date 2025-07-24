import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Car, Home, Hotel, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import FeaturedProducts from "@/components/featured-products"
import HeroSection from "@/components/hero-section"
import ServiceCategories from "@/components/service-categories"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container py-8 md:py-12 space-y-4 md:space-y-6">
        <div className="flex flex-col items-center text-center space-y-2 md:space-y-4 px-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Services</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[700px]">
            Discover everything Merch From SIGA PRODUCTION'S has to offer in The SIGAMERCH from local products.
          </p>
        </div>

        <ServiceCategories />
      </section>

      <section className="container py-8 md:py-12 space-y-4 md:space-y-6 bg-muted/30">
        <div className="flex flex-col items-center text-center space-y-2 md:space-y-4 px-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[700px]">
            Explore our handpicked selection of the finest local products and services from the Nilgiri region.
          </p>
        </div>

        <FeaturedProducts />

        <div className="flex justify-center mt-4 md:mt-8">
          <Button asChild>
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container py-8 md:py-12 space-y-4 md:space-y-6">
        <div className="flex flex-col items-center text-center space-y-2 md:space-y-4 px-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Popular Categories in The Sigamerch Colection's</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-[700px]">
            Find exactly what you need with our most popular service categories in The SIGAMERCH district.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src="/images/sigma.jpeg"
                alt="Studio Tiga Movie And Art"
                fill
                className="object-cover brightness-[0.85]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <Car className="h-6 w-6 md:h-8 md:w-8 mb-2" />
                <h3 className="text-lg md:text-xl font-bold">Event Organizer</h3>
                <p className="text-xs md:text-sm text-white/80">Find The Popular Offer From Sigaproduction</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <p className="text-xs md:text-sm">
                Book We're Service About Music Event, Recording, Filming, ect.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full text-xs md:text-sm h-8 md:h-10">
                <Link href="/services/taxi">Explore Sigaproduction</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src="/images/ooty-tourism.png"
                alt="Tourism in The Nilgiris"
                fill
                className="object-cover brightness-[0.85]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <MapPin className="h-6 w-6 md:h-8 md:w-8 mb-2" />
                <h3 className="text-lg md:text-xl font-bold">Tourism</h3>
                <p className="text-xs md:text-sm text-white/80">Discover Nilgiri's beauty</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <p className="text-xs md:text-sm">
                Discover the beauty of The Nilgiris' tea gardens, botanical gardens, and scenic viewpoints with expert
                local guides.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full text-xs md:text-sm h-8 md:h-10">
                <Link href="/services/tourism">Explore Tourism</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src="/images/ooty-hotel.png"
                alt="Hotels & Lodges in The Nilgiris"
                fill
                className="object-cover brightness-[0.85]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <Hotel className="h-6 w-6 md:h-8 md:w-8 mb-2" />
                <h3 className="text-lg md:text-xl font-bold">Hotels & Lodges</h3>
                <p className="text-xs md:text-sm text-white/80">Luxury stays in the hills</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <p className="text-xs md:text-sm">
                Find the perfect accommodation for your stay in The Nilgiris, from heritage hotels to modern luxury
                resorts.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full text-xs md:text-sm h-8 md:h-10">
                <Link href="/services/accommodations">Find Accommodations</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src="/images/ooty-cottage.png"
                alt="Cottages in The Nilgiris"
                fill
                className="object-cover brightness-[0.85]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <Home className="h-6 w-6 md:h-8 md:w-8 mb-2" />
                <h3 className="text-lg md:text-xl font-bold">Cottages</h3>
                <p className="text-xs md:text-sm text-white/80">Cozy retreats in nature</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <p className="text-xs md:text-sm">
                Enjoy a serene retreat in our beautiful cottages nestled in the Nilgiri hills with stunning views.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full text-xs md:text-sm h-8 md:h-10">
                <Link href="/services/cottages">View Cottages</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
