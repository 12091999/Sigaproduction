"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<string>("email")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const { toast } = useToast()
  const { login, sendOtp, verifyOtp } = useAuth()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      await login(email, password)
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      })
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Invalid email or password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await sendOtp(phone)
      setOtpSent(true)
      toast({
        title: "OTP sent",
        description: "A verification code has been sent to your phone.",
      })
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "There was a problem sending the verification code.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const isValid = await verifyOtp(phone, otp)
      if (isValid) {
        // In a real app, you would fetch the user profile here
        await login(phone, "")
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        })
      } else {
        toast({
          title: "Invalid OTP",
          description: "The verification code is incorrect.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "There was a problem verifying your phone.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage your listings and bookings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <form onSubmit={handleEmailLogin}>
                <CardHeader>
                  <CardTitle>Sign In with Email</CardTitle>
                  <CardDescription>Enter your email and password</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">Toggle password visibility</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="phone">
            <Card>
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <CardHeader>
                    <CardTitle>Sign In with Phone</CardTitle>
                    <CardDescription>We'll send a verification code to your phone</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input
                        id="phone-number"
                        placeholder="+254 123 456 789"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        "Send Verification Code"
                      )}
                    </Button>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                        Sign up
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <CardHeader>
                    <CardTitle>Verify Your Phone</CardTitle>
                    <CardDescription>Enter the verification code sent to {phone}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit code"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                      />
                    </div>

                    <div className="text-center">
                      <Button variant="link" type="button" onClick={() => setOtpSent(false)} className="p-0 h-auto">
                        Change phone number
                      </Button>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </Button>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                        Sign up
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
