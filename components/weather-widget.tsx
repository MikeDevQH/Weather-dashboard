"use client"

import { useEffect, useState } from "react"
import { getWeatherByCoords } from "@/lib/getWeather"
import { getUserLocation } from "@/lib/getUserLocation"

const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true)
        const { lat, lon } = await getUserLocation()
        const data = await getWeatherByCoords(lat, lon)
        if (!data) throw new Error("No se pudieron obtener los datos del clima.")
        setWeather(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-40 bg-card rounded-lg shadow-card border border-border flex items-center justify-center transition-all duration-300">
        <div className="animate-pulse text-muted">Cargando clima...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full bg-card rounded-lg shadow-card border border-border p-4 text-[hsl(var(--color-danger))] transition-all duration-300">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover w-full md:max-w-2xl">
      <div className="p-4 md:p-6 bg-gradient-primary text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {weather.city}, {weather.country}
            </h3>
            <p className="text-white/80 text-sm mt-1">ID Ciudad: {weather.id}</p>
          </div>
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">{Math.round(weather.temperature)}°C</span>
            <span className="text-white/80 capitalize">{weather.description}</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-3">
        {/* Temperatura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/01d.png`}
            label="Temperatura"
            value={`${weather.temperature}°C`}
            highlight
          />
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/01n.png`}
            label="Temp. Mínima"
            value={`${weather.tempMin}°C`}
          />
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/01d.png`}
            label="Temp. Máxima"
            value={`${weather.tempMax}°C`}
            highlight
          />
        </div>

        {/* Condiciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/50d.png`}
            label="Humedad"
            value={`${weather.humidity}%`}
          />
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/50n.png`}
            label="Presión"
            value={`${weather.pressure} hPa`}
            highlight
          />
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/10d.png`}
            label="Viento"
            value={`${weather.windSpeed} m/s (${weather.windDirection}°)`}
          />
        </div>

        {/* Visibilidad y Nubosidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/50d.png`}
            label="Visibilidad"
            value={`${weather.visibility} km`}
            highlight
          />
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/04d.png`}
            label="Nubosidad"
            value={`${weather.clouds}%`}
          />
        </div>

        {/* Lluvia y Nieve (condicionales) */}
        {(weather.rainLastHour > 0 || weather.snowLastHour > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {weather.rainLastHour > 0 && (
              <WeatherItem
                icon={`https://openweathermap.org/img/wn/09d.png`}
                label="Lluvia última hora"
                value={`${weather.rainLastHour} mm`}
                highlight
              />
            )}
            {weather.snowLastHour > 0 && (
              <WeatherItem
                icon={`https://openweathermap.org/img/wn/13d.png`}
                label="Nieve última hora"
                value={`${weather.snowLastHour} mm`}
              />
            )}
          </div>
        )}

        {/* Amanecer y Atardecer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/01d.png`}
            label="Amanecer"
            value={new Date(weather.sunrise * 1000).toLocaleTimeString()}
            highlight
          />
          <WeatherItem
            icon={`https://openweathermap.org/img/wn/01n.png`}
            label="Atardecer"
            value={new Date(weather.sunset * 1000).toLocaleTimeString()}
          />
        </div>

        {/* Zona horaria */}
        <div className="mt-3 p-3 bg-primary/10 dark:bg-primary/20 rounded-md border border-primary/20 transition-all duration-300 shadow-sm">
          <p className="font-medium">
            <span className="text-primary">Zona horaria:</span> {weather.timezone}
          </p>
        </div>
      </div>
    </div>
  )
}

// Componente para cada elemento del clima
const WeatherItem = ({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: string
  label: string
  value: string
  highlight?: boolean
}) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-md border transition-all duration-300 shadow-sm hover:shadow-md ${
        highlight
          ? "bg-primary/10 dark:bg-primary/20 border-primary/20"
          : "bg-background border-border hover:border-border-hover"
      }`}
    >
      <img src={icon || "/placeholder.svg"} width={30} height={30} alt={label} className="flex-shrink-0" />
      <div>
        <p className={`text-sm font-medium ${highlight ? "text-primary" : "text-muted"}`}>{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

export default WeatherWidget

