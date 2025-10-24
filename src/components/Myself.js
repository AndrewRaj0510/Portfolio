'use client'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center min-h-[75vh] px-10 md:px-24 lg:px-32 pt-12 md:pt-20 pb-20 mb-12">
      {/* Left Side */}
      <div className="flex flex-col justify-start md:w-1/2 space-y-7">
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-justify text-black dark:text-white">
          Aspiring Data Scientist | Former Data Governance Analyst | AI & Automation Enthusiast
        </h1>

        {/* Short Summary */}
        <p className="text-lg md:text-xl text-justify text-black dark:text-white">
          I build intelligent, data-driven solutions that bridge analytics and automation,
          empowering businesses to make smarter, faster decisions. Currently, I&apos;m enhancing my 
          expertise through advanced studies in Data Science.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-6 mt-4">
          {/* Resume Button */}
          <a
            href="#about"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
              bg-black text-white dark:bg-white dark:text-black hover:scale-105 hover:shadow-lg"
          >
            Resume
            <ArrowUpRight size={18} />
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            className="underline underline-offset-2 items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
              bg-black-0 text-black dark:bg-white-0 dark:text-white hover:scale-105 hover:shadow-lg"
          >
            Connect With Me
          </a>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="flex justify-end items-center md:w-1/2 mt-10 md:mt-0 md:pr-10">
        <div className="relative w-56 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-black dark:border-white">
          <Image
            src="/myself.jpg"
            alt="Andrew Isaac Raj G"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
