import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';
import { careersData } from '../data/careersData';

const AssessmentContext = createContext();

/**
 * Merges a lightweight or DB-fetched career summary with the full catalog record
 * so roadmap milestones, courses, knowledge links, and salaries are always populated.
 */
function hydrateCareer(career) {
  if (!career || typeof career !== 'object') return career;
  const careerId = (career.id || career.career_id || '').toString().trim();
  const careerName = (career.name || career.career_name || '').toLowerCase().trim();
  
  const catalogMatch = careersData.find(
    (c) =>
      c.id === careerId ||
      c.id.toLowerCase() === careerId.toLowerCase() ||
      c.id.toLowerCase() === careerId.toLowerCase().replace(/-/g, '_') ||
      c.id.toLowerCase().replace(/_/g, '-') === careerId.toLowerCase() ||
      (careerName && c.name.toLowerCase() === careerName)
  );

  if (!catalogMatch) return career;

  return {
    ...catalogMatch,
    ...career,
    id: catalogMatch.id, // ALWAYS canonicalize so /career/:id routing never fails
    career_id: catalogMatch.id,
    name: catalogMatch.name,
    category: catalogMatch.category,
    skills: Array.isArray(career.skills) && career.skills.length >= catalogMatch.skills.length
      ? career.skills
      : catalogMatch.skills,
    roadmap: Array.isArray(catalogMatch.roadmap) && catalogMatch.roadmap.length > 0 ? catalogMatch.roadmap : career.roadmap,
    courses: Array.isArray(catalogMatch.courses) && catalogMatch.courses.length > 0 ? catalogMatch.courses : career.courses,
    knowledge: Array.isArray(catalogMatch.knowledge) && catalogMatch.knowledge.length > 0 ? catalogMatch.knowledge : career.knowledge,
    editorial: catalogMatch.editorial || career.editorial,
    degreePath: catalogMatch.degreePath || career.degreePath,
    workStyle: catalogMatch.workStyle || career.workStyle,
    topEmployers: Array.isArray(catalogMatch.topEmployers) && catalogMatch.topEmployers.length > 0 ? catalogMatch.topEmployers : career.topEmployers,
    featuredVideos: Array.isArray(catalogMatch.featuredVideos) && catalogMatch.featuredVideos.length > 0 ? catalogMatch.featuredVideos : career.featuredVideos,
    youtubeSearchQuery: catalogMatch.youtubeSearchQuery || career.youtubeSearchQuery,
    averageSalaryUsd: catalogMatch.averageSalaryUsd || career.averageSalaryUsd,
    averageSalaryInr: catalogMatch.averageSalaryInr || career.averageSalaryInr,
    growthRate: catalogMatch.growthRate || career.growthRate,
    matchScore: career.matchScore !== undefined ? career.matchScore : (career.match_score !== undefined ? career.match_score : 85),
  };
}

const initialScores = {
  creativity: 7,
  logic: 8,
  helping: 7,
  technology: 9,
  Avation: 6,
  teaching: 6,
  leadership: 7,
  communication: 7,
  building: 7,
  medical: 5,
  finance: 6,
  administration: 6,
  nature: 6,
  content: 7,
  Ai: 8,
  government: 5,
  sports: 6,
  travel: 7,
};

