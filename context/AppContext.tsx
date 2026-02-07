
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, User, Role } from '../types';
import { I18N_STRINGS } from '../constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  t: (key: string) => string;
  isRtl: boolean;
  savedScholarshipIds: string[];
  toggleSaveScholarship: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [user, setUser] = useState<User | null>(null);
  const [savedScholarshipIds, setSavedScholarshipIds] = useState<string[]>([]);

  // Load persistence
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedLang) setLanguage(savedLang);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', language);
    localStorage.setItem('theme', theme);
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme]);

  const t = (key: string) => {
    return I18N_STRINGS[key] ? I18N_STRINGS[key][language] : key;
  };

  const toggleSaveScholarship = async (id: string) => {
    // In real build, this would be a fetch('/api/saved')
    setSavedScholarshipIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      theme, setTheme, 
      user, setUser, 
      t, isRtl: language === Language.AR,
      savedScholarshipIds, toggleSaveScholarship 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
