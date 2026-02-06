
import { Scholarship, TranslationStrings } from './types';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: '1',
    titleEn: 'Global Excellence Scholarship 2024',
    titleAr: 'منحة التميز العالمي 2024',
    universityEn: 'University of Oxford',
    universityAr: 'جامعة أكسفورد',
    countryEn: 'United Kingdom',
    countryAr: 'المملكة المتحدة',
    degreeEn: 'Master\'s',
    degreeAr: 'ماجستير',
    fundingEn: 'Full Tuition',
    fundingAr: 'تمويل كامل',
    deadline: '2024-12-15',
    fieldEn: 'Data Science',
    fieldAr: 'علم البيانات',
    descriptionEn: 'The Global Excellence Scholarship is designed for high-achieving international students wishing to pursue advanced studies in Oxford.',
    descriptionAr: 'تم تصميم منحة التميز العالمي للطلاب الدوليين المتفوقين الراغبين في متابعة الدراسات المتقدمة في أكسفورد.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800',
    isActive: true,
  },
  {
    id: '2',
    titleEn: 'Khalifa University Graduate Scholarship',
    titleAr: 'منحة جامعة خليفة للدراسات العليا',
    universityEn: 'Khalifa University',
    universityAr: 'جامعة خليفة',
    countryEn: 'United Arab Emirates',
    countryAr: 'الإمارات العربية المتحدة',
    degreeEn: 'PhD',
    degreeAr: 'دكتوراه',
    fundingEn: 'Full Funding + Stipend',
    fundingAr: 'تمويل كامل + راتب شهري',
    deadline: '2024-11-30',
    fieldEn: 'Engineering',
    fieldAr: 'الهندسة',
    descriptionEn: 'Full support for international researchers focusing on sustainable energy and artificial intelligence.',
    descriptionAr: 'دعم كامل للباحثين الدوليين الذين يركزون على الطاقة المستدامة والذكاء الاصطناعي.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    isActive: true,
  },
  {
    id: '3',
    titleEn: 'German Academic Exchange Service (DAAD)',
    titleAr: 'خدمة التبادل الأكاديمي الألمانية (DAAD)',
    universityEn: 'Various Institutions',
    universityAr: 'مؤسسات مختلفة',
    countryEn: 'Germany',
    countryAr: 'ألمانيا',
    degreeEn: 'Master\'s',
    degreeAr: 'ماجستير',
    fundingEn: 'Monthly Stipend',
    fundingAr: 'راتب شهري',
    deadline: '2025-01-20',
    fieldEn: 'Public Policy',
    fieldAr: 'السياسة العامة',
    descriptionEn: 'Scholarships for students from developing countries for developmental-related postgraduate courses.',
    descriptionAr: 'منح دراسية للطلاب من الدول النامية للدورات الدراسية العليا المتعلقة بالتنمية.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    isActive: true,
  },
  {
    id: '4',
    titleEn: 'MEXT Japan Scholarship',
    titleAr: 'منحة الحكومة اليابانية (MEXT)',
    universityEn: 'University of Tokyo',
    universityAr: 'جامعة طوكيو',
    countryEn: 'Japan',
    countryAr: 'اليابان',
    degreeEn: 'Undergraduate',
    degreeAr: 'بكالوريوس',
    fundingEn: 'Full Scholarship',
    fundingAr: 'منحة كاملة',
    deadline: '2024-10-15',
    fieldEn: 'Medicine',
    fieldAr: 'الطب',
    descriptionEn: 'The Ministry of Education, Culture, Sports, Science and Technology offers scholarships to international students.',
    descriptionAr: 'تقدم وزارة التعليم والثقافة والرياضة والعلوم والتكنولوجيا منحاً دراسية للطلاب الدوليين.',
    image: 'https://images.unsplash.com/photo-1526367790999-015070013f50?auto=format&fit=crop&q=80&w=800',
    isActive: true,
  }
];

export const UNIVERSITIES = [
  { name: 'Oxford', logo: 'https://logo.clearbit.com/ox.ac.uk' },
  { name: 'Stanford', logo: 'https://logo.clearbit.com/stanford.edu' },
  { name: 'MIT', logo: 'https://logo.clearbit.com/mit.edu' },
  { name: 'Harvard', logo: 'https://logo.clearbit.com/harvard.edu' },
  { name: 'Cambridge', logo: 'https://logo.clearbit.com/cam.ac.uk' },
  { name: 'ETH Zurich', logo: 'https://logo.clearbit.com/ethz.ch' },
  { name: 'TUM', logo: 'https://logo.clearbit.com/tum.de' },
];

