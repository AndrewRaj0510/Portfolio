'use client'
import AIBackground from '@/components/Background'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Myself'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AIBackground />
      <Navbar />
      <Hero />
    </main>
  )
}