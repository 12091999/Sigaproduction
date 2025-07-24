'use client'

import { useEffect, useState } from 'react'

export function ThemeHandler({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.add(theme)
    document.documentElement.style.colorScheme = theme
    setMounted(true)
  }, [])

  if (!mounted) return null // Hindari render saat mismatch

  return <>{children}</>
}
