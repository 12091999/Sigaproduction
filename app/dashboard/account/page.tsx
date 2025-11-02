"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function AccountPage() {
  const [name, setName] = useState("Muhammad Fajar Kurniawan")
  const [email, setEmail] = useState("fajar@example.com")
  const [role] = useState("Administrator")

  return (
    <div className="container max-w-3xl py-10">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
          <p className="text-sm text-muted-foreground">Manage your personal information and profile.</p>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-8 mt-6">
          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <Image
                src="/images/profile.jpg" // Ganti sesuai path profil kamu
                alt="Profile Picture"
                fill
                className="rounded-full object-cover border border-gray-300"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
              <Badge variant="secondary" className="mt-2">{role}</Badge>
            </div>
          </div>

          <Separator />

          {/* Edit Info Form */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Account Summary */}
      <Card className="mt-8 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Account Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><span className="font-medium">Member Since:</span> January 2024</p>
          <p><span className="font-medium">Plan:</span> Premium</p>
          <p><span className="font-medium">Last Login:</span> October 22, 2025</p>
        </CardContent>
      </Card>
    </div>
  )
}
