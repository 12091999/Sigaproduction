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

// Sample accommodations data
const accommodations = [
  {
    id: "1",
    name: "Nanga Grand Hotel",
    image: "/placeholder.svg?height=40&width=40",
    price: 199.99,
    type: "Hotel",
    location: "City Center",
    status: "Available",
  },
  {
    id: "2",
    name: "Riverside Lodge",
    image: "/placeholder.svg?height=40&width=40",
    price: 149.99,
    type: "Lodge",
    location: "Riverside",
    status: "Available",
  },
  {
    id: "3",
    name: "Mountain View Hotel",
    image: "/placeholder.svg?height=40&width=40",
    price: 179.99,
    type: "Hotel",
    location: "Mountain Area",
    status: "Fully Booked",
  },
  {
    id: "4",
    name: "Safari Lodge",
    image: "/placeholder.svg?height=40&width=40",
    price: 159.99,
    type: "Lodge",
    location: "Safari Zone",
    status: "Limited",
  },
  {
    id: "5",
    name: "Lakeside Cottage",
    image: "/placeholder.svg?height=40&width=40",
    price: 129.99,
    type: "Cottage",
    location: "Lake Shore",
    status: "Available",
  },
]

export function AccommodationsList() {
  const [accommodationsList, setAccommodationsList] = useState(accommodations)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Limited":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Fully Booked":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleDelete = (id: string) => {
    setAccommodationsList(accommodationsList.filter((accommodation) => accommodation.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Accommodation</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accommodationsList.map((accommodation) => (
            <TableRow key={accommodation.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 relative">
                    <Image
                      src={accommodation.image || "/placeholder.svg"}
                      alt={accommodation.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <span className="font-medium">{accommodation.name}</span>
                </div>
              </TableCell>
              <TableCell>{accommodation.type}</TableCell>
              <TableCell>${accommodation.price.toFixed(2)}</TableCell>
              <TableCell>{accommodation.location}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(accommodation.status)} variant="outline">
                  {accommodation.status}
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
                      <Link href={`/dashboard/accommodations/${accommodation.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(accommodation.id)} className="text-red-600">
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
