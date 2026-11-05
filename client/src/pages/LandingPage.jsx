import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Compass, ArrowRight, Play, CheckCircle2, Star, TrendingUp, 
  ShieldCheck, Brain, Rocket, Award, Users, Bot, Layers, BookOpen, 
  Globe, Flame, ExternalLink, Activity, Terminal, Check
} from 'lucide-react';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';

export default function LandingPage() {
  const { openInAppVideo, openAiMentor } = useAssessment();
  const featuredCareers = careersData.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-slate-100 overflow-x-hidden selection:bg-brand-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH TEXTURED GRID & VIBRANT GLOWS                        */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 bg-grid-mesh overflow-hidden border-b border-white/10">
        {/* Colorful Ambient Light Orbs */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-brand-600/30 to-purple-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-24 right-1/4 translate-x-1/3 w-[450px] h-[300px] bg-gradient-to-br from-amber-500/20 via-rose-500/15 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Monospace Tag Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md shadow-inner mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase">
                AI-POWERED APTITUDE TELEMETRY & CAREER COMPASS
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase">
              Stop Guessing. <br />
              Find Your True <span className="gradient-text-vibrant">Career Vector.</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Scientific <strong className="text-white font-semibold">18-trait aptitude matching</strong>, in-app YouTube search video masterclasses, verified university course paths, and real-time guidance from our <span className="text-brand-300 font-semibold">Gemini AI Mentor</span>.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/assessment"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-white/20"
              >
                <span>Take 18-Trait Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => openInAppVideo(
                  "Artificial Intelligence & Machine Learning Roadmap",
                  null,
                  "https://www.youtube.com",
                  "YouTube",
                  "artificial intelligence engineer roadmap 2026 complete course"
                )}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/15 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Try In-App Video Hub</span>
              </button>

              <Link
                to="/careers"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl text-slate-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Browse 32+ Careers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Metric Pills */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">18</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">Cognitive Traits</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black gradient-text-cyan">32+</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">Career Options</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">3-Tier</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">In-App Resources</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">Live</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">Sahi AI Mentor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SHOWCASE LIBRARY (INSPIRED BY REFERENCE DESIGN MESH CARDS)             */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#0b101d] bg-dots-mesh border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-400">
              [ COMPONENT SHOWCASE ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 uppercase tracking-tight">
              Designed For Deep Learning & Action.
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Explore the core architectural components that power the SahiChayan student guidance engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Warm Sun & Assessment Engine */}
            <div className="relative rounded-3xl p-7 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/20 overflow-hidden group hover:border-amber-400/40 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                  01
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  18-Trait Aptitude Sliders
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Rate your cognitive curiosity, leadership, tech interest, and creative drive without arbitrary multiple-choice limits.
                </p>

                {/* Micro Visual Preview */}
                <div className="mt-5 space-y-2 bg-black/40 rounded-2xl p-4 border border-white/5">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Logic & AI Passion</span>
                    <strong className="text-amber-300 font-mono">9.5 / 10</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-rose-400 h-full w-[95%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300 pt-1">
                    <span>Aviation Interest</span>
                    <strong className="text-cyan-300 font-mono">8.0 / 10</strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[80%]" />
                  </div>
                </div>

                <Link
                  to="/assessment"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200"
                >
                  <span>Launch Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: YouTube Search In-App Video Hub */}
            <div className="relative rounded-3xl p-7 bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-950 border border-rose-500/20 overflow-hidden group hover:border-rose-400/40 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                  02
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  In-App Video Masterclasses
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  No expired video IDs. Query-driven dynamic YouTube search results playable directly inside the application.
                </p>

                {/* Video Mockup */}
                <div className="mt-5 rounded-2xl bg-black/50 border border-white/10 p-3 flex items-center gap-3">
                  <div className="w-12 h-10 rounded-lg bg-rose-600/40 border border-rose-500/50 flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 fill-rose-300 text-rose-300" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">Full Course Roadmap 2026</p>
                    <p className="text-[10px] text-slate-400 font-mono">Dynamic in-app playback</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openInAppVideo(
                    "Full Stack Web Development Roadmap",
                    null,
                    "https://www.youtube.com",
                    "YouTube",
                    "full stack web development roadmap complete course"
                  )}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 hover:text-rose-200 cursor-pointer"
                >
                  <span>Open Video Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Multi-Platform Courses */}
            <div className="relative rounded-3xl p-7 bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-950 border border-indigo-500/20 overflow-hidden group hover:border-indigo-400/40 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                  03
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Multi-Site Course Directory
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Verified course certifications and free audits across Coursera, Kaggle, freeCodeCamp, edX, and Harvard CS50.
                </p>

                {/* Platforms Chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-white/10 text-white px-2.5 py-1 rounded-md border border-white/10">Coursera</span>
                  <span className="text-[10px] font-bold bg-white/10 text-cyan-300 px-2.5 py-1 rounded-md border border-white/10">Kaggle Learn</span>
                  <span className="text-[10px] font-bold bg-white/10 text-emerald-300 px-2.5 py-1 rounded-md border border-white/10">Harvard CS50</span>
                  <span className="text-[10px] font-bold bg-white/10 text-amber-300 px-2.5 py-1 rounded-md border border-white/10">freeCodeCamp</span>
                </div>

                <Link
                  to="/resources"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-indigo-200"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Sahi AI Career Mentor (Flame style) */}
            <div className="relative rounded-3xl p-7 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 border border-cyan-500/20 overflow-hidden group hover:border-cyan-400/40 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                  04
                </div>
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Gemini AI Career Mentor</span>
                  <Flame className="w-4 h-4 text-cyan-400 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Real-time contextual advisory powered by Google Gemini 1.5 Flash. Ask about exams, salaries, and degrees.
                </p>

                <div className="mt-5 p-3 rounded-2xl bg-black/40 border border-cyan-500/20 text-[11px] text-cyan-200 italic">
                  "How do I balance UPSC preparation with an Engineering degree?"
                </div>

                <button
                  type="button"
                  onClick={() => openAiMentor()}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 cursor-pointer"
                >
                  <span>Chat with Mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 5: Real Compensation & Market Data */}
            <div className="relative rounded-3xl p-7 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 border border-emerald-500/20 overflow-hidden group hover:border-emerald-400/40 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-400/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                  05
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Verified Salary Benchmarks
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Real compensation ranges comparing Indian entry & senior LPA against global remote market packages.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 bg-black/40 rounded-2xl p-3 border border-white/5">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">INDIA RANGE</span>
                    <strong className="text-xs text-emerald-300 font-bold">₹12 - 40 LPA</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">GLOBAL RANGE</span>
                    <strong className="text-xs text-cyan-300 font-bold">$110K - $250K</strong>
                  </div>
                </div>

                <Link
                  to="/careers"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200"
                >
                  <span>Browse Salaries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 6: General Knowledge & Regulatory Portals */}
            <div className="relative rounded-3xl p-7 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-950 border border-purple-500/20 overflow-hidden group hover:border-purple-400/40 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-400/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                  06
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Wikipedia & Sovereign Portals
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Direct official links to statutory regulatory bodies (DGCA, UPSC, NMC, Bar Council, SEBI) & Wikipedia overviews.
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-300 bg-black/40 p-3 rounded-2xl border border-white/5">
                  <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="truncate">Official Syllabus & Acts Integration</span>
                </div>

                <Link
                  to="/resources"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-purple-200"
                >
                  <span>View Knowledge Base</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED CAREER PATHWAYS                                               */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#090d16] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-400">
                [ POPULAR TRACKS ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1 uppercase tracking-tight">
                High-Impact Career Pathways
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Click any career to explore in-app video tutorials, multi-platform courses, and full roadmaps.
              </p>
            </div>
            <Link
              to="/careers"
              className="text-xs sm:text-sm font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1.5"
            >
              <span>Explore All 32+ Careers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCareers.map((career) => (
              <div
                key={career.id}
                className="bg-slate-900/80 rounded-3xl p-6 border border-white/10 hover:border-brand-400/50 transition-all flex flex-col justify-between group shadow-lg hover:shadow-brand-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300 bg-brand-950/80 px-2.5 py-1 rounded-md border border-brand-800">
                      {career.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                      {career.growthRate.split('(')[0].trim()}
                    </span>
                  </div>

                  <Link to={`/career/${career.id}`} className="group-hover:text-brand-300 transition-colors">
                    <h3 className="text-lg font-bold text-white">{career.name}</h3>
                  </Link>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {career.skills.slice(0, 4).map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded font-mono border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Salary & Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">EST. COMPENSATION</span>
                    <span className="text-xs font-bold text-white">{career.averageSalaryInr}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openInAppVideo(
                        career.name,
                        null,
                        null,
                        'YouTube',
                        career.youtubeSearchQuery,
                        career,
                        'youtube'
                      )}
                      className="p-2 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer border border-rose-500/30"
                      title="Open In-App Video & Course Hub"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <Link
                      to={`/career/${career.id}`}
                      className="p-2 rounded-xl bg-white/10 hover:bg-brand-600 text-white transition-colors"
                      title="Full Career Dossier"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION BANNER                                                  */}
      {/* ========================================================================= */}
      <section className="py-24 bg-gradient-to-t from-slate-950 to-[#090d16] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-mesh opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 text-brand-300 flex items-center justify-center mx-auto mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Start Your Career Journey Today
          </h2>
          <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
            Tune your 18-trait sliders in under 3 minutes, discover your top compatible career options, and explore in-app video roadmaps.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/assessment"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold text-base shadow-xl shadow-brand-500/25 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer border border-white/20"
            >
              <span>Take Free 18-Trait Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
