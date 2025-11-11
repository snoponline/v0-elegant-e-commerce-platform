/**
 * WordPress Authentication Integration
 * Handles user login, registration, and JWT token management
 */

import { getWpApiUrl } from "./wordpress-config"

export interface WPUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  avatar_urls: Record<string, string>
}

export interface WPAuthToken {
  token: string
  user_email: string
  user_nicename: string
  user_display_name: string
}

/**
 * Authenticate user with WordPress
 */
export async function authenticateWPUser(username: string, password: string): Promise<WPAuthToken> {
  try {
    const response = await fetch(getWpApiUrl("/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) throw new Error("Authentication failed")
    return response.json()
  } catch (error) {
    console.error("WordPress authentication error:", error)
    throw error
  }
}

/**
 * Register new WordPress user
 */
export async function registerWPUser(userData: {
  username: string
  email: string
  password: string
  first_name?: string
  last_name?: string
}): Promise<WPUser> {
  try {
    const response = await fetch(getWpApiUrl("/users/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })

    if (!response.ok) throw new Error("Registration failed")
    return response.json()
  } catch (error) {
    console.error("WordPress registration error:", error)
    throw error
  }
}

/**
 * Get current user from WordPress
 */
export async function getCurrentWPUser(token: string): Promise<WPUser> {
  try {
    const response = await fetch(getWpApiUrl("/users/me"), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) throw new Error("Failed to fetch user")
    return response.json()
  } catch (error) {
    console.error("Error fetching WordPress user:", error)
    throw error
  }
}

/**
 * Update WordPress user profile
 */
export async function updateWPUser(userId: number, userData: Partial<WPUser>, token: string): Promise<WPUser> {
  try {
    const response = await fetch(getWpApiUrl(`/users/${userId}`), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) throw new Error("Failed to update user")
    return response.json()
  } catch (error) {
    console.error("Error updating WordPress user:", error)
    throw error
  }
}

/**
 * Request password reset from WordPress
 */
export async function requestWPPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(getWpApiUrl("/auth/forgot-password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) throw new Error("Password reset request failed")
    return response.json()
  } catch (error) {
    console.error("Error requesting password reset:", error)
    throw error
  }
}
