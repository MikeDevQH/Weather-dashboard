"use client";

import type React from "react";

import { useTheme } from "next-themes";
import { CloudRain, Search, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { languages, useLanguage } from "@/lib/languageContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Obtener el idioma actual
  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cerrar el menú de idiomas al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/`);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsLanguageMenuOpen(false);
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 h-[var(--header-height)] bg-card border-b border-border z-50 px-4 md:px-6 transition-all duration-300">
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudRain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{t("title")}</h1>
          </div>
          <div className="w-9 h-9"></div> {/* Placeholder para evitar saltos */}
        </div>
      </header>
    );
  }

  return (
    <header className=" fixed top-0 left-0 right-0 h-[var(--header-height)] bg-card border-b border-border z-50 px-4 md:px-6 shadow-sm transition-all duration-300">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2" >
          <CloudRain className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">{t("title")}</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Buscador */}
          <form
            onSubmit={handleSearch}
            className="relative hidden md:block group transition-all duration-300 text-sm hover:scale-102"
          >
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-48 lg:w-64 h-9 pl-9 pr-3 rounded-full 
      bg-background ring-2 text-black
      focus:outline-none   
      focus:bg-card-hover
      hover:bg-card-hover
      transition-all duration-200 
 
      ${
        theme === "dark"
          ? "bg-background border text-primary font-extrabold shadow-lg dark:shadow-xl   "
          : "bg-background border text-primary font-extrabold shadow-lg dark:shadow-xl   "
      }
    `}
            />
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5
      transition-colors  text-primary font-extrabold duration-200
      ${
        searchQuery ? "text-primary" : "text-muted group-hover:text-primary/70"
      }`}
            />
            {searchQuery && (
              <button
                type="submit"
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full 
        bg-primary/10 hover:bg-primary/20 text-primary
         transform hover:scale-110 transition-all duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </form>

          {/* Botón de búsqueda para móviles */}
          <Link
            href="/search"
            className={`md:hidden p-2 rounded-full 
    transition-all duration-300 transform hover:scale-110
    ${
      theme === "dark"
        ? "bg-card border border-border hover:border-accent hover:bg-accent/20 shadow-md"
        : "bg-background border border-border hover:border-primary hover:bg-primary/10 shadow-sm"
    }`}
          >
            <Search
              className={`h-5 w-5 ${
                theme === "dark" ? "text-accent" : "text-primary"
              }`}
            />
          </Link>

          {/* Switch de tema moderno con sol/luna */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`relative w-16 h-8 rounded-full overflow-hidden transition-all duration-300 ring-2 ${
              theme === "dark"
                ? "bg-background  border text-primary font-extrabold shadow-lg dark:shadow-xl"
                : "bg-background border text-primary font-extrabold shadow-lg dark:shadow-xl"
            }`}
            aria-label={t("themeToggle")}
          >
            {/* Fondo del interruptor */}
            <div className="absolute inset-0 flex items-center justify-between px-1.5">
              {/* Lado del sol */}
              <div
                className={`w-5 h-5 flex items-center justify-center text-primary ${
                  theme === "dark" ? "opacity-50" : "opacity-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              </div>

              {/* Lado de la luna */}
              <div
                className={`w-5 h-5 flex items-center justify-center text-accent ${
                  theme === "dark" ? "opacity-100" : "opacity-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Círculo deslizante */}
            <div
              className={`absolute top-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                theme === "dark"
                  ? "translate-x-9 bg-accent"
                  : "translate-x-1 bg-primary"
              }`}
            >
              {/* Icono dentro del círculo */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>

{/* Selector de idioma */}
<div className="relative" ref={languageMenuRef}>
  <button
    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
    className={`flex items-center gap-1 px-2 py-1.5 rounded-md transition-all duration-300 ring-2
      ${theme === "dark"
        ? "bg-background border text-primary font-extrabold hover:opacity-90 hover:border-accent shadow-lg dark:shadow-xl hover:scale-110"
        : "bg-background border text-primary font-extrabold hover:opacity-90 hover:border-accent shadow-lg dark:shadow-xl hover:scale-110"
      }`}
    aria-label="Seleccionar idioma"
    aria-expanded={isLanguageMenuOpen}
  >
    <span className="text-lg">{currentLanguage.flag}</span>
    <span className="hidden md:inline text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
    <ChevronDown
      className={`h-4 w-4 transition-transform duration-300 ${isLanguageMenuOpen ? "rotate-180" : ""}`}
    />
  </button>

  {/* Menú desplegable de idiomas */}
  <div
    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border border-border overflow-hidden transition-all duration-300 origin-top-right
      ${isLanguageMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
  >
    <div className="py-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-300 rounded-md
            ${currentLanguage.code === lang.code
              ? theme === "dark"
                ? "bg-accent/30 text-accent font-bold"
                : "bg-primary/30 text-primary font-bold"
              : "text-foreground"
            }
            ${theme === "dark"
              ? "hover:bg-[rgb(20,32,58)] hover:text-accent" // Hover en modo oscuro
              : "hover:bg-[rgb(236,241,245)] hover:text-primary"} // Hover en modo claro
            hover:scale-105 hover:shadow-md`}
        >
          <span className="mr-2 text-lg">{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  </div>
</div>


      </div>
    </header>
  );
}
