"use client"

import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { BusinessTrackerProvider } from "@/contexts/business-tracker-context"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <BusinessTrackerProvider>{children}</BusinessTrackerProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
