"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import StudentSidebar from "@/components/student-sidebar"

interface Complaint {
  id: string
  category: string
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: string
  updatedAt: string
}

export default function StudentHistory() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  useEffect(() => {
    if (!user) return

    const fetchComplaints = async () => {
      try {
        const response = await fetch(`/api/complaints?studentId=${user.id}`)
        const data = await response.json()
        setComplaints(data.complaints || [])
      } catch (error) {
        console.error("Failed to fetch complaints", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [user])

  if (!mounted || !user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "resolved":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳"
      case "in-progress":
        return "⚙️"
      case "resolved":
        return "✅"
      default:
        return "❓"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <StudentSidebar user={user} />

      <main className="flex-1 relative z-10">
        <div className="p-8">
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Complaint History</h1>
            <p className="text-gray-600">View all your submitted complaints</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
              </div>
            </div>
          ) : complaints.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100 animate-in fade-in duration-700">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No complaints yet</h3>
              <p className="text-gray-600">Start by creating your first complaint ticket</p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-700">
              {complaints.map((complaint, index) => (
                <div
                  key={complaint.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-102 transform"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 100}ms both`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getStatusIcon(complaint.status)}</span>
                        <h3 className="text-xl font-bold text-gray-900">{complaint.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{complaint.category}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(complaint.status)}`}
                    >
                      {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{complaint.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span>ID: {complaint.id}</span>
                    <span>
                      Created:{" "}
                      {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
