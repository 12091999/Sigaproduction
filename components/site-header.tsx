"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  CmsNavigationData,
  CmsPage,
  mapCmsNavigation,
  SiteNavigation,
} from "@/lib/wordpress"

const defaultNavigation: SiteNavigation = {
  brandName: "Sigaproduction",
  logoAlt: "sigaproeo",
  logoUrl: "/images/sigaproeo.jpeg",
  homeLabel: "Home",
  homeUrl: "/",
  productsLabel: "Products",
  productsUrl: "/products",
  servicesLabel: "Services",
  servicesDropdownLabel: "Service Categories",
  rentLabel: "Rent",
  rentUrl: "/properties",
  aboutLabel: "About",
  aboutUrl: "/about",
  contactLabel: "Contact",
  contactUrl: "/contact",
  accountLabel: "Account",
  accountUrl: "/dashboard/account",
  signinLabel: "Sign In",
  signinUrl: "/signin",
}

export function SiteHeader() {
  const [navigation, setNavigation] = useState(defaultNavigation)

  useEffect(() => {
    fetch("/api/wordpress/pages?slug=site-navigation")
      .then((response) => {
        if (!response.ok) throw new Error("WordPress navigation page unavailable")
        return response.json()
      })
      .then((page: CmsPage<CmsNavigationData>) => {
        setNavigation(mapCmsNavigation(page, defaultNavigation))
      })
      .catch((error: unknown) => {
        console.error("Could not load site navigation from WordPress:", error)
      })
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={navigation.homeUrl} className="mr-2 md:mr-6 flex items-center">
          <Image
            src={navigation.logoUrl}
            alt={navigation.logoAlt}
            width={40}
            height={40}
            unoptimized
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-muted"
          />
          <span className="text-lg md:text-xl font-bold hidden md:inline-block ml-2 md:ml-3">
            {navigation.brandName}
          </span>
        </Link>

        <MainNav navigation={navigation} />

        <div className="ml-auto flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <Link href={navigation.rentUrl}>
              <Home className="h-4 w-4 mr-2" />
              {navigation.rentLabel}
            </Link>
          </Button>

          <ThemeToggle />

          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href={navigation.accountUrl}>
              <User className="h-5 w-5" />
              <span className="sr-only">{navigation.accountLabel}</span>
            </Link>
          </Button>

          <Button asChild size="sm" className="px-2 sm:px-4">
            <Link href={navigation.signinUrl}>{navigation.signinLabel}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
