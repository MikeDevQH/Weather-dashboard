"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {theme === "dark" ? <DarkBackground /> : <LightBackground />}
    </div>
  )
}

// Background for light mode - More defined clouds and sky
function LightBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50">
      {/* Sun */}
      <div className="absolute top-20 right-[10%] w-32 h-32 bg-yellow-300 rounded-full opacity-90 blur-md animate-pulse shadow-lg shadow-yellow-200/50">
        <div className="absolute inset-4 bg-yellow-100 rounded-full blur-sm"></div>
      </div>

      {/* Sun rays */}
      <div className="absolute top-20 right-[10%] w-48 h-48 opacity-60">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1.5 h-20 bg-yellow-300 blur-sm origin-top"
            style={{
              transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
              animation: `rayPulse 8s infinite ${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* More defined clouds */}
      <div className="absolute inset-0">
        {/* Large clouds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 30 + 5}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatCloud ${Math.random() * 60 + 80}s linear infinite`,
              animationDelay: `${Math.random() * -60}s`,
            }}
          >
            <div className="cloud-cluster">
              <div className="cloud-part absolute bg-white rounded-full w-24 h-24 shadow-lg shadow-gray-200/30"></div>
              <div className="cloud-part absolute bg-white rounded-full w-32 h-32 -left-10 top-6 shadow-lg shadow-gray-200/30"></div>
              <div className="cloud-part absolute bg-white rounded-full w-28 h-28 left-12 top-4 shadow-lg shadow-gray-200/30"></div>
              <div className="cloud-part absolute bg-white rounded-full w-20 h-20 left-6 -top-6 shadow-lg shadow-gray-200/30"></div>
            </div>
          </div>
        ))}

        {/* Medium clouds */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i + "medium"}
            className="absolute"
            style={{
              top: `${Math.random() * 40 + 35}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.4 + 0.6})`,
              animation: `floatCloud ${Math.random() * 50 + 70}s linear infinite`,
              animationDelay: `${Math.random() * -50}s`,
            }}
          >
            <div className="cloud-cluster opacity-80">
              <div className="cloud-part absolute bg-white rounded-full w-20 h-20"></div>
              <div className="cloud-part absolute bg-white rounded-full w-24 h-24 -left-8 top-4"></div>
              <div className="cloud-part absolute bg-white rounded-full w-20 h-20 left-8 top-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Occasionally flying birds */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i + "bird"}
          className="absolute"
          style={{
            top: `${Math.random() * 30 + 15}%`,
            left: `${Math.random() * 100}%`,
            animation: `flyBird ${Math.random() * 30 + 40}s linear infinite`,
            animationDelay: `${Math.random() * -20}s`,
          }}
        >
          <div className="relative">
            <div className="bird-wing absolute w-6 h-2 bg-gray-700 rounded-full transform -rotate-12 animate-birdWing"></div>
            <div className="bird-wing absolute w-6 h-2 bg-gray-700 rounded-full transform rotate-12 animate-birdWing2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Background for dark mode - Stars, moon, and dark clouds
function DarkBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#1c2541] to-[#0a1128]">
      {/* Moon */}
      <div className="absolute top-20 right-[15%] w-24 h-24 bg-blue-100 rounded-full opacity-90 blur-sm shadow-lg shadow-blue-100/30">
        <div className="absolute -right-2 -top-2 w-16 h-16 bg-[#0a1128] rounded-full blur-sm"></div>
      </div>

      {/* Stars */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * -5}s`,
          }}
        ></div>
      ))}

      {/* Occasional shooting stars */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i + "shooting"}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 80}%`,
            opacity: 0,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 0 3px rgba(255,255,255,0.1), 0 0 8px rgba(255,255,255,0.3)",
            animation: `shootingStar ${Math.random() * 10 + 20}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 15}s`,
          }}
        ></div>
      ))}

      {/* Dark clouds */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={i + "darkcloud"}
            className="absolute"
            style={{
              top: `${Math.random() * 30 + 5}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.6,
              filter: "blur(2px)",
              animation: `floatDarkCloud ${Math.random() * 80 + 100}s linear infinite`,
              animationDelay: `${Math.random() * -60}s`,
            }}
          >
            <div className="cloud-cluster">
              <div className="cloud-part absolute bg-gray-800 rounded-full w-24 h-24"></div>
              <div className="cloud-part absolute bg-gray-800 rounded-full w-32 h-32 -left-10 top-6"></div>
              <div className="cloud-part absolute bg-gray-800 rounded-full w-28 h-28 left-12 top-4"></div>
              <div className="cloud-part absolute bg-gray-800 rounded-full w-20 h-20 left-6 -top-6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
