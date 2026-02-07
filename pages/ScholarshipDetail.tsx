import React from "react";
import { useParams, Link } from "react-router-dom";

const ScholarshipDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="text-xs font-black uppercase tracking-widest text-indigo-600">
            Scholarship #{id}
          </div>
          <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
            Demo Scholarship Detail
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-300">
            This is a showcase details page. Later, it will load from DB with requirements, funding type, and application flow.
          </p>

          <div className="mt-8 flex gap-3">
            <Link to="/login" className="px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition-all">
              Apply (Demo)
            </Link>
            <Link to="/scholarships" className="px-6 py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black transition-all">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
