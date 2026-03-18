'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Myself'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Dynamic imports for WebGL components (no SSR)
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })
const PrismBackground = dynamic(() => import('@/components/PrismBackground'), { ssr: false })

export default function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <main className="relative min-h-screen">
      <PrismBackground />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Navbar />
      <section id="home" className="...">
        <Hero />
      </section>
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
