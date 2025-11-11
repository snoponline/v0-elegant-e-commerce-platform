"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react"

interface WishlistItem {
  id: string
  name: string
  slug: string
  category: string
  price: number
  originalPrice: number
  image: string
  rating: number
  inStock: boolean
}

const sampleWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    category: "Consumer Electronics",
    price: 1299.99,
    originalPrice: 1999.99,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch Pro Ultra",
    slug: "smart-watch-pro-ultra",
    category: "Consumer Electronics",
    price: 2999.99,
    originalPrice: 4999.99,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "3",
    name: "Premium Gaming Laptop",
    slug: "premium-gaming-laptop",
    category: "Consumer Electronics",
    price: 14999.99,
    originalPrice: 19999.99,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    rating: 4.9,
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(sampleWishlist)

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
  }

  const getTotalSavings = () => {
    return wishlist.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            snop.co.za
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 text-foreground hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {wishlist.length > 0 ? (
          <>
            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Total Value</p>
                <p className="text-3xl font-bold text-primary">
                  R{wishlist.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Total Savings</p>
                <p className="text-3xl font-bold text-green-600">R{getTotalSavings().toFixed(2)}</p>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => {
                const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-lg transition group"
                  >
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                          -{discount}%
                        </div>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <p className="text-white font-semibold">Out of Stock</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <Link href={`/products/${item.category.toLowerCase().replace(/\s+/g, "-")}/${item.slug}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary transition line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex text-yellow-400 text-sm">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < Math.floor(item.rating) ? "★" : "☆"}</span>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({item.rating})</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-2xl font-bold text-primary">R{item.price.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground line-through">
                            R{item.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          disabled={!item.inStock}
                          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-foreground font-semibold mb-2">Your wishlist is empty</p>
            <p className="text-muted-foreground text-sm mb-6">Start adding items to save them for later</p>
            <Link href="/shop">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
