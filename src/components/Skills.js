export default function Skills() {
  const skills = ["Python", "SQL", "Informatica", "Oracle Cloud", "ETL Automation", "Data Visualization", "AI Workflows"];

  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <span key={skill} className="px-4 py-2 bg-gray-200 rounded-full">{skill}</span>
        ))}
      </div>
    </section>
  )
}