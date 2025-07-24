"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type UserRole = "customer" | "admin"

type User = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, phone: string, password: string) => Promise<void>
  logout: () => void
  sendOtp: (phone: string) => Promise<void>
  verifyOtp: (phone: string, otp: string) => Promise<boolean>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, if email contains "admin", set role as admin
      const role: UserRole = email.includes("admin") ? "admin" : "customer"

      // Mock user for demo purposes
      const mockUser = {
        id: "user-123",
        name: role === "admin" ? "Admin User" : "John Doe",
        email,
        phone: "+254123456789",
        role,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      router.push(role === "admin" ? "/admin/dashboard" : "/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, if email contains "admin", set role as admin
      const role: UserRole = email.includes("admin") ? "admin" : "customer"

      // Mock user creation
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        role,
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      router.push(role === "admin" ? "/admin/dashboard" : "/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  const sendOtp = async (phone: string) => {
    try {
      // In a real app, this would send an OTP via SMS
      console.log(`Sending OTP to ${phone}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error("Failed to send OTP:", error)
      throw error
    }
  }

  const verifyOtp = async (phone: string, otp: string) => {
    try {
      // In a real app, this would verify the OTP
      console.log(`Verifying OTP ${otp} for ${phone}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // For demo purposes, any 6-digit OTP is valid
      return otp.length === 6
    } catch (error) {
      console.error("OTP verification failed:", error)
      return false
    }
  }

  // Check if the current user is an admin
  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signUp, logout, sendOtp, verifyOtp, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
