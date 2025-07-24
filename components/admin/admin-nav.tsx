"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Car,
  CreditCard,
  Hotel,
  LayoutDashboard,
  LineChart,
  Map,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Home,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminNav() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Business Tracker",
      icon: LineChart,
      href: "/admin/business-tracker",
      active: pathname === "/admin/business-tracker",
    },
    {
      label: "Products",
      icon: ShoppingBag,
      href: "/admin/products",
      active: pathname === "/admin/products",
    },
    {
      label: "Taxi Services",
      icon: Car,
      href: "/admin/taxi",
      active: pathname === "/admin/taxi",
    },
    {
      label: "Tourism",
      icon: Map,
      href: "/admin/tourism",
      active: pathname === "/admin/tourism",
    },
    {
      label: "Hotels & Lodges",
      icon: Hotel,
      href: "/admin/hotels",
      active: pathname === "/admin/hotels",
    },
    {
      label: "Cottages",
      icon: Home,
      href: "/admin/cottages",
      active: pathname === "/admin/cottages",
    },
    {
      label: "Orders",
      icon: Package,
      href: "/admin/orders",
      active: pathname === "/admin/orders",
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/admin/payments",
      active: pathname === "/admin/payments",
    },
    {
      label: "Customers",
      icon: Users,
      href: "/admin/customers",
      active: pathname === "/admin/customers",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      active: pathname === "/admin/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
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
