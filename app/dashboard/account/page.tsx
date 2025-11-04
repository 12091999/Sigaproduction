"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context" // ✅ pakai context yang benar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { useEffect } from "react"

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // ✅ Gunakan useEffect agar router.push() tidak dipanggil saat render
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Jika belum login, jangan render apa pun dulu
  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Account</h1>

      {/* Profile Information */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <Image
              src="/images/avatar.jpg"
              alt={user.name || "User Avatar"}
              fill
              className="rounded-full object-cover border"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Logout</span>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
