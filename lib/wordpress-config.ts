/**
 * WordPress & WooCommerce Configuration
 * Configure these environment variables in your .env.local or Vercel dashboard
 */

export const WORDPRESS_CONFIG = {
  // WordPress REST API endpoint
  apiUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://your-wordpress-site.com",

  // WooCommerce REST API version
  apiVersion: "wc/v3",

  // Consumer key and secret for API authentication
  consumerKey: process.env.WORDPRESS_CONSUMER_KEY,
  consumerSecret: process.env.WORDPRESS_CONSUMER_SECRET,

  // JWT Token for user authentication (optional)
  jwtSecret: process.env.WORDPRESS_JWT_SECRET,
}

/**
 * Get the full API endpoint URL
 */
export function getWpApiUrl(endpoint: string): string {
  const baseUrl = WORDPRESS_CONFIG.apiUrl?.replace(/\/$/, "")
  return `${baseUrl}/wp-json/${WORDPRESS_CONFIG.apiVersion}${endpoint}`
}

/**
 * Get Basic Auth header for WooCommerce API
 */
export function getWpAuthHeader(): HeadersInit {
  const credentials = `${WORDPRESS_CONFIG.consumerKey}:${WORDPRESS_CONFIG.consumerSecret}`
  const encoded = Buffer.from(credentials).toString("base64")

  return {
    Authorization: `Basic ${encoded}`,
    "Content-Type": "application/json",
  }
}
