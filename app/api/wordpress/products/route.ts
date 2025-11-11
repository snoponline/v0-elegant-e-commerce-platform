/**
 * API Route to proxy WooCommerce products
 * Allows client-side requests without exposing API credentials
 */

import { fetchWCProducts } from "@/lib/woocommerce"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams)

    const products = await fetchWCProducts(params)
    return Response.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return Response.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
