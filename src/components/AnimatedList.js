'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { FaGithub, FaChevronDown, FaExpand, FaTimes } from 'react-icons/fa'

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

function Lightbox({ src, alt, onClose }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <FaTimes className="w-4 h-4" />
      </button>
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>,
    document.body
  )
}

function ProjectCard({ item }) {
  const [expanded, setExpanded] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const isPrivate = item.visibility === 'private'
  const hasGallery = Array.isArray(item.gallery) && item.gallery.length > 0
  const paragraphs = Array.isArray(item.details)
    ? item.details.filter(Boolean)
    : item.details
    ? [item.details]
    : []

  return (
    <div className="flex flex-col w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default">
      <div className="flex flex-row w-full" style={{ minHeight: '140px' }}>
        {/* Left: Image (narrow) */}
        <div className="relative w-44 md:w-56 flex-shrink-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03] text-gray-500 text-xs md:text-sm">
              Image coming soon
            </div>
          )}
        </div>

        {/* Right: Content (takes remaining space) */}
        <div className="flex flex-col justify-center flex-1 p-5 md:p-6 gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-bold text-white">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
              {item.deployed && (
                <span className="flex items-center justify-center gap-2 w-28 px-3 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-400/10 text-cyan-300 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Deployed
                </span>
              )}
              {item.visibility && (
                <span
                  className={`flex items-center justify-center w-28 px-3 py-1.5 rounded-full border text-sm capitalize ${
                    isPrivate
                      ? 'border-red-500/50 bg-red-500/10 text-red-400'
                      : 'border-green-500/50 bg-green-500/10 text-green-400'
                  }`}
                >
                  {item.visibility}
                </span>
              )}
              {!isPrivate && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-28 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-sm hover:bg-white/20 transition-colors duration-200"
                >
                  <FaGithub className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Expandable section */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-5 md:px-6 pt-4 pb-5 flex flex-col gap-4">
            {/* Details text — supports multiple paragraphs */}
            {paragraphs.length > 0 ? (
              <div className="flex flex-col gap-3">
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm md:text-base text-gray-300 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {isPrivate
                  ? 'This repository is private. Reach out for a walkthrough or access details.'
                  : 'More details coming soon.'}
              </p>
            )}

            {/* Gallery: two square slots (images added in the future) */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[0, 1].map((i) => {
                const src = hasGallery ? item.gallery[i] : null
                if (src) {
                  return (
                    <div
                      key={i}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5 cursor-pointer"
                      onClick={() => setLightboxSrc(src)}
                    >
                      <Image
                        src={src}
                        alt={`${item.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setLightboxSrc(src)
                        }}
                        className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/30 bg-black/60 backdrop-blur-sm text-white text-xs hover:bg-black/80 transition-colors duration-200"
                      >
                        <FaExpand className="w-3 h-3" />
                        <span>Click to expand</span>
                      </button>
                    </div>
                  )
                }
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center aspect-square rounded-lg border border-dashed border-white/15 bg-white/[0.03] text-gray-500 text-xs md:text-sm"
                  >
                    Image coming soon
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex items-center justify-center gap-2 w-full py-2 border-t border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors duration-200"
      >
        <span>{expanded ? 'Show less' : 'Show more'}</span>
        <FaChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={item.title}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  )
}

export default function AnimatedList({ items }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <AnimatedListItem key={index}>
            <ProjectCard item={item} />
          </AnimatedListItem>
        ))}
      </div>
    </div>
  )
}
