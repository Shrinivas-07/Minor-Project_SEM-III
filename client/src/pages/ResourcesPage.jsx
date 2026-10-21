import React, { useState } from 'react';
import { 
  BookOpen, Play, MapPin, Search, ExternalLink, Sparkles, Filter, 
  Layers, CheckCircle, Clock, Film, Globe, GraduationCap
} from 'lucide-react';
import { resourcesData } from '../data/resourcesData';
import { useAssessment } from '../context/AssessmentContext';

export default function ResourcesPage() {
  const { openInAppVideo, openAiMentor } = useAssessment();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const types = ['All', 'video', 'roadmap', 'course', 'guide'];
  const categories = ['All', ...Array.from(new Set(resourcesData.map(r => r.category)))];

  const filtered = resourcesData.filter((item) => {
    const matchesType = selectedType === 'All' || item.type.toLowerCase() === selectedType.toLowerCase();
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Curated Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Learning Resources, Video Hub & Guides
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Carefully curated roadmaps, YouTube search video playlists, and multi-platform courses playable directly in the app.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides, roadmaps, videos..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.duration || 'Self-paced'}
                </span>

                {item.type === 'video' ? (
                  <button
                    onClick={() => openInAppVideo(
                      item.title,
                      null, // Use dynamic search to prevent expired ID error
                      item.url,
                      'YouTube',
                      `${item.title} complete tutorial course`
                    )}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch in App</span>
                  </button>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open Guide</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
