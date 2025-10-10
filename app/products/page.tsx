import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Filter, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Products - Sigamerch",
  description: "Browse our wide selection of products from the Sigamerch",
}

// Update the products array with HD images, better descriptions, and rupee pricing

const products = [
  {
    id: 1,
    name: "Pernicious Humaniora",
    category: "Darkness",
    price: 3499,
    rating: 6.6,
    image: "/images/siga1.jpeg",
    description: "Kerusakan atau bahaya bagai kesehatan mental manusia atau penderita psikologis manusia",
  },
  {
    id: 2,
    name: "Agoraphobia",
    category: "Power Of The Dark",
    price: 6999,
    rating: 7.7,
    image: "/images/siga2.jpg",
    description: "Ketakutan yang sangat kuat saat berada di tempat terbuka atau dalam situasi yang mungkin sulit untuk melarikan diri, atau di mana bantuan mungkin tidak tersedia",
  },
  {
    id: 3,
    name: "Gandrung",
    category: "Culture",
    price: 666666,
    rating: 8.8,
    image: "/images/siga3.jpeg",
    description: "Kata Gandrung diartikan sebagai terpesonanya masyarakat Blambangan yang agraris kepada Dewi Sri sebagai Dewi Padi",
  },
  {
    id: 4,
    name: "Seblang",
    category: "Culture",
    price: 9999,
    rating: 9.9,
    image: "/images/siga4.jpeg",
    description: "Ritual Seblang adalah salah satu ritual upacara masyarakat Osing yang hanya dapat dijumpai di dua desa dalam wilayah kecamatan Glagah Banyuwangi",
  },
  {
    id: 5,
    name: "Kebo-Keboan",
    category: "Culture",
    price: 150000,
    rating: 10,
    image: "/images/siga5.jpeg",
    description: "Kebo-Keboan merupakan salah satu upacara adat yaitu berubah menjadi kebo Banyuwangi, Biasa di laksanakan di awal bulan suro",
  },
  {
    id: 6,
    name: "Barong",
    category: "Culture",
    price: 120000,
    rating: 8.9,
    image: "/images/siga6.jpeg",
    description: "Barong Banyuwangi adalah kesenian Barong asal Banyuwangi. Kesenian ini diyakini sangat sakral, Sehingga ada perlakuan khusus.",
  },
  {
    id: 7,
    name: "Heart&Fire",
    category: "Tematic",
    price: 100000,
    rating: 9.5,
    image: "/images/siga7.jpeg",
    description: "Cinta dan Semangat yang luar biasa, yang selalu studio tiga berikan untuk para loyalis",
  },
]

export default function ProductsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sigamerch Products</h1>
          <p className="text-muted-foreground">Browse our Dark collection from culture concepts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group h-full flex flex-col">
            <CardHeader className="p-0">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <div className="font-bold mb-2">Rp{product.price.toLocaleString("id-ID")}</div>
              {product.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href="https://shopee.co.id/">View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
