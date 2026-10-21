import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, Compass, BookOpen, Layers } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { careersData } from '../data/careersData';

export default function MentorPage() {
  const { scores } = useAssessment();
  const { user, profile } = useAuth();

  const [selectedCareerId, setSelectedCareerId] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Namaste${profile?.full_name ? `, ${profile.full_name}` : ''}! I'm your dedicated Sahi AI Career Mentor. I'm connected to the SahiChayan advisory intelligence engine. 

You can ask me questions about:
• 🎓 College degree roadmaps & entrance examinations
• 💼 Realistic salary progressions in Indian & global tech hubs
• 🛠️ Which projects to build to showcase your skills
• ⚖️ Choosing between multiple career pathways`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
        selectedCareerId || null,
        profile,
        messages,
        user?.id || null
      );

      if (res?.data?.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
      } else {
        throw new Error('No reply');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble retrieving fresh intelligence right now. Please ensure your backend is running or ask another question!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const starterPrompts = [
    "What are the top 3 high-growth tech careers for the next 5 years?",
    "How should a 1st/2nd year engineering student prepare for product companies?",
    "What is the ideal preparation strategy for civil services exams?",
    "How can I break into UI/UX design without a formal design degree?"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5" /> Sahi AI Career Counselor
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personalized Career Advisory
            </h1>
          </div>

          {/* Career Context Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Focus Career:</span>
            <select
              value={selectedCareerId}
              onChange={(e) => setSelectedCareerId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
            >
              <option value="">General Career Exploration</option>
              {careersData.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Chat Window */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col h-[72vh]">
          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/40">
            {messages.map((msg, idx) => {
              const isAi = msg.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-xs ${
                      isAi ? 'bg-brand-600 text-white' : 'bg-slate-800 text-white'
                    }`}
                  >
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-3xl p-5 text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-white text-slate-800 border border-slate-200/80 shadow-xs'
                        : 'bg-brand-600 text-white shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-xs flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-brand-600 animate-spin" />
                  <span className="text-xs font-medium text-slate-500">
                    Sahi AI Mentor is drafting recommendations...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Prompts:</span>
            {starterPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-xs text-slate-600 hover:text-brand-700 bg-slate-100 hover:bg-brand-50 border border-slate-200/70 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about college streams, entrance exams, roadmaps..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 shrink-0"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

