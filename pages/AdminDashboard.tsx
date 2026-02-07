
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, Users, GraduationCap, FileText, 
  Settings, Plus, Edit2, Trash2, Check, X 
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { isRtl, language } = useApp();
  const [activeTab, setActiveTab] = useState('scholarships');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`w-64 bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-2`}>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Shield size={20} />
          </div>
          <span className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Admin Core</span>
        </div>

        {[
          { id: 'scholarships', label: 'Scholarships', icon: <GraduationCap size={18}/> },
          { id: 'applications', label: 'Applications', icon: <FileText size={18}/> },
          { id: 'users', label: 'Users & Roles', icon: <Users size={18}/> },
          { id: 'settings', label: 'Global Settings', icon: <Settings size={18}/> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Management Console</h1>
            <p className="text-slate-500">Oversee the academic ecosystem.</p>
          </div>
          {activeTab === 'scholarships' && (
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-indigo-700 transition-all">
              <Plus size={20} />
              Add Scholarship
            </button>
          )}
        </header>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left rtl:text-right">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="text-xs font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">University</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Mock Data - In real build, this iterates over DB fetch */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-6 font-bold text-slate-900 dark:text-white">Global Excellence</td>
                <td className="px-6 py-6 text-slate-500">Oxford</td>
                <td className="px-6 py-6 text-slate-500">2024-12-15</td>
                <td className="px-6 py-6">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Published</span>
                </td>
                <td className="px-6 py-6 flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Edit2 size={16}/></button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16}/></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
