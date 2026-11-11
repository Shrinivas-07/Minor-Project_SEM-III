import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ArrowRight, Bookmark, BookmarkCheck, 
  Scale
} from 'lucide-react';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';

export default function CareersPage() {
  const { 
    toggleSaveCareer, 
    isCareerSaved, 
    openInAppRoadmap, 
    openInAppVideo, 
    openAiMentor 
  } = useAssessment();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [compareList, setCompareList] = useState([]);

  const categories = ['All', ...Array.from(new Set(careersData.map((c) => c.category)))];

  const filteredCareers = careersData.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesQuery = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const toggleCompare = (career) => {
    if (compareList.some(c => c.id === career.id)) {
      setCompareList(prev => prev.filter(c => c.id !== career.id));
    } else {
      if (compareList.length >= 2) {
        alert('You can compare a maximum of 2 careers side-by-side.');
        return;
      }
      setCompareList(prev => [...prev, career]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Career Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Explore 32+ career pathways
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Compare salary ranges, 4-phase educational roadmaps, and required skills across Indian and global industries.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search careers, skills, or fields..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side Comparison Banner */}
        {compareList.length > 0 && (
          <div className="sticky top-20 z-30 mb-8 bg-slate-900 text-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-brand-400" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Comparing ({compareList.length}/2)</p>
                <p className="text-sm font-semibold truncate">
                  {compareList.map(c => c.name).join('  vs  ')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareList([])}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                Clear
              </button>
              {compareList.length === 2 && (
                <button
                  onClick={() => openAiMentor({ name: `${compareList[0].name} vs ${compareList[1].name}` })}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-500 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Compare with Advisor
                </button>
              )}
            </div>
          </div>
        )}

        {/* Careers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => {
            const isSaved = isCareerSaved(career.id);
            const isCompared = compareList.some(c => c.id === career.id);

            return (
              <div
                key={career.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                      {career.category}
                    </span>
                    <button
                      onClick={() => toggleSaveCareer(career)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Saved to bookmarks' : 'Bookmark this career'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <Link to={`/career/${career.id}`} className="group-hover:text-brand-600 transition-colors">
                    <h3 className="text-lg font-bold text-slate-900">{career.name}</h3>
                  </Link>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {career.skills.slice(0, 4).map((s, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Compensation & Growth */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">India Salary</span>
                      <strong className="text-slate-800">{career.averageSalaryInr}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Global Benchmark</span>
                      <strong className="text-slate-800">{career.averageSalaryUsd}</strong>
                    </div>
                  </div>
                </div>

                {/* In-App Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleCompare(career)}
                    className={`text-[11px] font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                      isCompared
                        ? 'bg-brand-50 text-brand-700 border-brand-200'
                        : 'text-slate-500 hover:text-slate-800 border-slate-200'
                    }`}
                  >
                    {isCompared ? '✓ Selected' : '+ Compare'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openInAppRoadmap(career)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                    >
                      Roadmap
                    </button>
                    <Link
                      to={`/career/${career.id}`}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                      title="View Career Guide"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

