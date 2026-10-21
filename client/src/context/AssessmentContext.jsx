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

  const updateScore = (key, value) => {
    setScores(prev => ({ ...prev, [key]: Number(value) }));
  };

  const applyArchetype = (presetScores) => {
    setScores(prev => ({ ...prev, ...presetScores }));
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
    const exists = savedCareers.some(c => c.id === career.id);
    let next;
    if (exists) {
      next = savedCareers.filter(c => c.id !== career.id);
    } else {
      next = [
        {
          id: career.id,
          name: career.name,
          category: career.category,
          averageSalaryInr: career.averageSalaryInr,
          growthRate: career.growthRate,
          savedAt: new Date().toISOString(),
          status: 'Exploring'
        },
        ...savedCareers
      ];
    }
    setSavedCareers(next);

    // If Supabase is connected and user is logged in
    if (user && supabase) {
      try {
        await fetch('/api/users/save-career', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            careerId: career.id,
            careerName: career.name,
            category: career.category,
            matchScore: career.matchScore || 0
          })
        });
      } catch (err) {
        // Continue silently
      }
    }
  };

  const isCareerSaved = (careerId) => {
    return savedCareers.some(c => c.id === careerId);
  };

  const openInAppVideo = (title, embedId, url, provider = 'YouTube') => {
    setActiveVideoModal({
      isOpen: true,
      video: { title, embedId, url, provider }
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
