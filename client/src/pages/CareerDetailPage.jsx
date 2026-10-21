import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Sparkles, Play, CheckCircle2, 
  Clock, DollarSign, TrendingUp, Building2, Layers, BookOpen, Share2
} from 'lucide-react';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';

export default function CareerDetailPage() {
  const { id } = useParams();
  const { 
    toggleSaveCareer, 
    isCareerSaved, 
    openInAppVideo, 
    openInAppRoadmap, 
    openAiMentor 
  } = useAssessment();

  const career = careersData.find((c) => c.id === id);
  const [completedTopics, setCompletedTopics] = useState([]);

  if (!career) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Career Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The career path you requested could not be located in our catalog.</p>
          <Link to="/careers" className="mt-4 inline-block px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = isCareerSaved(career.id);

  const toggleTopicCheck = (topic) => {
    setCompletedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Careers</span>
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-md">
                  {career.category}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Growth: {career.growthRate}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {career.name}
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">{career.tagline}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleSaveCareer(career)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  isSaved
                    ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? 'Bookmarked' : 'Save Career'}</span>
              </button>

              <button
                onClick={() => openAiMentor(career)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Mentor</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-600 mt-6 leading-relaxed max-w-3xl">
            {career.description}
          </p>

          {/* Metrics Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Average Compensation (India)</span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">{career.averageSalaryInr}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Global Benchmark</span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">{career.averageSalaryUsd}</span>
            </div>
            {career.topEmployers && (
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400 font-medium block">Key Hiring Organizations</span>
                <span className="text-xs font-semibold text-slate-700 mt-1 block">
                  {career.topEmployers.slice(0, 3).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Skills & Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Core Competencies */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Quick AI Questions */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Ask Sahi AI About This Role
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => openAiMentor({ name: `${career.name}: 5-year outlook` })}
                  className="w-full text-left p-2.5 rounded-xl text-xs bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-600 transition-colors border border-slate-200/60"
                >
                  "What does the 5-year progression look like?"
                </button>
                <button
                  onClick={() => openAiMentor({ name: `${career.name}: Beginner project ideas` })}
                  className="w-full text-left p-2.5 rounded-xl text-xs bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-600 transition-colors border border-slate-200/60"
                >
                  "Suggest 3 portfolio projects to land an entry role"
                </button>
              </div>
            </div>
          </div>

          {/* Interactive In-App Roadmap (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-600" />
                4-Phase Learning & Career Roadmap
              </h3>
              <span className="text-xs font-medium text-slate-400">
                {completedTopics.length} milestones checked
              </span>
            </div>

            <div className="space-y-6">
              {career.roadmap?.map((phase, pIdx) => (
                <div key={pIdx} className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-900">{phase.phase}</h4>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {phase.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {phase.topics?.map((topic, tIdx) => {
                      const isChecked = completedTopics.includes(topic);
                      return (
                        <button
                          key={tIdx}
                          onClick={() => toggleTopicCheck(topic)}
                          className={`text-left p-2 rounded-xl text-xs flex items-center gap-2 transition-all border ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-white border-slate-200/60 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-emerald-600' : 'text-slate-300'}`} />
                          <span className={`truncate ${isChecked ? 'line-through text-slate-500' : ''}`}>{topic}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* In-App Learning Resources */}
        {career.resources && career.resources.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Play className="w-4 h-4 text-rose-600" />
              Curated Learning Resources for {career.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {career.resources.map((res, rIdx) => (
                <div
                  key={rIdx}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 hover:border-brand-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block mb-1">
                      {res.type}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{res.title}</h4>
                  </div>
                  <button
                    onClick={() => openInAppVideo(res.title, res.embedId, res.url, res.provider)}
                    className="mt-4 w-full py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch in App</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
