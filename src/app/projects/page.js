// Private projects have no `github` here: this repo is public, so their URLs live in the
// gitignored private-repos.local.json. Don't add them back.
import ProjectsView from '@/components/ProjectsView'

// Sidebar order; every project's `group` must be one of these.
const projectGroups = [
  'Featured',
  'AI Agents and Apps',
  'Data and ML',
  'RAG Pipelines and Chatbots',
  'Additional Projects',
  'Misc',
]

// Case-study fields, all optional: the card leaves out any section with nothing in it.
//   problem      one or two sentences
//   howItWorks   array of steps (a string still renders, as a paragraph)
//   tradeoffs    [{ choice, detail }]
//   issues       [{ issue, fix }]
//   results      [{ value, label }]
//   whatWorked, whatDidNot   arrays of short points
//   inDevelopment, statusNote   shows "In development" in the Result section
const projects = [
  {
    title: 'Content Creation Agent',
    description:
      'An AI content-automation platform for an eCommerce media brand that fetches and scores industry news, then drafts, illustrates, and publishes social posts through a review-and-approve dashboard.',
    image: '/projects/content-creation-agent/cover.png',
    visibility: 'private',
    deployed: true,
    group: 'Featured',
    problem:
      'An eCommerce media brand has to turn a constant flow of industry news into LinkedIn and Instagram posts, and by hand that means reading, writing and designing every one.',
    overview: [
      'An AI content-automation platform built for Let\'s Talk eCommerce (LTE), a Dubai-based eCommerce media brand.',
      'Turns a daily news feed into review-ready LinkedIn and Instagram posts.',
      'Fetches and scores industry news, then drafts and illustrates the posts.',
      'Posts go through a review-and-approve dashboard before they are published.',
    ],
    howItWorks: [
      'Ingest: a FastAPI backend pulls 50+ RSS feeds and NewsData.io results and removes duplicates.',
      'Score: an LLM rates each story and drops anything below 0.7.',
      'Draft: GPT-4o-mini writes the post copy and image prompts in the Next.js dashboard.',
      'Render: n8n makes single images or 1 to 5 slide carousels and uploads them to S3.',
      'Review: editors work a pending, approved and published queue, with an email at each step.',
      'Publish: approved carousels are stitched into a LinkedIn PDF, and n8n posts them.',
    ],
    tradeoffs: [
      {
        choice: 'Learned feed preference as a tiebreak only',
        detail: 'Stories editors pick by hand bias the automated picker, but only within a region.',
      },
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'Python 3.12', 'PostgreSQL', 'OpenAI GPT-4o-mini', 'text-embedding-3-small', 'n8n', 'AWS S3', 'AWS Amplify', 'Docker'],
    gallery: [
      '/projects/content-creation-agent/1.png',
      '/projects/content-creation-agent/2.png',
      '/projects/content-creation-agent/3.png',
      '/projects/content-creation-agent/4.png',
    ],
  },
  {
    title: 'ClaimLens',
    description:
      'A multimodal insurance-claims copilot: a vision model finds and measures car damage from customer photos, and a LangGraph agent checks the policy, prices the repair, and looks for fraud signals through MCP tools. Only a human adjuster can approve, edit, or reject a claim.',
    image: '/projects/claimlens/cover.jpg',
    github: 'https://github.com/AndrewRaj0510/ClaimLens',
    visibility: 'public',
    group: 'Featured',
    problem:
      'A car claim needs its photos measured, its policy checked, the repair priced and fraud signals reviewed before anyone can decide. ClaimLens does that groundwork and leaves the decision to a human adjuster.',
    overview: [
      'A customer uploads photos of a damaged car and describes what happened.',
      'A YOLO11-seg model trained on CarDD finds and measures the damage.',
      'A LangGraph agent checks the policy, prices the repair, and looks for fraud signals.',
      'No approval tool exists, so only a human adjuster can approve, edit, or reject the claim.',
    ],
    howItWorks: [
      'Intake: guardrails scan text and photos.',
      'Damage: YOLO11-seg measures the damage.',
      'Policy: code checks cover; the LLM reads the clauses.',
      'Cost and fraud: code prices the repair and flags risk.',
      'Adjuster: approves, edits or rejects.',
    ],
    tradeoffs: [
      { choice: 'ONNX Runtime over Ultralytics', detail: 'No PyTorch, but about 150 lines to own.' },
      { choice: 'Vector over hybrid search', detail: 'It matched or beat hybrid, so the simpler one shipped.' },
      { choice: 'Redis Streams over Celery', detail: 'Acks and claiming are built in.' },
    ],
    issues: [
      { issue: 'Two 24 MP photos OOM-killed the guardrails.', fix: 'Now capped per pod.' },
      { issue: 'A vision backlog drained the Redis pool.', fix: 'Waits are now capped.' },
      { issue: 'A Postgres restart left dead connections.', fix: 'Pools now check them.' },
    ],
    results: [
      { value: '0.77', label: 'mask mAP@0.5 on the test split' },
      { value: '600/s', label: 'API reads at p95 29 ms' },
      { value: '$0.0014', label: 'LLM cost per claim' },
      { value: '16.3 s', label: 'full claim to the adjuster' },
    ],
    whatWorked: [
      'Code does the maths: an injected "approve $50,000" had no effect.',
      'Every LLM step has a code fallback, so a spent budget still completes the claim.',
      'With the clause retrieved, the LLM caught 4 of 4 exclusions.',
    ],
    whatDidNot: [
      'Held-out red-team: 72.6% caught. Attacks without injection vocabulary get through.',
      'The policy model used its search tool in only 1 of 17 cases.',
      'Road hazards read as comprehensive, not collision.',
      'The cloud deployment was dropped for cost.',
    ],
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
      'A live Wikipedia vandalism detector designed as a production-style MLOps system on free-tier services. In development: five models are trained and evaluated, while scoring, the API, and the UI are still to come.',
    image: null,
    github: 'https://github.com/AndrewRaj0510/WikiGuard',
    visibility: 'public',
    group: 'Featured',
    problem:
      'English Wikipedia gets a constant stream of edits, and volunteer patrollers need to see the riskiest ones first.',
    overview: [
      'A live Wikipedia vandalism detector, designed as a production-style MLOps system on free-tier services.',
      'Will score English Wikipedia edits for vandalism risk and show the riskiest first in a review queue for human patrollers.',
      'Will offer a one-line LLM explanation of what each edit did.',
      'Never reverts anything itself: a person always decides.',
    ],
    howItWorks: [
      'Stream: live edits go through Redpanda to a parquet archive.',
      'Label: an edit reverted within 48 hours counts as a positive, so the labels are free.',
      'Train: five models are compared on a versioned dataset of about 95,000 edits.',
      'Pick: the champion is chosen by evaluation and never hard-coded.',
      'Planned: serving, a review queue, and weekly retraining behind a strict gate.',
    ],
    tradeoffs: [
      {
        choice: 'Reverts as labels',
        detail: 'Free and plentiful, but broader than vandalism: about one in five sampled reverts looked like deliberate damage.',
      },
      {
        choice: 'Smaller models kept as fallbacks',
        detail: 'DistilBERT, a BiLSTM and an MLP stand behind the RoBERTa champion.',
      },
    ],
    inDevelopment: true,
    statusNote: 'Nothing is deployed yet. These scores come from a held-out test week, not live traffic.',
    results: [
      { value: '0.364', label: 'PR-AUC, RoBERTa champion' },
      { value: '0.96', label: 'precision in the top 50 edits' },
      { value: '0.187', label: 'PR-AUC of the rule baseline' },
      { value: '25,302', label: 'edits in the test week' },
    ],
    whatWorked: [
      'On the same 2,000 edits, RoBERTa scored 0.391 PR-AUC to Wikimedia\'s RevertRisk at 0.253, as a benchmark rather than a verdict.',
    ],
    whatDidNot: [
      'BERT scored second, but quantizing it moved its score past the 0.005 limit, so it ranks behind the others.',
    ],
    stackNote: 'Mostly planned: the data pipeline and the models are built so far.',
    stack: ['Python 3.11', 'Redpanda', 'Parquet', 'PostgreSQL', 'Docker', 'FastAPI', 'Next.js', 'k3s', 'MLflow', 'DVC', 'Prometheus', 'Grafana', 'Evidently', 'GitHub Actions', 'Argo CD'],
    gallery: [],
  },
  {
    title: 'Microsoft CloudOptima',
    description:
      'A multi-agent cloud architecture designer: describe your infrastructure, and five AI agents collaborate to design, cost, secure, and validate an Azure deployment. In development.',
    image: null,
    github: 'https://github.com/G-Narendra/Microsoft_CloudOptima',
    visibility: 'public',
    group: 'AI Agents and Apps',
    problem:
      'Designing a cloud architecture in the Azure Portal takes hours of clicking, and cost, security and compliance each need their own review.',
    overview: [
      'A team-built multi-agent AI system for designing Azure architectures.',
      'An Architect designs the compute, storage, network, and data tiers, and a Cost Analyst estimates monthly spend and finds savings.',
      'A Security Engineer scans for vulnerabilities, a Compliance Officer checks the design against PDPL, HIPAA, and SOC 2, and a Judge resolves disagreements.',
      'The output is an architecture plan with IaC templates, a cost breakdown, a security report, and compliance status.',
    ],
    howItWorks: [
      'Input: requests are sanitized and rate limited before any agent sees them.',
      'Agents (planned): five specialists design, cost, secure and check the architecture.',
      'Judge (planned): settles disagreements between the specialists.',
      'Validation: every agent output must pass a strict Pydantic schema.',
      'Audit: every interaction goes to an append-only log.',
    ],
    inDevelopment: true,
    statusNote: 'Built so far: config and domain models, an LLM client for Nvidia NIM and Azure OpenAI with retries and a cache, input sanitization, and logging. The agents, orchestrator, and dashboard are next.',
    stack: ['Python 3.11', 'Pydantic v2', 'Nvidia NIM', 'Azure OpenAI', 'Streamlit', 'Docker', 'Azure App Service'],
    gallery: [],
  },
  {
    title: 'AIRNotes',
    description: 'In Development',
    image: '/projects/airnotes/cover.png',
    github: 'https://github.com/AndrewRaj0510/AIRNotes',
    visibility: 'public',
    group: 'AI Agents and Apps',
    problem:
      'Chatting with an LLM about your own documents usually means sending them to a cloud service.',
    overview: [
      'An AI-powered document processor and study assistant.',
      'Lets you chat with a local LLM, analyze uploaded documents, and manage past conversations.',
      'Runs privately on your own machine.',
    ],
    howItWorks: [
      'Chat: the Next.js app sends prompts to a FastAPI backend.',
      'Run locally: the backend forwards them to a Qwen model on Ollama.',
      'Stream: replies arrive token by token over Server-Sent Events.',
      'Store: conversations, messages and file metadata live in PostgreSQL, named from their content.',
      'Choose: a Normal or Thinking toggle picks fast answers or deeper reasoning.',
    ],
    inDevelopment: true,
    stack: ['Next.js 16', 'React 18', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Ollama', 'Qwen'],
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
    problem:
      'Hiring posts and gig leads are spread across Reddit, Upwork and LinkedIn, each with its own search and format.',
    overview: [
      'A two-service web app that runs hiring-post scrapers from the browser.',
      'Pulls job and gig leads from Reddit, Upwork, and LinkedIn into structured, exportable tables.',
      'Shows live results, with CSV and XLSX export and a persisted run history.',
    ],
    howItWorks: [
      'Pick a scraper: the Next.js app has a form for each, and proxies requests to a FastAPI backend.',
      'Reddit: search.rss across hiring phrases, throttled under the rate limit, deduped, with priority matches first.',
      'Upwork and LinkedIn: Apify actors, with separate Posts and Jobs modes for LinkedIn.',
      'Sign in: a login issues an HMAC-signed session token.',
      'Keep: every run is saved to PostgreSQL, with its XLSX and logs on S3, browsable from Run History.',
    ],
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
    problem:
      'Posting fresh branded images on several social platforms every day is repetitive work.',
    overview: [
      'A fully automated, hands-off workflow that generates branded images.',
      'Markets them across social platforms on a daily schedule.',
      'Integrated with Google, Meta, and X APIs for multiplatform campaign execution.',
    ],
    howItWorks: [
      'Trigger: four n8n runs a day, at social peak hours.',
      'Pick: a random persona and one keyword from a list of 400+.',
      'Prompt: GPT-4 analyses it and writes a meme, cinematic, ad or shock-bait prompt.',
      'Generate: gpt-image-1 makes a 1536×1024 image, and GPT-4o writes the caption and hashtags.',
      'Publish: Google Drive and ImageKit host it, the Meta and X APIs post it, and every run is logged for retries.',
    ],
    stack: ['n8n', 'Python', 'JavaScript', 'GPT-4', 'GPT-4o', 'gpt-image-1', 'Google APIs', 'Meta API', 'X API', 'Google Drive', 'ImageKit'],
    gallery: ['/projects/automated-image-generation/1.jpg', '/projects/automated-image-generation/2.jpg', '/projects/automated-image-generation/3.jpg'],
  },
  {
    title: 'Property Investment Intelligence',
    description:
      'An MSc dissertation project that predicts and explains the gross rental yield of Dubai properties and turns a pasted Bayut or Dubizzle listing into an invest-or-avoid verdict, using real Dubai Land Department sales and Ejari rent data.',
    image: null,
    github: 'https://github.com/AndrewRaj0510/Property_Investment_Intelligence',
    visibility: 'public',
    group: 'Data and ML',
    problem:
      'A listing only states half of the yield ratio: a sale listing has the price but not the rent, and a rent listing has the rent but not the price.',
    overview: [
      'My MSc Data Science dissertation at Middlesex University Dubai.',
      'Predicts and explains the gross rental yield of Dubai properties, using real Dubai Land Department sales and Ejari rent data.',
      'A model trained on the official market supplies the listing\'s missing half and benchmarks its yield against comparable stock.',
      'Returns a verdict of Good investment, Below market, or Insufficient data.',
    ],
    howItWorks: [
      'Ingest: 117k DLD sales and 250k Ejari rents (2012 to 2026).',
      'Clean: SQL distils them into about 2,550 segments.',
      'Model: XGBoost beat LightGBM and Random Forest.',
      'Score: a pasted Bayut or Dubizzle listing gets a verdict.',
      'Explain: SHAP attributions and an LLM narrative with grounded Q&A.',
    ],
    tradeoffs: [
      { choice: 'Segment grain, not transaction grain', detail: 'No key pairs a single sale with a single rent, so the unit is the market segment.' },
      { choice: 'An honest, un-imputed target', detail: 'Segments without both real sales and real rents are dropped rather than imputed.' },
      { choice: 'Train and serve on the same features', detail: 'Listing-only details such as floor or view feed the narrative, never the model.' },
    ],
    issues: [
      {
        issue: 'Two per-sqm features share the target\'s own medians, inflating R² by about 0.20.',
        fix: 'Measured with a leakage check. Retraining without them is the outstanding fix.',
      },
    ],
    results: [
      { value: '0.66', label: 'leakage-free CV R²' },
      { value: '0.399', label: 'R² of the no-model baseline' },
      { value: '367k', label: 'real sales and rent records' },
      { value: '71', label: 'Dubai communities covered' },
    ],
    whatWorked: [
      'XGBoost beat LightGBM and Random Forest under identical cross-validation.',
      'SHAP drivers agreed with published literature (rank consistency 0.943, a post-hoc check).',
      'It refuses to score without comparable data rather than extrapolate.',
    ],
    whatDidNot: [
      'Macro, weather and seasonal features added no accuracy (ΔR² −0.0004).',
      'Tourism data was de-scoped and never ingested.',
      'The served model still includes the leaking features.',
    ],
    stack: ['Python', 'FastAPI', 'XGBoost', 'LightGBM', 'SHAP', 'LangChain', 'OpenAI (GPT-5)', 'Supabase PostgreSQL', 'Apify', 'Next.js 14', 'TypeScript'],
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
    problem:
      'Most stock signals give a call without saying why, so there is no way to judge whether to trust it.',
    overview: [
      'An AI-powered platform that tracks 60+ stocks.',
      'Serves daily buy/sell signals, each with a confidence score and a per-prediction explanation.',
      'Uses machine learning models such as XGBoost, Random Forest, and Logistic Regression, with SHAP explainability.',
    ],
    howItWorks: [
      'Ingest: end-of-day prices from the Financial Modeling Prep API into DuckDB, every trading day.',
      'Engineer: log returns, moving averages, volatility and volume ratios.',
      'Target: prediction targets over several horizons.',
      'Train: per-ticker classifiers, retrained weekly with 5-fold time-series cross-validation.',
      'Serve: FastAPI returns each signal with its SHAP drivers to a Next.js dashboard.',
    ],
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
    problem:
      'HR questions need answers from structured records, review documents and reporting lines, which live in different places.',
    overview: [
      'A hybrid RAG HR-analytics system that answers natural-language questions about employees.',
      'Draws on structured records, performance documents, and organizational relationships.',
      'Routes each question to the right data source, or to several for complex questions.',
      'Generates responses with evidence.',
    ],
    howItWorks: [
      'Classify: a FastAPI orchestrator works out what the question is asking.',
      'Route: PostgreSQL through text-to-SQL for metrics, ChromaDB for review documents, a NetworkX graph for reporting chains.',
      'Split: complex questions are broken up across several stores.',
      'Answer: an Ollama LLM combines the results into one answer with evidence.',
      'Ingest: dropped CSV and XLSX files are cleaned, schema-matched and loaded, and every interaction is logged.',
    ],
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
    problem:
      'Flight search shows the price, but not how often that flight is delayed or cancelled.',
    overview: [
      'An AI flight-intelligence platform that helps you decide which flight to actually book.',
      'Searches flights and shows real-time prices.',
      'Pairs live prices with historical reliability, including delay patterns and cancellation history.',
      'Produces AI-generated reliability reports and smart booking verdicts.',
    ],
    howItWorks: [
      'Search: FastAPI pulls live fares from SerpApi\'s Google Flights engine.',
      'Collect: a Playwright scraper gathers FlightRadar24 delay and cancellation history on an n8n schedule.',
      'Store: that history goes into Supabase.',
      'Analyse: a Groq-hosted Llama model writes reliability reports and best-time-to-fly insights.',
      'Chat: a multi-turn chat answers from the flight data.',
    ],
    tradeoffs: [
      { choice: 'Fares cached per day', detail: 'Prices can be up to a day old, but repeat paid SerpApi calls are avoided.' },
    ],
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
    problem:
      'Site visitors want instant answers, and support, sales and booking requests need to reach the right team.',
    overview: [
      'An AI-powered, WhatsApp-style chat widget that embeds into any site via a single script tag.',
      'Gives visitors instant answers from a vector knowledge base.',
      'Runs conversational flows for support, sales, and consultation booking.',
      'Captures support tickets, sales leads, and consultation bookings.',
    ],
    howItWorks: [
      'Fast path: an Express backend checks the session and answers greetings with a regex.',
      'Classify: GPT-4o-mini routes every other message to chat, FAQ, support or sales.',
      'FAQ: a pgvector search over the knowledge base grounds the answer.',
      'Support and sales: multi-step forms create tickets and leads, email the team, and offer a WhatsApp handoff.',
      'Harden: a response cache, per-IP rate limits, a CORS allowlist and input sanitization.',
    ],
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
    problem:
      'Health questions need careful, non-diagnostic answers, and many people would rather not send them to a cloud service.',
    overview: [
      'A local, privacy-preserving chatbot that answers general healthcare questions.',
      'Provides educational information with strong non-diagnostic safety guardrails.',
      'Built using RAG with Mistral 7B, a FastAPI backend, and a Gradio UI.',
    ],
    howItWorks: [
      'Embed: a 16K-row healthcare Q&A dataset is chunked into a local vector store.',
      'Retrieve: the most relevant references are found for each question.',
      'Answer: Mistral 7B on LM Studio replies using that context.',
      'Guard: a safety prompt enforces non-definitive language and doctor-referral disclaimers.',
      'Serve: a FastAPI backend with a Gradio chat UI.',
    ],
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
    problem:
      'A quick second opinion on code usually means waiting for a reviewer or pasting it into a cloud tool.',
    overview: [
      'A full-stack web app that reviews pasted or uploaded code with an LLM.',
      'Returns issues, suggestions, and improvements in a clean, formatted panel.',
      'Provides real-time code review and formatting.',
    ],
    howItWorks: [
      'Paste or upload code in the Next.js app.',
      'A FastAPI /review endpoint forwards it to a local model through LM Studio.',
      'The review comes back with issues, suggestions and improvements.',
      'It renders with syntax highlighting, copy-out, and light or dark themes.',
    ],
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
    problem:
      'Exploring a dataset usually means writing pandas and plotting code for every question.',
    overview: [
      'A Streamlit app that lets you explore, clean, and visualize any dataset through plain-English prompts.',
      'Auto-cleans the data and creates meaningful visualizations.',
      'No code required.',
    ],
    howItWorks: [
      'Upload a dataset.',
      'Auto-clean: duplicates go, missing values are filled, types are fixed, and cleaned versions survive refreshes.',
      'Ask in plain English, such as "show average sales by region".',
      'A local LLM writes the pandas and seaborn code.',
      'The code runs and renders the chart, including groupby aggregations.',
    ],
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
    problem:
      'Recruiters need to see my background, skills and projects in one place, quickly.',
    overview: [
      'A modern, responsive site that presents my background, skills, experience, and project work in one place.',
      'Features WebGL shader visuals, interactive timelines, and smooth UI animations.',
      'Deployed on Vercel.',
    ],
    howItWorks: [
      'Sections: each one is its own client component on a Next.js App Router page.',
      'Navigate: anchor links scroll smoothly between sections.',
      'Visuals: a ray-marched prism background and a scan-effect loading screen, both WebGL, load on the client only.',
      'Navbar: a floating CardNav that animates with GSAP.',
      'Projects: a grouped sidebar with a case-study card for each project.',
    ],
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
