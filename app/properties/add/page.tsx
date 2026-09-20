
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Loader2, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AddPropertyPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [uploadingImage, setUploadingImage] = useState(false)

  // State untuk Select
  const [category, setCategory] = useState("")
  const [priceType, setPriceType] = useState("")

  const router = useRouter()
  const { toast } = useToast()

  // =========================================================
  // SUBMIT PROPERTY
  // =========================================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Ambil semua data dari form
      const title = String(formData.get("title") || "")
      const description = String(formData.get("description") || "")
      const area = String(formData.get("area") || "")
      const location = String(formData.get("location") || "")
      const address = String(formData.get("address") || "")
      const price = Number(formData.get("price") || 0)

      const contactName = String(formData.get("contactName") || "")
      const contactPhone = String(formData.get("contactPhone") || "")
      const contactEmail = String(formData.get("contactEmail") || "")
      const contactHours = String(formData.get("contactHours") || "")

      // Validasi category
      if (!category) {
        toast({
          title: "Category required",
          description: "Please select a rental category.",
          variant: "destructive",
        })

        setIsLoading(false)
        return
      }

      // Validasi rental duration
      if (!priceType) {
        toast({
          title: "Rental duration required",
          description: "Please select a rental duration.",
          variant: "destructive",
        })

        setIsLoading(false)
        return
      }

      // =====================================================
      // BUAT PROPERTY BARU
      // =====================================================
      const newProperty = {
        id: Date.now(),

        slug:
          title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-") || `rental-${Date.now()}`,

        title,
        description,

        category,

        area,

        location,
        address,

        price,
        priceType,

        type: "Rent",

        images:
          images.length > 0
            ? images
            : ["/placeholder.svg?height=300&width=500"],

        contact: {
          name: contactName,
          phone: contactPhone,
          email: contactEmail,
          hours: contactHours,
        },

        featured: false,

        createdAt: new Date().toISOString(),
      }

      // =====================================================
      // AMBIL DATA PROPERTY YANG SUDAH ADA
      // =====================================================
      const existingProperties = JSON.parse(
        localStorage.getItem("rentalProperties") || "[]"
      )

      // Pastikan existingProperties berupa array
      const properties = Array.isArray(existingProperties)
        ? existingProperties
        : []

      // =====================================================
      // TAMBAHKAN PROPERTY BARU
      // =====================================================
      const updatedProperties = [...properties, newProperty]

      // =====================================================
      // SIMPAN KE LOCAL STORAGE
      // =====================================================
      localStorage.setItem(
        "rentalProperties",
        JSON.stringify(updatedProperties)
      )

      // =====================================================
      // NOTIFICATION
      // =====================================================
      toast({
        title: "Rental item listed successfully!",
        description: `${title} has been added to your properties.`,
      })

      // =====================================================
      // PINDAH KE /properties
      // =====================================================
      router.push("/properties")
    } catch (error) {
      console.error("Error adding rental property:", error)

      toast({
        title: "Error",
        description:
          "There was a problem adding your item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================
  const handleImageUpload = async () => {
    setUploadingImage(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setImages((prev) => [
        ...prev,
        "/placeholder.svg?height=300&width=500",
      ])

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      })
    } catch (error) {
      console.error("Image upload error:", error)

      toast({
        title: "Upload failed",
        description:
          "There was a problem uploading your image.",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  // =========================================================
  // REMOVE IMAGE
  // =========================================================
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, imageIndex) => imageIndex !== index))
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Add Rental Property
          </h1>

          <p className="text-muted-foreground">
            Fill out the form below to list your equipment or property for rent.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">

            {/* ================================================= */}
            {/* PROPERTY DETAILS */}
            {/* ================================================= */}
            <Card>
              <CardHeader>
                <CardTitle>Rental Details</CardTitle>

                <CardDescription>
                  Provide basic information about your rental item
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                {/* RENTAL TITLE */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Rental Title
                  </Label>

                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Guitar, Bass, Keyboard"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description
                  </Label>

                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your rental item (size, material, specs, etc.)"
                    rows={5}
                    required
                  />
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Category
                  </Label>

                  <Select
                    value={category}
                    onValueChange={setCategory}
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Guitar">
                        Guitar
                      </SelectItem>

                      <SelectItem value="Bass">
                        Bass
                      </SelectItem>

                      <SelectItem value="Keyboard">
                        Keyboard
                      </SelectItem>

                      <SelectItem value="Drum Set">
                        Drum Set
                      </SelectItem>

                      <SelectItem value="Amplifier for Event">
                        Amplifier for Event
                      </SelectItem>

                      <SelectItem value="Effect">
                        Effect
                      </SelectItem>

                      <SelectItem value="Fullset">
                        Fullset
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* SIZE / DIMENSION */}
                <div className="space-y-2">
                  <Label htmlFor="area">
                    Size / Dimension (optional)
                  </Label>

                  <Input
                    id="area"
                    name="area"
                    type="text"
                    placeholder="e.g., 10m x 6m"
                  />
                </div>

              </CardContent>
            </Card>

            {/* ================================================= */}
            {/* LOCATION & PRICE */}
            {/* ================================================= */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Location & Price
                </CardTitle>

                <CardDescription>
                  Provide rental pricing and location details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                {/* LOCATION */}
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location
                  </Label>

                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Studio 3 Banyuwangi"
                    required
                  />
                </div>

                {/* ADDRESS */}
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Full Address
                  </Label>

                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter complete address..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* PRICE */}
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Rental Price (Rp)
                    </Label>

                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="e.g., 450000"
                      required
                    />
                  </div>

                  {/* RENTAL DURATION */}
                  <div className="space-y-2">
                    <Label htmlFor="price-type">
                      Rental Duration
                    </Label>

                    <Select
                      value={priceType}
                      onValueChange={setPriceType}
                      required
                    >
                      <SelectTrigger id="price-type">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="day">
                          Per Day
                        </SelectItem>

                        <SelectItem value="event">
                          Per Event
                        </SelectItem>

                        <SelectItem value="week">
                          Per Week
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* ================================================= */}
            {/* IMAGES */}
            {/* ================================================= */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Images
                </CardTitle>

                <CardDescription>
                  Upload images of your rental item (up to 10 images)
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  {/* EXISTING IMAGES */}
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden border"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                        type="button"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {/* ADD IMAGE */}
                  {images.length < 10 && (
                    <Button
                      variant="outline"
                      className="aspect-square flex flex-col items-center justify-center border-dashed"
                      onClick={handleImageUpload}
                      disabled={uploadingImage}
                      type="button"
                    >
                      {uploadingImage ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <>
                          <Camera className="h-6 w-6 mb-1" />

                          <span className="text-xs">
                            Add Image
                          </span>
                        </>
                      )}
                    </Button>
                  )}

                </div>
              </CardContent>
            </Card>

            {/* ================================================= */}
            {/* CONTACT */}
            {/* ================================================= */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Contact Information
                </CardTitle>

                <CardDescription>
                  Provide your contact details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* CONTACT NAME */}
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">
                      Contact Name
                    </Label>

                    <Input
                      id="contact-name"
                      name="contactName"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  {/* PHONE */}
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">
                      Phone Number
                    </Label>

                    <Input
                      id="contact-phone"
                      name="contactPhone"
                      placeholder="Your phone number"
                      required
                    />
                  </div>

                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="contact-email">
                    Email
                  </Label>

                  <Input
                    id="contact-email"
                    name="contactEmail"
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                </div>

                {/* CONTACT HOURS */}
                <div className="space-y-2">
                  <Label htmlFor="contact-hours">
                    Preferred Contact Hours
                  </Label>

                  <Input
                    id="contact-hours"
                    name="contactHours"
                    placeholder="e.g., 9 AM – 6 PM"
                  />
                </div>

              </CardContent>
            </Card>

            {/* ================================================= */}
            {/* BUTTONS */}
            {/* ================================================= */}
            <div className="flex justify-end gap-4">

              {/* CANCEL */}
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    List Rental Item
                  </>
                )}
              </Button>

            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
```
