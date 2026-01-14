import { type NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  const studentRoutes = ["/student/dashboard", "/student/history"]
  const adminRoutes = ["/admin/dashboard"]
  const isStudentRoute = studentRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  if ((isStudentRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/student/:path*", "/admin/:path*"],
}
