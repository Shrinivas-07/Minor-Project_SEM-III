import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, ArrowRight, Play, TrendingUp, BookOpen, Globe, 
  MessageSquare, Sliders, CheckCircle2, Layers
} from 'lucide-react';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';

export default function LandingPage() {
  const { openInAppVideo, openAiMentor } = useAssessment();
  const featuredCareers = careersData.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. EXECUTIVE ASYMMETRIC STARTUP HERO SECTION                              */}
      {/* ========================================================================= */}
      <section className="relative pt-14 pb-20 lg:pt-20 lg:pb-28 bg-white bg-subtle-grid border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Clear Typography & Action */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-950 tracking-tight leading-[1.08]">
                Choose your career path with clarity, not guesswork.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Evaluate your strengths across 18 cognitive and practical traits, benchmark real compensation in India and globally, and follow structured 4-phase roadmaps built for students.
              </p>

              {/* CTA Controls */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/assessment"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>Take 18-Trait Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/careers"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 transition-colors"
                >
                  Explore 32+ Careers
                </Link>

                <button
                  type="button"
                  onClick={() => openInAppVideo(
                    "Software & Systems Engineering Roadmap",
                    null,
                    "https://www.youtube.com",
                    "YouTube",
                    "software engineer roadmap 2026 complete course"
                  )}
                  className="px-4 py-3.5 text-sm font-semibold text-slate-700 hover:text-brand-600 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 text-brand-600 fill-brand-600" />
                  <span>Watch Video Guides</span>
                </button>
              </div>

              {/* Clean Metric Strip */}
              <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">18</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Cognitive Traits</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">32+</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Career Pathways</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">4-Phase</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Study Roadmaps</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-600 tracking-tight">Verified</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Salary Benchmarks</p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Interactive Product Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-7">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sample Assessment Output</p>
                    <h2 className="text-base font-bold text-slate-900 mt-0.5">Student Compatibility Profile</h2>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Matched
                  </span>
                </div>

                {/* Trait Breakdown Preview */}
                <div className="py-5 space-y-3.5 border-b border-slate-100">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Analytical &amp; Systems Thinking</span>
                      <span className="font-bold text-slate-900">9.2 / 10</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full w-[92%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Technical Building &amp; Engineering</span>
                      <span className="font-bold text-slate-900">8.6 / 10</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-600 rounded-full w-[86%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Strategic Communication &amp; Leadership</span>
                      <span className="font-bold text-slate-900">7.8 / 10</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full w-[78%]" />
                    </div>
                  </div>
                </div>

                {/* Recommended Output Preview */}
                <div className="pt-5 space-y-3">
                  <p className="text-xs font-semibold text-slate-500">Top Compatible Career Tracks</p>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Full-Stack &amp; Cloud Architect</p>
                      <p className="text-xs text-slate-500 mt-0.5">India: ₹12 – 40 LPA • Global: $115K+</p>
                    </div>
                    <span className="text-sm font-extrabold text-brand-600 shrink-0">94%</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Product Manager (Digital Platforms)</p>
                      <p className="text-xs text-slate-500 mt-0.5">India: ₹15 – 42 LPA • Global: $125K+</p>
                    </div>
                    <span className="text-sm font-extrabold text-slate-700 shrink-0">89%</span>
                  </div>
                </div>

                <Link
                  to="/assessment"
                  className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Compute Your Personal Score</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PLATFORM CAPABILITIES (QUIET, STRUCTURED 3-COLUMN GRID)                */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Platform Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Built for disciplined career planning
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every module inside SahiChayan connects personal aptitude with verified market data and actionable study plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <div className="pro-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mb-5">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">18-Trait Assessment Matrix</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Score your curiosity, analytical thinking, creativity, empathy, and operational aptitude across 18 nuanced dimensions.
                </p>
              </div>
              <Link to="/assessment" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700">
                <span>Launch Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Capability 2 */}
            <div className="pro-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mb-5">
                  <Play className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">In-App Video Masterclasses</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Watch curated curriculum walkthroughs, beginner crash courses, and role reviews directly inside the platform without broken links.
                </p>
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
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 cursor-pointer w-fit"
              >
                <span>Open Video Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Capability 3 */}
            <div className="pro-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mb-5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Multi-Site Course Directory</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Access structured free and certified courses from Coursera, Harvard CS50, NPTEL, Kaggle Learn, and freeCodeCamp.
                </p>
              </div>
              <Link to="/resources" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700">
                <span>Browse Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Capability 4 */}
            <div className="pro-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mb-5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Personalized Career Advisor</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Get clear guidance on entrance exams, college streams, portfolio projects, and transitioning across disciplines.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openAiMentor()}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 cursor-pointer w-fit"
              >
                <span>Open Career Advisor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Capability 5 */}
            <div className="pro-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mb-5">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">India &amp; Global Salary Data</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Compare realistic entry-to-senior compensation bands in Indian LPA alongside remote and international benchmarks.
                </p>
              </div>
              <Link to="/careers" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700">
                <span>Compare Benchmarks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Capability 6 */}
            <div className="pro-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center mb-5">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Official Licensing &amp; Portals</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Direct references to official regulatory portals including UPSC, DGCA, NMC, Bar Council, SEBI, and Wikipedia briefs.
                </p>
              </div>
              <Link to="/resources" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700">
                <span>View Knowledge Base</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED CAREER PATHWAYS                                               */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Career Directory
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
                High-growth career pathways
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Inspect structured 4-phase roadmaps, core skills, and video tutorials for each field.
              </p>
            </div>
            <Link
              to="/careers"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 shrink-0"
            >
              <span>View all 32+ careers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCareers.map((career) => (
              <div
                key={career.id}
                className="pro-card rounded-2xl p-6 flex flex-col justify-between group"
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
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
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
      {/* 4. MATTE SLATE CTA SECTION                                                */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center mx-auto mb-5">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to map your educational roadmap?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Rate your traits in under 3 minutes to discover top compatible career pathways, real compensation data, and step-by-step milestone plans.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/assessment"
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Start Free Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              Create Student Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
