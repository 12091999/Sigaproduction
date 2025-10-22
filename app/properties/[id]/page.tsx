"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Send,
  Share2,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

// Sample property data
const property = {
  id: 1,
  title: "Modern Villa with Mountain View",
  description:
    "This beautiful modern villa offers stunning views of the Nilgiri mountains. The property features spacious rooms, a well-maintained garden, and modern amenities. Perfect for families looking for a peaceful retreat in the hills.\n\nThe villa includes a fully equipped kitchen, high-speed internet, and a cozy fireplace for the winter months. The large windows throughout the house provide ample natural light and panoramic views of the surrounding landscape.",
  location: "Coonoor, The Nilgiris",
  address: "123 Mountain View Road, Coonoor, The Nilgiris - 643001",
  price: 45000,
  priceType: "month",
  type: "Rent",
  propertyType: "Villa",
  features: [

  ],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  contact: {
    name: "John Doe",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
    hours: "9 AM to 6 PM",
  },
  listedOn: "May 10, 2023",
  featured: true,
}

// Sample comments
const initialComments = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
    },
    text: "Is this property pet-friendly? I have a small dog.",
    date: "May 15, 2023",
    time: "10:30 AM",
    replies: [
      {
        id: 101,
        user: {
          name: "John Doe",
          avatar: "/placeholder.svg",
          isOwner: true,
        },
        text: "Yes, small pets are allowed. There's also a nice garden area for them to play.",
        date: "May 15, 2023",
        time: "11:45 AM",
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg",
    },
    text: "What's the distance to the nearest market and hospital?",
    date: "May 16, 2023",
    time: "3:15 PM",
    replies: [
      {
        id: 102,
        user: {
          name: "John Doe",
          avatar: "/placeholder.svg",
          isOwner: true,
        },
        text: "The nearest market is about 1 km away, and there's a hospital within 3 km from the property.",
        date: "May 16, 2023",
        time: "4:20 PM",
      },
    ],
  },
]

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({})
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newCommentObj = {
      id: comments.length + 1,
      user: {
        name: "You",
        avatar: "/placeholder.svg",
        isOwner: false,
      },
      text: newComment,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
      replies: [],
    }

    setComments([...comments, newCommentObj])
    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    })
  }

  const handleReply = (commentId: number) => {
    if (!replyText[commentId]?.trim()) return

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              user: {
                name: "You",
                avatar: "/placeholder.svg",
                isOwner: false,
              },
              text: replyText[commentId],
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
            },
          ],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyText({ ...replyText, [commentId]: "" })
    setReplyingTo(null)

    toast({
      title: "Reply added",
      description: "Your reply has been posted successfully.",
    })
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Properties
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={`Property image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            <Badge
              className={`absolute top-4 right-4 ${
                property.type === "Rent" ? "bg-blue-600" : "bg-emerald-600"
              } text-sm`}
            >
              For {property.type}
            </Badge>
            {property.featured && <Badge className="absolute top-4 left-4 bg-amber-600 text-sm">Featured</Badge>}

            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div className="text-muted-foreground whitespace-pre-line">{property.description}</div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <p className="text-muted-foreground mb-4">{property.address}</p>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <MapPin className="h-8 w-8 text-muted-foreground mr-2" />
              <span className="text-muted-foreground">Map view would be displayed here</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Comments & Questions</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{comment.user.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {comment.date}
                          <Clock className="h-3 w-3 ml-2 mr-1" />
                          {comment.time}
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-1">{comment.text}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs mt-1 h-7 px-2"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>

                  {comment.replies.length > 0 && (
                    <div className="ml-12 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                            <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <div className="font-medium">{reply.user.name}</div>
                              {reply.user.isOwner && <Badge className="ml-2 bg-blue-600 text-xs">Owner</Badge>}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {reply.date}
                              <Clock className="h-3 w-3 ml-2 mr-1" />
                              {reply.time}
                            </div>
                            <p className="text-muted-foreground mt-1">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {replyingTo === comment.id && (
                    <div className="ml-12 flex gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="You" />
                        <AvatarFallback>Y</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyText[comment.id] || ""}
                          onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                          className="mb-2"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyText({ ...replyText, [comment.id]: "" })
                            }}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => handleReply(comment.id)}>
                            <Send className="h-3 w-3 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Separator />

              <div className="pt-4">
                <h3 className="font-medium mb-3">Add a Comment or Question</h3>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write your comment or question..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleAddComment}>
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-2xl font-bold">₹{property.price.toLocaleString("en-IN")}</span>
                {property.priceType === "month" ? <span className="text-base font-normal">/month</span> : null}
              </CardTitle>
              <CardDescription>
                {property.propertyType} for {property.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Contact Owner</Button>
              <Button variant="outline" className="w-full">
                Schedule Viewing
              </Button>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Contact Information</h3>
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{property.contact.name}</div>
                    <div className="text-sm text-muted-foreground">Property Owner</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Link href={`tel:${property.contact.phone}`} className="hover:underline">
                    {property.contact.phone}
                  </Link>
                </div>
                <div className="text-sm text-muted-foreground">Preferred contact hours: {property.contact.hours}</div>
              </div>

              <Separator />

              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="h-4 w-4" />
                  Listed on {property.listedOn}
                </div>
                <div>Property ID: #{property.id}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image src="/placeholder.svg" alt="Similar property" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1">
                        {item === 1
                          ? "Cozy Cottage near Tea Gardens"
                          : item === 2
                            ? "Luxury Apartment in City Center"
                            : "Studio Apartment near Market"}
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        {item === 1 ? "Kotagiri" : item === 2 ? "Ooty" : "Coonoor"}, The Nilgiris
                      </div>
                      <div className="font-medium text-sm">
                        ₹{(item === 1 ? 35000 : item === 2 ? 40000 : 18000).toLocaleString("en-IN")}
                        /month
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/properties">View More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
