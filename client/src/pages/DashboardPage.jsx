import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, Layers, Trash2, Edit3, CheckCircle2, ArrowRight, 
  ShieldCheck, MapPin, School, GraduationCap, Calendar, Share2, 
  Check, Lock, X, Compass, Award, MessageSquare, Sliders,
  Table as TableIcon, LayoutGrid, Plus, Sparkles,
  StickyNote, CheckSquare, Square, ChevronRight, TrendingUp,
  Briefcase, MoveRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
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

const DEFAULT_MILESTONES = [
  { id: 'm1', text: 'Complete 18-Trait Psychometric Assessment', done: true },
  { id: 'm2', text: 'Pin 2 Top Specialization Tracks to Target Board', done: true },
  { id: 'm3', text: 'Audit Phase 1 Foundational OpenCourseWare module', done: false },
  { id: 'm4', text: 'Build & Deploy first public GitHub repository portfolio', done: false },
  { id: 'm5', text: 'Draft ATS-Optimized Resume using ClearPath compensation metrics', done: false },
  { id: 'm6', text: 'Schedule AI Mentorship mock technical evaluation', done: false },
];

const KANBAN_STAGES = [
  { key: 'target', label: '🎯 Target Tracks', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'prep', label: '📚 In Preparation', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'ready', label: '💼 Ready to Apply', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'saved', label: '⭐ Bookmarked', color: 'bg-slate-50 text-slate-700 border-slate-200' },
];

