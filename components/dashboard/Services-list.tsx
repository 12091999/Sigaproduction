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

// 🧩 Data Services Sigaproduction
const services = [
  {
    id: "1",
    name: "Studio 3 Music Studio",
    image: "/images/studio3.jpg",
    price: 150000,
    features: ["Recording", "Mixing", "Mastering"],
    type: "Music Production",
    status: "Available",
  },
  {
    id: "2",
    name: "Sigapro EO",
    image: "/images/sigaproeo.jpeg",
    price: 500000,
    features: ["Event Organizer", "Stage Setup", "Sound System"],
    type: "Event Organizer",
    status: "Available",
  },
  {
    id: "3",
    name: "Sigamerch",
    image: "/images/sigamerch.jpg",
    price: 75000,
    features: ["Merch Design", "T-Shirt", "Hoodie", "Accessories"],
    type: "Merchandise",
    status: "Available",
  },
  {
    id: "4",
    name: "SIGMA Bwx",
    image: "/images/sigma.jpeg",
    price: 200000,
    features: ["Photography", "Videography", "Editing"],
    type: "Creative Studio",
    status: "Busy",
  },
  {
    id: "5",
    name: "Area Tiga",
    image: "/images/area3.jpg",
    price: 300000,
    features: ["Venue", "Mini Stage", "Café & Gathering Spot"],
    type: "Venue",
    status: "Under Maintenance",
  },
]

export function ServicesList() {
  const [serviceList, setServiceList] = useState(services)

  // 🌈 Warna status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Busy":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Under Maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // 💰 Format harga ke Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // 🗑️ Hapus service
  const handleDelete = (id: string) => {
    setServiceList(serviceList.filter((service) => service.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {serviceList.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 relative">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <span className="font-medium">{service.name}</span>
                </div>
              </TableCell>

              <TableCell>{service.type}</TableCell>
              <TableCell>{formatRupiah(service.price)}</TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="bg-muted text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              <TableCell>
                <Badge className={getStatusColor(service.status)} variant="outline">
                  {service.status}
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
                      <Link href={`/dashboard/services/${service.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 cursor-pointer"
                    >
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
