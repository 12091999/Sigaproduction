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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for ${searchQuery} in ${searchCategory}`)
  }

  const handleSelect = (value: string) => {
    setSearchCategory(value)
    // Redirect berdasarkan nilai yang dipilih
    switch (value) {
      case "Studio 3 Music Studio":
        router.push("/services/studiomusic")
        break
      case "sigaproEO":
        router.push("/services/sigaproEO")
        break
      case "Sigamerch":
        router.push("/services/merch")
        break
      case "Sigma Bwx":
        router.push("/services/SIGMA")
        break
      case "Area Tiga":
        router.push("/services/areatiga")
        break
      default:
        router.push("/")
    }
  }

  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] overflow-hidden">
      {/* Background animasi gradasi halus */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-[length:400%_400%]"></div>

      {/* Konten utama */}
      <div className="relative z-10 py-16 md:py-24 lg:py-32 text-center text-white">
        <div className="container mx-auto px-3 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Image
              src="/images/SIGMA.jpg"
              alt="Sigma Bwx Logo"
              width={160}
              height={160}
              className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full border-4 border-white/20 shadow-lg object-cover"
              priority
            />
          </div>

          {/* Judul */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 drop-shadow-lg">
            Welcome to Sigma Bwx
          </h1>

          {/* Deskripsi */}
          <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-8 px-4">
            Your one-stop destination for local products, EO, Movie Art, and Music Studio
          </p>

          {/* Form pencarian */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto px-2"
          >
            <Select defaultValue="all" onValueChange={handleSelect}>
              <SelectTrigger className="w-full sm:w-[180px] bg-black/30 border-white/30 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Studio 3 Music Studio">Studio 3 Music Studio</SelectItem>
                <SelectItem value="sigaproEO">Sigapro EO</SelectItem>
                <SelectItem value="Sigamerch">Sigamerch</SelectItem>
                <SelectItem value="Sigma Bwx">Sigma Bwx</SelectItem>
                <SelectItem value="Area Tiga">Area Tiga</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for products, services, or offers in Sigma..."
                className="w-full pl-10 bg-white text-black rounded-md"
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

          {/* Tombol aksi */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 px-2">
            <Button
              asChild
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Link href="/products">Shop Sigamerch Products</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Link href="/services/taxi">Book a Sigaproduction</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Link href="/services/accommodations">Find Your Offer</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Animasi gradasi bergerak */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradientMove 15s ease infinite;
        }
      `}</style>
    </section>
  )
}
