"use client"

import type React from "react"
import { useState } from "react"
import { Check, ChevronRight, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"

type CheckoutStep = "shipping" | "payment" | "review"

interface FormError {
  field: string
  message: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [errors, setErrors] = useState<FormError[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId] = useState("ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase())

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors(errors.filter((err) => err.field !== name))
  }

  const validateShippingForm = () => {
    const newErrors: FormError[] = []

    if (!formData.firstName.trim()) newErrors.push({ field: "firstName", message: "First name is required" })
    if (!formData.lastName.trim()) newErrors.push({ field: "lastName", message: "Last name is required" })
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.push({ field: "email", message: "Valid email is required" })
    if (!formData.phone.trim()) newErrors.push({ field: "phone", message: "Phone number is required" })
    if (!formData.address.trim()) newErrors.push({ field: "address", message: "Address is required" })
    if (!formData.city.trim()) newErrors.push({ field: "city", message: "City is required" })
    if (!formData.province) newErrors.push({ field: "province", message: "Province is required" })
    if (!formData.zipCode.trim()) newErrors.push({ field: "zipCode", message: "Postal code is required" })

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const validatePaymentForm = () => {
    const newErrors: FormError[] = []

    if (!formData.cardName.trim()) newErrors.push({ field: "cardName", message: "Cardholder name is required" })
    if (!formData.cardNumber.replace(/\s/g, "").match(/^\d{13,19}$/))
      newErrors.push({ field: "cardNumber", message: "Valid card number is required" })
    if (!formData.expiry.match(/^\d{2}\/\d{2}$/))
      newErrors.push({ field: "expiry", message: "Expiry must be in MM/YY format" })
    if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.push({ field: "cvv", message: "Valid CVV is required" })

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleNextStep = () => {
    if (currentStep === "shipping") {
      if (validateShippingForm()) {
        setCurrentStep("payment")
      }
    } else if (currentStep === "payment") {
      if (validatePaymentForm()) {
        setCurrentStep("review")
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep === "payment") setCurrentStep("shipping")
    else if (currentStep === "review") setCurrentStep("payment")
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
  }

  const getFieldError = (field: string) => errors.find((e) => e.field === field)?.message

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="bg-background min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">Thank you for your purchase</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-2xl font-bold text-primary">{orderId}</p>
            </div>
            <p className="text-sm text-foreground">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <Link href="/dashboard" className="w-full block">
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90">
                View My Orders
              </button>
            </Link>
            <Link href="/shop" className="w-full block">
              <button className="w-full border border-border py-3 rounded-lg font-semibold hover:bg-muted">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="bg-background min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex gap-4">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : steps.findIndex((s) => s.id === currentStep) > idx
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {steps.findIndex((s) => s.id === currentStep) > idx ? <Check className="w-5 h-5" /> : idx + 1}
                  </div>
                  <span className="font-semibold hidden sm:block">{step.label}</span>
                  {idx < steps.length - 1 && <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block" />}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Step */}
          {currentStep === "shipping" && (
            <div className="bg-white rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-2xl font-bold">Shipping Address</h2>
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-semibold">Please fix the following errors:</p>
                    <ul className="list-disc list-inside mt-1">
                      {errors.map((err) => (
                        <li key={err.field}>{err.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("firstName")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("firstName") && (
                    <p className="text-xs text-destructive mt-1">{getFieldError("firstName")}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("lastName")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("lastName") && (
                    <p className="text-xs text-destructive mt-1">{getFieldError("lastName")}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("email")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("email") && <p className="text-xs text-destructive mt-1">{getFieldError("email")}</p>}
                </div>
                <div className="md:col-span-2">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("phone")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("phone") && <p className="text-xs text-destructive mt-1">{getFieldError("phone")}</p>}
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("address")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("address") && (
                    <p className="text-xs text-destructive mt-1">{getFieldError("address")}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("city")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("city") && <p className="text-xs text-destructive mt-1">{getFieldError("city")}</p>}
                </div>
                <div>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("province")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  >
                    <option value="">Select Province</option>
                    <option value="WC">Western Cape</option>
                    <option value="EC">Eastern Cape</option>
                    <option value="NC">Northern Cape</option>
                    <option value="FS">Free State</option>
                    <option value="KZN">KwaZulu-Natal</option>
                    <option value="GAU">Gauteng</option>
                    <option value="LMP">Limpopo</option>
                    <option value="NW">North West</option>
                    <option value="MP">Mpumalanga</option>
                  </select>
                  {getFieldError("province") && (
                    <p className="text-xs text-destructive mt-1">{getFieldError("province")}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Postal Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("zipCode")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("zipCode") && (
                    <p className="text-xs text-destructive mt-1">{getFieldError("zipCode")}</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleNextStep}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === "payment" && (
            <div className="bg-white rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-2xl font-bold">Payment Method</h2>
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-semibold">Please fix the following errors:</p>
                    <ul className="list-disc list-inside mt-1">
                      {errors.map((err) => (
                        <li key={err.field}>{err.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("cardName")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("cardName") && (
                    <p className="text-xs text-destructive mt-1">{getFieldError("cardName")}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      getFieldError("cardNumber")
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-primary"
                    }`}
                  />
                  {getFieldError("cardNumber") && (
                    <p className="text-xs text-destructive mt-1">{getFieldError("cardNumber")}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        getFieldError("expiry")
                          ? "border-destructive focus:ring-destructive"
                          : "border-border focus:ring-primary"
                      }`}
                    />
                    {getFieldError("expiry") && (
                      <p className="text-xs text-destructive mt-1">{getFieldError("expiry")}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        getFieldError("cvv")
                          ? "border-destructive focus:ring-destructive"
                          : "border-border focus:ring-primary"
                      }`}
                    />
                    {getFieldError("cvv") && <p className="text-xs text-destructive mt-1">{getFieldError("cvv")}</p>}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 border border-border py-3 rounded-lg font-bold hover:bg-muted transition"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === "review" && (
            <div className="bg-white rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-2xl font-bold">Review Your Order</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Shipping Address</h3>
                  <p className="text-muted-foreground text-sm">
                    {formData.firstName} {formData.lastName}
                    <br />
                    {formData.address}
                    <br />
                    {formData.city}, {formData.province} {formData.zipCode}
                    <br />
                    <br />
                    {formData.email}
                    <br />
                    {formData.phone}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Payment Method</h3>
                  <p className="text-muted-foreground text-sm">
                    {formData.cardName}
                    <br />
                    Card ending in {formData.cardNumber.slice(-4)}
                    <br />
                    Expires: {formData.expiry}
                  </p>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">R7,299.97</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax (15%)</span>
                  <span className="font-semibold">R1,095.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                  <span>Total</span>
                  <span className="text-primary">R8,394.97</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 border border-border py-3 rounded-lg font-bold hover:bg-muted transition"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
