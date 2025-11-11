"use client"

import { useState } from "react"
import { Heart, Search, ShoppingCart, Menu, X, Zap, Gift, Smartphone, Shirt, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ChatWidget } from "@/components/chat-widget"

const CATEGORIES = [
  { id: 1, name: "Consumer Electronics", icon: Smartphone },
  { id: 2, name: "Fashion & Apparel", icon: Shirt },
  { id: 3, name: "Food & Grocery", icon: Zap },
  { id: 4, name: "Beauty & Personal Care", icon: Sparkles },
  { id: 5, name: "Furniture & Home", icon: Zap },
  { id: 6, name: "DIY & Tools", icon: Gift },
]

const FLASH_DEALS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 299.99,
    originalPrice: 799.99,
    discount: 63,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 499.99,
    originalPrice: 1999.99,
    discount: 75,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 3,
    name: "Phone Case Bundle",
    price: 129.99,
    originalPrice: 499.99,
    discount: 74,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 4,
    name: "USB-C Cable 3m",
    price: 79.99,
    originalPrice: 249.99,
    discount: 68,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 5,
    name: "Portable Charger 20000mAh",
    price: 189.99,
    originalPrice: 499.99,
    discount: 62,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 249.99,
    originalPrice: 799.99,
    discount: 69,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 7,
    name: "Screen Protector Pack",
    price: 49.99,
    originalPrice: 149.99,
    discount: 67,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 8,
    name: "Phone Stand",
    price: 59.99,
    originalPrice: 179.99,
    discount: 67,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 9,
    name: "USB Hub 7-in-1",
    price: 199.99,
    originalPrice: 599.99,
    discount: 67,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: 10,
    name: "Laptop Cooling Pad",
    price: 349.99,
    originalPrice: 899.99,
    discount: 61,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
]

const TRENDING_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Trending Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500) + 50,
  image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  badge: i % 3 === 0 ? "Hot Deal" : i % 3 === 1 ? "New" : "Popular",
}))

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 18 })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png"
                  alt="Snop"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <span className="text-xl font-bold text-primary">snop.co.za</span>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/shop" className="text-sm font-medium hover:text-primary transition">
                  Shop
                </Link>
                <Link href="/deals" className="text-sm font-medium hover:text-primary transition">
                  Flash Deals
                </Link>
                <Link href="/about" className="text-sm font-medium hover:text-primary transition">
                  About
                </Link>
              </nav>
            </div>

            <div className="hidden md:flex flex-1 mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
                Sign In
              </button>
              <button
                className="relative p-2 hover:bg-muted rounded-lg transition"
                onClick={() => setWishlistCount((w) => w + 1)}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                className="relative p-2 hover:bg-muted rounded-lg transition"
                onClick={() => setCartCount((c) => c + 1)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 hover:bg-muted rounded-lg transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <nav className="flex flex-col p-4 gap-3">
              <Link href="/shop" className="text-sm font-medium hover:text-primary transition py-2">
                Shop
              </Link>
              <Link href="/deals" className="text-sm font-medium hover:text-primary transition py-2">
                Flash Deals
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition py-2">
                About
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-primary py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Discover Amazing Deals</h1>
              <p className="text-lg text-foreground/80">
                Shop premium products at unbeatable prices. Get exclusive discounts and earn rewards with every
                purchase.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-foreground text-primary font-bold rounded-lg hover:shadow-lg transition">
                  Shop Now
                </button>
                <button className="px-8 py-3 border-2 border-foreground text-foreground font-bold rounded-lg hover:bg-foreground/10 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
              <Image
                src="https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png"
                alt="Hero product showcase"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <Link key={cat.id} href={`/shop?category=${cat.id}`}>
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-xl text-center hover:from-primary/40 hover:to-secondary/40 transition duration-300 group-hover:shadow-lg">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition" />
                    <p className="font-semibold text-sm text-balance">{cat.name}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Flash Deals</h2>
            </div>
            <div className="text-sm font-semibold text-primary">
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FLASH_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group cursor-pointer"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                    -{deal.discount}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{deal.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-primary">R{deal.price}</span>
                    <span className="text-sm text-muted-foreground line-through">R{deal.originalPrice}</span>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 transition text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRENDING_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group"
            >
              <div className="relative h-40 bg-muted overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-md">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(Number.parseFloat(product.rating)) ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">R{product.price}</span>
                  <button className="p-1.5 bg-primary text-primary-foreground rounded hover:opacity-90 transition">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Get Exclusive Deals</h2>
            <p className="text-foreground/80">Subscribe to our newsletter and get 10% off your first order</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-foreground text-primary font-bold rounded-lg hover:shadow-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Snop</h3>
              <p className="text-sm opacity-80">Premium marketplace for quality products at unbeatable prices.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/shop" className="hover:opacity-100 transition">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="hover:opacity-100 transition">
                    Flash Deals
                  </Link>
                </li>
                <li>
                  <Link href="/new" className="hover:opacity-100 transition">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/help" className="hover:opacity-100 transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:opacity-100 transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/privacy" className="hover:opacity-100 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:opacity-100 transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:opacity-100 transition">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            <p>© 2025 Snop Online Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}
