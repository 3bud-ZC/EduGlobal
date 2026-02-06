
export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export enum Language {
  EN = 'en',
  AR = 'ar'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  PREMIUM = 'premium'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  nationality?: string;
  studyField?: string;
}

export interface Scholarship {
  id: string;
  titleEn: string;
  titleAr: string;
  universityEn: string;
  universityAr: string;
  countryEn: string;
  countryAr: string;
  degreeEn: string;
  degreeAr: string;
  fundingEn: string;
  fundingAr: string;
  deadline: string;
  fieldEn: string;
  fieldAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  isActive: boolean;
}

export interface Application {
  id: string;
  scholarshipId: string;
  userId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'REVISION';
  appliedAt: string;
  documentUrl?: string;
}

export interface TranslationStrings {
  [key: string]: {
    en: string;
    ar: string;
  };
}
