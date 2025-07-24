"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useBusinessTracker, type BusinessMetric } from "@/contexts/business-tracker-context"
import { DateRangePicker } from "@/components/business-tracker/date-range-picker"
import { MetricsSummary } from "@/components/business-tracker/metrics-summary"
import { RevenueChart } from "@/components/business-tracker/revenue-chart"
import { MetricsTable } from "@/components/business-tracker/metrics-table"

// Mock users for the admin view
const mockUsers = [
  { id: "user-1", name: "John Doe" },
  { id: "user-2", name: "Jane Smith" },
  { id: "user-3", name: "Robert Johnson" },
  { id: "user-4", name: "Emily Davis" },
  { id: "user-5", name: "Michael Wilson" },
]

export default function AdminBusinessTrackerPage() {
  const [mounted, setMounted] = useState(false)
  const { user, isLoading: authLoading, isAdmin } = useAuth()
  const {
    metrics,
    summary,
    isLoading: metricsLoading,
    dateRange,
    setDateRange,
    customDateRange,
    setCustomDateRange,
    fetchUserMetrics,
  } = useBusinessTracker()
  const router = useRouter()

  const [selectedUserId, setSelectedUserId] = useState<string>("all")
  const [userMetrics, setUserMetrics] = useState<BusinessMetric[]>([])
  const [loadingUserMetrics, setLoadingUserMetrics] = useState(false)

  // Only run the effect after mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && !user) {
      router.push("/signin")
    } else if (mounted && !authLoading && user && !isAdmin) {
      router.push("/dashboard/business-tracker")
    }
  }, [user, authLoading, isAdmin, router, mounted])

  // Fetch user-specific metrics when a user is selected
  useEffect(() => {
    const loadUserMetrics = async () => {
      if (selectedUserId === "all") {
        setUserMetrics(metrics)
        return
      }

      setLoadingUserMetrics(true)
      try {
        const data = await fetchUserMetrics(selectedUserId)
        setUserMetrics(data)
      } catch (error) {
        console.error("Failed to fetch user metrics:", error)
      } finally {
        setLoadingUserMetrics(false)
      }
    }

    if (mounted && isAdmin) {
      loadUserMetrics()
    }
  }, [selectedUserId, metrics, fetchUserMetrics, isAdmin, mounted])

  // Don't render anything until client-side
  if (!mounted) {
    return null
  }

  if (authLoading || metricsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <h2 className="mt-4 text-xl font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load business metrics</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Admin Business Tracker</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <Tabs value={selectedUserId} onValueChange={setSelectedUserId} className="w-[300px]">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="select">Select User</TabsTrigger>
              </TabsList>
              {selectedUserId !== "all" && (
                <TabsContent value="select" className="mt-2">
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    {mockUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </TabsContent>
              )}
            </Tabs>
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              customDateRange={customDateRange}
              setCustomDateRange={setCustomDateRange}
            />
          </div>
        </div>

        {loadingUserMetrics ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <MetricsSummary summary={summary} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
              <RevenueChart metrics={selectedUserId === "all" ? metrics : userMetrics} />

              <Card className="col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>User Performance</CardTitle>
                    <CardDescription>Comparing performance across users</CardDescription>
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {/* This would be a visualization comparing users */}
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">User comparison visualization would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedUserId === "all"
                      ? "All Users Metrics"
                      : `Metrics for ${mockUsers.find((u) => u.id === selectedUserId)?.name}`}
                  </CardTitle>
                  <CardDescription>Comprehensive view of business performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricsTable data={selectedUserId === "all" ? metrics : userMetrics} />
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
