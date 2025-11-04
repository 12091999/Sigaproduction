"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HeroSection() {
  const router = useRouter()
  const [searchCategory, setSearchCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryChange = (value: string) => {
    setSearchCategory(value)

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for ${searchQuery} in ${searchCategory}`)
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* 🌈 Background animasi gradasi penuh layar */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-[length:400%_400%]"></div>

      {/* 🧭 Konten Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-20 md:py-28 lg:py-36 px-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/studio3.jpg"
            alt="Studio 3 Logo"
            width={180}
            height={180}
            className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full border-4 border-white/20 shadow-lg object-cover"
            priority
          />
        </div>

        {/* Judul */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-md">
          Welcome to Studio Tiga Music
        </h1>

        {/* Deskripsi */}
        <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-8 px-4">
          Your one-stop destination for local musicians, artists, and creative services
        </p>

        {/* 🔍 Form Pencarian */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mx-auto px-2"
        >
          <Select defaultValue="all" onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-black/30 border-white/30 text-white">
              <SelectValue placeholder="Category" />
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
              placeholder="Search for Studio and choose the feel..."
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

        {/* Tombol bawah */}
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

      {/* ✨ Style animasi background */}
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
