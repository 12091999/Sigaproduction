import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import HeroSection from "@/components/hero-sectionA"

export const metadata: Metadata = {
  title: "AREATIGA - AREATIGA",
  description: "Book Our Services",
}

// ✅ Data sudah diperbaiki (hanya id, name, description, videoUrl)
const taxiServices = [
  {
    id: 1,
    name: "Breaking Benjamin",
    description:
      "Breaking Benjamin adalah band rock asal Wilkes-Barre, Pennsylvania.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_1/",
  },
  {
    id: 2,
    name: "Hijau Daun",
    description:
      "Hijau Daun merupakan grup musik asal Indonesia yang berasal dari Bandar Lampung.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_2/",
  },
  {
    id: 3,
    name: "Matley Crue",
    description:
      "Matley Crue adalah grup musik heavy metal Amerika yang dibentuk di Los Angeles.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_3/",
  },
  {
    id: 4,
    name: "Scar Symmetry",
    description:
      "Scar Symmetry adalah band death metal melodi asal Swedia yang dibentuk pada tahun 2004 di Avesta.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_4/",
  },
]

export default function TaxiServicesPage() {
  return (
    <>
      <HeroSection />
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="w-full md:w-11/12 lg:w-4/5 text-center">
          <div className="md:w-2/3 lg:w-3/4 mx-auto py-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">AREATIGA</h1>
              <p className="text-muted-foreground mb-6">
                You Can Search Music Encyclopedia
              </p>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-6">
              {taxiServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{service.name}</CardTitle>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-end">
                      <Button asChild>
                        <Link href={service.videoUrl} target="_blank">
                          Watch Video
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
