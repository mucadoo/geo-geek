'use client';

import React from 'react';
import Image from 'next/image';
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
    // Replaced -mt-10 with a nice white card container UI
    <div 
      className="relative w-full h-[650px] flex items-center justify-center bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100"
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
            width={800}
            height={450}
            className="w-full h-full outline-none"
            style={{ width: '100%', height: '100%' }}
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
              title="Return to World"
              className="absolute top-6 left-6 animate-in fade-in slide-in-from-left-4 duration-500 shadow-xl p-2 bg-white rounded-full hover:scale-105 transition-all group cursor-pointer"
            >
              <Image 
                src="/media/back_icon.svg" 
                alt="Return to World" 
                width={32} 
                height={32} 
                className="group-hover:invert-[0.3] sepia-[1] hue-rotate-[180deg] saturate-[3] transition-all"
              />
            </button>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
