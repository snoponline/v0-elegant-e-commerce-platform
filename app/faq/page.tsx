"use client"

import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    category: "Ordering",
    question: "How do I place an order on Snop?",
    answer:
      "Simply browse our products, add items to your cart, and proceed to checkout. Enter your shipping address and payment information to complete your purchase.",
  },
  {
    id: "2",
    category: "Ordering",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), as well as bank transfers and digital payment methods.",
  },
  {
    id: "3",
    category: "Ordering",
    question: "Can I use multiple discount codes on one order?",
    answer:
      "No, only one discount code can be applied per order. If you have a discount code, it will be applied during checkout.",
  },
  {
    id: "4",
    category: "Shipping",
    question: "How long does delivery take?",
    answer:
      "Standard delivery typically takes 3-5 business days within South Africa. Express delivery options are available at checkout for faster delivery.",
  },
  {
    id: "5",
    category: "Shipping",
    question: "Do you deliver to all areas in South Africa?",
    answer:
      "We deliver to most areas in South Africa. During checkout, you can check if delivery is available to your location by entering your postal code.",
  },
  {
    id: "6",
    category: "Shipping",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you will receive a tracking number via email. You can use this number to track your package in real-time.",
  },
  {
    id: "7",
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Items must be unused, unwashed, and in original packaging with all tags attached. See our full Returns Policy for details.",
  },
  {
    id: "8",
    category: "Returns",
    question: "How much does it cost to return an item?",
    answer:
      "Return shipping costs are the responsibility of the customer, unless the item is faulty or an incorrect item was shipped. In those cases, we cover the return shipping.",
  },
  {
    id: "9",
    category: "Account",
    question: "How do I create an account?",
    answer:
      'Click "Register" on the top right of our website, enter your email address and create a password. You can also checkout as a guest without creating an account.',
  },
  {
    id: "10",
    category: "Account",
    question: "Can I change my password?",
    answer:
      'Yes, you can reset your password by clicking "Forgot Password" on the login page. Enter your email address and follow the instructions sent to your email.',
  },
  {
    id: "11",
    category: "Account",
    question: "How do I manage my wishlist?",
    answer:
      "You can add items to your wishlist by clicking the heart icon on any product page. Access your wishlist from your account dashboard.",
  },
  {
    id: "12",
    category: "Products",
    question: "How are products priced?",
    answer:
      "Our prices are competitive and regularly updated. We often have flash deals and promotions. Check the Deals section for special offers.",
  },
  {
    id: "13",
    category: "Products",
    question: "Are there size charts for products?",
    answer:
      "Yes, most products have size charts available on their detail pages. Be sure to check the sizing information before making a purchase.",
  },
  {
    id: "14",
    category: "Products",
    question: "How do I leave a review for a product?",
    answer:
      "After purchasing a product, you can leave a review on the product detail page. Your feedback helps other shoppers make informed decisions.",
  },
  {
    id: "15",
    category: "Security",
    question: "Is my payment information secure?",
    answer:
      "Yes, we use industry-standard encryption and security measures to protect your payment information. Your data is never stored on our servers after payment.",
  },
]

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const categories = Array.from(new Set(faqItems.map((item) => item.category)))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm mb-4 opacity-80 hover:opacity-100">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>FAQ</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-sm opacity-80">Find answers to common questions about Snop</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        {/* FAQ by Category */}
        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 capitalize">{category}</h2>
            <div className="space-y-4">
              {faqItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.id} className="border border-foreground/10 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-foreground/5 transition"
                    >
                      <h3 className="font-semibold text-left">{item.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          expandedId === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedId === item.id && (
                      <div className="px-4 py-3 bg-foreground/5 border-t border-foreground/10">
                        <p className="text-foreground/80">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        ))}

        {/* Contact Support */}
        <section className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-4">Couldn't find what you're looking for?</h2>
          <p className="text-foreground/80 mb-6">
            Our customer service team is here to help. Get in touch with us through our contact page.
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
