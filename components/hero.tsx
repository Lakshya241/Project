"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import type * as THREE from "three"
import Link from "next/link"

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const animate = () => {
      mesh.rotation.x += 0.003
      mesh.rotation.y += 0.005
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  )
}

export default function Hero() {
  const [adminRevealed, setAdminRevealed] = useState(false)
  const clickCountRef = useRef(0)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleTextClick = () => {
    clickCountRef.current += 1

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    if (clickCountRef.current === 3) {
      setAdminRevealed(true)
      clickCountRef.current = 0
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0
      }, 500)
    }
  }

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-indigo-50 to-white min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
            Campus Complaint Management
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Elevate Your <span className="text-indigo-600">Complaint Experience</span>
          </h1>

          <p
            onClick={handleTextClick}
            className="text-xl text-gray-600 leading-relaxed cursor-pointer hover:text-indigo-600 transition-colors group relative select-none"
            title="Psst... click 3 times here to reveal the admin entrance!"
          >
            Lodge, track, and resolve complaints efficiently. Our platform helps students voice their concerns and
            administrators manage them with ease.
            <span className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-0.5 bg-indigo-600 transition-all duration-300"></span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth?role=student">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl">
                Student Portal
              </button>
            </Link>

            {adminRevealed && (
              <Link href="/auth?role=admin">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl animate-in fade-in scale-in duration-500">
                  Admin Dashboard
                </button>
              </Link>
            )}
          </div>

          {adminRevealed && (
            <p className="text-sm text-purple-600 font-semibold animate-in fade-in duration-500">
              ✨ You found the secret entrance! Welcome, Admin.
            </p>
          )}
        </div>

        <div className="relative h-[500px] animate-in fade-in slide-in-from-right duration-1000 delay-300">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Environment preset="studio" />
            <RotatingCube />
            <OrbitControls autoRotate autoRotateSpeed={4} />
          </Canvas>

          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none rounded-2xl"></div>
        </div>
      </div>
    </section>
  )
}
