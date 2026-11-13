import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, RefreshCw, MessageSquare, Compass } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function AiMentorDrawer() {
  const { isAiMentorOpen, openAiMentor, closeAiMentor, mentorCareerContext } = useAssessment();
  const { user, profile } = useAuth();

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Welcome to ClearPath Career Advisory. Ask anything about career roadmaps, college degrees, entrance exams, portfolio projects, or salary expectations in India and globally."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = mentorCareerContext
    ? [
        `What are the most critical skills for ${mentorCareerContext.name}?`,
        `What entry-level projects will get me hired in this field?`,
        `How is the 5-year salary progression in India vs Global?`,
        `What certifications or degrees are most respected?`
      ]
    : [
        "Which high-growth tech careers suit analytical minds?",
        "How can I prepare for UPSC/Civil Services while doing college?",
        "What is the difference between AI Engineering and Data Science?",
        "How do I choose between corporate jobs and higher studies?"
      ];

  useEffect(() => {
    if (mentorCareerContext) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Focus Career: ${mentorCareerContext.name}\n\nI can help break down the required roadmap, salary outlook (${mentorCareerContext.averageSalaryInr || '₹8 - 25 LPA'}), recommended college degrees, or portfolio projects. What would you like to explore?`
        }
      ]);
    }
  }, [mentorCareerContext]);

  useEffect(() => {
    if (isAiMentorOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isAiMentorOpen]);

  const handleSend = async (textToSend = input) => {
    const q = textToSend.trim();
    if (!q || loading) return;

    setInput('');
    const userMsg = { role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.chatWithMentor(
        q,
        mentorCareerContext?.id || null,
        profile,
        messages,
        user?.id || null
      );

      if (res?.data?.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
      } else {
        throw new Error('No reply from advisory service');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Unable to connect to the advisory service right now. Please try again in a moment."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Subtle Executive Trigger Button (Bottom-Right Corner) */}
      {!isAiMentorOpen && (
        <button
          type="button"
          onClick={() => openAiMentor()}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-colors font-semibold text-xs sm:text-sm cursor-pointer border border-slate-700"
          aria-label="Open Career Advisor"
        >
          <MessageSquare className="w-4 h-4 text-brand-400" />
          <span>Career Advisor</span>
        </button>
      )}

      {/* Slide-over Drawer */}
      {isAiMentorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
          <div 
            className="w-full max-w-md h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Career Advisor
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[220px]">
                    {mentorCareerContext ? `Focus: ${mentorCareerContext.name}` : "Personalized Career Guidance"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAiMentor}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, index) => {
                const isAdvisor = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${isAdvisor ? '' : 'flex-row-reverse'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                        isAdvisor ? 'bg-slate-900 text-white' : 'bg-brand-600 text-white'
                      }`}
                    >
                      {isAdvisor ? <Compass className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    <div
                      className={`max-w-[84%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        isAdvisor
                          ? 'bg-white text-slate-800 border border-slate-200 shadow-card'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.content}</div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-card flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-brand-600 animate-spin" />
                    <span className="text-xs text-slate-500 font-medium">Preparing guidance...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-4 py-2.5 bg-white border-t border-slate-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {suggestedQuestions.map((q, qIdx) => (
                  <button
                    key={qIdx}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="text-[11px] text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1 rounded-full transition-colors text-left truncate max-w-full cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, exams, colleges, or salaries..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white transition-colors shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
