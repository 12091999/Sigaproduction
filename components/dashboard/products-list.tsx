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

// Sample products data
const products = [
  {
    id: "1",
    name: "Handcrafted Basket",
    image: "/placeholder.svg?height=40&width=40",
    price: 45.99,
    quantity: 12,
    category: "Home Decor",
    status: "In Stock",
  },
  {
    id: "2",
    name: "Traditional Jewelry Set",
    image: "/placeholder.svg?height=40&width=40",
    price: 89.99,
    quantity: 5,
    category: "Accessories",
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Organic Honey",
    image: "/placeholder.svg?height=40&width=40",
    price: 12.99,
    quantity: 20,
    category: "Food & Beverages",
    status: "In Stock",
  },
  {
    id: "4",
    name: "Handwoven Rug",
    image: "/placeholder.svg?height=40&width=40",
    price: 129.99,
    quantity: 3,
    category: "Home Decor",
    status: "Low Stock",
  },
  {
    id: "5",
    name: "Ceramic Vase",
    image: "/placeholder.svg?height=40&width=40",
    price: 35.99,
    quantity: 0,
    category: "Home Decor",
    status: "Out of Stock",
  },
]

export function ProductsList() {
  const [productsList, setProductsList] = useState(products)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Out of Stock":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleDelete = (id: string) => {
    setProductsList(productsList.filter((product) => product.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsList.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <span className="font-medium">{product.name}</span>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(product.status)} variant="outline">
                  {product.status}
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
                      <Link href={`/dashboard/products/${product.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
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
