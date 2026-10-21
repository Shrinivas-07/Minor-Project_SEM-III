import React, { useState } from 'react';
import { 
  X, Play, BookOpen, Globe, Search, ExternalLink, Sparkles, 
  Layers, CheckCircle2, Award, Clock, ArrowRight, RefreshCw, Film
} from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export default function FieldResourcesHub() {
  const { activeVideoModal, closeInAppVideo, openAiMentor } = useAssessment();

  if (!activeVideoModal.isOpen || !activeVideoModal.video) return null;

  const { title, query, careerData, defaultTab = 'youtube' } = activeVideoModal.video;
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [currentSearchQuery, setCurrentSearchQuery] = useState(
    query || careerData?.youtubeSearchQuery || `${title} complete course tutorial roadmap`
  );
  const [activeVideoEmbed, setActiveVideoEmbed] = useState(
    activeVideoModal.video.embedId || null
  );

  // Generate safe YouTube embed URL from query or video ID
  const getEmbedUrl = () => {
    if (activeVideoEmbed) {
      return `https://www.youtube-nocookie.com/embed/${activeVideoEmbed}?autoplay=1&rel=0`;
    }
    // YouTube search playlist embed mode
    return `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(currentSearchQuery)}&rel=0`;
  };

  const directYoutubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(currentSearchQuery)}`;

  // Quick alternative video search tags
  const quickVideoSearches = [
    { label: "Complete Roadmap", q: `${careerData?.name || title} roadmap 2026 complete guide` },
    { label: "Beginner Crash Course", q: `${careerData?.name || title} full tutorial for beginners` },
    { label: "Projects & Portfolio", q: `${careerData?.name || title} real world portfolio projects` },
    { label: "Salary & Day in Life", q: `${careerData?.name || title} day in the life salary review` },
  ];

  const coursesList = careerData?.courses || [
    { name: `${title} Professional Certificate`, platform: "Coursera", url: `https://www.coursera.org/search?query=${encodeURIComponent(title)}`, provider: "Top Universities", freeOption: true },
    { name: "Practical Hands-on Projects & Micro-Courses", platform: "freeCodeCamp / Kaggle", url: "https://www.freecodecamp.org/", provider: "Community Learning", freeOption: true },
    { name: "Comprehensive Subject Guides & Practice", platform: "GeeksforGeeks", url: `https://www.geeksforgeeks.org/`, provider: "GeeksforGeeks", freeOption: true },
    { name: "Academic Video Lectures", platform: "NPTEL / Swayam (Govt of India)", url: "https://swayam.gov.in/", provider: "IITs & IISc", freeOption: true }
  ];

  const knowledgeList = careerData?.knowledge || [
    { title: `Wikipedia: ${title}`, url: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(title)}`, type: "Encyclopedia", desc: "Detailed encyclopedic overview of history, theories, and industry standards." },
    { title: "Interactive Developer & Career Roadmap", url: "https://roadmap.sh", type: "Visual Guide", desc: "Step-by-step role guides, prerequisites, and modern competency benchmarks." },
    { title: "Investopedia / Regulatory Insights", url: "https://www.investopedia.com", type: "Industry Standards", desc: "Industry terminology, market compensation benchmarks, and career progression rules." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-brand-50/30 to-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/15">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded">
                  In-App Resource Center
                </span>
                {careerData?.category && (
                  <span className="text-[10px] text-slate-500 font-medium">
                    {careerData.category}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md sm:max-w-xl">
                {careerData?.name || title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeInAppVideo();
                openAiMentor(careerData || { name: title });
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs font-semibold border border-brand-200/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Mentor</span>
            </button>
            <button
              onClick={closeInAppVideo}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close Resource Hub"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resource Type Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('youtube')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'youtube'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>1. YouTube Video Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'courses'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>2. Top Course Platforms ({coursesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'knowledge'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>3. General Knowledge & Wikipedia</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {/* TAB 1: YOUTUBE IN-APP VIDEO HUB */}
          {activeTab === 'youtube' && (
            <div className="space-y-4">
              {/* Main Player Screen */}
              <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
                <iframe
                  key={currentSearchQuery + (activeVideoEmbed || '')}
                  className="w-full h-full"
                  src={getEmbedUrl()}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Search & Topic Switcher */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Explore Video Masterclasses for this Field
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Active search: <strong className="text-slate-800">"{currentSearchQuery}"</strong>
                    </p>
                  </div>

                  <a
                    href={directYoutubeSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <span>Open YouTube Search in Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Quick Topic Chips */}
                <div className="flex flex-wrap gap-2">
                  {quickVideoSearches.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveVideoEmbed(null);
                        setCurrentSearchQuery(item.q);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        currentSearchQuery === item.q
                          ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COURSE RESOURCES (Coursera, Kaggle, edX, etc.) */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div className="bg-brand-50/70 border border-brand-200 rounded-2xl p-4 text-xs text-brand-900 flex items-center justify-between">
                <div>
                  <strong>Curated Multi-Platform Course Catalog:</strong> Learn through verified courses from top universities and global tech platforms.
                </div>
                <span className="text-[11px] font-bold bg-brand-200 text-brand-800 px-2 py-0.5 rounded-md">
                  Audit Free Available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coursesList.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-soft transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                          {course.platform}
                        </span>
                        {course.freeOption && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Free Option
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{course.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">Provider: {course.provider}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Self-Paced / Guided</span>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>Start Course</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GENERAL KNOWLEDGE & WIKIPEDIA */}
          {activeTab === 'knowledge' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900">
                <strong>Encyclopedic & Regulatory Reference:</strong> Read official overviews, governing body licensing standards, and global encyclopedic archives for this field.
              </div>

              <div className="grid grid-cols-1 gap-4">
                {knowledgeList.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xl">{item.desc}</p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <span>Read Documentation</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>In-App SahiChayan Resource Engine</span>
          <button
            onClick={() => {
              closeInAppVideo();
              openAiMentor(careerData || { name: title });
            }}
            className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need advice? Ask Sahi AI Mentor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
