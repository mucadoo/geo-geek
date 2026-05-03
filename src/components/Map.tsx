'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { feature, merge } from 'topojson-client';
import { Topology } from 'topojson-specification';
// @ts-ignore
import { GeometryCollection } from 'topojson-specification';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const CONTINENT_MAP: Record<string, string> = {
  'AF': 'Africa', 'DZ': 'Africa', 'AO': 'Africa', 'BJ': 'Africa', 'BW': 'Africa', 'BF': 'Africa', 'BI': 'Africa', 'CM': 'Africa', 'CV': 'Africa', 'CF': 'Africa', 'TD': 'Africa', 'KM': 'Africa', 'CG': 'Africa', 'CD': 'Africa', 'DJ': 'Africa', 'EG': 'Africa', 'GQ': 'Africa', 'ER': 'Africa', 'ET': 'Africa', 'GA': 'Africa', 'GM': 'Africa', 'GH': 'Africa', 'GN': 'Africa', 'GW': 'Africa', 'CI': 'Africa', 'KE': 'Africa', 'LS': 'Africa', 'LR': 'Africa', 'LY': 'Africa', 'MG': 'Africa', 'MW': 'Africa', 'ML': 'Africa', 'MR': 'Africa', 'MU': 'Africa', 'YT': 'Africa', 'MA': 'Africa', 'MZ': 'Africa', 'NA': 'Africa', 'NE': 'Africa', 'NG': 'Africa', 'RE': 'Africa', 'RW': 'Africa', 'SH': 'Africa', 'ST': 'Africa', 'SN': 'Africa', 'SC': 'Africa', 'SL': 'Africa', 'SO': 'Africa', 'ZA': 'Africa', 'SS': 'Africa', 'SD': 'Africa', 'SZ': 'Africa', 'TZ': 'Africa', 'TG': 'Africa', 'TN': 'Africa', 'UG': 'Africa', 'EH': 'Africa', 'ZM': 'Africa', 'ZW': 'Africa',
  'AFG': 'Asia', 'ARM': 'Asia', 'AZE': 'Asia', 'BHR': 'Asia', 'BGD': 'Asia', 'BTN': 'Asia', 'BRN': 'Asia', 'KHM': 'Asia', 'CHN': 'Asia', 'CYP': 'Asia', 'GEO': 'Asia', 'IND': 'Asia', 'IDN': 'Asia', 'IRN': 'Asia', 'IRQ': 'Asia', 'ISR': 'Asia', 'JPN': 'Asia', 'JOR': 'Asia', 'KAZ': 'Asia', 'KWT': 'Asia', 'KGZ': 'Asia', 'LAO': 'Asia', 'LBN': 'Asia', 'MYS': 'Asia', 'MDV': 'Asia', 'MNG': 'Asia', 'MMR': 'Asia', 'NPL': 'Asia', 'PRK': 'Asia', 'OMN': 'Asia', 'PAK': 'Asia', 'PHL': 'Asia', 'QAT': 'Asia', 'SAU': 'Asia', 'SGP': 'Asia', 'KOR': 'Asia', 'LKA': 'Asia', 'SYR': 'Asia', 'TWN': 'Asia', 'TJK': 'Asia', 'THA': 'Asia', 'TUR': 'Asia', 'TKM': 'Asia', 'ARE': 'Asia', 'UZB': 'Asia', 'VNM': 'Asia', 'YEM': 'Asia',
  'AUS': 'Oceania', 'NZL': 'Oceania', 'FJI': 'Oceania', 'PNG': 'Oceania', 'SLB': 'Oceania', 'VUT': 'Oceania', 'NCL': 'Oceania', 'PYF': 'Oceania',
  'ALB': 'Europe', 'AND': 'Europe', 'AUT': 'Europe', 'BLR': 'Europe', 'BEL': 'Europe', 'BIH': 'Europe', 'BGR': 'Europe', 'HRV': 'Europe', 'CZE': 'Europe', 'DNK': 'Europe', 'EST': 'Europe', 'FIN': 'Europe', 'FRA': 'Europe', 'DEU': 'Europe', 'GRC': 'Europe', 'HUN': 'Europe', 'ISL': 'Europe', 'IRL': 'Europe', 'ITA': 'Europe', 'LVA': 'Europe', 'LIE': 'Europe', 'LTU': 'Europe', 'LUX': 'Europe', 'MLT': 'Europe', 'MDA': 'Europe', 'MCO': 'Europe', 'MNE': 'Europe', 'NLD': 'Europe', 'MKD': 'Europe', 'NOR': 'Europe', 'POL': 'Europe', 'PRT': 'Europe', 'ROU': 'Europe', 'RUS': 'Europe', 'SMR': 'Europe', 'SRB': 'Europe', 'SVK': 'Europe', 'SVN': 'Europe', 'ESP': 'Europe', 'SWE': 'Europe', 'CHE': 'Europe', 'UKR': 'Europe', 'GBR': 'Europe', 'VAT': 'Europe',
  'CAN': 'North America', 'USA': 'North America', 'MEX': 'North America', 'GTM': 'North America', 'BLZ': 'North America', 'HND': 'North America', 'SLV': 'North America', 'NIC': 'North America', 'CRI': 'North America', 'PAN': 'North America', 'CUB': 'North America', 'HTI': 'North America', 'DOM': 'North America', 'JAM': 'North America', 'TTO': 'North America', 'BHS': 'North America',
  'BRA': 'South America', 'ARG': 'South America', 'BOL': 'South America', 'CHL': 'South America', 'COL': 'South America', 'ECU': 'South America', 'GUY': 'South America', 'PRY': 'South America', 'PER': 'South America', 'SUR': 'South America', 'URY': 'South America', 'VEN': 'South America'
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

  React.useEffect(() => {
    fetch(GEO_URL).then(res => res.json()).then(data => setTopology(data));
  }, []);

  const continents = useMemo(() => {
    if (!topology) return null;
    const countries = feature(topology, topology.objects.countries as GeometryCollection).features;
    const grouped: Record<string, any[]> = {};
    countries.forEach(c => {
      const continent = CONTINENT_MAP[c.id as string] || 'Other';
      if (!grouped[continent]) grouped[continent] = [];
      grouped[continent].push(c);
    });
    return Object.entries(grouped).map(([name, features]) => ({
      name,
      geometry: merge(topology, features as any)
    }));
  }, [topology]);

  return (
    <div id="mapdiv" className="w-[940px] h-[480px] bg-white rounded-[15px] shadow-lg relative top-[10px] left-[10px]">
      <ComposableMap projection="geoMercator" style={{ width: "100%", height: "100%" }}>
        {view === 'continents' ? (
          <Geographies geography={continents as any}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={CONTINENT_COLORS[geo.properties.name] || '#CCCCCC'}
                stroke="#FFF"
                strokeWidth={1}
                onMouseEnter={(e) => { e.currentTarget.style.fill = '#9a7bca'; }}
                onMouseLeave={(e) => { e.currentTarget.style.fill = CONTINENT_COLORS[geo.properties.name] || '#CCCCCC'; }}
                onClick={() => setView('world')}
                style={{ default: { outline: 'none' }, hover: { outline: 'none', cursor: 'pointer' }, pressed: { outline: 'none' } }}
              />
            ))}
          </Geographies>
        ) : (
          <Geographies geography={GEO_URL}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e6e6e6"
                stroke="#000000"
                strokeWidth={0.5}
                onMouseEnter={(e) => { e.currentTarget.style.fill = '#9a7bca'; }}
                onMouseLeave={(e) => { e.currentTarget.style.fill = '#e6e6e6'; }}
                onClick={() => router.push(`/country/${geo.id}`)}
                style={{ default: { outline: 'none' }, hover: { outline: 'none', cursor: 'pointer' }, pressed: { outline: 'none' } }}
              />
            ))}
          </Geographies>
        )}
      </ComposableMap>
      {view === 'world' && (
        <button
          onClick={() => setView('continents')}
          className="absolute bottom-5 left-5 px-3 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100"
        >
          Back to continents
        </button>
      )}
    </div>
  );
}
