import React, { useState, useRef } from 'react';
import { 
  Sparkles, Sliders, CheckCircle2, Bookmark, BookmarkCheck, 
  ArrowRight, Play, MapPin, RefreshCw, Layers, Award, TrendingUp, Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { traitCategories, archetypePresets, allTraits } from '../data/traitsData';
import { useAssessment } from '../context/AssessmentContext';

export default function AssessmentPage() {
  const { 
    scores, 
    updateScore, 
    applyArchetype, 
    runAssessment, 
    assessmentResult,
    toggleSaveCareer,
    isCareerSaved,
    openInAppRoadmap,
    openInAppVideo,
    openAiMentor
  } = useAssessment();

  const [activeTab, setActiveTab] = useState(0);
  const [calculating, setCalculating] = useState(false);
  const resultsRef = useRef(null);

  const answeredCount = Object.values(scores).filter(v => v !== undefined).length;
  const progressPercent = Math.round((answeredCount / allTraits.length) * 100);
  const averageScore = (Object.values(scores).reduce((a, b) => a + b, 0) / allTraits.length).toFixed(1);

  const handleCalculate = async () => {
    setCalculating(true);
    const result = await runAssessment();
    setCalculating(false);

    // Fire Confetti Celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if canvas-confetti is not loaded
    }

    // Smooth scroll down to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5" /> 18-Trait Self-Assessment Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Map Your Aptitude to 30+ Career Paths
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Adjust the sliders below reflecting your genuine curiosities, cognitive strengths, and motivations. 
            Our weighted matrix matches your unique trait vector to top industry benchmarks.
          </p>
        </div>

        {/* Archetype Quick-Load Presets */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Quick Archetype Presets (Optional)
            </span>
            <span className="text-xs text-slate-400">1-click prefill</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {archetypePresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyArchetype(preset.scores)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 transition-all text-slate-700 active:scale-95"
                title={preset.tagline}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 border-b border-slate-200">
          {traitCategories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === idx
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.name} ({cat.traits.length})
            </button>
          ))}
        </div>

        {/* Active Category Trait Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {traitCategories[activeTab].traits.map((trait) => {
            const currentVal = scores[trait.key] || 5;
            return (
              <div
                key={trait.key}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-brand-200 transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 font-bold flex items-center justify-center text-xs">
                      {currentVal}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">{trait.label}</h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {currentVal <= 3 ? 'Low Interest' : currentVal <= 6 ? 'Moderate' : currentVal <= 8 ? 'High' : 'Peak Passion'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4">{trait.description}</p>

                {/* Range Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={currentVal}
                    onChange={(e) => updateScore(trait.key, e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
                    <span>1 (Casual)</span>
                    <span>5 (Average)</span>
                    <span>10 (Obsession)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculate Action Sticky Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Your Aptitude Profile is Ready</h3>
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                Avg: {averageScore}/10
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Click calculate to execute the multi-variable weighted matching algorithm.
            </p>
          </div>

          <button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md shadow-brand-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {calculating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Computing Fits...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Calculate Sahi Match</span>
              </>
            )}
          </button>
        </div>

        {/* RESULTS SECTION */}
        {assessmentResult && (
          <section ref={resultsRef} className="pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Assessment Completed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  Top 10 Recommended Career Pathways
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Ranked by compatibility percentage according to your weighted traits.
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-4">
              {assessmentResult.topCareers.map((career, idx) => {
                const isSaved = isCareerSaved(career.id);
                return (
                  <div
                    key={career.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-300 shadow-xs hover:shadow-soft transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Left: Rank & Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md">
                            {career.category}
                          </span>
                          <span className="text-xs font-semibold text-emerald-600">
                            {career.averageSalaryInr}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{career.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-xl">{career.description}</p>
                        
                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {career.skills?.map((s, sIdx) => (
                            <span key={sIdx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Match Score & In-App Actions */}
                    <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      {/* Match Score Gauge */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-medium block">Match Fit</span>
                        <span className="text-2xl font-black text-brand-600">
                          {career.matchScore}%
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveCareer(career)}
                          className={`p-2.5 rounded-xl border transition-all ${
                            isSaved
                              ? 'bg-amber-50 text-amber-600 border-amber-200'
                              : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200'
                          }`}
                          title={isSaved ? 'Saved to bookmarks' : 'Save career'}
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => openInAppRoadmap(career)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Roadmap</span>
                        </button>

                        <button
                          onClick={() => openAiMentor(career)}
                          className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1 transition-all active:scale-95"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Ask AI</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
