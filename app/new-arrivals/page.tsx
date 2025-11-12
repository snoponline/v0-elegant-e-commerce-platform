"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { Header } from "@/components/header"
import { PRODUCTS_DATA } from "@/lib/products-data"

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState("newest")
  const [wishlist, setWishlist] = useState<string[]>([])

  // Filter products with "New" badge
  const newProducts = useMemo(() => {
    const filtered = PRODUCTS_DATA.filter((product) => product.badge === "New")

    // Sort products
    return filtered.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0 // newest (default order)
    })
  }, [sortBy])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">New Arrivals</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sort Controls */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Showing {newProducts.length} new products</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Products Grid */}
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative bg-muted overflow-hidden h-48">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-[#FFD700] text-black text-xs font-bold px-2 py-1 rounded">
                      {product.badge}
                    </div>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-muted transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase mb-2">{product.category}</p>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-sm font-semibold hover:text-primary transition mb-2 line-clamp-2 block"
                  >
                    {product.name}
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-[#FFD700] text-[#FFD700]" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">R{product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      R{product.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Stock Status */}
                  <p className={`text-xs mb-3 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </p>

                  {/* Add to Cart Button */}
                  <Link
                    href={`/product/${product.id}`}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:opacity-90 transition text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No new products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
