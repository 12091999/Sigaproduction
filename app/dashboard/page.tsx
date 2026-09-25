"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProductsList } from "@/components/dashboard/products-list"
import { ServicesList } from "@/components/dashboard/services-list"
import { RentList } from "@/components/dashboard/rent-list"
import { TourismList } from "@/components/dashboard/tourism-list"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

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
    router.replace("/signin")
    return null
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
                <span className="mr-2" aria-hidden="true">+</span>
                Add New Listing
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <span className="text-muted-foreground" aria-hidden="true">🛍️</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 added this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Services</CardTitle>
                <span className="text-muted-foreground" aria-hidden="true">📖</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 added this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rent</CardTitle>
                <span className="text-muted-foreground" aria-hidden="true">🏠</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+0 added this month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="taxis">Services</TabsTrigger>
              <TabsTrigger value="accommodations">Rent</TabsTrigger>
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
                <h2 className="text-xl font-semibold">Your Services</h2>
                <Button asChild>
                  <a href="/dashboard/taxis/new">Add New Service</a>
                </Button>
              </div>
              <ServicesList />
            </TabsContent>

            <TabsContent value="accommodations" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Rent</h2>
                <Button asChild>
                  <a href="/dashboard/accommodations/new">Add New Rent</a>
                </Button>
              </div>
              <RentList />
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