export const DESTINATIONS = [
  { nameEn: 'United Kingdom', nameAr: 'المملكة المتحدة', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400', count: 450 },
  { nameEn: 'Germany', nameAr: 'ألمانيا', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=400', count: 320 },
  { nameEn: 'Japan', nameAr: 'اليابان', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400', count: 180 },
  { nameEn: 'USA', nameAr: 'الولايات المتحدة', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=400', count: 670 },
];

export const TESTIMONIALS = [
  {
    nameEn: 'Sarah Johnson',
    nameAr: 'سارة جونسون',
    roleEn: 'Oxford Scholar',
    roleAr: 'باحثة في أكسفورد',
    textEn: 'EduGlobal helped me find the perfect fully-funded scholarship. The AI matching was surprisingly accurate!',
    textAr: 'ساعدني EduGlobal في العثور على المنحة المثالية الممولة بالكامل. كان مطابقة الذكاء الاصطناعي دقيقة بشكل مذهل!',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    nameEn: 'Mohammed Ali',
    nameAr: 'محمد علي',
    roleEn: 'DAAD Recipient',
    roleAr: 'حاصل على منحة DAAD',
    textEn: 'The process of applying for study abroad felt overwhelming until I started using this platform.',
    textAr: 'كانت عملية التقديم للدراسة في الخارج تشعر بالإرهاق حتى بدأت في استخدام هذه المنصة.',
    avatar: 'https://i.pravatar.cc/150?u=mohammed',
  }
];

export const RESOURCES = [
  {
    titleEn: 'How to Write a Winning Motivation Letter',
    titleAr: 'كيفية كتابة رسالة تحفيزية ناجحة',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    category: 'Application Tips',
    date: 'March 15, 2024'
  },
  {
    titleEn: 'Top 10 Fully Funded Scholarships in Europe',
    titleAr: 'أفضل 10 منح دراسية ممولة بالكامل في أوروبا',
    image: 'https://images.unsplash.com/photo-1473163928189-3f409f77a38a?auto=format&fit=crop&q=80&w=600',
    category: 'Lists',
    date: 'March 12, 2024'
  },
  {
    titleEn: 'Living Abroad: A Guide for Students',
    titleAr: 'العيش في الخارج: دليل للطلاب',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    category: 'Lifestyle',
    date: 'March 10, 2024'
  }
];

export const I18N_STRINGS: TranslationStrings = {
  nav_home: { en: 'Home', ar: 'الرئيسية' },
  nav_scholarships: { en: 'Scholarships', ar: 'المنح الدراسية' },
  nav_about: { en: 'About Us', ar: 'من نحن' },
  nav_contact: { en: 'Contact', ar: 'اتصل بنا' },
  nav_login: { en: 'Login', ar: 'تسجيل الدخول' },
  nav_register: { en: 'Register', ar: 'إنشاء حساب' },
  hero_title: { en: 'Your Future Starts with Global Education', ar: 'مستقبلك يبدأ بالتعليم العالمي' },
  hero_subtitle: { en: 'Discover thousands of fully-funded scholarships and world-class study programs tailored for your career goals.', ar: 'اكتشف آلاف المنح الدراسية الممولة بالكامل وبرامج الدراسات العالمية المصممة لأهدافك المهنية.' },
  search_placeholder: { en: 'Search by major, country, or university...', ar: 'ابحث حسب التخصص، البلد، أو الجامعة...' },
  featured_title: { en: 'Featured Scholarships', ar: 'منح دراسية مميزة' },
  deadline: { en: 'Deadline', ar: 'الموعد النهائي' },
  apply_now: { en: 'Apply Now', ar: 'قدّم الآن' },
  view_details: { en: 'View Details', ar: 'عرض التفاصيل' },
  student_dashboard: { en: 'Student Dashboard', ar: 'لوحة تحكم الطالب' },
  admin_panel: { en: 'Admin Panel', ar: 'لوحة التحكم للمسؤول' },
  saved_scholarships: { en: 'Saved', ar: 'المحفوظة' },
  applications: { en: 'Applications', ar: 'الطلبات' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  logout: { en: 'Logout', ar: 'تسجيل الخروج' },
  ai_helper_title: { en: 'AI Scholarship Matcher', ar: 'مساعد المنح الذكي' },
  ai_helper_desc: { en: 'Let our AI suggest the best scholarships based on your profile.', ar: 'دع ذكاءنا الاصطناعي يقترح أفضل المنح الدراسية بناءً على ملفك الشخصي.' }
};
