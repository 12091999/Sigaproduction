import Link from "next/link"
import Image from "next/image"
import { Bell, Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-2 md:gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="mr-1">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:w-[350px] max-w-[350px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nanga%20Market%20Logo.jpg-9YMH6kW08xe7CKD2UpboP6kUnI3QcK.jpeg"
                alt="Nanga Market"
                width={40}
                height={40}
                className="rounded-full border border-muted"
              />
              <span className="font-semibold">Nanga Market Admin</span>
            </div>
            {/* Mobile navigation would go here */}
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nanga%20Market%20Logo.jpg-9YMH6kW08xe7CKD2UpboP6kUnI3QcK.jpeg"
          alt="Nanga Market"
          width={32}
          height={32}
          className="rounded-full border border-muted hidden sm:block"
        />
        <span className="hidden sm:inline-block">Nanga Market Admin</span>
      </Link>

      <div className="w-full flex-1 md:w-auto md:flex-none">
        <form className="hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[500px]"
            />
          </div>
        </form>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
