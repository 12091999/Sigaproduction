import ProductDetail from "./product-detail"

export function generateStaticParams() {
  return [
    { slug: "PerniciousHumaniora" },
    { slug: "Agorophobia" },
    { slug: "Gandrung" },
    { slug: "Seblang" },
  ]
}

export default function ProductDetailPage() {
  return <ProductDetail />
}
