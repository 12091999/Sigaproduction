"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Data produk (bisa diganti dari database atau API nanti)
const products = [
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
    shopee: "https://shopee.co.id/product/1234567890", // link Shopee
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
      "Ketakutan yang sangat kuat saat berada di tempat terbuka atau dalam situasi yang sulit untuk melarikan diri.",
    shopee: "https://shopee.co.id/product/0987654321",
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
      "‘Gandrung’ diartikan sebagai terpesonanya masyarakat Blambangan kepada Dewi Sri, Dewi Padi.",
    shopee: "https://shopee.co.id/product/1122334455",
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
      "Ritual Seblang adalah upacara adat masyarakat Osing di dua desa di Kecamatan Glagah, Banyuwangi.",
    shopee: "https://shopee.co.id/product/6677889900",
  },
]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
        <p className="text-muted-foreground mt-2">Silakan kembali ke halaman utama.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Kembali</Link>
        </Button>
      </div>
    )
  }

  // Rekomendasi produk selain produk yang sedang dilihat
  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <div className="container py-8">
      {/* --- Detail Produk --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating} / 5.0</span>
          </div>
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <div className="text-2xl font-bold mb-4">
            Rp{product.price.toLocaleString("id-ID")}
          </div>

          {/* Tombol ke Shopee */}
          <Button
            asChild
            className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto h-11 px-6 text-sm font-semibold"
          >
            <a
              href={product.shopee}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tambahkan ke Keranjang di Shopee 🛒
            </a>
          </Button>
        </div>
      </div>

      {/* --- Produk Terkait --- */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Rekomendasi Produk Terkait</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((item) => (
            <Card key={item.slug} className="overflow-hidden group h-full flex flex-col">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {item.description}
                </p>
                <div className="font-bold text-base">
                  Rp{item.price.toLocaleString("id-ID")}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="outline" className="w-full text-sm">
                  <Link href={`/products/${item.slug}`}>Lihat Detail</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