export default function DashboardPage() {
  const { user, profile, updateProfile, isSupabaseConfigured } = useAuth();
  const { 
    savedCareers, 
    toggleSaveCareer, 
    assessmentResult, 
    openAiMentor 
  } = useAssessment();

  const [activeTab, setActiveTab] = useState('workspace'); // 'workspace' | 'assessment' | 'security'
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'table' | 'gallery'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Kanban Stage Assignments in localStorage
  const [careerStages, setCareerStages] = useState(() => {
    try {
      const saved = localStorage.getItem('clearpath_career_stages');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persistent Milestones
  const [milestones, setMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('clearpath_milestones');
      return saved ? JSON.parse(saved) : DEFAULT_MILESTONES;
    } catch {
      return DEFAULT_MILESTONES;
    }
  });
  const [newMilestoneText, setNewMilestoneText] = useState('');
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);

  // Persistent Scratchpad Notes
  const [scratchpad, setScratchpad] = useState(() => {
    try {
      return localStorage.getItem('clearpath_scratchpad') || 
        "• Target Goal: Clear Tier-1 Quant / AI residency by Fall 2027\n• Recommended Books: 'Designing Data-Intensive Applications'\n• Interview Checklist: Review dynamic programming and system design trade-offs.";
    } catch {
      return '';
    }
  });
  const [scratchpadSaved, setScratchpadSaved] = useState(true);

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    stream: profile?.stream || 'B.Tech / B.E. (Computer Science & AI)',
    college: profile?.college || '',
    target_year: profile?.target_year || '2027',
    location: profile?.location || 'India',
    avatar_url: profile?.avatar_url || AVATAR_PRESETS[0].url,
  });

  // Sync stages to storage
  useEffect(() => {
    try {
      localStorage.setItem('clearpath_career_stages', JSON.stringify(careerStages));
    } catch {}
  }, [careerStages]);

  // Sync milestones to storage
  useEffect(() => {
    try {
      localStorage.setItem('clearpath_milestones', JSON.stringify(milestones));
    } catch {}
  }, [milestones]);

  const handleScratchpadChange = (e) => {
    const val = e.target.value;
    setScratchpad(val);
    setScratchpadSaved(false);
    try {
      localStorage.setItem('clearpath_scratchpad', val);
      setTimeout(() => setScratchpadSaved(true), 400);
    } catch {}
  };

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

  const moveCareerStage = (careerId, nextStage) => {
    setCareerStages(prev => ({
      ...prev,
      [careerId]: nextStage
    }));
  };

  const toggleMilestone = (id) => {
    setMilestones(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, done: !m.done } : m);
      const allDone = updated.every(m => m.done);
      if (allDone && updated.length > 0) {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      }
      return updated;
    });
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    const newM = {
      id: 'm_' + Date.now(),
      text: newMilestoneText.trim(),
      done: false
    };
    setMilestones(prev => [...prev, newM]);
    setNewMilestoneText('');
    setIsAddingMilestone(false);
  };

  const removeMilestone = (id) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  const username = (user?.email || 'student@clearpath.com').split('@')[0];
  const completedMilestonesCount = milestones.filter(m => m.done).length;
  const milestonePercent = milestones.length > 0 ? Math.round((completedMilestonesCount / milestones.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* NOTION-STYLE BREADCRUMB HEADER & PROFILE BANNER                           */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs mb-8">
          
          {/* Architectural Banner */}
          <div className="h-32 sm:h-40 w-full bg-[#191919] relative p-5 sm:p-6 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/10 text-[11px] font-medium text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Scholar</span>
              </span>
              {isSupabaseConfigured && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/10 text-[11px] font-medium text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Realtime Cloud Synced</span>
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share Command Center'}</span>
            </button>
          </div>

          {/* Profile Identity Details */}
          <div className="px-6 sm:px-8 pb-7 pt-4 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                
                {/* Circular Avatar */}
                <div className="relative group cursor-pointer -mt-16 sm:-mt-20 shrink-0" onClick={handleOpenEdit}>
                  <img
                    src={profile?.avatar_url || formData.avatar_url}
                    alt="Profile avatar"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-sm bg-white"
                  />
                  <div className="absolute inset-0 rounded-full bg-stone-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                      {profile?.full_name || 'Academic Scholar'}
                    </h1>
                    <span className="w-4 h-4 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-500 mt-0.5">@{username}</p>
                  
                  <div className="text-xs text-stone-500 mt-1 flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                    <span>{user?.email}</span>
                    {profile?.location && (
                      <span className="inline-flex items-center gap-1 text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
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
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Edit Profile</span>
                </button>
                <Link
                  to="/assessment"
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>18-Trait Assessment</span>
                </Link>
              </div>
            </div>

            {/* Notion Summary Strip */}
            <div className="grid grid-cols-3 gap-4 py-3.5 border-y border-stone-100 text-center my-4">
              <div className="cursor-pointer hover:bg-stone-50 rounded-lg py-1 transition-colors" onClick={() => setActiveTab('workspace')}>
                <span className="text-xl sm:text-2xl font-black text-stone-900 block">{savedCareers.length}</span>
                <span className="text-[11px] font-medium text-stone-500">Tracked Vocations</span>
              </div>
              <div className="cursor-pointer hover:bg-stone-50 rounded-lg py-1 transition-colors" onClick={() => setActiveTab('assessment')}>
                <span className="text-xl sm:text-2xl font-black text-stone-900 block">
                  {assessmentResult ? `${assessmentResult.averageScore || '8.2'}/10` : 'Pending'}
                </span>
                <span className="text-[11px] font-medium text-stone-500">Cognitive Quotient</span>
              </div>
              <div className="cursor-pointer hover:bg-stone-50 rounded-lg py-1 transition-colors" onClick={() => setActiveTab('workspace')}>
                <span className="text-xl sm:text-2xl font-black text-emerald-700 block">{milestonePercent}%</span>
                <span className="text-[11px] font-medium text-stone-500">Milestone Velocity</span>
              </div>
            </div>

            {/* Bio & Academic Tags */}
            <div className="space-y-3">
              {profile?.bio ? (
                <p className="text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed max-w-2xl">
                  {profile.bio}
                </p>
              ) : (
                <p className="text-xs text-stone-400 italic">
                  Select "Edit Profile" to codify your academic pursuits, research interests, and aspirational industries.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-800">
                  <GraduationCap className="w-3.5 h-3.5 text-stone-600" />
                  <span>{profile?.stream || 'B.Tech / B.E. (Computer Science & AI)'}</span>
                </span>

                {profile?.college && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700">
                    <School className="w-3.5 h-3.5 text-stone-500" />
                    <span>{profile.college}</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>Cohort of {profile?.target_year || '2027'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NOTION NAVIGATION TABS                                                    */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between border-b border-stone-200 mb-6 overflow-x-auto pb-px">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'workspace'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Vocational Workspace ({savedCareers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('assessment')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'assessment'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>18-Trait Cognitive Diagnostic</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'security'
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Credentials &amp; Security</span>
            </button>
          </div>

          {/* Database View Switcher (Only visible in Workspace Tab) */}
          {activeTab === 'workspace' && savedCareers.length > 0 && (
            <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200 mb-2">
              <button
                onClick={() => setViewMode('board')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'board' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Board</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'gallery' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Gallery</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: NOTION MODULAR WORKSPACE (KANBAN / TABLE / CHECKLIST / SCRATCHPAD) */}
        {/* ========================================================================= */}
        {activeTab === 'workspace' && (
          <div className="space-y-8">
            
            {/* NOTION WIDGET ROW: INTERACTIVE CHECKLIST & SCRATCHPAD */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* NOTION INTERACTIVE MILESTONE CHECKLIST */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-stone-900" />
                      <h3 className="text-sm font-bold text-stone-900">Academic Readiness Checklist</h3>
                    </div>
                    <span className="text-xs font-mono text-stone-500 font-medium">
                      {completedMilestonesCount}/{milestones.length} Done ({milestonePercent}%)
                    </span>
                  </div>

                  {/* Progress gauge */}
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-4">
                    <div 
                      className="bg-stone-900 h-full rounded-full transition-all duration-300"
                      style={{ width: `${milestonePercent}%` }}
                    />
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {milestones.map((m) => (
                      <div
                        key={m.id}
                        className="group flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 transition-colors text-xs"
                      >
                        <button
                          onClick={() => toggleMilestone(m.id)}
                          className="flex items-center gap-2.5 text-left flex-1 cursor-pointer"
                        >
                          {m.done ? (
                            <CheckSquare className="w-4 h-4 text-stone-900 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-stone-300 shrink-0 group-hover:text-stone-400" />
                          )}
                          <span className={m.done ? 'line-through text-stone-400' : 'text-stone-700 font-medium'}>
                            {m.text}
                          </span>
                        </button>
                        <button
                          onClick={() => removeMilestone(m.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-rose-600 transition-opacity"
                          title="Remove milestone"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Custom Goal */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  {isAddingMilestone ? (
                    <form onSubmit={handleAddMilestone} className="flex gap-2">
                      <input
                        type="text"
                        value={newMilestoneText}
                        onChange={(e) => setNewMilestoneText(e.target.value)}
                        placeholder="Add specific target (e.g., Build ML pipeline)..."
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-hidden focus:border-stone-900"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingMilestone(false)}
                        className="px-2 py-1.5 text-stone-500 text-xs hover:text-stone-800"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsAddingMilestone(true)}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Academic Milestone</span>
                    </button>
                  )}
                </div>
              </div>

              {/* NOTION STUDY SCRATCHPAD */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StickyNote className="w-4 h-4 text-stone-900" />
                      <h3 className="text-sm font-bold text-stone-900">Personal Study Scratchpad</h3>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">
                      {scratchpadSaved ? '• Autosaved' : '• Saving...'}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 mb-2">
                    Quick workspace notes for upcoming admission exams, portfolio ideas, or advisor feedback.
                  </p>

                  <textarea
                    value={scratchpad}
                    onChange={handleScratchpadChange}
                    rows={6}
                    placeholder="Capture thoughts, syllabus notes, or interview questions..."
                    className="w-full p-3 text-xs text-stone-800 bg-stone-50 rounded-xl border border-stone-200 focus:outline-hidden focus:border-stone-900 focus:bg-white leading-relaxed resize-none font-mono"
                  />
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Persisted in browser workspace</span>
                  <span>Markdown lists supported</span>
                </div>
              </div>
            </div>

            {/* NOTION VOCATIONAL DATABASE: BOARD / TABLE / GALLERY */}
            {savedCareers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/90 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-4 text-stone-500">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Your Vocational Database is Empty</h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Bookmark career tracks from the directory or your cognitive assessment matches to track roadmaps, compensation benchmarks, and stages here.
                </p>
                <Link
                  to="/careers"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Browse 42+ Master Careers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div>
                {/* 1. KANBAN BOARD VIEW */}
                {viewMode === 'board' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {KANBAN_STAGES.map((col) => {
                      const columnCareers = savedCareers.filter(c => {
                        const currentStage = careerStages[c.id] || 'saved';
                        return currentStage === col.key;
                      });

                      return (
                        <div key={col.key} className="bg-stone-100/70 rounded-2xl p-3.5 border border-stone-200/80 flex flex-col min-h-[350px]">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/60">
                            <span className="text-xs font-bold text-stone-800">{col.label}</span>
                            <span className="text-[11px] font-mono font-bold text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                              {columnCareers.length}
                            </span>
                          </div>

                          <div className="space-y-3 flex-1 overflow-y-auto">
                            {columnCareers.map((c) => (
                              <div
                                key={c.id}
                                className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs hover:border-stone-400 transition-all flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-1 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                                      {c.category}
                                    </span>
                                    <button
                                      onClick={() => toggleSaveCareer(c)}
                                      className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors"
                                      title="Remove"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <h4 className="text-sm font-bold text-stone-900 leading-snug">
                                    {c.name}
                                  </h4>

                                  <span className="text-xs font-semibold text-emerald-700 block mt-1.5">
                                    {c.averageSalaryInr || 'Competitive CTC'}
                                  </span>
                                </div>

                                {/* Kanban Move Dropdown / Pill */}
                                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                                  <Link
                                    to={`/career/${c.id}`}
                                    className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                                  >
                                    <span>Guide</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>

                                  <select
                                    value={careerStages[c.id] || 'saved'}
                                    onChange={(e) => moveCareerStage(c.id, e.target.value)}
                                    className="text-[11px] bg-stone-50 border border-stone-200 rounded px-2 py-1 text-stone-700 font-medium focus:outline-hidden"
                                  >
                                    <option value="target">🎯 Target</option>
                                    <option value="prep">📚 In Prep</option>
                                    <option value="ready">💼 Ready</option>
                                    <option value="saved">⭐ Saved</option>
                                  </select>
                                </div>
                              </div>
                            ))}

                            {columnCareers.length === 0 && (
                              <div className="h-28 border border-dashed border-stone-300 rounded-xl flex items-center justify-center text-center p-3">
                                <span className="text-[11px] text-stone-400">
                                  No tracks in this phase
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 2. HIGH-DENSITY DATABASE TABLE VIEW */}
                {viewMode === 'table' && (
                  <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-bold text-[10px]">
                          <tr>
                            <th className="py-3 px-4">Vocational Track</th>
                            <th className="py-3 px-4">Discipline</th>
                            <th className="py-3 px-4">Stage Status</th>
                            <th className="py-3 px-4">Compensation (INR)</th>
                            <th className="py-3 px-4">Global Benchmark</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {savedCareers.map((c) => {
                            const curStage = careerStages[c.id] || 'saved';
                            const stageObj = KANBAN_STAGES.find(s => s.key === curStage) || KANBAN_STAGES[3];

                            return (
                              <tr key={c.id} className="hover:bg-stone-50/80 transition-colors">
                                <td className="py-3.5 px-4 font-bold text-stone-900">
                                  <Link to={`/career/${c.id}`} className="hover:underline flex items-center gap-1.5">
                                    <span>{c.name}</span>
                                    <ArrowRight className="w-3 h-3 text-stone-400" />
                                  </Link>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                                    {c.category}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${stageObj.color}`}>
                                    {stageObj.label}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-emerald-700">
                                  {c.averageSalaryInr || '₹12,00,000+'}
                                </td>
                                <td className="py-3.5 px-4 text-stone-600 font-mono">
                                  {c.averageSalaryUsd || '$95,000'}
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <div className="inline-flex items-center gap-2">
                                    <button
                                      onClick={() => openAiMentor(c)}
                                      className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded"
                                      title="Ask Advisor"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => toggleSaveCareer(c)}
                                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded"
                                      title="Remove"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. GALLERY VIEW */}
                {viewMode === 'gallery' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {savedCareers.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:border-stone-400 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-md">
                              {c.category}
                            </span>
                            <button
                              onClick={() => toggleSaveCareer(c)}
                              className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <h3 className="text-base font-bold text-stone-900">{c.name}</h3>
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2">{c.tagline || c.description}</p>
                          
                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-700">
                              {c.averageSalaryInr || 'Competitive CTC'}
                            </span>
                            <span className="text-[11px] text-stone-400 font-mono">
                              {c.growthRate}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 mt-2">
                          <Link
                            to={`/career/${c.id}`}
                            className="flex-1 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold text-center transition-colors"
                          >
                            Explore Guide
                          </Link>
                          <button
                            onClick={() => openAiMentor(c)}
                            className="p-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 transition-colors"
                            title="Consult Advisor"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ASSESSMENT RESULTS (18-TRAIT COGNITIVE DIAGNOSTIC)                 */}
        {/* ========================================================================= */}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            {assessmentResult ? (
              <>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      18-Trait Psychometric Completed
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-2.5">
                      Dominant Cognitive Profile: <span className="text-stone-900 underline decoration-stone-300">{assessmentResult.dominantTrait}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-lg leading-relaxed">
                      Evaluated through multi-axis cognitive, analytical, interpersonal, and systematic problem-solving vectors.
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto border-stone-100">
                    <span className="text-3xl font-black text-stone-900 block">{assessmentResult.averageScore}</span>
                    <span className="text-xs text-stone-500 font-mono">Cognitive Quotient / 10</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-stone-800" />
                      <span>Aligned Vocational Pathways</span>
                    </h4>
                    <Link to="/assessment" className="text-xs font-semibold text-stone-600 hover:text-stone-900">
                      Re-calibrate Assessment
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {assessmentResult.topCareers?.slice(0, 5).map((career, i) => (
                      <div
                        key={career.id}
                        className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-stone-400 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-900 font-bold text-xs flex items-center justify-center shrink-0">
                            #{i + 1}
                          </span>
                          <div>
                            <h5 className="text-sm font-bold text-stone-900">{career.name}</h5>
                            <span className="text-xs text-stone-500">{career.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-stone-900">{career.matchScore}% Match</span>
                          <Link
                            to={`/career/${career.id}`}
                            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-700 transition-colors"
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
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/90 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-4 text-stone-500">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">No Assessment Recorded Yet</h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Complete the 18-trait psychometric assessment to compute your cognitive vectors and personalized career alignments.
                </p>
                <Link
                  to="/assessment"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
                >
                  <span>Launch 18-Trait Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ACCOUNT CREDENTIALS & SECURITY                                     */}
        {/* ========================================================================= */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <h4 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-stone-900" />
              <span>Verified Account Credentials &amp; Encryption</span>
            </h4>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Manage your verified authentication credentials, OTP verification state, and database encryption.
            </p>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-medium text-stone-500 block">Registered Email</span>
                  <span className="text-sm font-semibold text-stone-900">{user?.email}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>OTP Verified (Brevo Delivery)</span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-medium text-stone-500 block">Password &amp; Security</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-mono tracking-widest text-stone-600">••••••••••••</span>
                    <span className="text-xs text-stone-400">• Argon2 Encrypted</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 w-fit">
                    <Lock className="w-3.5 h-3.5 text-stone-500" />
                    <span>Protected</span>
                  </span>
                  <Link
                    to="/login"
                    className="px-3 py-1 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-xs font-medium text-stone-700 transition-colors"
                  >
                    Reset Password
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-medium text-stone-500 block">Account Status</span>
                  <span className="text-xs font-semibold text-stone-800">Verified Scholar Profile • ClearPath 2.0 Cloud Synced</span>
                </div>
                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 w-fit inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Synchronized</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* EDIT PROFILE MODAL                                                        */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-stone-900 mb-1">Edit Scholar Profile</h3>
            <p className="text-xs text-stone-500 mb-6">Update your academic information, avatar, and aspirational goals.</p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">Select Portrait Avatar</label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatar_url: preset.url }))}
                      className={`relative rounded-full p-0.5 border-2 transition-all cursor-pointer shrink-0 ${
                        formData.avatar_url === preset.url ? 'border-stone-900 ring-2 ring-stone-900/20' : 'border-transparent hover:border-stone-300'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-12 h-12 rounded-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-stone-900"
                  placeholder="e.g. Aryan Sharma"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Scholar Bio &amp; Aspirations</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-stone-900 resize-none leading-relaxed"
                  placeholder="Summarize your engineering focus, key projects, and career horizons..."
                />
              </div>

              {/* Degree Stream */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Current Academic Program</label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData(prev => ({ ...prev, stream: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-stone-900 bg-white"
                >
                  {DEGREE_CATEGORIES.flatMap(cat => cat.degrees).map((deg, i) => (
                    <option key={i} value={deg}>{deg}</option>
                  ))}
                </select>
              </div>

              {/* College & Target Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">College / University</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-stone-900"
                    placeholder="IIT Bombay / BITS Pilani"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Graduation Cohort</label>
                  <input
                    type="text"
                    value={formData.target_year}
                    onChange={(e) => setFormData(prev => ({ ...prev, target_year: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-stone-900"
                    placeholder="2027"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Location / Timezone</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-stone-900"
                  placeholder="Bengaluru, India"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : saveSuccess ? 'Profile Updated!' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
