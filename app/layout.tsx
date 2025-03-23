import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; 
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; 
import Header from "@/components/header"

// Import Google Fonts (Geist and Geist Mono) and assign them to CSS variables.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata for the application, including title, description, and icons.
export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "Consulta el clima en tiempo real", // "Check the weather in real-time"
  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
    apple: "/favicon.png", 
  },
};

// Define the RootLayout component, wrapping the entire application.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning> {/* Set the document language to Spanish */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Theme provider for dark/light mode support */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
         
          {/* Load the Leaflet OpenWeatherMap script lazily */}
          <Script
            src="https://unpkg.com/leaflet-openweathermap/leaflet-openweathermap.js"
            strategy="lazyOnload"
          />
          
          {/* Include the Header component */}
          <Header />
          
          {/* Main content section, ensuring it starts below the header */}
          <main 
            className="min-h-screen bg-background text-foreground pt-[var(--header-height)]">
            {children}
          </main>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
