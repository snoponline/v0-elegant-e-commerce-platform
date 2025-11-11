"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, ChevronRight, Download, ArrowLeft } from "lucide-react"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "returned"
  total: number
  items: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
}

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2025-11-05",
    status: "delivered",
    total: 1299.99,
    items: [
      {
        id: "1",
        name: "Wireless Headphones Pro",
        price: 1299.99,
        quantity: 1,
        image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
      },
    ],
    trackingNumber: "SA-2025110500123",
  },
  {
    id: "ORD-002",
    date: "2025-11-03",
    status: "shipped",
    total: 5999.98,
    items: [
      {
        id: "2",
        name: "Smart Watch Pro",
        price: 2999.99,
        quantity: 2,
        image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
      },
    ],
    trackingNumber: "SA-2025110300456",
    estimatedDelivery: "2025-11-10",
  },
  {
    id: "ORD-003",
    date: "2025-10-28",
    status: "processing",
    total: 749.98,
    items: [
      {
        id: "3",
        name: "Premium Phone Case Bundle",
        price: 299.99,
        quantity: 2,
        image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
      },
    ],
    estimatedDelivery: "2025-11-08",
  },
]

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return { bg: "bg-green-100", text: "text-green-800", badge: "bg-green-500" }
      case "shipped":
        return { bg: "bg-blue-100", text: "text-blue-800", badge: "bg-blue-500" }
      case "processing":
        return { bg: "bg-yellow-100", text: "text-yellow-800", badge: "bg-yellow-500" }
      case "pending":
        return { bg: "bg-gray-100", text: "text-gray-800", badge: "bg-gray-500" }
      case "returned":
        return { bg: "bg-red-100", text: "text-red-800", badge: "bg-red-500" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", badge: "bg-gray-500" }
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      returned: "Returned",
    }
    return labels[status] || status
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Orders</h1>
          <p className="text-muted-foreground">Track and manage all your purchases</p>
        </div>

        <div className="space-y-4">
          {sampleOrders.length > 0 ? (
            sampleOrders.map((order) => {
              const isExpanded = expandedOrder === order.id
              const statusColors = getStatusColor(order.status)

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusColors.bg}`}>
                        <Package className={`w-6 h-6 ${statusColors.text}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("en-ZA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">R{order.total.toFixed(2)}</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors.badge}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-muted-foreground transition ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border p-6 bg-muted/30 space-y-4">
                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Items</h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white rounded-lg p-3">
                              <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground text-sm">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × R{item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tracking Info */}
                      {order.trackingNumber && (
                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <p className="text-sm text-muted-foreground">Tracking Number</p>
                          <p className="font-mono font-bold text-foreground">{order.trackingNumber}</p>
                        </div>
                      )}

                      {/* Estimated Delivery */}
                      {order.estimatedDelivery && (
                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                          <p className="font-semibold text-foreground">
                            {new Date(order.estimatedDelivery).toLocaleDateString("en-ZA", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-sm">
                          <Download className="w-4 h-4" />
                          Invoice
                        </button>
                        <button className="flex-1 px-4 py-2 border border-border rounded-lg font-semibold hover:bg-muted transition text-sm">
                          Help
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-lg border border-border p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-foreground font-semibold mb-2">No orders yet</p>
              <p className="text-muted-foreground text-sm mb-6">Start shopping to create your first order</p>
              <Link href="/shop">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition">
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
