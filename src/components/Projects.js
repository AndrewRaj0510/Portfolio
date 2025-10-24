"use client";
import { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: "Serverless Todo App",
      description:
        "A full-stack serverless todo app built on AWS, showcasing a comprehensive DevOps implementation with Terraform, GitHub Actions CI/CD, and a modern serverless architecture.",
      image: "/serverless-todo.jpg",
      github: "",
    },
    {
      title: "AI Meme Generator",
      description:
        "An AI-powered meme generator using OpenAI API to generate creative captions and images for trending social content.",
      image: "/ai-meme-generator.jpg",
      github: "https://github.com/yourgithub/meme-generator",
    },
    {
      title: "Data Pipeline Automation",
      description:
        "An automated ETL pipeline built with Informatica Cloud and AWS Glue, designed to transform and process large-scale datasets efficiently.",
      image: "/data-pipeline.jpg",
      github: "https://github.com/yourgithub/data-pipeline",
    },
    {
      title: "Portfolio Website",
      description:
        "A responsive portfolio website built with Next.js and Tailwind CSS, showcasing projects, skills, and contact form integration.",
      image: "/portfolio.jpg",
      github: "https://github.com/yourgithub/portfolio",
    },
    {
      title: "Chatbot Automation",
      description:
        "A conversational AI chatbot integrated with APIs and NLP for automated customer support and workflow assistance.",
      image: "/chatbot.jpg",
      github: "https://github.com/yourgithub/chatbot",
    },
    {
      title: "Predictive Maintenance ML",
      description:
        "A machine learning model predicting equipment failures using sensor data and statistical anomaly detection.",
      image: "/predictive-maintenance.jpg",
      github: "https://github.com/yourgithub/maintenance-ml",
    },
  ];

  // Show only first 3 projects initially
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-20">
      <h2 className="text-4xl md:text-5xl text-center font-extrabold mb-12 text-black dark:text-white">
        Projects
      </h2>

      {/* === Projects Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayedProjects.map((project, index) => (
          <div
            key={index}
            className="group/bento shadow-input flex flex-col justify-between rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-4 transition duration-200 hover:shadow-xl hover:border-border glass-effect"
          >
            {/* === Image === */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover/bento:scale-105"
              />
            </div>

            {/* === Title & Description === */}
            <div className="transition duration-200 group-hover/bento:translate-x-1">
              <h3 className="mt-4 mb-2 font-bold text-neutral-700 dark:text-neutral-200 text-lg">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 text-justify">
                {project.description}
              </p>
            </div>

            {/* === Links === */}
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 border px-3 py-1 text-xs font-medium border-transparent bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* === Show More / Less Button === */}
      {projects.length > 3 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative z-10">
              {showAll ? "Show Less" : `Show All (${projects.length})`}
            </div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      )}
    </section>
  );
}