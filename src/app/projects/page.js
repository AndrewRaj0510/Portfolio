'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import AnimatedList from '@/components/AnimatedList'

const PrismBackground = dynamic(() => import('@/components/PrismBackground'), { ssr: false })

const projects = [
  {
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio built with Next.js and Tailwind CSS, showcasing my experience, skills, and projects. Features dark/light mode, interactive timelines, smooth UI animations and deployed seamlessly on Vercel.',
    image: '/projects/portfolio.png',
    github: 'https://github.com/AndrewRaj0510/Portfolio',
  },
  {
    title: 'AIRNotes',
    description: 'In Development',
    image: null,
    github: 'https://github.com/AndrewRaj0510',
  },
  {
    title: 'Employee Performance Reporting',
    description:
      'A Hybrid RAG (Retrieval Augmented Generation) System that intelligently routes HR related queries to either SQL databases or vector-based document search, or both. The system uses a cloud LLM (via Ollama) to understand intent and generate responses with evidence.',
    image: '/projects/Employee_Perf_Reporting.png',
    github: 'https://github.com/AndrewRaj0510/Employee-Performance-Reporting',
  },
  {
    title: 'Stock Predictor',
    description:
      'AI-powered stock prediction platform that tracks 60+ stocks using machine learning models (XGBoost, Random Forest, Logistic Regression) with SHAP explainability. Ingests daily market data from Financial Modeling Prep API, engineers technical features, and serves predictions through a FastAPI backend and Next.js dashboard.',
    image: '/projects/stock_predictor.png',
    github: 'https://github.com/AndrewRaj0510/Stock-Predictor',
  },
  {
    title: 'AI Travel Planner',
    description: 'Search flights, get real-time prices, and receive AI-generated reliability reports with delay patterns, cancellation history, and smart booking verdicts.',
    image: '/projects/AI_Travel.png',
    github: 'https://github.com/AndrewRaj0510/AI-Travel-Planner',
  },
  {
    title: 'Code Review Assistant',
    description:
      'A modern full stack web application that analyzes and reviews code using LLMs, with a sleek UI built using Next.js and Tailwind CSS. Provides real time code review, formatting, and suggestions.',
    image: '/projects/CRA.png',
    github: 'https://github.com/AndrewRaj0510/Code_Review_Assistant',
  },
  {
    title: 'Healthcare Information Chatbot',
    description:
      'A local, privacy-preserving healthcare information chatbot built using RAG with Mistral 7B. Provides educational medical information with strong safety guardrails, FastAPI backend and Gradio UI.',
    image: '/projects/Healthcare Assistant.png',
    github: 'https://github.com/AndrewRaj0510/Healthcare_Chatbot',
  },
  {
    title: 'Natural Language Data Visualizer',
    description:
      'A Streamlit app integrated with an LLM that allows users to interact with datasets using natural language prompts. Auto-cleans data and creates meaningful visualizations without writing code.',
    image: '/projects/NLDV.png',
    github: 'https://github.com/AndrewRaj0510/Natural_Language_Data_Visualizer',
  },
  {
    title: 'Automated Image Generation',
    description:
      'Fully automated image-generation workflow that auto-posts and markets on social media. Integrated with Web APIs (Google, Meta, X) for seamless multiplatform campaign execution.',
    image: '/projects/ImgGen.jpeg',
    github: 'https://github.com/AndrewRaj0510/Automated-Image-Generation',
  },
]

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <PrismBackground />
      <Navbar />
      <div className="relative z-10 flex flex-col items-center min-h-screen pt-20 pb-12 px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">
          Projects
        </h1>

        {/* Animated project list */}
        <AnimatedList items={projects} />
      </div>
    </main>
  )
}
