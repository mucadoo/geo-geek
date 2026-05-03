import { create } from 'zustand';

interface Tooltip {
  show: boolean;
  content: string;
  x: number;
  y: number;
}

interface MapPosition {
  coordinates: [number, number];
  zoom: number;
}

interface MapState {
  position: MapPosition;
  selectedContinent: string | null;
  hoveredContinent: string | null;
  hoveredCountry: string | null;
  tooltip: Tooltip;
  setPosition: (position: MapPosition) => void;
  setSelectedContinent: (continent: string | null) => void;
  setHoveredContinent: (continent: string | null) => void;
  setHoveredCountry: (country: string | null) => void;
  setTooltip: (tooltip: Tooltip) => void;
  handleContinentClick: (name: string, view: MapPosition) => void;
  resetMap: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  position: { coordinates: [0, 20], zoom: 1 },
  selectedContinent: null,
  hoveredContinent: null,
  hoveredCountry: null,
  tooltip: { show: false, content: '', x: 0, y: 0 },
  setPosition: (position) => set({ position }),
  setSelectedContinent: (selectedContinent) => set({ selectedContinent }),
  setHoveredContinent: (hoveredContinent) => set({ hoveredContinent }),
  setHoveredCountry: (hoveredCountry) => set({ hoveredCountry }),
  setTooltip: (tooltip) => set({ tooltip }),
  
  handleContinentClick: (name, view) =>
    set({
      selectedContinent: name,
      position: view,
      hoveredContinent: null, // Clear the continent hover state
      // We intentionally don't clear the tooltip here so it smoothly transitions to the country
    }),
    
  resetMap: () =>
    set((state) => ({
      selectedContinent: null,
      position: { coordinates: [0, 20], zoom: 1 },
      hoveredContinent: null,
      hoveredCountry: null,
      tooltip: { ...state.tooltip, show: false }, // Hide tooltip cleanly on reset
    })),
}));
