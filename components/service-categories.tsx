import Link from "next/link"
import { Camera, Event, Hotel, Music, ShoppingBag } from "lucide-react"

import { cn } from "@/lib/utils"

const categories = [
  {
    title: "Products",
    description: "Shop Sigamerch products",
    icon: ShoppingBag,
    href: "/products",
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "SIGMA",
    description: "Studio Tiga Movie And Art",
    icon: Camera,
    href: "/services/taxi",
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "SIGAPRO EO",
    description: "Discover Sigaproduction Event Organizer",
    icon: Event,
    href: "/services/tourism",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Hotels & Lodges",
    description: "Luxury stays in The Nilgiris",
    icon: Hotel,
    href: "/services/accommodations",
    color: "bg-sky-100 text-sky-700",
  },
  {
    title: "Studio Music",
    description: "Cozy Nilgiri retreats",
    icon: Music,
    href: "/services/cottages",
    color: "bg-purple-100 text-purple-700",
  },
]

export default function ServiceCategories() {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 sm:gap-4">
			{categories.map((category) => (
				<Link
					key={category.title}
					href={category.href}
					className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-lg transition-all hover:bg-muted"
				>
					<div
						className={cn(
							"p-2 sm:p-3 rounded-full mb-2 sm:mb-3",
							category.color
						)}
					>
						<category.icon className="h-5 w-5 sm:h-6 sm:w-6" />
					</div>
					<h3 className="font-medium text-sm sm:text-base">
						{category.title}
					</h3>
					<p className="text-xs sm:text-sm text-muted-foreground">
						{category.description}
					</p>
				</Link>
			))}
		</div>
	)
}
