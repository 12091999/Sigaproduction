"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { ProductsList } from "@/components/dashboard/products-list"

export default function ProductsListPage() {
  const [mounted, setMounted] = useState(false)

  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && !user) {
      router.push("/signin")
    }
  }, [user, authLoading, router, mounted])

  if (!mounted) {
    return null
  }

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />

          <h2 className="mt-4 text-xl font-semibold">
            Loading...
          </h2>

          <p className="text-muted-foreground">
            Please wait while we load your products
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Products
            </h1>

            <p className="text-muted-foreground mt-1">
              Manage your products
            </p>
          </div>

          <Button>
            Add New Product
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>

            <CardDescription>
              Manage, edit, and remove your products
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ProductsList />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}