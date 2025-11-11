"use client"

import { useState } from "react"
import { Gift, Sparkles, Star, Zap, Trophy } from "lucide-react"

interface GamificationData {
  coins: number
  dailyStreak: number
  level: number
  experience: number
  nextLevelExp: number
  badges: Array<{ id: string; name: string; icon: string; earned: boolean }>
}

export function GamificationWidget() {
  const [showCoinAnimation, setShowCoinAnimation] = useState(false)
  const [gamification, setGamification] = useState<GamificationData>({
    coins: 2450,
    dailyStreak: 12,
    level: 3,
    experience: 750,
    nextLevelExp: 1000,
    badges: [
      { id: "1", name: "First Purchase", icon: "🛍️", earned: true },
      { id: "2", name: "Loyalty Member", icon: "⭐", earned: true },
      { id: "3", name: "Flash Deal Master", icon: "⚡", earned: false },
      { id: "4", name: "Wishlist Collector", icon: "❤️", earned: false },
    ],
  })

  const spinReward = () => {
    const rewards = [50, 100, 150, 200, 300]
    const reward = rewards[Math.floor(Math.random() * rewards.length)]
    setGamification((prev) => ({
      ...prev,
      coins: prev.coins + reward,
    }))
    setShowCoinAnimation(true)
    setTimeout(() => setShowCoinAnimation(false), 1500)
  }

  const dailyLogin = () => {
    setGamification((prev) => ({
      ...prev,
      dailyStreak: prev.dailyStreak + 1,
      coins: prev.coins + 100,
    }))
  }

  const experiencePercentage = (gamification.experience / gamification.nextLevelExp) * 100

  return (
    <div className="space-y-4">
      {/* Level & Experience */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-4 border border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-bold">Level {gamification.level}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {gamification.experience}/{gamification.nextLevelExp} XP
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500"
            style={{ width: `${experiencePercentage}%` }}
          />
        </div>
      </div>

      {/* Coins Display */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold">Elegant Coins</span>
          </div>
          <span className="text-2xl font-bold text-primary">{gamification.coins}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Redeem your coins at checkout for discounts!</p>
        <div className="flex gap-2">
          <button
            onClick={spinReward}
            className="flex-1 bg-primary text-primary-foreground py-2 rounded font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Spin to Win
          </button>
          <button className="flex-1 border border-primary text-primary py-2 rounded font-semibold text-sm hover:bg-primary/10 transition">
            Redeem
          </button>
        </div>
      </div>

      {/* Daily Streak */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">Daily Streak</span>
          </div>
          <span className="text-lg font-bold text-yellow-500">{gamification.dailyStreak} days</span>
        </div>
        <button
          onClick={dailyLogin}
          className="w-full border border-yellow-500 text-yellow-600 py-2 rounded font-semibold text-sm hover:bg-yellow-50 transition"
        >
          Claim Daily Bonus
        </button>
      </div>

      {/* Badges */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Badges
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {gamification.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-2 rounded-lg text-center text-sm transition ${
                badge.earned ? "bg-primary/20 border border-primary" : "bg-muted border border-border opacity-40"
              }`}
            >
              <div className="text-xl mb-1">{badge.icon}</div>
              <p className="text-xs font-semibold line-clamp-2">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coin Animation */}
      {showCoinAnimation && (
        <div className="fixed bottom-32 right-8 animate-bounce z-50">
          <div className="text-4xl drop-shadow-lg">+💰</div>
        </div>
      )}
    </div>
  )
}
