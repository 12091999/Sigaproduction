"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Loader2, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AddPropertyPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [uploadingImage, setUploadingImage] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Rental item listed successfully!",
        description: "Your rental property has been added.",
      })
      router.push("/properties")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem adding your item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async () => {
    setUploadingImage(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setImages([...images, "/placeholder.svg?height=300&width=500"])
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image.",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Add Rental Property</h1>
          <p className="text-muted-foreground">
            Fill out the form below to list your equipment or property for rent.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* PROPERTY DETAILS */}
            <Card>
              <CardHeader>
                <CardTitle>Rental Details</CardTitle>
                <CardDescription>Provide basic information about your rental item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Rental Title</Label>
                  <Input id="title" placeholder="e.g., Stage 8x10m" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your rental item (size, material, specs, etc.)"
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Category</Label>
                  <Select required>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stage">Stage</SelectItem>
                      <SelectItem value="Gate">Gate</SelectItem>
                      <SelectItem value="Barricade">Barricade</SelectItem>
                      <SelectItem value="Sound System">Sound System</SelectItem>
                      <SelectItem value="Commercial Stage">Commercial Stage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Size / Dimension (optional)</Label>
                  <Input id="area" type="text" placeholder="e.g., 10m x 6m" />
                </div>
              </CardContent>
            </Card>

            {/* LOCATION & PRICE */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Price</CardTitle>
                <CardDescription>Provide rental pricing and location details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Warehouse or Venue" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea id="address" placeholder="Enter complete address..." rows={3} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Rental Price (Rp)</Label>
                    <Input id="price" type="number" placeholder="e.g., 1000000" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price-type">Rental Duration</Label>
                    <Select required>
                      <SelectTrigger id="price-type">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Per Day</SelectItem>
                        <SelectItem value="event">Per Event</SelectItem>
                        <SelectItem value="week">Per Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IMAGES */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Upload images of your rental item (up to 10 images)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
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
                          <span className="text-xs">Add Image</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* CONTACT */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Provide your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input id="contact-name" placeholder="Your name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input id="contact-phone" placeholder="Your phone number" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="Your email address" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-hours">Preferred Contact Hours</Label>
                  <Input id="contact-hours" placeholder="e.g., 9 AM – 6 PM" />
                </div>
              </CardContent>
            </Card>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
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
