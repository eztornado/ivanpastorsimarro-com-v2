import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './es.json';
import en from './en.json';
import ja from './ja.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    ja: { translation: ja },
  },
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  load: 'languageOnly',
  supportedLngs: ['es', 'en', 'ja'],
  detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
});

export type Locale = 'es' | 'en' | 'ja';

export function toLocale(lng: string): Locale {
  return lng.startsWith('es') ? 'es' : lng.startsWith('ja') ? 'ja' : 'en';
}

export default i18n;
