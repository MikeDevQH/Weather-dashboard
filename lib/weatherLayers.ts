export const WEATHER_LAYERS = [
    { id: "clouds_new", name: "Nubosidad" },
    { id: "precipitation_new", name: "Precipitación" },
    { id: "pressure_new", name: "Presión" },
    { id: "wind_new", name: "Viento" },
    { id: "temp_new", name: "Temperatura" },
  ];
  
  export const getWeatherLayerUrl = (layer: string, apiKey: string) =>
    `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`;
  