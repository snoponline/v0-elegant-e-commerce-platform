"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Settings, LogOut, Package, Heart, ShoppingBag } from "lucide-react"

interface Order {
  id: string
  date: string
  status: "delivered" | "processing" | "shipped"
  total: number
  items: number
}

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

const sampleOrders: Order[] = [
  { id: "ORD-001", date: "2025-11-05", status: "delivered", total: 1299.99, items: 3 },
  { id: "ORD-002", date: "2025-11-03", status: "shipped", total: 899.99, items: 2 },
  { id: "ORD-003", date: "2025-10-28", status: "processing", total: 2499.99, items: 5 },
]

const sampleWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 799.99,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
  {
    id: "2",
    name: "Smart Watch Pro Ultra",
    price: 1999.99,
    image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "orders" | "wishlist">("overview")
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+27 123 456 7890",
    address: "123 Main Street, Cape Town",
    totalSpent: 4699.97,
    totalOrders: 3,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            snop.co.za
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted rounded-lg transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <nav className="space-y-2 bg-white rounded-lg p-4 shadow-sm">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition ${
                  activeTab === "overview" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition ${
                  activeTab === "profile" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition ${
                  activeTab === "orders" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Package className="w-5 h-5" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition ${
                  activeTab === "wishlist" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium text-foreground hover:bg-muted transition">
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-primary">
                    <p className="text-muted-foreground text-sm">Total Spent</p>
                    <p className="text-3xl font-bold text-primary mt-2">R{user.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-secondary">
                    <p className="text-muted-foreground text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-secondary mt-2">{user.totalOrders}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
                  <div className="space-y-2 text-sm text-foreground">
                    <p>
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {user.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> {user.address}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                  <h3 className="font-bold mb-2">Account Summary</h3>
                  <p className="text-sm text-foreground/80">
                    You've made {user.totalOrders} purchases totaling R{user.totalSpent.toFixed(2)}. Keep shopping to
                    earn more rewards!
                  </p>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                      <input
                        type="text"
                        defaultValue={user.address}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your Orders</h2>
                {sampleOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-primary">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-sm text-foreground">
                        {order.items} item{order.items > 1 ? "s" : ""}
                      </p>
                      <p className="text-lg font-bold text-primary">R{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Wishlist</h2>
                {sampleWishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleWishlist.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
                      >
                        <div className="relative h-48 bg-muted">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-primary">R{item.price.toFixed(2)}</span>
                            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-foreground font-semibold">Your wishlist is empty</p>
                    <p className="text-muted-foreground text-sm mt-1">Start adding items to save them for later</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
