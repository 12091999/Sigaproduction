"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/contexts/auth-context"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  ArrowLeft,
  Save,
} from "lucide-react"

export default function EditProfilePage() {
  const {
    user,
    updateProfile,
    isLoading,
  } = useAuth()

  const router = useRouter()

  // =========================================================
  // FORM STATE
  // =========================================================

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [isSaving, setIsSaving] =
    useState(false)

  // =========================================================
  // CHECK LOGIN + LOAD USER DATA
  // =========================================================

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setPhone(user.phone || "")
    }
  }, [user, isLoading, router])

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
          Loading...
        </p>
      </div>
    )
  }

  // =========================================================
  // USER NOT LOGIN
  // =========================================================

  if (!user) {
    return null
  }

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSave = () => {
    // Basic validation

    if (!name.trim()) {
      alert("Nama tidak boleh kosong")
      return
    }

    if (!email.trim()) {
      alert("Email tidak boleh kosong")
      return
    }

    setIsSaving(true)

    try {
      updateProfile(
        name,
        email,
        phone
      )

      alert(
        "Profile berhasil diperbarui"
      )

      router.push(
        "/dashboard/account"
      )
    } catch (error) {
      console.error(
        "Gagal memperbarui profile:",
        error
      )

      alert(
        "Gagal memperbarui profile"
      )
    } finally {
      setIsSaving(false)
    }
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="p-6 space-y-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-center gap-3">

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            router.push(
              "/dashboard/account"
            )
          }
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-3xl font-bold">
            Edit Profile
          </h1>

          <p className="text-gray-500">
            Perbarui informasi profile akun kamu
          </p>
        </div>

      </div>

      {/* =====================================================
          PROFILE FORM
      ====================================================== */}

      <Card className="max-w-2xl">

        <CardHeader>
          <CardTitle>
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* NAME */}

          <div className="space-y-2">
            <Label htmlFor="name">
              Nama
            </Label>

            <Input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Masukkan nama"
              disabled={isSaving}
            />
          </div>

          {/* EMAIL */}

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Masukkan email"
              disabled={isSaving}
            />
          </div>

          {/* PHONE */}

          <div className="space-y-2">
            <Label htmlFor="phone">
              Nomor Telepon
            </Label>

            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="Masukkan nomor telepon"
              disabled={isSaving}
            />
          </div>

          {/* =================================================
              BUTTONS
          ================================================== */}

          <div className="flex justify-end gap-3 pt-4">

            {/* CANCEL */}

            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  "/dashboard/account"
                )
              }
              disabled={isSaving}
            >
              Batal
            </Button>

            {/* SAVE */}

            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />

              {isSaving
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </Button>

          </div>

        </CardContent>
      </Card>
    </div>
  )
}

