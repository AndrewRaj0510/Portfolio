'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowDown } from 'lucide-react'

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
  {
    lead: 'MSc Data Science with Distinction:',
    text: 'Middlesex University Dubai, plus Microsoft Certified: Power BI Data Analyst.',
  },
]

export default function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row justify-between items-center min-h-[75vh] md:min-h-[calc(100svh-80px)] px-10 md:px-24 lg:px-20 pt-12 md:pt-6 pb-20 mb-12">
      {/* Left Side */}
      <div className="flex flex-col justify-start md:w-1/2 md:pr-8 space-y-5">
        {/* Headline */}
        <h1 className="text-3xl font-extrabold text-left text-black dark:text-white">
          AI Solutions Engineer &nbsp;|&nbsp; Agentic AI &amp; LLM Engineer &nbsp;|&nbsp; AI Automation
        </h1>

        {/* Career highlights */}
        <ul className="list-disc pl-5 space-y-2 text-base text-left text-black dark:text-white">
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

          {/* Projects Button */}
          <Link
            href="/projects"
            className="underline underline-offset-2 px-6 py-3 rounded-xl transition-all duration-300
              text-black dark:text-white hover:scale-105 hover:shadow-lg"
          >
            Projects
          </Link>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="flex justify-end items-center md:w-1/2 mt-10 md:mt-0 md:pl-8 md:pr-10">
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-black dark:border-white">
          <Image
            src="/myself.jpeg"
            alt="Andrew Isaac Raj G"
            fill
            className="object-cover object-[center_100%]"
          />
        </div>
      </div>

      {/* Scroll hint: bouncing arrow in an oval. From md up it is pinned to the
          bottom of the first screen (the section starts 80px down, below the
          body's navbar padding), so it stays visible even when the hero content
          is taller than the window. The wrapper stays arrow-sized so it can't sit
          over the buttons and block their clicks. */}
      <div className="absolute bottom-2 md:bottom-auto md:top-[calc(100svh-80px-4.5rem)] left-1/2 -translate-x-1/2">
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
