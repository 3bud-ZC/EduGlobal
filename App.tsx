
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ScholarshipListing from './pages/ScholarshipListing';
import ScholarshipDetail from './pages/ScholarshipDetail';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Role } from './types';
import { Link } from 'react-router-dom';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-slate-900 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
                <span className="text-2xl font-bold text-white">EduGlobal</span>
              </div>
              <p className="max-w-sm leading-relaxed text-sm">
                Empowering international students to achieve their academic dreams through accessible information and secure AI-powered scholarship matching.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
                <li><Link to="/scholarships" className="hover:text-indigo-400 transition-colors">Scholarships</Link></li>
                <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-800 text-center text-xs">
            &copy; {new Date().getFullYear()} EduGlobal Hub. All rights reserved. SECURE DEPLOYMENT v2.0
          </div>
        </div>
      </footer>
    </div>
  );
};

const AuthPage: React.FC<{ mode: 'login' | 'register' }> = ({ mode }) => {
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleAuth = () => {
    // Simulate real Auth for local dev until NextAuth is fully wired
    setUser({
      id: '1',
      name: 'Ahmed Khalil',
      email: 'ahmed@example.com',
      role: Role.STUDENT,
      nationality: 'Jordanian',
      studyField: 'Engineering'
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-500 text-center mb-8 font-medium">Access your personalized academic portal.</p>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
            <input type="email" placeholder="name@domain.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white font-medium" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white font-medium" />
          </div>
          <button
            onClick={handleAuth}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none transition-all mt-4 active:scale-95"
          >
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          {mode === 'login' ? "New to EduGlobal?" : "Already have an account?"}
          <button 
            onClick={() => navigate(mode === 'login' ? '/register' : '/login')}
            className="text-indigo-600 font-black ml-2 hover:underline"
          >
            {mode === 'login' ? 'Create one now' : 'Sign in here'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Placeholder components for About/Contact
const AboutPage = () => <div className="p-20 text-center"><h1 className="text-4xl font-black">About EduGlobal</h1><p className="mt-4 text-slate-500">Revolutionizing access to international education.</p></div>;
const ContactPage = () => <div className="p-20 text-center"><h1 className="text-4xl font-black">Contact Us</h1><p className="mt-4 text-slate-500">Reach out at support@eduglobal.hub</p></div>;

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scholarships" element={<ScholarshipListing />} />
            <Route path="/scholarship/:id" element={<ScholarshipDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageLayout>
      </Router>
    </AppProvider>
  );
};

export default App;
