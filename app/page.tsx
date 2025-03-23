import WeatherWidget from "@/components/weather-widget";
import ForecastWidget from "@/components/forecast-widget";
//import WeatherAlerts from "@/components/weather-alerts"; // (Commented out, possibly for future use)
import WeatherMap from "@/components/WeatherMap";

// Home component that structures the main weather dashboard page
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-10 space-y-16">
      
      {/* Current Weather and Weather Map displayed in two columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Current Weather Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-3 text-center text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Clima Actual {/* "Current Weather" */}
          </h2>
          <WeatherWidget />
        </div>
  
        {/* Weather Map Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-3 text-center text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mapa Meteorológico {/* "Weather Map" */}
          </h2>
          <div className="w-full h-[600px]"> 
            <WeatherMap />
          </div>
        </div>
      </section>
  
      {/* Forecast section, centered and larger */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-5 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Pronóstico {/* "Forecast" */}
        </h2>
        <ForecastWidget />
      </section>
    </div>
  );
}


