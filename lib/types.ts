export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  profilePicture?: string
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  originalPrice?: number
  description: string
  images: string[]
  rating: number
  reviews: { author: string; text: string; rating: number }[]
  stock: number
  badge?: string
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  tax: number
  shipping: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
  deliveryInfo: {
    name: string
    email: string
    phone: string
    address: string
    postalCode: string
  }
}

export interface FormError {
  field: string
  message: string
}
