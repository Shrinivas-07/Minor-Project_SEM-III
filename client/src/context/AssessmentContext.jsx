import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

const AssessmentContext = createContext();

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
    const saved = localStorage.getItem('sahichayan_scores');
    return saved ? JSON.parse(saved) : initialScores;
  });

  const [assessmentResult, setAssessmentResult] = useState(() => {
    const saved = localStorage.getItem('sahichayan_results');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedCareers, setSavedCareers] = useState(() => {
    const saved = localStorage.getItem('sahichayan_saved_careers');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeVideoModal, setActiveVideoModal] = useState({ isOpen: false, video: null });
  const [activeRoadmapModal, setActiveRoadmapModal] = useState({ isOpen: false, career: null });
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);
  const [mentorCareerContext, setMentorCareerContext] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sahichayan_scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    if (assessmentResult) {
      localStorage.setItem('sahichayan_results', JSON.stringify(assessmentResult));
    }
  }, [assessmentResult]);

  useEffect(() => {
    localStorage.setItem('sahichayan_saved_careers', JSON.stringify(savedCareers));
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
            const normalized = savedRes.data.map((item) => ({
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
              normalized.forEach((c) => map.set(c.id, c));
              prev.forEach((c) => {
                const key = c.id || c.career_id;
                if (!map.has(key)) map.set(key, c);
              });
              const merged = Array.from(map.values());
              localStorage.setItem('sahichayan_saved_careers', JSON.stringify(merged));
              return merged;
            });
          } else {
            // Cloud has 0 items; if user has existing local bookmarks, push them up to cloud!
            const localSaved = (() => {
              try {
                return JSON.parse(localStorage.getItem('sahichayan_saved_careers')) || [];
              } catch {
                return [];
              }
            })();

            if (localSaved.length > 0) {
              localSaved.forEach((c) => {
                api.toggleSaveCareer({
                  userId: user.id,
                  careerId: c.id || c.career_id,
                  careerName: c.name || c.career_name,
                  category: c.category,
                  matchScore: c.matchScore || 0,
                }).catch(() => {});
              });
            }
          }
        }

        // 2. Fetch latest assessment from database
        const assessRes = await api.getUserAssessments(user.id);
        if (isMounted && assessRes?.success && Array.isArray(assessRes.data) && assessRes.data.length > 0) {
          const latest = assessRes.data[0];
          const normalizedResult = {
            topCareers: latest.top_careers || latest.topCareers || [],
            dominantTrait: latest.dominant_trait || latest.dominantTrait || 'Balanced',
            averageScore: latest.average_score || latest.averageScore || 5,
            completedAt: latest.completed_at || latest.completedAt || new Date().toISOString(),
          };

          setAssessmentResult(normalizedResult);
          localStorage.setItem('sahichayan_results', JSON.stringify(normalizedResult));

          if (latest.trait_scores) {
            setScores(latest.trait_scores);
            localStorage.setItem('sahichayan_scores', JSON.stringify(latest.trait_scores));
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
      setAssessmentResult(res.data);
      return res.data;
    }
    return null;
  };

  const toggleSaveCareer = async (career) => {
    const careerKey = career.id || career.career_id;
    const exists = savedCareers.some((c) => (c.id || c.career_id) === careerKey);

    let next;
    if (exists) {
      next = savedCareers.filter((c) => (c.id || c.career_id) !== careerKey);
    } else {
      next = [
        {
          id: careerKey,
          career_id: careerKey,
          name: career.name || career.career_name,
          category: career.category,
          averageSalaryInr: career.averageSalaryInr || career.average_salary_inr || 'Competitive',
          growthRate: career.growthRate || career.growth_rate || 'High Demand',
          savedAt: new Date().toISOString(),
          status: 'Exploring',
        },
        ...savedCareers,
      ];
    }
    setSavedCareers(next);

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
    return savedCareers.some((c) => c.id === careerId || c.career_id === careerId);
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
    setActiveVideoModal({
      isOpen: true,
      video: {
        title,
        embedId,
        url,
        provider,
        query: query || (careerData ? careerData.youtubeSearchQuery : `${title} complete course roadmap tutorial`),
        careerData,
        defaultTab,
      },
    });
  };

  const closeInAppVideo = () => {
    setActiveVideoModal({ isOpen: false, video: null });
  };

  const openInAppRoadmap = (career) => {
    setActiveRoadmapModal({ isOpen: true, career });
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
