"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Edit,
  Phone,
  Mail,
  User,
  LogOut,
} from "lucide-react"

export default function AccountPage() {
  const {
    user,
    logout,
    isLoading,
  } = useAuth()

  const router = useRouter()

  // =========================================================
  // CHECK LOGIN
  // =========================================================

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
          Loading account...
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
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout()
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="p-6 space-y-6">
      {/* PAGE TITLE */}

      <div>
        <h1 className="text-3xl font-bold">
          Account
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your account information
        </p>
      </div>

      {/* =====================================================
          PROFILE INFORMATION
      ====================================================== */}

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* AVATAR */}

            <div className="relative w-24 h-24 shrink-0">
              <Image
                src="/images/avatar.jpg"
                alt={
                  user.name ||
                  "User Avatar"
                }
                fill
                className="rounded-full object-cover border"
              />
            </div>

            {/* USER INFORMATION */}

            <div className="flex-1 space-y-3">

              {/* NAME */}

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Name
                  </p>

                  <p className="font-semibold">
                    {user.name}
                  </p>
                </div>
              </div>

              {/* EMAIL */}

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* PHONE */}

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {user.phone || "-"}
                  </p>
                </div>
              </div>

            </div>

            {/* EDIT BUTTON */}

            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  "/dashboard/account/edit"
                )
              }
            >
              <Edit className="mr-2 h-4 w-4" />

              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* =====================================================
          ACCOUNT SETTINGS
      ====================================================== */}

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>
            Account Settings
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="font-medium">
                Logout
              </p>

              <p className="text-sm text-gray-500">
                Sign out from your account
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />

              Logout
            </Button>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}

