import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import HeroSection from "@/components/hero-sectionA"

export const metadata: Metadata = {
  title: "AREATIGA - AREATIGA",
  description: "Book Our Services",
}

// ✅ Data baru tanpa price, rating, dll + pakai gambar lokal
const taxiServices = [
  {
    id: 1,
    name: "Breaking Benjamin",
    description:
      "Breaking Benjamin adalah band rock asal Wilkes-Barre, Pennsylvania.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_1/",
    image: "/images/sigma1.jpg",
  },
  {
    id: 2,
    name: "Hijau Daun",
    description:
      "Hijau Daun merupakan grup musik asal Indonesia yang berasal dari Bandar Lampung.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_2/",
    image: "/images/sigma2.png",
  },
  {
    id: 3,
    name: "Matley Crue",
    description:
      "Matley Crue adalah grup musik heavy metal Amerika yang dibentuk di Los Angeles.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_3/",
    image: "/images/sigma3.jpeg",
  },
  {
    id: 4,
    name: "Scar Symmetry",
    description:
      "Scar Symmetry adalah band death metal melodi asal Swedia yang dibentuk pada tahun 2004 di Avesta.",
    videoUrl: "https://www.instagram.com/reel/VIDEO_ID_4/",
    image: "/images/sigma4.jpeg",
  },
]

export default function TaxiServicesPage() {
  return (
    <>
      <HeroSection />
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="w-full md:w-11/12 lg:w-4/5 text-center">
          <div className="text-center">
            <div className="sticky top-24 space-y-6">
              <div></div>
            </div>
          </div>
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
                  <div className="md:flex">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <CardTitle className="mb-2">{service.name}</CardTitle>
                      <p className="text-muted-foreground mb-4">
                        {service.description}
                      </p>

                      <div className="flex justify-end mt-4">
                        <Button asChild>
                          <Link href={service.videoUrl} target="_blank">
                            Lihat Video
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
