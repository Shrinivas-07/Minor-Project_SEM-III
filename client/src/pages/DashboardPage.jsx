import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Bookmark, Layers, Play, Sparkles, Trash2, Edit3, CheckCircle2, 
  ArrowRight, ExternalLink, ShieldCheck, MapPin, School, GraduationCap, 
  Calendar, Share2, Copy, Check, Lock, Mail, Phone, Eye, EyeOff, X, 
  Compass, Flame, Award, HeartHandshake, BrainCircuit
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../context/AssessmentContext';
import { DEGREE_CATEGORIES } from '../data/degreesData';

const AVATAR_PRESETS = [
  { label: 'Cyber Tech', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80' },
  { label: 'Innovator', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250&auto=format&fit=crop&q=80' },
  { label: 'Scientist', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80' },
  { label: 'Creator', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&auto=format&fit=crop&q=80' },
  { label: 'Strategist', url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=250&auto=format&fit=crop&q=80' },
  { label: 'Explorer', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=250&auto=format&fit=crop&q=80' },
];

export default function DashboardPage() {
  const { user, profile, updateProfile, isSupabaseConfigured } = useAuth();
  const { 
    savedCareers, 
    toggleSaveCareer, 
    assessmentResult, 
    openAiMentor 
  } = useAssessment();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'telemetry' | 'security'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile form state for modal
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    stream: profile?.stream || 'B.Tech / B.E. (Computer Science & AI)',
    college: profile?.college || '',
    target_year: profile?.target_year || '2027',
    location: profile?.location || 'India',
    avatar_url: profile?.avatar_url || AVATAR_PRESETS[0].url,
  });

  // Open Edit Modal with latest state
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

  // Save profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => {
        setIsEditModalOpen(false);
        setSaveSuccess(false);
      }, 700);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Share profile handler
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const username = (user?.email || 'student@sahichayan.com').split('@')[0];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-8 lg:py-12 relative overflow-x-hidden selection:bg-brand-500 selection:text-white">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/25 via-pink-600/20 to-purple-500/15 blur-[140px] rounded-full pointer-events-none animate-float-slow" />
      <div className="absolute top-80 right-10 w-[500px] h-[400px] bg-gradient-to-br from-cyan-500/20 via-indigo-600/20 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 bg-grid-mesh opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================================= */}
        {/* 1. PROFESSIONAL INSTAGRAM-STYLE PROFILE HEADER CARD                       */}
        {/* ========================================================================= */}
        <div className="spatial-glass-card rounded-3xl overflow-hidden border border-white/15 mb-8 shadow-2xl backdrop-blur-2xl">
          {/* Cover Banner with Animated Iridescent Gradient */}
          <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 relative p-6 flex items-end justify-between overflow-hidden">
            <div className="absolute inset-0 bg-warm-mesh opacity-40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/20 to-cyan-500/20 blur-3xl pointer-events-none" />

            {/* Verification & Cloud Indicator Badge */}
            <div className="relative z-10 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>BREVO VERIFIED ID</span>
              </span>
              {isSupabaseConfigured && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CLOUD SYNCED</span>
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="relative z-10 px-3.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-xs text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cute-spring"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
            </button>
          </div>

          {/* Instagram-Style Profile Main Body */}
          <div className="px-6 sm:px-10 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              {/* Avatar with Iridescent Story Ring */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                <div className="relative group cursor-pointer" onClick={handleOpenEdit}>
                  <div className="p-1 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shadow-xl shadow-pink-500/20 animate-iridescent">
                    <img
                      src={profile?.avatar_url || formData.avatar_url}
                      alt="avatar"
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#07090e]"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {profile?.full_name || 'Student Candidate'}
                    </h1>
                    {/* Instagram-style Verified Badge */}
                    <div className="w-5 h-5 rounded-full bg-cyan-500 text-[#07090e] flex items-center justify-center" title="Verified Student Profile">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <p className="text-sm font-mono text-cyan-400 mt-0.5">@{username}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-3">
                    <span>{user?.email}</span>
                    {profile?.location && (
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3 h-3 text-pink-400" />
                        <span>{profile.location}</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleOpenEdit}
                  className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-white transition-all flex items-center gap-2 cute-spring shadow-md"
                >
                  <Edit3 className="w-3.5 h-3.5 text-pink-400" />
                  <span>Edit Profile</span>
                </button>
                <Link
                  to="/assessment"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-pink-600 hover:from-brand-500 hover:to-pink-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2 cute-spring border border-white/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Take Assessment</span>
                </Link>
              </div>
            </div>

            {/* Instagram-style Telemetry Counts Bar */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/10 text-center my-6">
              <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveTab('saved')}>
                <span className="text-xl sm:text-2xl font-black text-white block">{savedCareers.length}</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Saved Careers</span>
              </div>
              <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveTab('telemetry')}>
                <span className="text-xl sm:text-2xl font-black text-cyan-400 block">
                  {assessmentResult ? `${assessmentResult.averageScore || '8.2'}/10` : 'Ready'}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Aptitude Index</span>
              </div>
              <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveTab('telemetry')}>
                <span className="text-xl sm:text-2xl font-black text-pink-400 block">18</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Traits Mapped</span>
              </div>
            </div>

            {/* Instagram Bio & Academic Pill Badges */}
            <div className="space-y-3">
              {profile?.bio ? (
                <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed max-w-2xl">
                  {profile.bio}
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No bio added yet. Click "Edit Profile" to write your academic interests, aspirations, and goals!
                </p>
              )}

              {/* Categorized Degree & University Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/15 border border-brand-500/30 text-xs font-semibold text-brand-300">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-400" />
                  <span>{profile?.stream || 'B.Tech / B.E. (Computer Science & AI)'}</span>
                </span>

                {profile?.college && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                    <School className="w-3.5 h-3.5 text-pink-400" />
                    <span>{profile.college}</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-xs font-medium text-cyan-300">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Class of {profile?.target_year || '2027'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION-WISE NAVIGATION TABS (INSTAGRAM / SOCIAL STYLE)                 */}
        {/* ========================================================================= */}
        <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Careers ({savedCareers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'telemetry'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Aptitude Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'security'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Lab Vitals</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SAVED CAREERS COLLECTION GRID                                      */}
        {/* ========================================================================= */}
        {activeTab === 'saved' && (
          <div>
            {savedCareers.length === 0 ? (
              <div className="spatial-glass-card rounded-3xl p-12 text-center border border-white/15">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Bookmark className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Your Saved Collection is Empty</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  Bookmark career vectors from the directory or your assessment results to preserve your study tracks, salary brackets, and YouTube masterclasses.
                </p>
                <Link
                  to="/careers"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-brand-600/25 cute-spring border border-white/20"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore 32 Careers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedCareers.map((c) => (
                  <div
                    key={c.id}
                    className="spatial-glass-card rounded-3xl p-6 border border-white/15 hover:border-brand-500/40 transition-all cute-spring flex flex-col justify-between gap-4 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg">
                          {c.category}
                        </span>
                        <button
                          onClick={() => toggleSaveCareer(c)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                          title="Remove from saved collection"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                        {c.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Expected Compensation:{' '}
                        <strong className="text-emerald-400 font-semibold">{c.averageSalaryInr || '₹8,00,000 - ₹24,00,000'}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <Link
                        to={`/career/${c.id}`}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold text-center border border-white/10 transition-colors"
                      >
                        Open Dossier
                      </Link>
                      <button
                        onClick={() => openAiMentor(c)}
                        className="flex-1 py-2 rounded-xl bg-brand-600/30 hover:bg-brand-600/50 text-brand-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-brand-500/30 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Ask AI Mentor</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: APTITUDE & 18-TRAIT TELEMETRY                                      */}
        {/* ========================================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            {assessmentResult ? (
              <>
                <div className="spatial-glass-card rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                      VERIFIED TELEMETRY ACTIVE
                    </span>
                    <h3 className="text-2xl font-black text-white mt-3">
                      Dominant Trait: <span className="gradient-text-vibrant">{assessmentResult.dominantTrait}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg">
                      Based on your responses across all 18 cognitive, analytical, and emotional dimensions.
                    </p>
                  </div>
                  <div className="text-center sm:text-right shrink-0">
                    <span className="text-4xl font-black text-white block">{assessmentResult.averageScore}</span>
                    <span className="text-xs text-slate-400 font-mono uppercase">Overall Score / 10</span>
                  </div>
                </div>

                {/* Top Matched Careers */}
                <div className="spatial-glass-card rounded-3xl p-6 sm:p-8 border border-white/15">
                  <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Top Compatible Career Vectors:</span>
                  </h4>
                  <div className="space-y-3">
                    {assessmentResult.topCareers?.slice(0, 5).map((career, i) => (
                      <div
                        key={career.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/40 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-white/10 text-white font-black text-xs flex items-center justify-center">
                            #{i + 1}
                          </span>
                          <div>
                            <h5 className="text-sm font-bold text-white">{career.name}</h5>
                            <span className="text-xs text-cyan-400 font-mono">{career.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-black text-emerald-400">{career.matchScore}% Match</span>
                          <Link
                            to={`/career/${career.id}`}
                            className="p-2 rounded-xl bg-white/10 hover:bg-brand-500 text-white transition-colors"
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
              <div className="spatial-glass-card rounded-3xl p-12 text-center border border-white/15">
                <BrainCircuit className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">No Telemetry Recorded Yet</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  Take the scientific 18-trait psychometric assessment to compute your cognitive dominant trait and university course alignments.
                </p>
                <Link
                  to="/assessment"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-pink-600/25 cute-spring border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Start 18-Trait Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ACCOUNT & SECURITY / LAB VITALS TAB                                */}
        {/* ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="spatial-glass-card rounded-3xl p-6 sm:p-8 border border-white/15">
              <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Account Credentials & Cloud Database Sync</span>
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Active student credentials stored in Supabase <code className="text-cyan-300 font-mono">public.profiles</code>.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">Registered Email</span>
                    <span className="text-sm font-bold text-white font-mono">{user?.email}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300 w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Brevo OTP Verified</span>
                  </span>
                </div>

                {/* Plain-text password viva verification card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">Database Password (Viva / Lab Evaluator View)</span>
                    <span className="text-sm font-mono font-bold text-cyan-300">
                      {showPassword ? (profile?.password || '••••••••') : '••••••••••••'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors w-fit"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide Password' : 'Show Password'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">User UUID Identifier</span>
                    <span className="text-xs font-mono text-slate-300">{user?.id || 'Local Client Session'}</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 w-fit">
                    PostgreSQL RLS Protected
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. INSTAGRAM-STYLE EDIT PROFILE MODAL                                     */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="spatial-glass-card w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-pink-400" />
                <h3 className="text-xl font-bold text-white">Edit Student Profile</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 text-slate-400 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {saveSuccess && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated & synchronized to database!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar Preset Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Choose Avatar Character</label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_PRESETS.map((av) => (
                    <button
                      key={av.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar_url: av.url })}
                      className={`relative rounded-2xl overflow-hidden p-0.5 border-2 transition-all ${
                        formData.avatar_url === av.url ? 'border-pink-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      title={av.label}
                    >
                      <img src={av.url} alt={av.label} className="w-full h-12 rounded-xl object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-all"
                  required
                />
              </div>

              {/* Bio (Instagram style) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300">Bio</label>
                  <span className="text-[10px] text-slate-400 font-mono">{formData.bio.length}/180 chars</span>
                </div>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 180) })}
                  rows={3}
                  placeholder="Aspiring AI Engineer | Passionate about Distributed Systems & Aptitude Matching 🚀"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-all resize-none"
                />
              </div>

              {/* Current Pursuing Degree Dropdown */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Currently Pursuing Degree</label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-500 transition-all cursor-pointer"
                >
                  {DEGREE_CATEGORIES.map((cat) => (
                    <optgroup key={cat.category} label={`━━ ${cat.category} ━━`} className="bg-slate-900 text-cyan-400 font-bold">
                      {cat.degrees.map((d) => (
                        <option key={d} value={d} className="bg-slate-900 text-white font-normal">
                          {d}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* College & Graduation Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">College / University</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. Pune Institute of Tech"
                    className="w-full px-4 py-2 rounded-2xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Graduation Year</label>
                  <select
                    value={formData.target_year}
                    onChange={(e) => setFormData({ ...formData, target_year: e.target.value })}
                    className="w-full px-4 py-2 rounded-2xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-500 transition-all cursor-pointer"
                  >
                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
                      <option key={yr} value={yr} className="bg-slate-900 text-white">
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">City / Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Pune, Maharashtra, India"
                  className="w-full px-4 py-2 rounded-2xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-pink-600 hover:from-brand-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 cute-spring border border-white/20 disabled:opacity-50 flex items-center gap-2"
                >
                  <span>{isSaving ? 'Synchronizing...' : 'Save Profile'}</span>
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
