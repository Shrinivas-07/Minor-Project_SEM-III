import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, Clock, CheckCircle, MessageSquare, BookOpen, Globe, 
  ExternalLink, Play, TrendingUp, Building2, ArrowRight
} from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export default function RoadmapModal() {
  const { 
    activeRoadmapModal, 
    closeInAppRoadmap, 
    openInAppVideo, 
    openAiMentor 
  } = useAssessment();

  if (!activeRoadmapModal.isOpen || !activeRoadmapModal.career) return null;

  const { career } = activeRoadmapModal;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs"
      onClick={closeInAppRoadmap}
    >
      <div 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-md">
                {career.category}
              </span>
              {career.matchScore !== undefined && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  {career.matchScore}% Match Fit
                </span>
              )}
              {career.growthRate && (
                <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  {career.growthRate}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {career.name}
            </h2>
            {career.tagline && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{career.tagline}</p>
            )}
          </div>
          <button
            onClick={closeInAppRoadmap}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close Roadmap Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Details Body */}
        <div className="p-6 overflow-y-auto space-y-8 bg-slate-50/60">
          {/* 1. Role Overview & Market Compensation */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-card space-y-5">
            {career.description && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Role Overview
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">{career.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-[11px] font-medium text-slate-500 block">Avg. Compensation (India)</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {career.averageSalaryInr || 'Competitive'}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-500 block">Global Benchmark</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {career.averageSalaryUsd || 'Varies by region'}
                </span>
              </div>
              {career.topEmployers && career.topEmployers.length > 0 && (
                <div>
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    Key Employers
                  </span>
                  <span className="text-xs font-semibold text-slate-800 mt-0.5 block">
                    {career.topEmployers.slice(0, 4).join(', ')}
                  </span>
                </div>
              )}
            </div>

            {career.skills && career.skills.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Core Skills &amp; Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {career.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-medium bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. 4-Phase Educational & Career Roadmap */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Structured Educational &amp; Preparation Roadmap</span>
            </h3>

            {career.roadmap && career.roadmap.length > 0 ? (
              <div className="relative border-l-2 border-slate-200 ml-3.5 pl-6 space-y-5">
                {career.roadmap.map((phase, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-4 ring-slate-50">
                      {idx + 1}
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-card">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{phase.phase}</h4>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md w-fit">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {phase.duration}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {phase.topics?.map((topic, tIdx) => (
                          <div
                            key={tIdx}
                            className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/70"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-xs text-slate-500">
                Detailed phase milestones for this career path are available on the full guide page.
              </div>
            )}
          </div>

          {/* 3. Recommended Courses & Certifications */}
          {career.courses && career.courses.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-600" />
                <span>Recommended Courses &amp; Certifications</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {career.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-card flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                          {course.platform}
                        </span>
                        {course.freeOption && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Free Option
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{course.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Provider: {course.provider}</p>
                    </div>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 w-fit"
                    >
                      <span>Open Course</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Official Guides & Reference Portals */}
          {career.knowledge && career.knowledge.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Official References &amp; Regulatory Portals</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {career.knowledge.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 shadow-card flex flex-col justify-between gap-2 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-2">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-brand-600 inline-flex items-center gap-1 mt-1">
                      <span>Read Resource</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              closeInAppRoadmap();
              openInAppVideo(
                career.name,
                null,
                null,
                'YouTube',
                career.youtubeSearchQuery,
                career,
                'youtube'
              );
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Video Tutorials</span>
          </button>

          <div className="flex items-center gap-2.5 ml-auto">
            <Link
              to={`/career/${career.id}`}
              onClick={closeInAppRoadmap}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>Full Guide Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => {
                closeInAppRoadmap();
                openAiMentor(career);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Career Advisor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
