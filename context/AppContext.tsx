import React, { createContext, useContext, useMemo, useState } from "react";

export type AppUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: "guest" | "student" | "admin";
};

export type ThemeMode = "light" | "dark";
export type Language = "en" | "ar";

export type AppState = {
  user: AppUser | null;
  setUser: (u: AppUser | null) => void;

  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;

  lang: Language;
  setLang: (l: Language) => void;

  savedScholarshipIds: string[];
  toggleSavedScholarship: (id: string) => void;
};

const defaultState: AppState = {
  user: null,
  setUser: () => {},

  theme: "light",
  setTheme: () => {},

  lang: "en",
  setLang: () => {},

  savedScholarshipIds: [],
  toggleSavedScholarship: () => {},
};

export const AppContext = createContext<AppState>(defaultState);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [lang, setLang] = useState<Language>("en");
  const [savedScholarshipIds, setSavedScholarshipIds] = useState<string[]>([]);

  const toggleSavedScholarship = (id: string) => {
    setSavedScholarshipIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      theme,
      setTheme,
      lang,
      setLang,
      savedScholarshipIds,
      toggleSavedScholarship,
    }),
    [user, theme, lang, savedScholarshipIds]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}

// default export (just in case App.tsx imports default)
export default AppContext;
