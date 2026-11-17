import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, TrendingUp, BookOpen, Globe, 
  MessageSquare, Sliders, CheckCircle2, Layers, Sparkles,
  Cpu, Rocket, Scale, HeartPulse, ShieldCheck, Compass
} from 'lucide-react';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';
import ClearPathLogo from '../components/common/ClearPathLogo';

export default function LandingPage() {
  const { openInAppVideo, openAiMentor } = useAssessment();
  const featuredCareers = careersData.slice(0, 6);

  // Live Interactive Hero Aptitude Simulator (Stripe-Style Interactive Preview)
  const [heroSliders, setHeroSliders] = useState({
    logic: 9,
    ai: 9,
    creativity: 7,
  });

  // Calculate live matching preview
  const liveMatches = React.useMemo(() => {
    return careersData
      .map(c => {
        let score = 0;
        let max = 0;
        if (c.weights.logic) { score += (heroSliders.logic / 10) * c.weights.logic; max += c.weights.logic; }
        if (c.weights.Ai || c.weights.technology) {
          const w = (c.weights.Ai || 0) + (c.weights.technology || 0);
          score += (heroSliders.ai / 10) * w;
          max += w;
        }
        if (c.weights.creativity || c.weights.building) {
          const w = (c.weights.creativity || 0) + (c.weights.building || 0);
          score += (heroSliders.creativity / 10) * w;
          max += w;
        }
        const pct = max > 0 ? Math.round((score / max) * 100) : 75;
        return { ...c, livePct: Math.min(99, Math.max(68, pct)) };
      })
      .sort((a, b) => b.livePct - a.livePct)
      .slice(0, 3);
  }, [heroSliders]);

  // Stripe-Style Interactive Walkthrough Tabs
  const [activeTab, setActiveTab] = useState('assessment');

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. STRIPE-STYLE ASYMMETRIC HERO SECTION WITH LIVE APTITUDE SIMULATOR     */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-white bg-subtle-grid border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Kicker Label (Pentagram Typography) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-6 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span className="uppercase tracking-widest text-[10.5px]">Intelligent Career Architecture</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-500 font-medium">ClearPath 2.0</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            
            {/* Left Column: Bold Typography & Action Controls */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-slate-950 tracking-tight leading-[1.06]">
                Architecture for your ambition. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-brand-600">
                  Plan with certainty, not guesswork.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Evaluate your cognitive temperament across 18 psychometric dimensions, benchmark verified compensation in India and globally, and execute 4-phase semester roadmaps built for serious students.
              </p>

              {/* Action Buttons (Apple Spring Interactions) */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/assessment"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md apple-card-press flex items-center gap-2 group"
                >
                  <span>Launch 18-Trait Matrix</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/careers"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 transition-all duration-200 apple-card-press"
                >
                  Explore 42+ Master Careers
                </Link>

                <button
                  type="button"
                  onClick={() => openInAppVideo(
                    "AI & Machine Learning Roadmap",
                    null,
                    "https://www.youtube.com",
                    "YouTube",
                    "artificial intelligence machine learning roadmap"
                  )}
                  className="px-4 py-3.5 text-sm font-semibold text-slate-700 hover:text-brand-600 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 text-brand-600 fill-brand-600" />
                  <span>Watch Roadmap Guides</span>
                </button>
              </div>

              {/* Metric Counter Strip */}
              <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">42+</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Curated Pathways</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">18</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Cognitive Traits</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">4-Phase</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Semester Syllabi</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-600 tracking-tight">100%</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Open Access</p>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Aptitude Sandbox (Stripe-Grade Product Widget) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-7 relative overflow-hidden apple-hover">
                
                {/* Header with live status dot */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Interactive Sandbox</span>
                    <h2 className="text-sm font-bold text-slate-900 mt-0.5">Live Aptitude Match Engine</h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-time Computing</span>
                  </span>
                </div>

                {/* 3 Live Sliders */}
                <div className="py-4 space-y-3.5 border-b border-slate-100">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Mathematical &amp; Algorithmic Logic</span>
                      <span className="font-bold text-slate-900 font-mono">{heroSliders.logic}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={heroSliders.logic}
                      onChange={(e) => setHeroSliders(s => ({ ...s, logic: Number(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Technology, AI &amp; Code Curiosity</span>
                      <span className="font-bold text-slate-900 font-mono">{heroSliders.ai}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={heroSliders.ai}
                      onChange={(e) => setHeroSliders(s => ({ ...s, ai: Number(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Creative &amp; Visual Design Eye</span>
                      <span className="font-bold text-slate-900 font-mono">{heroSliders.creativity}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={heroSliders.creativity}
                      onChange={(e) => setHeroSliders(s => ({ ...s, creativity: Number(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Live Matched Outputs */}
                <div className="pt-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Top Computed Matches</p>
                    <span className="text-[10px] text-slate-400">Drag sliders to recalculate</span>
                  </div>

                  {liveMatches.map((career) => (
                    <Link
                      key={career.id}
                      to={`/career/${career.id}`}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-brand-50/50 border border-slate-200 hover:border-brand-200 flex items-center justify-between gap-3 transition-colors group"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-brand-600 truncate transition-colors">
                          {career.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {career.averageSalaryInr} • {career.growthRate.split('(')[0].trim()}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-brand-600 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs shrink-0">
                        {career.livePct}% Fit
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/assessment"
                  className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Complete Comprehensive 18-Trait Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STRIPE-GRADE INTERACTIVE PLATFORM WALKTHROUGH TABS                     */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
              System Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Four unified pillars of career engineering
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every feature inside ClearPath connects personal aptitude with verified industry benchmarks and concrete semester action items.
            </p>
          </div>

          {/* Tab Selection Bar (Linear Precision Style) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 mb-8">
            {[
              { id: 'assessment', label: '01 / 18-Trait Matrix', icon: Sliders },
              { id: 'roadmaps', label: '02 / 4-Phase Roadmaps', icon: BookOpen },
              { id: 'salaries', label: '03 / Compensation Transparency', icon: TrendingUp },
              { id: 'advisor', label: '04 / ClearPath AI Advisor', icon: MessageSquare },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Preview Showcase */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-8 sm:p-10">
            {activeTab === 'assessment' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Cognitive Intelligence</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Beyond simplistic questionnaires: a multi-variable aptitude matrix
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Most career quizzes rely on generic yes/no questions. ClearPath assesses 18 distinct cognitive vectors across Analytical Rigor, Technical Drive, Administrative Execution, and Creative Instincts.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Instant psychometric vector computation with radar visualizer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Duolingo-style milestone checkpoints &amp; interactive feedback</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>1-Click Archetype presets (AI Innovator, Corporate Strategist, Creative Lead)</span>
                    </li>
                  </ul>
                  <Link to="/assessment" className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 pt-2">
                    <span>Try the live assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="lg:col-span-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800">Analytical &amp; Algorithmic Logic</span>
                      <span className="font-bold text-brand-600">9.4 / 10</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800">Autonomous Hardware &amp; Robotics</span>
                      <span className="font-bold text-brand-600">8.8 / 10</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800">Policy, Governance &amp; Law</span>
                      <span className="font-bold text-slate-500">5.2 / 10</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roadmaps' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Execution Blueprints</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Structured 4-phase semester plans with zero ambiguity
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Stop wondering what to learn next. Every career pathway breaks down your multi-year journey into sequential phases: Foundations, Applied Case Studies, Capstone Deployments, and Industry Placement.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Embedded YouTube crash courses without disruptive redirects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Direct links to Coursera, MIT OCW, Harvard CS50, and NPTEL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Notion-style interactive checklists to track semester progress</span>
                    </li>
                  </ul>
                  <Link to="/careers" className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 pt-2">
                    <span>Explore career roadmaps</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="lg:col-span-6 space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-brand-600">Phase 1 • 3 Months</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">Foundations, Math &amp; Core Syntax</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Python, Linear Algebra, Git, and Computational Thinking</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-brand-600">Phase 2 • 4 Months</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">Applied Architecture &amp; Databases</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Relational SQL, API Engineering, System Design Basics</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'salaries' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Market Reality</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Radical salary transparency: India LPA &amp; Global USD benchmarks
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Make educational investments with clear visibility on financial returns. Compare entry-level (0–2 yrs), mid-senior (3–6 yrs), and global remote pay scales across all 42 specializations.
                  </p>
                  <Link to="/careers" className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 pt-2">
                    <span>Browse salary database</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">AI &amp; ML Engineer (India)</span>
                    <span className="font-bold text-white font-mono">₹14 – ₹42 LPA</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">Quantitative Trader (India)</span>
                    <span className="font-bold text-white font-mono">₹35 – ₹1.2 Cr PA</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Cloud &amp; DevOps Architect (Global)</span>
                    <span className="font-bold text-emerald-400 font-mono">$110K – $200K USD</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advisor' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">AI Intelligence</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    ClearPath AI Mentor: Real answers, zero generic boilerplate
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Trained with domain knowledge on Indian entrance examinations (JEE, NEET, UPSC, GATE, CAT), degree pathways (B.Tech, BCA, MBBS, MBA), and transition tactics for non-CS candidates.
                  </p>
                  <button
                    type="button"
                    onClick={() => openAiMentor()}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 pt-2 cursor-pointer"
                  >
                    <span>Open AI Advisor Drawer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="lg:col-span-6 bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
                  <p className="font-bold text-slate-900 mb-2">Student: "Can a mechanical engineer get a software job at Microsoft?"</p>
                  <p className="text-slate-600">"Yes, absolutely. Big tech firms focus on verified DSA, system architecture, and production project proof rather than degree titles. Focus on Python/C++, LeetCode, and 2 full-scale cloud applications..."</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. AESOP EDITORIAL PHILOSOPHY ON PURPOSE & MASTERY                        */}
      {/* ========================================================================= */}
      <section className="py-20 bg-stone-100/70 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3 block">
            The Philosophy of ClearPath
          </span>
          <blockquote className="text-xl sm:text-2xl font-medium text-stone-900 leading-relaxed italic max-w-2xl mx-auto">
            "A career is not merely a sequence of compensation brackets; it is the deliberate application of your cognitive temperament to problems that matter."
          </blockquote>
          <p className="text-xs font-semibold text-stone-600 mt-4 tracking-wide uppercase">
            ClearPath Academic Directorate • Open Guidance Standard
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED 42+ CAREER SHOWCASE                                           */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
                Master Catalog
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
                Featured high-impact career pathways
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                42 verified specializations spanning AI, Quantum Computing, Deep Space, Medicine, Law, and Finance.
              </p>
            </div>
            <Link
              to="/careers"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 shrink-0"
            >
              <span>View all 42+ careers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCareers.map((career) => (
              <div
                key={career.id}
                className="pro-card rounded-2xl p-6 flex flex-col justify-between group apple-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                      {career.category}
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {career.growthRate.split('(')[0].trim()}
                    </span>
                  </div>

                  <Link to={`/career/${career.id}`}>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {career.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {career.skills.slice(0, 3).map((skill, sIdx) => (
                      <span key={sIdx} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Avg. India Package</span>
                    <span className="text-xs font-bold text-slate-900">{career.averageSalaryInr}</span>
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
                      className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Watch Video Tutorials"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <Link
                      to={`/career/${career.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="View Career Roadmap"
                    >
                      <span>Roadmap</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MATTE CHARCOAL CTA SECTION                                             */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Map your academic career with absolute clarity.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Take the 18-Trait Assessment in under 3 minutes. Unlock verified compensation benchmarks, 4-phase semester roadmaps, and instant cloud sync.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/assessment"
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-sm transition-all duration-300 shadow-sm apple-card-press flex items-center gap-2"
            >
              <span>Start Free 18-Trait Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              Create Free Student Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
