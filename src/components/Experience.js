"use client";

import { ArrowUpRight } from 'lucide-react'
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

// Renders **text** segments in bold
const withBold = (text) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? <strong key={i} className="font-bold">{part}</strong> : part
  );

const Experience = () => {
  const experiences = [
    {
      title: "AI Solutions Engineer",
      company: "Techies Infotech FZCO",
      duration: "Feb 2025 - Oct 2026",
      description:
        "",
      highlights: [
        {
          label: "LPO extraction platform",
          text: "Built and deployed a multimodal platform (Next.js, FastAPI, PostgreSQL, Docker) that reads purchase orders, including scanned and image-based ones, and turns them into clean data: **1,500 orders in 10 minutes** at **98% accuracy**, with the **2%** it is unsure about sent to a person. Tested Amazon Bedrock Nova 2 Lite and GPT-5 before moving to Claude Haiku and Sonnet for better accuracy, wrote a chain of system and follow-up prompts, and built item, product and location master data for matching and normalisation.",
        },
        {
          label: "Agentic content automation",
          text: "Built a multi-agent pipeline where a scraper agent reads and scores **50+ news feeds daily**, a content agent writes brand-specific LinkedIn and Instagram posts and image prompts, and a guardrail agent approves each one before webhook-triggered n8n workflows publish it. Brand posts passed **1,000 views**.",
        },
        {
          label: "Hybrid RAG assistant",
          text: "Built an assistant that answers staff questions on HR, finance, payroll and performance data by routing queries across PostgreSQL, pgvector and a knowledge graph, with prompt caching to keep LLM costs down.",
        },
        {
          label: "Job scraper console",
          text: "Built a console that pulls job postings and client leads from Reddit, LinkedIn and Upwork, backed by FastAPI, PostgreSQL and AWS S3 with rate-limited endpoints, cutting manual searching for the HR and marketing teams.",
        },
        {
          label: "Conversational AI",
          text: "Built a flight assistant that combines live Google Flights pricing and FlightRadar24 data in a grounded multi-turn chat, and an embeddable support chat widget with LLM intent classification and RAG answers over pgvector.",
        },
        {
          label: "Full-stack delivery",
          text: "Shipped every product end to end with React and Next.js (TypeScript) frontends and Dockerised FastAPI backends, deployed through CI/CD and secured with JWT, auth logging and rate limiting. Built AI-first with Claude Code.",
        },
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
                      {exp.description && (<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {exp.description}
                      </p>)}
                      <ul className="list-disc list-outside pl-6 text-black dark:text-white space-y-1">
                        {exp.highlights.map((item, idx) => (
                          <li key={idx} className="text-sm text-justify leading-relaxed">
                            {typeof item === "string" ? (
                              withBold(item)
                            ) : (
                              <>
                                <span className="font-semibold">{item.label}:</span>{" "}
                                {withBold(item.text)}
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
          href="/go/resume"
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