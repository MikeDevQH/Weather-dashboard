const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getForecast(lat: number, lon: number) {
  try {
    if (!API_KEY) throw new Error("La API Key no está definida.");

    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

    const data = await res.json();
    return data.list.map((item: any) => ({
      dt: item.dt,
      dateText: item.dt_txt,
      temp: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeed: item.wind.speed,
      windDeg: item.wind.deg,
      pop: item.pop * 100, 
      rain: item.rain?.["3h"] || 0, 
      weather: item.weather[0],
    }));
  } catch (error) {
    console.error("Error al obtener el pronóstico:", error);
    return [];
  }
}
