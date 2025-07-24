"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

// Define types for our business data
export type BusinessMetric = {
  id: string
  userId: string
  userName: string
  date: string
  revenue: number
  expenses: number
  profit: number
  orders: number
  customers: number
  products: number
  category: string
}

export type BusinessSummary = {
  totalRevenue: number
  totalExpenses: number
  totalProfit: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  revenueGrowth: number
  profitGrowth: number
  ordersGrowth: number
}

export type DateRange = "today" | "week" | "month" | "quarter" | "year" | "custom"

type BusinessTrackerContextType = {
  metrics: BusinessMetric[]
  summary: BusinessSummary
  isLoading: boolean
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  customDateRange: { start: string; end: string }
  setCustomDateRange: (range: { start: string; end: string }) => void
  fetchMetrics: () => Promise<void>
  fetchUserMetrics: (userId: string) => Promise<BusinessMetric[]>
}

const BusinessTrackerContext = createContext<BusinessTrackerContextType | undefined>(undefined)

// Mock data generator
const generateMockData = (userId: string, userName: string, days: number): BusinessMetric[] => {
  const data: BusinessMetric[] = []
  const categories = ["Products", "Taxi", "Accommodation", "Tourism"]

  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split("T")[0]

    // Generate random data with some trends
    const baseRevenue = 1000 + Math.random() * 2000
    const baseExpenses = baseRevenue * (0.4 + Math.random() * 0.2)
    const baseOrders = 10 + Math.floor(Math.random() * 20)
    const baseCustomers = 5 + Math.floor(Math.random() * 10)
    const baseProducts = 2 + Math.floor(Math.random() * 5)

    // Add some category-specific variations
    categories.forEach((category) => {
      const categoryFactor =
        category === "Products" ? 1.0 : category === "Taxi" ? 0.7 : category === "Accommodation" ? 1.5 : 0.9

      const revenue = baseRevenue * categoryFactor * (0.9 + Math.random() * 0.2)
      const expenses = baseExpenses * categoryFactor * (0.9 + Math.random() * 0.2)
      const profit = revenue - expenses

      data.push({
        id: `metric-${userId}-${dateString}-${category}`,
        userId,
        userName,
        date: dateString,
        revenue,
        expenses,
        profit,
        orders: Math.floor(baseOrders * categoryFactor),
        customers: Math.floor(baseCustomers * categoryFactor),
        products: Math.floor(baseProducts * categoryFactor),
        category,
      })
    })
  }

  return data
}

// Generate mock users
const mockUsers = [
  { id: "user-1", name: "John Doe" },
  { id: "user-2", name: "Jane Smith" },
  { id: "user-3", name: "Robert Johnson" },
  { id: "user-4", name: "Emily Davis" },
  { id: "user-5", name: "Michael Wilson" },
]

// Generate all mock data
const generateAllMockData = (): BusinessMetric[] => {
  let allData: BusinessMetric[] = []
  mockUsers.forEach((user) => {
    const userData = generateMockData(user.id, user.name, 90) // 90 days of data
    allData = [...allData, ...userData]
  })
  return allData
}

// All mock data
const allMockData = generateAllMockData()

