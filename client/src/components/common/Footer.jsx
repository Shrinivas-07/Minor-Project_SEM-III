import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Check, ShieldCheck } from 'lucide-react';
import ClearPathLogo from './ClearPathLogo';

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
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-auto">
      {/* Upper Newsletter Bar */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              Stay updated on emerging career tracks and market benchmarks
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Monthly briefs on university pathways, entrance exam schedules, and India-to-global compensation trends.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:w-72 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm flex items-center gap-2 transition-colors shrink-0"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="inline-block group">
              <ClearPathLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-sm">
              ClearPath helps students evaluate cognitive strengths across 18 dimensions, compare verified industry outcomes, and follow clear educational roadmaps.
            </p>
            <div className="flex items-center gap-2 mt-5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Data-backed guidance for Indian &amp; global careers</span>
            </div>
          </div>

          {/* Career Fields */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Career Fields</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/careers" className="hover:text-white transition-colors">Technology &amp; Engineering</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Aviation &amp; Aerospace</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Product &amp; UI/UX Design</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Civil Services (UPSC)</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Medical &amp; Life Sciences</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Finance &amp; Banking</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/assessment" className="hover:text-white transition-colors">18-Trait Assessment</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Career Directory</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Video &amp; Course Hub</Link></li>
              <li><Link to="/mentor" className="hover:text-white transition-colors">Career Advisor</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Saved Bookmarks</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Account</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/register" className="hover:text-white transition-colors">Create Student Account</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Manage Academic Profile</Link></li>
              <li><Link to="/assessment" className="hover:text-white transition-colors">Explore Compatibility</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ClearPath. All rights reserved.</p>
          <p>Structured Career Discovery &amp; Educational Roadmaps</p>
        </div>
      </div>
    </footer>
  );
}
