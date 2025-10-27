import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// === Data Produk ===
const featuredProducts = [
  {
    slug: "PerniciousHumaniora",
    name: "Pernicious Humaniora",
    category: "Product",
    price: 150000,
    rating: 4.8,
    image: "/images/siga1.jpeg",
    badge: "Popular",
    description:
      "Kerusakan atau bahaya bagi kesehatan mental manusia atau penderita psikologis manusia.",
  },
  {
    slug: "Agorophobia",
    name: "Agorophobia",
    category: "Product",
    price: 150000,
    rating: 4.9,
    image: "/images/siga2.jpg",
    badge: "Best Seller",
    description:
      "Ketakutan yang sangat kuat saat berada di tempat terbuka atau dalam situasi yang mungkin sulit untuk melarikan diri.",
  },
  {
    slug: "Gandrung",
    name: "Gandrung",
    category: "Product",
    price: 150000,
    rating: 4.7,
    image: "/images/siga3.jpeg",
    badge: null,
    description:
      "‘Gandrung’ diartikan sebagai terpesonanya masyarakat Blambangan yang agraris kepada Dewi Sri sebagai Dewi Padi.",
  },
  {
    slug: "Seblang",
    name: "Seblang",
    category: "Product",
    price: 150000,
    rating: 4.6,
    image: "/images/siga4.jpeg",
    badge: "Reliable",
    description:
      "Ritual Seblang adalah upacara masyarakat Osing yang hanya dapat dijumpai di dua desa wilayah Glagah Banyuwangi.",
  },
]

// === Generate halaman dinamis ===
export async function generateStaticParams() {
  return featuredProducts.map((product) => ({
    slug: product.slug,
  }))
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = featuredProducts.find((p) => p.slug === params.slug)
  if (!product) return notFound()

  // Ambil produk lain selain yang sedang dilihat
  const related = featuredProducts.filter((p) => p.slug !== params.slug).slice(0, 3)

  return (
    <div className="container py-8">
      {/* Detail Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
            {product.badge && <Badge className="bg-emerald-600">{product.badge}</Badge>}
          </div>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <div className="text-2xl font-semibold mb-4">Rp{product.price.toLocaleString("id-ID")}</div>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Tambahkan ke Keranjang
          </Button>
        </div>
      </div>

      {/* Produk Terkait */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Produk Terkait</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <Card key={p.slug} className="overflow-hidden group">
              <div className="relative h-48 w-full">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {p.badge && <Badge className="absolute top-2 right-2 bg-emerald-600 text-xs">{p.badge}</Badge>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                <div className="text-sm text-muted-foreground mb-2">{p.category}</div>
                <div className="font-bold text-base mb-2">Rp{p.price.toLocaleString("id-ID")}</div>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/products/${p.slug}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
