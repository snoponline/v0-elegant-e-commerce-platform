"use client"

import Link from "next/link"
import { ChevronRight, CheckCircle, AlertCircle } from "lucide-react"

export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm mb-4 opacity-80 hover:opacity-100">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Returns & Exchanges</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Returns & Exchanges Policy</h1>
          <p className="text-sm opacity-80">We want you to love your purchase from Snop!</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <p className="text-lg leading-relaxed text-foreground/80">
              We want you to love your purchase from Snop! If you are not completely satisfied, we are happy to accept
              returns and exchanges according to the following guidelines.
            </p>
          </section>

          {/* Standard Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Our Standard Policy</h2>
            <div className="space-y-4">
              <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Eligibility
                </h3>
                <p className="text-foreground/80">
                  Items may be returned within <strong>30 days</strong> of the original delivery date.
                </p>
              </div>
              <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Condition
                </h3>
                <p className="text-foreground/80">
                  Items must be <strong>unused, unwashed, and in the same condition</strong> that you received them.
                  They must also be in the original packaging with all tags and labels still attached.
                </p>
              </div>
              <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Proof of Purchase
                </h3>
                <p className="text-foreground/80">
                  A receipt or proof of purchase (e.g., your order number) is required for all returns.
                </p>
              </div>
            </div>
          </section>

          {/* Non-Returnable Items */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Non-Returnable Items</h2>
            <ul className="space-y-2 list-disc list-inside text-foreground/80">
              <li>Gift cards.</li>
              <li>Downloadable software products.</li>
              <li>Perishable goods (if applicable).</li>
              <li>
                Items marked as <strong>Final Sale</strong> or <strong>Clearance</strong>.
              </li>
              <li>Personalized or custom-made items.</li>
            </ul>
          </section>

          {/* Return Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. The Return Process (How to Initiate)</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-foreground/80">
                <strong>Online Portal:</strong> The fastest way to initiate a return is via our Online Returns Portal.
                You will need your Order Number and Email Address.
              </li>
              <li className="text-foreground/80">
                <strong>Assessment:</strong> Follow the steps to select the item(s) you wish to return and the reason.
              </li>
              <li className="text-foreground/80">
                <strong>Shipping:</strong> You will receive instructions on how to package and ship your return.
                Customers are responsible for the cost of return shipping, unless the item is faulty or an incorrect
                item was shipped.
              </li>
              <li className="text-foreground/80">
                <strong>Inspection & Refund:</strong> Once we receive and inspect the item, we will notify you of the
                approval or rejection of your refund. Approved refunds will be processed, and a credit will
                automatically be applied to your original method of payment within 5-10 business days.
              </li>
            </ol>
          </section>

          {/* Exchanges */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Exchanges</h2>
            <p className="text-foreground/80">
              If you need to exchange an item for a different size or color, please follow the return process and
              indicate that you would like an exchange. If the desired item is in stock, we will process the exchange
              once the original item is received.
            </p>
          </section>

          {/* Faulty or Incorrect Items */}
          <section className="bg-orange-400/10 border border-orange-400/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              5. Faulty or Incorrect Items
            </h2>
            <div className="space-y-3 text-foreground/80">
              <p>
                If you receive a faulty product or an incorrect item: Please contact us immediately at{" "}
                <strong>returns@snop.co.za</strong> within <strong>7 days</strong> of delivery.
              </p>
              <p>
                We will cover the return shipping costs and arrange for a replacement or a full refund, including the
                original shipping cost.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
