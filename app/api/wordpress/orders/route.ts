/**
 * API Route to handle WooCommerce order creation
 */

import { createWCOrder } from "@/lib/woocommerce"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    const order = await createWCOrder(orderData)
    return Response.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return Response.json({ error: "Failed to create order" }, { status: 500 })
  }
}
