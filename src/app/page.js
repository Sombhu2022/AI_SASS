"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/components/SpinnerLoader";
import MessageAlert from "@/components/MessageAlert";

function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/ai/convertion"); // Redirect to signup page or any relevant page
  };

  return (
    <div className="bg-gray-50 text-gray-800">
    <MessageAlert/>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">ThinkCraft.ai</span>
          </h1>
          <p className="text-lg mb-8">
            Revolutionize the way you work with AI-powered solutions for
            generating documents, code, images, and more. Unlock endless
            possibilities with just a few clicks.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-yellow-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Document Generator */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4">Document Generator</h3>
              <p>
                Generate structured documents and reports in seconds with AI
                assistance.
              </p>
            </div>
            {/* Code Generator */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4">Code Generator</h3>
              <p>
                Write, optimize, and debug code effortlessly with our advanced
                AI-powered code generation.
              </p>
            </div>
            {/* Image Generator */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4">Image Generator</h3>
              <p>
                Create stunning visuals and graphics based on your ideas using
                AI-driven image generation.
              </p>
            </div>
            {/* Custom Solutions */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4">Custom Solutions</h3>
              <p>
                Tailored AI-based solutions to meet your unique business needs
                and challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Step 1: Sign Up</h3>
              <p>Create your free account and get access to powerful tools.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Step 2: Choose Feature</h3>
              <p>Select from document, code, image generation, or custom
              solutions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Step 3: Generate & Use</h3>
              <p>Let ThinkCraft.ai handle the heavy lifting and get results
              in seconds!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Ready to Experience the Future of Work?
        </h2>
        <button
          onClick={handleGetStarted}
          className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Get Started for Free
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p className="mb-4">&copy; 2024 ThinkCraft.ai - All Rights Reserved</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-yellow-300">Contact Us</a>
          <a href="#" className="hover:text-yellow-300">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-300">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
