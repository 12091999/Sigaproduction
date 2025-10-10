import { Hero } from "@/components/about/hero"
import { Stats } from "@/components/about/stats"
import { Values } from "@/components/about/values"
import { Timeline } from "@/components/about/timeline"
import { Team } from "@/components/about/team"
import { Testimonials } from "@/components/about/testimonials"
import { CTA } from "@/components/about/cta"
import { BusinessUnits } from "@/components/about/business-units"

export const metadata = {
  title: "Tentang CV.Sigaproduction",
  description:
    "Profil CV.Sigaproduction: Merchandise, Studio Tiga Movie & Art, Studio 3 Musik Studio, dan Studio Event Organize.",
}

export default function AboutPage() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <BusinessUnits />
      <Stats />
      <Values />
      <Timeline />
      <Team />
      <Testimonials />
      <CTA />
    </main>
  )
}
