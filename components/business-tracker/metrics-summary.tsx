"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BusinessSummary } from "@/contexts/business-tracker-context"

interface MetricsSummaryProps {
  summary: BusinessSummary
}

export function MetricsSummary({ summary }: MetricsSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "Rupiah",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatGrowth = (value: number) => {
    return value.toFixed(1) + "%"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</div>
          <div className="flex items-center pt-1 text-xs">
            {summary.revenueGrowth >= 0 ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span className={summary.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}>
              {formatGrowth(Math.abs(summary.revenueGrowth))}
            </span>
            <span className="text-muted-foreground ml-1">from previous period</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.totalProfit)}</div>
          <div className="flex items-center pt-1 text-xs">
            {summary.profitGrowth >= 0 ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span className={summary.profitGrowth >= 0 ? "text-green-500" : "text-red-500"}>
              {formatGrowth(Math.abs(summary.profitGrowth))}
            </span>
            <span className="text-muted-foreground ml-1">from previous period</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalOrders}</div>
          <div className="flex items-center pt-1 text-xs">
            {summary.ordersGrowth >= 0 ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span className={summary.ordersGrowth >= 0 ? "text-green-500" : "text-red-500"}>
              {formatGrowth(Math.abs(summary.ordersGrowth))}
            </span>
            <span className="text-muted-foreground ml-1">from previous period</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalCustomers}</div>
          <p className="text-xs text-muted-foreground">{summary.totalProducts} products sold</p>
        </CardContent>
      </Card>
    </div>
  )
}
