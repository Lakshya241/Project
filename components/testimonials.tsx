"use client"

import { useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    title: "Satisfied Customers",
    description:
      "Our platform has transformed how we handle customer feedback and complaints. The streamlined process has improved response times by 300% and customer satisfaction scores have increased significantly.",
    rating: 5,
    author: "Sarah Johnson",
    company: "TechCorp Solutions",
  },
  {
    title: "Valued Feedback",
    description:
      "The analytics capabilities are exceptional. We now have clear visibility into complaint patterns and can proactively address issues before they escalate. It has been game-changing for our operations.",
    rating: 5,
    author: "Michael Chen",
    company: "Global Innovations Inc.",
  },
  {
    title: "Transformative Impact",
    description:
      "Switching to this platform was one of the best decisions we made. The automation features save our team hours every week, and the reporting gives us insights we never had before.",
    rating: 5,
    author: "Emily Rodriguez",
    company: "Premier Services Ltd.",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Join thousands of companies transforming their complaint management</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 transform ${
                activeIndex === index
                  ? "bg-white border-2 border-blue-600 shadow-2xl scale-105"
                  : "bg-gray-50 border border-gray-200 hover:border-blue-300"
              } animate-in fade-in slide-in-from-bottom`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{testimonial.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{testimonial.description}</p>

              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
