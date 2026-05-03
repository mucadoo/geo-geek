'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Geographies, Geography } from '@vnedyalk0v/react19-simple-maps';
import { useMapStore } from '@/store/useMapStore';
import { NUMERIC_TO_CONTINENT, NUMERIC_TO_ALPHA2, CONTINENT_VIEWS } from '@/config/mapConstants';

interface MapPolygonsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapData: any;
}

export default function MapPolygons({ mapData }: MapPolygonsProps) {
  const router = useRouter();
  const { 
    selectedContinent, hoveredContinent, hoveredCountry, 
    tooltip, setTooltip,
    setHoveredContinent, setHoveredCountry,
    handleContinentClick
  } = useMapStore();

  return (
    <Geographies geography={mapData}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {({ geographies }: { geographies: any[] }) => geographies.map((geo) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const geoData = geo as any;
        const numericId = String(geoData.id).padStart(3, '0');
        const continent = NUMERIC_TO_CONTINENT[numericId] || 'Other';
        const alpha2 = NUMERIC_TO_ALPHA2[numericId];
        const countryName = geoData.properties?.name || "Unknown";

        if (selectedContinent && continent !== selectedContinent) return null;

        const isHovered = selectedContinent
          ? hoveredCountry === geoData.rsmKey
          : hoveredContinent === continent;

        let fillColor = "var(--color-map-fill)"; 
        if (isHovered && continent !== 'Other') fillColor = "var(--color-danger)";

        return (
          <Geography
            key={geoData.rsmKey}
            geography={geoData}
            fill={fillColor}
            stroke="var(--color-map-stroke)"
            strokeWidth={0.5}
            onMouseEnter={(e) => {
              if (continent === 'Other') return;
              if (selectedContinent) {
                setHoveredCountry((geo as { rsmKey: string }).rsmKey);
                setTooltip({ show: true, content: countryName, x: e.clientX, y: e.clientY });
              } else {
                setHoveredContinent(continent);
                setTooltip({ show: true, content: continent, x: e.clientX, y: e.clientY });
              }
            }}
            onMouseLeave={() => {
              if (selectedContinent) setHoveredCountry(null);
              else setHoveredContinent(null);
              setTooltip({ ...tooltip, show: false });
            }}
            onClick={() => {
              if (continent === 'Other') return;
              if (selectedContinent) {
                if (alpha2) router.push(`/country/${alpha2}`);
              } else {
                const view = CONTINENT_VIEWS[continent as keyof typeof CONTINENT_VIEWS];
                if (view) handleContinentClick(continent, view);
              }
            }}
            style={{
              default: { outline: "none", transition: "fill 0.2s ease" },
              hover: { outline: "none", transition: "fill 0.2s ease", cursor: continent === 'Other' ? 'default' : 'pointer' },
              pressed: { outline: "none" }
            }}
          />
        );
      })}
    </Geographies>
  );
}
