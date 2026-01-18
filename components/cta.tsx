"use client"

export default function CallToAction() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,%3Csvg%20width=100%20height=100%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id=%22grid%22%20width=%22100%22%20height=%22100%22%20patternUnits=%22userSpaceOnUse%22%3E%3Cpath%20d=%22M%20100%200%20L%200%200%200%20100%22%20fill=%22none%22%20stroke=%22white%22%20strokeWidth=%220.5%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20fill=%22white%22%20fillOpacity=%220.05%22/%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20fill=%22url(%23grid)%22%20/%3E%3C/svg%3E')]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom duration-700">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Complaint Management?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join hundreds of companies that have already improved their customer satisfaction and operational efficiency
          with Jitara.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Free Trial
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            Schedule a Demo
          </button>
        </div>

        <p className="text-blue-100 text-sm mt-8">No credit card required. Get instant access to all features.</p>
      </div>
    </section>
  )
}
