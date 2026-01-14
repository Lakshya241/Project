"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"

interface Complaint {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  category: string
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<"All" | "Pending" | "Resolved">("All")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/")
    }
    setUser(parsedUser)
  }, [router])

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("/api/complaints")
        const data = await response.json()
        setComplaints(data.complaints || [])
      } catch (error) {
        console.error("Failed to fetch complaints", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  useEffect(() => {
    let filtered = complaints

    if (filter !== "All") {
      filtered = filtered.filter((c) => c.status === (filter === "Pending" ? "pending" : "resolved"))
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredComplaints(filtered)
  }, [complaints, filter, searchQuery])

  if (!mounted || !user) return null

  const totalTickets = complaints.length
  const pendingTickets = complaints.filter((c) => c.status === "pending").length
  const resolvedTickets = complaints.filter((c) => c.status === "resolved").length

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <AdminSidebar user={user} />

      <main className="flex-1 relative z-10">
        <div className="p-8">
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Complaints</h1>
            <p className="text-gray-600">Review and resolve student issues across the campus</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: "💬", label: "Total Tickets", value: totalTickets, color: "from-indigo-500 to-indigo-600" },
              { icon: "⏳", label: "Pending Issues", value: pendingTickets, color: "from-yellow-500 to-yellow-600" },
              { icon: "✅", label: "Resolved", value: resolvedTickets, color: "from-green-500 to-green-600" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by student, email or content..."
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
              </div>

              <div className="flex gap-2">
                {["All", "Pending", "Resolved"].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption as "All" | "Pending" | "Resolved")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      filter === filterOption
                        ? "bg-gray-900 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filterOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Complaints List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
              </div>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100 animate-in fade-in duration-700">
              <div className="text-6xl mb-4">ℹ️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matching complaints found.</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-700">
              {filteredComplaints.map((complaint, index) => (
                <div
                  key={complaint.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-102"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 100}ms both`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{complaint.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>
                          👤 {complaint.studentName} ({complaint.studentId})
                        </span>
                        <span>📧 {complaint.studentEmail}</span>
                      </div>
                      <p className="text-gray-700">{complaint.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(complaint.status)}`}
                      >
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {complaint.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span>ID: {complaint.id}</span>
                    <div className="flex gap-2">
                      {complaint.status !== "resolved" && (
                        <button
                          onClick={async () => {
                            const response = await fetch(`/api/complaints/${complaint.id}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ status: "resolved" }),
                            })
                            if (response.ok) {
                              setComplaints(
                                complaints.map((c) => (c.id === complaint.id ? { ...c, status: "resolved" } : c)),
                              )
                            }
                          }}
                          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition-colors"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
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
