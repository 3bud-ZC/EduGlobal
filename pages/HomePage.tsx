
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SCHOLARSHIPS, UNIVERSITIES, DESTINATIONS, TESTIMONIALS, RESOURCES } from '../constants';
import ScholarshipCard from '../components/ScholarshipCard';
import { 
  Search, Sparkles, GraduationCap, Globe, 
  ArrowRight, Quote, CheckCircle2, Cpu, 
  Users, BookOpen, Award, ExternalLink 
} from 'lucide-react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

// Variants for staggered entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Animated Counter Component for Stats
const Counter = ({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ''));
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ 
        y: -15, 
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)"
      }}
      className="flex flex-col items-center p-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all group"
    >
      <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 40 })}
      </div>
      <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
        {count.toLocaleString()}{value.includes('+') ? '+' : ''}
      </div>
      <div className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{label}</div>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const { t, isRtl, language } = useApp();
  const [search, setSearch] = useState('');
  const isEn = language === 'en';
  
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [12, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [-12, -45]);

  const filtered = SCHOLARSHIPS.slice(0, 3);

  const stats = [
    { label: isEn ? 'Programs' : 'برنامج', value: '5,000+', icon: <GraduationCap /> },
    { label: isEn ? 'Universities' : 'جامعة', value: '800+', icon: <Globe /> },
    { label: isEn ? 'Students' : 'طالب', value: '250k+', icon: <Users /> },
    { label: isEn ? 'Awards' : 'جائزة', value: '15+', icon: <Award /> },
  ];

  const titleText = isRtl 
    ? "اكتشف مستقبلك في أفضل الجامعات العالمية"
    : "Unlock Your Global Potential at Elite Universities";

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      {/* Parallax Background Icons */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute top-[10%] left-[5%] opacity-10 dark:opacity-5">
           <BookOpen size={200} className="text-indigo-600" />
        </motion.div>
        <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute bottom-[20%] right-[10%] opacity-10 dark:opacity-5">
           <GraduationCap size={250} className="text-emerald-600" />
        </motion.div>
        <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] bg-indigo-200/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-emerald-200/20 blur-[100px] rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-12 border border-indigo-100 dark:border-indigo-800 shadow-sm">
              <Sparkles size={14} className="animate-spin-slow" />
              {isEn ? 'Empowering 250k+ Future Leaders' : 'تمكين أكثر من 250 ألف قادة المستقبل'}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white leading-[0.85] mb-12 tracking-tighter">
              {titleText.split(' ').map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={wordVariants}
                  className="inline-block mr-[0.2em] rtl:mr-0 rtl:ml-[0.2em]"
                >
                  {word === 'Global' || word === 'Elite' || word === 'عالمية' || word === 'مستقبلك' ? (
                    <span className="text-indigo-600">{word}</span>
                  ) : word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-16 leading-relaxed font-medium px-4">
              {isEn 
                ? "Experience the world's most sophisticated scholarship matching engine. Tailored intelligence for your academic success." 
                : "اختبر محرك مطابقة المنح الدراسية الأكثر تطوراً في العالم. ذكاء مصمم لنجاحك الأكاديمي."}
            </motion.p>

            {/* Search Box Enhanced */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="max-w-5xl mx-auto bg-white dark:bg-slate-900 p-3 sm:p-5 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 transition-shadow hover:shadow-[0_60px_120px_-20px_rgba(79,70,229,0.2)]"
            >
              <div className="flex-1 w-full relative group">
                <Search className={`absolute ${isRtl ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300`} size={28} />
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full ${isRtl ? 'pr-20 pl-8' : 'pl-20 pr-8'} py-7 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white text-xl sm:text-2xl font-bold rounded-[2.5rem] placeholder:text-slate-300`}
                />
              </div>
              <button className="w-full md:w-auto px-12 py-7 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl rounded-[2.5rem] transition-all flex items-center justify-center gap-4 shadow-xl shadow-indigo-600/20 active:scale-95 group">
                {isRtl ? 'ابدأ البحث' : 'Find Grants'}
                <ArrowRight size={24} className={`transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners Auto-Scroll */}
      <div className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 overflow-hidden relative">
        <div className="flex gap-24 items-center animate-infinite-scroll w-max grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          {[...UNIVERSITIES, ...UNIVERSITIES, ...UNIVERSITIES].map((uni, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img src={uni.logo} alt={uni.name} className="h-10 w-auto" />
              <span className="font-black text-xl text-slate-900 dark:text-white tracking-tighter">{uni.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with Reveal */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {stats.map((stat, i) => (
              <Counter key={i} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Scholarships with Stagger */}
      <section className="py-40 bg-white dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
                {isEn ? 'Featured Elite Opportunities' : 'فرص النخبة المميزة'}
              </h2>
              <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {isEn 
                  ? 'Access hand-picked premium scholarships with direct application support.' 
                  : 'احصل على منح دراسية متميزة مختارة بعناية مع دعم مباشر لعملية التقديم.'}
              </p>
            </motion.div>
            <motion.button 
              whileHover={{ x: 10, scale: 1.05 }}
              className="flex items-center gap-3 text-indigo-600 font-black text-2xl group"
            >
              {isEn ? 'Explore All' : 'استكشف الكل'}
              <ArrowRight size={28} className={isRtl ? 'rotate-180' : ''} />
            </motion.button>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {filtered.map((s) => (
              <motion.div key={s.id} variants={itemVariants}>
                <ScholarshipCard scholarship={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Section with Hover Gallery */}
      <section className="py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-28"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">{isEn ? 'World Class Destinations' : 'وجهات عالمية المستوى'}</h2>
            <p className="text-slate-400 text-2xl max-w-2xl mx-auto">{isEn ? 'Choose from the most vibrant academic hubs across the globe.' : 'اختر من بين أكثر المراكز الأكاديمية حيوية في جميع أنحاء العالم.'}</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {DESTINATIONS.map((dest, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -25 }}
                className="relative h-[600px] rounded-[4rem] overflow-hidden group cursor-pointer shadow-2xl"
              >
                <img src={dest.image} alt={dest.nameEn} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-125" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute bottom-12 left-10 right-10">
                  <div className="bg-indigo-600/30 backdrop-blur-md w-fit px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
                    {dest.count}+ Scholarships
                  </div>
                  <h4 className="text-4xl font-black mb-4 leading-none">{isEn ? dest.nameEn : dest.nameAr}</h4>
                  <div className="h-0 group-hover:h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                     <p className="text-slate-300 text-sm font-medium">Explore top-tier programs and immersive student life in {dest.nameEn}.</p>
                  </div>
                </div>
                
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <ArrowRight className={isRtl ? 'rotate-180' : ''} />
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Helper Banner with Motion */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-indigo-600 rounded-[5rem] p-16 md:p-28 text-white relative overflow-hidden shadow-3xl shadow-indigo-600/30"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-indigo-400/30 blur-[150px] rounded-full"></div>
            
            <div className="grid lg:grid-cols-2 items-center gap-24 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mb-12 border border-white/20">
                  <Cpu size={48} className="text-white animate-pulse" />
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter">
                  {isEn ? 'AI-Powered Matching.' : 'مطابقة مدعومة بالذكاء.'}
                </h2>
                <p className="text-2xl text-indigo-100 mb-14 font-medium leading-relaxed">
                  {isEn 
                    ? "Our proprietary algorithm analyzes your profile to find the highest-probability scholarship matches in seconds." 
                    : "تحلل خوارزميتنا الحصرية ملفك الشخصي للعثور على أعلى احتمالية لمطابقة المنح الدراسية في ثوانٍ."}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-16 py-7 rounded-[2.5rem] font-black text-2xl flex items-center gap-4 group shadow-2xl transition-all"
                >
                  <Sparkles size={28} />
                  {isEn ? 'Get Smart Match' : 'احصل على مطابقة ذكية'}
                </motion.button>
              </motion.div>
              <div className="hidden lg:block relative">
                 <motion.div 
                  initial={{ rotate: -5, y: 50 }}
                  whileInView={{ rotate: 5, y: -50 }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  className="bg-white/10 backdrop-blur-2xl p-10 rounded-[4rem] border border-white/20 shadow-3xl"
                 >
                    <div className="space-y-6">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl">?</div>
                            <div className="flex-1">
                               <div className="h-4 bg-white/20 rounded-full w-3/4 mb-3"></div>
                               <div className="h-4 bg-white/10 rounded-full w-1/2"></div>
                            </div>
                            <div className="text-indigo-200 font-black">98% Match</div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Mosaic */}
      <section className="py-40 text-center">
         <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4"
         >
            <h2 className="text-7xl md:text-9xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter">Your Future. Global.</h2>
            <p className="text-2xl text-slate-500 dark:text-slate-400 mb-16 font-medium">Join 250,000+ students on the path to academic greatness.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-indigo-600 text-white px-16 py-7 rounded-[3rem] font-black text-3xl shadow-3xl shadow-indigo-600/20"
               >
                 Sign Up Free
               </motion.button>
               <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 px-16 py-7 rounded-[3rem] font-black text-3xl"
               >
                 Contact Sales
               </motion.button>
            </div>
         </motion.div>
      </section>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 60s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
