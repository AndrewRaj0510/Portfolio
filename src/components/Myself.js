'use client'
import { Fragment } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import HeroDeck from '@/components/HeroDeck'

const highlights = [
  {
    lead: '1,500 purchase orders in 10 minutes at 98% accuracy:',
    text: 'owned an AI document extraction platform end to end for a client, with only 2% of documents needing manual review.',
  },
  {
    lead: '1,000+ views per brand post:',
    text: 'owned a multi-agent content automation product built on AI agents and n8n that cut the marketing team’s manual workload.',
  },
  {
    lead: '368,000+ Dubai property records:',
    text: 'built an investment intelligence platform for the MSc dissertation, reaching R² 0.872 on held-out data against 0.343 for a baseline.',
  },
  {
    lead: '5-agent Microsoft CloudOptima:',
    text: 'co-built with a Microsoft partner team to turn plain-English requirements into Azure architectures with cost, security and GDPR and ISO 27001 compliance checks; 0.0% attack success rate in PyRIT red teaming.',
  },
  {
    lead: 'Promoted from Associate to Analyst at Accenture within 2 years:',
    text: 'led QA on bi-weekly production releases for an enterprise cloud data migration.',
  },
]

// The non-breaking space ( ) keeps "Automation (n8n)" on one line.
const headline = [
  'AI Solutions Engineer',
  'Document AI, Hybrid RAG & Workflow Automation (n8n)',
  'Python, FastAPI, Next.js',
  'Dubai, UAE',
  'Immediate Joiner',
]

export default function Hero() {
  return (
    <section className="relative flex flex-col min-h-[75vh] md:min-h-[calc(100svh-80px)] px-6 sm:px-10 md:px-16 lg:px-20 pt-12 md:pt-6 pb-24 lg:pb-20 mb-12">
      {/* Headline, across the full width. From md each part stays whole (nowrap) and the
          space after each separator is the only place a line can break; phones are too
          narrow for that and wrap normally. The size follows the width (capped at
          text-3xl) so it fits in two lines on laptops from 1280px wide. */}
      <h1 className="text-2xl md:text-[clamp(1.5rem,1.95vw,1.875rem)] font-extrabold leading-snug text-center text-white">
        {headline.map((part, i) => (
          <Fragment key={part}>
            <span className="md:whitespace-nowrap">
              {part}
              {i < headline.length - 1 && (
                <span className="ml-2.5 mr-1 font-normal text-cyan-400/60">|</span>
              )}
            </span>{' '}
          </Fragment>
        ))}
      </h1>

      {/* Under the headline. From lg the bullets take 46% and the deck the rest, and both
          columns stretch to the same height: the cards grow to fill it and the deck's dots
          end level with the bottom of the buttons. The bullets are set slightly tighter so
          the buttons still fit on a laptop screen. */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 mt-8">
        {/* Left: highlights and buttons */}
        <div className="flex flex-col justify-start lg:w-[46%] lg:flex-none space-y-5">
          {/* Career highlights */}
          <ul className="list-disc pl-5 space-y-2 lg:space-y-1.5 text-base lg:text-[15px] lg:leading-[1.45] text-justify text-black dark:text-white">
            {highlights.map(({ lead, text }) => (
              <li key={lead}>
                <strong className="font-semibold">{lead}</strong> {text}
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Resume Button (same Drive link as "View Resume Online") */}
            <a
              href="https://drive.google.com/file/d/1ppp3umqwBcgmNxI_tIcgqQuKKhyFBLWA/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
                bg-black text-white dark:bg-white dark:text-black hover:scale-105 hover:shadow-lg"
            >
              Resume
              <ArrowUpRight size={18} />
            </a>

            {/* Contact Button */}
            <a
              href="#contact"
              className="underline underline-offset-2 px-6 py-3 rounded-xl transition-all duration-300
                text-black dark:text-white hover:scale-105 hover:shadow-lg"
            >
              Contact
            </a>

            {/* Projects Button: filled like Resume, in a deeper cyan with a slow pulsing glow (globals.css) */}
            <Link
              href="/projects"
              className="projects-glow flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-transform duration-300
                bg-cyan-500 text-black border-2 border-cyan-300/70 hover:bg-cyan-400 hover:scale-105"
            >
              Projects
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Right: featured project deck */}
        <div className="flex w-full justify-center lg:flex-1 lg:min-w-0">
          <HeroDeck />
        </div>
      </div>

      {/* Scroll hint: bouncing arrow in an oval. From lg up (side by side) it is pinned
          to the bottom of the first screen (the section starts 80px down, below the
          body's navbar padding), so it stays visible even when the hero content
          is taller than the window. Side by side it is centred in the 2.5rem gap between
          the columns (px-20 padding + half the gap + 46% of the content width), so the
          cards and bullets can never sit under it. Stacked, it sits at the end of the
          section, centred. The wrapper stays arrow-sized so it can't block clicks. */}
      <div className="absolute bottom-2 lg:bottom-auto lg:top-[calc(100svh-80px-4.5rem)] left-1/2 lg:left-[calc(6.25rem_+_(100%_-_10rem)_*_0.46)] -translate-x-1/2">
        <a
          href="#about"
          aria-label="Scroll down"
          className="flex items-center justify-center w-9 h-14 rounded-full border-2 border-white/70
            text-white animate-bounce hover:border-white transition-colors duration-300"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  )
}
