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
  signUp: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>
  updateProfile: (
    name: string,
    email: string,
    phone: string
  ) => void
  logout: () => void
  sendOtp: (phone: string) => Promise<boolean>
  verifyOtp: (phone: string, otp: string) => Promise<boolean>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  // =========================================================
  // CHECK LOGIN USER
  // =========================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error(
        "Failed to parse user from localStorage:",
        error
      )

      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // =========================================================
  // LOGIN
  // =========================================================

  const login = async (
    email: string,
    password: string
  ) => {
    setIsLoading(true)

    try {
      // Simulasi API
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )

      // Demo role
      const role: UserRole = email.includes("admin")
        ? "admin"
        : "customer"

      const mockUser: User = {
        id: "user-123",
        name:
          role === "admin"
            ? "Admin User"
            : "Sena User",
        email,
        phone: "+254123456789",
        role,
      }

      setUser(mockUser)

      localStorage.setItem(
        "user",
        JSON.stringify(mockUser)
      )

      router.push(
        role === "admin"
          ? "/admin/dashboard"
          : "/dashboard"
      )
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================================
  // SIGN UP
  // =========================================================

  const signUp = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    setIsLoading(true)

    try {
      // Simulasi API
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )

      const role: UserRole = email.includes("admin")
        ? "admin"
        : "customer"

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        role,
      }

      setUser(newUser)

      localStorage.setItem(
        "user",
        JSON.stringify(newUser)
      )

      router.push(
        role === "admin"
          ? "/admin/dashboard"
          : "/dashboard"
      )
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================================
  // UPDATE PROFILE
  // =========================================================

  const updateProfile = (
    name: string,
    email: string,
    phone: string
  ) => {
    if (!user) {
      return
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    }

    // Update React state
    setUser(updatedUser)

    // Update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    )
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    setUser(null)

    localStorage.removeItem("user")

    router.push("/")
  }

  // =========================================================
  // SEND OTP
  // =========================================================

  const sendOtp = async (phone: string) => {
    try {
      console.log(`Sending OTP to ${phone}`)

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )

      return true
    } catch (error) {
      console.error(
        "Failed to send OTP:",
        error
      )

      throw error
    }
  }

  // =========================================================
  // VERIFY OTP
  // =========================================================

  const verifyOtp = async (
    phone: string,
    otp: string
  ) => {
    try {
      console.log(
        `Verifying OTP ${otp} for ${phone}`
      )

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )

      // Demo:
      // OTP 6 digit dianggap valid
      return otp.length === 6
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error
      )

      return false
    }
  }

  // =========================================================
  // ADMIN CHECK
  // =========================================================

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signUp,
        updateProfile,
        logout,
        sendOtp,
        verifyOtp,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// =========================================================
// USE AUTH
// =========================================================

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    )
  }

  return context
}

