export const WEATHER_LAYERS = [
  { id: "clouds_new", nameKey: "weatherLayer.clouds" },
  { id: "precipitation_new", nameKey: "weatherLayer.precipitation" },
  { id: "pressure_new", nameKey: "weatherLayer.pressure" },
  { id: "wind_new", nameKey: "weatherLayer.windSpeed" },
  { id: "temp_new", nameKey: "weatherLayer.temperature" },
];

export const getWeatherLayerUrl = (layer: string, apiKey: string) =>
  `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`;
