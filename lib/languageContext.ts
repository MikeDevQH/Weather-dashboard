"use client"

import { createContext, useContext } from "react"
import esTranslations from "@/locales/es.json"
import enTranslations from "@/locales/en.json"

// Definir los idiomas disponibles
export const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

// Definir las traducciones
export const translations = {
  es: esTranslations,
  en: enTranslations,
}

// Tipo para el contexto
export type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

// Crear el contexto
export const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: () => "",
})

// Hook personalizado para usar el contexto
export const useLanguage = () => useContext(LanguageContext)

