import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Dashboard Page Not Found</h2>
      <p className="text-muted-foreground mt-4 mb-6">The dashboard page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  )
}
