"use client"

import { useState } from "react"
import { Heart, Zap } from "lucide-react"
import Image from "next/image"

const DEALS_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 299.99,
    originalPrice: 799.99,
    discount: 63,
    rating: 4.5,
    reviews: 287,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 499.99,
    originalPrice: 1999.99,
    discount: 75,
    rating: 4.8,
    reviews: 412,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 3,
    name: "Phone Case Bundle",
    price: 129.99,
    originalPrice: 499.99,
    discount: 74,
    rating: 4.2,
    reviews: 156,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "New",
    inStock: true,
  },
  {
    id: 4,
    name: "USB-C Cable 3m",
    price: 79.99,
    originalPrice: 249.99,
    discount: 68,
    rating: 4.6,
    reviews: 523,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 5,
    name: "Portable Charger 20000mAh",
    price: 189.99,
    originalPrice: 499.99,
    discount: 62,
    rating: 4.7,
    reviews: 398,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 249.99,
    originalPrice: 799.99,
    discount: 69,
    rating: 4.4,
    reviews: 267,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 7,
    name: "Screen Protector Pack",
    price: 49.99,
    originalPrice: 149.99,
    discount: 67,
    rating: 4.3,
    reviews: 189,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 8,
    name: "Phone Stand",
    price: 59.99,
    originalPrice: 179.99,
    discount: 67,
    rating: 4.5,
    reviews: 234,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "New",
    inStock: true,
  },
  {
    id: 9,
    name: "USB Hub 7-in-1",
    price: 199.99,
    originalPrice: 599.99,
    discount: 67,
    rating: 4.6,
    reviews: 301,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 10,
    name: "Laptop Cooling Pad",
    price: 349.99,
    originalPrice: 899.99,
    discount: 61,
    rating: 4.7,
    reviews: 445,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    badge: "Popular",
    inStock: true,
  },
]

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 18 })
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Flash Deals Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-primary py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-foreground" />
                <h1 className="text-4xl font-bold text-foreground">Flash Deals</h1>
              </div>
              <p className="text-foreground/80 text-lg">
                Incredible discounts on premium products - Limited time only!
              </p>
            </div>
            <div className="text-center bg-foreground/10 rounded-lg p-4 backdrop-blur">
              <div className="text-2xl font-bold text-foreground">
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
              <div className="text-sm text-foreground/80">Time Left</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {DEALS_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group h-full flex flex-col"
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
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-primary hover:text-primary-foreground"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-xs">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-primary">R{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through">R{product.originalPrice}</span>
                  </div>
                  <button
                    disabled={!product.inStock}
                    className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <section className="bg-muted py-12 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Why Shop Flash Deals?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">Up to 75% Off</div>
              <p className="text-muted-foreground">
                Get incredible savings on premium products with limited-time flash deals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">Free Shipping</div>
              <p className="text-muted-foreground">Free delivery on all flash deal purchases over R500.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">30-Day Returns</div>
              <p className="text-muted-foreground">Not satisfied? Easy returns and full refunds within 30 days.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
