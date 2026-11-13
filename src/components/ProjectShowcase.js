'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image, { getImageProps } from 'next/image'
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaFilter,
  FaGithub,
  FaTimes,
} from 'react-icons/fa'
import Lightbox from '@/components/Lightbox'

const SLIDE_INTERVAL_MS = 4000
// At xl the deck sits in one of three columns; below that it spans the card.
const SLIDE_SIZES = '(min-width: 1280px) 25vw, (min-width: 1024px) 70vw, 100vw'
const FILTERS = [
  { id: 'all', label: 'All projects', matches: () => true },
  { id: 'deployed', label: 'Deployed', matches: (project) => project.deployed },
  { id: 'public', label: 'Public', matches: (project) => project.visibility === 'public' },
  { id: 'private', label: 'Private', matches: (project) => project.visibility === 'private' },
]
const HEADING_TONES = {
  cyan: 'text-cyan-300',
  green: 'text-green-300',
  orange: 'text-orange-300',
  muted: 'text-gray-400',
}
const TEXT = 'text-sm leading-5 text-gray-300'
const ROUND_BUTTON =
  'flex flex-none items-center justify-center w-11 h-11 rounded-full border border-white/30 bg-black/60 text-white hover:bg-black/80 transition-colors duration-200'

const hasItems = (list) => Array.isArray(list) && list.length > 0

// The gallery leads; a project with only a cover shows that as its single slide.
function getSlides(project) {
  if (project.gallery?.length) return project.gallery
  return project.image ? [project.image] : []
}

