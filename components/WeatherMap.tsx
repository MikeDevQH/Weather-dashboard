"use client"
import dynamic from "next/dynamic"
import { useState } from "react"
import "leaflet/dist/leaflet.css"
import { getWeatherLayerUrl } from "@/lib/weatherLayers"
import LayerSelector from "@/components/layerSelector"

// Import dinámico sin SSR
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false })

const WeatherMap = () => {
  const [activeLayer, setActiveLayer] = useState<string>("temp_new")
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

  if (!API_KEY) {
    return (
      <div className="bg-card rounded-lg shadow-card border border-border p-4 text-[hsl(var(--color-danger))] transition-all duration-300">
        Error: Falta la clave API de OpenWeatherMap
      </div>
    )
  }

  return (
    <div className=" shadow-lg dark:shadow-xl bg-card rounded-lg shadow-card border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <div className="p-4 border-b border-border bg-gradient-primary">
        <LayerSelector activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
      </div>
      <div className="relative w-full h-[400px] md:h-[500px]">
        <MapContainer style={{ height: "100%", width: "100%" }} center={[20, -100]} zoom={5} className="z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />
          <TileLayer url={getWeatherLayerUrl(activeLayer, API_KEY)} />
        </MapContainer>
      </div>
     
    </div>
  )
}

export default WeatherMap

