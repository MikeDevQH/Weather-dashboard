const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCoords(lat: number, lon: number, units: string = "metric") {
  try {
    if (!API_KEY) throw new Error("La API Key no está definida.");

    const URL = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=es`;
    const res = await fetch(URL);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.message}`);
    }

    const data = await res.json();

    return {
      id: data.id,
      city: data.name,
      country: data.sys.country,
      timezone: data.timezone,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      seaLevel: data.main.sea_level || null, 
      groundLevel: data.main.grnd_level || null, 
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      windGust: data.wind.gust || null,
      clouds: data.clouds.all,
      visibility: data.visibility ? data.visibility / 1000 : null, // Convertir a km
      rainLastHour: data.rain?.["1h"] || 0, // Precipitación en mm
      snowLastHour: data.snow?.["1h"] || 0, // Nieve en mm
      dewPoint: calculateDewPoint(data.main.temp, data.main.humidity),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Función para calcular el punto de rocío
function calculateDewPoint(temp: number, humidity: number): number {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
}
