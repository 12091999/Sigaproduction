"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const {
    user,
    login,
    isLoading,
  } = useAuth()

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] =
    useState(false)

  const [error, setError] = useState("")

  // =========================================================
  // REDIRECT JIKA SUDAH LOGIN
  // =========================================================

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.replace("/admin/dashboard")
      } else {
        router.replace("/dashboard")
      }
    }
  }, [user, router])

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError("")

    // Validasi email

    if (!email.trim()) {
      setError("Email wajib diisi.")
      return
    }

    // Validasi password

    if (!password) {
      setError("Password wajib diisi.")
      return
    }

    try {
      await login(
        email.trim(),
        password
      )

      // Redirect sebenarnya sudah dilakukan
      // oleh fungsi login() di AuthContext.
    } catch (error) {
      console.error(
        "Login failed:",
        error
      )

      setError(
        "Login gagal. Silakan periksa email dan password."
      )
    }
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-6 bg-[url('/images/photo-collage.jpg')]">
        <div className="absolute inset-0 bg-black/40" />
      <Card className="relative z-10 w-full max-w-md shadow-lg">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <CardHeader className="text-center space-y-2">

          <CardTitle className="text-3xl font-bold">
            Login
          </CardTitle>

          <CardDescription>
            Masuk ke akun kamu untuk melanjutkan
          </CardDescription>

        </CardHeader>

        {/* ===================================================
            FORM
        ==================================================== */}

        <CardContent>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

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
                placeholder="nama@email.com"
                autoComplete="email"
                disabled={isLoading}
              />

            </div>

            {/* PASSWORD */}

            <div className="space-y-2">

              <Label htmlFor="password">
                Password
              </Label>

              <div className="relative">

                <Input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  className="pr-10"
                  disabled={isLoading}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >

              <LogIn className="mr-2 h-4 w-4" />

              {isLoading
                ? "Memproses..."
                : "Login"}

            </Button>

            {/* REGISTER */}

            <div className="text-center text-sm text-gray-500">

              Belum punya akun?{" "}

              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Daftar sekarang
              </Link>

            </div>

          </form>

        </CardContent>

      </Card>

    </main>
  )
}
