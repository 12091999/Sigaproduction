"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Phone, Send, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

// 🎸 Contoh data alat musik untuk disewakan
const instrument = {
  id: 1,
  title: "Electric Guitar",
  description:
    "Sewa gitar listrik. Cocok untuk latihan studio, event, atau konser kecil.\n\nDilengkapi dengan suara jernih, body solid, dan tone profesional. Bisa disewa harian atau mingguan sesuai kebutuhan.",
  location: "Banyuwangi, Jawa Timur",
  address: "Jl. Wijaya Kusuma No.21, Banyuwangi, Jawa Timur",
  price: 150000,
  priceType: "day",
  type: "Rent",
  category: "Gitar Elektrik",
  features: [
    "Termasuk ampli & kabel",
    "Stand gitar gratis",
    "Perawatan rutin",
    "Tersedia pengantaran area kota",
  ],
  images: [
    "/images/gitar1.jpg",
    "/images/gitar2.jpg",
    "/images/gitar3.jpg",
  ],
  contact: {
    name: "Studio 3 Music Team",
    phone: "+62 812 3456 7890",
    email: "studio3music@gmail.com",
    hours: "09.00 - 21.00 WIB",
  },
  listedOn: "Oktober 20, 2025",
  featured: true,
}

// 💬 Komentar sample
const initialComments = [
  {
    id: 1,
    user: { name: "Rian Setiawan", avatar: "/placeholder.svg" },
    text: "Apakah bisa sewa untuk acara 3 hari sekaligus?",
    date: "Okt 21, 2025",
    time: "10:30 AM",
    replies: [
      {
        id: 101,
        user: { name: "Studio 3 Music", avatar: "/placeholder.svg", isOwner: true },
        text: "Bisa banget! Kami juga bisa antar ke lokasi event jika diperlukan.",
        date: "Okt 21, 2025",
        time: "11:00 AM",
      },
    ],
  },
]

export default function RentInstrumentPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({})
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const nextImage = () => setCurrentImageIndex((prev) => (prev === instrument.images.length - 1 ? 0 : prev + 1))
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? instrument.images.length - 1 : prev - 1))

  const handleAddComment = () => {
    if (!newComment.trim()) return
    const newCommentObj = {
      id: comments.length + 1,
      user: { name: "You", avatar: "/placeholder.svg", isOwner: false },
      text: newComment,
      date: new Date().toLocaleDateString("id-ID"),
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      replies: [],
    }
    setComments([...comments, newCommentObj])
    setNewComment("")
    toast({ title: "Komentar ditambahkan", description: "Komentar kamu berhasil dikirim." })
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
              user: { name: "You", avatar: "/placeholder.svg", isOwner: false },
              text: replyText[commentId],
              date: new Date().toLocaleDateString("id-ID"),
              time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        }
      }
      return comment
    })
    setComments(updatedComments)
    setReplyText({ ...replyText, [commentId]: "" })
    setReplyingTo(null)
    toast({ title: "Balasan ditambahkan", description: "Balasan kamu berhasil dikirim." })
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Kembali ke Daftar Alat
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DETAIL UTAMA */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{instrument.title}</h1>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {instrument.location}
            </div>
          </div>

          {/* IMAGE SLIDER */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={instrument.images[currentImageIndex] || "/placeholder.svg"}
              alt={`Instrument image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-blue-600 text-sm">For Rent</Badge>
            {instrument.featured && (
              <Badge className="absolute top-4 left-4 bg-amber-600 text-sm">Featured</Badge>
            )}

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
          </div>

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Deskripsi</h2>
            <p className="text-muted-foreground whitespace-pre-line">{instrument.description}</p>
          </div>

          {/* FEATURES */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Fitur</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {instrument.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COMMENTS */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Komentar & Pertanyaan</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{comment.user.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> {comment.date}
                          <Clock className="h-3 w-3 ml-2 mr-1" /> {comment.time}
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-1">{comment.text}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs mt-1 h-7 px-2"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      >
                        Balas
                      </Button>
                    </div>
                  </div>

                  {comment.replies.length > 0 && (
                    <div className="ml-12 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                            <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <div className="font-medium">{reply.user.name}</div>
                              {reply.user.isOwner && <Badge className="ml-2 bg-blue-600 text-xs">Owner</Badge>}
                            </div>
                            <p className="text-muted-foreground mt-1">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Separator />

              {/* ADD COMMENT */}
              <div className="pt-4">
                <h3 className="font-medium mb-3">Tambah Komentar</h3>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Tulis komentar atau pertanyaan..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleAddComment}>
                        <Send className="h-4 w-4 mr-2" /> Kirim
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="text-2xl font-bold">Rp {instrument.price.toLocaleString("id-ID")}</span>
                <span className="text-base font-normal"> /{instrument.priceType}</span>
              </CardTitle>
              <CardDescription>{instrument.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Hubungi Penyewa</Button>
              <Button variant="outline" className="w-full">Jadwalkan Pengambilan</Button>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Kontak</h3>
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{instrument.contact.name}</div>
                    <div className="text-sm text-muted-foreground">Studio 3 Music</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Link href={`tel:${instrument.contact.phone}`} className="hover:underline">
                    {instrument.contact.phone}
                  </Link>
                </div>
                <div className="text-sm text-muted-foreground">
                  Jam operasional: {instrument.contact.hours}
                </div>
              </div>

              <Separator />

              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="h-4 w-4" />
                  Didaftarkan pada {instrument.listedOn}
                </div>
                <div>ID Alat: #{instrument.id}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
