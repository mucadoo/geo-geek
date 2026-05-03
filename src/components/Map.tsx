'use client';

import React from 'react';
import { ComposableMap, ZoomableGroup } from '@vnedyalk0v/react19-simple-maps';
import { useMapStore } from '@/store/useMapStore';
import { useWorldMapData } from '@/hooks/useWorldMapData';
import MapPolygons from './MapPolygons';

export default function Map() {
  const { data: mapData, status } = useWorldMapData();
  
  const { 
    position, setPosition, 
    selectedContinent, tooltip, setTooltip,
    resetMap
  } = useMapStore();

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip({ ...tooltip, x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="relative w-full h-[650px] overflow-hidden flex items-center justify-center -mt-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
    >
      {status === 'pending' && (
        <div className="absolute flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-gray-500 font-medium">Loading World Map...</p>
        </div>
      )}

      {status === 'success' && (
        <React.Fragment>
          <div
            className="fixed z-50 px-5 py-2.5 bg-white text-gray-800 font-semibold text-sm rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-[120%] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-opacity duration-150 border border-gray-100 whitespace-nowrap"
            style={{ left: tooltip.x, top: tooltip.y, opacity: tooltip.show ? 1 : 0 }}
          >
            {tooltip.content}
          </div>

          <ComposableMap
            projection="geoMercator"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            projectionConfig={{ scale: 140, center: [0, 20] as any }}
            className="w-full h-full outline-none"
          >
            <ZoomableGroup
              zoom={position.zoom}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              center={position.coordinates as any}
              onMoveEnd={(pos) => setPosition({ coordinates: pos.coordinates as [number, number], zoom: pos.zoom })}
              className="transition-transform duration-1000 ease-in-out outline-none"
            >
              <MapPolygons mapData={mapData} />
            </ZoomableGroup>
          </ComposableMap>

          {selectedContinent && (
            <button
              onClick={resetMap}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 btn-accent flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-xl"
            >
              ← Return to World
            </button>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
