"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HeroSection() {
  const [searchCategory, setSearchCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Redirect saat memilih kategori
  const handleCategoryChange = (value: string) => {
    setSearchCategory(value)

    switch (value) {
      case "Studio 3 Music Studio":
        router.push("services/studiomusic")
        break
      case "sigaproEO":
        router.push("services/sigaproEO")
        break
      case "Sigamerch":
        router.push("services/merch")
        break
      case "Sigma Bwx":
        router.push("services/SIGMA")
        break
      case "Areatiga":
        router.push("services/areatiga")
        break
      default:
        router.push("/")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for ${searchQuery} in ${searchCategory}`)
  }

  return (
    // 💡 Bagian ini diperluas agar background-nya full width tanpa kotak
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] overflow-hidden">
      <div
        className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 lg:py-32"
        style={{
          backgroundImage: "url('/images/photo-collage.png')",
        }}
      >
        {/* Lapisan overlay agar teks lebih jelas */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Konten utama */}
        <div className="relative container mx-auto px-3 md:px-4 text-center text-white">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Image
              src="/images/SP.jpg"
              alt="sigaproeo Logo"
              width={160}
              height={160}
              className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full border-4 border-white/30 shadow-lg object-cover"
              priority
            />
          </div>

          {/* Judul */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-500 mb-2 drop-shadow-lg">
            Welcome to
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-500 mb-6 drop-shadow-lg">
            CV. SIGA PRODUCTION
          </h1>

          {/* Deskripsi */}
          <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-8 px-4">
            Explore us. Enjoy the Best of What We Do.
          </p>

          {/* Form pencarian */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto px-2"
          >
            <Select defaultValue="all" onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[180px] bg-black text-white border-white/30">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Studio 3 Music Studio">Studio 3 Music Studio</SelectItem>
                <SelectItem value="sigaproEO">Sigapro EO</SelectItem>
                <SelectItem value="Sigamerch">Sigamerch</SelectItem>
                <SelectItem value="Sigma Bwx">Sigma Bwx</SelectItem>
                <SelectItem value="Areatiga">Area Tiga</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for products, services, or offer in Sigma..."
                className="w-full pl-10 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>

            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
            >
              Search
            </Button>
          </form>

          {/* Tombol navigasi */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 px-2">
            <Button asChild variant="outline" className="bg-white/10 text-white border-blue-500 hover:border-blue-400 hover:bg-white/20">
              <Link href="/products">Shop Sigamerch Products</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 text-white border-blue-500 hover:border-blue-400 hover:bg-white/20">
              <Link href="/services/taxi">Book a Sigaproduction</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 text-white border-blue-500 hover:border-blue-400 hover:bg-white/20">
              <Link href="/services/accommodations">Find Your Offer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
