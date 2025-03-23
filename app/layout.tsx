import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script" 
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { LanguageProvider } from "@/components/language-provider"

// Load custom fonts and assign CSS variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Page metadata for SEO and accessibility
export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "Check the weather in real time",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

           {/* Theme provider for dark/light mode support */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* Language provider for localization handling */}
          <LanguageProvider>

            {/* Load Leaflet OpenWeatherMap script lazily */}
            <Script src="https://unpkg.com/leaflet-openweathermap/leaflet-openweathermap.js" strategy="lazyOnload" />

            <Header /> {/* Render main header */}

            {/* Main content area with dynamic styles */}
            <main className="min-h-screen bg-background text-foreground pt-[var(--header-height)]">{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

