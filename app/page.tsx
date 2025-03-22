import WeatherWidget from "@/components/weather-widget";
import ForecastWidget from "@/components/forecast-widget";
//import WeatherAlerts from "@/components/weather-alerts";
import WeatherMap from "@/components/WeatherMap";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-10 space-y-16">
      {/* Clima Actual y Mapa en dos columnas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Clima Actual */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Clima Actual
          </h2>
          <WeatherWidget />
        </div>
  
        {/* Mapa Meteorológico */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mapa Meteorológico
          </h2>
          <div className="w-full h-[600px]"> {/* Ajusta la altura si es necesario */}
            <WeatherMap />
          </div>
        </div>
      </section>
  
      {/* Pronóstico más grande y centrado */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-8 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Pronóstico
        </h2>
        <ForecastWidget />
      </section>
    </div>
  );
  
  
}

