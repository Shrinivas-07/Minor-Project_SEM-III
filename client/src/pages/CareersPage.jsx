import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ArrowRight, Bookmark, BookmarkCheck, 
  Scale, Filter, X, SlidersHorizontal, LayoutGrid, List,
  Cpu, TrendingUp, HeartPulse, Palette, Rocket, Leaf, Shield, Check,
  Sparkles, Layers, Play, MessageSquare, DollarSign
} from 'lucide-react';
import { careersData } from '../data/careersData';
import { useAssessment } from '../context/AssessmentContext';

// Category Icons Mapping (Airbnb Category Carousel)
const CATEGORY_META = {
  'All': { icon: Sparkles, label: 'All Careers' },
  'Technology & AI': { icon: Cpu, label: 'Technology & AI' },
  'Finance & Business': { icon: TrendingUp, label: 'Finance & Business' },
  'Healthcare & Life Sciences': { icon: HeartPulse, label: 'Healthcare & Life Sciences' },
  'Design & Creative': { icon: Palette, label: 'Design & Creative' },
  'Aviation & Aerospace': { icon: Rocket, label: 'Aviation & Aerospace' },
  'Civil Services & Law': { icon: Scale, label: 'Civil Services & Law' },
  'Engineering & Green Tech': { icon: Leaf, label: 'Engineering & Green' },
  'Government & Public Policy': { icon: Shield, label: 'Public Governance' },
  'Government & Public Service': { icon: Shield, label: 'Public Governance' },
};

