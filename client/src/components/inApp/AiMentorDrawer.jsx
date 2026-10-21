import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, Send, Sparkles, User, RefreshCw, ChevronRight, MessageSquare, Flame } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function AiMentorDrawer() {
  const { isAiMentorOpen, openAiMentor, closeAiMentor, mentorCareerContext } = useAssessment();
  const { user, profile } = useAuth();

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste! I'm your Sahi AI Career Mentor. Ask me anything about career roadmaps, college streams, entry exams, project ideas, or salary progression in India and globally."
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
          content: `🎯 **Focus Career**: **${mentorCareerContext.name}**\n\nI can help you break down the required roadmap, salary outlook (${mentorCareerContext.averageSalaryInr || '₹8 - 25 LPA'}), recommended college degrees, or portfolio projects. What would you like to explore?`
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
        throw new Error('No reply from AI service');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting to the advisory server. You can ask another question, or check if the backend server is running on port 5000!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button (Bottom-Right Corner) */}
      {!isAiMentorOpen && (
        <button
          type="button"
          onClick={() => openAiMentor()}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 text-white shadow-2xl hover:shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs sm:text-sm cursor-pointer border border-white/20 group"
          aria-label="Open Sahi AI Career Mentor"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-bounce-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <span className="tracking-wide">Ask Sahi AI</span>
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Slide-over Drawer */}
      {isAiMentorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-brand-50/40 to-indigo-50/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Sahi AI Career Mentor
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Live
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[200px]">
                    {mentorCareerContext ? `Context: ${mentorCareerContext.name}` : "General Career Intelligence"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAiMentor}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
              {messages.map((msg, index) => {
                const isAi = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-xs ${
                        isAi ? 'bg-brand-600 text-white' : 'bg-slate-800 text-white'
                      }`}
                    >
                      {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-[84%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        isAi
                          ? 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                          : 'bg-brand-600 text-white shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.content}</div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-xs flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-brand-600 animate-spin" />
                    <span className="text-xs text-slate-500 font-medium">Sahi AI is analyzing your career query...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-4 py-2.5 bg-white border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-500" /> Instant Questions
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {suggestedQuestions.map((q, qIdx) => (
                  <button
                    key={qIdx}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="text-[11px] text-slate-600 hover:text-brand-700 bg-slate-100 hover:bg-brand-50 border border-slate-200 px-2.5 py-1 rounded-full transition-colors text-left truncate max-w-full cursor-pointer"
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
                placeholder="Ask advice on skills, exams, colleges, salaries..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white transition-all shadow-xs shrink-0 cursor-pointer"
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
