
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, Bookmark, FileText, Bell, 
  User as UserIcon, LogOut, ChevronRight, 
  Search, Clock, CheckCircle2, AlertCircle, 
  XCircle, FileSearch, ArrowUpRight, MoreVertical,
  Award, Sparkles, BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AiAssistant from '../components/AiAssistant';

type DashboardTab = 'overview' | 'applications' | 'saved' | 'profile' | 'settings';

const Dashboard: React.FC = () => {
  const { t, user, setUser, isRtl, language } = useApp();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const isEn = language === 'en';

  const stats = [
    { label: isEn ? 'Applications' : 'الطلبات', value: '4', icon: <FileText className="text-indigo-600" /> },
    { label: isEn ? 'Saved Items' : 'المحفوظات', value: '12', icon: <Bookmark className="text-amber-500" /> },
    { label: isEn ? 'Interviews' : 'المقابلات', value: '1', icon: <Bell className="text-emerald-500" /> },
  ];

  const applications = [
    {
      id: 'app_1',
      titleEn: 'Global Excellence Scholarship',
      titleAr: 'منحة التميز العالمي',
      universityEn: 'University of Oxford',
      universityAr: 'جامعة أكسفورد',
      status: 'REVIEW',
      progress: 65,
      appliedDate: '2024-03-10',
      steps: [
        { labelEn: 'Submitted', labelAr: 'تم التقديم', status: 'completed' },
        { labelEn: 'Document Verification', labelAr: 'تدقيق المستندات', status: 'completed' },
        { labelEn: 'Academic Review', labelAr: 'المراجعة الأكاديمية', status: 'current' },
        { labelEn: 'Final Decision', labelAr: 'القرار النهائي', status: 'upcoming' },
      ]
    },
    {
      id: 'app_2',
      titleEn: 'Khalifa University PhD Program',
      titleAr: 'برنامج الدكتوراه بجامعة خليفة',
      universityEn: 'Khalifa University',
      universityAr: 'جامعة خليفة',
      status: 'PENDING_DOCS',
      progress: 25,
      appliedDate: '2024-03-15',
      steps: [
        { labelEn: 'Submitted', labelAr: 'تم التقديم', status: 'completed' },
        { labelEn: 'Document Verification', labelAr: 'تدقيق المستندات', status: 'warning' },
        { labelEn: 'Academic Review', labelAr: 'المراجعة الأكاديمية', status: 'upcoming' },
        { labelEn: 'Final Decision', labelAr: 'القرار النهائي', status: 'upcoming' },
      ]
    },
    {
      id: 'app_3',
      titleEn: 'MEXT Japan Undergraduate',
      titleAr: 'منحة الحكومة اليابانية',
      universityEn: 'University of Tokyo',
      universityAr: 'جامعة طوكيو',
      status: 'REJECTED',
      progress: 100,
      appliedDate: '2024-02-01',
      steps: [
        { labelEn: 'Submitted', labelAr: 'تم التقديم', status: 'completed' },
        { labelEn: 'Document Verification', labelAr: 'تدقيق المستندات', status: 'completed' },
        { labelEn: 'Academic Review', labelAr: 'المراجعة الأكاديمية', status: 'completed' },
        { labelEn: 'Final Decision', labelAr: 'القرار النهائي', status: 'error' },
      ]
    },
    {
      id: 'app_4',
      titleEn: 'DAAD Scholarship Germany',
      titleAr: 'منحة داد الألمانية',
      universityEn: 'Technical University of Munich',
      universityAr: 'جامعة ميونيخ التقنية',
      status: 'ACCEPTED',
      progress: 100,
      appliedDate: '2024-01-20',
      steps: [
        { labelEn: 'Submitted', labelAr: 'تم التقديم', status: 'completed' },
        { labelEn: 'Document Verification', labelAr: 'تدقيق المستندات', status: 'completed' },
        { labelEn: 'Academic Review', labelAr: 'المراجعة الأكاديمية', status: 'completed' },
        { labelEn: 'Final Decision', labelAr: 'القرار النهائي', status: 'success' },
      ]
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <UserIcon size={40} />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">{isEn ? 'Access Denied' : 'غير مصرح بالدخول'}</h2>
          <p className="text-slate-500 mb-8">{isEn ? 'Please login to access your personal dashboard and track applications.' : 'يرجى تسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك وتتبع الطلبات.'}</p>
          <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
            {isEn ? 'Sign In Now' : 'تسجيل الدخول الآن'}
          </button>
        </div>
      </div>
    );
  }

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'REVIEW':
        return <span className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><Clock size={12}/> {isEn ? 'Review' : 'قيد المراجعة'}</span>;
      case 'PENDING_DOCS':
        return <span className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><FileSearch size={12}/> {isEn ? 'Docs Pending' : 'نقص مستندات'}</span>;
      case 'REJECTED':
        return <span className="bg-rose-50 text-rose-600 dark:bg-rose-900/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><XCircle size={12}/> {isEn ? 'Rejected' : 'مرفوض'}</span>;
      case 'ACCEPTED':
        return <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1.5"><CheckCircle2 size={12}/> {isEn ? 'Accepted' : 'مقبول'}</span>;
      default:
        return null;
    }
  };

  const menuItems = [
    { id: 'overview', name: isEn ? 'Dashboard' : 'لوحة التحكم', icon: <LayoutDashboard size={20} /> },
    { id: 'applications', name: isEn ? 'My Applications' : 'طلباتي', icon: <FileText size={20} /> },
    { id: 'saved', name: isEn ? 'Saved Items' : 'المحفوظات', icon: <Bookmark size={20} /> },
    { id: 'profile', name: isEn ? 'Academic Profile' : 'الملف الأكاديمي', icon: <UserIcon size={20} /> },
    { id: 'settings', name: isEn ? 'Preferences' : 'التفضيلات', icon: <Bell size={20} /> },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col md:flex-row relative">
      <aside className={`w-full md:w-80 bg-white dark:bg-slate-900 border-b md:border-b-0 ${isRtl ? 'md:border-l' : 'md:border-r'} border-slate-200 dark:border-slate-800 p-8 flex flex-col z-20`}>
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-600/30 overflow-hidden">
               {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt={user.name}/> : user.name.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-lg">
               <CheckCircle2 size={14} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center leading-tight">{user.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">{user.nationality || 'Student'}</p>
        </div>

        <nav className="space-y-3 flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as DashboardTab)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-sm transition-all group ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                {item.name}
              </div>
              <ChevronRight size={16} className={`${activeTab === item.id ? 'opacity-100' : 'opacity-0'} ${isRtl ? 'rotate-180' : ''} transition-all`} />
            </button>
          ))}
        </nav>

        <button
          onClick={() => setUser(null)}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all mt-10"
        >
          <LogOut size={20} />
          {isEn ? 'Logout Session' : 'تسجيل الخروج'}
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-14 overflow-y-auto no-scrollbar">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-14">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
              {activeTab === 'overview' ? `${isEn ? 'Welcome back' : 'مرحباً بعودتك'}, ${user.name.split(' ')[0]}!` : menuItems.find(m => m.id === activeTab)?.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
              {activeTab === 'overview' 
                ? (isEn ? "You've made great progress this month. Keep it up!" : "لقد حققت تقدماً رائعاً هذا الشهر. استمر في ذلك!") 
                : (isEn ? "Manage and monitor your academic journey here." : "إدارة ومراقبة رحلتك الأكاديمية من هنا.")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all relative group shadow-sm">
              <Bell size={24} />
              <span className="absolute top-4 right-4 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 group-hover:animate-ping"></span>
            </button>
            <div className="hidden sm:block h-12 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <div className="hidden sm:flex items-center gap-3">
               <div className="text-right rtl:text-left">
                  <p className="text-sm font-black text-slate-900 dark:text-white leading-none">Status: Premium</p>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Active Account</p>
               </div>
               <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600">
                  <Award size={20} />
               </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      {React.cloneElement(stat.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                    </div>
                    <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* AI Advisor Call to Action Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/30 shrink-0">
                    <BrainCircuit size={48} className="text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left rtl:md:text-right">
                    <h3 className="text-3xl font-black mb-2">{isEn ? 'Personal AI Consultation' : 'استشارة ذكاء اصطناعي شخصية'}</h3>
                    <p className="text-indigo-100 font-medium text-lg max-w-2xl">
                      {isEn 
                        ? 'Unlock hidden scholarship opportunities and get expert feedback on your academic profile instantly.' 
                        : 'اكتشف فرص المنح الدراسية الخفية واحصل على تعليقات الخبراء حول ملفك الأكاديمي فوراً.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsAiOpen(true)}
                    className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all flex items-center gap-3 shadow-xl active:scale-95 shrink-0"
                  >
                    <Sparkles size={20} />
                    {isEn ? 'Start Chat' : 'ابدأ الدردشة'}
                  </button>
                </div>
              </motion.div>

              <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{isEn ? 'Recent Activity' : 'النشاط الأخير'}</h3>
                    <p className="text-slate-500 font-bold text-sm mt-1">{isEn ? 'Track your active scholarship cycles' : 'تتبع دورات المنح الدراسية النشطة الخاصة بك'}</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all flex items-center gap-2"
                  >
                    {isEn ? 'Full Tracking View' : 'عرض التتبع الكامل'}
                    <ArrowUpRight size={18} />
                  </button>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left rtl:text-right">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                        <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">{isEn ? 'Scholarship / Program' : 'المنحة / البرنامج'}</th>
                        <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">{isEn ? 'Current Status' : 'الحالة الحالية'}</th>
                        <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">{isEn ? 'Applied On' : 'تاريخ التقديم'}</th>
                        <th className="px-10 py-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {applications.slice(0, 3).map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-indigo-600 text-lg">
                                  {app.universityEn.charAt(0)}
                               </div>
                               <div>
                                  <div className="font-black text-slate-900 dark:text-white text-lg">{isEn ? app.titleEn : app.titleAr}</div>
                                  <div className="text-sm text-slate-500 font-bold">{isEn ? app.universityEn : app.universityAr}</div>
                               </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            {renderStatusBadge(app.status)}
                          </td>
                          <td className="px-10 py-8 text-sm font-black text-slate-500 uppercase tracking-tighter">{app.appliedDate}</td>
                          <td className="px-10 py-8 text-right rtl:text-left">
                            <button className="text-slate-300 hover:text-indigo-600 transition-all p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                              <ChevronRight size={24} className={isRtl ? 'rotate-180' : ''} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {applications.map((app) => (
                <div 
                  key={app.id} 
                  className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="flex items-center gap-6">
                       <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center text-indigo-600">
                          <Building2 className="w-10 h-10" />
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                                {isEn ? app.titleEn : app.titleAr}
                             </h3>
                             {renderStatusBadge(app.status)}
                          </div>
                          <p className="text-lg text-slate-500 font-bold">{isEn ? app.universityEn : app.universityAr}</p>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                       <button className="flex-1 lg:flex-none bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                          {isEn ? 'View Details' : 'عرض التفاصيل'}
                       </button>
                       <button className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 rounded-2xl transition-all">
                          <MoreVertical size={20} />
                       </button>
                    </div>
                  </div>

                  <div className="px-10 pb-10">
                     <div className="mb-10 flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{isEn ? 'Application Progress' : 'تقدم الطلب'}</p>
                           <div className="text-3xl font-black text-slate-900 dark:text-white">{app.progress}% <span className="text-slate-400 text-sm font-bold">{isEn ? 'Completed' : 'مكتمل'}</span></div>
                        </div>
                        <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl">
                           {app.appliedDate}
                        </p>
                     </div>
                     
                     <div className="relative pt-8 pb-4">
                        <div className="absolute top-[4.5rem] left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div 
                              className={`h-full bg-indigo-600 transition-all duration-1000 ${app.status === 'REJECTED' ? 'bg-rose-500' : ''}`}
                              style={{ width: `${app.progress}%` }}
                           />
                        </div>

                        <div className="relative flex justify-between items-start">
                           {app.steps.map((step, idx) => {
                             let icon = <Clock size={20} />;
                             let colorClass = 'bg-slate-100 dark:bg-slate-800 text-slate-400';
                             let labelClass = 'text-slate-400';

                             if (step.status === 'completed' || step.status === 'success') {
                               icon = <CheckCircle2 size={20} />;
                               colorClass = 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20';
                               labelClass = 'text-slate-900 dark:text-white font-black';
                             } else if (step.status === 'current') {
                               icon = <Loader2 size={20} className="animate-spin" />;
                               colorClass = 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 border-2 border-indigo-600';
                               labelClass = 'text-indigo-600 dark:text-indigo-400 font-black';
                             } else if (step.status === 'warning') {
                               icon = <AlertCircle size={20} />;
                               colorClass = 'bg-amber-500 text-white shadow-lg shadow-amber-500/20';
                               labelClass = 'text-amber-600 font-black';
                             } else if (step.status === 'error') {
                               icon = <XCircle size={20} />;
                               colorClass = 'bg-rose-500 text-white shadow-lg shadow-rose-500/20';
                               labelClass = 'text-rose-500 font-black';
                             }

                             return (
                               <div key={idx} className="flex flex-col items-center text-center max-w-[120px] group">
                                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 z-10 transition-transform group-hover:scale-110 ${colorClass}`}>
                                     {icon}
                                  </div>
                                  <span className={`text-xs uppercase tracking-widest font-bold leading-tight ${labelClass}`}>
                                     {isEn ? step.labelEn : step.labelAr}
                                  </span>
                               </div>
                             );
                           })}
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab !== 'overview' && activeTab !== 'applications' && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
            >
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 mb-8">
                 <Search size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Section Under Development</h3>
              <p className="text-slate-500 font-medium">We're building something amazing here. Please check back later.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AiAssistant forceOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      
      <style>{`
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

export default Dashboard;

const Building2 = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>
);

const Loader2 = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v4"/>
    <path d="m16.2 7.8 2.9-2.9"/>
    <path d="M18 12h4"/>
    <path d="m16.2 16.2 2.9 2.9"/>
    <path d="M12 18v4"/>
    <path d="m4.9 19.1 2.9-2.9"/>
    <path d="M2 12h4"/>
    <path d="m4.9 4.9 2.9 2.9"/>
  </svg>
);
