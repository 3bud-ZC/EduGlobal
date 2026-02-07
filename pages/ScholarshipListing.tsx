
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHOLARSHIPS } from '../constants';
import ScholarshipCard from '../components/ScholarshipCard';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const ScholarshipListing: React.FC = () => {
  const { t, isRtl } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Master\'s', 'PhD', 'Undergraduate', 'Short Course'];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('nav_scholarships')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Browse through {SCHOLARSHIPS.length} premium academic opportunities.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 sticky top-24">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-6">
                <Filter size={20} />
                Filters
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Degree Type</label>
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Funding Source</label>
                  <div className="space-y-3">
                    {['Government', 'University', 'Private Organization'].map(fund => (
                      <label key={fund} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-slate-300 text-indigo-600"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{fund}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors mt-4">
                  Reset All
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      activeFilter === cat
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 transition-all">
                <SlidersHorizontal size={18} />
                Sort: Newest
                <ChevronDown size={18} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SCHOLARSHIPS.map(s => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                    p === 1
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipListing;
