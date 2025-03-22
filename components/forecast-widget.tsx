"use client";
import { useEffect, useState } from "react";
import { getForecast } from "@/lib/getForecast";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Umbrella,
  Wind,
} from "lucide-react";

const ForecastWidget = () => {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "next" | "prev"
  >("next");
  const itemsPerPage = 4;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const data = await getForecast(latitude, longitude);

          if (data.length) {
            setForecast(data);
          } else {
            setError("No se pudo obtener el pronóstico.");
          }
          setLoading(false);
        },
        () => {
          setHasLocationPermission(false);
          setError("No se pudo obtener la ubicación.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocalización no soportada.");
      setLoading(false);
    }
  }, []);

  const handlePageChange = (direction: "next" | "prev") => {
    setIsTransitioning(true);
    setTransitionDirection(direction);

    setTimeout(() => {
      if (direction === "next") {
        setCurrentPage((prev) =>
          Math.min(prev + 1, Math.ceil(forecast.length / itemsPerPage) - 1)
        );
      } else {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  if (loading) {
    return (
      <div className="w-full h-40 bg-card rounded-lg shadow-card border border-border flex items-center justify-center transition-all duration-300">
        <div className="animate-pulse text-muted">Cargando pronóstico...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-card rounded-lg shadow-card border border-border p-4 text-[hsl(var(--color-danger))] transition-all duration-300">
        {hasLocationPermission
          ? error
          : "Permiso de ubicación denegado. Habilítalo en tu navegador."}
      </div>
    );
  }

  if (!forecast.length) {
    return (
      <div className="w-full bg-card rounded-lg shadow-card border border-border p-4 text-muted transition-all duration-300">
        No hay datos de pronóstico disponibles.
      </div>
    );
  }

  const totalPages = Math.ceil(forecast.length / itemsPerPage);
  const currentForecast = forecast.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      {/* Controles de paginación */}
      <div className="flex  items-center justify-between p-4 border-t border-border bg-gradient-primary">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 0 || isTransitioning}
          className="p-2 rounded-full bg-background dark:bg-background hover:transform hover:scale-105 text-primary disabled:opacity-50 disabled:bg-primary/5 disabled:text-primary/50 transition-all duration-300 hover:bg-primary/20 dark:hover:bg-primary/30 shadow-sm hover:shadow-md"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex space-x-2 items-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setTransitionDirection(i > currentPage ? "next" : "prev");

                setTimeout(() => {
                  setCurrentPage(i);
                  setTimeout(() => {
                    setIsTransitioning(false);
                  }, 50);
                }, 200);
              }}
              className={`transition-all duration-300 rounded-full ${
                i === currentPage
                  ? "w-3 h-3 bg-background shadow-md "
                  : "w-2 h-2 bg-blue-300 hover:bg-primary/50 "
              }`}
              aria-label={
                i === currentPage
                  ? `Página actual ${i + 1}`
                  : `Ir a página ${i + 1}`
              }
            />
          ))}
          <span className="text-xs font-bold ml-2 text-white">
            {currentPage + 1}/{totalPages}
          </span>
        </div>

        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage >= totalPages - 1 || isTransitioning}
          className="p-2 rounded-full bg-background dark:bg-background hover:transform hover:scale-105 text-primary disabled:opacity-50 disabled:bg-primary/5 disabled:text-primary/50 transition-all duration-300 hover:bg-primary/20 dark:hover:bg-primary/30 shadow-sm hover:shadow-md"
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Pronosticos */}
      <div className="relative overflow-hidden">
        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? transitionDirection === "next"
                ? "opacity-0 transform -translate-x-4"
                : "opacity-0 transform translate-x-4"
              : "opacity-100 transform translate-x-0"
          }`}
        >
          <div className="grid grid-cols-1 divide-y divide-border">
            {currentForecast.map((item, index) => (
              <div
                key={index}
                className="p-4 md:p-5 flex items-start gap-4 transition-all duration-300 hover:bg-card-hover"
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather.icon}@2x.png`}
                    alt={item.weather.description}
                    width={60}
                    height={60}
                    className="drop-shadow-md"
                  />
                  <p className="text-lg font-bold">{Math.round(item.temp)}°C</p>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <p className="font-semibold">
                      {new Intl.DateTimeFormat("es-ES", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(item.dt * 1000))}
                    </p>
                    <p className="text-sm px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full shadow-sm">
                      Sensación: {Math.round(item.feelsLike)}°C
                    </p>
                  </div>

                  <p className="capitalize mb-2">{item.weather.description}</p>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-1 bg-background p-1.5 rounded-md shadow-sm">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span>{item.humidity}%</span>
                    </div>

                    <div className="flex items-center gap-1 bg-background p-1.5 rounded-md shadow-sm">
                      <Wind className="h-4 w-4 text-primary" />
                      <span>{item.windSpeed} m/s</span>
                    </div>

                    <div className="flex items-center gap-1 bg-background p-1.5 rounded-md shadow-sm">
                      <Umbrella className="h-4 w-4 text-primary" />
                      <span>{item.pop}%</span>
                    </div>
                  </div>

                  {item.rain > 0 && (
                    <p className="mt-2 text-sm text-primary bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-md inline-block shadow-sm">
                      Lluvia: {item.rain} mm
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastWidget;
