"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Book,
  CreditCard,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardNav({
  activeTab,
  onTabChange,
}: DashboardNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard" && !activeTab,
    },

    {
      label: "Business Tracker",
      icon: LineChart,
      href: "/dashboard/business-tracker",
      active: pathname === "/dashboard/business-tracker",
    },

    {
      label: "Products",
      icon: ShoppingBag,
      href: "/dashboard?tab=products",
      tab: "products",
      active:
        pathname === "/dashboard" &&
        activeTab === "products",
    },

    {
      label: "Services",
      icon: Book,
      href: "/dashboard?tab=services",
      tab: "services",
      active:
        pathname === "/dashboard" &&
        activeTab === "services",
    },

    {
      label: "Orders",
      icon: Package,
      href: "/dashboard/orders",
      active: pathname === "/dashboard/orders",
    },

    {
      label: "Payments",
      icon: CreditCard,
      href: "/dashboard/payments",
      active: pathname === "/dashboard/payments",
    },

    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      active: pathname === "/dashboard/messages",
    },

    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },

    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <nav className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
      <div className="flex h-full max-h-screen flex-col gap-2 p-4">
        <div className="flex-1 overflow-auto py-2">
          <div className="grid gap-1">
            {routes.map((route) => {
              if (route.tab) {
                return (
                  <Button
                    key={route.label}
                    type="button"
                    variant={
                      route.active
                        ? "secondary"
                        : "ghost"
                    }
                    className={cn(
                      "w-full justify-start",
                      route.active && "bg-muted"
                    )}
                    onClick={() =>
                      onTabChange(route.tab!)
                    }
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Button>
                )
              }

              return (
                <Button
                  key={route.label}
                  variant={
                    route.active
                      ? "secondary"
                      : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    route.active && "bg-muted"
                  )}
                  asChild
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}