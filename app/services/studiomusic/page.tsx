import type { Metadata } from "next"

import CmsServiceListings from "@/components/cms-service-listings"
import HeroSection from "@/components/hero-sectionS"

export const metadata: Metadata = {
  title: "Studio Tiga Banyuwangi",
  description: "Book Our Music",
}

export default function StudioMusicServicesPage() {
  return (
    <CmsServiceListings
      group="studiomusic"
      title="Music Studio"
      description="Choose our studio for your music recording needs. We offer a range of services to help you create the perfect sound."
      hero={<HeroSection />}
    />
  )
}
