"use client";
import React from "react";
import { FaRegCopy, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-16 bg-gradient-to-b">
      <div className="max-w-7xl mx-auto bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 sm:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left Column: Contact Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-extrabold text-black dark:text-white bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text">
              Connect With Me
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base text-black dark:text-white">
              Have a project in mind or a question? Reach out and let's turn your ideas into reality.
            </p>

            <div className="space-y-5 text-foreground text-black dark:text-white">
              {/* Email */}
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary text-lg" />
                <span className="text-sm font-medium select-text">mail2airisaac@gmail.com</span>
                <button
                  title="Copy email address"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center"
                  onClick={() => navigator.clipboard.writeText("mail2airisaac@gmail.com")}
                >
                  <FaRegCopy className="text-current" />
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 text-black dark:text-white">
                <FaPhoneAlt className="text-primary text-lg" />
                <span className="text-sm font-medium select-text">+971 5212 50733</span>
                <button
                  title="Copy phone number"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center"
                  onClick={() => navigator.clipboard.writeText("+971 5212 50733")}
                >
                  <FaRegCopy className="text-current" />
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-black dark:text-white">
                <FaMapMarkerAlt className="text-primary text-lg" />
                <span className="text-sm font-medium select-text">Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full md:w-1/2 space-y-6">
            <form className="space-y-5" aria-label="Contact Form">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-black dark:border-gray-700 text-black dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-black dark:border-gray-700 text-black dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-black dark:border-gray-700 text-black dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Please Drop Your Short Message..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-black dark:border-gray-700 text-black dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition-all duration-300"
              >
                Send Message
                <FaEnvelope />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}