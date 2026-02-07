import React from "react";
import { Link } from "react-router-dom";

const ScholarshipListing: React.FC = () => {
  const demo = Array.from({ length: 12 }).map((_, i) => ({
    id: String(i + 1),
    title: `Scholarship Program #${i + 1}`,
    country: ["USA", "Germany", "UK", "Canada"][i % 4],
    deadline: "2026-06-30",
  }));

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Scholarships</h1>
            <p className="text-slate-500 dark:text-slate-300 mt-2">
              Demo listing for showcase. (Later: real DB + filters)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demo.map((s) => (
            <Link
              key={s.id}
              to={`/scholarship/${s.id}`}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="text-xs font-black uppercase tracking-widest text-indigo-600">
                {s.country}
              </div>
              <div className="mt-3 text-xl font-black text-slate-900 dark:text-white">
                {s.title}
              </div>
              <div className="mt-4 text-sm text-slate-500 dark:text-slate-300">
                Deadline: {s.deadline}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipListing;
