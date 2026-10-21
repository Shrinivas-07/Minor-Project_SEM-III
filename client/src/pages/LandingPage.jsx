import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Compass, ArrowRight, CheckCircle2, Star, TrendingUp, 
  ShieldCheck, Brain, Rocket, Award, Users, Bot, Layers, Play
} from 'lucide-react';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';

export default function LandingPage() {
  const { openInAppVideo } = useAssessment();
  const featuredCareers = careersData.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/50 via-white to-slate-50">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-200/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-xs mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
              <span className="text-xs font-semibold text-brand-700">
                SahiChayan 2.0 • AI-Powered Career Advisory
              </span>
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Make the <span className="gradient-text">Right Choice</span> for Your Future Career.
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Scientific 18-trait aptitude matching, real-world Indian & global salary insights, and an intelligent Gemini AI Mentor guiding your educational roadmap.
            </p>

            {/* Hero CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/assessment"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5"
              >
                <span>Take 18-Trait Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/careers"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center gap-2"
              >
                <span>Browse 30+ Careers</span>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="mt-12 pt-8 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">18</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Cognitive & Tech Traits</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">30+</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Curated Career Paths</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-600">4-Phase</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Actionable Roadmaps</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">Free</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Student AI Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (3-STEP METHODOLOGY) */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600">Guided Clarity</h2>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">How SahiChayan Guides You</p>
            <p className="text-slate-600 text-sm mt-3">From self-doubt to clear direction in three deliberate steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50/70 hover:bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-brand-200 transition-all hover:shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-lg mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Self-Assess 18 Traits</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Adjust sliders across creativity, logic, technology interest, leadership, civil administration, and aviation without rigid multiple-choice restrictions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50/70 hover:bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-brand-200 transition-all hover:shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Weighted Match Ranking</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Our mathematical algorithm evaluates your trait vector against multi-industry benchmarks, ranking your Top 10 closest career matches with match percentages.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50/70 hover:bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-brand-200 transition-all hover:shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-accent-100 text-accent-700 font-bold flex items-center justify-center text-lg mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Roadmap & AI Mentorship</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Explore in-app video tutorials, step-by-step educational phases, required degrees, and receive personalized advice from our Gemini-powered AI Mentor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CAREER PATHWAYS */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600">Curated Pathways</h2>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">High-Demand Career Tracks</p>
              <p className="text-slate-600 text-sm mt-2">Explore salaries, skill trees, and roadmaps verified for 2026.</p>
            </div>
            <Link
              to="/careers"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
            >
              <span>View All 30+ Careers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCareers.map((career) => (
              <div
                key={career.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                      {career.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {career.growthRate.split('(')[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {career.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {career.skills.slice(0, 4).map((skill, sIdx) => (
                      <span key={sIdx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Salary & Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Est. Compensation</span>
                    <span className="text-xs font-bold text-slate-900">{career.averageSalaryInr}</span>
                  </div>
                  <Link
                    to={`/career/${career.id}`}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-600 transition-colors"
                    title="View Career Dossier"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. IN-APP FEATURE SHOWCASE (MODAL VIDEO DEMO) */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-brand-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-4 backdrop-blur-xs">
                <Play className="w-3.5 h-3.5 fill-brand-300" /> Integrated In-App Learning
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Learn Without Leaving Your Flow.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Unlike traditional websites that redirect you across endless external tabs, SahiChayan features built-in video masterclasses, interactive milestone sheets, and an AI mentor accessible from any view.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => openInAppVideo(
                    "Complete Machine Learning Bootcamp 2026",
                    "i_LwzRVP7bg",
                    "https://www.youtube.com/watch?v=i_LwzRVP7bg",
                    "YouTube"
                  )}
                  className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Try In-App Player</span>
                </button>
                <Link
                  to="/resources"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
                >
                  Explore Resource Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 bg-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready to find your ideal career trajectory?
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">
            It takes less than 3 minutes to tune your trait preferences and discover data-backed recommendations.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/assessment"
              className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
            >
              <span>Start Assessment Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
