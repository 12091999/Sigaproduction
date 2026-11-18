import type { Metadata } from "next"

import CmsServiceListings from "@/components/cms-service-listings"
import HeroSection from "@/components/hero-sectionM"

export const metadata: Metadata = {
  title: "Sigaproduction Services - SIGAMERCH",
  description: "Book Our Service",
}

export default function MerchServicesPage() {
  return (
    <CmsServiceListings
      group="merch"
      title="Sigamerch ORDER"
      description="See Available Products and Pre-Order T-shirts and bundles"
      hero={<HeroSection />}
    />
  )
}
