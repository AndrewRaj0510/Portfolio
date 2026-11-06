// Private projects have no `github` here: this repo is public, so their URLs live in the
// gitignored private-repos.local.json. Don't add them back.
import ProjectsView from '@/components/ProjectsView'

// Sidebar order; every project's `group` must be one of these.
const projectGroups = [
  'AI Agents and Apps',
  'Data and ML',
  'RAG Pipelines and Chatbots',
  'Additional Projects',
  'Misc',
]

const projects = [
  {
    title: 'Content Creation Agent',
    description:
      'An AI content-automation platform for an eCommerce media brand that fetches and scores industry news, then drafts, illustrates, and publishes social posts through a review-and-approve dashboard.',
    image: '/projects/content-creation-agent/cover.png',
    visibility: 'private',
    deployed: true,
    group: 'AI Agents and Apps',
    overview: [
      'An AI content-automation platform built for Let\'s Talk eCommerce (LTE), a Dubai-based eCommerce media brand.',
      'Turns a daily news feed into review-ready LinkedIn and Instagram posts.',
      'Fetches and scores industry news, then drafts and illustrates the posts.',
      'Posts go through a review-and-approve dashboard before they are published.',
    ],
    howItWorks:
      'A three-layer system. A FastAPI backend ingests 50+ RSS feeds and NewsData.io results, deduplicates them, and scores relevance with an LLM, pruning anything below the 0.7 threshold. A Next.js dashboard then drafts post copy and image prompts with GPT-4o-mini and hands rendering off to n8n workflows, which produce single images or multi-slide carousel decks (1 to 5 images, for both LinkedIn and Instagram) and upload them to AWS S3. Editors work a pending, approved, and published queue with live preview, one-click copy, and per-slide prompt access; on approval the backend stitches carousel slides into a LinkedIn-ready PDF and n8n drives the final publish, with email notifications on each transition. A feed-preference learning layer biases the automated story picker toward the kinds of feeds editors actually hand-pick.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'Python 3.12', 'PostgreSQL', 'OpenAI GPT-4o-mini', 'text-embedding-3-small', 'n8n', 'AWS S3', 'AWS Amplify', 'Docker'],
    gallery: [
      '/projects/content-creation-agent/1.png',
      '/projects/content-creation-agent/2.png',
      '/projects/content-creation-agent/3.png',
      '/projects/content-creation-agent/4.png',
    ],
  },
  {
    title: 'Microsoft CloudOptima',
    description:
      'A multi-agent cloud architecture designer: describe your infrastructure, and five AI agents collaborate to design, cost, secure, and validate an Azure deployment. In development.',
    image: null,
    github: 'https://github.com/G-Narendra/Microsoft_CloudOptima',
    visibility: 'public',
    group: 'AI Agents and Apps',
    overview: [
      'A team-built multi-agent AI system that replaces hours of clicking through the Azure Portal.',
      'You describe what you need, and five specialist agents work on it together.',
      'An Architect designs the compute, storage, network, and data tiers, and a Cost Analyst estimates monthly spend and finds savings.',
      'A Security Engineer scans for vulnerabilities, a Compliance Officer checks the design against regulations such as PDPL, HIPAA, and SOC 2, and a Judge resolves disagreements.',
      'The output is a complete architecture plan with IaC templates, a cost breakdown, a security report, and compliance status.',
      'In development: the foundation is complete, and the agents, orchestrator, and dashboard are next.',
    ],
    howItWorks:
      'Security is built into every layer: prompt-injection defences, strict Pydantic schema validation of every agent output, input sanitization, rate limiting, and append-only audit logging. The configuration and domain models, the LLM client layer (Nvidia NIM and Azure OpenAI, with retries and a response cache), input sanitization, and logging and health checks are complete; the agents, orchestrator, and Streamlit dashboard are next.',
    stack: ['Python 3.11', 'Pydantic v2', 'Nvidia NIM', 'Azure OpenAI', 'Streamlit', 'Docker', 'Azure App Service'],
    gallery: [],
  },
  {
    title: 'Job Scraper Console',
    description:
      'A browser-based console for running hiring-post scrapers across Reddit, Upwork, and LinkedIn, with live results, CSV/XLSX export, and a persisted run history.',
    image: '/projects/job-scraper-console/cover.png',
    visibility: 'private',
    deployed: true,
    group: 'AI Agents and Apps',
    overview: [
      'A two-service web app that runs hiring-post scrapers from the browser.',
      'Pulls job and gig leads from Reddit, Upwork, and LinkedIn into structured, exportable tables.',
      'Shows live results, with CSV and XLSX export and a persisted run history.',
    ],
    howItWorks:
      "A Next.js frontend offers a form per scraper and proxies authenticated requests to a FastAPI backend, which runs the Python scrapers: the Reddit scraper queries search.rss across a list of hiring phrases (throttled to stay under Reddit's rate limit), dedupes, and floats priority-keyword matches to the top; the Upwork scraper wraps an Apify actor; and the LinkedIn scraper runs in two modes, Posts and Jobs, each backed by its own Apify actor and filter set. Access is gated by a login that issues an HMAC-signed session token. Every run is persisted to PostgreSQL and its XLSX and log artifacts are uploaded to S3, all browsable from a Run History page.",
    stack: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'AWS S3', 'Apify', 'Docker', 'AWS Amplify', 'AWS App Runner'],
    gallery: [
      '/projects/job-scraper-console/1.png',
      '/projects/job-scraper-console/2.png',
      '/projects/job-scraper-console/3.png',
    ],
  },
  {
    title: 'Automated Image Generation',
    description:
      'Fully automated image-generation workflow that auto-posts and markets on social media. Integrated with Web APIs (Google, Meta, X) for seamless multiplatform campaign execution.',
    image: '/projects/automated-image-generation/cover.jpeg',
    github: 'https://github.com/AndrewRaj0510/Automated-Image-Generation',
    visibility: 'public',
    group: 'AI Agents and Apps',
    overview: [
      'A fully automated, hands-off workflow that generates branded images.',
      'Markets them across social platforms on a daily schedule.',
      'Integrated with Google, Meta, and X APIs for multiplatform campaign execution.',
    ],
    howItWorks:
      'Built in n8n, four time-triggered runs fire across social peak hours; each picks a random persona and a keyword from a 400+ list, sends it to GPT-4 for structured analysis, crafts a style-specific prompt (meme, cinematic, ad, or shock-bait), and generates a 1536×1024 image with gpt-image-1. Context-aware captions and hashtags are written by GPT-4o, then files are renamed, pushed to Google Drive, given a public URL via ImageKit, logged for audit and retries, and published as individual posts or carousels through the Meta and X APIs.',
    stack: ['n8n', 'Python', 'JavaScript', 'GPT-4', 'GPT-4o', 'gpt-image-1', 'Google APIs', 'Meta API', 'X API', 'Google Drive', 'ImageKit'],
    gallery: ['/projects/automated-image-generation/1.jpg', '/projects/automated-image-generation/2.jpg', '/projects/automated-image-generation/3.jpg'],
  },
  {
    title: 'AIRNotes',
    description: 'In Development',
    image: '/projects/airnotes/cover.png',
    github: 'https://github.com/AndrewRaj0510/AIRNotes',
    visibility: 'public',
    group: 'AI Agents and Apps',
    overview: [
      'An AI-powered document processor and study assistant.',
      'Lets you chat with a local LLM, analyze uploaded documents, and manage past conversations.',
      'Runs privately on your own machine.',
      'In development.',
    ],
    howItWorks:
      'A Next.js frontend talks to a FastAPI backend that persists conversations and messages in PostgreSQL and proxies prompts to a locally hosted model through Ollama. Replies stream back token-by-token over Server-Sent Events, conversations are auto-named from their content, uploaded files are tracked with metadata, and a Normal-vs-Thinking toggle switches between fast answers and deeper reasoning.',
    stack: ['Next.js 16', 'React 18', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Ollama', 'Qwen'],
    gallery: [],
  },
  {
    title: 'Property Investment Intelligence',
    description:
      'An MSc dissertation project that predicts and explains the gross rental yield of Dubai properties and turns a pasted Bayut or Dubizzle listing into an invest-or-avoid verdict, using real Dubai Land Department sales and Ejari rent data.',
    image: null,
    github: 'https://github.com/AndrewRaj0510/Property_Investment_Intelligence',
    visibility: 'public',
    group: 'Data and ML',
    overview: [
      'My MSc Data Science dissertation at Middlesex University Dubai.',
      'Predicts and explains the gross rental yield of Dubai properties, using real Dubai Land Department sales and Ejari rent data.',
      'A listing only states half of the yield ratio: a sale listing has the price but not the rent, and a rent listing has the rent but not the price.',
      'A model trained on the official market supplies the missing half, computes the listing\'s gross yield, and benchmarks it against comparable stock.',
      'Returns a verdict of Good investment, Below market, or Insufficient data.',
    ],
    howItWorks:
      'An offline pipeline ingests 117k DLD sale transactions and 250k Ejari rent contracts (2012 to 2026) from the Dubai DDA OpenAPI, cleans them in SQL, and distils them into about 2,550 market segments. LightGBM, Random Forest, and XGBoost were compared under identical 5-fold cross-validation, and XGBoost was selected. A FastAPI backend serves the model and a live listing scorer that pulls the listing through Apify, explains every prediction with SHAP feature attributions, and adds an LLM-generated narrative with grounded Q&A. Macroeconomic, weather, and seasonal features were also ingested and measured; they added no predictive power, which is reported as a finding. Outside the covered areas, the app refuses to give a verdict rather than extrapolate.',
    stack: ['Python', 'FastAPI', 'XGBoost', 'LightGBM', 'SHAP', 'LangChain', 'OpenAI (GPT-5)', 'Supabase PostgreSQL', 'Apify', 'Next.js 14', 'TypeScript'],
    gallery: [],
  },
  {
    title: 'ClaimLens',
    description:
      'A multimodal insurance-claims copilot: a vision model finds and measures car damage from customer photos, and a LangGraph agent checks the policy, prices the repair, and looks for fraud signals through MCP tools. Only a human adjuster can approve, edit, or reject a claim.',
    image: '/projects/claimlens/cover.jpg',
    github: 'https://github.com/AndrewRaj0510/ClaimLens',
    visibility: 'public',
    group: 'Data and ML',
    overview: [
      'A multimodal insurance-claims copilot built like a production system rather than a notebook demo.',
      'A customer uploads photos of a damaged car and describes what happened.',
      'A YOLO11-seg model trained on CarDD finds and measures the damage, with a mask mAP@0.5 of 0.77 on the test split.',
      'A LangGraph agent checks the policy, prices the repair, and looks for fraud signals.',
      'No approval tool exists, so only a human adjuster can approve, edit, or reject the claim.',
    ],
    howItWorks:
      'A Next.js frontend talks to a FastAPI gateway that handles logins and roles, stores photos, and queues detection jobs on Redis Streams for ONNX Runtime vision workers. The agent runs a workflow checkpointed in Postgres and reaches policy, pricing, and claims-history data through three MCP servers; code does the maths while the LLM only reads and writes text. Guardrails scan descriptions, policy clauses, and text in photos for prompt injection, redact faces and text before any photo reaches the vision LLM, and run image forensics. If a check fails or a token budget is spent, the step falls back to code and the claim goes to a person. CI gates cover every LLM step and the red-team sets (72.6% of attacks caught on a held-out set, 78.8% excluding labelled limits). On a local Kubernetes (kind) cluster it reached 600 API requests/s at p95 29 ms, with KEDA scaling vision workers on queue lag; the charts are ready, but the cloud deployment was dropped for cost.',
    stack: ['Python 3.11', 'FastAPI', 'LangGraph', 'MCP', 'YOLO11-seg', 'ONNX Runtime', 'Next.js 16', 'PostgreSQL', 'pgvector', 'Redis Streams', 'SeaweedFS', 'Ollama Cloud', 'Langfuse', 'Docker', 'Kubernetes', 'Helm', 'NGINX Gateway Fabric', 'KEDA', 'Prometheus', 'Grafana'],
    gallery: [
      '/projects/claimlens/1.jpg',
      '/projects/claimlens/2.png',
      '/projects/claimlens/3.png',
      '/projects/claimlens/4.png',
      '/projects/claimlens/5.jpg',
      '/projects/claimlens/6.jpg',
      '/projects/claimlens/7.png',
    ],
    imageCredit: {
      text: 'Car photos in the screenshots: Shixart1985 (CC BY 2.0) and Rico Loeb (CC0), via Wikimedia Commons.',
      href: 'https://github.com/AndrewRaj0510/ClaimLens#data-and-licences',
    },
  },
  {
    title: 'WikiGuard',
    description:
      'A live Wikipedia vandalism detector designed as a production-style MLOps system on free-tier services. In development: the data pipeline runs locally, while scoring, the API, and the UI are still to come.',
    image: null,
    github: 'https://github.com/AndrewRaj0510/WikiGuard',
    visibility: 'public',
    group: 'Data and ML',
    overview: [
      'A live Wikipedia vandalism detector, designed as a production-style MLOps system on free-tier services.',
      'Will score English Wikipedia edits for vandalism risk and show the riskiest first in a review queue for human patrollers.',
      'Will offer a one-line LLM explanation of what each edit did.',
      'Never reverts anything itself: a person always decides.',
      'In development, with no scoring, API, UI, or model results yet.',
    ],
    howItWorks:
      'The data pipeline runs locally today: live edits go through Redpanda to a parquet archive, with labels, purging, and retention, and a 100k-edit backfill is still running. Planned next are five neural networks compared on the same data (an MLP baseline, BiLSTM with GloVe, DistilBERT, BERT, and RoBERTa), with the champion chosen by evaluation; community reverts used as free labels to measure live accuracy two days later; and weekly retraining, sooner if drift appears, that promotes a new model only if it passes a strict gate.',
    stackNote: 'Mostly planned: only the data pipeline is built so far.',
    stack: ['Python 3.11', 'Redpanda', 'Parquet', 'PostgreSQL', 'Docker', 'FastAPI', 'Next.js', 'k3s', 'MLflow', 'DVC', 'Prometheus', 'Grafana', 'Evidently', 'GitHub Actions', 'Argo CD'],
    gallery: [],
  },
  {
    title: 'Stock Predictor',
    description:
      'AI-powered stock prediction platform that tracks 60+ stocks using machine learning models (XGBoost, Random Forest, Logistic Regression) with SHAP explainability. Ingests daily market data from Financial Modeling Prep API, engineers technical features, and serves predictions through a FastAPI backend and Next.js dashboard.',
    image: '/projects/stock-predictor/cover.png',
    github: 'https://github.com/AndrewRaj0510/Stock_Predictor',
    visibility: 'public',
    group: 'Data and ML',
    overview: [
      'An AI-powered platform that tracks 60+ stocks.',
      'Serves daily buy/sell signals, each with a confidence score and a per-prediction explanation.',
      'Uses machine learning models such as XGBoost, Random Forest, and Logistic Regression, with SHAP explainability.',
      'Ingests daily market data from the Financial Modeling Prep API and serves predictions through a FastAPI backend and Next.js dashboard.',
    ],
    howItWorks:
      'A daily pipeline ingests end-of-day prices from the Financial Modeling Prep API into an embedded DuckDB store, engineers technical features (log returns, moving averages, volatility, volume ratios), and builds multi-horizon prediction targets. Per-ticker classifiers are retrained weekly with 5-fold time-series cross-validation, and a FastAPI service serves their predictions, each annotated with SHAP feature drivers, to a Next.js dashboard that charts signals and price history.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Recharts', 'FastAPI', 'DuckDB', 'scikit-learn', 'XGBoost', 'Prophet', 'PyTorch', 'SHAP'],
    gallery: ['/projects/stock-predictor/1.png', '/projects/stock-predictor/2.png'],
  },
  {
    title: 'Employee Performance Reporting',
    description:
      'A Hybrid RAG (Retrieval Augmented Generation) System that intelligently routes HR related queries to either SQL databases or vector-based document search, or both. The system uses a cloud LLM (via Ollama) to understand intent and generate responses with evidence.',
    image: '/projects/employee-performance-reporting/cover.png',
    visibility: 'private',
    deployed: true,
    group: 'RAG Pipelines and Chatbots',
    overview: [
      'A hybrid RAG HR-analytics system that answers natural-language questions about employees.',
      'Draws on structured records, performance documents, and organizational relationships.',
      'Routes each question to the right data source, or to several for complex questions.',
      'Generates responses with evidence.',
    ],
    howItWorks:
      'A FastAPI orchestrator first classifies each question’s intent and routes it to one of three stores: PostgreSQL for structured metrics (via LLM text-to-SQL), ChromaDB for semantic search over review documents, or a NetworkX knowledge graph for relationship and reporting-chain queries. For complex questions it decomposes them across several stores before synthesizing a single answer with a local Ollama LLM. It also ships a self-service upload pipeline that cleans dropped CSV/XLSX files, schema-matches them, and ingests them into the right store, while logging every interaction for audit.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'ChromaDB', 'NetworkX', 'LangChain', 'HuggingFace all-MiniLM-L6-v2', 'Ollama'],
    gallery: [
      '/projects/employee-performance-reporting/1.png',
      '/projects/employee-performance-reporting/2.png',
    ],
  },
  {
    title: 'AI Travel Planner',
    description: 'Search flights, get real-time prices, and receive AI-generated reliability reports with delay patterns, cancellation history, and smart booking verdicts.',
    image: '/projects/ai-travel-planner/cover.png',
    visibility: 'private',
    deployed: true,
    group: 'RAG Pipelines and Chatbots',
    overview: [
      'An AI flight-intelligence platform that helps you decide which flight to actually book.',
      'Searches flights and shows real-time prices.',
      'Pairs live prices with historical reliability, including delay patterns and cancellation history.',
      'Produces AI-generated reliability reports and smart booking verdicts.',
    ],
    howItWorks:
      'A Next.js frontend calls a FastAPI backend that pulls real-time fares from SerpApi’s Google Flights engine (cached per day to avoid repeat paid calls), while a separate Playwright scraper collects FlightRadar24 on-time, delay, and cancellation history on an n8n schedule into Supabase. A Groq-hosted Llama model then analyzes the combined data to produce reliability reports, delay-pattern and best-time-to-fly insights, and a multi-turn chat grounded in the flight data.',
    stack: ['Next.js 14', 'React 19', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'FastAPI', 'Supabase', 'Groq Cloud (Llama 3.3 70B)', 'SerpApi', 'Playwright', 'n8n', 'Vercel', 'Render'],
    gallery: [
      '/projects/ai-travel-planner/1.png',
      '/projects/ai-travel-planner/2.png',
      '/projects/ai-travel-planner/3.png',
    ],
  },
  {
    title: 'WhatsApp ChatWidget',
    description:
      'An embeddable, WhatsApp-style chat widget that drops into any website, answering visitor questions from a vector knowledge base and capturing support tickets, sales leads, and consultation bookings.',
    image: '/projects/whatsapp-chatwidget/cover.png',
    visibility: 'private',
    group: 'RAG Pipelines and Chatbots',
    overview: [
      'An AI-powered, WhatsApp-style chat widget that embeds into any site via a single script tag.',
      'Gives visitors instant answers from a vector knowledge base.',
      'Runs conversational flows for support, sales, and consultation booking.',
      'Captures support tickets, sales leads, and consultation bookings.',
    ],
    howItWorks:
      'On each message an Express backend checks the session state, runs a regex fast-path for greetings, and otherwise classifies intent with GPT-4o-mini into one of four routes: casual chat, FAQ, support, or sales. FAQ answers are retrieval-augmented, embedding the query and running a pgvector similarity search over a knowledge base before the LLM responds; support and sales run multi-step forms that create tickets and qualified leads, trigger team email notifications, and offer a one-click WhatsApp handoff. A response cache, per-IP rate limiting, CORS allowlisting, and input sanitization harden it for production.',
    stack: ['React 18', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'OpenAI GPT-4o-mini', 'text-embedding-3-small', 'PostgreSQL', 'pgvector', 'Supabase'],
    gallery: [
      '/projects/whatsapp-chatwidget/1.png',
      '/projects/whatsapp-chatwidget/2.png',
      '/projects/whatsapp-chatwidget/3.png',
      '/projects/whatsapp-chatwidget/4.png',
    ],
  },
  {
    title: 'Healthcare Information Chatbot',
    description:
      'A local, privacy-preserving healthcare information chatbot built using RAG with Mistral 7B. Provides educational medical information with strong safety guardrails, FastAPI backend and Gradio UI.',
    image: '/projects/healthcare-chatbot/cover.png',
    github: 'https://github.com/AndrewRaj0510/Healthcare_Chatbot',
    visibility: 'public',
    group: 'RAG Pipelines and Chatbots',
    overview: [
      'A local, privacy-preserving chatbot that answers general healthcare questions.',
      'Provides educational information with strong non-diagnostic safety guardrails.',
      'Built using RAG with Mistral 7B, a FastAPI backend, and a Gradio UI.',
    ],
    howItWorks:
      'It is retrieval-augmented: a 16K-row healthcare Q&A dataset is chunked and embedded into a local vector store, and at query time the most relevant references are retrieved and passed as context to a Mistral 7B model served locally through LM Studio. A safety prompt enforces non-definitive language and consistent doctor-referral disclaimers, and everything is exposed through a FastAPI backend with a Gradio chat UI.',
    stack: ['Python', 'FastAPI', 'Gradio', 'LM Studio', 'Mistral 7B Instruct', 'Sentence-Transformers', 'FAISS'],
    gallery: ['/projects/healthcare-chatbot/2.png', '/projects/healthcare-chatbot/3.png'],
  },
  {
    title: 'Code Review Assistant',
    description:
      'A modern full stack web application that analyzes and reviews code using LLMs, with a sleek UI built using Next.js and Tailwind CSS. Provides real time code review, formatting, and suggestions.',
    image: '/projects/code-review-assistant/cover.png',
    github: 'https://github.com/AndrewRaj0510/Code_Review_Assistant',
    visibility: 'public',
    group: 'Additional Projects',
    overview: [
      'A full-stack web app that reviews pasted or uploaded code with an LLM.',
      'Returns issues, suggestions, and improvements in a clean, formatted panel.',
      'Provides real-time code review and formatting.',
    ],
    howItWorks:
      'The Next.js frontend sends code to a custom /review endpoint on a FastAPI backend, which forwards it to a locally hosted model through LM Studio’s OpenAI-compatible interface; the returned review is rendered with syntax highlighting and supports copy-out and light/dark themes.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'FastAPI', 'LM Studio'],
    gallery: ['/projects/code-review-assistant/1.png', '/projects/code-review-assistant/2.png'],
  },
  {
    title: 'Natural Language Data Visualizer',
    description:
      'A Streamlit app integrated with an LLM that allows users to interact with datasets using natural language prompts. Auto-cleans data and creates meaningful visualizations without writing code.',
    image: '/projects/natural-language-data-visualizer/cover.png',
    github: 'https://github.com/AndrewRaj0510/Natural_Language_Data_Visualizer',
    visibility: 'public',
    group: 'Additional Projects',
    overview: [
      'A Streamlit app that lets you explore, clean, and visualize any dataset through plain-English prompts.',
      'Auto-cleans the data and creates meaningful visualizations.',
      'No code required.',
    ],
    howItWorks:
      'Once a dataset is uploaded, the app auto-cleans it (removing duplicates, filling missing values, coercing types) and persists cleaned versions so progress survives refreshes. Natural-language requests like “show average sales by region” are sent to a local LLM that generates valid pandas/seaborn code, which is then executed to render the chart, with support for groupby aggregations.',
    stack: ['Python', 'Streamlit', 'pandas', 'Seaborn', 'Matplotlib', 'CodeLlama', 'LM Studio'],
    gallery: ['/projects/natural-language-data-visualizer/1.png'],
  },
  {
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio built with Next.js and Tailwind CSS, showcasing my experience, skills, and projects. Features WebGL shader visuals, interactive timelines, and smooth UI animations, deployed on Vercel.',
    image: '/projects/portfolio-website/cover.png',
    github: 'https://github.com/AndrewRaj0510/Portfolio',
    visibility: 'public',
    deployed: true,
    group: 'Misc',
    overview: [
      'A modern, responsive single-page site that presents my background, skills, experience, and project work in one place.',
      'Features WebGL shader visuals, interactive timelines, and smooth UI animations.',
      'Deployed on Vercel.',
    ],
    howItWorks:
      'Built as a Next.js App Router app where each section (intro, about, skills, projects, contact) is its own client component composed onto the page, with anchor-based smooth scrolling between them. WebGL shader visuals (a ray-marched prism background and a loading-screen scan effect) are loaded dynamically on the client to avoid SSR issues, while a floating CardNav navbar animates with GSAP.',
    stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Three.js', 'GSAP', 'Vercel'],
    gallery: null,
  },
]

// Safeguard: props passed to a client component reach the browser, so a URL added to a
// private project by mistake still stays off the site.
const withoutPrivateLinks = ({ github, ...project }) =>
  project.visibility === 'private' ? project : { ...project, github }

export default function ProjectsPage() {
  return (
    <ProjectsView
      projects={projects.map(withoutPrivateLinks)}
      groups={projectGroups}
    />
  )
}
