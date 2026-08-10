import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import careers from './assets/careers.js';
import { apiUrl } from './config';

export default function SahiChayanQuiz() {
  const navigate = useNavigate();
  const questions = [
    { label: "Creativity", icon: "🎨", key: "creativity" },
    { label: "Logic & Problem Solving", icon: "🧠", key: "logic" },
    { label: "Helping People", icon: "🤝", key: "helping" },
    { label: "Technology Interest", icon: "💻", key: "technology" },
    { label: "Avation & Space Interest", icon: "🚀", key: "Avation"},
    { label: "Teaching & Mentoring", icon: "👨‍🏫", key: "teaching" },
    { label: "Leadership", icon: "🚀", key: "leadership" },
    { label: "Communication", icon: "🗣️", key: "communication" },
    { label: "Hands-on Building", icon: "🛠️", key: "building" },
    { label: "Medical & Healthcare Interest", icon: "🩺", key: "medical" },
    { label: "Finance & Accounting", icon: "💰", key: "finance" },
    { label: "Public Administration", icon: "🏛️", key: "administration" },
    { label: "Nature & Environment", icon: "🌱", key: "nature" },
    { label: "Content Creation", icon: "📹", key: "content" }, 
    { label: "Artificial Intelligence & Data Science", icon: "🤖", key: "Ai" },
    { label: "Government Service Motivation", icon: "🇮🇳", key: "government" },
    { label: "Sports & Fitness", icon: "🏅", key: "sports" },
    { label: "Travel & Exploration", icon: "✈️", key: "travel" },
  ];

  const firstHalfQuestions = questions.slice(0, 9);
  const secondHalfQuestions = questions.slice(9);

  const [scores, setScores] = useState({
    creativity: 7,
    logic: 7,
    helping: 7,
    technology: 7,
    nature: 7,
    leadership: 7,
    communication: 7,
    building: 7,
    medical: 7,
    finance: 7,
    administration: 7,
    teaching: 7,
    content: 7,
    government: 7,
    sports: 7,
    travel: 7,
    Ai: 7,
    Avation: 7,
  });

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [selectedCareers, setSelectedCareers] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [videoModal, setVideoModal] = useState({ isOpen: false, career: null, currentVideoIndex: 0 });
  const [profileInfo, setProfileInfo] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyEntries, setHistoryEntries] = useState([]);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const recommendationsRef = useRef(null);
  const resourcesRef = useRef(null);

  const totalQuestions = questions.length;

  useEffect(() => {
    if (quizCompleted && !showRecommendations && recommendationsRef.current) {
      recommendationsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (showRecommendations && resourcesRef.current) {
      resourcesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [quizCompleted, showRecommendations]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedHistory = localStorage.getItem('sahichayan_history');
    if (storedHistory) {
      try {
        setHistoryEntries(dedupeHistoryEntries(JSON.parse(storedHistory)));
      } catch {
        setHistoryEntries([]);
      }
    }
    if (!token) return;
    axios
      .get(apiUrl('/api/auth/me'), { headers: { Authorization: token } })
      .then((res) => setProfileInfo(res.data))
      .catch(() => setProfileInfo(null));
  }, []);

  const dedupeHistoryEntries = (entries) => {
    const seen = new Set();
    return entries.filter((entry) => {
      const key = `${entry.careerName}|${entry.resourceType}|${entry.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const saveHistoryEntry = (careerName, resourceType, url) => {
    const newEntry = {
      careerName,
      resourceType,
      url,
      visitedAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('sahichayan_history') || '[]');
    const filtered = existing.filter((entry) => !(entry.careerName === careerName && entry.resourceType === resourceType && entry.url === url));
    const next = dedupeHistoryEntries([newEntry, ...filtered]).slice(0, 15);
    localStorage.setItem('sahichayan_history', JSON.stringify(next));
    setHistoryEntries(next);
  };

  const clearHistory = () => {
    localStorage.removeItem('sahichayan_history');
    setHistoryEntries([]);
  };
  const answeredQuestions = questions.filter(q => typeof scores[q.key] === 'number').length;
  const quizProgress = Math.round((answeredQuestions / totalQuestions) * 100);
  const averageScore = Math.round(
    Object.values(scores).reduce((sum, value) => sum + value, 0) / totalQuestions
  );
  const topInterestKey = Object.keys(scores).reduce(
    (bestKey, key) => (scores[key] > scores[bestKey] ? key : bestKey),
    questions[0].key
  );
  const topInterest = questions.find((q) => q.key === topInterestKey)?.label || 'Balanced Interests';

  const handleScoreChange = (key, value) => {
    setScores(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const calculateRecommendations = () => {
    const recommendations = careers.map(career => {
      let score = 0;
      let totalWeight = 0;
      Object.keys(career.weights).forEach(weightKey => {
        if (scores[weightKey] !== undefined) {
          score += scores[weightKey] * career.weights[weightKey];
          totalWeight += career.weights[weightKey];
        }
      });
      const averageScore = totalWeight > 0 ? score / totalWeight : 0;
      return { ...career, matchScore: averageScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10); // Keep only the top 10 recommendations

    setRecommendedCareers(recommendations);
    setSelectedCareers([]);
    setShowRecommendations(false);
    setQuizCompleted(true);
  };

  const toggleCareerSelection = (careerName) => {
    setSelectedCareers(prev =>
      prev.includes(careerName)
        ? prev.filter(name => name !== careerName)
        : [...prev, careerName]
    );
  };

  const handleCareerCardToggle = (careerName) => {
    toggleCareerSelection(careerName);
  };

  const confirmSelections = () => {
    const orderedSelected = [...selectedCareers].sort((a, b) => {
      const aIndex = recommendedCareers.findIndex(career => career.name === a);
      const bIndex = recommendedCareers.findIndex(career => career.name === b);
      const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      return safeA - safeB;
    });
    setSelectedCareers(orderedSelected);
    setShowRecommendations(true);
    orderedSelected.forEach((careerName) => {
      saveHistoryEntry(careerName, 'Career Selected', window.location.href + '#resources');
    });
  };

  const sortedSelectedCareers = selectedCareers.slice().sort((a, b) => {
    const aIndex = recommendedCareers.findIndex(career => career.name === a);
    const bIndex = recommendedCareers.findIndex(career => career.name === b);
    const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
    return safeA - safeB;
  });

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const parsedUrl = new URL(url);
      let videoId = null;

      if (parsedUrl.hostname.includes('youtu.be')) {
        videoId = parsedUrl.pathname.slice(1).split('?')[0];
      } else if (parsedUrl.searchParams.has('v')) {
        videoId = parsedUrl.searchParams.get('v');
      } else if (parsedUrl.pathname.includes('/shorts/')) {
        videoId = parsedUrl.pathname.split('/shorts/')[1].split('?')[0];
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      return null;
    }
  };

  const getThumbnailUrl = (embedUrl) => {
    if (!embedUrl) return null;
    try {
      const videoId = embedUrl.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } catch {
      return null;
    }
  };

  const openVideoModal = (career, videoIndex) => {
    setVideoModal({ isOpen: true, career, currentVideoIndex: videoIndex });
    const resourceType = videoIndex === 0 ? 'Video Learning' : videoIndex === 1 ? 'Course Path' : 'Study Guide';
    const resourceLink = career.resources[videoIndex];
    saveHistoryEntry(career.name, resourceType, resourceLink);
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, career: null, currentVideoIndex: 0 });
  };

  const navigateVideo = (direction) => {
    if (!videoModal.career) return;
    const totalVideos = videoModal.career.resources.length;
    let newIndex = videoModal.currentVideoIndex + direction;
    if (newIndex < 0) newIndex = totalVideos - 1;
    if (newIndex >= totalVideos) newIndex = 0;
    setVideoModal(prev => ({ ...prev, currentVideoIndex: newIndex }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      {/* Navbar */}
      <nav className="w-full px-8 py-5 flex items-center justify-between border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-black/20">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            SahiChayan.Com
          </h1>
          <p className="text-sm text-slate-400">
            Career Path Finder for Inclusive Growth
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setHistoryOpen((prev) => !prev)}
            className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm hover:bg-white/15 transition-all duration-300"
          >
            History
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdown((prev) => !prev)}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 hover:bg-slate-900/90 transition-all duration-300"
            >
              <img
                src={profileInfo?.avatarUrl || 'https://www.gravatar.com/avatar/?d=mp&s=80'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-white/10"
              />
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-white">{profileInfo?.name || 'Guest'}</p>
                <p className="text-xs text-slate-400">Profile</p>
              </div>
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40">
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Logged in as</p>
                  <p className="font-semibold text-white truncate">{profileInfo?.email || 'guest@example.com'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="w-full rounded-2xl bg-cyan-500/15 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/25 transition-all duration-300"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/');
                  }}
                  className="mt-3 w-full rounded-2xl bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {historyOpen && (
        <div className="fixed top-24 right-8 z-50 w-[360px] rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Course History</h3>
              <p className="text-slate-400 text-sm">Recent visited courses and resources.</p>
            </div>
            <button
              type="button"
              onClick={() => setHistoryOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          {historyEntries.length === 0 ? (
            <p className="text-slate-500 text-sm">No history yet. Start exploring courses to build history.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {historyEntries.map((entry, index) => (
                <div key={`${entry.careerName}-${index}`} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{entry.careerName}</p>
                  <p className="text-xs text-slate-400">{entry.resourceType}</p>
                  <p className="text-xs text-slate-400">{new Date(entry.visitedAt).toLocaleString()}</p>
                  <button
                    type="button"
                    onClick={() => window.open(entry.url, '_blank')}
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-2 text-xs text-cyan-200 hover:bg-cyan-500/25 transition-all duration-300"
                  >
                    Open Resource
                  </button>
                </div>
              ))}
            </div>
          )}
          {historyEntries.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="mt-4 w-full rounded-2xl bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-all duration-300"
            >
              Clear history
            </button>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-6 animate-pulse">
              ✨ Career Discovery Platform
            </div>

            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Discover Your
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Future Career
              </span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Helping students from every background explore modern, high-growth careers beyond traditional paths.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 font-semibold shadow-xl shadow-cyan-500/30">
                Start Quiz
              </button>

              <button className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold backdrop-blur-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Floating Career Cards */}
          <div className="relative h-[450px] hidden md:block">
            <div className="absolute top-0 left-10 w-64 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl animate-bounce">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-bold text-xl mb-2">UI/UX Designer</h3>
              <p className="text-slate-400 text-sm">Creative + Tech + Human Psychology</p>
            </div>

            <div className="absolute bottom-10 right-0 w-64 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl animate-pulse">
              <div className="text-4xl mb-3">🚁</div>
              <h3 className="font-bold text-xl mb-2">Drone Pilot</h3>
              <p className="text-slate-400 text-sm">Technology + Field Operations</p>
            </div>

            <div className="absolute top-44 right-20 w-64 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl animate-[spin_12s_linear_infinite]">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-bold text-xl mb-2">Agri-Tech Expert</h3>
              <p className="text-slate-400 text-sm">Farming + Innovation + Sustainability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 relative z-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 border-b border-white/10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-4xl font-black mb-3">
                  Discover Your Best Career Fit
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl">
                  Rate your interests from 0 to 10 and uncover career options that suit your strengths.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            <div className="grid gap-8 lg:grid-cols-2 items-stretch">
              <div className="space-y-6 h-full">
                <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                  <h3 className="text-2xl font-bold text-cyan-200">Section 1</h3>
                  <p className="text-slate-400 text-sm">Core Interest Area.</p>
                </div>
                {firstHalfQuestions.map((q, index) => (
                  <div
                    key={index}
                    className="group transition-all duration-300 hover:scale-[1.02] rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-2xl group-hover:rotate-6 transition-all duration-300">
                          {q.icon}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">
                            {q.label}
                          </h3>
                          <p className="text-slate-400 text-sm">
                            Rate how much you enjoy this area
                          </p>
                        </div>
                      </div>

                      <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-bold">
                        {scores[q.key]}/10
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={scores[q.key]}
                      onChange={(e) => handleScoreChange(q.key, e.target.value)}
                      className="w-full h-3 rounded-full appearance-none bg-gradient-to-r from-cyan-500 to-purple-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-6 h-full">
                <div className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-5">
                  <h3 className="text-2xl font-bold text-purple-200">Section 2</h3>
                  <p className="text-slate-400 text-sm">Industry Specific Interests.</p>
                </div>
                {secondHalfQuestions.map((q, index) => (
                  <div
                    key={index}
                    className="group transition-all duration-300 hover:scale-[1.02] rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-2xl group-hover:rotate-6 transition-all duration-300">
                          {q.icon}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">
                            {q.label}
                          </h3>
                          <p className="text-slate-400 text-sm">
                            Rate how much you enjoy this area
                          </p>
                        </div>
                      </div>

                      <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-bold">
                        {scores[q.key]}/10
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={scores[q.key]}
                      onChange={(e) => handleScoreChange(q.key, e.target.value)}
                      className="w-full h-3 rounded-full appearance-none bg-gradient-to-r from-cyan-500 to-purple-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight Box */}
            <div className="mt-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30">
                  🤖
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    Career Matching
                  </h3>
                  <p className="text-slate-300">
                    Your interests will be matched with modern high-growth careers.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-3">📈</div>
                  <h4 className="font-bold mb-1">Growth Careers</h4>
                  <p className="text-sm text-slate-400">
                    Discover future-ready opportunities.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="font-bold mb-1">Smart Matching</h4>
                  <p className="text-sm text-slate-400">
                    Personalized recommendations based on interests.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-3">📚</div>
                  <h4 className="font-bold mb-1">Free Learning</h4>
                  <p className="text-sm text-slate-400">
                    Roadmaps with YouTube and online resources.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Ready to discover your future?
                </h3>
                <p className="text-slate-400">
                  Get personalized career recommendations instantly.
                </p>
              </div>

              <button
                onClick={calculateRecommendations}
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-2xl shadow-purple-500/30 animate-pulse"
              >
                Find My Path →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      {quizCompleted && !showRecommendations && (
        <section ref={recommendationsRef} id="recommendations" className="max-w-5xl mx-auto px-6 pb-24 relative z-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-4xl font-black mb-6 text-center">
                Your Career Recommendations
              </h2>
              <p className="text-slate-400 text-lg text-center mb-8">
                Based on your interests, here are the top careers that match you. Select the ones you're interested in to see detailed learning resources.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recommendedCareers.map((career, index) => (
                  <div
                    key={career.name}
                    className={`group rounded-2xl border p-6 cursor-pointer transition-all duration-300 shadow-lg shadow-transparent hover:shadow-cyan-500/20 hover:scale-[1.03] hover:-translate-y-1 ${
                      selectedCareers.includes(career.name)
                        ? 'border-cyan-400 bg-cyan-500/15'
                        : 'border-white/10 bg-gradient-to-br from-slate-900/80 via-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:via-purple-500/15 hover:to-pink-500/15'
                    }`}
                    onClick={() => handleCareerCardToggle(career.name)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{career.name}</h3>
                      <input
                        type="checkbox"
                        checked={selectedCareers.includes(career.name)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCareerCardToggle(career.name);
                        }}
                        className="w-5 h-5 text-cyan-500 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                      />
                    </div>
                    <p className="text-slate-400 text-sm mb-4">
                      Match Score: {career.matchScore.toFixed(1)}/10
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Skills:</h4>
                      <div className="flex flex-wrap gap-1">
                        {career.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={confirmSelections}
                  disabled={selectedCareers.length === 0}
                  className={`px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
                    selectedCareers.length > 0
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-105 shadow-purple-500/30 animate-pulse'
                      : 'bg-gray-500 cursor-not-allowed'
                  }`}
                >
                  Show Learning Resources →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Recommendations Section */}
      {showRecommendations && (
        <section ref={resourcesRef} id="resources" className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
          <h2 className="text-4xl font-black mb-12 text-center">
            Your Learning Journey
          </h2>

          {sortedSelectedCareers.map((careerName) => {
            const career = careers.find(c => c.name === careerName);
            if (!career) return null;

            return (
              <div key={career.name} className="mb-16">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden mb-8">
                  <div className="p-8 md:p-12">
                    <h3 className="text-3xl font-black mb-6">{career.name}</h3>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4 rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-6 shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:bg-emerald-500/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/20 text-2xl text-emerald-200">
                            🌿
                          </div>
                          <h4 className="text-xl font-bold text-emerald-100">Key Skills</h4>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {career.skills.map((skill, i) => (
                            <span key={i} className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-100 shadow-sm shadow-emerald-500/10 transition-colors duration-300 hover:bg-emerald-400/15">
                              <span className="text-emerald-200">✓</span>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 rounded-3xl border border-orange-400/20 bg-orange-500/5 p-6 shadow-lg shadow-orange-500/10 transition-all duration-300 hover:bg-orange-500/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-orange-500/20 text-2xl text-orange-200">
                            🚀
                          </div>
                          <h4 className="text-xl font-bold text-orange-100">Career Roadmap</h4>
                        </div>
                        <ol className="list-decimal list-inside space-y-3 text-orange-100">
                          {career.roadmap.map((step, i) => (
                            <li key={i} className="rounded-2xl border border-orange-300/20 bg-orange-500/10 px-4 py-3 text-sm leading-6 shadow-sm shadow-orange-500/5">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {career.resources.map((resource, i) => {
                    const embedUrl = getYouTubeEmbedUrl(resource);
                    const thumbnailUrl = embedUrl ? getThumbnailUrl(embedUrl) : null;
                    const resourceType = i === 0 ? 'Video Learning' : i === 1 ? 'Course Path' : 'Study Guide';
                    const resourceIcon = i === 0 ? '▶️' : i === 1 ? '🏆' : '📚';
                    const actionText = i === 0 ? 'Watch Video Lesson' : i === 1 ? 'Open Course Path' : 'Open Study Guide';

                    return (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-500/10 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-gradient-to-br hover:from-slate-900/80 hover:via-cyan-950/70 hover:to-purple-950/80"
                      >
                        <div className="pointer-events-none absolute -right-8 -top-10 text-[7rem] text-white/5 rotate-[25deg]">
                          📚
                        </div>
                        <div className="relative z-10 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-500 text-2xl shadow-lg shadow-cyan-500/20">
                              {resourceIcon}
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">{resourceType}</p>
                              <h4 className="text-xl font-black text-white">Learning Resource {i + 1}</h4>
                            </div>
                          </div>

                          {embedUrl ? (
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
                              <img
                                src={thumbnailUrl}
                                alt={`YouTube video thumbnail for ${career.name}`}
                                className="w-full h-44 object-cover transition-all duration-300 group-hover:scale-105"
                                onClick={() => openVideoModal(career, i)}
                                onError={(e) => {
                                  if (e.target.src.includes('maxresdefault')) {
                                    e.target.src = `https://img.youtube.com/vi/${embedUrl.split('/').pop()}/hqdefault.jpg`;
                                  } else if (e.target.src.includes('hqdefault')) {
                                    e.target.src = `https://img.youtube.com/vi/${embedUrl.split('/').pop()}/sddefault.jpg`;
                                  } else {
                                    e.target.style.display = 'none';
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => openVideoModal(career, i)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 text-white opacity-0 transition-opacity duration-300 hover:opacity-100"
                              >
                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/90 text-3xl shadow-xl shadow-cyan-500/40">▶</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex h-44 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-purple-500/10 text-5xl text-white/10">
                              📚
                            </div>
                          )}

                          <p className="text-slate-300 text-sm leading-6">
                            {i === 0
                              ? 'A focused video tutorial to help you understand the career path and skills required.'
                              : i === 1
                              ? 'A curated online course path that helps you build expertise step by step.'
                              : 'A practical study guide and reference material to reinforce learning.'}
                          </p>

                          <button
                            onClick={() => {
                              const resourceLink = career.resources[i];
                              saveHistoryEntry(career.name, resourceType, resourceLink);
                              window.open(resourceLink, '_blank');
                            }}
                            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
                          >
                            <span>{actionText}</span>
                            <span className="text-lg">→</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Video Modal */}
      {videoModal.isOpen && videoModal.career && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl z-10 transition-all duration-300"
            >
              ✕
            </button>

            {/* Video Title */}
            <div className="p-6 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white">
                {videoModal.career.name} - Learning Resource {videoModal.currentVideoIndex + 1}
              </h3>
              <p className="text-slate-400 mt-1">
                Video {videoModal.currentVideoIndex + 1} of {videoModal.career.resources.length}
              </p>
            </div>

            {/* Video Player */}
            <div className="relative">
              {(() => {
                const currentResource = videoModal.career.resources[videoModal.currentVideoIndex];
                const embedUrl = getYouTubeEmbedUrl(currentResource);
                return embedUrl ? (
                  <div className="aspect-video relative bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`${embedUrl}?autoplay=1`}
                      title={`YouTube video for ${videoModal.career.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      onError={() => {
                        console.error('Video could not be loaded');
                      }}
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">📚</span>
                      <p className="text-white text-xl">Learning Resource</p>
                      <p className="text-slate-400 text-sm mt-2 mb-4">This resource is hosted on an external platform</p>
                      <a
                        href={currentResource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline mt-2 inline-block px-4 py-2 bg-cyan-500/20 rounded-lg text-sm font-medium"
                      >
                        Open Learning Resource →
                      </a>
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Arrows */}
              {videoModal.career.resources.length > 1 && (
                <>
                  <button
                    onClick={() => navigateVideo(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 shadow-lg"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => navigateVideo(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 shadow-lg"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Video Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {videoModal.career.resources.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setVideoModal(prev => ({ ...prev, currentVideoIndex: index }))}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === videoModal.currentVideoIndex
                        ? 'bg-cyan-500 scale-125'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Resource Info */}
            <div className="p-6 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm">
                    {videoModal.career.resources[videoModal.currentVideoIndex]?.includes('youtube.com') || videoModal.career.resources[videoModal.currentVideoIndex]?.includes('youtu.be') ? 'YouTube Video' :
                     videoModal.career.resources[videoModal.currentVideoIndex]?.includes('coursera.org') ? 'Coursera Course' :
                     videoModal.career.resources[videoModal.currentVideoIndex]?.includes('freecodecamp.org') ? 'FreeCodeCamp' :
                     videoModal.career.resources[videoModal.currentVideoIndex]?.includes('edx.org') ? 'edX Course' :
                     videoModal.career.resources[videoModal.currentVideoIndex]?.includes('kaggle.com') ? 'Kaggle Learning' :
                     'Learning Resource'}
                  </p>
                </div>
                <a
                  href={videoModal.career.resources[videoModal.currentVideoIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-sm transition-all duration-300"
                >
                  Open Externally →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950/95 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">SahiChayan.Com</h3>
            <p className="text-slate-400 text-sm leading-7">
              A career guidance platform built for students exploring modern opportunities and inclusive growth.
            </p>
            <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Built for learners in India and beyond</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-red-400/20 bg-red-500/10 p-6 shadow-lg shadow-red-500/10 transition-all duration-300 hover:bg-red-500/15">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-linear-to-r from-red-400/50 via-transparent to-transparent wave-animation opacity-75"></div>
            <h4 className="text-xl font-semibold text-red-100">Quick Links</h4>
            <ul className="space-y-3 text-red-200 text-sm">
              <li><a href="#quiz" className="hover:text-white transition-colors">Quiz</a></li>
              <li><a href="#recommendations" className="hover:text-white transition-colors">Recommendations</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Learning Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Tips</a></li>
            </ul>
          </div>

         <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(255,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_8px_40px_rgba(255,0,0,0.22)] group">

  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-pink-500/10 opacity-70"></div>

  {/* Top Glow */}
  <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl"></div>

  {/* Bottom Animated Line */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-red-400 via-pink-400 to-transparent opacity-80 group-hover:animate-pulse"></div>

  {/* Content */}
  <div className="relative z-10">

    {/* Header */}
    <div className="mb-5 flex items-center gap-4">

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl backdrop-blur-xl shadow-lg">
        📞
      </div>

      <div>
        <h4 className="text-2xl font-black text-white">
          Contact & Support
        </h4>

        <p className="text-sm text-red-200/80">
          Need help? Reach out anytime.
        </p>
      </div>

    </div>

    {/* Contact Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Email */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">

        <div className="mb-2 flex items-center gap-2">

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/20 text-lg">
            ✉️
          </span>

          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-100">
            Email
          </h2>

        </div>

        <p className="text-white text-sm break-all">
          support@sahichayan.com
        </p>

      </div>

      {/* Phone */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">

        <div className="mb-2 flex items-center gap-2">

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/20 text-lg">
            📞
          </span>

          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-100">
            Phone
          </h2>

        </div>

        <p className="text-white text-sm">
          +91 94110 68398
        </p>

      </div>

    </div>

  </div>

</div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Stay Updated</h4>
            <p className="text-slate-400 text-sm leading-7">
              Subscribe for free career guides and new learning bundles.
            </p>
            <button className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white hover:scale-[1.02] transition-all duration-300">
              Subscribe Now
            </button>
          </div>
        </div>

       <div className="border-t border-white/10 py-6 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-4">

  {/* Left Side */}
  <div>
    © 2026 SahiChayan.com. All rights reserved.
  </div>
   <div className="text-center max-w-md text-slate-400">
    Developed By Shrinivas Sharma With ❤️.
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-6">
    <span className="hover:text-cyan-400 transition cursor-pointer">
      Privacy Policy
    </span>

    <span className="hover:text-cyan-400 transition cursor-pointer">
      Terms
    </span>

    <span className="hover:text-cyan-400 transition cursor-pointer">
      Contact
    </span>
  </div>

</div>
      </footer>
    </div>
  );
}
