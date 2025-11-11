"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart()
  const [isHydrated, setIsHydrated] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [discountApplied, setDiscountApplied] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 79.99
  const tax = (subtotal - discount) * 0.15
  const total = subtotal - discount + shipping + tax

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1)
      setDiscountApplied(true)
    } else if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(subtotal * 0.2)
      setDiscountApplied(true)
    } else {
      setDiscount(0)
      setDiscountApplied(false)
    }
  }

  if (!isHydrated) {
    return (
      <>
        <Header cartCount={0} />
        <div className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading cart...</div>
        </div>
      </>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <Header cartCount={0} />
        <div className="bg-background min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Start shopping to add items to your cart</p>
            <Link href="/shop">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header cartCount={items.length} />
      <div className="bg-background min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border border-border p-4 flex gap-4">
                  <div className="relative h-24 w-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/consumer-electronics/${item.productSlug}`}>
                        <h3 className="font-bold hover:text-primary transition">{item.name}</h3>
                      </Link>
                      <p className="text-2xl font-bold text-primary">R{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:opacity-70 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 border-l border-r border-border min-w-max">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 space-y-4 sticky top-20">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">R{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({discountApplied ? promoCode.toUpperCase() : ""})</span>
                      <span className="font-semibold">-R{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Tax (15%)</span>
                    <span className="font-semibold">R{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? "FREE" : `R${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R{total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Try SAVE10 or SAVE20"
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                  {discountApplied && <p className="text-xs text-green-600 font-semibold">✓ Promo code applied!</p>}
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <button className="w-full border border-border py-3 rounded-lg font-semibold hover:bg-muted transition">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
