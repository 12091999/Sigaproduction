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

// Sample taxis data
const taxis = [
  {
    id: "1",
    name: "Airport Transfer",
    image: "/placeholder.svg?height=40&width=40",
    price: 35.0,
    locations: ["Airport", "City Center"],
    type: "Sedan",
    status: "Available",
  },
  {
    id: "2",
    name: "City Tour",
    image: "/placeholder.svg?height=40&width=40",
    price: 45.0,
    locations: ["City Center", "Tourist Spots"],
    type: "SUV",
    status: "Available",
  },
  {
    id: "3",
    name: "Long Distance Travel",
    image: "/placeholder.svg?height=40&width=40",
    price: 0.75,
    priceUnit: "per km",
    locations: ["Nationwide"],
    type: "Van",
    status: "Busy",
  },
]

export function TaxisList() {
  const [taxisList, setTaxisList] = useState(taxis)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Busy":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Unavailable":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleDelete = (id: string) => {
    setTaxisList(taxisList.filter((taxi) => taxi.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Locations</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxisList.map((taxi) => (
            <TableRow key={taxi.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 relative">
                    <Image
                      src={taxi.image || "/placeholder.svg"}
                      alt={taxi.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <span className="font-medium">{taxi.name}</span>
                </div>
              </TableCell>
              <TableCell>{taxi.type}</TableCell>
              <TableCell>
                ${taxi.price.toFixed(2)}
                {taxi.priceUnit && <span className="text-sm text-muted-foreground"> {taxi.priceUnit}</span>}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {taxi.locations.map((location, index) => (
                    <Badge key={index} variant="outline" className="bg-muted">
                      {location}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(taxi.status)} variant="outline">
                  {taxi.status}
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
                      <Link href={`/dashboard/taxis/${taxi.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(taxi.id)} className="text-red-600">
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