export function BusinessTrackerProvider({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth()
  const [metrics, setMetrics] = useState<BusinessMetric[]>([])
  const [summary, setSummary] = useState<BusinessSummary>({
    totalRevenue: 0,
    totalExpenses: 0,
    totalProfit: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    revenueGrowth: 0,
    profitGrowth: 0,
    ordersGrowth: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange>("month")
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" })

  // Calculate date range filter
  const getDateFilter = () => {
    const today = new Date()
    let startDate = new Date()

    switch (dateRange) {
      case "today":
        startDate = today
        break
      case "week":
        startDate.setDate(today.getDate() - 7)
        break
      case "month":
        startDate.setMonth(today.getMonth() - 1)
        break
      case "quarter":
        startDate.setMonth(today.getMonth() - 3)
        break
      case "year":
        startDate.setFullYear(today.getFullYear() - 1)
        break
      case "custom":
        return {
          start: customDateRange.start,
          end: customDateRange.end || today.toISOString().split("T")[0],
        }
    }

    return {
      start: startDate.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
    }
  }

  // Calculate summary from metrics
  const calculateSummary = (data: BusinessMetric[]): BusinessSummary => {
    // Get current period data
    const dateFilter = getDateFilter()
    const currentPeriodData = data.filter((item) => item.date >= dateFilter.start && item.date <= dateFilter.end)

    // Calculate previous period for growth metrics
    const previousStart = new Date(dateFilter.start)
    const previousEnd = new Date(dateFilter.end)
    const periodDays = (new Date(dateFilter.end).getTime() - new Date(dateFilter.start).getTime()) / (1000 * 3600 * 24)

    previousStart.setDate(previousStart.getDate() - periodDays)
    previousEnd.setDate(previousEnd.getDate() - periodDays)

    const previousPeriodData = data.filter(
      (item) =>
        item.date >= previousStart.toISOString().split("T")[0] && item.date <= previousEnd.toISOString().split("T")[0],
    )

    // Calculate totals for current period
    const totalRevenue = currentPeriodData.reduce((sum, item) => sum + item.revenue, 0)
    const totalExpenses = currentPeriodData.reduce((sum, item) => sum + item.expenses, 0)
    const totalProfit = currentPeriodData.reduce((sum, item) => sum + item.profit, 0)
    const totalOrders = currentPeriodData.reduce((sum, item) => sum + item.orders, 0)

    // Get unique customers and products
    const uniqueCustomers = new Set(currentPeriodData.map((item) => `${item.userId}-${item.customers}`)).size
    const totalProducts = currentPeriodData.reduce((sum, item) => sum + item.products, 0)

    // Calculate previous period totals for growth
    const prevRevenue = previousPeriodData.reduce((sum, item) => sum + item.revenue, 0)
    const prevProfit = previousPeriodData.reduce((sum, item) => sum + item.profit, 0)
    const prevOrders = previousPeriodData.reduce((sum, item) => sum + item.orders, 0)

    // Calculate growth percentages
    const revenueGrowth = prevRevenue === 0 ? 100 : ((totalRevenue - prevRevenue) / prevRevenue) * 100
    const profitGrowth = prevProfit === 0 ? 100 : ((totalProfit - prevProfit) / prevProfit) * 100
    const ordersGrowth = prevOrders === 0 ? 100 : ((totalOrders - prevOrders) / prevOrders) * 100

    return {
      totalRevenue,
      totalExpenses,
      totalProfit,
      totalOrders,
      totalCustomers: uniqueCustomers,
      totalProducts,
      revenueGrowth,
      profitGrowth,
      ordersGrowth,
    }
  }

  // Fetch metrics based on user role
  const fetchMetrics = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filteredData: BusinessMetric[] = []

      if (isAdmin) {
        // Admin sees all data
        filteredData = [...allMockData]
      } else if (user) {
        // Regular users see only their data
        filteredData = allMockData.filter((item) => item.userId === user.id)

        // If no data for this user, generate some
        if (filteredData.length === 0) {
          filteredData = generateMockData(user.id, user.name, 90)
        }
      }

      setMetrics(filteredData)
      setSummary(calculateSummary(filteredData))
    } catch (error) {
      console.error("Failed to fetch metrics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch metrics for a specific user (admin only)
  const fetchUserMetrics = async (userId: string): Promise<BusinessMetric[]> => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Only admins can fetch other users' metrics")
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter data for the specified user
    const userData = allMockData.filter((item) => item.userId === userId)

    // If no data for this user, generate some
    if (userData.length === 0) {
      const userName = mockUsers.find((u) => u.id === userId)?.name || "Unknown User"
      return generateMockData(userId, userName, 90)
    }

    return userData
  }

  // Fetch metrics when user or date range changes
  useEffect(() => {
    if (user) {
      fetchMetrics()
    }
  }, [user, dateRange, customDateRange])

  return (
    <BusinessTrackerContext.Provider
      value={{
        metrics,
        summary,
        isLoading,
        dateRange,
        setDateRange,
        customDateRange,
        setCustomDateRange,
        fetchMetrics,
        fetchUserMetrics,
      }}
    >
      {children}
    </BusinessTrackerContext.Provider>
  )
}

export function useBusinessTracker() {
  const context = useContext(BusinessTrackerContext)
  if (context === undefined) {
    throw new Error("useBusinessTracker must be used within a BusinessTrackerProvider")
  }
  return context
}
