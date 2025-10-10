"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Shirt, Music, Camera, Home, Menu, ShoppingCart, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Route {
  href: string
  label: string
  active?: boolean
  children?: {
    href: string
    label: string
    icon: React.ElementType // Icons are required for all child routes
  }[]
}

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Primary navigation items to show on mobile
  const primaryRoutes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/products",
      label: "Products",
      active: pathname === "/products" || pathname.startsWith("/products/"),
    },
    {
      href: "/services",
      label: "Services",
      active: pathname === "/services" || pathname.startsWith("/services/"),
      children: [
        {
          href: "/services/merch",
          label: "Sigamerch",
          icon: Shirt,
        },
        {
          href: "/services/studiomusic",
          label: "Music Studio",
          icon: Music,
        },
        {
          href: "/services/SIGMA",
          label: "SIGMA",
          icon: Camera,
        },
        {
          href: "/services/sigaproEO",
          label: "SIGAPRO EO",
          icon: Home,
        },
      ],
    },
    {
      href: "/properties",
      label: "Rent & Sales",
      active: pathname === "/properties" || pathname.startsWith("/properties/"),
    },
  ]

  // Secondary navigation items for hamburger menu only

    const secondaryRoutes: Route[] = [ 
    {
      href: "/components/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]
  const allRoutes: Route[] = [...primaryRoutes, ...secondaryRoutes]

  return (
    <div className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        {allRoutes.map((route) => {
          if (route.children) {
            return (
              <DropdownMenu key={route.href}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      route.active ? "text-black dark:text-white" : "text-muted-foreground",
                    )}
                  >
                    {route.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel>Service Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {route.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link href={child.href} className="flex items-center gap-2">
                        {child.icon && <child.icon className="h-4 w-4" />}
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          )
        })}
      </div>

      {/* Mobile Primary Navigation */}
      <div className="flex md:hidden items-center gap-3">
        {primaryRoutes.map((route) => {
          if (route.children) {
            return (
              <DropdownMenu key={route.href}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    size="sm"
                    className={cn(
                      "text-xs px-1 py-0 h-auto font-medium transition-colors hover:text-primary",
                      route.active ? "text-black dark:text-white" : "text-muted-foreground",
                    )}
                  >
                    {route.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel>Service Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {route.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link href={child.href} className="flex items-center gap-2">
                        <child.icon className="h-4 w-4" />
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-xs font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          )
        })}
      </div>

      {/* Mobile Hamburger Menu for Secondary Items */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden ml-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:w-[350px] max-w-[350px]">
          <SheetHeader className="mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/SP.jpg"
                alt="sigaproductions Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <SheetTitle>Menu</SheetTitle>
            </div>
          </SheetHeader>
          <div className="grid gap-2 py-6">
            {/* Secondary Routes */}
            {secondaryRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex py-2 text-base font-medium transition-colors hover:text-primary",
                  route.active ? "text-black dark:text-white" : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}

            {/* Service Categories in Hamburger Menu */}
            {primaryRoutes
              .filter((route) => route.children)
              .map((route) => (
                <div key={route.href} className="space-y-3 mt-4">
                  <div className="font-medium text-base">{route.label} Categories</div>
                  <div className="grid gap-1 pl-4">
                    {route.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 py-2 text-muted-foreground hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        <child.icon className="h-4 w-4" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

            {/* Mobile-only links */}
            <div className="mt-6 pt-6 border-t">
              <div className="grid gap-3">
                <Link
                  href="/cart"
                  className="flex items-center gap-2 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Cart
                </Link>
                <Link
                  href="/account"
                  className="flex items-center gap-2 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Account
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
