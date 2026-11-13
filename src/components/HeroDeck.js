'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Building2, Car, ShieldCheck, Megaphone, Cloud } from 'lucide-react'

// Each slug must match the project's title on /projects (lowercase, non-alphanumerics
// as hyphens): ProjectShowcase opens the project named by ?project=<slug>.
// Set `image` once a cover exists; until then the card shows a placeholder.
const featured = [
  {
    slug: 'property-investment-intelligence',
    title: 'Property Investment Intelligence',
    tagline: 'Turns a pasted Dubai listing into an invest-or-avoid verdict.',
    image: null,
    icon: Building2,
    kpis: [
      { value: '71', label: 'Dubai communities' },
      { value: '2,550', label: 'market segments' },
      { value: '14 yrs', label: 'of DLD and Ejari data' },
    ],
  },
  {
    slug: 'claimlens',
    title: 'ClaimLens',
    tagline: 'Multimodal car-claims copilot that leaves the decision to a human adjuster.',
    image: '/projects/claimlens/cover.jpg',
    icon: Car,
    kpis: [
      { value: '0.77', label: 'mask mAP@0.5' },
      { value: '16.3 s', label: 'full claim to adjuster' },
      { value: '$0.0014', label: 'LLM cost per claim' },
    ],
  },
  {
    slug: 'wikiguard',
    title: 'WikiGuard',
    tagline: 'Ranks live Wikipedia edits by vandalism risk for human patrollers.',
    image: null,
    icon: ShieldCheck,
    status: 'In development',
    kpis: [
      { value: '0.96', label: 'precision, top 50 edits' },
      { value: '0.364', label: 'PR-AUC vs 0.187 baseline' },
      { value: '25,302', label: 'edits in the test week' },
    ],
  },
  {
    slug: 'content-creation-agent',
    title: 'Content Creation Agent',
    tagline: 'Turns daily industry news into review-ready LinkedIn and Instagram posts.',
    image: '/projects/content-creation-agent/cover.png',
    icon: Megaphone,
    status: 'Live',
    kpis: [
      { value: '1,000+', label: 'views per brand post' },
      { value: '50+', label: 'news feeds ingested' },
      { value: 'Live', label: 'in production for a client' },
    ],
  },
  {
    slug: 'microsoft-cloudoptima',
    title: 'Microsoft CloudOptima',
    tagline: 'Plain-English requirements in, a costed and checked Azure architecture out.',
    image: null,
    icon: Cloud,
    status: 'In development',
    kpis: [
      { value: '5', label: 'specialist AI agents' },
      { value: '0.0%', label: 'PyRIT attack success' },
      { value: '4', label: 'design, cost, security, compliance' },
    ],
  },
]

// Where a card sits by its place in the stack (0 is the front). Cards further back are
// smaller and peek out past the right edge (scaled from the right, so 16px each), which
// reads as a deck stacked from the side; anything past the third is hidden behind it.
const STACK = [
  'translate-x-0 scale-100 brightness-100 opacity-100',
  'translate-x-4 scale-[0.94] brightness-[0.7] opacity-100',
  'translate-x-8 scale-[0.88] brightness-[0.5] opacity-100',
]
const HIDDEN = 'translate-x-8 scale-[0.88] brightness-[0.5] opacity-0'

const IMAGE_SIZES = '(min-width: 1024px) 32vw, (min-width: 640px) 55vw, 90vw'

const STATUS_STYLES = {
  Live: 'border-emerald-400/50 bg-emerald-500/20 text-emerald-200',
  'In development': 'border-amber-400/50 bg-amber-500/20 text-amber-200',
}

