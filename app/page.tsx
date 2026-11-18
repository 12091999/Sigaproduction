import Link from "next/link"
import Image from "next/image"
import { ArrowRight, User, Home, Hotel, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import FeaturedProducts from "@/components/featured-products"
import HeroSection from "@/components/hero-section"
import ServiceCategories from "@/components/service-categories"
import Footer from "@/components/footer"
import CmsSectionHeading from "@/components/cms-section-heading"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container py-8 md:py-12 space-y-4 md:space-y-6">
        <CmsSectionHeading
          slug="home-services"
          fallbackTitle="Our Services"
          fallbackDescription="Where needs meet solutions."
          titleClassName="text-2xl md:text-3xl font-bold tracking-tight"
          descriptionClassName="text-sm md:text-base text-muted-foreground max-w-[700px]"
        />

        <ServiceCategories />
      </section>

      <section className="container py-8 md:py-12 space-y-4 md:space-y-6 bg-muted/30">
        <CmsSectionHeading
          slug="home-featured-products"
          fallbackTitle="Featured Products"
          fallbackDescription="Explore our handpicked selection of the finest local products and services from the Sigaproduction."
          titleClassName="text-2xl md:text-3xl font-bold tracking-tight"
          descriptionClassName="text-sm md:text-base text-muted-foreground max-w-[700px]"
        />

        <FeaturedProducts />

        <div className="flex justify-center mt-4 md:mt-8">
          <Button asChild>
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    <Footer />
    </div>
  )
}
