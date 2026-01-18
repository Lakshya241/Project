"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Complaint System
        </Link>

        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">
            How It Works
          </Link>
          <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex gap-4">
          <button className="px-6 py-2 text-gray-700 hover:text-indigo-600 transition-colors">Contact</button>
          <Link href="/auth/student">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-4 animate-in slide-in-from-top-2">
          <Link href="/" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link href="#" className="block text-gray-700 hover:text-indigo-600">
            Features
          </Link>
          <Link href="#" className="block text-gray-700 hover:text-indigo-600">
            How It Works
          </Link>
          <Link href="#" className="block text-gray-700 hover:text-indigo-600">
            About
          </Link>
          <Link href="/auth/student" className="block text-indigo-600 font-semibold">
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}
