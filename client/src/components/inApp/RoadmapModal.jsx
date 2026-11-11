import React from 'react';
import { X, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export default function RoadmapModal() {
  const { activeRoadmapModal, closeInAppRoadmap, openAiMentor } = useAssessment();

  if (!activeRoadmapModal.isOpen || !activeRoadmapModal.career) return null;

  const { career } = activeRoadmapModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              {career.category}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{career.name} Roadmap</h2>
            <p className="text-xs text-slate-500 mt-0.5">{career.tagline}</p>
          </div>
          <button
            onClick={closeInAppRoadmap}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roadmap Milestones */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="relative border-l-2 border-brand-200 ml-4 pl-6 space-y-8">
            {career.roadmap?.map((phase, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs">
                  {idx + 1}
                </div>

                {/* Content Card */}
                <div className="bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-5 border border-slate-200/80 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-base font-bold text-slate-900">{phase.phase}</h4>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {phase.duration}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-600 mb-2">Key Skills & Milestones:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phase.topics?.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2 rounded-xl border border-slate-200/60">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Average Market Compensation: <strong className="text-slate-800">{career.averageSalaryInr}</strong>
          </p>
          <button
            onClick={() => {
              closeInAppRoadmap();
              openAiMentor(career);
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customize with Advisor</span>
          </button>
        </div>
      </div>
    </div>
  );
}

