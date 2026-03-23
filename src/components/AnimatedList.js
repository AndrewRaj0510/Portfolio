'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

function AnimatedListItem({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transitionDuration: '700ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0) scale(1)'
          : 'translateY(40px) scale(0.97)',
        filter: isVisible ? 'blur(0px)' : 'blur(6px)',
      }}
    >
      {children}
    </div>
  )
}

export default function AnimatedList({ items }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <AnimatedListItem key={index}>
            <div className="flex flex-row w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] transition-all duration-300 cursor-default"
              style={{ minHeight: '140px' }}
            >
              {/* Left: Image (narrow) */}
              <div className="relative w-44 md:w-56 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right: Content (takes remaining space) */}
              <div className="flex flex-col justify-center flex-1 p-5 md:p-6 gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-sm hover:bg-white/20 transition-colors duration-200 flex-shrink-0 ml-4"
                  >
                    <FaGithub className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </AnimatedListItem>
        ))}
      </div>
    </div>
  )
}
