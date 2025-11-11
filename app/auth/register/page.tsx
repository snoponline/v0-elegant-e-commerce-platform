"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, User, AlertCircle } from "lucide-react"

interface FormError {
  field: string
  message: string
}

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errors, setErrors] = useState<FormError[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: FormError[] = []

    if (!name.trim()) {
      newErrors.push({ field: "name", message: "Full name is required" })
    }

    if (!email) {
      newErrors.push({ field: "email", message: "Email is required" })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.push({ field: "email", message: "Please enter a valid email" })
    }

    if (!password) {
      newErrors.push({ field: "password", message: "Password is required" })
    } else if (password.length < 6) {
      newErrors.push({ field: "password", message: "Password must be at least 6 characters" })
    }

    if (password !== confirmPassword) {
      newErrors.push({ field: "confirmPassword", message: "Passwords do not match" })
    }

    if (!agreeToTerms) {
      newErrors.push({ field: "terms", message: "You must agree to the Terms of Service" })
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    alert(`Account created successfully for ${email}`)
  }

  const getFieldError = (field: string) => errors.find((e) => e.field === field)?.message

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join Snop and start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  getFieldError("name")
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-primary"
                }`}
              />
            </div>
            {getFieldError("name") && (
              <div className="flex items-center gap-2 mt-1 text-xs text-destructive">
                <AlertCircle className="w-3 h-3" />
                {getFieldError("name")}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  getFieldError("email")
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-primary"
                }`}
              />
            </div>
            {getFieldError("email") && (
              <div className="flex items-center gap-2 mt-1 text-xs text-destructive">
                <AlertCircle className="w-3 h-3" />
                {getFieldError("email")}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  getFieldError("password")
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-primary"
                }`}
              />
            </div>
            {getFieldError("password") && (
              <div className="flex items-center gap-2 mt-1 text-xs text-destructive">
                <AlertCircle className="w-3 h-3" />
                {getFieldError("password")}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  getFieldError("confirmPassword")
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-primary"
                }`}
              />
            </div>
            {getFieldError("confirmPassword") && (
              <div className="flex items-center gap-2 mt-1 text-xs text-destructive">
                <AlertCircle className="w-3 h-3" />
                {getFieldError("confirmPassword")}
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 rounded border-input"
            />
            <label htmlFor="terms" className="text-sm text-foreground">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </label>
          </div>
          {getFieldError("terms") && (
            <div className="flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="w-3 h-3" />
              {getFieldError("terms")}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 mt-6"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
