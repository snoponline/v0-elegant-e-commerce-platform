"use client"

import { useState } from "react"
import { Gift, Sparkles, Star, Zap, Trophy, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { GamificationWidget } from "@/components/gamification-widget"

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "spin" | "missions">("overview")

  const missions = [
    {
      id: 1,
      title: "Make Your First Purchase",
      description: "Buy any product and get 200 coins",
      reward: 200,
      completed: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Complete Your Profile",
      description: "Add your profile photo and details",
      reward: 150,
      completed: false,
      progress: 50,
    },
    {
      id: 3,
      title: "Refer a Friend",
      description: "Invite a friend and get 300 coins each",
      reward: 300,
      completed: false,
      progress: 0,
    },
    {
      id: 4,
      title: "Leave Product Reviews",
      description: "Review 5 products and earn 250 coins",
      reward: 250,
      completed: false,
      progress: 20,
    },
    {
      id: 5,
      title: "Shop $500 Worth",
      description: "Spend $500 total and unlock VIP tier",
      reward: 500,
      completed: false,
      progress: 45,
    },
  ]

  return (
    <>
      <Header />
      <div className="bg-background min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Elegant Rewards</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">
              Earn coins with every purchase and action. Use them to unlock exclusive rewards and discounts!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <GamificationWidget />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-border">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-3 font-semibold border-b-2 transition ${
                    activeTab === "overview"
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("spin")}
                  className={`px-4 py-3 font-semibold border-b-2 transition ${
                    activeTab === "spin"
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  <Gift className="w-4 h-4 inline mr-2" />
                  Spin Wheel
                </button>
                <button
                  onClick={() => setActiveTab("missions")}
                  className={`px-4 py-3 font-semibold border-b-2 transition ${
                    activeTab === "missions"
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  Missions
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white border border-border p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <p className="text-muted-foreground">Total Coins Earned</p>
                      </div>
                      <p className="text-3xl font-bold">12,450</p>
                    </div>
                    <div className="bg-white border border-border p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                        <p className="text-muted-foreground">Monthly Earnings</p>
                      </div>
                      <p className="text-3xl font-bold">850</p>
                    </div>
                    <div className="bg-white border border-border p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        <p className="text-muted-foreground">Current Tier</p>
                      </div>
                      <p className="text-3xl font-bold">Gold</p>
                    </div>
                  </div>

                  <div className="bg-white border border-border p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">How to Earn Coins</h3>
                    <div className="space-y-3">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Shopping</p>
                          <p className="text-sm text-muted-foreground">Earn 1 coin per $1 spent</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Star className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Reviews & Ratings</p>
                          <p className="text-sm text-muted-foreground">50 coins per product review</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Daily Login</p>
                          <p className="text-sm text-muted-foreground">100 coins per day streak</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Spin Wheel Tab */}
              {activeTab === "spin" && (
                <div className="bg-white border border-border p-8 rounded-lg text-center space-y-6">
                  <h2 className="text-2xl font-bold">Spin the Wheel!</h2>
                  <p className="text-muted-foreground">Win coins every day. You can spin once per 24 hours.</p>
                  <div className="relative w-64 h-64 mx-auto">
                    <div className="absolute inset-0 rounded-full border-8 border-primary flex items-center justify-center">
                      <div className="text-6xl">🎡</div>
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:opacity-90 transition">
                    Spin Now
                  </button>
                </div>
              )}

              {/* Missions Tab */}
              {activeTab === "missions" && (
                <div className="space-y-4">
                  {missions.map((mission) => (
                    <div key={mission.id} className="bg-white border border-border p-6 rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{mission.title}</h3>
                          <p className="text-sm text-muted-foreground">{mission.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="font-bold text-primary">{mission.reward}</span>
                          </div>
                          {mission.completed && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
                          )}
                        </div>
                      </div>
                      {!mission.completed && (
                        <>
                          <div className="w-full bg-muted rounded-full h-2 mb-2">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-300"
                              style={{ width: `${mission.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">{mission.progress}% complete</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ShoppingBag(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  )
}
