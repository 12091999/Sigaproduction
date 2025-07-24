"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState<string>("email")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const { toast } = useToast()
  const router = useRouter()
  const { signUp, sendOtp, verifyOtp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await signUp(formData.name, formData.email, formData.phone, formData.password)
      toast({
        title: "Account created!",
        description: "You've successfully signed up.",
      })
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await sendOtp(formData.phone)
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
      const isValid = await verifyOtp(formData.phone, otp)
      if (isValid) {
        await signUp(formData.name, formData.email, formData.phone, "")
        toast({
          title: "Phone verified!",
          description: "You've successfully signed up.",
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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create a Seller Account</h1>
          <p className="text-sm text-muted-foreground">Sign up to list your products, services, and accommodations</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <form onSubmit={handleEmailSignUp}>
                <CardHeader>
                  <CardTitle>Sign Up with Email</CardTitle>
                  <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+254 123 456 789"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/signin" className="underline underline-offset-4 hover:text-primary">
                      Sign in
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
                    <CardTitle>Sign Up with Phone</CardTitle>
                    <CardDescription>We'll send a verification code to your phone</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-name">Full Name</Label>
                      <Input
                        id="phone-name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input
                        id="phone-number"
                        name="phone"
                        placeholder="+254 123 456 789"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-email">Email (Optional)</Label>
                      <Input
                        id="phone-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>

                  <CardFooter>
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
                  </CardFooter>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <CardHeader>
                    <CardTitle>Verify Your Phone</CardTitle>
                    <CardDescription>Enter the verification code sent to {formData.phone}</CardDescription>
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
                        "Verify & Create Account"
                      )}
                    </Button>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="/signin" className="underline underline-offset-4 hover:text-primary">
                        Sign in
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
