import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full mt-20">
      {/* === Solid Line === */}
      <div className="border-t-8 border-black dark:border-white w-full"></div>

      {/* === Footer Content === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center md:text-left py-10 px-8 md:px-20 bg-gray-50 dark:bg-gray-900 transition-all">

        {/* === Block 1: Name & Headline === */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Andrew Isaac Raj G
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Aspiring Data Scientist | Python • SQL • Machine Learning • Big Data • AI Automation • Power BI | Ex-Accenture
          </p>
        </div>

        {/* === Block 2: Quick Links === */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><a href="#about" className="hover:text-blue-600 transition">About</a></li>
            <li><a href="#skills" className="hover:text-blue-600 transition">Skills</a></li>
            <li><a href="#projects" className="hover:text-blue-600 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* === Block 3: Connect === */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
            Connect
          </h3>
          <div className="flex justify-center md:justify-start gap-6">
            <a
              href="https://github.com/AndrewRaj0510"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/andrew-isaac-raj-g-970648334/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}