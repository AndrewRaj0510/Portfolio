"use client";

import React from "react";
import { ArrowUpRight } from 'lucide-react'
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  const experiences = [
    {
      title: "AI Engineer Intern",
      company: "Techies Infotech FZCO",
      duration: "Feb 2026 – Aug 2026",
      role: "Role: AI Engineer Intern",
      techCategories: [
        {
          label: "Languages & Frameworks",
          items: "Python, FastAPI, Next.js, React, Express.js, LangChain",
        },
        {
          label: "AI & LLMs",
          items: "Claude API, OpenAI API, GPT models, Groq, Ollama, RAG",
        },
        {
          label: "LLM Models",
          items: "Llama, Qwen, gpt-oss, gpt-image-2, OpenAI Whisper",
        },
        {
          label: "Data & Vector Stores",
          items: "PostgreSQL, Supabase (pgvector), ChromaDB",
        },
        {
          label: "Scraping",
          items: "Selenium, BeautifulSoup, Playwright, Apify",
        },
        {
          label: "Web APIs",
          items: "SerpApi, Meta, FlightRadar24",
        },
        {
          label: "Automation & Cloud",
          items: "n8n, AWS S3",
        },
      ],
      highlights: [
        "Delivered and deployed an end-to-end content-automation platform that ingests and LLM-scores 50+ RSS and news feeds, generates LinkedIn and Instagram copy and image prompts with GPT models, and orchestrates n8n rendering and publishing workflows with an approval queue, AWS S3 asset storage, and automated carousel-PDF stitching.",
        "Built and deployed a browser-based scraping console with Reddit (search.rss) and Upwork (Apify) pipelines exposed through a FastAPI service and Next.js UI, persisting every run to PostgreSQL and uploading XLSX and log artifacts to S3 with a queryable run-history view.",
        "Designed and deployed an AI flight-intelligence platform that pairs live SerpApi (Google Flights) pricing with FlightRadar24 reliability data scraped via Playwright, using a Groq-hosted LLM to generate booking-recommendation reports and a grounded multi-turn chat, served through a FastAPI backend and Next.js frontend on Supabase with n8n-scheduled scraping.",
        "Engineered and deployed a hybrid Retrieval-Augmented Generation (RAG) HR-analytics system that classifies query intent and routes natural-language questions across PostgreSQL (LLM text-to-SQL), a ChromaDB vector store, and a knowledge graph, synthesizing evidence-backed answers with a local Ollama LLM via LangChain.",
        "Developed a proof-of-concept embeddable WhatsApp-style chat widget (React IIFE bundle) backed by an Express API that classifies intent with a GPT model and serves RAG answers via OpenAI embeddings and pgvector on Supabase, with conversational support-ticket, sales-lead, and consultation-booking flows plus production hardening (per-IP rate limiting, CORS allowlisting, and input sanitization).",
        "Configured and wired backend and frontend API endpoints and integrated them with n8n workflows, ensuring smooth, reliable data flow across the full request-to-publish pipeline.",
        "Integrated Claude and OpenAI APIs across multiple production FastAPI and Next.js services, building reusable LLM, embedding, and vector-search components alongside n8n automation to deliver scalable, AI-driven applications.",
        "Beyond these, built custom scripts, scrapers, and fine-tuned models to extract structured data from PDF receipts across multiple eCommerce stores, and transcribed audio files using OpenAI Whisper.",
      ],
    },
    {
      title: "Data and Automation Intern",
      company: "Long Tail Ventures, Dubai, UAE",
      duration: "Jul 2025 – Sep 2025",
      role: "Role: Marketing Automation Analyst",
      description:
        "Tools/Technologies: n8n, Python, JavaScript, Web APIs (Google, Meta, Open AI and X)",
      highlights: [
        "Leveraged AI tools and process automation to optimize and accelerate marketing workflows.",
        "Designed and deployed an image generation automation agent that streamlined brand promotion across social media platforms.",
        "Integrated Google, Meta, Open AI and X APIs into automation pipeline to enable seamless multiplatform campaign execution and data synchronization.",
        "Analyzed customer behavior data to generate actionable insights and shared findings to cross-functional teams.",
        "Assisted in the execution and optimization of digital marketing campaigns across multiple online businesses."
      ],
    },
    {
      title: "Data Eng, Mgmt and Governance Analyst",
      company: "Accenture Solutions Pvt Ltd, Chennai, India",
      duration: "Nov 2024 – Jan 2025",
      role: "Role: QA Tester – Data Migration",
      description:
        "Tools/Technologies: Amazon Web Services(AWS), Oracle PL/SQL, Teradata, Informatica,Jira, Confluence, TOSCA",  
      highlights: [
        "Created and executed test cases, documented results, and coordinated defect resolutions with developers.",
        "Performed manual, performance and automated testing, checked for defects and ensured data integrity during PowerCenter to Informatica Cloud migration.",
        "Executed complex SQL queries to compare source and target data, ensuring correct transformation logic.",
        "Performed end to end file based testing, validating structure, format, encoding, file size, consistency and content of .csv, .txt and .xml files generated by the workflows.",
        "Led and co-ordinated with QA team on production deployments ensuring minimal disruption to business operations."
      ],
    },
        {
      title: "Data Eng, Mgmt and Governance Associate",
      company: "Accenture Solutions Pvt Ltd, Chennai, India",
      duration: "Sep 2022 – Nov 2024",
      role: "Role: QA Tester – Data Migration",
      description:
        "Tools/Technologies: Amazon Web Services(AWS), Oracle PL/SQL, Teradata, Informatica,Jira, Confluence, TOSCA",  
      highlights: [
        "On boarded as a member of QA (Quality Assurance) team in Informatica Data Management Cloud (IDMC) Conversion project.",
        "Functionally tested different workflows to ensure data integrity between Informatica PowerCenter and Informatica Data Management Cloud.",
        "Utilized SQL extensively to validate tables, databases and stored procedures in workflows to ensure their functionalities behave the same.",
        "Identified and resolved data mismatches and duplicates through detailed SQL analysis.",
        "Utilized TOSCA, an automation tool to reduce time for testing, scripting and documentation of results"
      ],
    },
  ];
  const education = [
    {
      title: "Middlesex University Dubai",
      company: "MS Data Science",
      duration: "2025 – Present",
      description: "",
    },
    {
      title: "Kamaraj College of Engineering and Technology",
      company: "B.E Computer Science and Engineering",
      duration: "2019 – 2022",
      description: "CGPA: 8.21",
    },
    {
      title: "Adhyapana School CBSE",
      company: "Higher Secondary Education",
      duration: "2016 – 2018",
      description: "CGPA: 8.0",
    },
    {
      title: "Adhyapana School CBSE",
      company: "Senior Secondary Education",
      duration: "2014 – 2016",
      description: "CGPA: 9.0",
    },
  ];

  return (
    <section id="about" className="pt-24 pb-12 px-4 md:px-16">
      <ScrollReveal variant="fadeUp" duration={800}>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-black dark:text-white">
            About Me
          </h2>
          <p className="text-black dark:text-white text-justify leading-relaxed">
            An AI Engineer with a strong foundation in machine learning and data science,
            focused on designing and shipping production-grade, AI-driven applications, from
            RAG systems and LLM-powered agents to end-to-end automation pipelines. I combine
            applied machine learning, statistical analysis, and data engineering with hands-on
            experience across LLMs, vector databases, and full-stack development to turn complex
            problems into reliable, scalable solutions. Known for high productivity and efficient
            delivery, I bring strong communication, teamwork, and adaptability to every project.
            With 3 years of work experience, I am seeking a role that lets me keep building at
            the intersection of machine learning, data science, and automation while delivering
            high-quality, impactful work.
          </p>
        </div>
      </ScrollReveal>
      {/* === Experience Timeline (Alternating) === */}
      <div id="experience" className="max-w-5xl mx-auto mb-10 px-4 md:px-8 scroll-mt-24">
        <h3 className="text-4xl font-semibold mb-14 text-center text-black dark:text-white">
          Experience
        </h3>
        {/* === Center-line Timeline === */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 hidden md:block" />
          {/* Mobile left line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 md:hidden" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="relative mb-12">
                {/* Timeline Dot (center on desktop, left on mobile) */}
                <span className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 bg-gray-800 dark:bg-gray-100 rounded-full z-10" />

                {/* Content card */}
                <ScrollReveal
                  variant={isLeft ? "fadeRight" : "fadeLeft"}
                  duration={700}
                  delay={index * 100}
                >
                  <div className={`ml-10 md:ml-0 md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <span className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {exp.duration}
                    </span>
                    <div className="space-y-2 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white/5 backdrop-blur-sm p-5">
                      <h4 className="text-lg font-semibold text-black dark:text-white leading-snug">
                        {exp.title}
                      </h4>
                      <h5 className="text-base font-bold text-black dark:text-white leading-snug">
                        {exp.company}
                      </h5>
                      <p className="text-black dark:text-white leading-relaxed">
                        {exp.role}
                      </p>
                      {exp.techCategories ? (
                        <div className="space-y-1">
                          {exp.techCategories.map((cat, idx) => (
                            <p
                              key={idx}
                              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                            >
                              <span className="font-semibold text-black dark:text-white">
                                {cat.label}:
                              </span>{" "}
                              {cat.items}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      <ul className="list-disc list-outside pl-6 text-black dark:text-white space-y-1">
                        {exp.highlights.map((item, idx) => (
                          <li key={idx} className="text-sm text-justify leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
      {/* === Education Timeline (Alternating) === */}
      <div id="education" className="max-w-5xl mx-auto mb-10 px-4 md:px-8 scroll-mt-24">
        <h3 className="text-4xl font-semibold mb-14 text-center text-black dark:text-white">
          Education
        </h3>
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 hidden md:block" />
          {/* Mobile left line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 md:hidden" />

          {education.map((edu, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="relative mb-12">
                {/* Timeline Dot */}
                <span className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 bg-gray-800 dark:bg-gray-100 rounded-full z-10" />

                <ScrollReveal
                  variant={isLeft ? "fadeRight" : "fadeLeft"}
                  duration={700}
                  delay={index * 100}
                >
                  <div className={`ml-10 md:ml-0 md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <span className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {edu.duration}
                    </span>
                    <div className="space-y-2 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white/5 backdrop-blur-sm p-5">
                      <h4 className="text-lg font-semibold text-black dark:text-white leading-snug">
                        {edu.title}
                      </h4>
                      <h5 className="text-base font-bold text-black dark:text-white leading-snug">
                        {edu.company}
                      </h5>
                      {edu.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
      {/* === Resume Buttons === */}
      <div className="flex justify-center gap-6">
        <Link
          href="/projects"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-black text-white dark:bg-white dark:text-black hover:scale-105 hover:shadow-lg"
        >
          View Projects
          <ArrowUpRight size={18} />
        </Link>
        <a
          href="https://drive.google.com/file/d/18MROQbaK3A8-wWKi_4XVN8lRXD21ULTJ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-blue-600 text-white dark:bg-blue-400 dark:text-black hover:scale-105 hover:shadow-lg"
        >
          View Resume Online
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default About;