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
    image: '/projects/portfolio-website/cover.png',
    github: 'https://github.com/AndrewRaj0510/Portfolio',
    visibility: 'public',
    deployed: true,
    details: [
      'This very portfolio is a modern, responsive single-page site that presents my background, skills, experience, and project work in one place.',
      'Built as a Next.js App Router app where each section (intro, about, skills, projects, contact) is its own client component composed onto the page, with anchor-based smooth scrolling between them. WebGL shader visuals (a ray-marched prism background and a loading-screen scan effect) are loaded dynamically on the client to avoid SSR issues, while a floating CardNav navbar animates with GSAP.',
      'Tech stack: Next.js 16, React 19, Tailwind CSS, Three.js, and GSAP animations, deployed on Vercel.',
    ],
    gallery: [],
  },
  {
    title: 'Content Creation Agent',
    description:
      'An AI content-automation platform for an eCommerce media brand that fetches and scores industry news, then drafts, illustrates, and publishes social posts through a review-and-approve dashboard.',
    image: '/projects/content-creation-agent/cover.png',
    github: 'https://github.com/AndrewRaj0510/Content-Creation-Agent',
    visibility: 'private',
    deployed: true,
    details: [
      "An AI content-automation platform built for Let's Talk eCommerce (LTE), a Dubai-based eCommerce media brand, that turns a daily news feed into review-ready LinkedIn and Instagram posts.",
      'A three-layer system. A FastAPI backend ingests 50+ RSS feeds and NewsData.io results, deduplicates them, and scores relevance with an LLM, pruning anything below the 0.7 threshold. A Next.js dashboard then drafts post copy and image prompts with GPT-4o-mini and hands rendering off to n8n workflows, which produce single images or multi-slide carousel decks (1 to 5 images, for both LinkedIn and Instagram) and upload them to AWS S3. Editors work a pending, approved, and published queue with live preview, one-click copy, and per-slide prompt access; on approval the backend stitches carousel slides into a LinkedIn-ready PDF and n8n drives the final publish, with email notifications on each transition. A feed-preference learning layer biases the automated story picker toward the kinds of feeds editors actually hand-pick.',
      'Tech stack: Next.js 15, React 19, TypeScript, and Tailwind CSS 4; FastAPI, SQLAlchemy, and Pydantic on a Python 3.12 backend; PostgreSQL; OpenAI GPT-4o-mini and text-embedding-3-small; n8n automation; AWS S3 for image hosting; deployed on AWS Amplify and Docker.',
    ],
    gallery: [
      '/projects/content-creation-agent/1.png',
      '/projects/content-creation-agent/2.png',
      '/projects/content-creation-agent/3.png',
      '/projects/content-creation-agent/4.png',
    ],
  },
  {
    title: 'Job Scraper Console',
    description:
      'A browser-based console for running hiring-post scrapers across Reddit, Upwork, and LinkedIn, with live results, CSV/XLSX export, and a persisted run history.',
    image: '/projects/job-scraper-console/cover.png',
    github: 'https://github.com/AndrewRaj0510/Scraper-Web',
    visibility: 'private',
    deployed: true,
    details: [
      'A two-service web app that runs hiring-post scrapers from the browser, pulling job and gig leads from Reddit, Upwork, and LinkedIn into structured, exportable tables.',
      "A Next.js frontend offers a form per scraper and proxies authenticated requests to a FastAPI backend, which runs the Python scrapers: the Reddit scraper queries search.rss across a list of hiring phrases (throttled to stay under Reddit's rate limit), dedupes, and floats priority-keyword matches to the top; the Upwork scraper wraps an Apify actor; and the LinkedIn scraper runs in two modes, Posts and Jobs, each backed by its own Apify actor and filter set. Access is gated by a login that issues an HMAC-signed session token. Every run is persisted to PostgreSQL and its XLSX and log artifacts are uploaded to S3, all browsable from a Run History page.",
      'Tech stack: Next.js (App Router), React, and TypeScript on the frontend; FastAPI and SQLAlchemy on the backend; PostgreSQL; AWS S3 for artifacts; Apify actors for Upwork and LinkedIn; containerized with Docker and deployable to AWS Amplify and App Runner.',
    ],
    gallery: [
      '/projects/job-scraper-console/1.png',
      '/projects/job-scraper-console/2.png',
      '/projects/job-scraper-console/3.png',
    ],
  },
  {
    title: 'AIRNotes',
    description: 'In Development',
    image: '/projects/airnotes/cover.png',
    github: 'https://github.com/AndrewRaj0510/AIRNotes',
    visibility: 'public',
    details: [
      'An AI-powered document processor and study assistant that lets you chat with a local LLM, analyze uploaded documents, and manage past conversations, all running privately on your own machine.',
      'A Next.js frontend talks to a FastAPI backend that persists conversations and messages in PostgreSQL and proxies prompts to a locally hosted model through Ollama. Replies stream back token-by-token over Server-Sent Events, conversations are auto-named from their content, uploaded files are tracked with metadata, and a Normal-vs-Thinking toggle switches between fast answers and deeper reasoning.',
      'Tech stack: Next.js 16, React 18, TypeScript, and Tailwind CSS on the frontend; FastAPI and PostgreSQL on the backend; Ollama running a local Qwen model for inference.',
    ],
    gallery: [],
  },
  {
    title: 'AI Travel Planner',
    description: 'Search flights, get real-time prices, and receive AI-generated reliability reports with delay patterns, cancellation history, and smart booking verdicts.',
    image: '/projects/ai-travel-planner/cover.png',
    github: 'https://github.com/AndrewRaj0510/AI-Travel-Planner',
    visibility: 'private',
    deployed: true,
    details: [
      'An AI flight-intelligence platform that helps you decide which flight to actually book by pairing live prices with historical reliability and an AI-generated verdict.',
      'A Next.js frontend calls a FastAPI backend that pulls real-time fares from SerpApi’s Google Flights engine (cached per day to avoid repeat paid calls), while a separate Playwright scraper collects FlightRadar24 on-time, delay, and cancellation history on an n8n schedule into Supabase. A Groq-hosted Llama model then analyzes the combined data to produce reliability reports, delay-pattern and best-time-to-fly insights, and a multi-turn chat grounded in the flight data.',
      'Tech stack: Next.js 14, React 19, Tailwind CSS, Framer Motion, and Recharts; FastAPI backend; Supabase (PostgreSQL); Groq Cloud (Llama 3.3 70B); SerpApi for live prices; a Playwright scraper with n8n scheduling; deployed across Vercel and Render.',
    ],
    gallery: [
      '/projects/ai-travel-planner/1.png',
      '/projects/ai-travel-planner/2.png',
      '/projects/ai-travel-planner/3.png',
    ],
  },
  {
    title: 'Stock Predictor',
    description:
      'AI-powered stock prediction platform that tracks 60+ stocks using machine learning models (XGBoost, Random Forest, Logistic Regression) with SHAP explainability. Ingests daily market data from Financial Modeling Prep API, engineers technical features, and serves predictions through a FastAPI backend and Next.js dashboard.',
    image: '/projects/stock-predictor/cover.png',
    github: 'https://github.com/AndrewRaj0510/Stock_Predictor',
    visibility: 'public',
    details: [
      'An AI-powered platform that tracks 60+ stocks and serves daily buy/sell signals, each with a confidence score and a per-prediction explanation.',
      'A daily pipeline ingests end-of-day prices from the Financial Modeling Prep API into an embedded DuckDB store, engineers technical features (log returns, moving averages, volatility, volume ratios), and builds multi-horizon prediction targets. Per-ticker classifiers are retrained weekly with 5-fold time-series cross-validation, and a FastAPI service serves their predictions, each annotated with SHAP feature drivers, to a Next.js dashboard that charts signals and price history.',
      'Tech stack: Next.js 16, React 19, TypeScript, Tailwind CSS, and Chart.js/Recharts; FastAPI backend; DuckDB storage; scikit-learn, XGBoost, Prophet, and PyTorch for modeling; SHAP for explainability.',
    ],
    gallery: ['/projects/stock-predictor/1.png', '/projects/stock-predictor/2.png'],
  },
  {
    title: 'Employee Performance Reporting',
    description:
      'A Hybrid RAG (Retrieval Augmented Generation) System that intelligently routes HR related queries to either SQL databases or vector-based document search, or both. The system uses a cloud LLM (via Ollama) to understand intent and generate responses with evidence.',
    image: '/projects/employee-performance-reporting/cover.png',
    github: 'https://github.com/AndrewRaj0510/Employee-Performance-Reporting',
    visibility: 'private',
    deployed: true,
    details: [
      'A hybrid RAG HR-analytics system that answers natural-language questions about employees by drawing on structured records, performance documents, and organizational relationships.',
      'A FastAPI orchestrator first classifies each question’s intent and routes it to one of three stores: PostgreSQL for structured metrics (via LLM text-to-SQL), ChromaDB for semantic search over review documents, or a NetworkX knowledge graph for relationship and reporting-chain queries. For complex questions it decomposes them across several stores before synthesizing a single answer with a local Ollama LLM. It also ships a self-service upload pipeline that cleans dropped CSV/XLSX files, schema-matches them, and ingests them into the right store, while logging every interaction for audit.',
      'Tech stack: Next.js 15, React 19, TypeScript, and Tailwind CSS; FastAPI backend; PostgreSQL, ChromaDB, and a NetworkX graph; LangChain orchestration; HuggingFace all-MiniLM-L6-v2 embeddings; Ollama for local LLM inference.',
    ],
    gallery: [
      '/projects/employee-performance-reporting/1.png',
      '/projects/employee-performance-reporting/2.png',
    ],
  },
  {
    title: 'WhatsApp ChatWidget',
    description:
      'An embeddable, WhatsApp-style chat widget that drops into any website, answering visitor questions from a vector knowledge base and capturing support tickets, sales leads, and consultation bookings.',
    image: '/projects/whatsapp-chatwidget/cover.png',
    github: 'https://github.com/AndrewRaj0510/Whatsapp-Chatbot',
    visibility: 'private',
    details: [
      'An AI-powered, WhatsApp-style chat widget that embeds into any site via a single script tag, giving visitors instant answers and conversational flows for support, sales, and consultation booking.',
      'On each message an Express backend checks the session state, runs a regex fast-path for greetings, and otherwise classifies intent with GPT-4o-mini into one of four routes: casual chat, FAQ, support, or sales. FAQ answers are retrieval-augmented, embedding the query and running a pgvector similarity search over a knowledge base before the LLM responds; support and sales run multi-step forms that create tickets and qualified leads, trigger team email notifications, and offer a one-click WhatsApp handoff. A response cache, per-IP rate limiting, CORS allowlisting, and input sanitization harden it for production.',
      'Tech stack: React 18, Tailwind CSS, and Framer Motion bundled as an embeddable IIFE widget; an Express.js API; OpenAI GPT-4o-mini and text-embedding-3-small; PostgreSQL with pgvector on Supabase; optional SMTP/webhook email notifications.',
    ],
    gallery: [
      '/projects/whatsapp-chatwidget/1.png',
      '/projects/whatsapp-chatwidget/2.png',
      '/projects/whatsapp-chatwidget/3.png',
      '/projects/whatsapp-chatwidget/4.png',
    ],
  },
  {
    title: 'Code Review Assistant',
    description:
      'A modern full stack web application that analyzes and reviews code using LLMs, with a sleek UI built using Next.js and Tailwind CSS. Provides real time code review, formatting, and suggestions.',
    image: '/projects/code-review-assistant/cover.png',
    github: 'https://github.com/AndrewRaj0510/Code_Review_Assistant',
    visibility: 'public',
    details: [
      'A full-stack web app that reviews pasted or uploaded code with an LLM and returns issues, suggestions, and improvements in a clean, formatted panel.',
      'The Next.js frontend sends code to a custom /review endpoint on a FastAPI backend, which forwards it to a locally hosted model through LM Studio’s OpenAI-compatible interface; the returned review is rendered with syntax highlighting and supports copy-out and light/dark themes.',
      'Tech stack: Next.js, React, Tailwind CSS, Framer Motion, shadcn/ui, and syntax highlighting on the frontend; FastAPI backend; LM Studio serving a local LLM.',
    ],
    gallery: ['/projects/code-review-assistant/1.png', '/projects/code-review-assistant/2.png'],
  },
  {
    title: 'Healthcare Information Chatbot',
    description:
      'A local, privacy-preserving healthcare information chatbot built using RAG with Mistral 7B. Provides educational medical information with strong safety guardrails, FastAPI backend and Gradio UI.',
    image: '/projects/healthcare-chatbot/cover.png',
    github: 'https://github.com/AndrewRaj0510/Healthcare_Chatbot',
    visibility: 'public',
    details: [
      'A local, privacy-preserving chatbot that answers general healthcare questions with educational information and strong non-diagnostic safety guardrails.',
      'It is retrieval-augmented: a 16K-row healthcare Q&A dataset is chunked and embedded into a local vector store, and at query time the most relevant references are retrieved and passed as context to a Mistral 7B model served locally through LM Studio. A safety prompt enforces non-definitive language and consistent doctor-referral disclaimers, and everything is exposed through a FastAPI backend with a Gradio chat UI.',
      'Tech stack: Python; FastAPI backend; Gradio UI; LM Studio serving Mistral 7B Instruct; Sentence-Transformers (all-MiniLM-L6-v2) embeddings; FAISS / local vector DB for retrieval.',
    ],
    gallery: ['/projects/healthcare-chatbot/2.png', '/projects/healthcare-chatbot/3.png'],
  },
  {
    title: 'Natural Language Data Visualizer',
    description:
      'A Streamlit app integrated with an LLM that allows users to interact with datasets using natural language prompts. Auto-cleans data and creates meaningful visualizations without writing code.',
    image: '/projects/natural-language-data-visualizer/cover.png',
    github: 'https://github.com/AndrewRaj0510/Natural_Language_Data_Visualizer',
    visibility: 'public',
    details: [
      'A Streamlit app that lets you explore, clean, and visualize any dataset through plain-English prompts, with no code required.',
      'Once a dataset is uploaded, the app auto-cleans it (removing duplicates, filling missing values, coercing types) and persists cleaned versions so progress survives refreshes. Natural-language requests like “show average sales by region” are sent to a local LLM that generates valid pandas/seaborn code, which is then executed to render the chart, with support for groupby aggregations.',
      'Tech stack: Python, Streamlit, pandas, and Seaborn/Matplotlib; a local OpenAI-compatible LLM (e.g. CodeLlama via LM Studio) for query interpretation, fully local with no API keys.',
    ],
    gallery: ['/projects/natural-language-data-visualizer/1.png'],
  },
  {
    title: 'Automated Image Generation',
    description:
      'Fully automated image-generation workflow that auto-posts and markets on social media. Integrated with Web APIs (Google, Meta, X) for seamless multiplatform campaign execution.',
    image: '/projects/automated-image-generation/cover.jpeg',
    github: 'https://github.com/AndrewRaj0510/Automated-Image-Generation',
    visibility: 'public',
    details: [
      'A fully automated, hands-off workflow that generates branded images and markets them across social platforms on a daily schedule.',
      'Built in n8n, four time-triggered runs fire across social peak hours; each picks a random persona and a keyword from a 400+ list, sends it to GPT-4 for structured analysis, crafts a style-specific prompt (meme, cinematic, ad, or shock-bait), and generates a 1536×1024 image with gpt-image-1. Context-aware captions and hashtags are written by GPT-4o, then files are renamed, pushed to Google Drive, given a public URL via ImageKit, logged for audit and retries, and published as individual posts or carousels through the Meta and X APIs.',
      'Tech stack: n8n, Python, and JavaScript; OpenAI (GPT-4, GPT-4o, gpt-image-1); Google, Meta, and X APIs; Google Drive and ImageKit for storage and hosting.',
    ],
    gallery: ['/projects/automated-image-generation/1.jpg', '/projects/automated-image-generation/2.jpg', '/projects/automated-image-generation/3.jpg'],
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
