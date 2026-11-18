import type { Metadata } from "next"

import CmsServiceListings from "@/components/cms-service-listings"
import HeroSection from "@/components/hero-sectionEO"

export const metadata: Metadata = {
  title: "SIGAPRO EO - SIGAPRO_EO",
  description: "Book Our Service",
}

export default function SigaProEoServicesPage() {
  return (
    <CmsServiceListings
      group="sigaproeo"
      title="SIGAPRO EO"
      description="Book our event organizer services for your special occasions. We provide professional event management services to make your events memorable."
      hero={<HeroSection />}
    />
  )
}
