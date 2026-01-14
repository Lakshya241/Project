"use client"

import { CheckCircle, Users, BarChart3, MessageCircle } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    title: "Lodge Complaint",
    description:
      "Students can easily submit their complaints through our intuitive platform with detailed descriptions.",
  },
  {
    icon: CheckCircle,
    title: "Get Tracked",
    description: "Each complaint is assigned a unique ID and tracked in real-time with status updates.",
  },
  {
    icon: Users,
    title: "Admin Reviews",
    description: "Administrators review, categorize, and prioritize complaints for appropriate action.",
  },
  {
    icon: BarChart3,
    title: "Resolution & Insights",
    description: "Complaints are resolved with feedback, and analytics help improve campus systems.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It <span className="text-indigo-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple 4-step process to make complaint management seamless and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-indigo-100 text-indigo-600 font-bold text-lg">
                    {index + 1}
                  </div>

                  <Icon size={28} className="text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-transparent"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
