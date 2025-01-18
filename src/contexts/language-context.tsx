"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { type Locale } from '@/i18n/locales'
import { translations } from '@/i18n/translations'

interface LanguageContextType {
  language: string;
  setLanguage: (language: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// 定义递归的翻译类型
type TranslationValue = string | { [key: string]: TranslationValue };

type TranslationType = {
  [K in Locale]: {
    [key: string]: TranslationValue;
  };
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en')

  const setLanguage = (locale: Locale) => {
    setCurrentLocale(locale)
    localStorage.setItem('preferred-locale', locale)
  }

  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale') as Locale | null
    if (savedLocale) {
      setCurrentLocale(savedLocale)
    }
  }, [])

  const t = (path: string): string => {
    const keys = path.split('.')
    let current: TranslationValue = translations[currentLocale]
    
    for (const key of keys) {
      if (typeof current !== 'object' || current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in locale: ${currentLocale}`)
        return path
      }
      current = current[key]
    }
    
    return typeof current === 'string' ? current : path
  }

  return (
    <LanguageContext.Provider value={{ 
      language: currentLocale, 
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 