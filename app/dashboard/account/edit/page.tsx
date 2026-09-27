"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"

export default function EditProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    setName(user.name || "")
    setEmail(user.email || "")
  }, [user, router])

  if (!user) return null

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // TODO:
      // Tambahkan proses menyimpan data ke database/API
      // jika auth-context kamu sudah menggunakan backend.

      console.log({
        name,
        email,
      })

      alert("Profile berhasil diperbarui")

      router.push("/account")
    } catch (error) {
      console.error("Gagal memperbarui profile:", error)
      alert("Gagal memperbarui profile")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/account")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-500">
            Perbarui informasi profile akun kamu
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/account")}
              disabled={isSaving}
            >
              Batal
            </Button>

            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />

              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```
