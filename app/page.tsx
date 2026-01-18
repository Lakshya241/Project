"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
export default function Home() {
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
