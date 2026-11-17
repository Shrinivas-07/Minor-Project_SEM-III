import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sliders, CheckCircle2, Bookmark, BookmarkCheck, 
  ArrowRight, Play, RefreshCw, Layers, Award, TrendingUp,
  MessageSquare, Sparkles, Flame, Zap, Trophy, HelpCircle
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
  const [lastRatedTrait, setLastRatedTrait] = useState(null);
  const resultsRef = useRef(null);

  const answeredCount = Object.values(scores).filter(v => v !== undefined).length;
  const progressPercent = Math.round((answeredCount / allTraits.length) * 100);
  const averageScore = (Object.values(scores).reduce((a, b) => a + b, 0) / allTraits.length).toFixed(1);

  // Duolingo-style Milestone Level
  const currentLevel = activeTab + 1;
  const totalLevels = traitCategories.length;

  const handleScoreChange = (traitKey, val) => {
    updateScore(traitKey, Number(val));
    setLastRatedTrait(traitKey);
  };

  const handleCalculate = async () => {
    setCalculating(true);
    await runAssessment();
    setCalculating(false);

    // Fire Celebratory Confetti (Apple/Duolingo style milestone celebration)
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore
    }

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================== */}
        {/* DUOLINGO-STYLE HEADER & PROGRESS LEVEL BAR                            */}
        {/* ===================================================================== */}
        <div className="max-w-4xl mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
              <span>Momentum: {answeredCount}/{allTraits.length} Completed</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Avg Aptitude: {averageScore}/10</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <span>Level {currentLevel} of {totalLevels}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Psychometric Aptitude Matrix
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Rate your genuine cognitive temperament, problem-solving preferences, and ambition. Our multi-variable algorithm matches your profile against verified industry benchmarks across 42+ master careers.
          </p>

          {/* Duolingo-Grade Animated Progress Track */}
          <div className="mt-5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
              <span>Stage {activeTab + 1}: {traitCategories[activeTab].name}</span>
              <span className="text-brand-600 font-bold font-mono">{progressPercent}% Unlocked</span>
            </div>
            <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* ARCHETYPE QUICK-LOAD PRESETS (PREFILL IN 1-CLICK)                    */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card mb-8 apple-hover">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-brand-600" />
              1-Click Student Archetype Presets
            </span>
            <span className="text-xs text-slate-400">Prefill sliders with one tap</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {archetypePresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  applyArchetype(preset.scores);
                  try {
                    confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
                  } catch (e) {}
                }}
                className="p-3 rounded-xl text-left bg-slate-50 hover:bg-brand-50/70 border border-slate-200 hover:border-brand-300 transition-all cursor-pointer group"
              >
                <p className="text-xs font-bold text-slate-900 group-hover:text-brand-700 truncate">{preset.name}</p>
                <p className="text-[10.5px] text-slate-500 mt-1 line-clamp-2 leading-tight">{preset.tagline}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* MILESTONE LEVEL TABS (DUOLINGO STAGE SWITCHER)                       */}
        {/* ===================================================================== */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-6 border-b border-slate-200">
          {traitCategories.map((cat, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {idx + 1}
                </span>
                <span>{cat.name}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-white/10 text-white/80' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.traits.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* INTERACTIVE TRAIT RATING CARDS (DUOLINGO TAP + APPLE SLIDERS)        */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {traitCategories[activeTab].traits.map((trait) => {
            const currentVal = scores[trait.key] || 5;
            const isHigh = currentVal >= 8;
            const isLow = currentVal <= 3;

            return (
              <div
                key={trait.key}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 apple-card-press ${
                  isHigh 
                    ? 'border-brand-300 shadow-soft bg-gradient-to-b from-white to-blue-50/20' 
                    : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center text-xs font-mono transition-colors ${
                      isHigh ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {currentVal}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{trait.label}</h3>
                  </div>

                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                    isHigh 
                      ? 'bg-brand-50 border-brand-200 text-brand-700'
                      : isLow
                      ? 'bg-slate-100 border-slate-200 text-slate-500'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}>
                    {currentVal <= 2 ? 'Casual' : currentVal <= 4 ? 'Moderate' : currentVal <= 7 ? 'High Aptitude' : 'Peak Passion'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{trait.description}</p>

                {/* Duolingo-Grade Fast Tap Buttons (1 to 10) */}
                <div className="mb-3">
                  <div className="flex items-center justify-between gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const isSelected = currentVal === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleScoreChange(trait.key, num)}
                          className={`flex-1 py-1 rounded text-[11px] font-bold font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white scale-105 shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Smooth Range Slider */}
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={currentVal}
                  onChange={(e) => handleScoreChange(trait.key, e.target.value)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* COMPUTE ACTION BANNER                                                */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Psychometric Vector Computed</h3>
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100">
                {answeredCount} of {allTraits.length} Trait Scores Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Runs weighted compatibility matching against verified requirements of 42+ high-impact specializations.
            </p>
          </div>

          <button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all duration-300 apple-card-press flex items-center justify-center gap-2 cursor-pointer"
          >
            {calculating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Computing Compatibility...</span>
              </>
            ) : (
              <>
                <span>Compute 42+ Career Matches</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* ===================================================================== */}
        {/* COMPUTED RESULTS SECTION                                              */}
        {/* ===================================================================== */}
        {assessmentResult && (
          <section ref={resultsRef} className="pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Assessment Completed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  Top Recommended Career Pathways
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Ranked by multi-variable compatibility according to your weighted psychometric profile.
                </p>
              </div>
            </div>

            {/* Results Cards List */}
            <div className="space-y-4">
              {assessmentResult.topCareers.map((career, idx) => {
                const isSaved = isCareerSaved(career.id);
                return (
                  <div
                    key={career.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-300 shadow-xs hover:shadow-soft transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 apple-hover"
                  >
                    {/* Left: Rank & Metadata */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100">
                            {career.category}
                          </span>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {career.averageSalaryInr}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            Global: {career.averageSalaryUsd}
                          </span>
                        </div>
                        <Link to={`/career/${career.id}`}>
                          <h3 className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors">{career.name}</h3>
                        </Link>
                        <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">{career.description}</p>
                        
                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {career.skills?.slice(0, 5).map((s, sIdx) => (
                            <span key={sIdx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Match Gauge & Action Controls */}
                    <div className="flex items-center justify-between lg:justify-end gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Fit Score</span>
                        <span className="text-3xl font-extrabold text-brand-600 font-mono">
                          {career.matchScore}%
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveCareer(career)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
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
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Roadmap</span>
                        </button>

                        <button
                          onClick={() => openAiMentor(career)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Advisor</span>
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
