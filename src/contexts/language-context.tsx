"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { type Locale } from '@/i18n/locales'
import { translations } from '@/i18n/translations'

type LanguageContextType = {
  currentLocale: Locale
  setLanguage: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

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
    let current: any = translations[currentLocale]
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in locale: ${currentLocale}`)
        return path
      }
      current = current[key]
    }
    
    return current
  }

  return (
    <LanguageContext.Provider value={{ currentLocale, setLanguage, t }}>
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