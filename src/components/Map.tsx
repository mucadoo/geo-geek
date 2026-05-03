'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { merge } from 'topojson-client';
import type { Topology } from 'topojson-specification';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Numeric ISO 3166-1 → Continent (keys are 3-digit zero-padded strings matching world-atlas IDs)
const NUMERIC_TO_CONTINENT: Record<string, string> = {
  // Africa
  '012': 'Africa', '024': 'Africa', '072': 'Africa', '108': 'Africa', '120': 'Africa',
  '140': 'Africa', '148': 'Africa', '174': 'Africa', '178': 'Africa', '180': 'Africa',
  '204': 'Africa', '232': 'Africa', '231': 'Africa', '238': 'Africa', '262': 'Africa',
  '266': 'Africa', '270': 'Africa', '288': 'Africa', '324': 'Africa', '384': 'Africa',
  '404': 'Africa', '426': 'Africa', '430': 'Africa', '434': 'Africa', '450': 'Africa',
  '454': 'Africa', '466': 'Africa', '478': 'Africa', '480': 'Africa', '504': 'Africa',
  '508': 'Africa', '516': 'Africa', '562': 'Africa', '566': 'Africa', '624': 'Africa',
  '638': 'Africa', '646': 'Africa', '654': 'Africa', '678': 'Africa', '686': 'Africa',
  '694': 'Africa', '706': 'Africa', '710': 'Africa', '716': 'Africa', '728': 'Africa',
  '736': 'Africa', '748': 'Africa', '768': 'Africa', '788': 'Africa', '800': 'Africa',
  '818': 'Africa', '834': 'Africa', '854': 'Africa', '894': 'Africa',
  // Asia
  '004': 'Asia', '031': 'Asia', '048': 'Asia', '050': 'Asia', '051': 'Asia',
  '064': 'Asia', '096': 'Asia', '104': 'Asia', '116': 'Asia', '144': 'Asia',
  '156': 'Asia', '158': 'Asia', '196': 'Asia', '268': 'Asia', '275': 'Asia',
  '356': 'Asia', '360': 'Asia', '364': 'Asia', '368': 'Asia', '376': 'Asia',
  '392': 'Asia', '398': 'Asia', '400': 'Asia', '408': 'Asia', '410': 'Asia',
  '414': 'Asia', '417': 'Asia', '418': 'Asia', '422': 'Asia', '458': 'Asia',
  '462': 'Asia', '496': 'Asia', '512': 'Asia', '524': 'Asia', '586': 'Asia',
  '608': 'Asia', '634': 'Asia', '682': 'Asia', '702': 'Asia', '704': 'Asia',
  '760': 'Asia', '762': 'Asia', '764': 'Asia', '784': 'Asia', '792': 'Asia',
  '795': 'Asia', '860': 'Asia', '887': 'Asia',
  // Europe
  '008': 'Europe', '020': 'Europe', '040': 'Europe', '056': 'Europe', '070': 'Europe',
  '100': 'Europe', '112': 'Europe', '191': 'Europe', '203': 'Europe', '208': 'Europe',
  '212': 'Europe', '233': 'Europe', '246': 'Europe', '250': 'Europe', '276': 'Europe',
  '292': 'Europe', '300': 'Europe', '336': 'Europe', '348': 'Europe', '352': 'Europe',
  '372': 'Europe', '380': 'Europe', '428': 'Europe', '438': 'Europe', '440': 'Europe',
  '442': 'Europe', '470': 'Europe', '492': 'Europe', '498': 'Europe', '499': 'Europe',
  '528': 'Europe', '578': 'Europe', '616': 'Europe', '620': 'Europe', '642': 'Europe',
  '643': 'Europe', '674': 'Europe', '688': 'Europe', '703': 'Europe', '705': 'Europe',
  '724': 'Europe', '752': 'Europe', '756': 'Europe', '804': 'Europe', '807': 'Europe',
  '826': 'Europe',
  // North America
  '028': 'North America', '044': 'North America', '052': 'North America', '084': 'North America',
  '124': 'North America', '188': 'North America', '192': 'North America', '214': 'North America',
  '222': 'North America', '308': 'North America', '320': 'North America', '332': 'North America',
  '340': 'North America', '388': 'North America', '484': 'North America', '558': 'North America',
  '591': 'North America', '630': 'North America', '659': 'North America', '662': 'North America',
  '670': 'North America', '780': 'North America', '840': 'North America',
  // South America
  '032': 'South America', '068': 'South America', '076': 'South America', '152': 'South America',
  '170': 'South America', '218': 'South America', '254': 'South America', '328': 'South America',
  '600': 'South America', '604': 'South America', '740': 'South America', '858': 'South America',
  '862': 'South America',
  // Oceania
  '036': 'Oceania', '090': 'Oceania', '242': 'Oceania', '296': 'Oceania', '520': 'Oceania',
  '540': 'Oceania', '548': 'Oceania', '554': 'Oceania', '583': 'Oceania', '584': 'Oceania',
  '585': 'Oceania', '598': 'Oceania', '776': 'Oceania', '798': 'Oceania', '882': 'Oceania',
};

