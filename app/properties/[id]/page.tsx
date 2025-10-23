import Image from "next/image";

// Modify the property data structure
const property = {
    id: 1,
    title: "Professional Guitar Fender Stratocaster",
    description:
        "This beautiful Fender Stratocaster is perfect for performances and recording. Features include premium pickups, rosewood fingerboard, and comes with a hard-shell case. Excellent condition and regularly maintained.\n\nIncludes:\n- Hard-shell case\n- Extra strings\n- Guitar strap\n- Basic maintenance kit",
    location: "Music Studio Central",
    address: "123 Music Street, Downtown Area - 12345",
    price: 150000,
    priceType: "day",
    type: "Rent",
    propertyType: "Guitar",
    features: [
        "Professional Grade",
        "Includes Case",
        "Recently Serviced",
        "Premium Pickups",
        "Rosewood Fingerboard"
    ],
    images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
    ],
    contact: {
        name: "Music Rental Store",
        phone: "+62 812 3456 7890",
        email: "rental@musicstore.com",
        hours: "10 AM to 8 PM",
    },
    listedOn: "June 1, 2023",
    featured: true,
}

export default function Page() {
    return (
        <div>
            {/* Modify the similar items section */}
            {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image src="/placeholder.svg" alt="Similar instrument" fill className="object-cover" />
                    </div>
                    <div>
                        <h4 className="font-medium text-sm line-clamp-1">
                            {item === 1
                                ? "Yamaha Grand Piano"
                                : item === 2
                                    ? "Professional Drum Set"
                                    : "Bass Guitar Fender"}
                        </h4>
                        <div className="text-sm text-muted-foreground">
                            {item === 1 ? "Piano" : item === 2 ? "Drums" : "Bass"}
                        </div>
                        <div className="font-medium text-sm">
                            Rp{(item === 1 ? 500000 : item === 2 ? 200000 : 100000).toLocaleString("id-ID")}
                            /day
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
