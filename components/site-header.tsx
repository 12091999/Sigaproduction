import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-2 md:mr-6 flex items-center">
          <Image
            src="/images/sigaproeo.jpeg"
            alt="sigaproeo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-muted"
          />
          <span className="text-lg md:text-xl font-bold hidden md:inline-block ml-2 md:ml-3">Sigaproduction</span>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <Link href="/properties">
              <Home className="h-4 w-4 mr-2" />
              Rent
            </Link>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="px-2 sm:px-4">
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
