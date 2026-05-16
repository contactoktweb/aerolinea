'use client'

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { translations, Language } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function URLSync({ 
  language, 
  setLanguageState 
}: { 
  language: Language, 
  setLanguageState: (l: Language) => void 
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const langParam = searchParams.get('lang') as Language
    if (langParam && ['es', 'en', 'fr'].includes(langParam) && langParam !== language) {
      setLanguageState(langParam)
      document.documentElement.lang = langParam
    }
  }, [searchParams, language, setLanguageState])

  return null
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguageState] = useState<Language>('es')

  // Initial load from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    
    if (!urlLang && savedLang && ['es', 'en', 'fr'].includes(savedLang)) {
      setLanguageState(savedLang)
      document.documentElement.lang = savedLang
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang

    const params = new URLSearchParams(window.location.search)
    params.set('lang', lang)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const t = (key: string) => {
    const dict = translations[language] || translations.es
    return dict[key as keyof typeof translations.es] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <Suspense fallback={null}>
        <URLSync language={language} setLanguageState={setLanguageState} />
      </Suspense>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
