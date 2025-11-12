"use client"
import Link from "next/link"
import { ChevronRight, ShoppingCart, Package, RotateCcw, User, Wrench, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HelpCenter() {
  const categories = [
    {
      icon: ShoppingCart,
      title: "🛒 Ordering & Checkout",
      description: "How to place an order, payment options, using discount codes, pre-orders.",
      link: "#ordering",
    },
    {
      icon: Package,
      title: "📦 Shipping & Delivery",
      description: "Understanding shipping methods, costs, delivery times, and tracking your order.",
      link: "#shipping",
    },
    {
      icon: RotateCcw,
      title: "↩️ Returns & Exchanges",
      description: "Our policy, how to start a return, processing refunds, and exchanging items.",
      link: "/returns",
    },
    {
      icon: User,
      title: "👤 Account Management",
      description: "Creating and managing your snop account, changing passwords, updating addresses.",
      link: "#account",
    },
    {
      icon: Wrench,
      title: "🔧 Product Support",
      description: "Information on product care, sizing charts, troubleshooting, and warranty details.",
      link: "#products",
    },
    {
      icon: Lock,
      title: "🔐 Security & Privacy",
      description: "Information on how we protect your data and payment information.",
      link: "/privacy",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <p className="text-lg text-foreground/80 mb-4">
            The Snop Help Center is designed to give you instant answers and detailed information about shopping,
            ordering, accounts, and more.
          </p>
          <p className="text-sm text-foreground/60 mb-8">
            <strong>Tip:</strong> Try searching for keywords like "tracking," "size," or "payment."
          </p>
          {/* Search Input */}
          <div className="mb-6">
            <Input type="text" placeholder="Search for help..." className="w-full" />
          </div>
        </div>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.title}
                  href={category.link}
                  className="group bg-foreground/5 border border-foreground/10 rounded-lg p-6 hover:bg-yellow-400/10 hover:border-yellow-400/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="text-2xl" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-yellow-400 transition">
                        {category.title.substring(2)}
                      </h3>
                      <p className="text-sm text-foreground/60">{category.description}</p>
                    </div>
                    <ChevronRight className="text-2xl opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Still Need Assistance?</h2>
          <p className="text-foreground/80 mb-6">
            Visit our Contact Us page to speak directly with our customer service team.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-yellow-400 text-foreground font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Contact Us
          </Link>
        </section>
      </main>
    </div>
  )
}
