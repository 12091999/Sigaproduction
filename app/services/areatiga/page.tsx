import type { Metadata } from "next"

import CmsServiceListings from "@/components/cms-service-listings"
import HeroSection from "@/components/hero-sectionA"

export const metadata: Metadata = {
  title: "AREATIGA - AREATIGA",
  description: "Book Our Services",
}

export default function AreaTigaServicesPage() {
  return (
    <CmsServiceListings
      group="areatiga"
      title="AREATIGA"
      description="You Can Search Music Encyclopedia"
      hero={<HeroSection />}
    />
  )
}