// Numeric ISO 3166-1 → Alpha-2 for routing to /country/[id]
const NUMERIC_TO_ALPHA2: Record<string, string> = {
  '004': 'AF', '008': 'AL', '012': 'DZ', '020': 'AD', '024': 'AO', '028': 'AG', '031': 'AZ',
  '032': 'AR', '036': 'AU', '040': 'AT', '044': 'BS', '048': 'BH', '050': 'BD', '051': 'AM',
  '052': 'BB', '056': 'BE', '064': 'BT', '068': 'BO', '070': 'BA', '072': 'BW', '076': 'BR',
  '084': 'BZ', '090': 'SB', '096': 'BN', '100': 'BG', '104': 'MM', '108': 'BI', '112': 'BY',
  '116': 'KH', '120': 'CM', '124': 'CA', '132': 'CV', '140': 'CF', '144': 'LK', '148': 'TD',
  '152': 'CL', '156': 'CN', '158': 'TW', '170': 'CO', '174': 'KM', '178': 'CG', '180': 'CD',
  '188': 'CR', '191': 'HR', '192': 'CU', '196': 'CY', '203': 'CZ', '204': 'BJ', '208': 'DK',
  '212': 'DM', '214': 'DO', '218': 'EC', '222': 'SV', '231': 'ET', '232': 'ER', '233': 'EE',
  '238': 'FK', '242': 'FJ', '246': 'FI', '250': 'FR', '254': 'GF', '262': 'DJ', '266': 'GA',
  '268': 'GE', '270': 'GM', '275': 'PS', '276': 'DE', '288': 'GH', '292': 'GI', '296': 'KI',
  '300': 'GR', '308': 'GD', '320': 'GT', '324': 'GN', '328': 'GY', '332': 'HT', '336': 'VA',
  '340': 'HN', '348': 'HU', '352': 'IS', '356': 'IN', '360': 'ID', '364': 'IR', '368': 'IQ',
  '372': 'IE', '376': 'IL', '380': 'IT', '384': 'CI', '388': 'JM', '392': 'JP', '398': 'KZ',
  '400': 'JO', '404': 'KE', '408': 'KP', '410': 'KR', '414': 'KW', '417': 'KG', '418': 'LA',
  '422': 'LB', '426': 'LS', '428': 'LV', '430': 'LR', '434': 'LY', '438': 'LI', '440': 'LT',
  '442': 'LU', '450': 'MG', '454': 'MW', '458': 'MY', '462': 'MV', '466': 'ML', '470': 'MT',
  '478': 'MR', '480': 'MU', '484': 'MX', '492': 'MC', '496': 'MN', '498': 'MD', '499': 'ME',
  '504': 'MA', '508': 'MZ', '512': 'OM', '516': 'NA', '520': 'NR', '524': 'NP', '528': 'NL',
  '540': 'NC', '548': 'VU', '554': 'NZ', '558': 'NI', '562': 'NE', '566': 'NG', '578': 'NO',
  '583': 'FM', '584': 'MH', '585': 'PW', '586': 'PK', '591': 'PA', '598': 'PG', '600': 'PY',
  '604': 'PE', '608': 'PH', '616': 'PL', '620': 'PT', '624': 'GW', '630': 'PR', '634': 'QA',
  '638': 'RE', '642': 'RO', '643': 'RU', '646': 'RW', '654': 'SH', '659': 'KN', '662': 'LC',
  '670': 'VC', '674': 'SM', '678': 'ST', '682': 'SA', '686': 'SN', '688': 'RS', '694': 'SL',
  '702': 'SG', '703': 'SK', '704': 'VN', '705': 'SI', '706': 'SO', '710': 'ZA', '716': 'ZW',
  '724': 'ES', '728': 'SS', '736': 'SD', '740': 'SR', '748': 'SZ', '752': 'SE', '756': 'CH',
  '760': 'SY', '762': 'TJ', '764': 'TH', '768': 'TG', '776': 'TO', '780': 'TT', '784': 'AE',
  '788': 'TN', '792': 'TR', '795': 'TM', '798': 'TV', '800': 'UG', '804': 'UA', '807': 'MK',
  '818': 'EG', '826': 'GB', '834': 'TZ', '840': 'US', '854': 'BF', '858': 'UY', '860': 'UZ',
  '862': 'VE', '882': 'WS', '887': 'YE', '894': 'ZM',
};

