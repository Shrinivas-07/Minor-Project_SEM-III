import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Sparkles, Play, CheckCircle2, 
  Clock, DollarSign, TrendingUp, Building2, Layers, BookOpen, Share2,
  Globe, ExternalLink, Film, Search, Award
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

  // In-page YouTube player state
  const [activeVideoQuery, setActiveVideoQuery] = useState(
    career ? career.youtubeSearchQuery : ''
  );
  const [activeEmbedId, setActiveEmbedId] = useState(
    career?.featuredVideos?.[0]?.embedId || null
  );

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

  const getYoutubeEmbedSrc = () => {
    if (activeEmbedId) {
      return `https://www.youtube-nocookie.com/embed/${activeEmbedId}?autoplay=0&rel=0`;
    }
    return `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(activeVideoQuery)}&rel=0`;
  };

  const quickVideoQueries = [
    { label: "Complete Roadmap 2026", q: `${career.name} roadmap 2026 complete course` },
    { label: "Beginner Crash Course", q: `${career.name} full tutorial for beginners` },
    { label: "Portfolio Projects", q: `${career.name} real world projects tutorial` },
    { label: "Day in Life & Salary", q: `${career.name} day in the life salary review` },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
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
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition-all cursor-pointer"
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
                  {career.topEmployers.slice(0, 4).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 INTEGRATED IN-APP RESOURCE SECTIONS FOR THIS FIELD                      */}
        {/* ========================================================================= */}

        <div className="space-y-8 mb-12">
          {/* 1. YOUTUBE IN-APP SEARCH & VIDEO HUB */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Play className="w-5 h-5 fill-rose-600" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                    Resource Section 1
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    YouTube Search & In-App Video Masterclasses
                  </h2>
                </div>
              </div>

              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeVideoQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-semibold transition-colors"
              >
                <span>Open Search on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* In-App Video Player */}
            <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800 mb-5">
              <iframe
                key={activeVideoQuery + (activeEmbedId || '')}
                className="w-full h-full"
                src={getYoutubeEmbedSrc()}
                title={career.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Topic Switcher Pills */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
              <p className="text-xs font-bold text-slate-700 mb-2">
                Click any topic below to update the in-app player:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickVideoQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveEmbedId(null);
                      setActiveVideoQuery(item.q);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      activeVideoQuery === item.q
                        ? 'bg-rose-600 text-white border-rose-600 font-bold shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. COURSE RESOURCE PLATFORMS (Coursera, Kaggle, edX, etc.) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  Resource Section 2
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Verified Courses & Multi-Site Learning Platforms
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {career.courses?.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-brand-300 shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-brand-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {course.platform}
                      </span>
                      {course.freeOption && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Free Audit
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-2">{course.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Instructor / Org: {course.provider}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Official Curriculum</span>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Explore Course</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. GENERAL KNOWLEDGE & WIKIPEDIA / REGULATORY AUTHORITIES */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  Resource Section 3
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  General Knowledge, Wikipedia & Governing Portals
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {career.knowledge?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs flex flex-col justify-between transition-all"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-2.5">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">{item.desc}</p>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 pt-3 border-t border-slate-200/60 inline-flex items-center justify-between text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Phase Educational Roadmap */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600" />
              4-Phase Educational & Milestone Roadmap
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
                        className={`text-left p-2.5 rounded-xl text-xs flex items-center gap-2 transition-all border cursor-pointer ${
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
    </div>
  );
}
