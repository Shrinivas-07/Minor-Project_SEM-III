import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, Layers, Trash2, Edit3, CheckCircle2, ArrowRight, 
  ShieldCheck, MapPin, School, GraduationCap, Calendar, Share2, 
  Check, Eye, EyeOff, X, Compass, Award, MessageSquare, Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../context/AssessmentContext';
import { DEGREE_CATEGORIES } from '../data/degreesData';

const AVATAR_PRESETS = [
  { label: 'Portrait 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80' },
  { label: 'Portrait 2', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250&auto=format&fit=crop&q=80' },
  { label: 'Portrait 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80' },
  { label: 'Portrait 4', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&auto=format&fit=crop&q=80' },
  { label: 'Portrait 5', url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=250&auto=format&fit=crop&q=80' },
  { label: 'Portrait 6', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=250&auto=format&fit=crop&q=80' },
];

export default function DashboardPage() {
  const { user, profile, updateProfile, isSupabaseConfigured } = useAuth();
  const { 
    savedCareers, 
    toggleSaveCareer, 
    assessmentResult, 
    openAiMentor 
  } = useAssessment();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'assessment' | 'security'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    stream: profile?.stream || 'B.Tech / B.E. (Computer Science & AI)',
    college: profile?.college || '',
    target_year: profile?.target_year || '2027',
    location: profile?.location || 'India',
    avatar_url: profile?.avatar_url || AVATAR_PRESETS[0].url,
  });

  const handleOpenEdit = () => {
    setFormData({
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      stream: profile?.stream || 'B.Tech / B.E. (Computer Science & AI)',
      college: profile?.college || '',
      target_year: profile?.target_year || '2027',
      location: profile?.location || 'India',
      avatar_url: profile?.avatar_url || AVATAR_PRESETS[0].url,
    });
    setSaveSuccess(false);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setSaveSuccess(false);
      }, 600);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const username = (user?.email || 'student@sahichayan.com').split('@')[0];

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* 1. PROFILE OVERVIEW HEADER CARD                                           */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card mb-8">
          {/* Clean Slate Architectural Cover Banner */}
          <div className="h-36 sm:h-44 w-full bg-slate-900 relative p-5 sm:p-6 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-medium text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Account</span>
              </span>
              {isSupabaseConfigured && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-medium text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Synced</span>
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share Profile'}</span>
            </button>
          </div>

          {/* Profile Identity & Details */}
          <div className="px-6 sm:px-8 pb-7 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-14 sm:-mt-16 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                {/* Circular Avatar */}
                <div className="relative group cursor-pointer" onClick={handleOpenEdit}>
                  <img
                    src={profile?.avatar_url || formData.avatar_url}
                    alt="Profile avatar"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-soft bg-white"
                  />
                  <div className="absolute inset-0 rounded-full bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1 border-4 border-transparent">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </div>
                </div>

                <div className="pt-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {profile?.full_name || 'Student Profile'}
                    </h1>
                    <span
                      className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0"
                      title="Verified Student"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">@{username}</p>
                  <div className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                    <span>{user?.email}</span>
                    {profile?.location && (
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{profile.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-center gap-2.5 shrink-0">
                <button
                  onClick={handleOpenEdit}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit Profile</span>
                </button>
                <Link
                  to="/assessment"
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Take Assessment</span>
                </Link>
              </div>
            </div>

            {/* Clean Profile Metrics Row */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 text-center my-5">
              <div className="cursor-pointer hover:bg-slate-50 rounded-lg py-1 transition-colors" onClick={() => setActiveTab('saved')}>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">{savedCareers.length}</span>
                <span className="text-xs font-medium text-slate-500">Saved Careers</span>
              </div>
              <div className="cursor-pointer hover:bg-slate-50 rounded-lg py-1 transition-colors" onClick={() => setActiveTab('assessment')}>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-600 block">
                  {assessmentResult ? `${assessmentResult.averageScore || '8.2'}/10` : 'Pending'}
                </span>
                <span className="text-xs font-medium text-slate-500">Aptitude Score</span>
              </div>
              <div className="cursor-pointer hover:bg-slate-50 rounded-lg py-1 transition-colors" onClick={() => setActiveTab('assessment')}>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">18</span>
                <span className="text-xs font-medium text-slate-500">Traits Analyzed</span>
              </div>
            </div>

            {/* Bio & Academic Metadata Pills */}
            <div className="space-y-3">
              {profile?.bio ? (
                <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed max-w-2xl">
                  {profile.bio}
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No bio added yet. Select "Edit Profile" to describe your academic goals and interests.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-100 text-xs font-semibold text-brand-700">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                  <span>{profile?.stream || 'B.Tech / B.E. (Computer Science & AI)'}</span>
                </span>

                {profile?.college && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                    <School className="w-3.5 h-3.5 text-slate-500" />
                    <span>{profile.college}</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Class of {profile?.target_year || '2027'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION TABS (UNDERLINED EDITORIAL STYLE)                              */}
        {/* ========================================================================= */}
        <div className="flex gap-6 border-b border-slate-200 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'saved'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Careers ({savedCareers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('assessment')}
            className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'assessment'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Assessment Results</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Account &amp; Security</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SAVED CAREERS                                                      */}
        {/* ========================================================================= */}
        {activeTab === 'saved' && (
          <div>
            {savedCareers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-card">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No saved careers yet</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Bookmark career tracks from the directory or your assessment matches to track compensation and roadmaps here.
                </p>
                <Link
                  to="/careers"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Browse Career Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {savedCareers.map((c) => (
                  <div
                    key={c.id}
                    className="pro-card rounded-2xl p-6 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-md">
                          {c.category}
                        </span>
                        <button
                          onClick={() => toggleSaveCareer(c)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove from saved careers"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Expected Compensation:{' '}
                        <strong className="text-emerald-700 font-semibold">
                          {c.averageSalaryInr || '₹8,00,000 - ₹24,00,000'}
                        </strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                      <Link
                        to={`/career/${c.id}`}
                        className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold text-center transition-colors"
                      >
                        View Career Guide
                      </Link>
                      <button
                        onClick={() => openAiMentor(c)}
                        className="flex-1 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                        <span>Ask Advisor</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ASSESSMENT RESULTS                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            {assessmentResult ? (
              <>
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed Profile
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2.5">
                      Dominant Trait: <span className="text-brand-600">{assessmentResult.dominantTrait}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
                      Computed across all 18 cognitive, analytical, and interpersonal dimensions.
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto border-slate-100">
                    <span className="text-3xl font-extrabold text-slate-900 block">{assessmentResult.averageScore}</span>
                    <span className="text-xs text-slate-500 font-medium">Average Score / 10</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-brand-600" />
                      <span>Top Recommended Career Tracks</span>
                    </h4>
                    <Link to="/assessment" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                      Adjust Sliders
                    </Link>
                  </div>
                  <div className="space-y-2.5">
                    {assessmentResult.topCareers?.slice(0, 5).map((career, i) => (
                      <div
                        key={career.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                            #{i + 1}
                          </span>
                          <div>
                            <h5 className="text-sm font-bold text-slate-900">{career.name}</h5>
                            <span className="text-xs text-slate-500">{career.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-extrabold text-brand-600">{career.matchScore}% Match</span>
                          <Link
                            to={`/career/${career.id}`}
                            className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-700 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-card">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Assessment Completed Yet</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Complete the 18-trait assessment to view your cognitive strengths and personalized career alignments.
                </p>
                <Link
                  to="/assessment"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  <span>Start 18-Trait Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ACCOUNT & SECURITY                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card">
            <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>Account Credentials &amp; Sync</span>
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              Manage your verified credentials and database synchronization details.
            </p>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">Registered Email</span>
                  <span className="text-sm font-semibold text-slate-900">{user?.email}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>OTP Verified</span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">Stored Password (Account Record)</span>
                  <span className="text-sm font-mono font-semibold text-slate-800">
                    {showPassword ? (profile?.password || '••••••••') : '••••••••••••'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors w-fit cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">Account Identifier</span>
                  <span className="text-xs font-mono text-slate-700">{user?.id || 'Local Client Session'}</span>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 w-fit">
                  Active Session
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. EDIT PROFILE MODAL (CLEAN LIGHT INTERFACE)                             */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">Edit Student Profile</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile changes saved.</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Profile photo</label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_PRESETS.map((av) => (
                    <button
                      key={av.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar_url: av.url })}
                      className={`rounded-xl overflow-hidden p-0.5 border-2 transition-all ${
                        formData.avatar_url === av.url
                          ? 'border-brand-600 ring-2 ring-brand-600/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={av.url} alt={av.label} className="w-full h-12 rounded-lg object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Display name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-all"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Bio</label>
                  <div className="flex items-center gap-3">
                    {formData.bio && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, bio: '' })}
                        className="text-[11px] font-medium text-rose-600 hover:text-rose-700"
                      >
                        Clear bio
                      </button>
                    )}
                    <span className="text-[11px] text-slate-400">{formData.bio.length}/180</span>
                  </div>
                </div>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 180) })}
                  rows={3}
                  placeholder="Share your academic focus, target roles, or subjects you enjoy..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Currently pursuing degree</label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-all cursor-pointer"
                >
                  {DEGREE_CATEGORIES.map((cat) => (
                    <optgroup key={cat.category} label={cat.category} className="font-semibold text-slate-800">
                      {cat.degrees.map((d) => (
                        <option key={d} value={d} className="font-normal text-slate-900">
                          {d}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">College or university</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. Pune Institute of Technology"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Graduation year</label>
                  <select
                    value={formData.target_year}
                    onChange={(e) => setFormData({ ...formData, target_year: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-all cursor-pointer"
                  >
                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">City / Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
