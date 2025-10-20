"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" // ✅ Tambahan
import Link from "next/link"
import { Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HeroSection() {
  const router = useRouter() // ✅ untuk redirect halaman
  const [searchCategory, setSearchCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryChange = (value: string) => {
    setSearchCategory(value)

    // ✅ Redirect sesuai value
    switch (value) {
      case "Sigamerch Products":
        router.push("/merch")
        break
      case "Sigapro EO":
        router.push("services/sigaproEO")
        break
      case "SIGMA Bwx":
        router.push("services/SIGMA")
        break
      case "Studio Music":
        router.push("services/studio-music")
        break
      case "Area Tiga":
        router.push("services/areatiga")
        break
      default:
        break
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for ${searchQuery} in ${searchCategory}`)
  }

  return (
    <section className="relative">
      <div className="bg-gradient-to-r from-red-600 to-blue-600 py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-3 md:px-4 text-center">
          <div className="flex justify-center mb-4 md:mb-6">
            <Image
              src="/images/studio3.jpg"
              alt="studio3 Logo"
              width={160}
              height={160}
              className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full border-4 border-white/20 shadow-lg"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-6">
            Welcome to Studio Tiga Music
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
            Your one-stop destination for local musicians, artists, and creative services
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto px-2">
            <Select defaultValue="all" onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[180px] bg-black">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Sigamerch Products">Sigamerch Products</SelectItem>
                <SelectItem value="Siga Service">Siga Services</SelectItem>
                <SelectItem value="Movie Art">Movie Art</SelectItem>
                <SelectItem value="Studio Music">Studio Music</SelectItem>
                <SelectItem value="EO">EO</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for Studio and choose the feel..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8 px-2">
            <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link href="/products">Shop Sigamerch Products</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link href="/services/taxi">Book a Sigaproduction</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link href="/services/accommodations">Find Youre Offer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
