"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { BusinessMetric } from "@/contexts/business-tracker-context"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface RevenueChartProps {
  metrics: BusinessMetric[]
}

export function RevenueChart({ metrics }: RevenueChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line")
  const [dataView, setDataView] = useState<"daily" | "category">("daily")

  // Process data for daily view
  const dailyData = useMemo(() => {
    // Group by date and sum values
    const groupedByDate = metrics.reduce(
      (acc, metric) => {
        const date = metric.date
        if (!acc[date]) {
          acc[date] = {
            date,
            revenue: 0,
            expenses: 0,
            profit: 0,
          }
        }
        acc[date].revenue += metric.revenue
        acc[date].expenses += metric.expenses
        acc[date].profit += metric.profit
        return acc
      },
      {} as Record<string, { date: string; revenue: number; expenses: number; profit: number }>,
    )

    // Convert to array and sort by date
    return Object.values(groupedByDate).sort((a, b) => a.date.localeCompare(b.date))
  }, [metrics])

  // Process data for category view
  const categoryData = useMemo(() => {
    // Group by category and sum values
    const groupedByCategory = metrics.reduce(
      (acc, metric) => {
        const category = metric.category
        if (!acc[category]) {
          acc[category] = {
            category,
            revenue: 0,
            expenses: 0,
            profit: 0,
          }
        }
        acc[category].revenue += metric.revenue
        acc[category].expenses += metric.expenses
        acc[category].profit += metric.profit
        return acc
      },
      {} as Record<string, { category: string; revenue: number; expenses: number; profit: number }>,
    )

    // Convert to array
    return Object.values(groupedByCategory)
  }, [metrics])

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value}`
  }

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            {dataView === "daily" ? "Daily revenue, expenses, and profit" : "Revenue by category"}
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Tabs value={dataView} onValueChange={(v) => setDataView(v as "daily" | "category")}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={chartType} onValueChange={(v) => setChartType(v as "line" | "bar")}>
            <TabsList>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          {dataView === "daily" ? (
            chartType === "line" ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} name="Revenue" />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="Expenses"
                  />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} dot={false} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            )
          ) : chartType === "line" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