// Landscape from sm: screenshot on the left, details on the right. Phones stack them.
// A leaving card keeps its new (hidden) place underneath the fly-off animation, so it is
// already out of sight when the animation ends and the class comes off.
function DeckCard({ project, position, leaving, onExitEnd }) {
  const Icon = project.icon
  const isFront = position === 0

  return (
    <Link
      href={`/projects?project=${project.slug}`}
      // Only the front card can be clicked or focused; the ones behind are decoration.
      inert={!isFront}
      aria-label={`${project.title}: open the case study`}
      onAnimationEnd={(e) => e.target === e.currentTarget && onExitEnd()}
      style={{ zIndex: leaving ? featured.length + 1 : featured.length - position }}
      className={`group [grid-area:1/1] origin-right flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-white/15 bg-neutral-950
        shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] transition-[transform,filter,opacity] duration-500 ease-out
        motion-reduce:transition-none hover:border-cyan-400/50
        ${STACK[position] ?? HIDDEN} ${leaving ? 'deck-exit' : ''}`}
    >
      {/* Screenshot side: 16:9 on phones, the card's full height from sm. The screenshot
          fills it edge to edge (cover), so a panel taller than 16:9 trims the image's right
          edge rather than leaving bars above and below. Anchored left, where app
          screenshots keep their titles. */}
      <div className="relative flex-none overflow-hidden aspect-video sm:aspect-auto bg-black border-b sm:border-b-0 sm:border-r border-white/10 sm:w-[58%]">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes={IMAGE_SIZES}
            className="object-cover object-left"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cyan-200/80
              bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.25),transparent_60%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
              bg-[length:auto,24px_24px,24px_24px]"
          >
            <Icon className="w-10 h-10" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Screenshot coming soon</span>
          </div>
        )}
        {project.status && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full border text-xs font-semibold backdrop-blur-sm ${STATUS_STYLES[project.status]}`}
          >
            {project.status}
          </span>
        )}
      </div>

      {/* Details side; the KPIs take up whatever height the card has spare */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-bold leading-snug text-white">{project.title}</h3>
          <p className="mt-0.5 text-xs leading-snug text-gray-300">{project.tagline}</p>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2">
          {project.kpis.map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
              <span className="flex-none text-lg font-extrabold leading-tight text-cyan-300">{value}</span>
              <span className="min-w-0 text-[11px] leading-tight text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        <span className="flex items-center gap-1 self-end text-xs font-semibold text-white/70 transition-colors duration-200 group-hover:text-cyan-300">
          Case study
          <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  )
}

export default function HeroDeck() {
  const [active, setActive] = useState(0)
  const [leaving, setLeaving] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const count = featured.length

  const goTo = (index) => {
    if (index === active) return
    // Only the next card gets the fly-off; a jump just reshuffles the stack, and also drops
    // any card still mid-flight. With reduced motion there is no exit animation, so its
    // animationend would never clear `leaving`.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setLeaving(index === (active + 1) % count && !reduced ? active : null)
    setActive(index)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      // Stretched by the hero to the bullet column's height from lg, so the cards grow to
      // fill it and the dots end level with the bottom of the buttons on the left.
      className="flex w-full flex-col items-center gap-4"
    >
      {/* Pauses for a mouse on the deck or keyboard focus in it. Touch doesn't pause it:
          a tap never fires pointerleave, so it would stay stuck. */}
      <div
        onPointerEnter={(e) => e.pointerType === 'mouse' && setIsPaused(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setIsPaused(false)}
        onFocus={(e) => e.target.matches(':focus-visible') && setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="grid w-full flex-1 pr-8"
      >
        {featured.map((project, i) => (
          <DeckCard
            key={project.slug}
            project={project}
            position={(i - active + count) % count}
            leaving={leaving === i}
            onExitEnd={() => setLeaving(null)}
          />
        ))}
      </div>

      {/* Progress dots instead of arrows: the active one fills up while its card is in front */}
      <div className="flex items-center gap-2">
        {featured.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${project.title}`}
            aria-current={i === active}
            className={`relative h-2.5 overflow-hidden rounded-full transition-all duration-300 ${
              i === active ? 'w-12 bg-white/25' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          >
            {i === active && (
              <span
                // Keyed by card so the timer restarts on every change, clicks included.
                key={active}
                onAnimationEnd={() => goTo((active + 1) % count)}
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                className="deck-timer absolute inset-0 rounded-full bg-cyan-400"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
