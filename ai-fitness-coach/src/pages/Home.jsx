import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaArrowRight, FaBolt, FaBrain, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/5 border border-white/10 rounded-full text-cyan-400">
              Future of Fitness is here
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 italic leading-tight tracking-tighter">
              UNLEASH YOUR <br />
              <span className="text-cyan-400 neon-text">AI POWER</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed">
              Experience the next generation of training. AI-driven workouts, real-time analytics,
              and a coach that evolves with you. No excuses, just results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-cyan-400 text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all"
              >
                Start Training <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<FaBolt className="text-cyan-400" />}
            title="Dynamic Workouts"
            desc="Workouts that adapt to your performance in real-time."
          />
          <FeatureCard
            icon={<FaBrain className="text-purple-400" />}
            title="AI Coach"
            desc="24/7 access to your personal AI fitness expert."
          />
          <FeatureCard
            icon={<FaChartLine className="text-green-400" />}
            title="Advanced Analytics"
            desc="Track every rep, set, and calorie with precision."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-4 uppercase italic tracking-tighter">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
