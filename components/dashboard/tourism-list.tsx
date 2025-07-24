"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample tourism data
const tourism = [
  {
    id: "1",
    name: "City Tour Package",
    image: "/placeholder.svg?height=40&width=40",
    price: 129.99,
    duration: "4 hours",
    location: "City Center",
    status: "Available",
  },
  {
    id: "2",
    name: "Wildlife Safari",
    image: "/placeholder.svg?height=40&width=40",
    price: 249.99,
    duration: "Full day",
    location: "National Park",
    status: "Limited",
  },
  {
    id: "3",
    name: "Cultural Experience",
    image: "/placeholder.svg?height=40&width=40",
    price: 89.99,
    duration: "3 hours",
    location: "Cultural Village",
    status: "Available",
  },
]

export function TourismList() {
  const [tourismList, setTourismList] = useState(tourism)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Limited":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Unavailable":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleDelete = (id: string) => {
    setTourismList(tourismList.filter((tour) => tour.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tour Package</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tourismList.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 relative">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <span className="font-medium">{tour.name}</span>
                </div>
              </TableCell>
              <TableCell>{tour.duration}</TableCell>
              <TableCell>${tour.price.toFixed(2)}</TableCell>
              <TableCell>{tour.location}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(tour.status)} variant="outline">
                  {tour.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/tourism/${tour.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(tour.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
