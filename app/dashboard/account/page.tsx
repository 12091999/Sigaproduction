"use client"

// import { signOut } from "next-auth/react" // ✅ gunakan ini kalau kamu pakai next-auth
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export default function AccountPage() {
  const router = useRouter()

  const user = {
    name: "Muhammad Fajar Kurniawan",
    email: "fajar@example.com",
    role: "Admin",
    avatar: "/images/avatar.jpg",
  }

  // ✅ Logout handler — pilih salah satu versi sesuai kebutuhan
  const handleLogout = () => {
    // --- Versi 1: jika pakai next-auth ---
    // signOut({ callbackUrl: "/login" })

    // --- Versi 2: jika belum pakai auth (manual logout) ---
    localStorage.removeItem("user") // hapus data user dari localStorage
    router.push("/signup") // arahkan ke halaman login
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Account</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="rounded-full object-cover border"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">Role: {user.role}</p>
          </div>

          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Change Password</span>
            <Button variant="secondary">Update</Button>
          </div>
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
