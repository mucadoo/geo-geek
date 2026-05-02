'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5geodata_continentsLow from '@amcharts/amcharts5-geodata/continentsLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useRouter } from 'next/navigation';

export default function Map() {
  const chartRef = useRef<am5.Root | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const root = am5.Root.new('mapdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'none',
        projection: am5map.geoMercator(),
        homeGeoPoint: { latitude: 0, longitude: 0 },
        homeZoomLevel: 1,
      })
    );

    // Zoom control
    const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    
    // Create polygon series for continents
    const continentSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_continentsLow,
        valueField: "value",
        calculateAggregates: true
      })
    );

    continentSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xAAAAAA),
      stroke: am5.color(0xFFFFFF),
      strokeWidth: 1
    });

    continentSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x9a7bca)
    });

    // Custom continent colors like the original
    continentSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const dataContext = target.dataItem?.dataContext as any;
      const id = dataContext?.id;
      switch (id) {
        case "africa": return am5.color(0x000000);
        case "asia": return am5.color(0xf4c300);
        case "australia": return am5.color(0x0da447);
        case "europe": return am5.color(0x0085c7);
        case "north_america": return am5.color(0xdf0024);
        case "south_america": return am5.color(0xdf4400);
        default: return fill;
      }
    });

    // World Series (hidden initially)
    const worldSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        visible: false
      })
    );

    worldSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xe6e6e6),
      stroke: am5.color(0x000000),
      strokeWidth: 0.5
    });

    worldSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x9a7bca)
    });

    // Drill down logic
    continentSeries.mapPolygons.template.events.on("click", (ev) => {
      continentSeries.hide();
      worldSeries.show();
      chart.goHome();
      
      // Add back button
      backButton.show();
    });

    worldSeries.mapPolygons.template.events.on("click", (ev) => {
      const dataContext = ev.target.dataItem?.dataContext as any;
      if (dataContext && dataContext.id) {
        router.push(`/country/${dataContext.id}`);
      }
    });

    // Back button
    const backButton = chart.children.push(am5.Button.new(root, {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      centerX: am5.p0,
      centerY: am5.p100,
      x: am5.p0,
      y: am5.p100,
      dx: 30,
      dy: -30,
      label: am5.Label.new(root, {
        text: "Back to continents",
        fontSize: 15,
        fill: am5.color(0x000000)
      }),
      visible: false
    }));

    backButton.events.on("click", () => {
      worldSeries.hide();
      continentSeries.show();
      chart.goHome();
      backButton.hide();
    });

    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [router]);

  return (
    <div id="mapdiv" className="w-[940px] h-[480px] bg-white rounded-[15px] shadow-lg relative top-[10px] left-[10px]"></div>
  );
}
