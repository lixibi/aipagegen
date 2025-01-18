"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { type Locale } from '@/i18n/locales'
import { translations } from '@/i18n/translations'

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

// 定义翻译对象的类型
type TranslationType = {
  [K in Locale]: {
    [key: string]: string | { [key: string]: string | { [key: string]: string } }
  }
}

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

  const t = (path: string) => {
    const keys = path.split('.')
    let current: TranslationType[Locale] = translations[currentLocale]
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in locale: ${currentLocale}`)
        return path
      }
      current = current[key] as typeof current
    }
    
    return current as string
  }

  return (
    <LanguageContext.Provider value={{ language: currentLocale, setLanguage }}>
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