"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm mb-4 opacity-80 hover:opacity-100">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm opacity-80">Last Updated: November 11, 2025</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="prose prose-invert max-w-none">
          {/* Header Section */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-6">
              This Privacy Policy describes how Snop (Pty) Ltd. ("Snop," "we," "us," or "our") collects, uses, and
              discloses your Personal Information when you visit or make a purchase from snop.co.za (the "Site").
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Purchase</h3>
                <p className="text-foreground/80">
                  Name, billing address, shipping address, payment information (e.g., credit card numbers, email
                  address, phone number).
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Create an Account</h3>
                <p className="text-foreground/80">Name, email address, password.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Communicate</h3>
                <p className="text-foreground/80">Any information you share via email or support channels.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Automated Data</h3>
                <p className="text-foreground/80">
                  IP address, browser type, time zone, and some of the cookies that are installed on your device.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <ul className="space-y-3 list-disc list-inside text-foreground/80">
              <li>Fulfill orders (processing payments, arranging shipping, providing invoices).</li>
              <li>Communicate with you (order confirmation, customer support).</li>
              <li>Screen orders for potential risk or fraud.</li>
              <li>Provide you with targeted advertising or marketing communications, in line with your preferences.</li>
              <li>
                Improve and optimize our Site (e.g., by generating analytics about how our customers browse and interact
                with the Site).
              </li>
            </ul>
          </section>

          {/* Sharing Your Personal Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Sharing Your Personal Information</h2>
            <div className="space-y-3 text-foreground/80">
              <p>
                We share your Personal Information with third parties to help us run our business and fulfill our
                contracts with you. Examples include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Payment Processors</strong> (to securely process transactions)
                </li>
                <li>
                  <strong>Shipping Carriers</strong> (to deliver your order)
                </li>
                <li>
                  <strong>Analytics Providers</strong> (Google Analytics, to understand site usage)
                </li>
              </ul>
              <p>
                We will not sell, rent, or trade your personal information to third parties for their independent use.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Your Rights</h2>
            <p className="text-foreground/80">
              You have the right to access the personal information we hold about you, to port it to a new service, and
              to ask that your personal information be corrected, updated, or erased. Please contact us using the
              information below to exercise these rights.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6 mt-12">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-foreground/80">
              For more information about our privacy practices, if you have questions, or if you would like to make a
              complaint, please contact us by e-mail at <strong>privacy@snop.co.za</strong>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
