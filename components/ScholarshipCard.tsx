
import React from 'react';
import { Scholarship, Language } from '../types';
import { useApp } from '../context/AppContext';
import { Calendar, GraduationCap, MapPin, DollarSign, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<Props> = ({ scholarship }) => {
  const { language, t, isRtl, savedScholarshipIds, toggleSaveScholarship } = useApp();
  const isEn = language === Language.EN;
  const isSaved = savedScholarshipIds.includes(scholarship.id);

  // Generate a plausible logo URL based on university name
  const logoUrl = `https://logo.clearbit.com/${scholarship.universityEn.toLowerCase().replace(/\s+/g, '')}.edu`;

  return (
    <motion.div
      whileHover={{ 
        y: -15, 
        scale: 1.02,
        boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.12), 0 30px 60px -30px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-sm transition-all group flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={scholarship.image}
          alt={isEn ? scholarship.titleEn : scholarship.titleAr}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        <div className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} z-10`}>
          <motion.button 
            whileTap={{ scale: 0.7 }}
            onClick={(e) => {
              e.preventDefault();
              toggleSaveScholarship(scholarship.id);
            }}
            className={`p-4 rounded-[1.25rem] backdrop-blur-xl border border-white/20 transition-all ${
              isSaved 
                ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/30 border-rose-400' 
                : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart size={22} fill={isSaved ? "currentColor" : "none"} />
          </motion.button>
        </div>

        <div className={`absolute bottom-6 ${isRtl ? 'right-6' : 'left-6'} z-10`}>
           <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-5 py-2 rounded-full flex items-center gap-2 shadow-2xl border border-white/20">
            <DollarSign size={16} className="text-emerald-500" />
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
              {isEn ? scholarship.fundingEn : scholarship.fundingAr}
            </span>
          </div>
        </div>
      </div>

      <div className="p-10 relative flex-grow flex flex-col">
        {/* University Logo Badge */}
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 8 }}
          className={`absolute -top-10 ${isRtl ? 'right-10' : 'left-10'} w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center p-3 z-20 overflow-hidden transition-transform duration-500`}
        >
          <img 
            src={logoUrl} 
            alt="University Logo" 
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement?.classList.add('bg-indigo-50');
              (e.target as HTMLImageElement).insertAdjacentHTML('afterend', '<svg class="text-indigo-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>');
            }}
          />
        </motion.div>

        <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 mb-6 uppercase tracking-[0.25em]">
          <GraduationCap size={16} />
          {isEn ? scholarship.degreeEn : scholarship.degreeAr}
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors duration-300 tracking-tight">
          {isEn ? scholarship.titleEn : scholarship.titleAr}
        </h3>

        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-4 text-base text-slate-500 dark:text-slate-400 font-bold">
            <div className="w-6 h-6 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg"><MapPin size={16} className="text-indigo-500" /></div>
            <span>{isEn ? scholarship.universityEn : scholarship.universityAr}</span>
          </div>
          <div className="flex items-center gap-4 text-base text-slate-500 dark:text-slate-400 font-bold">
            <div className="w-6 h-6 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg"><Calendar size={16} className="text-rose-500" /></div>
            <span>{t('deadline')}: <span className="text-rose-500">{scholarship.deadline}</span></span>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link
            to={`/scholarship/${scholarship.id}`}
            className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-3 group/btn hover:text-indigo-600 transition-colors"
          >
            {t('view_details')}
            <motion.div 
              whileHover={{ x: isRtl ? -8 : 8 }}
              className={`w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-all group-hover/btn:bg-indigo-600 group-hover/btn:text-white shadow-sm`}
            >
              <ArrowRight size={18} className={`transition-transform duration-300 ${isRtl ? 'rotate-180' : ''}`} />
            </motion.div>
          </Link>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#4338ca' }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-8 py-4 rounded-[1.25rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
          >
            {t('apply_now')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
