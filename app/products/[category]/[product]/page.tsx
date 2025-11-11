"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Heart, ShoppingCart, ChevronRight, AlertCircle } from "lucide-react"
import { PRODUCTS_DATA } from "@/lib/products-data"
import { useCart } from "@/lib/cart-context"

interface PageProps {
  params: Promise<{
    category: string
    product: string
  }>
}

export default function ProductPage({ params }: PageProps) {
  const { category, product } = React.use(params)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAddedNotification, setShowAddedNotification] = useState(false)
  const { addToCart } = useCart()

  // Find product by slug
  const productData = PRODUCTS_DATA.find((p) => p.slug === product)

  if (!productData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Product not found</h1>
          <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const discountPercentage = productData.originalPrice
    ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      quantity: quantity,
      image: productData.images[0],
      productSlug: productData.slug,
    })
    setShowAddedNotification(true)
    setTimeout(() => setShowAddedNotification(false), 2000)
    setQuantity(1) // Reset quantity after adding
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            snop.co.za
          </Link>
          <Link href="/shop" className="text-sm text-primary hover:underline font-medium">
            Back to Shop
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-primary">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{productData.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
              <Image
                src={productData.images[selectedImage] || "/placeholder.svg"}
                alt={productData.name}
                fill
                className="object-cover"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold">
                  -{discountPercentage}%
                </div>
              )}
              {productData.badge && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {productData.badge}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {productData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <Image
                    src={productData.images[index] || "/placeholder.svg"}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{productData.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < Math.floor(productData.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {productData.rating} ({productData.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">R{productData.price.toFixed(2)}</span>
                {productData.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R{productData.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {productData.stock > 0 ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  {productData.stock} in stock
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  Out of stock
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-foreground/80 leading-relaxed">
                {productData.description || "No description available for this product."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-foreground">Quantity:</span>
              <div className="flex items-center border border-input rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-foreground hover:bg-muted transition"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
                  className="px-3 py-2 text-foreground hover:bg-muted transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={productData.stock === 0}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3 border-2 rounded-lg font-semibold transition ${
                  isWishlisted
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input text-foreground hover:bg-muted"
                }`}
              >
                <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <p className="flex items-center gap-2 text-foreground">
                <span className="text-primary font-bold">✓</span> Free shipping on orders over R500
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <span className="text-primary font-bold">✓</span> Secure payment guaranteed
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <span className="text-primary font-bold">✓</span> 30-day return policy
              </p>
            </div>
          </div>
        </div>

        {/* Added to Cart Notification */}
        {showAddedNotification && (
          <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            Added {quantity} item(s) to cart successfully!
          </div>
        )}

        {/* Tabs Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Specifications */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(productData.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-semibold text-foreground">{key}</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {productData.reviews.map((review, index) => (
                  <div key={index} className="border-b border-border pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{review.author}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4" fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground/80">{review.comment || review.text || "No comment provided"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products Sidebar */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h3 className="text-xl font-bold mb-4">Related Products</h3>
            <div className="space-y-3">
              {PRODUCTS_DATA.slice(0, 3).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.categorySlug}/${relatedProduct.slug}`}
                  className="block p-3 bg-muted rounded-lg hover:bg-primary/10 transition group"
                >
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary line-clamp-2">
                    {relatedProduct.name}
                  </p>
                  <p className="text-primary font-bold text-sm mt-1">R{relatedProduct.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
