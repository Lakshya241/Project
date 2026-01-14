"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface StudentSidebarProps {
  user: {
    id: string
    name: string
    email: string
  }
}

export default function StudentSidebar({ user }: StudentSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col relative z-20">
      <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-gray-900">StudentPortal</h2>
            <p className="text-xs text-gray-500">{user.id}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        <Link
          href="/student/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
            isActive("/student/dashboard")
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <span className="text-xl">➕</span>
          <span className="font-medium">Create Ticket</span>
        </Link>

        <Link
          href="/student/history"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
            isActive("/student/history")
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <span className="text-xl">🕐</span>
          <span className="font-medium">History</span>
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 font-medium w-full"
      >
        <span className="text-xl">➡️</span>
        Logout
      </button>
    </aside>
  )
}
