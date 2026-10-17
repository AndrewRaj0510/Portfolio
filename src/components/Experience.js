"use client";

import { ArrowUpRight } from 'lucide-react'
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const Experience = () => {
  const experiences = [
    {
      title: "AI Solutions Engineer",
      company: "Techies Infotech FZCO",
      duration: "Feb 2025 - Oct 2026",
      description:
        "Tech Stack: Python, FastAPI, LangChain, n8n, Next.js, React, TypeScript, Tailwind CSS, OpenAI (GPT-5, Whisper), Anthropic Claude (Haiku, Sonnet), Amazon Bedrock (Nova 2 Lite), PostgreSQL, Supabase (pgvector), Docker, AWS S3, Playwright, Apify, SerpApi, Claude Code",
      highlights: [
        {
          label: "LPO Extraction Platform",
          text: "Built and deployed a multimodal document extraction platform (Next.js, FastAPI, PostgreSQL, Docker) that processes 1,500 Local Purchase Orders in 10 minutes at 98% accuracy, with only 2% routed to manual review.",
          subpoints: [
            "Benchmarked Amazon Bedrock Nova 2 Lite and OpenAI GPT-5 before migrating to Anthropic Claude Haiku and Sonnet multimodal models for higher accuracy on scanned and image-based POs, prompt-engineered a chain of system and follow-up prompts, and built item, product and location master data for entity matching and normalization.",
          ],
        },
        {
          label: "Agentic Content Automation",
          text: "Architected an autonomous multi-agent pipeline where a scraper agent ingests and LLM-scores 50+ RSS and news feeds daily, a content generation agent writes LinkedIn and Instagram brand-specific caption and image prompts, and a feedback guardrail agent approves output before webhook-triggered n8n workflows publish cross-platform; reduced manual effort for the social media team, with brand posts exceeding 1,000 views.",
        },
        {
          label: "Hybrid RAG Assistant",
          text: "Engineered a retrieval-augmented generation system answering natural language questions on HR, finance, payroll and performance data by routing queries across PostgreSQL, pgvector and a knowledge graph; applied prompt caching and token optimization to cut inference cost.",
        },
        {
          label: "Job Scraper Console",
          text: "Built a browser-based console that scrapes job postings and client leads from Reddit (RSS), LinkedIn and Upwork (Apify) on user-defined parameters, backed by FastAPI, PostgreSQL and AWS S3 with rate-limited endpoints; reduced manual effort for the HR and marketing teams in finding clients and new hires.",
        },
        {
          label: "Conversational AI",
          text: "Delivered a flight-intelligence assistant combining live Google Flights pricing (SerpApi) and FlightRadar24 data (Playwright) with grounded multi-turn chat, and an embeddable WhatsApp-style chat widget with LLM intent classification and RAG answers over OpenAI embeddings and pgvector.",
        },
        "Shipped every product full stack: responsive React and Next.js (TypeScript) frontends with reusable components and REST API integration, and Dockerized FastAPI backends deployed through CI/CD pipelines and secured with JWT authentication, auth logging and per-endpoint rate limiting; built AI-first using Claude Code.",
      ],
    },
    {
      title: "Data and Automation Intern",
      company: "Long Tail Ventures, Dubai, UAE",
      duration: "Jul 2025 - Sep 2025",
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
      duration: "Nov 2024 - Jan 2025",
      description:
        "Tools/Technologies: Amazon Web Services(AWS), Oracle PL/SQL, Teradata, Informatica,Jira, Confluence, TOSCA",  
      highlights: [
        "Promoted from Associate to Analyst; led the QA team on production deployments for an Informatica PowerCenter to cloud (IDMC) migration with minimal disruption to business operations.",
        "Validated ETL transformation logic and source-to-target datasets with complex Oracle PL/SQL and Teradata queries.",
        "Resolved data mismatches and duplicates across large datasets and verified .csv, .txt and .xml outputs for schema, encoding and content consistency.",
        "Utilized TOSCA, an automation tool to reduce time for testing, scripting and documentation of results."
      ],
    },
  ];
  const education = [
    {
      title: "Middlesex University Dubai",
      company: "MS Data Science",
      duration: "2025 - 2026",
      description: "",
    },
    {
      title: "Kamaraj College of Engineering and Technology",
      company: "B.E Computer Science and Engineering",
      duration: "2019 - 2022",
      description: "CGPA: 8.21",
    },
    {
      title: "Adhyapana School CBSE",
      company: "Higher Secondary Education",
      duration: "2016 - 2018",
      description: "CGPA: 8.0",
    },
    {
      title: "Adhyapana School CBSE",
      company: "Senior Secondary Education",
      duration: "2014 - 2016",
      description: "CGPA: 9.0",
    },
  ];

  return (
    <section className="pt-12 pb-12 px-4 md:px-16">
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
                    <div className="space-y-2 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white/5 backdrop-blur-sm p-5">
                      <h4 className="text-lg font-semibold text-black dark:text-white leading-snug">
                        {exp.title}
                      </h4>
                      <h5 className="text-base font-bold text-black dark:text-white leading-snug">
                        {exp.company}
                      </h5>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                        {exp.duration}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="list-disc list-outside pl-6 text-black dark:text-white space-y-1">
                        {exp.highlights.map((item, idx) => (
                          <li key={idx} className="text-sm text-justify leading-relaxed">
                            {typeof item === "string" ? (
                              item
                            ) : (
                              <>
                                <span className="font-semibold">{item.label}:</span>{" "}
                                {item.text}
                                {item.subpoints && (
                                  <ul className="list-[circle] list-outside pl-5 mt-1 space-y-1">
                                    {item.subpoints.map((sub, subIdx) => (
                                      <li key={subIdx}>{sub}</li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            )}
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
          href="https://drive.google.com/file/d/1ppp3umqwBcgmNxI_tIcgqQuKKhyFBLWA/view?usp=sharing"
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

export default Experience;