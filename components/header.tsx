"use client"

import { useState } from "react"
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  cartCount?: number
  wishlistCount?: number
}

export function Header({ cartCount = 0, wishlistCount = 0 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
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
              <Link href="/new-arrivals" className="text-sm font-medium hover:text-primary transition">
                New Arrivals
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
            <button className="relative p-2 hover:bg-muted rounded-lg transition">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="relative p-2 hover:bg-muted rounded-lg transition">
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
              <Link href="/new-arrivals" className="text-sm font-medium hover:text-primary transition py-2">
                New Arrivals
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
