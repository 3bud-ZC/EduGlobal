
import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SCHOLARSHIPS } from '../constants';
import { 
  Calendar, MapPin, DollarSign, GraduationCap, 
  ArrowLeft, Share2, Bookmark, CheckCircle2, 
  Info, Building2, Clock, FileCheck, Send, UserCheck,
  ChevronRight, Globe, Mail, Phone, Heart, Trophy, 
  Percent, Users2, Star, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScholarshipCard from '../components/ScholarshipCard';

// Mock function to simulate fetching extended university metadata
const getUniversityDetails = (name: string) => {
  const rankings: Record<string, any> = {
    'Oxford': { ranking: '#1', rankSource: 'Times Higher Ed', acceptance: '17%', international: '45%', output: 'High' },
    'Khalifa': { ranking: '#181', rankSource: 'QS World', acceptance: '25%', international: '30%', output: 'Very High' },
    'Tokyo': { ranking: '#28', rankSource: 'QS World', acceptance: '34%', international: '15%', output: 'Excellent' },
    'Munich': { ranking: '#37', rankSource: 'QS World', acceptance: '15%', international: '35%', output: 'Very High' },
  };

  const key = Object.keys(rankings).find(k => name.includes(k)) || 'Oxford';
  return rankings[key];
};

const ScholarshipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, isRtl, savedScholarshipIds, toggleSaveScholarship } = useApp();
  const navigate = useNavigate();
  const isEn = language === 'en';
  const isSaved = id ? savedScholarshipIds.includes(id) : false;

  const scholarship = useMemo(() => 
    SCHOLARSHIPS.find(s => s.id === id), 
  [id]);

  const universityMeta = useMemo(() => 
    scholarship ? getUniversityDetails(scholarship.universityEn) : null,
  [scholarship]);

  const relatedScholarships = useMemo(() => 
    SCHOLARSHIPS.filter(s => s.id !== id).slice(0, 2),
  [id]);

  if (!scholarship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Scholarship not found</h2>
        <button 
          onClick={() => navigate('/scholarships')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const timelineSteps = [
    { title: isEn ? 'Application Opens' : 'فتح باب التقديم', date: 'Sept 1, 2024', icon: <Clock size={20} />, status: 'completed' },
    { title: isEn ? 'Document Submission' : 'تقديم المستندات', date: 'Oct 15, 2024', icon: <FileCheck size={20} />, status: 'current' },
    { title: isEn ? 'Interview Phase' : 'مرحلة المقابلة', date: 'Nov 10, 2024', icon: <UserCheck size={20} />, status: 'upcoming' },
    { title: isEn ? 'Final Selection' : 'الاختيار النهائي', date: scholarship.deadline, icon: <Send size={20} />, status: 'upcoming' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      {/* Header / Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
            {isEn ? 'Back to Scholarships' : 'العودة للمنح الدراسية'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="h-64 sm:h-80 relative">
                <img 
                  src={scholarship.image} 
                  alt={isEn ? scholarship.titleEn : scholarship.titleAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-indigo-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {isEn ? scholarship.degreeEn : scholarship.degreeAr}
                      </span>
                      <span className="bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {isEn ? scholarship.fundingEn : scholarship.fundingAr}
                      </span>
                   </div>
                   <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                     {isEn ? scholarship.titleEn : scholarship.titleAr}
                   </h1>
                </div>
              </div>
              
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-6 mb-8 py-6 border-y border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{isEn ? scholarship.universityEn : scholarship.universityAr}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{isEn ? scholarship.countryEn : scholarship.countryAr}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{scholarship.deadline}</p>
                      </div>
                   </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Description</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-8">
                    {isEn ? scholarship.descriptionEn : scholarship.descriptionAr}
                  </p>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">What's Covered</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      'Full tuition fees',
                      'Monthly living allowance',
                      'Return flight ticket',
                      'Health insurance',
                      'Research budget (if applicable)',
                      'Language course costs'
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced University Profile Section */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              {/* Background Ranking Watermark */}
              <div className="absolute top-10 right-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Trophy size={200} />
              </div>

              <div className="flex flex-col sm:flex-row gap-10 items-start relative z-10">
                <div className="w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center p-6 border border-slate-100 dark:border-slate-700 shadow-xl group-hover:rotate-3 transition-transform">
                  <img 
                    src={`https://logo.clearbit.com/${scholarship.universityEn.toLowerCase().replace(/\s+/g, '')}.edu`} 
                    alt="University Logo" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=university.edu&sz=128';
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {isEn ? scholarship.universityEn : scholarship.universityAr}
                      </h3>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm uppercase tracking-widest">Global Elite Institution</span>
                      </div>
                    </div>
                    
                    {/* Ranking Badge */}
                    {universityMeta && (
                      <div className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-4 rounded-3xl flex flex-col items-center justify-center shadow-2xl">
                        <span className="text-xs font-black uppercase tracking-tighter opacity-70">World Rank</span>
                        <span className="text-2xl font-black leading-none">{universityMeta.ranking}</span>
                        <span className="text-[8px] font-black uppercase mt-1 opacity-50">{universityMeta.rankSource}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed text-lg">
                    {isEn 
                      ? `${scholarship.universityEn} is globally recognized for its academic excellence and research impact. It maintains a rigorous selection process and provides state-of-the-art facilities for international scholars.` 
                      : `تعتبر ${scholarship.universityAr} مؤسسة مرموقة ومعترف بها عالمياً لتميزها الأكاديمي وتأثير أبحاثها. تحافظ الجامعة على عملية اختيار صارمة وتوفر مرافق حديثة للباحثين الدوليين.`}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                      <Percent size={20} className="mx-auto mb-2 text-rose-500" />
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Acceptance</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{universityMeta?.acceptance || 'Low'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                      <Users2 size={20} className="mx-auto mb-2 text-indigo-500" />
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">International</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{universityMeta?.international || '35%'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                      <Zap size={20} className="mx-auto mb-2 text-amber-500" />
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Research</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{universityMeta?.output || 'High'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                     <a href="#" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors group">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20">
                          <Globe size={18} />
                        </div>
                        <span className="font-bold">Official Site</span>
                     </a>
                     <a href="#" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors group">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20">
                          <Mail size={18} />
                        </div>
                        <span className="font-bold">Admissions</span>
                     </a>
                     <a href="#" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors group">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20">
                          <Phone size={18} />
                        </div>
                        <span className="font-bold">Support Hub</span>
                     </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Scholarships */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Similar Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedScholarships.map(s => (
                  <ScholarshipCard key={s.id} scholarship={s} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
              <div className="flex flex-col gap-4">
                <button className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
                  {isEn ? 'Start Application' : 'ابدأ التقديم'}
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => scholarship && toggleSaveScholarship(scholarship.id)}
                    className={`flex-1 flex items-center justify-center gap-2 border-2 py-4 rounded-2xl font-bold transition-all ${
                      isSaved 
                        ? 'bg-rose-50 border-rose-200 text-rose-600' 
                        : 'border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                    {isSaved ? (isEn ? 'Saved' : 'محفوظة') : (isEn ? 'Save' : 'حفظ')}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-100 dark:border-slate-800 py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-all">
                    <Share2 size={18} />
                    {isEn ? 'Share' : 'مشاركة'}
                  </button>
                </div>
              </div>

              {/* Application Timeline */}
              <div className="mt-12">
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                   <Clock size={20} className="text-indigo-600" />
                   {isEn ? 'Application Timeline' : 'الجدول الزمني للتقديم'}
                </h4>
                <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-2.5 rtl:before:left-auto rtl:before:right-2.5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                  {timelineSteps.map((step, i) => (
                    <div key={i} className="relative pl-10 rtl:pl-0 rtl:pr-10">
                      <div className={`absolute top-0 left-0 rtl:left-auto rtl:right-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 z-10 ${
                        step.status === 'completed' ? 'bg-indigo-600' : 
                        step.status === 'current' ? 'bg-indigo-600 animate-pulse' : 'bg-slate-200 dark:bg-slate-800'
                      }`} />
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{step.title}</p>
                        <p className="text-xs font-bold text-slate-400">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement Summary */}
              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                 <div className="flex items-center gap-2 text-amber-600 mb-4">
                    <Info size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">Requirements</span>
                 </div>
                 <ul className="space-y-3">
                   {[
                     'Bachelor\'s Degree',
                     'IELTS 7.5 or higher',
                     '2 Letters of Recommendation',
                     'Research Proposal'
                   ].map((req, i) => (
                     <li key={i} className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                        {req}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
