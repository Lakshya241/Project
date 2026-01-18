"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const forcedRole = searchParams.get("role") as "student" | "admin" | null
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

      router.push(
        data.user.role === "admin"
          ? "/admin/dashboard"
          : "/student/dashboard"
      )
      
    } catch {
      setError("Network error. Try again.")
    } finally {
      setLoading(false)
    }
  }
}
