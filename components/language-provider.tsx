"use client"

import { type ReactNode, useState } from "react"
import { LanguageContext, translations } from "@/lib/languageContext"

// Función para obtener una clave anidada en el objeto de traducciones
const getNestedTranslation = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path;
};

// Proveedor del contexto
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("es")

  // Función para obtener traducciones, ahora soporta claves anidadas
  const t = (key: string) => {
    const currentTranslations = translations[language as keyof typeof translations]
    return getNestedTranslation(currentTranslations, key);
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
