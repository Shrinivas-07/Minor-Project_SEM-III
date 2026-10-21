import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Database, Github, Heart, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Upper Newsletter & Mission Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              Stay Ahead of Emerging Career Shifts
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Join thousands of learners receiving weekly AI-curated roadmap updates, salary benchmarks, and tech trends.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your student email..."
              className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              {subscribed ? <Check className="w-4 h-4 text-emerald-300" /> : <Send className="w-4 h-4" />}
              <span>{subscribed ? 'Subscribed' : 'Join'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                Sahi<span className="text-brand-400">Chayan</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-sm">
              SahiChayan (सही चयन) is an AI-powered Career Guidance and Roadmapping Platform built to illuminate student potential through scientific aptitude analysis and real-world market intelligence.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Database className="w-3.5 h-3.5" /> Supabase Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Gemini AI Powered
              </span>
            </div>
          </div>

          {/* Column 2: Career Tracks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Career Tracks</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/careers?category=Technology%20%26%20AI" className="hover:text-white transition-colors">Artificial Intelligence</Link></li>
              <li><Link to="/careers?category=Aviation%20%26%20Aerospace" className="hover:text-white transition-colors">Aviation & Aerospace</Link></li>
              <li><Link to="/careers?category=Design%20%26%20Creative" className="hover:text-white transition-colors">UI/UX Product Design</Link></li>
              <li><Link to="/careers?category=Government%20%26%20Public%20Policy" className="hover:text-white transition-colors">Civil Services (UPSC)</Link></li>
              <li><Link to="/careers?category=Healthcare%20%26%20Life%20Sciences" className="hover:text-white transition-colors">Medical & Life Sciences</Link></li>
              <li><Link to="/careers?category=Finance%20%26%20Business" className="hover:text-white transition-colors">Investment Banking</Link></li>
            </ul>
          </div>

          {/* Column 3: Tools & In-App */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">In-App Features</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/assessment" className="hover:text-white transition-colors">18-Trait Assessment</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Career Directory</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Video Masterclasses</Link></li>
              <li><Link to="/mentor" className="hover:text-white transition-colors">Sahi AI Career Mentor</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Saved Bookmarks</Link></li>
            </ul>
          </div>

          {/* Column 4: Project Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Minor Project SEM-III</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="https://github.com/Shrinivas-07/Minor-Project_SEM-III" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors"><Github className="w-3.5 h-3.5" /> GitHub Repository</a></li>
              <li><span className="text-slate-400">Deployed on Vercel & Render</span></li>
              <li><span className="text-slate-400">PostgreSQL / Supabase</span></li>
              <li><span className="text-slate-400">React 18 & Vite & Tailwind</span></li>
              <li><Link to="/login" className="text-brand-400 hover:text-brand-300">Student Portal Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SahiChayan.Com — Academic Minor Project. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for student empowerment.
          </p>
        </div>
      </div>
    </footer>
  );
}
