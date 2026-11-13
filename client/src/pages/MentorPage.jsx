import React, { useState, useRef, useEffect } from 'react';
import { Send, User, RefreshCw, Compass, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { careersData } from '../data/careersData';

export default function MentorPage() {
  const { user, profile } = useAuth();

  const [selectedCareerId, setSelectedCareerId] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello${profile?.full_name ? `, ${profile.full_name}` : ''}. Welcome to ClearPath Career Advisory.\n\nYou can ask questions about:\n• Degree programs and entrance exam timelines\n• Salary progressions across Indian and global markets\n• Portfolio projects and internships to build\n• Comparing two career tracks side by side`
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
          content: "I'm having trouble connecting to the advisory service right now. Please try your question again shortly."
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-brand-600" /> ClearPath Career Advisor
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personalized Career Advisory
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Focus Career:</span>
            <select
              value={selectedCareerId}
              onChange={(e) => setSelectedCareerId(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-600"
            >
              <option value="">General Career Exploration</option>
              {careersData.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden flex flex-col h-[72vh]">
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/50">
            {messages.map((msg, idx) => {
              const isAdvisor = msg.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${isAdvisor ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                      isAdvisor ? 'bg-slate-900 text-white' : 'bg-brand-600 text-white'
                    }`}
                  >
                    {isAdvisor ? <Compass className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
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
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-card flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-brand-600 animate-spin" />
                  <span className="text-xs font-medium text-slate-500">
                    Preparing guidance...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter Prompts */}
          <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0">Suggested:</span>
            {starterPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
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
              placeholder="Ask about college degrees, entrance exams, roadmaps, or salaries..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
