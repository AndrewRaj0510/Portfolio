'use client'

import { useEffect, useRef, useState } from 'react'

const animations = {
  fadeUp: {
    hidden: 'opacity-0 translate-y-16',
    visible: 'opacity-100 translate-y-0',
  },
  fadeDown: {
    hidden: 'opacity-0 -translate-y-16',
    visible: 'opacity-100 translate-y-0',
  },
  fadeLeft: {
    hidden: 'opacity-0 translate-x-20',
    visible: 'opacity-100 translate-x-0',
  },
  fadeRight: {
    hidden: 'opacity-0 -translate-x-20',
    visible: 'opacity-100 translate-x-0',
  },
  zoomIn: {
    hidden: 'opacity-0 scale-90',
    visible: 'opacity-100 scale-100',
  },
  blur: {
    hidden: 'opacity-0 blur-sm scale-95',
    visible: 'opacity-100 blur-0 scale-100',
  },
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = '',
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const anim = animations[variant] || animations.fadeUp

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? anim.visible : anim.hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
