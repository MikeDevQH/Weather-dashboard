import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // ✅ Importa Script de Next.js
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; 
import Header from "@/components/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard del Clima",
  description: "Consulta el clima en tiempo real",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* ✅ Carga dinámica del script de Leaflet OpenWeatherMap */}
          <Script
            src="https://unpkg.com/leaflet-openweathermap/leaflet-openweathermap.js"
            strategy="lazyOnload"
          />
          <Header />
          <main 
          className="min-h-screen bg-background text-foreground pt-[var(--header-height)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
