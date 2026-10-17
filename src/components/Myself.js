'use client'
import Image from 'next/image'
import { ArrowUpRight, ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row justify-between items-center min-h-[75vh] px-10 md:px-24 lg:px-32 pt-12 md:pt-20 pb-20 mb-12">
      {/* Left Side */}
      <div className="flex flex-col justify-start md:w-1/2 space-y-7">
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-justify text-black dark:text-white">
          AI Solutions Engineer | Data Science Enthusiast | LLMs, RAG &amp; Multi-Agent Systems | Gen AI &amp; Workflow Automation
        </h1>

        {/* Short Summary */}
        <p className="text-lg md:text-xl text-justify text-black dark:text-white">
          I&apos;m an AI Solutions Engineer with 3+ years of experience in software and data engineering,
          including over a year shipping production LLM applications. I take business requirements end to end,
          from solution design and architecture through full-stack development and deployment, to deliver
          production-ready AI products. My work centres on multi-agent systems, hybrid RAG pipelines and agentic
          workflows, backed by prompt engineering, LLM evaluation, guardrails and red teaming. I hold an MSc in
          Data Science from Middlesex University Dubai.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-6 mt-4">
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
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="flex justify-end items-center md:w-1/2 mt-10 md:mt-0 md:pr-10">
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-black dark:border-white">
          <Image
            src="/myself.jpeg"
            alt="Andrew Isaac Raj G"
            fill
            className="object-cover object-[center_100%]"
          />
        </div>
      </div>

      {/* Scroll hint: bouncing arrow in an oval */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center">
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
