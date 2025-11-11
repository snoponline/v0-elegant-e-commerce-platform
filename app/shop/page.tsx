"use client"

import { useState, useMemo } from "react"
import { Heart, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const CATEGORIES = [
  "All Products",
  "Consumer Electronics",
  "Fashion & Apparel",
  "Food & Grocery",
  "Beverages",
  "Furniture & Home Furnishings",
  "DIY / Hardware / Home Improvement",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Toys & Hobbies",
  "Luxury Goods",
  "Gaming Consoles & Accessories",
  "Smartwatches & Wearables",
  "Kitchen Appliances",
  "Eco-Friendly Products",
  "Virtual Reality Devices",
  "Home Office Furniture",
  "Travel Accessories",
  "Drones & Aerial Photography",
  "3D Printers",
  "Luxury Watches",
  "Media & Entertainment",
  "Household Care",
  "Child & Baby Products",
  "Pet Supplies",
  "Automotive Parts",
  "Office Equipment",
  "Footwear",
  "Home Decor",
  "Kitchen & Dining",
]

const PRODUCTS = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 2000) + 100,
  originalPrice: Math.floor(Math.random() * 3000) + 500,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500) + 20,
  category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1],
  image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  badge: i % 5 === 0 ? "Hot Deal" : i % 4 === 0 ? "New" : i % 3 === 0 ? "Popular" : null,
  inStock: Math.random() > 0.1,
}))

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS

    if (selectedCategory !== "All Products") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating))
    }

    return filtered
  }, [selectedCategory, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Shop Products</h1>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className={`${mobileFiltersOpen ? "block" : "hidden"} md:block space-y-6`}>
            {/* Categories */}
            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-bold mb-4">Price Range</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>R{priceRange[0]}</span>
                  <span>R{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-bold mb-4">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      {"★".repeat(stars)}
                      {"☆".repeat(5 - stars)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg border border-border mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</div>
              <div className="flex gap-2 items-center w-full sm:w-auto">
                <label htmlFor="sort" className="text-sm font-medium">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-white text-sm flex-1 sm:flex-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group h-full flex flex-col">
                      <div className="relative h-48 bg-muted overflow-hidden">
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
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white font-bold">Out of Stock</span>
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-primary hover:text-primary-foreground"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-xs">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={
                                    i < Math.floor(Number.parseFloat(product.rating))
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">R{product.price}</span>
                            {product.price !== product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                R{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                            }}
                            disabled={!product.inStock}
                            className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-muted-foreground">No products found matching your filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <button className="px-4 py-2 border border-border rounded hover:bg-muted transition">Previous</button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded transition ${
                    page === 1 ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-border rounded hover:bg-muted transition">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
