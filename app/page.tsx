"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'X') {
        router.push('/auth?role=admin') // Adjust path if different
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  )
}