export function AssessmentProvider({ children }) {
  const { user } = useAuth();

  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem('clearpath_scores') || localStorage.getItem('sahichayan_scores');
      return saved ? JSON.parse(saved) : initialScores;
    } catch {
      return initialScores;
    }
  });

  const [assessmentResult, setAssessmentResult] = useState(() => {
    try {
      const saved = localStorage.getItem('clearpath_results') || localStorage.getItem('sahichayan_results');
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && typeof parsed === 'object') {
        const rawTop = Array.isArray(parsed.topCareers) ? parsed.topCareers : (Array.isArray(parsed.top_careers) ? parsed.top_careers : []);
        return {
          ...parsed,
          topCareers: rawTop.map(hydrateCareer),
        };
      }
      return null;
    } catch {
      return null;
    }
  });

  const [savedCareers, setSavedCareers] = useState(() => {
    try {
      const saved = localStorage.getItem('clearpath_saved_careers') || localStorage.getItem('sahichayan_saved_careers');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter(c => c && typeof c === 'object') : [];
    } catch {
      return [];
    }
  });

  const [activeVideoModal, setActiveVideoModal] = useState({ isOpen: false, video: null });
  const [activeRoadmapModal, setActiveRoadmapModal] = useState({ isOpen: false, career: null });
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);
  const [mentorCareerContext, setMentorCareerContext] = useState(null);

  // Sync to local storage safely
  useEffect(() => {
    try {
      localStorage.setItem('clearpath_scores', JSON.stringify(scores));
    } catch {}
  }, [scores]);

  useEffect(() => {
    if (assessmentResult) {
      try {
        localStorage.setItem('clearpath_results', JSON.stringify(assessmentResult));
      } catch {}
    }
  }, [assessmentResult]);

  useEffect(() => {
    try {
      const safe = Array.isArray(savedCareers) ? savedCareers.filter(c => c && typeof c === 'object') : [];
      localStorage.setItem('clearpath_saved_careers', JSON.stringify(safe));
    } catch {}
  }, [savedCareers]);

  // ============================================================================
  // CROSS-DEVICE CLOUD SYNCHRONIZATION EFFECT
  // Fetches the user's bookmarks & latest assessment from Supabase/Render on login
  // ============================================================================
  useEffect(() => {
    if (!user || !user.id) {
      return;
    }

    let isMounted = true;

    async function syncCloudData() {
      try {
        // 1. Fetch saved careers from database
        const savedRes = await api.getSavedCareers(user.id);
        if (isMounted && savedRes?.success && Array.isArray(savedRes.data)) {
          if (savedRes.data.length > 0) {
            const normalized = savedRes.data
              .filter(item => item && typeof item === 'object')
              .map((item) => ({
                id: item.career_id || item.id,
                career_id: item.career_id || item.id,
                name: item.career_name || item.name,
                career_name: item.career_name || item.name,
                category: item.category || 'General',
                averageSalaryInr: item.average_salary_inr || item.averageSalaryInr || 'Competitive',
                growthRate: item.growth_rate || item.growthRate || 'High Demand',
                matchScore: item.match_score || item.matchScore || 0,
                status: item.status || 'Exploring',
                savedAt: item.saved_at || item.savedAt || new Date().toISOString(),
              }));

            // Merge cloud data with any local bookmarks so nothing is ever lost on refresh
            setSavedCareers((prev) => {
              const map = new Map();
              normalized.forEach((c) => {
                if (c && (c.id || c.career_id)) map.set(c.id || c.career_id, c);
              });
              (Array.isArray(prev) ? prev : []).forEach((c) => {
                if (c && (c.id || c.career_id)) {
                  const key = c.id || c.career_id;
                  if (!map.has(key)) map.set(key, c);
                }
              });
              const merged = Array.from(map.values());
              try {
                localStorage.setItem('clearpath_saved_careers', JSON.stringify(merged));
              } catch {}
              return merged;
            });
          } else {
            // Cloud has 0 items; if user has existing local bookmarks, push them up to cloud!
            const localSaved = (() => {
              try {
                const parsed = JSON.parse(localStorage.getItem('clearpath_saved_careers') || localStorage.getItem('sahichayan_saved_careers'));
                return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
              } catch {
                return [];
              }
            })();

            if (localSaved.length > 0) {
              localSaved.forEach((c) => {
                if (c && (c.id || c.career_id)) {
                  api.toggleSaveCareer({
                    userId: user.id,
                    careerId: c.id || c.career_id,
                    careerName: c.name || c.career_name,
                    category: c.category,
                    matchScore: c.matchScore || 0,
                  }).catch(() => {});
                }
              });
            }
          }
        }

        // 2. Fetch latest assessment from database
        const assessRes = await api.getUserAssessments(user.id);
        if (isMounted && assessRes?.success && Array.isArray(assessRes.data) && assessRes.data.length > 0) {
          const latest = assessRes.data[0];
          let rawTop = latest.top_careers || latest.topCareers || [];
          if (typeof rawTop === 'string') {
            try { rawTop = JSON.parse(rawTop); } catch { rawTop = []; }
          }
          if (!Array.isArray(rawTop)) rawTop = [];

          const normalizedResult = {
            topCareers: rawTop.map(hydrateCareer),
            dominantTrait: latest.dominant_trait || latest.dominantTrait || 'Balanced',
            averageScore: latest.average_score || latest.averageScore || 5,
            completedAt: latest.completed_at || latest.completedAt || new Date().toISOString(),
          };

          setAssessmentResult(normalizedResult);
          try {
            localStorage.setItem('clearpath_results', JSON.stringify(normalizedResult));
          } catch {}

          if (latest.trait_scores) {
            let traitScores = latest.trait_scores;
            if (typeof traitScores === 'string') {
              try { traitScores = JSON.parse(traitScores); } catch { traitScores = null; }
            }
            if (traitScores && typeof traitScores === 'object') {
              setScores(traitScores);
              try {
                localStorage.setItem('clearpath_scores', JSON.stringify(traitScores));
              } catch {}
            }
          }
        }
      } catch (err) {
        console.warn('Cross-device cloud synchronization notice:', err.message);
      }
    }

    syncCloudData();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const updateScore = (key, value) => {
    setScores((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const applyArchetype = (presetScores) => {
    setScores((prev) => ({ ...prev, ...presetScores }));
  };

  const runAssessment = async () => {
    const res = await api.calculateAssessment(scores, user?.id);
    if (res.success && res.data) {
      const rawTop = Array.isArray(res.data.topCareers) ? res.data.topCareers : (Array.isArray(res.data.top_careers) ? res.data.top_careers : []);
      const hydratedResult = {
        ...res.data,
        topCareers: rawTop.map(hydrateCareer),
      };
      setAssessmentResult(hydratedResult);
      return hydratedResult;
    }
    return null;
  };

  const toggleSaveCareer = async (career) => {
    if (!career) return;
    const careerKey = career.id || career.career_id;
    if (!careerKey) return;

    const list = Array.isArray(savedCareers) ? savedCareers.filter(c => c && typeof c === 'object') : [];
    const exists = list.some((c) => (c.id || c.career_id) === careerKey);

    let next;
    if (exists) {
      next = list.filter((c) => (c.id || c.career_id) !== careerKey);
    } else {
      next = [
        {
          id: careerKey,
          career_id: careerKey,
          name: career.name || career.career_name,
          category: career.category || 'General',
          averageSalaryInr: career.averageSalaryInr || career.average_salary_inr || 'Competitive',
          growthRate: career.growthRate || career.growth_rate || 'High Demand',
          savedAt: new Date().toISOString(),
          status: 'Exploring',
        },
        ...list,
      ];
    }
    setSavedCareers(next);
    try {
      localStorage.setItem('clearpath_saved_careers', JSON.stringify(next));
    } catch {}

    // Sync to cloud database if user is authenticated
    if (user && user.id) {
      try {
        await api.toggleSaveCareer({
          userId: user.id,
          careerId: careerKey,
          careerName: career.name || career.career_name,
          category: career.category,
          matchScore: career.matchScore || career.match_score || 0,
        });
      } catch (err) {
        console.warn('Could not persist bookmark to cloud:', err.message);
      }
    }
  };

  const isCareerSaved = (careerId) => {
    if (!careerId || !Array.isArray(savedCareers)) return false;
    return savedCareers.some((c) => c && (c.id === careerId || c.career_id === careerId));
  };

  // Open the unified 3-tier in-app resource hub
  const openInAppVideo = (
    title,
    embedId = null,
    url = null,
    provider = 'YouTube',
    query = null,
    careerData = null,
    defaultTab = 'youtube'
  ) => {
    const hydratedCareer = hydrateCareer(careerData);
    setActiveVideoModal({
      isOpen: true,
      video: {
        title,
        embedId,
        url,
        provider,
        query: query || (hydratedCareer ? hydratedCareer.youtubeSearchQuery : `${title} complete course roadmap tutorial`),
        careerData: hydratedCareer,
        defaultTab,
      },
    });
  };

  const closeInAppVideo = () => {
    setActiveVideoModal({ isOpen: false, video: null });
  };

  const openInAppRoadmap = (career) => {
    setActiveRoadmapModal({ isOpen: true, career: hydrateCareer(career) });
  };

  const closeInAppRoadmap = () => {
    setActiveRoadmapModal({ isOpen: false, career: null });
  };

  const openAiMentor = (career = null) => {
    setMentorCareerContext(career);
    setIsAiMentorOpen(true);
  };

  const closeAiMentor = () => {
    setIsAiMentorOpen(false);
    setMentorCareerContext(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        scores,
        updateScore,
        applyArchetype,
        runAssessment,
        assessmentResult,
        savedCareers,
        toggleSaveCareer,
        isCareerSaved,
        activeVideoModal,
        openInAppVideo,
        closeInAppVideo,
        activeRoadmapModal,
        openInAppRoadmap,
        closeInAppRoadmap,
        isAiMentorOpen,
        openAiMentor,
        closeAiMentor,
        mentorCareerContext,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export const useAssessment = () => useContext(AssessmentContext);
