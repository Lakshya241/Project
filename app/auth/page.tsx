"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [role, setRole] = useState<"student" | "admin" | null>(null)
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "student" || roleParam === "admin") {
      setRole(roleParam)
    }
  }, [searchParams])

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

      document.cookie = `token=${data.token}; path=/; max-age=86400`
      document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=86400`

      if (role === "student") {
        router.push("/student/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Complaint System</h1>
            <p className="text-gray-600 text-lg">Select your role to continue</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Login Button */}
            <button
              onClick={() => setRole("student")}
              className="group relative overflow-hidden p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:text-white transition-colors">🎓</div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors mb-2">
                  Student Login
                </h2>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors">
                  Submit and track your complaints
                </p>
              </div>
            </button>

            {/* Admin Login Button */}
            <button
              onClick={() => setRole("admin")}
              className="group relative overflow-hidden p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:text-white transition-colors">👨‍💼</div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors mb-2">
                  Admin Login
                </h2>
                <p className="text-gray-600 group-hover:text-purple-100 transition-colors">
                  Manage and resolve complaints
                </p>
              </div>
            </button>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <button
            onClick={() => {
              setRole(null)
              setId("")
              setPassword("")
              setError("")
            }}
            className="mb-6 text-indigo-600 hover:text-indigo-700 flex items-center gap-2 font-medium transition-colors"
          >
            ← Back
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {role === "student" ? "Student Login" : "Admin Login"}
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {role === "student" ? "Roll Number" : "Admin ID"}
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder={role === "student" ? "e.g., 24CET345" : "e.g., admin"}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-400"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                {role === "student" ? (
                  <>
                    Demo credentials: <br />
                    ID: 24CET345 | Password: 123456
                  </>
                ) : (
                  <>
                    Demo credentials: <br />
                    ID: admin | Password: admin
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