const CONTINENT_COLORS: Record<string, string> = {
  'Africa': '#000000',
  'Asia': '#f4c300',
  'Oceania': '#0da447',
  'Europe': '#0085c7',
  'North America': '#df0024',
  'South America': '#df4400',
};

export default function Map() {
  const router = useRouter();
  const [view, setView] = useState<'continents' | 'world'>('continents');
  const [topology, setTopology] = useState<Topology | null>(null);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((data) => setTopology(data));
  }, []);

  // Build a GeoJSON FeatureCollection of merged continent shapes.
  // Crucially, merge() must receive raw topology geometry objects (not GeoJSON features).
  const continentFeatures = useMemo(() => {
    if (!topology) return null;

    const topo = topology as any;
    const geometries: any[] = topo.objects.countries.geometries;

    // Group raw geometry objects by continent
    const grouped: Record<string, any[]> = {};
    geometries.forEach((geom) => {
      const numericId = String(geom.id).padStart(3, '0');
      const continent = NUMERIC_TO_CONTINENT[numericId] || 'Other';
      if (continent === 'Other') return;
      if (!grouped[continent]) grouped[continent] = [];
      grouped[continent].push(geom);
    });

    const features = Object.entries(grouped).map(([name, geoms]) => ({
      type: 'Feature' as const,
      id: name,
      properties: { name },
      geometry: merge(topo, geoms), // merge() receives topology + raw geometry objects ✓
    }));

    return { type: 'FeatureCollection' as const, features };
  }, [topology]);

  return (
    <div
      id="mapdiv"
      className="w-[940px] h-[480px] bg-white rounded-[15px] shadow-lg relative top-[10px] left-[10px]"
    >
      {!topology && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-raleway text-sm">
          Loading map…
        </div>
      )}

      {topology && (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [0, 20] }}
          style={{ width: '100%', height: '100%' }}
        >
          {view === 'continents' && continentFeatures && (
            <Geographies geography={continentFeatures}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name: string = geo.properties.name;
                  const isHovered = hoveredContinent === name;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHovered ? '#9a7bca' : CONTINENT_COLORS[name] ?? '#CCCCCC'}
                      stroke="#FFFFFF"
                      strokeWidth={1}
                      onMouseEnter={() => setHoveredContinent(name)}
                      onMouseLeave={() => setHoveredContinent(null)}
                      onClick={() => setView('world')}
                      style={{
                        default: { outline: 'none', cursor: 'pointer' },
                        hover: { outline: 'none', cursor: 'pointer' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          )}

          {view === 'world' && (
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const numericId = String(geo.id).padStart(3, '0');
                  const alpha2 = NUMERIC_TO_ALPHA2[numericId];
                  const isHovered = hoveredCountry === geo.rsmKey;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHovered ? '#9a7bca' : '#e6e6e6'}
                      stroke="#000000"
                      strokeWidth={0.5}
                      onMouseEnter={() => setHoveredCountry(geo.rsmKey)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => alpha2 && router.push(`/country/${alpha2}`)}
                      style={{
                        default: { outline: 'none', cursor: alpha2 ? 'pointer' : 'default' },
                        hover: { outline: 'none', cursor: 'pointer' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ComposableMap>
      )}

      {view === 'world' && (
        <button
          onClick={() => setView('continents')}
          className="absolute bottom-5 left-5 px-3 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 font-raleway text-sm"
        >
          ← Back to continents
        </button>
      )}
    </div>
  );
}
