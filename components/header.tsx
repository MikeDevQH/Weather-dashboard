"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { CloudRain, Search } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 h-[var(--header-height)] bg-card border-b border-border z-50 px-4 md:px-6 transition-all duration-300">
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudRain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Weather Dashboard</h1>
          </div>
          <div className="w-9 h-9"></div> {/* Placeholder para evitar saltos */}
        </div>
      </header>
    )
  }

  return (
    <header className=" fixed top-0 left-0 right-0 h-[var(--header-height)] bg-card border-b border-border z-50 px-4 md:px-6 shadow-sm transition-all duration-300">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <CloudRain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-tex">
            Weather Dashboard
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Buscador */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Buscar ciudad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-64 h-9 pl-9 pr-3 rounded-full bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          </form>

          {/* Botón de búsqueda para móviles */}
          <Link
            href="/search"
            className="md:hidden p-2 rounded-full bg-background border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <Search className="h-5 w-5 text-primary" />
          </Link>

          {/* Switch de tema */}
          <div className="flex items-center">
            <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="theme-toggle"
                className="sr-only"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <div
                className={`w-11 h-6 rounded-full transition-all duration-300 ${
                  theme === "dark" ? "bg-primary" : "bg-primary/20"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-primary/20" : "bg-primary/20"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </header>
  )
}

