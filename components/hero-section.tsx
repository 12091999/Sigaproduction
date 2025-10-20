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
      case "EO":
        router.push("services/sigaproEO")
        break
      case "Sigamerch":
        router.push("services/merch")
        break
      case "Sigma Bwx":
        router.push("services/SIGMA")
        break
      case "Area Tiga":
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
    <section className="relative">
      <div className="bg-[url('/images/photo-collage.png')] bg-cover bg-center py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-3 md:px-4 text-center">
          <div className="flex justify-center mb-4 md:mb-6">
            <Image
              src="images/SP.jpg"
              alt="sigaproeo Logo"
              width={160}
              height={160}
              className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full border-4 border-white/20 shadow-lg"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-red-600 mb-3 md:mb-6">
            Welcome to
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-red-600 mb-3 md:mb-6">
            CV.SIGA PRODUCTION
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-2 text-outline-red">
            Explore us. Enjoy the Best of What We Do.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto px-2">
            <Select defaultValue="all" onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[180px] bg-black">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Studio 3 Music Studio">Studio 3 Music Studio</SelectItem>
                <SelectItem value="EO">Sigapro EO</SelectItem>
                <SelectItem value="Sigamerch">Sigamerch</SelectItem>
                <SelectItem value="Sigma Bwx">Sigma Bwx</SelectItem>
                <SelectItem value="Area Tiga">Area Tiga</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for products, services, or offer in Sigma..."
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
            <Button asChild variant="outline" className="bg-white/10 text-white border-blue-500 hover:bg-white/20">
              <Link href="/products">Shop Sigamerch Products</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 text-white border-blue-500 hover:bg-white/20">
              <Link href="/services/taxi">Book a Sigaproduction</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 text-white border-blue-500 hover:bg-white/20">
              <Link href="/services/accommodations">Find Youre Offer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
