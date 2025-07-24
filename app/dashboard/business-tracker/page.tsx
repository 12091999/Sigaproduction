"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useBusinessTracker } from "@/contexts/business-tracker-context"
import { DateRangePicker } from "@/components/business-tracker/date-range-picker"
import { MetricsSummary } from "@/components/business-tracker/metrics-summary"
import { RevenueChart } from "@/components/business-tracker/revenue-chart"
import { MetricsTable } from "@/components/business-tracker/metrics-table"

export default function BusinessTrackerPage() {
  const [mounted, setMounted] = useState(false)
  const { user, isLoading: authLoading } = useAuth()
  const {
    metrics,
    summary,
    isLoading: metricsLoading,
    dateRange,
    setDateRange,
    customDateRange,
    setCustomDateRange,
  } = useBusinessTracker()
  const router = useRouter()

  // Only run the effect after mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && !user) {
      router.push("/signin")
    }
  }, [user, authLoading, router, mounted])

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
          <p className="text-muted-foreground">Please wait while we load your business metrics</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Business Tracker</h1>
          <DateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            customDateRange={customDateRange}
            setCustomDateRange={setCustomDateRange}
          />
        </div>

        <MetricsSummary summary={summary} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <RevenueChart metrics={metrics} />

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
              <CardDescription>Revenue and profit breakdown by business category</CardDescription>
            </CardHeader>
            <CardContent>
              {/* This would be a pie chart or other visualization */}
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Category breakdown visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Metrics</CardTitle>
              <CardDescription>Comprehensive view of your business performance</CardDescription>
            </CardHeader>
            <CardContent>
              <MetricsTable data={metrics} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
