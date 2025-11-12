"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Check, Truck, Shield, RotateCcw, Star } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()
  const router = useRouter()

  // Mock product data
  const product = {
    id: params.id,
    name: "Premium Wireless Headphones",
    price: 799.99,
    originalPrice: 1999.99,
    rating: 4.5,
    reviewCount: 324,
    inStock: true,
    category: "Electronics",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.",
    images: [
      "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
      "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
      "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    ],
    specs: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohms",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Connectivity: "Bluetooth 5.0",
      Weight: "250g",
      Warranty: "2 years",
    },
    features: [
      "Active Noise Cancellation (ANC)",
      "Ambient Mode for transparency",
      "Premium sound quality with deep bass",
      "30-hour battery life",
      "Fast charging technology",
      "Bluetooth 5.0 connectivity",
      "Comfortable over-ear design",
      "Built-in microphone for calls",
    ],
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        title: "Best headphones ever!",
        comment: "Amazing sound quality and very comfortable for long listening sessions.",
        date: "2 weeks ago",
        helpful: 234,
      },
      {
        id: 2,
        author: "Jane Smith",
        rating: 4,
        title: "Great value for money",
        comment: "Excellent quality at this price point. Highly recommended!",
        date: "1 month ago",
        helpful: 156,
      },
    ],
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  // Handler to add product to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      category: product.category,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <>
      <div className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-8">
            <span>Home</span> / <span>Electronics</span> / <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative h-96 bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Out of Stock</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{discount}%
                </div>
              </div>
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-20 w-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? "border-primary" : "border-border"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`View ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-4xl font-bold text-primary">R{product.price.toFixed(2)}</span>
                  <span className="text-xl text-muted-foreground line-through">
                    R{product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-accent">Save {discount}%</span>
                </div>
                <p className="text-sm text-muted-foreground">Limited time offer</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                {product.inStock ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-semibold">In Stock - Free Shipping</span>
                  </>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Quantity</label>
                <div className="flex items-center border border-border rounded-lg w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-muted">
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted">
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition ${
                    addedToCart ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                  } ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-3 rounded-lg border-2 font-semibold transition ${
                    isWishlisted
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Benefits */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex gap-3">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over R500</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">100% secure transactions</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Easy returns policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg border border-border mb-8">
            <div className="flex border-b border-border">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold capitalize transition ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <p className="text-foreground">{product.description}</p>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key} className="border-b border-border">
                        <td className="py-3 font-semibold text-foreground w-1/3">{key}</td>
                        <td className="py-3 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold">{review.author}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      <button className="text-sm text-primary font-semibold hover:underline">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group">
                  <div className="relative h-40 bg-muted overflow-hidden">
                    <Image
                      src="https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png"
                      alt="Related product"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2">Related Product {i + 1}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">${Math.floor(Math.random() * 100) + 20}</span>
                      <button className="p-1.5 bg-primary text-primary-foreground rounded hover:opacity-90">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
