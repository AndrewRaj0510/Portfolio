'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Building2, Car, ShieldCheck, Megaphone, MessagesSquare } from 'lucide-react'

// Each slug must match the project's title on /projects (lowercase, non-alphanumerics
// as hyphens): ProjectShowcase opens the project named by ?project=<slug>. `subtitle` is
// for a card titled by its product name (YieldLens) rather than its site title.
// The KPIs are each project's `results` in app/projects/data.js: keep them in step by
// hand (this is a client component, so it can't import that file).
// Set `image` once a cover exists; until then the card shows a placeholder.
const featured = [
  {
    slug: 'property-intelligence-chatbot',
    title: 'Property Intelligence Chatbot',
    tagline: 'Agentic RAG chatbot for property listings, with a source link for every answer.',
    image: '/projects/property-intelligence-chatbot/cover.png',
    icon: MessagesSquare,
    status: 'Live',
    kpis: [
      { value: '36/36', label: 'test questions answered correctly' },
      { value: '8/8', label: 'correct refusals' },
      { value: '5.2 s', label: 'median answer time' },
      { value: '$0', label: 'infrastructure cost' },
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
      { value: '0.7', label: 'minimum LLM relevance score' },
      { value: '1-5', label: 'slides per carousel' },
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
      { value: '0.364', label: 'PR-AUC, RoBERTa champion' },
      { value: '0.187', label: 'PR-AUC, rule baseline' },
      { value: '0.96', label: 'precision in the top 50 edits' },
      { value: '25,302', label: 'edits in the test week' },
    ],
  },
  {
    slug: 'property-investment-intelligence',
    title: 'YieldLens',
    subtitle: 'Property Investment Intelligence',
    tagline: 'Paste a Dubai listing, get an invest-or-avoid verdict with the yield explained.',
    image: '/projects/property-investment-intelligence/cover.png',
    icon: Building2,
    kpis: [
      { value: '0.872', label: 'R² on held-out data' },
      { value: '0.343', label: 'R², baseline' },
      { value: '368k+', label: 'Dubai property records' },
      { value: '71', label: 'Dubai communities covered' },
    ],
  },
  {
    slug: 'claimlens',
    title: 'ClaimLens',
    tagline: 'Multimodal car-claims copilot that leaves the decision to a human adjuster.',
    image: '/projects/claimlens/cover.jpg',
    icon: Car,
    kpis: [
      { value: '0.77', label: 'mask mAP@0.5 on the test split' },
      { value: '600/s', label: 'API reads at p95 29 ms' },
      { value: '$0.0014', label: 'LLM cost per claim' },
      { value: '16.3 s', label: 'full claim to the adjuster' },
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

const IMAGE_SIZES = '(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 90vw'

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
      <div className="relative flex-none overflow-hidden aspect-video sm:aspect-auto bg-black border-b sm:border-b-0 sm:border-r border-white/10 sm:w-[52%]">
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
        {/* On the screenshot rather than in the details, which need the height for KPIs */}
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-xs font-semibold text-white/85 backdrop-blur-sm transition-colors duration-200 group-hover:border-cyan-400/60 group-hover:text-cyan-300">
          Case study
          <ArrowUpRight size={14} />
        </span>
      </div>

      {/* Details side: all four KPIs in a 2x2 grid whose tiles stretch into the spare height.
          Its content sets the card's minimum height, and the deck must stay no taller than
          the bullet column (so the dots line up with the buttons): keep it compact. */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4">
        <div>
          <h3 className="text-lg xl:text-xl font-bold leading-tight text-white">{project.title}</h3>
          {project.subtitle && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300/80">{project.subtitle}</p>
          )}
          <p className="mt-1 line-clamp-2 text-xs 2xl:text-sm leading-snug text-gray-300">{project.tagline}</p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2">
          {project.kpis.map(({ value, label }) => (
            <div key={label} className="flex min-w-0 flex-col justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="whitespace-nowrap text-xl 2xl:text-2xl font-extrabold leading-tight text-cyan-300">{value}</span>
              <span className="text-[11px] 2xl:text-xs leading-tight text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

// holdStill: keep the first card in front (timer paused) while the intro covers the page,
// so visitors see it for the full 5 seconds instead of meeting a card mid-flight.
export default function HeroDeck({ holdStill = false }) {
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
                style={{ animationPlayState: isPaused || holdStill ? 'paused' : 'running' }}
                className="deck-timer absolute inset-0 rounded-full bg-cyan-400"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
