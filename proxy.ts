import { NextResponse, type NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const role = req.cookies.get("role")?.value
  const pathname = req.nextUrl.pathname

  // Protect student routes
  if (pathname.startsWith("/student")) {
    if (!token || role !== "student") {
      return NextResponse.redirect(new URL("/auth", req.url))
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/auth", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/student/:path*", "/admin/:path*"],
}
