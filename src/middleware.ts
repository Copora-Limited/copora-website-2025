import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add cache control headers for static assets
  if (
    request.nextUrl.pathname.startsWith("/images/") ||
    request.nextUrl.pathname.startsWith("/assets/") ||
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/)
  ) {
    response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=31536000") // 1 day, stale for 1 year
  }

  // Add cache control headers for fonts
  if (request.nextUrl.pathname.startsWith("/fonts/") || request.nextUrl.pathname.match(/\.(woff|woff2|ttf|otf)$/)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable") // 1 year, immutable
  }

  // Add cache control headers for videos
  if (request.nextUrl.pathname.startsWith("/videos/") || request.nextUrl.pathname.match(/\.(mp4|webm)$/)) {
    response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800") // 1 day, stale for 1 week
  }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/images/:path*",
    "/assets/:path*",
    "/fonts/:path*",
    "/videos/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
