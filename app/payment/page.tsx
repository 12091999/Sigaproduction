import type { Metadata } from "next"
import Link from "next/link"
import { CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Payment - Nanga Market",
  description: "Complete your payment",
}

export default function PaymentPage() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Payment</h1>
        <p className="text-muted-foreground">Complete your payment to confirm your booking</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
            </TabsList>
            <TabsContent value="card">
              <Card>
                <CardHeader>
                  <CardTitle>Credit or Debit Card</CardTitle>
                  <CardDescription>Enter your card details to complete the payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 space-y-2">
                      <Label htmlFor="expiry-month">Expiry Month</Label>
                      <Input id="expiry-month" placeholder="MM" />
                    </div>
                    <div className="col-span-1 space-y-2">
                      <Label htmlFor="expiry-year">Expiry Year</Label>
                      <Input id="expiry-year" placeholder="YY" />
                    </div>
                    <div className="col-span-1 space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Your payment information is secure</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Pay Now</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="paypal">
              <Card>
                <CardHeader>
                  <CardTitle>PayPal</CardTitle>
                  <CardDescription>Pay using your PayPal account</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="mb-4 text-center">Click the button below to proceed to PayPal</p>
                  <Button>Continue to PayPal</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mobile">
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Money</CardTitle>
                  <CardDescription>Pay using your mobile money account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup defaultValue="mpesa">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa">M-Pesa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="airtel" id="airtel" />
                      <Label htmlFor="airtel">Airtel Money</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="orange" id="orange" />
                      <Label htmlFor="orange">Orange Money</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input id="phone-number" placeholder="+254 123 456 789" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Request Payment</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$199.99</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>$20.00</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>$5.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$224.99</span>
              </div>

              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">Booking Details:</p>
                <p>Nanga Grand Hotel</p>
                <p>Check-in: May 20, 2023</p>
                <p>Check-out: May 23, 2023</p>
                <p>Guests: 2 Adults</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-4">
                By proceeding with the payment, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4">
                  Terms and Conditions
                </Link>
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/cart">Back to Cart</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
