import ServicesSection from "@/components/sections/services-section"
import AboutSection from "@/components/sections/about-section"
import MissionSection from "@/components/sections/mission-section"

export default function Page() {
  return (
    <main className="min-h-screen">
    <AboutSection />
    <MissionSection />
    <ServicesSection />
    </main>
  )
}
