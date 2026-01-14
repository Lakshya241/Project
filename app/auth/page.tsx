"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const forcedRole = searchParams.get("role") as "student" | "admin" | null

  // 🔒 ROLE IS LOCKED HERE
  const role: "student" | "admin" = forcedRole === "admin" ? "admin" : "student"

  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password, role }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        setLoading(false)
        return
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push(role === "admin" ? "/admin/dashboard" : "/student/dashboard")
    } catch {
      setError("Network error. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {role === "admin" ? "Admin Login" : "Student Login"}
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {role === "admin" ? "Admin ID" : "Roll Number"}
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                placeholder={role === "admin" ? "admin" : "24CETXXX"}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
              />
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
