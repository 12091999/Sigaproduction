import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Update the featuredProducts array with HD images, improved descriptions, and rupee pricing

const featuredProducts = [
  {
    id: 1,
    name: "Pernicious Humaniora",
    category: "Products",
    price: 150000,
    rating: 4.8,
    image: "/images/siga1.jpeg",
    badge: "Popular",
    description: "Kerusakan atau bahaya bagai kesehatan mental manusia atau penderita psikologis manusia",
  },
  {
    id: 2,
    name: "Agorophobia",
    category: "Product",
    price: 150000,
    rating: 4.9,
    image: "/images/siga2.jpg",
    badge: "Best Seller",
    description: "Ketakutan yang sangat kuat saat berada di tempat terbuka atau dalam situasi yang mungkin sulit untuk melarikan diri, atau di mana bantuan mungkin tidak tersedia",
  },
  {
    id: 3,
    name: "Gandrung",
    category: "Product",
    price: 150000,
    rating: 4.7,
    image: "/images/siga3.jpeg",
    badge: null,
    description: "Kata 'Gandrung' diartikan sebagai terpesonanya masyarakat Blambangan yang agraris kepada Dewi Sri sebagai Dewi Padi",
  },
  {
    id: 4,
    name: "Seblang",
    category: "Product",
    price: 150000,
    rating: 4.6,
    image: "/images/siga4.jpeg",
    badge: "Reliable",
    description: "Ritual Seblang adalah salah satu ritual upacara masyarakat Osing yang hanya dapat dijumpai di dua desa dalam wilayah kecamatan Glagah Banyuwangi",
  },
]

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
      {featuredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden group h-full flex flex-col">
          <CardHeader className="p-0">
            <div className="relative h-52 sm:h-56 w-full overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {product.badge && (
                <Badge className="absolute top-2 right-2 bg-emerald-600 text-xs">{product.badge}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 flex-grow">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">{product.category}</div>
            <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-1 mb-1 sm:mb-2">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs sm:text-sm font-medium">{product.rating}</span>
            </div>
            <div className="font-bold text-sm sm:text-base mb-2">Rp{product.price.toLocaleString("id-ID")}</div>
            {product.description && (
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            )}
          </CardContent>
          <CardFooter className="p-3 sm:p-4 pt-0">
            <Button asChild className="w-full text-sm h-9">
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
