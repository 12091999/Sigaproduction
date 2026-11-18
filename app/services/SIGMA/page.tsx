import type { Metadata } from "next"

import CmsServiceListings from "@/components/cms-service-listings"
import HeroSection from "@/components/hero-sectionG"

export const metadata: Metadata = {
  title: "Studio Tiga Video And Art - SIGMA",
  description: "Book Our Services",
}

export default function SigmaServicesPage() {
  return (
    <CmsServiceListings
      group="sigma"
      title="SIGMA"
      description="You Can Pre Order Studio Tiga Movie And Art for make your Expresion Easy"
      hero={<HeroSection />}
    />
  )
}
