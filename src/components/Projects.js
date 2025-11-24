"use client";
import { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio built with Next.js and Tailwind CSS, showcasing my experience, skills, and projects. Features dark/light mode, interactive timelines, smooth UI animations and deployed seamlessly on Vercel ensuring global performance abd CI/CD integration.",
      image: "/projects/portfolio.png",
      github: "https://github.com/AndrewRaj0510/Portfolio",
    },
    {
      title: "Natural Language Data Visualizer",
      description:
        "A streamlit app integrated with a LLM that allows user to interact with datasets using natural language prompts. The app will clean and preprocess the dataset automatically or manually if needed and create meaningful visualizations based on the user prompt all without writing a single line of code.",
      image: "/projects/NLDV.png",
      github: "https://github.com/AndrewRaj0510/Natural_Language_Data_Visualizer",
    },
    {
      title: "Code Review Assistant",
      description:
        "A modern full stack web application that analyzes and reviews code using LLMs, with a sleek UI built using Next.js and Tailwind CSS. The system provides real time code review, formatting, and suggestions to help developers write cleaner and more efficient code.",
      image: "/projects/CRA.png",
      github: "https://github.com/AndrewRaj0510/Code_Review_Assistant",
    },
    {
      title: "Automated Image Generation",
      description:
        "Fully automated image-generation workflow that auto-posts and markets the business on social media. Integrated with Web APIs(Google, Meta, X) into the automation pipeline to enable seamless multiplatform campaign execution and data synchronization.",
      image: "/projects/ImgGen.jpeg",
      github: "https://github.com/AndrewRaj0510/Automated-Image-Generation",
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
                className="inline-flex items-center justify-center gap-2 border px-3 py-1 text-xs font-medium text-black dark:text-white border-transparent bg-secondary rounded-full hover:bg-secondary/80 transition-all transform hover:scale-105 duration-300 ease-out"
              >
                <span className="p-1.5 rounded-md bg-white dark:bg-black flex items-center justify-center">
                  <FaGithub className="w-4 h-4 text-black dark:text-white" />
                </span>
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