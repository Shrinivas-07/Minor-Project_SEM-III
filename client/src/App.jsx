import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AssessmentProvider } from './context/AssessmentContext';

import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import VideoModal from './components/inApp/VideoModal';
import RoadmapModal from './components/inApp/RoadmapModal';
import AiMentorDrawer from './components/inApp/AiMentorDrawer';

import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import CareersPage from './pages/CareersPage';
import CareerDetailPage from './pages/CareerDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import MentorPage from './pages/MentorPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <BrowserRouter>
          {/* Automatically scrolls to top on any route navigation */}
          <ScrollToTop />

          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
            {/* Sticky Navigation */}
            <Navbar />

            {/* Main Application Routes */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/assessment" element={<AssessmentPage />} />
                <Route path="/quiz" element={<Navigate to="/assessment" replace />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/career/:id" element={<CareerDetailPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/mentor" element={<MentorPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* In-App Modals & Slide-overs */}
            <VideoModal />
            <RoadmapModal />
            <AiMentorDrawer />

            {/* Comprehensive Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </AssessmentProvider>
    </AuthProvider>
  );
}
