import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Find Scholarships Worldwide ✨
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-300 max-w-2xl">
            EduGlobal Hub — a premium scholarship platform showcase. Browse scholarships, save favorites, and manage applications.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/scholarships"
              className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition-all active:scale-95"
            >
              Browse Scholarships
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-black transition-all active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