export default function CareersPage() {
  const { 
    toggleSaveCareer, 
    isCareerSaved, 
    openInAppRoadmap, 
    openInAppVideo, 
    openAiMentor 
  } = useAssessment();

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('all'); // 'all' | '10plus' | '20plus' | '35plus' | 'usd100k'
  const [workStyleFilter, setWorkStyleFilter] = useState('all'); // 'all' | 'Remote-Friendly' | 'High-Growth' | 'Global-Mobility'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [compareList, setCompareList] = useState([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(careersData.map((c) => c.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Multi-Variable Filter Logic
  const filteredCareers = useMemo(() => {
    return careersData.filter((c) => {
      // 1. Category match
      const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;

      // 2. Search query match
      const q = search.toLowerCase().trim();
      const matchesQuery = !q || (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (Array.isArray(c.skills) && c.skills.some((s) => s.toLowerCase().includes(q)))
      );

      // 3. Salary benchmark filter
      let matchesSalary = true;
      if (salaryFilter === '10plus') {
        matchesSalary = c.averageSalaryInr.includes('₹') && !c.averageSalaryInr.startsWith('₹6') && !c.averageSalaryInr.startsWith('₹7');
      } else if (salaryFilter === '20plus') {
        matchesSalary = c.averageSalaryInr.includes('₹20') || c.averageSalaryInr.includes('₹35') || c.averageSalaryInr.includes('Crore');
      } else if (salaryFilter === '35plus') {
        matchesSalary = c.averageSalaryInr.includes('₹35') || c.averageSalaryInr.includes('Crore');
      } else if (salaryFilter === 'usd100k') {
        matchesSalary = c.averageSalaryUsd && c.averageSalaryUsd.includes('$1') || c.averageSalaryUsd.includes('$2');
      }

      // 4. Work style tag filter
      let matchesStyle = true;
      if (workStyleFilter !== 'all') {
        matchesStyle = Array.isArray(c.workStyle) && c.workStyle.includes(workStyleFilter);
      }

      return matchesCat && matchesQuery && matchesSalary && matchesStyle;
    });
  }, [search, selectedCategory, salaryFilter, workStyleFilter]);

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

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSalaryFilter('all');
    setWorkStyleFilter('all');
  };

  const hasActiveFilters = search || selectedCategory !== 'All' || salaryFilter !== 'all' || workStyleFilter !== 'all';

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================== */}
        {/* PENTAGRAM EDITORIAL HEADER                                           */}
        {/* ===================================================================== */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
            <span>Master Directory • 42 Verified Pathways</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Explore 42+ high-growth specializations
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Search by skill, salary benchmark, or industry. Every dossier includes verified compensation brackets, 4-phase semester syllabi, and in-app video roadmaps.
          </p>
        </div>

        {/* ===================================================================== */}
        {/* AIRBNB-STYLE FLOATING SEARCH CAPSULE                                 */}
        {/* ===================================================================== */}
        <div className="airbnb-capsule p-2 sm:p-2.5 mb-8 flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto">
          {/* Search Input Segment */}
          <div className="flex items-center gap-2 px-4 py-2 w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Titles, skills (Python, CAD, IP)..."
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200" />

          {/* Salary Filter Segment */}
          <div className="flex items-center gap-2 px-4 py-2 w-full md:w-56">
            <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Compensation</span>
              <select
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">Any Compensation</option>
                <option value="10plus">Entry &gt; ₹10 LPA</option>
                <option value="20plus">Mid-Senior &gt; ₹20 LPA</option>
                <option value="35plus">Top Tier &gt; ₹35 LPA</option>
                <option value="usd100k">Global &gt; $100K USD</option>
              </select>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200" />

          {/* Work Style Segment */}
          <div className="flex items-center gap-2 px-4 py-2 w-full md:w-52">
            <Sparkles className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Work Style</span>
              <select
                value={workStyleFilter}
                onChange={(e) => setWorkStyleFilter(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">All Styles</option>
                <option value="Remote-Friendly">Remote-Friendly</option>
                <option value="High-Growth">High-Growth (30%+)</option>
                <option value="Global-Mobility">Global Mobility</option>
                <option value="Research-Heavy">Research &amp; R&amp;D</option>
              </select>
            </div>
          </div>

          {/* Clear / Status Button */}
          {hasActiveFilters ? (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          ) : (
            <div className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold shrink-0 hidden md:flex items-center gap-1.5">
              <span>{filteredCareers.length} Found</span>
            </div>
          )}
        </div>

        {/* ===================================================================== */}
        {/* AIRBNB CATEGORY ICON CAROUSEL                                        */}
        {/* ===================================================================== */}
        <div className="flex overflow-x-auto gap-3 pb-3 mb-8 border-b border-slate-200 no-scrollbar">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || { icon: Sparkles, label: cat };
            const Icon = meta.icon;
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' ? careersData.length : careersData.filter(c => c.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex flex-col items-center justify-center gap-1.5 px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-200 cursor-pointer min-w-[100px] ${
                  isSelected
                    ? 'bg-white border-2 border-slate-900 shadow-sm text-slate-950 font-bold'
                    : 'bg-white/60 hover:bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-[11px] leading-tight text-center">{meta.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* CONTROL STRIP: RESULTS COUNT & VIEW MODE SWITCHER (LINEAR PRECISION) */}
        {/* ===================================================================== */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-xs font-bold text-slate-700">
            Showing <span className="text-brand-600 font-extrabold">{filteredCareers.length}</span> verified pathways
            {selectedCategory !== 'All' && <span> in <span className="text-slate-900">{selectedCategory}</span></span>}
          </p>

          <div className="flex items-center gap-2">
            <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="High-Density Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SIDE-BY-SIDE COMPARISON FLOATING BANNER                              */}
        {/* ===================================================================== */}
        {compareList.length > 0 && (
          <div className="sticky top-20 z-30 mb-8 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-300">Side-by-Side Comparison ({compareList.length}/2)</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {compareList.map(c => c.name).join(' vs ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareList([])}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Clear
              </button>
              {compareList.length === 2 && (
                <button
                  onClick={() => {
                    const c1 = compareList[0];
                    const c2 = compareList[1];
                    alert(`Comparing:\n\n1. ${c1.name}\n• Category: ${c1.category}\n• India Salary: ${c1.averageSalaryInr}\n• Global: ${c1.averageSalaryUsd}\n• Growth: ${c1.growthRate}\n\n2. ${c2.name}\n• Category: ${c2.category}\n• India Salary: ${c2.averageSalaryInr}\n• Global: ${c2.averageSalaryUsd}\n• Growth: ${c2.growthRate}`);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white transition-colors"
                >
                  View Side-by-Side Analysis
                </button>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 1: CARD GRID VIEW (APPLE SPRING + LINEAR TOKENS)                 */}
        {/* ===================================================================== */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredCareers.map((career) => {
              const isSaved = isCareerSaved(career.id);
              const isCompared = compareList.some(c => c.id === career.id);

              return (
                <div
                  key={career.id}
                  className="pro-card rounded-2xl p-6 flex flex-col justify-between group apple-hover"
                >
                  <div>
                    {/* Header Pills */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                        {career.category}
                      </span>
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {(career.growthRate || '15%').split('(')[0].trim()}
                      </span>
                    </div>

                    <Link to={`/career/${career.id}`}>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {career.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {career.description}
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {(career.skills || []).slice(0, 4).map((skill, sIdx) => (
                        <span key={sIdx} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10.5px] text-slate-500 block">Avg. India Package</span>
                      <span className="text-xs font-bold text-slate-900">{career.averageSalaryInr}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleCompare(career)}
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          isCompared 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200'
                        }`}
                        title="Compare Career"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleSaveCareer(career)}
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          isSaved 
                            ? 'bg-amber-50 text-amber-600 border-amber-200' 
                            : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200'
                        }`}
                        title="Save Bookmark"
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => openInAppRoadmap(career)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Open Roadmap Modal"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        to={`/career/${career.id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 2: LINEAR HIGH-DENSITY DATABASE TABLE VIEW                      */}
        {/* ===================================================================== */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold">
                    <th className="py-3 px-4">Specialization</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">India Package</th>
                    <th className="py-3 px-4">Global USD</th>
                    <th className="py-3 px-4">Growth Rate</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCareers.map((career) => {
                    const isSaved = isCareerSaved(career.id);
                    return (
                      <tr key={career.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <Link to={`/career/${career.id}`} className="hover:text-brand-600 transition-colors">
                            {career.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-slate-700">
                            {career.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {career.averageSalaryInr}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono">
                          {career.averageSalaryUsd}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">
                          {(career.growthRate || '15%').split('(')[0].trim()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => toggleSaveCareer(career)}
                              className={`p-1.5 rounded-md border ${
                                isSaved ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-white text-slate-400 border-slate-200'
                              }`}
                            >
                              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                            </button>
                            <Link
                              to={`/career/${career.id}`}
                              className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px]"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
