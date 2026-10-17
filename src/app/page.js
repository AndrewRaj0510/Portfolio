'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Myself'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

// Dynamic imports for WebGL components (no SSR)
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })
const PrismBackground = dynamic(() => import('@/components/PrismBackground'), { ssr: false })

// Module-level flag: survives client-side navigation (e.g. /projects -> /) but
// resets on a full page load, so the entrance plays once per visit.
let hasPlayedIntro = false

export default function Home() {
  const [loading, setLoading] = useState(() => !hasPlayedIntro)
  const [skipEntrance] = useState(() => hasPlayedIntro)

  const handleIntroComplete = () => {
    hasPlayedIntro = true
    setLoading(false)
  }

  return (
    <main className="relative min-h-screen">
      <PrismBackground />
      {loading && <LoadingScreen onComplete={handleIntroComplete} />}
      <Navbar />

      <ScrollReveal variant="fadeDown" duration={900} initiallyVisible={skipEntrance}>
        <section id="home">
          <Hero />
        </section>
      </ScrollReveal>

      <About />

      <ScrollReveal variant="fadeUp" duration={800}>
        <Skills />
      </ScrollReveal>

      <Experience />

      <ScrollReveal variant="blur" duration={600}>
        <Footer />
      </ScrollReveal>
    </main>
  )
}
