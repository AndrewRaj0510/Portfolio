'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'

export default function Lightbox({ src, alt, onClose }) {
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
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <FaTimes className="w-4 h-4" />
      </button>
      {/* Scrolls rather than shrinks, so tall full-page screenshots stay readable */}
      <div
        className="max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} className="block h-auto w-auto max-w-full" />
      </div>
    </div>,
    document.body
  )
}
