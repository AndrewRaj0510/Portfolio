"use client";

import ScrollReveal from "@/components/ScrollReveal";

const highlights = [
  "AI Solutions Engineer with 3+ years of professional experience in software and data engineering, including over 1 year delivering production LLM applications.",
  "Holds a Master of Science (MSc) degree in Data Science from Middlesex University Dubai.",
  "Expertise centers on leading the end-to-end transformation of business requirements into production-ready AI products, covering solution design, architecture, full-stack development and deployment.",
  "Core strengths include architecting multi-agent systems and hybrid RAG pipelines, agentic workflows, prompt engineering, LLM evaluation, guardrails and red teaming, frontend development and no-code automation.",
  "Focused on AI engineering and solution design, agentic AI, AI-driven automation and full-stack development, driving high-impact technology initiatives.",
];

const About = () => {
  return (
    <section id="about" className="pt-24 pb-12 px-4 md:px-16">
      <ScrollReveal variant="fadeUp" duration={800}>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-black dark:text-white">
            Professional Summary
          </h2>
          <ul className="list-disc list-outside pl-6 space-y-2 text-left text-black dark:text-white">
            {highlights.map((item, idx) => (
              <li key={idx} className="text-justify leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default About;
