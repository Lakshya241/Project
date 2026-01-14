"use client"

import { useState } from "react"
import { Lock, Bell, TrendingUp, Clock, FileText, Users } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Easy Submission",
    description: "Submit complaints with attachments, categorization, and detailed descriptions.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Instant updates on complaint status, responses, and resolution timelines.",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Track complaint trends, patterns, and metrics for data-driven improvements.",
  },
  {
    icon: Clock,
    title: "Quick Resolution",
    description: "Streamlined workflow ensures complaints are addressed promptly and efficiently.",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    description: "Secure system with confidential complaint handling and encrypted data.",
  },
  {
    icon: Users,
    title: "Community Feedback",
    description: "Anonymous complaint option and constructive feedback for institutional growth.",
  },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful <span className="text-indigo-600">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for effective complaint management and institutional improvement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group p-8 rounded-2xl border border-gray-200 bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    hoveredIndex === index ? "bg-indigo-600 text-white scale-110" : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
