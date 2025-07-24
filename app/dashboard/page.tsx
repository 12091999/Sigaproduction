"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag, Car, Hotel, Map, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProductsList } from "@/components/dashboard/products-list"
import { TaxisList } from "@/components/dashboard/taxis-list"
import { AccommodationsList } from "@/components/dashboard/accommodations-list"
import { TourismList } from "@/components/dashboard/tourism-list"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Only run the effect after mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/signin")
    }
  }, [user, isLoading, router, mounted])

  // Don't render anything until client-side
  if (!mounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your dashboard</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Listing
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 added this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxi Services</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 added this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accommodations</CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+0 added this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tourism Offers</CardTitle>
                <Map className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">+0 added this month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="taxis">Taxi Services</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="tourism">Tourism</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Products</h2>
                <Button asChild>
                  <a href="/dashboard/products/new">Add New Product</a>
                </Button>
              </div>
              <ProductsList />
            </TabsContent>

            <TabsContent value="taxis" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Taxi Services</h2>
                <Button asChild>
                  <a href="/dashboard/taxis/new">Add New Taxi Service</a>
                </Button>
              </div>
              <TaxisList />
            </TabsContent>

            <TabsContent value="accommodations" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Accommodations</h2>
                <Button asChild>
                  <a href="/dashboard/accommodations/new">Add New Accommodation</a>
                </Button>
              </div>
              <AccommodationsList />
            </TabsContent>

            <TabsContent value="tourism" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Tourism Offerings</h2>
                <Button asChild>
                  <a href="/dashboard/tourism/new">Add New Tourism Offering</a>
                </Button>
              </div>
              <TourismList />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
