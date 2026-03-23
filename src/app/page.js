'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Myself'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

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

      <ScrollReveal variant="fadeDown" duration={900}>
        <section id="home">
          <Hero />
        </section>
      </ScrollReveal>

      <ScrollReveal variant="fadeUp" duration={800}>
        <About />
      </ScrollReveal>

      <ScrollReveal variant="fadeUp" duration={800}>
        <Skills />
      </ScrollReveal>

      <ScrollReveal variant="zoomIn" duration={800}>
        <Contact />
      </ScrollReveal>

      <ScrollReveal variant="blur" duration={600}>
        <Footer />
      </ScrollReveal>
    </main>
  )
}
