# WordPress & WooCommerce Integration Guide

## Overview
This Next.js eCommerce site is configured to integrate with WordPress and WooCommerce as the backend. The frontend will pull product data, manage orders, and sync users with WordPress.

## Setup Instructions

### 1. WordPress Installation
- Install WordPress on your hosting
- Install and configure WooCommerce plugin
- Install WooCommerce REST API plugin (if needed for your version)

### 2. Environment Variables
Add these to your `.env.local` and Vercel dashboard:

\`\`\`env
# WordPress REST API
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
WORDPRESS_CONSUMER_KEY=your_consumer_key
WORDPRESS_CONSUMER_SECRET=your_consumer_secret
WORDPRESS_JWT_SECRET=your_jwt_secret
\`\`\`

### 3. WooCommerce API Setup
1. Go to WordPress Admin → WooCommerce → Settings → Advanced → REST API
2. Click "Create an API Key"
3. Set permissions to "Read/Write"
4. Copy the Consumer Key and Consumer Secret
5. Add them to your environment variables

### 4. JWT Authentication (Optional)
1. Install JWT Auth plugin on WordPress
2. Configure JWT secret in WordPress
3. Add JWT_SECRET to environment variables

## API Integration

### Products
\`\`\`typescript
import { fetchWCProducts, fetchWCProduct } from '@/lib/woocommerce'

// Fetch all products
const products = await fetchWCProducts({ per_page: 20 })

// Fetch single product
const product = await fetchWCProduct(123)
\`\`\`

### Orders
\`\`\`typescript
import { createWCOrder, fetchWCCustomerOrders } from '@/lib/woocommerce'

// Create order
const order = await createWCOrder({
  billing: { ... },
  shipping: { ... },
  line_items: [ ... ]
})

// Fetch customer orders
const orders = await fetchWCCustomerOrders(customerId)
\`\`\`

### Cart Management
\`\`\`typescript
import { updateWCCartItem, removeFromWCCart } from '@/lib/woocommerce'

// Update cart item
await updateWCCartItem(cartKey, 5)

// Remove from cart
await removeFromWCCart(cartKey)
\`\`\`

### Authentication
\`\`\`typescript
import { authenticateWPUser, registerWPUser, getCurrentWPUser } from '@/lib/wordpress-auth'

// Login
const token = await authenticateWPUser(username, password)

// Register
const user = await registerWPUser({ username, email, password })

// Get current user
const user = await getCurrentWPUser(token)
\`\`\`

## Elementor Integration

### Modifying Pages
1. Edit pages/posts in WordPress using Elementor
2. Changes sync to the Next.js frontend through the WP REST API
3. No need to rebuild - changes appear immediately

### Custom Elementor Widgets
Create custom widgets in WordPress that render through API endpoints

## Store Synchronization

### Products Auto-Sync
- Products are fetched dynamically from WooCommerce
- Changes in WordPress admin appear instantly on the frontend
- Product images, descriptions, and pricing are synced

### Orders Auto-Sync
- Orders placed on the frontend create entries in WooCommerce
- Customer dashboard syncs orders from WordPress
- Email notifications sent via WooCommerce

### User Sync
- New registrations create WordPress users
- User data synced between Next.js and WordPress
- JWT tokens used for session management

## Troubleshooting

### API Connection Issues
1. Verify WordPress URL is correct
2. Check Consumer Key/Secret are valid
3. Ensure WooCommerce REST API is enabled
4. Check WordPress server allows external requests

### Product Not Showing
1. Verify products are published in WordPress
2. Check product stock is not zero
3. Ensure product category is visible

### Order Creation Failures
1. Verify billing/shipping addresses are complete
2. Check product inventory in WooCommerce
3. Ensure payment gateway is configured

## Security Notes

- Never expose API credentials in client-side code
- Use environment variables for all secrets
- Implement rate limiting on API routes
- Validate all user inputs server-side
- Use HTTPS for all API communications
- Keep WordPress and plugins updated

## Performance Optimization

- Implement caching for product lists
- Use WooCommerce REST API pagination
- Lazy load product images
- Cache API responses with Next.js revalidation
- Use CDN for product images
