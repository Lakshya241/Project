"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface CreateTicketFormProps {
  studentId: string
  studentName: string
  studentEmail: string
}

const categories = ["Academics", "Facilities", "Food & Dining", "Security", "Administration", "Other"]

export default function CreateTicketForm({ studentId, studentName, studentEmail }: CreateTicketFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          studentName,
          studentEmail,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to create ticket")
        setLoading(false)
        return
      }

      setFormData({ category: "", title: "", description: "" })
      router.push("/student/history")
    } catch (err) {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type message here"
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-400 resize-none"
              required
            ></textarea>
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
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  )
}
