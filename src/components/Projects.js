export default function Projects() {
  const projects = [
    { name: "ETL Automation", description: "Automated PowerCenter to IDMC migration.", link: "#" },
    { name: "Data Dashboard", description: "Interactive analytics dashboard.", link: "#" },
    { name: "AI Image Generator", description: "Image generation API for marketing.", link: "#" },
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="mb-4">{project.description}</p>
            <a href={project.link} className="text-blue-600 hover:underline">View Project</a>
          </div>
        ))}
      </div>
    </section>
  )
}