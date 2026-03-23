'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useRouter, usePathname } from 'next/navigation'
import { GoArrowUpRight } from 'react-icons/go'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef(null)
  const cardsRef = useRef([])
  const tlRef = useRef(null)

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 280

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content')
      if (contentEl) {
        const wasVis = contentEl.style.visibility
        const wasPE = contentEl.style.pointerEvents
        const wasPos = contentEl.style.position
        const wasH = contentEl.style.height

        contentEl.style.visibility = 'visible'
        contentEl.style.pointerEvents = 'auto'
        contentEl.style.position = 'static'
        contentEl.style.height = 'auto'
        contentEl.offsetHeight

        const h = 60 + contentEl.scrollHeight + 16

        contentEl.style.visibility = wasVis
        contentEl.style.pointerEvents = wasPE
        contentEl.style.position = wasPos
        contentEl.style.height = wasH

        return h
      }
    }
    return 280
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease: 'power3.out' })
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.1')

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl
    return () => { tl?.kill(); tlRef.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return
      if (isExpanded) {
        const newHeight = calculateHeight()
        gsap.set(navRef.current, { height: newHeight })
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) { newTl.progress(1); tlRef.current = newTl }
      } else {
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) tlRef.current = newTl
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const closeMenu = () => {
    if (!isExpanded) return
    const tl = tlRef.current
    if (!tl) return
    setIsHamburgerOpen(false)
    tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
    tl.reverse()
  }

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el
  }

  const handleNavClick = (href) => {
    closeMenu()
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    {
      label: 'Home',
      bgColor: 'var(--card-home)',
      textColor: 'var(--card-text)',
      links: [
        { label: 'Go to Home', href: '/', isHome: true },
      ],
    },
    {
      label: 'About',
      bgColor: 'var(--card-about)',
      textColor: 'var(--card-text)',
      links: [
        { label: 'Experience', href: '#experience' },
        { label: 'Education', href: '#education' },
        { label: 'Skills', href: '#skills' },
      ],
    },
    {
      label: 'Projects',
      bgColor: 'var(--card-projects)',
      textColor: 'var(--card-text)',
      links: [
        { label: 'View Projects', href: '/projects' },
      ],
    },
    {
      label: 'Contact',
      bgColor: 'var(--card-contact)',
      textColor: 'var(--card-text)',
      links: [
        { label: 'GitHub', href: 'https://github.com/AndrewRaj0510', external: true },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-isaac-raj-g-970648334/', external: true },
        { label: 'Connect with me', href: '#contact' },
      ],
    },
  ]

  return (
    <div className="card-nav-container">
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
      >
        {/* Top Bar */}
        <div className="card-nav-top">
          {/* LEFT: Hamburger */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* CENTER: Profile + Name */}
          <div className="logo-container">
            <div className="rounded-full overflow-hidden border-2 border-gray-500 w-8 h-8 flex-shrink-0">
              <Image
                src="/passport.jpg"
                alt="Profile Picture"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="ml-2 font-semibold text-gray-100 text-sm whitespace-nowrap">
              Andrew Isaac Raj G
            </span>
          </div>

          {/* RIGHT: Connect button */}
          <div className="flex items-center h-full">
            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                bg-gray-700 text-gray-200
                hover:bg-gray-600 transition-colors duration-200"
              aria-label="Connect"
            >
              <HiOutlineMail className="w-4 h-4" />
              <span className="hidden sm:inline">Connect</span>
            </button>
          </div>
        </div>

        {/* Expanded Menu Content */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((lnk, i) => {
                  if (lnk.external) {
                    return (
                      <a
                        key={i}
                        className="nav-card-link"
                        href={lnk.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lnk.label === 'GitHub' && <FaGithub className="nav-card-link-icon" />}
                        {lnk.label === 'LinkedIn' && <FaLinkedin className="nav-card-link-icon" />}
                        {lnk.label !== 'GitHub' && lnk.label !== 'LinkedIn' && (
                          <GoArrowUpRight className="nav-card-link-icon" />
                        )}
                        {lnk.label}
                      </a>
                    )
                  }

                  if (lnk.isHome) {
                    return (
                      <button
                        key={i}
                        className="nav-card-link"
                        onClick={() => {
                          closeMenu()
                          if (pathname === '/') {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          } else {
                            router.push('/')
                          }
                        }}
                      >
                        <GoArrowUpRight className="nav-card-link-icon" />
                        {lnk.label}
                      </button>
                    )
                  }

                  if (lnk.href === '/projects') {
                    return (
                      <button
                        key={i}
                        className="nav-card-link"
                        onClick={() => {
                          closeMenu()
                          router.push('/projects')
                        }}
                      >
                        <GoArrowUpRight className="nav-card-link-icon" />
                        {lnk.label}
                      </button>
                    )
                  }

                  return (
                    <button
                      key={i}
                      className="nav-card-link"
                      onClick={() => handleNavClick(lnk.href)}
                    >
                      {lnk.label === 'Connect with me'
                        ? <HiOutlineMail className="nav-card-link-icon" />
                        : <GoArrowUpRight className="nav-card-link-icon" />
                      }
                      {lnk.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
