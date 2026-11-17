import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Play, CheckCircle2, 
  Clock, BookOpen, Globe, ExternalLink, MessageSquare, 
  Share2, Check, Sparkles, BrainCircuit, Library, Scale,
  GraduationCap, Briefcase, TrendingUp, Building2, Quote,
  Scroll, Compass, Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';

export default function CareerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    toggleSaveCareer, 
    isCareerSaved, 
    openInAppRoadmap, 
    openAiMentor,
    savedCareers,
    assessmentResult 
  } = useAssessment();

  // Multi-strategy robust career lookup
  const cleanId = (id || '').trim();
  const lowerId = cleanId.toLowerCase();
  let decodedId = lowerId;
  try {
    decodedId = decodeURIComponent(cleanId).toLowerCase();
  } catch {
    decodedId = lowerId;
  }

  let career = careersData.find((c) => 
    c.id === cleanId ||
    c.id.toLowerCase() === lowerId ||
    c.id.toLowerCase() === lowerId.replace(/-/g, '_') ||
    c.id.toLowerCase().replace(/_/g, '-') === lowerId ||
    c.name.toLowerCase() === decodedId
  );

  // Fallback 1: check savedCareers if id was a DB id/UUID
  if (!career && savedCareers && Array.isArray(savedCareers)) {
    const savedMatch = savedCareers.find(s => 
      s.id === cleanId || 
      s.career_id === cleanId || 
      (s.name && s.name.toLowerCase() === decodedId)
    );
    if (savedMatch) {
      const matchName = (savedMatch.name || savedMatch.career_name || '').toLowerCase();
      career = careersData.find(c => 
        c.id === savedMatch.career_id || 
        c.id === savedMatch.id || 
        c.name.toLowerCase() === matchName
      );
    }
  }

  // Fallback 2: check assessmentResult topCareers
  if (!career && assessmentResult?.topCareers && Array.isArray(assessmentResult.topCareers)) {
    const assessMatch = assessmentResult.topCareers.find(a => 
      a.id === cleanId || 
      a.career_id === cleanId || 
      (a.name && a.name.toLowerCase() === decodedId)
    );
    if (assessMatch) {
      const aName = (assessMatch.name || assessMatch.career_name || '').toLowerCase();
      career = careersData.find(c => 
        c.id === assessMatch.career_id || 
        c.id === assessMatch.id || 
        c.name.toLowerCase() === aName
      );
    }
  }

  // Persistent roadmap milestones per career
  const storageKey = career ? `clearpath_roadmap_${career.id}` : `clearpath_roadmap_${cleanId}`;
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('dossier'); // 'dossier' | 'roadmap' | 'resources'

  // In-page YouTube player state
  const [activeVideoQuery, setActiveVideoQuery] = useState(
    career ? career.youtubeSearchQuery : ''
  );
  const [activeEmbedId, setActiveEmbedId] = useState(
    career?.featuredVideos?.[0]?.embedId || null
  );

  // Sync state whenever career.id changes (handles back/forward browser navigation)
  useEffect(() => {
    if (career) {
      setActiveVideoQuery(career.youtubeSearchQuery || `${career.name} roadmap course tutorial`);
      setActiveEmbedId(career?.featuredVideos?.[0]?.embedId || null);
      try {
        const saved = localStorage.getItem(`clearpath_roadmap_${career.id}`);
        setCompletedTopics(saved ? JSON.parse(saved) : []);
      } catch {
        setCompletedTopics([]);
      }
    }
  }, [career?.id]);

  useEffect(() => {
    if (career) {
      try {
        localStorage.setItem(`clearpath_roadmap_${career.id}`, JSON.stringify(completedTopics));
      } catch {
        // storage quota fallback
      }
    }
  }, [completedTopics, career?.id]);

  if (!career) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 text-center">
        <div className="max-w-lg bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-bold">Vocational Registry</span>
          <h2 className="text-2xl font-bold text-stone-900 mt-2">Dossier Under Compilation</h2>
          <p className="text-sm text-stone-500 mt-2 leading-relaxed">
            The career pathway <strong className="text-stone-800">"{cleanId}"</strong> could not be directly matched. Please explore our 42 master pathways below:
          </p>
          
          <div className="mt-5 space-y-2 text-left max-h-48 overflow-y-auto pr-1">
            {careersData.slice(0, 5).map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/career/${c.id}`)}
                className="w-full p-2.5 rounded-xl border border-stone-200 hover:border-stone-400 bg-stone-50 hover:bg-white text-xs font-semibold text-stone-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>{c.name}</span>
                <span className="text-stone-400 text-[10px]">{c.category}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link 
              to="/careers" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All Careers</span>
            </Link>
            <Link 
              to="/assessment" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-all"
            >
              <span>Take Assessment</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = isCareerSaved(career.id);

  // Calculate total roadmap milestones
  const allRoadmapTopics = career.roadmap ? career.roadmap.flatMap(p => p.topics || []) : [];
  const totalMilestones = allRoadmapTopics.length;
  const progressPercent = totalMilestones > 0 ? Math.round((completedTopics.length / totalMilestones) * 100) : 0;

  const toggleTopicCheck = (topic) => {
    setCompletedTopics(prev => {
      const next = prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic];
      if (!prev.includes(topic) && next.length === totalMilestones && totalMilestones > 0) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
      return next;
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getYoutubeEmbedSrc = () => {
    if (activeEmbedId) {
      return `https://www.youtube-nocookie.com/embed/${activeEmbedId}?autoplay=0&rel=0`;
    }
    return `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(activeVideoQuery)}&rel=0`;
  };

  const quickVideoQueries = [
    { label: "Complete 2026 Curriculum", q: `${career.name} roadmap 2026 complete course` },
    { label: "Foundational Lectures", q: `${career.name} full tutorial for beginners university` },
    { label: "Production Case Studies", q: `${career.name} real world architecture tutorial` },
    { label: "Senior Practitioner Day in Life", q: `${career.name} day in the life senior engineer` },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 py-10 selection:bg-amber-100 selection:text-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vocational Catalog</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-700">{career.category}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-600 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share Dossier'}</span>
            </button>
            <button
              onClick={() => toggleSaveCareer(career)}
              className={`p-2 sm:px-3.5 sm:py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSaved
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved to Workspace' : 'Bookmark Track'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PENTAGRAM & AESOP EDITORIAL HERO                                         */}
        {/* ========================================================================= */}
        <header className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 flex-wrap mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 bg-stone-100 px-3 py-1 rounded">
                  {career.category}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  Growth: {career.growthRate}
                </span>
                {career.workStyle && (
                  <span className="text-[11px] font-medium text-stone-600 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-stone-400" />
                    {Array.isArray(career.workStyle) ? career.workStyle.join(' • ') : career.workStyle}
                  </span>
                )}
                {career.degreePath && (
                  <span className="text-[11px] font-medium text-stone-600 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-stone-400" />
                    {career.degreePath}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.1]">
                {career.name}
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-normal mt-3 leading-relaxed">
                {career.tagline}
              </p>

              <p className="text-sm text-stone-600 mt-5 leading-relaxed max-w-2xl">
                {career.description}
              </p>
            </div>

            {/* Quick Action Dock */}
            <div className="lg:w-72 shrink-0 bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-3">
                  Compensation Benchmarks
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-stone-500 block">India Annual CTC</span>
                    <span className="text-xl font-bold text-stone-900 block mt-0.5">
                      {career.averageSalaryInr}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-stone-200/60">
                    <span className="text-xs text-stone-500 block">International Baseline</span>
                    <span className="text-base font-semibold text-stone-800 block mt-0.5">
                      {career.averageSalaryUsd}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/80 space-y-2">
                <button
                  onClick={() => openAiMentor(career)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consult AI Advisor</span>
                </button>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="w-full py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>Interactive Roadmap</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top Employers Strip */}
          {Array.isArray(career.topEmployers) && career.topEmployers.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Key Hiring Institutions
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {career.topEmployers.map((emp, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-stone-700 bg-stone-100 px-3 py-1 rounded-md"
                  >
                    {emp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* EDITORIAL VIEW TABS (LINEAR-INSPIRED NAVIGATION)                         */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 border-b border-stone-200 mb-8 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`pb-3 px-1 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'dossier'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Scroll className="w-4 h-4" />
            <span>Aesop Editorial Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`pb-3 px-1 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'roadmap'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>4-Phase Milestone Roadmap</span>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold">
              {progressPercent}%
            </span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-3 px-1 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'resources'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Library className="w-4 h-4" />
            <span>Curated Resources &amp; Lectures</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: AESOP EDITORIAL DOSSIER (LITERARY ART DIRECTION)                   */}
        {/* ========================================================================= */}
        {activeTab === 'dossier' && (
          <div className="space-y-8">
            {/* The Daily Reality: Narrative Prose */}
            <article className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs">
              <div className="max-w-3xl">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-2">
                  Chapter I • Phenomenology of Practice
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-6">
                  The Daily Reality
                </h2>

                <div className="prose prose-stone max-w-none text-stone-700 text-base leading-relaxed space-y-4">
                  <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900">
                    {career.editorial?.dailyReality || career.editorial?.theDailyReality || career.description}
                  </p>
                </div>
              </div>
            </article>

            {/* Cognitive Architecture & Cultural Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cognitive Architecture */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-5">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-1">
                    Chapter II • Mental Models
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mb-4">
                    Cognitive Architecture
                  </h3>
                  <p className="text-xs text-stone-500 mb-5 leading-relaxed">
                    The cognitive predispositions, perceptual lenses, and habits of mind demanded by this discipline.
                  </p>

                  <div className="space-y-2.5">
                    {(() => {
                      const cognitiveList = Array.isArray(career.editorial?.cognitiveArchitecture)
                        ? career.editorial.cognitiveArchitecture
                        : career.editorial?.cognitiveDemands
                          ? career.editorial.cognitiveDemands.split(',').map(s => s.trim()).filter(Boolean)
                          : [
                              "First-principles reasoning under uncertainty",
                              "Systems-level architectural decomposition",
                              "Rigorous empirical verification discipline",
                              "High tolerance for iterative ambiguity"
                            ];

                      return cognitiveList.map((trait, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs font-medium text-stone-800 flex items-center gap-3"
                        >
                          <span className="w-5 h-5 rounded-md bg-stone-200/80 text-stone-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{typeof trait === 'object' ? (trait.trait || trait.name || JSON.stringify(trait)) : trait}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100">
                  <span className="text-[11px] text-stone-400 font-mono">Cognitive Quotient: Top 5th Percentile</span>
                </div>
              </div>

              {/* Cultural & Civilizational Impact */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-5">
                    <Scale className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-1">
                    Chapter III • Ethical Vector
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mb-4">
                    Civilizational Value
                  </h3>
                  <div className="p-5 rounded-2xl bg-[#F7F4EE] border border-amber-900/10 text-stone-800 text-sm leading-relaxed italic mb-5 relative">
                    <Quote className="w-5 h-5 text-stone-400 mb-2 not-italic" />
                    "{career.editorial?.culturalImpact || 'To practice this craft is to quietly reconfigure the nervous system of modern civilization, translating abstract human desire into resilient, enduring reality.'}"
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    Every generation requires stewards capable of translating technological momentum into human flourishing. Those in this discipline bear custody over systemic reliability and public trust.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100">
                  <span className="text-[11px] text-stone-400 font-mono">Societal Horizon: 2026—2040</span>
                </div>
              </div>
            </div>

            {/* The Master's Library */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                  <Library className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 block">
                    Chapter IV • Canon &amp; Literature
                  </span>
                  <h3 className="text-xl font-bold text-stone-900">
                    The Master's Library
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Array.isArray(career.editorial?.mastersLibrary) ? career.editorial.mastersLibrary : [
                  { title: "The Structure and Interpretation of Computer Programs", author: "Abelson & Sussman", desc: "Foundational conceptual architecture of computing." },
                  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", desc: "Fundamental principles of reliable, scalable distributed systems." },
                  { title: "Thinking in Systems", author: "Donella Meadows", desc: "Systems-level mental models and feedback loops." }
                ]).map((work, idx) => {
                  const bookTitle = typeof work === 'object' ? (work.title || work.name || 'Seminal Work') : work;
                  const bookAuthor = typeof work === 'object' ? work.author : null;
                  const bookDesc = typeof work === 'object' ? work.desc : null;

                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-400 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Vol. {idx + 1}</span>
                        <h4 className="text-xs font-bold text-stone-900 leading-snug">
                          {bookTitle}
                        </h4>
                        {bookAuthor && (
                          <p className="text-[11px] font-medium text-stone-600 mt-1">
                            By {bookAuthor}
                          </p>
                        )}
                        {bookDesc && (
                          <p className="text-[11px] text-stone-500 mt-2 leading-relaxed line-clamp-3">
                            {bookDesc}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 mt-4 block">Recommended Essential Canon</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INTERACTIVE PERSISTENT ROADMAP (NOTION / DUOLINGO PROGRESSION)     */}
        {/* ========================================================================= */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Progress Bar & Milestone Status */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-1">
                    Curriculum Progression
                  </span>
                  <h3 className="text-xl font-bold text-stone-900">
                    Academic &amp; Technical Milestone Roadmap
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-stone-900">{progressPercent}%</span>
                  <span className="text-xs text-stone-500 block">
                    {completedTopics.length} of {totalMilestones} topics completed
                  </span>
                </div>
              </div>

              {/* Spring Progress Gauge */}
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-stone-900 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span>Phase I (Foundations)</span>
                <span>Phase II (Core)</span>
                <span>Phase III (Systems)</span>
                <span>Phase IV (Mastery)</span>
              </div>
            </div>

            {/* 4 Phases List */}
            <div className="space-y-5">
              {career.roadmap?.map((phase, pIdx) => {
                const phaseTopics = phase.topics || [];
                const phaseCompleted = phaseTopics.filter(t => completedTopics.includes(t)).length;
                const isPhaseAllDone = phaseTopics.length > 0 && phaseCompleted === phaseTopics.length;

                return (
                  <div
                    key={pIdx}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                          isPhaseAllDone 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {pIdx + 1}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-stone-900">{phase.phase}</h4>
                          <span className="text-xs text-stone-400 font-medium">{phase.duration}</span>
                        </div>
                      </div>

                      <span className="text-xs text-stone-500 font-mono">
                        {phaseCompleted} / {phaseTopics.length} done
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {phaseTopics.map((topic, tIdx) => {
                        const isChecked = completedTopics.includes(topic);
                        return (
                          <button
                            key={tIdx}
                            onClick={() => toggleTopicCheck(topic)}
                            className={`text-left p-3.5 rounded-xl text-xs flex items-center gap-3 transition-all border cursor-pointer ${
                              isChecked
                                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 font-medium'
                                : 'bg-stone-50/60 border-stone-200/70 text-stone-700 hover:bg-stone-100/70 hover:border-stone-300'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked 
                                ? 'bg-emerald-600 border-emerald-600 text-white' 
                                : 'border-stone-300 bg-white'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={isChecked ? 'line-through opacity-70' : ''}>
                              {topic}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CURATED RESOURCES & IN-APP LECTURES                                */}
        {/* ========================================================================= */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            {/* 1. YOUTUBE IN-APP PLAYER & TOPIC SELECTOR */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Play className="w-5 h-5 fill-rose-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                      Visual Masterclasses
                    </span>
                    <h2 className="text-xl font-bold text-stone-900">
                      In-App YouTube Studio &amp; Lectures
                    </h2>
                  </div>
                </div>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeVideoQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-700 text-xs font-semibold transition-colors"
                >
                  <span>Search on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-stone-950 rounded-2xl overflow-hidden shadow-lg border border-stone-800 mb-5">
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
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
                <p className="text-xs font-bold text-stone-700 mb-2">
                  Select a syllabus module to stream directly:
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
                          ? 'bg-stone-900 text-white border-stone-900 font-bold shadow-xs'
                          : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. VERIFIED UNIVERSITY & PLATFORM COURSES */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    Syllabi &amp; Curricula
                  </span>
                  <h2 className="text-xl font-bold text-stone-900">
                    Verified Courseware &amp; Certification Portals
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {career.courses?.map((course, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (course.url) window.open(course.url, '_blank', 'noopener,noreferrer');
                    }}
                    className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-stone-400 hover:bg-stone-100/60 shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-stone-800 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                          {course.platform}
                        </span>
                        {course.freeOption && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Free Audit Available
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors mt-2">
                        {course.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">Faculty / Provider: {course.provider}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                      <span className="text-xs text-stone-400">Accredited Course</span>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-1.5 rounded-xl bg-stone-900 group-hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <span>Open Syllabus</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. ENCYCLOPEDIA & REGULATORY PORTALS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Governance &amp; Canon
                  </span>
                  <h2 className="text-xl font-bold text-stone-900">
                    Standardization Bodies &amp; General Knowledge
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {career.knowledge?.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
                    }}
                    className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-emerald-300 hover:bg-stone-100/60 shadow-xs flex flex-col justify-between transition-all cursor-pointer group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {item.type}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mt-2.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-3 leading-relaxed">{item.desc}</p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-5 pt-3 border-t border-stone-200/60 inline-flex items-center justify-between text-xs font-semibold text-emerald-800 hover:text-emerald-900"
                    >
                      <span>Read Documentation</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