// Only the selected project is on the page, so loading="eager" alone can't reach the others.
// This fetches every project's images up front, using the same URLs the slides request,
// so switching projects shows them straight from the browser cache.
function usePreloadImages(projects) {
  const preloaded = useRef([])

  useEffect(() => {
    preloaded.current = projects.flatMap(getSlides).map((src) => {
      const { props } = getImageProps({ src, alt: '', fill: true, sizes: SLIDE_SIZES })
      const image = new window.Image()
      image.sizes = props.sizes
      image.srcset = props.srcSet
      image.src = props.src
      return image
    })
  }, [projects])
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
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])
  const src = slides[slideIndex]
  const hasMany = slides.length > 1
  const step = (delta) =>
    setSlideIndex((i) => (i + delta + slides.length) % slides.length)

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

  return (
    <div className="flex flex-none flex-col gap-1.5">
      {/* Pauses for a mouse on the deck or keyboard focus in it. Touch and mouse clicks don't
          pause it: a tap never fires pointerleave, so it would stay stuck. */}
      <div
        onPointerEnter={(e) => e.pointerType === 'mouse' && setIsPaused(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setIsPaused(false)}
        onFocus={(e) => e.target.matches(':focus-visible') && setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/60"
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
                sizes={SLIDE_SIZES}
                className={`object-contain transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                  i === slideIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <span className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full border border-white/30 bg-black/60 text-white group-hover:bg-black/80 transition-colors duration-200">
              <FaExpand className="w-3 h-3" />
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
              className={`${ROUND_BUTTON} absolute top-1/2 left-2 -translate-y-1/2`}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className={`${ROUND_BUTTON} absolute top-1/2 right-2 -translate-y-1/2`}
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-xs">
              {slideIndex + 1} of {slides.length}
            </span>
            {/* One bar per screenshot; the lit one is on screen */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-2 flex gap-1">
              {slides.map((slide, i) => (
                <span
                  key={slide}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                    i === slideIndex ? 'bg-cyan-300' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {project.imageCredit && (
        <p className="text-xs text-gray-400">
          {project.imageCredit.text}{' '}
          <a
            href={project.imageCredit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Credits
          </a>
        </p>
      )}

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

function Section({ title, tone = 'muted', children }) {
  return (
    <section className="flex flex-col gap-1.5 min-w-0">
      <h4 className={`text-xs font-bold uppercase tracking-wider ${HEADING_TONES[tone]}`}>
        {title}
      </h4>
      {children}
    </section>
  )
}

function BulletList({ items, justify = false }) {
  return (
    <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-cyan-300">
      {items.map((item) => (
        <li key={item} className={`${TEXT} ${justify ? 'text-justify hyphens-auto' : ''}`}>
          {item}
        </li>
      ))}
    </ul>
  )
}

// For tradeoffs and issues: a bold lead, then the explanation.
function LeadList({ items }) {
  return (
    <ul className="flex flex-col gap-1.5 pl-4 list-disc marker:text-cyan-300">
      {items.map(({ lead, text }) => (
        <li key={lead} className={TEXT}>
          <strong className="font-semibold text-white">{lead}</strong> {text}
        </li>
      ))}
    </ul>
  )
}

function MarkList({ items, Icon, iconClass }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item} className={`flex gap-2 ${TEXT}`}>
          <Icon aria-hidden="true" className={`flex-none w-3 h-3 mt-1 ${iconClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// A step written "Label: text" gets a bold label, so the pipeline scans at a glance.
function Steps({ steps }) {
  return (
    <ol className="flex flex-col gap-1.5">
      {steps.map((stepText, i) => {
        const at = stepText.indexOf(': ')
        return (
          <li key={stepText} className={`flex gap-2 ${TEXT}`}>
            <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full border border-cyan-300/50 text-cyan-300 text-[11px]">
              {i + 1}
            </span>
            <span>
              {at > 0 ? (
                <>
                  <strong className="font-semibold text-white">{stepText.slice(0, at + 1)}</strong>
                  {stepText.slice(at + 1)}
                </>
              ) : (
                stepText
              )}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function Results({ project }) {
  return (
    <div className="flex flex-col gap-2">
      {project.inDevelopment && (
        <>
          <span className="flex items-center gap-2 self-start px-2.5 py-1 rounded-full border border-amber-300/50 bg-amber-300/10 text-amber-200 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
            In development
          </span>
          {project.statusNote && <p className={TEXT}>{project.statusNote}</p>}
        </>
      )}
      {hasItems(project.results) && (
        <dl className="grid grid-cols-2 gap-2">
          {project.results.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col-reverse min-w-0 px-2.5 py-2 rounded-lg border border-cyan-300/25 bg-cyan-300/[0.07]"
            >
              <dt className="text-xs leading-4 text-gray-300">{label}</dt>
              <dd className="text-xl font-extrabold text-white tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

function Column({ number, title, children }) {
  return (
    <div className="flex flex-col gap-3 min-w-0 p-3.5 rounded-lg border border-white/10 bg-white/[0.04] xl:min-h-0 xl:overflow-y-auto">
      <h3 className="flex items-baseline gap-2 text-base font-bold text-white">
        <span className="text-cyan-300">{number}</span>
        {title}
      </h3>
      {children}
    </div>
  )
}

const COLUMN_COUNT_CLASS = { 1: '', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3' }

// Three columns read left to right: why it exists, how it was built, what happened.
// A section with no data is left out, and so is a column with nothing in it.
function CaseStudy({ project }) {
  const steps = project.howItWorks
  const hasSteps = Array.isArray(steps) ? steps.length > 0 : Boolean(steps)
  const hasOutcome =
    project.inDevelopment ||
    hasItems(project.results) ||
    hasItems(project.whatWorked) ||
    hasItems(project.whatDidNot)

  const columns = [
    {
      title: 'Why it exists',
      show: true,
      content: (
        <>
          <SlideDeck project={project} />
          {project.problem && (
            <Section title="Problem" tone="cyan">
              <p className={TEXT}>{project.problem}</p>
            </Section>
          )}
          {hasItems(project.overview) && (
            <Section title="Overview">
              <BulletList items={project.overview} justify />
            </Section>
          )}
        </>
      ),
    },
    {
      title: 'How it was built',
      show: hasSteps || hasItems(project.tradeoffs) || hasItems(project.issues),
      content: (
        <>
          {hasSteps && (
            <Section title="How it works">
              {Array.isArray(steps) ? <Steps steps={steps} /> : <p className={TEXT}>{steps}</p>}
            </Section>
          )}
          {hasItems(project.tradeoffs) && (
            <Section title="Tradeoffs">
              <LeadList
                items={project.tradeoffs.map(({ choice, detail }) => ({ lead: `${choice}.`, text: detail }))}
              />
            </Section>
          )}
          {hasItems(project.issues) && (
            <Section title="Issues faced">
              <LeadList items={project.issues.map(({ issue, fix }) => ({ lead: issue, text: fix }))} />
            </Section>
          )}
        </>
      ),
    },
    {
      title: 'What happened',
      show: hasOutcome,
      content: (
        <>
          {(project.inDevelopment || hasItems(project.results)) && (
            <Section title="Result" tone="cyan">
              <Results project={project} />
            </Section>
          )}
          {hasItems(project.whatWorked) && (
            <Section title="What worked" tone="green">
              <MarkList items={project.whatWorked} Icon={FaCheck} iconClass="text-green-300" />
            </Section>
          )}
          {hasItems(project.whatDidNot) && (
            <Section title="What did not" tone="orange">
              <MarkList items={project.whatDidNot} Icon={FaTimes} iconClass="text-orange-300" />
            </Section>
          )}
        </>
      ),
    },
  ].filter((column) => column.show)

  return (
    <div
      className={`grid gap-3 xl:flex-1 xl:min-h-0 xl:grid-rows-[minmax(0,1fr)] ${COLUMN_COUNT_CLASS[columns.length]}`}
    >
      {columns.map((column, i) => (
        <Column key={column.title} number={i + 1} title={column.title}>
          {column.content}
        </Column>
      ))}
    </div>
  )
}

function StackStrip({ project }) {
  return (
    <section className="flex flex-none flex-col gap-2 sm:flex-row sm:gap-3">
      <h3 className="flex-none pt-0.5 text-xs font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap sm:w-24">
        Tech stack
      </h3>
      <div className="flex flex-col gap-1 min-w-0">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((name) => (
            <li
              key={name}
              className="px-2.5 py-0.5 rounded-full border border-white/20 bg-white/5 text-xs leading-5 text-gray-200 whitespace-nowrap"
            >
              {name}
            </li>
          ))}
        </ul>
        {project.stackNote && <p className="text-xs text-gray-400">{project.stackNote}</p>}
      </div>
    </section>
  )
}

function FilterMenu({ allProjects, filterId, onChange, sizeClass }) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const isActive = filterId !== 'all'

  useEffect(() => {
    if (!isOpen) return undefined
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setIsOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return
      setIsOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={rootRef} className="relative flex-none">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Filter projects: ${FILTERS.find((f) => f.id === filterId).label}`}
        aria-expanded={isOpen}
        className={`flex items-center justify-center rounded-lg border transition-colors duration-200 ${sizeClass} ${
          isActive
            ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300'
            : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        <FaFilter className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-1 flex w-48 flex-col gap-0.5 rounded-lg border border-white/15 bg-gray-900 p-1 shadow-xl">
          {FILTERS.map((filter) => {
            const count = allProjects.filter(filter.matches).length
            const isSelected = filter.id === filterId
            return (
              <button
                key={filter.id}
                type="button"
                disabled={count === 0}
                aria-pressed={isSelected}
                onClick={() => {
                  onChange(filter.id)
                  setIsOpen(false)
                  buttonRef.current?.focus()
                }}
                className={`flex items-center justify-between gap-2 min-h-10 px-3 rounded-md text-left text-sm transition-colors duration-200 disabled:opacity-40 ${
                  isSelected ? 'bg-cyan-400/10 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter.label}
                <span className="text-xs text-gray-400">{count}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ProjectSidebar({ groups, projects, allProjects, selected, onSelect, filterId, onFilterChange }) {
  return (
    // The menu opens over the list, so only the list scrolls: scrolling this box would clip it.
    <div className="hidden lg:flex flex-col min-h-0 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex flex-none items-center justify-between gap-2 px-6 pt-3 pb-1">
        <span className="text-sm font-semibold text-white">Projects ({projects.length})</span>
        <FilterMenu
          allProjects={allProjects}
          filterId={filterId}
          onChange={onFilterChange}
          sizeClass="w-9 h-9"
        />
      </div>
      <nav
        aria-label="Projects"
        className="flex flex-1 flex-col gap-2 min-h-0 px-3 pb-3 overflow-y-auto"
      >
        {groups.map((group) => {
          const groupProjects = projects.filter((project) => project.group === group)
          if (groupProjects.length === 0) return null
          return (
            <div key={group} className="flex flex-col gap-0.5">
              <h2 className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                {group}
              </h2>
              {groupProjects.map((project) => {
                const isSelected = project.title === selected.title
                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => onSelect(project)}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`flex items-center justify-between gap-2 min-h-8 px-3 py-1 rounded-lg border text-left text-sm transition-colors duration-200 ${
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
          )
        })}
      </nav>
    </div>
  )
}

function ProjectPicker({ projects, allProjects, selected, onSelect, onStep, filterId, onFilterChange }) {
  const stepClass =
    'flex flex-none items-center justify-center w-11 h-11 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors duration-200'

  return (
    // z-20: the filter menu opens over the project card below
    <div className="relative z-20 flex items-end gap-2 lg:hidden">
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
      <FilterMenu
        allProjects={allProjects}
        filterId={filterId}
        onChange={onFilterChange}
        sizeClass="w-11 h-11"
      />
    </div>
  )
}

// "Microsoft CloudOptima" -> "microsoft-cloudoptima"; HeroDeck's slugs follow this.
const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function ProjectShowcase({ projects, groups }) {
  // Everything steps through projects in the order the sidebar shows them.
  const ordered = groups.flatMap((group) =>
    projects.filter((project) => project.group === group)
  )
  const [chosen, setChosen] = useState(ordered[0])
  const [filterId, setFilterId] = useState('all')
  usePreloadImages(projects)

  // /projects?project=<slug> opens that project (the home page's hero deck links here).
  // Read after mount, since the server render can't see the query string.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('project')
    const match = slug && projects.find((project) => toSlug(project.title) === slug)
    if (match) setChosen(match)
  }, [projects])

  const visible = ordered.filter(FILTERS.find((f) => f.id === filterId).matches)
  // If the filter hides the chosen project, the card shows the first one that's left.
  const selected = visible.find((project) => project.title === chosen.title) ?? visible[0]
  const index = visible.indexOf(selected)
  const neighbour = (delta) =>
    visible[(index + delta + visible.length) % visible.length]

  const filterProps = {
    allProjects: ordered,
    filterId,
    onFilterChange: setFilterId,
  }

  return (
    <div className="grid flex-1 min-h-0 gap-3 grid-rows-[auto_minmax(0,1fr)] lg:gap-6 lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
      <ProjectSidebar
        groups={groups}
        projects={visible}
        selected={selected}
        onSelect={setChosen}
        {...filterProps}
      />
      <ProjectPicker
        projects={visible}
        selected={selected}
        onSelect={setChosen}
        onStep={(delta) => setChosen(neighbour(delta))}
        {...filterProps}
      />

      <section
        aria-label={selected.title}
        className="flex flex-col gap-3 min-h-0 min-w-0 p-4 md:p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
      >
        <div className="flex flex-none flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {selected.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadges project={selected} />
            {/* Phones already have previous and next beside the project dropdown */}
            <div className="hidden lg:flex items-center gap-2">
              {[
                [-1, 'Previous', FaChevronLeft],
                [1, 'Next', FaChevronRight],
              ].map(([delta, label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setChosen(neighbour(delta))}
                  aria-label={`${label} project: ${neighbour(delta).title}`}
                  title={neighbour(delta).title}
                  className={ROUND_BUTTON}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Keyed so the slide and scroll positions reset whenever the project changes.
            Stacked it scrolls as one; in columns (xl) each column scrolls on its own. */}
        <div
          key={selected.title}
          className="flex flex-1 flex-col gap-3 min-h-0 overflow-y-auto xl:overflow-hidden"
        >
          <CaseStudy project={selected} />
          <StackStrip project={selected} />
        </div>
      </section>
    </div>
  )
}
