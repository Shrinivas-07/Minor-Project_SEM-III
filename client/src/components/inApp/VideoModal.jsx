import React from 'react';
import { X, ExternalLink, Play, Sparkles } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export default function VideoModal() {
  const { activeVideoModal, closeInAppVideo, openAiMentor } = useAssessment();

  if (!activeVideoModal.isOpen || !activeVideoModal.video) return null;

  const { title, embedId, url, provider } = activeVideoModal.video;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Play className="w-4 h-4 fill-rose-600" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 truncate max-w-lg">{title}</h3>
              <p className="text-xs text-slate-500">In-App Learning Player • {provider || 'Curated Stream'}</p>
            </div>
          </div>
          <button
            onClick={closeInAppVideo}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          {embedId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center">
              <p className="text-sm text-slate-300 mb-4">This resource opens externally at its primary interactive destination.</p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
              >
                <span>Open Resource in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Footer info & AI action */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                closeInAppVideo();
                openAiMentor({ name: title });
              }}
              className="inline-flex items-center gap-1.5 text-brand-600 font-semibold hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI Mentor about this lesson
            </button>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <span>Original Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
