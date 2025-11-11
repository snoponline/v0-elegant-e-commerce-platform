/**
 * WooCommerce Integration Utilities
 * Handles all product, cart, order, and customer operations
 */

import { getWpApiUrl, getWpAuthHeader } from "./wordpress-config"

export interface WCProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  stock_quantity: number
  in_stock: boolean
  categories: { id: number; name: string }[]
  images: { src: string; name: string; alt: string }[]
  rating_count: number
  average_rating: string
}

export interface WCCart {
  items: WCCartItem[]
  subtotal: string
  total: string
  total_tax: string
  shipping_total: string
}

export interface WCCartItem {
  key: string
  product_id: number
  variation_id: number
  quantity: number
  name: string
  price: string
  total: string
}

export interface WCOrder {
  id: number
  order_key: string
  status: string
  date_created: string
  total: string
  currency: string
  line_items: WCOrderItem[]
  billing: WCAddress
  shipping: WCAddress
}

export interface WCOrderItem {
  id: number
  product_id: number
  name: string
  quantity: number
  price: string
  total: string
}

export interface WCAddress {
  first_name: string
  last_name: string
  email: string
  phone: string
  address_1: string
  city: string
  state: string
  postcode: string
  country: string
}

/**
 * Fetch products from WooCommerce
 */
export async function fetchWCProducts(params?: Record<string, string | number>): Promise<WCProduct[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value))
      })
    }

    const url = `${getWpApiUrl("/products")}?${queryParams.toString()}`
    const response = await fetch(url, {
      headers: getWpAuthHeader(),
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`WooCommerce API error: ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error)
    throw error
  }
}

/**
 * Fetch single product by ID
 */
export async function fetchWCProduct(productId: number): Promise<WCProduct> {
  try {
    const response = await fetch(getWpApiUrl(`/products/${productId}`), {
      headers: getWpAuthHeader(),
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`Failed to fetch product: ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error("Error fetching WooCommerce product:", error)
    throw error
  }
}

/**
 * Fetch categories from WooCommerce
 */
export async function fetchWCCategories(): Promise<any[]> {
  try {
    const response = await fetch(getWpApiUrl("/products/categories"), {
      headers: getWpAuthHeader(),
      cache: "revalidate-tag",
    })

    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error("Error fetching WooCommerce categories:", error)
    throw error
  }
}

/**
 * Create order in WooCommerce
 */
export async function createWCOrder(orderData: any): Promise<WCOrder> {
  try {
    const response = await fetch(getWpApiUrl("/orders"), {
      method: "POST",
      headers: getWpAuthHeader(),
      body: JSON.stringify(orderData),
    })

    if (!response.ok) throw new Error(`Failed to create order: ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error("Error creating WooCommerce order:", error)
    throw error
  }
}

/**
 * Fetch customer orders from WooCommerce
 */
export async function fetchWCCustomerOrders(customerId: number): Promise<WCOrder[]> {
  try {
    const response = await fetch(getWpApiUrl(`/orders?customer=${customerId}`), {
      headers: getWpAuthHeader(),
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`Failed to fetch orders: ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error("Error fetching WooCommerce orders:", error)
    throw error
  }
}

/**
 * Update cart item quantity in WooCommerce
 */
export async function updateWCCartItem(cartKey: string, quantity: number): Promise<WCCartItem> {
  try {
    const response = await fetch(getWpApiUrl(`/cart/items/${cartKey}`), {
      method: "PUT",
      headers: getWpAuthHeader(),
      body: JSON.stringify({ quantity }),
    })

    if (!response.ok) throw new Error(`Failed to update cart: ${response.statusText}`)
    return response.json()
  } catch (error) {
    console.error("Error updating WooCommerce cart:", error)
    throw error
  }
}

/**
 * Remove item from WooCommerce cart
 */
export async function removeFromWCCart(cartKey: string): Promise<void> {
  try {
    const response = await fetch(getWpApiUrl(`/cart/items/${cartKey}`), {
      method: "DELETE",
      headers: getWpAuthHeader(),
    })

    if (!response.ok) throw new Error(`Failed to remove from cart: ${response.statusText}`)
  } catch (error) {
    console.error("Error removing from WooCommerce cart:", error)
    throw error
  }
}
