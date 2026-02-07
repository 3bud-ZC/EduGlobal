import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-300">
            Showcase admin area. Later: CRUD scholarships, users, applications, settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
