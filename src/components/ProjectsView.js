'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import ProjectShowcase from '@/components/ProjectShowcase'

const PrismBackground = dynamic(() => import('@/components/PrismBackground'), { ssr: false })

export default function ProjectsView({ projects, groups }) {
  return (
    // Exactly one screen (the body already pads 80px for the navbar), so the page itself
    // never scrolls; the sidebar and the project card scroll inside themselves.
    <main className="relative h-[calc(100dvh-80px)] overflow-hidden">
      <PrismBackground />
      <Navbar />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1800px] flex-col px-4 py-3 md:px-6">
        <h1 className="sr-only">Projects</h1>
        <ProjectShowcase projects={projects} groups={groups} />
      </div>
    </main>
  )
}
