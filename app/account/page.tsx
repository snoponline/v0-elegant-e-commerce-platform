"use client"

import { useState } from "react"
import { LogOut, Edit2, Heart, Package, Settings } from "lucide-react"
import { Header } from "@/components/header"

type Tab = "profile" | "orders" | "wishlist" | "settings"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  })

  const orders = [
    {
      id: "ORD-001",
      date: "2025-11-10",
      items: 2,
      total: 179.97,
      status: "Delivered",
      statusColor: "text-green-600",
    },
    {
      id: "ORD-002",
      date: "2025-11-05",
      items: 1,
      total: 49.99,
      status: "Shipping",
      statusColor: "text-blue-600",
    },
    {
      id: "ORD-003",
      date: "2025-10-28",
      items: 3,
      total: 249.97,
      status: "Delivered",
      statusColor: "text-green-600",
    },
  ]

  const wishlist = [
    {
      id: 1,
      name: "Product 1",
      price: 99.99,
      image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    },
    {
      id: 2,
      name: "Product 2",
      price: 149.99,
      image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    },
    {
      id: 3,
      name: "Product 3",
      price: 199.99,
      image: "https://i.postimg.cc/Y9KZwRzs/Gemini-Generated-Image-mme3rsmme3rsmme3.png",
    },
  ]

  return (
    <>
      <Header />
      <div className="bg-background min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border border-border p-4 space-y-2 sticky top-20">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                    activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-2 ${
                    activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-2 ${
                    activeTab === "wishlist" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-2 ${
                    activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <hr className="my-2" />
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition font-medium flex items-center gap-2 text-destructive">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-lg border border-border p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">My Profile</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      {isEditing ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="grid md:grid-cols-2 gap-4 space-y-4">
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Last Name"
                      />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="md:col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="md:col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Phone"
                      />
                      <button
                        onClick={() => setIsEditing(false)}
                        className="md:col-span-2 bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:opacity-90 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">First Name</p>
                          <p className="font-semibold">{profile.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Name</p>
                          <p className="font-semibold">{profile.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-semibold">{profile.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-semibold">{profile.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white rounded-lg border border-border p-6 space-y-4">
                  <h2 className="text-2xl font-bold">My Orders</h2>
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border p-4 rounded-lg flex items-center justify-between hover:bg-muted transition cursor-pointer"
                      >
                        <div>
                          <p className="font-bold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${order.total}</p>
                          <p className={`text-sm font-semibold ${order.statusColor}`}>{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="bg-white rounded-lg border border-border p-6 space-y-4">
                  <h2 className="text-2xl font-bold">My Wishlist</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
                      >
                        <div className="relative h-40 bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-bold text-sm mb-2">{item.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-primary">${item.price}</p>
                            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-semibold hover:opacity-90">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg border border-border p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about orders and deals</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Get SMS updates on important orders</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-semibold">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive promotional offers and news</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                  </div>
                  <button className="w-full border border-destructive text-destructive py-2 rounded-lg font-bold hover:bg-red-50 transition">
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
