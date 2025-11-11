"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm mb-4 opacity-80 hover:opacity-100">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Terms of Service</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm opacity-80">Last Updated: November 11, 2025</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="prose prose-invert max-w-none">
          {/* Header Section */}
          <section className="mb-8">
            <p className="text-lg leading-relaxed mb-6">
              Welcome to snop.co.za. These Terms of Service ("Terms") govern your use of the website and services
              offered by Snop (Pty) Ltd. ("Snop," "we," "us," or "our"). By accessing or using our Site, you agree to be
              bound by these Terms.
            </p>
          </section>

          {/* Use of Our Site */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Use of Our Site</h2>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">Age:</span>
                <span>
                  You must be at least <strong>18 years old</strong> or the age of majority in your jurisdiction to
                  purchase products from the Site.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">Legal Use:</span>
                <span>You agree not to use the Site for any illegal or unauthorized purpose.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-fit">Account Security:</span>
                <span>
                  You are responsible for protecting your account password and for all activities that occur under your
                  account.
                </span>
              </li>
            </ul>
          </section>

          {/* Product Information and Pricing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Product Information and Pricing</h2>
            <ul className="space-y-3 text-foreground/80">
              <li>
                We strive to ensure all product information and pricing are accurate, but errors may occur. We reserve
                the right to correct any errors and to change prices at any time without prior notice.
              </li>
              <li>We reserve the right to refuse or cancel an order if the price was incorrectly listed.</li>
            </ul>
          </section>

          {/* Orders and Payments */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Orders and Payments</h2>
            <ul className="space-y-3 text-foreground/80">
              <li>
                All purchases are subject to product availability. We reserve the right to limit the quantity of items
                purchased per person or per order.
              </li>
              <li>Payment must be received in full before an order is processed and shipped.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
            <p className="text-foreground/80">
              The Site and its original content, features, and functionality are and will remain the exclusive property
              of Snop (Pty) Ltd. and its licensors. Our trademarks may not be used in connection with any product or
              service without the prior written consent of Snop.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p className="text-foreground/80">
              Snop (Pty) Ltd., its directors, employees, partners, agents, suppliers, or affiliates, shall not be liable
              for any indirect, incidental, special, consequential or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use
              of or inability to access or use the Service; (ii) any conduct or content of any third party on the
              Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of
              your transmissions or content, whether based on warranty, contract, tort (including negligence) or any
              other legal theory.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Governing Law</h2>
            <p className="text-foreground/80">
              These Terms shall be governed and construed in accordance with the laws of the{" "}
              <strong>Republic of South Africa</strong>, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-6 mt-12">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-foreground/80">
              For any questions about these Terms of Service, please contact us at <strong>legal@snop.co.za</strong>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
