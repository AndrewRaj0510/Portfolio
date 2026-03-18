import React, { useState }  from "react";
import {FaBrain,FaRobot,FaChartBar,FaGitAlt,FaJs,FaProjectDiagram,} from "react-icons/fa";
import {SiMysql,SiTeradata,SiOracle,SiInformatica,SiNextdotjs,SiTableau,SiJira,SiConfluence,SiR,} from "react-icons/si";
import { BsGraphUpArrow } from "react-icons/bs";
import Image from "next/image";

const SkillIcon = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={32}
    height={32}
    className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
  />
);

const skills = [
  { name: "Python", icon: <SkillIcon src="/icons/python.png" alt="python" /> },
  { name: "R", icon: <SiR className="text-blue-400" /> },
  { name: "AWS", icon: <SkillIcon src="/icons/aws.png" alt="aws" /> },
  { name: "GCP", icon: <SkillIcon src="/icons/gcp.png" alt="gcp" /> },
  { name: "Machine Learning", icon: <FaBrain className="text-pink-500" /> },
  { name: "Big Data", icon: <SkillIcon src="/icons/bigdata.png" alt="bigdata" /> },
  { name: "LLMs", icon: <SkillIcon src="/icons/llm.jpg" alt="llm" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-400" /> },
  { name: "Teradata", icon: <SiTeradata className="text-red-400" /> },
  { name: "Oracle PL/SQL", icon: <SiOracle className="text-orange-400" /> },
  { name: "AI Automation", icon: <FaRobot className="text-green-400" /> },
  { name: "Web APIs", icon: <SkillIcon src="/icons/api.png" alt="api" /> },
  { name: "n8n", icon: <SkillIcon src="/icons/n8n.png" alt="n8n" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "Power BI", icon: <SkillIcon src="/icons/powerbi.jpeg" alt="powerbi" /> },
  { name: "Tableau", icon: <SiTableau className="text-blue-400" /> },
  { name: "Excel", icon: <SkillIcon src="/icons/excel.png" alt="excel" /> },
  { name: "Data Analysis", icon: <BsGraphUpArrow className="text-blue-500" /> },
  { name: "Data Integrity", icon: <SkillIcon src="/icons/data_integrity.png" alt="data_integrity" /> },
  { name: "Informatica", icon: <SiInformatica className="text-red-500" /> },
  { name: "Quality Assurance", icon: <SkillIcon src="/icons/qa.png" alt="qa" /> },
  { name: "Confluence", icon: <SiConfluence className="text-blue-400" /> },
  { name: "Jira", icon: <SiJira className="text-blue-500" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
  { name: "Hadoop", icon: <SkillIcon src="/icons/hadoop.png" alt="hadoop" /> },
  { name: "MapReduce", icon: <FaProjectDiagram className="text-red-400" /> },
  { name: "Business Strategy", icon: <FaChartBar className="text-indigo-400" /> },
  { name: "SEO Optimization", icon: <SkillIcon src="/icons/seo.png" alt="seo" /> },
  { name: "Functional Testing", icon: <SkillIcon src="/icons/functional.jpeg" alt="functional" /> },
  { name: "Manual Testing", icon: <SkillIcon src="/icons/manual.jpeg" alt="manual" /> },
  { name: "PySpark", icon: <SkillIcon src="/icons/spark.jpeg" alt="spark" /> },
];

const Skills = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? skills : skills.slice(0, 12);
  return (
    <section
      id="skills"
      className="py-20 px-8 md:px-20 bg-gradient-to-b transition-all duration-500 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-black dark:text-white">
          Skills
        </h2>

        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 transition-all duration-700 overflow-hidden ${showAll ? "max-h-[2000px]" : "max-h-[400px]"}`}>
          {skills.map((skill, index) => (
            <div
              key={index}
              title={skill.name}
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-blue-500/30 w-28 h-28"
              role="listitem"
              aria-label={skill.name}
            >
              {/* glow layer */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-blue-500/20 via-blue-400/10 to-transparent blur-sm"></div>

              {/* icon and text */}
              <div className="relative flex flex-col items-center gap-3 z-10">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <span className="text-xs font-medium text-black dark:text-white text-center leading-tight">
                  {skill.name}
                </span>
              </div>

              {/* animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        {/* Show All Button */}
        <div className="mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative z-10">
              {showAll ? "Show Less" : `Show All (${skills.length})`}
            </div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;