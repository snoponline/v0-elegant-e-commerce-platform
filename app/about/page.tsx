"use client"

import Link from "next/link"
import { Zap, Users, Heart, Award, TrendingUp, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">About Snop</h1>
          <p className="text-lg text-foreground/80">
            Your premier online marketplace for quality products at unbeatable prices
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At Snop, we believe everyone deserves access to quality products without breaking the bank. Our mission is
              to revolutionize online shopping by offering premium items at competitive prices, making luxury accessible
              to all South Africans.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We envision becoming Africa's most trusted and fastest-growing e-commerce platform, delivering exceptional
              value, service, and innovation to millions of customers while supporting local businesses and creators.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Heart className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Customer First</h3>
              <p className="text-muted-foreground">
                We prioritize customer satisfaction and build everything around your needs and feedback.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously improve our platform with cutting-edge technology and creative solutions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-muted-foreground">
                Every product is carefully selected to ensure it meets our high quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Snop */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Snop?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-primary mt-1" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Best Prices Guaranteed</h3>
              <p className="text-muted-foreground">
                We offer competitive pricing with frequent flash deals and exclusive discounts for our community
                members.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Zap className="w-6 h-6 text-primary mt-1" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Fast & Reliable Shipping</h3>
              <p className="text-muted-foreground">
                Quick delivery throughout South Africa with real-time tracking and excellent customer support.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Users className="w-6 h-6 text-primary mt-1" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Community Focused</h3>
              <p className="text-muted-foreground">
                Join thousands of satisfied customers earning rewards and enjoying exclusive member benefits.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Globe className="w-6 h-6 text-primary mt-1" />
            </div>
            <div>
              <h3 className="font-bold mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">
                Browse thousands of products across 30+ categories from electronics to fashion to home goods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-primary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">500K+</div>
              <p className="text-foreground/80">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">50K+</div>
              <p className="text-foreground/80">Products Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">30+</div>
              <p className="text-foreground/80">Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">2M+</div>
              <p className="text-foreground/80">Orders Shipped</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-muted p-12 rounded-lg text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Start Shopping?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our growing community and discover amazing deals on thousands of products. Sign up today and get 10%
            off your first order!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/help-center"
              className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm opacity-80">
          <p>© 2025 Snop Online Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
