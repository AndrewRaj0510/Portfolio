const skillCategories = [
  {
    label: "AI and LLMs",
    items: [
      "Generative AI",
      "Multi-Agent Systems",
      "Agentic AI and Workflows",
      "Hybrid RAG",
      "Prompt Engineering (Chaining, Caching, Injection Defense)",
      "LLMOps (LLM Evaluation, LLM-as-Judge, Langfuse Tracing)",
      "Guardrails",
      "Red Teaming (PyRIT)",
      "MCP",
      "Human-in-the-Loop",
      "Structured Outputs",
    ],
  },
  {
    label: "Models and Platforms",
    items: [
      "OpenAI (GPT-5, Whisper)",
      "Anthropic Claude",
      "Claude Code",
      "Amazon Bedrock",
      "Azure OpenAI",
      "Google Gemini",
      "Open-Source LLMs (Llama, Qwen, gpt-oss) via Ollama",
    ],
  },
  {
    label: "Languages and Backend",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Redis Streams",
      "REST APIs",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Machine Learning",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "TensorFlow",
      "SHAP",
      "Hyperparameter Tuning",
      "Cross-Validation",
      "Computer Vision (YOLO11, ONNX)",
      "Pandas",
    ],
  },
  {
    label: "Data and Cloud",
    items: [
      "PostgreSQL",
      "Supabase (pgvector)",
      "ChromaDB",
      "Redis",
      "Oracle PL/SQL",
      "Teradata",
      "Informatica",
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes (kind)",
      "MLflow",
      "Prometheus",
      "CI/CD (GitHub Actions)",
      "Git",
      "Power BI",
      "Tableau",
    ],
  },
  {
    label: "Automation",
    items: [
      "n8n",
      "Workflow Automation",
      "Webhooks",
      "Playwright",
      "Selenium",
      "Apify",
      "SerpApi",
      "Social Media APIs",
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 px-8 md:px-20 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-black dark:text-white">
          Skills
        </h2>

        <div className="space-y-8 text-left">
          {skillCategories.map((cat) => (
            <div key={cat.label} className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6">
              <h3 className="md:w-56 md:shrink-0 md:pt-1.5 text-lg font-semibold text-black dark:text-white">
                {cat.label}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {cat.items.map((skill) => (
                  <li
                    key={skill}
                    className="group relative px-4 py-1.5 rounded-full bg-white/10 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30"
                  >
                    {/* glow layer */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-blue-500/20 via-blue-400/10 to-transparent blur-sm"></div>

                    <span className="relative z-10 text-sm font-medium text-black dark:text-white whitespace-nowrap">
                      {skill}
                    </span>

                    {/* animated border */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-300"></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
