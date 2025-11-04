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

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
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
      href: "/dashboard/products",
      active: pathname === "/dashboard/products" || pathname.startsWith("/dashboard/products/"),
    },
    {
      label: "Services",
      icon: Book,
      href: "/dashboard/taxis",
      active: pathname === "/dashboard/taxis" || pathname.startsWith("/dashboard/taxis/"),
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
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn("justify-start", route.active && "bg-muted")}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
