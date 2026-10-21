import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Bookmark, BookmarkCheck, Clock, Layers, Play, Sparkles, 
  Trash2, Edit3, CheckCircle2, ArrowRight, ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../context/AssessmentContext';

export default function DashboardPage() {
  const { user, profile, signOut, isSupabaseConfigured } = useAuth();
  const { 
    savedCareers, 
    toggleSaveCareer, 
    assessmentResult, 
    openInAppRoadmap, 
    openInAppVideo,
    openAiMentor 
  } = useAssessment();

  const [activeTab, setActiveTab] = useState('saved');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt="avatar"
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-brand-500/20 shadow-xs"
            />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900">{profile?.full_name || 'Student Candidate'}</h1>
                {user?.isDemo && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Demo Mode Active
                  </span>
                )}
                {isSupabaseConfigured && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Supabase Synced
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">{user?.email || 'student@sahichayan.com'}</p>
              <p className="text-xs font-semibold text-brand-600 mt-2 bg-brand-50 px-2.5 py-1 rounded-lg inline-block">
                {profile?.stream || 'Computer Science & Technology'} • {profile?.education_level || 'Undergraduate'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/assessment"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Careers ({savedCareers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'assessment'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Latest Assessment Results</span>
          </button>
        </div>

        {/* TAB 1: SAVED CAREERS */}
        {activeTab === 'saved' && (
          <div>
            {savedCareers.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No saved careers yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Bookmark career tracks that interest you during your assessment or from the directory to track your preparation here.
                </p>
                <Link
                  to="/careers"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl"
                >
                  <span>Explore Careers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedCareers.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{c.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Expected Compensation: <strong className="text-slate-700">{c.averageSalaryInr}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/career/${c.id}`}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                      >
                        Dossier
                      </Link>
                      <button
                        onClick={() => openAiMentor(c)}
                        className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI</span>
                      </button>
                      <button
                        onClick={() => toggleSaveCareer(c)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl border border-rose-100 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LATEST ASSESSMENT */}
        {activeTab === 'assessment' && (
          <div>
            {assessmentResult ? (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
                      Verified Result
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">
                      Dominant Cognitive Trait: {assessmentResult.dominantTrait}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Average Aptitude Score: <strong>{assessmentResult.averageScore} / 10</strong>
                    </p>
                  </div>
                  <Link
                    to="/assessment"
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Tune Trait Sliders
                  </Link>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800">Your Top Compatible Careers:</h4>
                  {assessmentResult.topCareers?.slice(0, 5).map((career, i) => (
                    <div
                      key={career.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center">
                          #{i + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{career.name}</h4>
                          <span className="text-xs text-slate-500">{career.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-brand-600">{career.matchScore}%</span>
                        <Link
                          to={`/career/${career.id}`}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-600"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No assessment completed yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Take the 18-trait self-assessment to generate your personalized compatibility vector.
                </p>
                <Link
                  to="/assessment"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
