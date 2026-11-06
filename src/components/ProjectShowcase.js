'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight, FaExpand, FaGithub } from 'react-icons/fa'
import Lightbox from '@/components/Lightbox'

const TABS = ['Overview', 'How it works', 'Tech stack']
const SLIDE_INTERVAL_MS = 4000

// The gallery leads; a project with only a cover shows that as its single slide.
function getSlides(project) {
  if (project.gallery?.length) return project.gallery
  return project.image ? [project.image] : []
}

function StatusBadges({ project }) {
  const isPrivate = project.visibility === 'private'

  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.deployed && (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-400/10 text-cyan-300 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Deployed
        </span>
      )}
      <span
        className={`px-3 py-1.5 rounded-full border text-sm capitalize ${
          isPrivate
            ? 'border-red-500/50 bg-red-500/10 text-red-400'
            : 'border-green-500/50 bg-green-500/10 text-green-400'
        }`}
      >
        {project.visibility}
      </span>
      {!isPrivate && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-sm hover:bg-white/20 transition-colors duration-200"
        >
          <FaGithub className="w-4 h-4" />
          GitHub
        </a>
      )}
    </div>
  )
}

function SlideDeck({ project }) {
  const slides = getSlides(project)
  const [slideIndex, setSlideIndex] = useState(0)
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const stripRef = useRef(null)
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])
  const src = slides[slideIndex]
  const hasMany = slides.length > 1
  const step = (delta) =>
    setSlideIndex((i) => (i + delta + slides.length) % slides.length)
  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full border border-white/30 bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors duration-200'

  // Restarts on every slide change, so a manual click also gets its full 4 seconds.
  useEffect(() => {
    if (!hasMany || isPaused || lightboxSrc) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setTimeout(
      () => setSlideIndex((i) => (i + 1) % slides.length),
      SLIDE_INTERVAL_MS
    )
    return () => clearTimeout(timer)
  }, [slideIndex, hasMany, isPaused, lightboxSrc, slides.length])

  // Moves only the thumbnail strip: scrollIntoView could also pull the card's scroll position.
  useEffect(() => {
    const strip = stripRef.current
    const thumb = strip?.children[slideIndex]
    if (!thumb) return
    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [slideIndex])

  return (
    <div className="flex flex-col gap-3 min-w-0 xl:min-h-0 xl:overflow-y-auto">
      {/* Pauses for a mouse on the deck or keyboard focus in it. Touch and mouse clicks don't
          pause it: a tap never fires pointerleave, so it would stay stuck. */}
      <div
        onPointerEnter={(e) => e.pointerType === 'mouse' && setIsPaused(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setIsPaused(false)}
        onFocus={(e) => e.target.matches(':focus-visible') && setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="relative flex-none aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/60 xl:flex-initial xl:aspect-[16/10] xl:min-h-56"
      >
        {src ? (
          <button
            type="button"
            onClick={() => setLightboxSrc(src)}
            aria-label={`Expand ${project.title} screenshot ${slideIndex + 1}`}
            className="group absolute inset-0 cursor-zoom-in"
          >
            {slides.map((slide, i) => (
              <Image
                key={slide}
                src={slide}
                alt=""
                fill
                loading="eager"
                sizes="(min-width: 1280px) 50vw, 100vw"
                className={`object-contain transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                  i === slideIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <span className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/30 bg-black/60 backdrop-blur-sm text-white text-xs group-hover:bg-black/80 transition-colors duration-200">
              <FaExpand className="w-3 h-3" />
              Click to expand
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Image coming soon
          </div>
        )}

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className={`${arrowClass} left-3`}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className={`${arrowClass} right-3`}
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs">
              {slideIndex + 1} of {slides.length}
            </span>
          </>
        )}
      </div>

      {/* Both rows below keep their space when empty, so the deck is the same size on every project */}
      <div
        ref={stripRef}
        className={`relative flex-none gap-2 overflow-x-auto pb-1 xl:h-[3.75rem] ${
          hasMany ? 'flex' : 'hidden xl:flex'
        }`}
      >
        {hasMany &&
          slides.map((thumb, i) => (
            <button
              key={thumb}
              type="button"
              onClick={() => setSlideIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === slideIndex ? 'true' : undefined}
              className={`relative flex-none w-24 h-14 overflow-hidden rounded-md border-2 bg-black transition-all duration-200 ${
                i === slideIndex
                  ? 'border-cyan-300 opacity-100'
                  : 'border-white/15 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={thumb}
                alt=""
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </button>
          ))}
      </div>

      <p
        className={`flex-none text-xs text-gray-400 xl:min-h-8 ${
          project.imageCredit ? '' : 'hidden xl:block'
        }`}
      >
        {project.imageCredit && (
          <>
            {project.imageCredit.text}{' '}
            <a
              href={project.imageCredit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Credits
            </a>
          </>
        )}
      </p>

      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={`${project.title} screenshot ${slideIndex + 1}`}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}

function DetailTabs({ project }) {
  const [tabIndex, setTabIndex] = useState(0)
  const baseId = useId()

  const onTabKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const delta = e.key === 'ArrowRight' ? 1 : -1
    setTabIndex((i) => (i + delta + TABS.length) % TABS.length)
  }

  return (
    <div className="flex flex-col gap-4 min-w-0 xl:min-h-0">
      <div
        role="tablist"
        aria-label={`${project.title} details`}
        onKeyDown={onTabKeyDown}
        className="flex flex-none gap-1 border-b border-white/15"
      >
        {TABS.map((name, i) => (
          <button
            key={name}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === tabIndex}
            aria-controls={`${baseId}-panel`}
            onClick={() => setTabIndex(i)}
            className={`flex-auto min-h-11 px-2 text-sm border-b-2 -mb-px transition-colors duration-200 ${
              i === tabIndex
                ? 'border-cyan-300 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tabIndex}`}
        tabIndex={0}
        className="min-h-0 pr-2 xl:flex-1 xl:overflow-y-auto"
      >
        {tabIndex === 0 && (
          <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-cyan-300">
            {project.overview.map((point) => (
              <li
                key={point}
                className="text-sm md:text-base text-gray-300 leading-relaxed text-justify hyphens-auto"
              >
                {point}
              </li>
            ))}
          </ul>
        )}
        {tabIndex === 1 && (
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {project.howItWorks}
          </p>
        )}
        {tabIndex === 2 && (
          <div className="flex flex-col gap-3">
            {project.stackNote && (
              <p className="text-sm text-gray-400">{project.stackNote}</p>
            )}
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((name) => (
                <li
                  key={name}
                  className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-gray-200 text-sm"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectSidebar({ groups, projects, selected, onSelect }) {
  return (
    <nav
      aria-label="Projects"
      className="hidden lg:flex flex-col gap-3 min-h-0 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-y-auto"
    >
      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-0.5">
          <h2 className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
            {group}
          </h2>
          {projects
            .filter((project) => project.group === group)
            .map((project) => {
              const isSelected = project.title === selected.title
              return (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => onSelect(project)}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`flex items-center justify-between gap-2 min-h-9 px-3 py-1 rounded-lg border text-left text-sm transition-colors duration-200 ${
                    isSelected
                      ? 'border-cyan-400/50 bg-cyan-400/10 text-white'
                      : 'border-transparent text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{project.title}</span>
                  {project.deployed && (
                    <span
                      className="flex-none w-2 h-2 rounded-full bg-green-400"
                      title="Deployed"
                    />
                  )}
                </button>
              )
            })}
        </div>
      ))}
    </nav>
  )
}

function ProjectPicker({ projects, selected, onSelect, onStep }) {
  const stepClass =
    'flex flex-none items-center justify-center w-11 h-11 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors duration-200'

  return (
    <div className="flex items-end gap-2 lg:hidden">
      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label="Previous project"
        className={stepClass}
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>
      <label className="flex flex-col flex-1 min-w-0 gap-1 text-xs text-gray-400">
        Project ({projects.length})
        <select
          value={selected.title}
          onChange={(e) =>
            onSelect(projects.find((project) => project.title === e.target.value))
          }
          className="w-full min-h-11 px-2 rounded-lg border border-cyan-400/50 bg-gray-900 text-sm text-white"
        >
          {projects.map((project) => (
            <option key={project.title} value={project.title}>
              {project.title}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label="Next project"
        className={stepClass}
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function ProjectShowcase({ projects, groups }) {
  // Everything steps through projects in the order the sidebar shows them.
  const ordered = groups.flatMap((group) =>
    projects.filter((project) => project.group === group)
  )
  const [selected, setSelected] = useState(ordered[0])
  const index = ordered.findIndex((project) => project.title === selected.title)
  const neighbour = (delta) =>
    ordered[(index + delta + ordered.length) % ordered.length]

  const footerButtonClass =
    'flex items-center gap-2 min-h-11 px-2 text-sm text-left transition-colors duration-200'

  return (
    <div className="grid flex-1 min-h-0 gap-3 grid-rows-[auto_minmax(0,1fr)] lg:gap-6 lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
      <ProjectSidebar
        groups={groups}
        projects={ordered}
        selected={selected}
        onSelect={setSelected}
      />
      <ProjectPicker
        projects={ordered}
        selected={selected}
        onSelect={setSelected}
        onStep={(delta) => setSelected(neighbour(delta))}
      />

      <section
        aria-label={selected.title}
        className="flex flex-col gap-4 min-h-0 min-w-0 p-4 md:p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
      >
        <div className="flex flex-none flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {selected.title}
          </h2>
          <StatusBadges project={selected} />
        </div>

        {/* Keyed so the slide, tab and scroll position reset whenever the project changes.
            Stacked it scrolls as one; side by side (xl) each column scrolls on its own. */}
        <div
          key={selected.title}
          className="grid flex-1 min-h-0 content-start gap-6 overflow-y-auto xl:content-stretch xl:overflow-hidden xl:grid-cols-[3fr_2fr] xl:grid-rows-[minmax(0,1fr)] 2xl:grid-cols-[2fr_1fr]"
        >
          <SlideDeck project={selected} />
          <DetailTabs project={selected} />
        </div>

        {/* Phones already have previous and next beside the project dropdown */}
        <div className="hidden lg:flex flex-none justify-between gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => setSelected(neighbour(-1))}
            className={`${footerButtonClass} text-gray-300 hover:text-white`}
          >
            <FaChevronLeft className="flex-none w-3 h-3" />
            {neighbour(-1).title}
          </button>
          <button
            type="button"
            onClick={() => setSelected(neighbour(1))}
            className={`${footerButtonClass} ml-auto text-white hover:text-cyan-300`}
          >
            {neighbour(1).title}
            <FaChevronRight className="flex-none w-3 h-3" />
          </button>
        </div>
      </section>
    </div>
  )
}
