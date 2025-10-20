'use client'
import React, { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { Engine } from "@tsparticles/engine"
import { loadFull } from "tsparticles"

export default function AIBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <div className="relative w-full h-full bg-white dark:bg-dark overflow-hidden">
        {/* Primary gradient */}
        <div className="absolute -top-[20%] -right-[20%] w-[500px] h-[500px] rounded-full bg-blue-300/50 dark:bg-blue-500/20 blur-[100px]" />
        
        {/* Secondary gradient */}
        <div className="absolute -bottom-[20%] -left-[20%] w-[500px] h-[500px] rounded-full bg-blue-400/50 dark:bg-purple-500/20 blur-[100px]" />
        
        {/* Optional third gradient for more depth */}
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-blue-200/40 dark:bg-cyan-500/10 blur-[100px]" />
      </div>
    </div>
  )
}