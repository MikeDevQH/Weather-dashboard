"use client";
import { WEATHER_LAYERS } from "@/lib/weatherLayers";
import { useLanguage } from "@/lib/languageContext"


type Props = {
  activeLayer: string;
  setActiveLayer: (layer: string) => void;
};

const LayerSelector = ({ activeLayer, setActiveLayer }: Props) => {
  const { t } = useLanguage()
  return (
    <div className="flex flex-wrap justify-between gap-2 mb-1">
      {WEATHER_LAYERS.map((layer) => (
        <button
          key={layer.id}
          className={`px-3 py-1.5 rounded-md text-base font-medium transition-all duration-300 ${
            activeLayer === layer.id
              ? "bg-background shadow-md transform scale-105 "
              : "bg-background opacity-75 border border-border hover:opacity-90 hover:border-accent shadow-lg dark:shadow-xl hover:transform hover:scale-110"
          }`}
          onClick={() => setActiveLayer(layer.id)}
        >
          {t(layer.nameKey)}
        </button>
      ))}
    </div>
  )
}

export default LayerSelector;
