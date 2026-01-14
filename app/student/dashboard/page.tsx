"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import StudentSidebar from "@/components/student-sidebar"
import CreateTicketForm from "@/components/create-ticket-form"

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
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

  if (!mounted || !user) return null

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Support Ticket</h1>
            <p className="text-gray-600">Submit a new complaint and we'll help resolve it</p>
          </div>

          <CreateTicketForm studentId={user.id} studentName={user.name} studentEmail={user.email} />
        </div>
      </main>
    </div>
  )
}
