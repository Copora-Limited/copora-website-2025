/**
 * Utility functions for API caching
 */

// Cache API responses in memory
const apiCache = new Map<string, { data: any; timestamp: number }>()
const DEFAULT_CACHE_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

/**
 * Fetches data with caching
 * @param url The URL to fetch
 * @param options Fetch options
 * @param cacheTime Cache time in milliseconds (default: 5 minutes)
 */
export async function fetchWithCache(
  url: string,
  options?: RequestInit,
  cacheTime: number = DEFAULT_CACHE_TIME,
): Promise<any> {
  const cacheKey = `${url}-${JSON.stringify(options)}`
  const cached = apiCache.get(cacheKey)

  // Return cached data if it exists and is not expired
  if (cached && Date.now() - cached.timestamp < cacheTime) {
    return cached.data
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Cache the new data
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })

    return data
  } catch (error) {
    console.error("Error fetching data:", error)

    // If we have stale data, return it as fallback
    if (cached) {
      console.log("Returning stale cached data as fallback")
      return cached.data
    }

    throw error
  }
}

/**
 * Clears the API cache
 * @param url Optional URL to clear specific cache entry
 */
export function clearApiCache(url?: string): void {
  if (url) {
    // Clear specific cache entries that start with the URL
    for (const key of apiCache.keys()) {
      if (key.startsWith(url)) {
        apiCache.delete(key)
      }
    }
  } else {
    // Clear all cache
    apiCache.clear()
  }
}
