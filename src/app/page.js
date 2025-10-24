'use client'
import AIBackground from '@/components/Background'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Myself'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AIBackground />
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