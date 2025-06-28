import GeoJsonURL from '@/assets/GeoJSON.json?url';

import Maplibregl from 'maplibre-gl';

const drawRoads = (map: Maplibregl.Map) => {
  map.addSource('roads', {
    type: 'geojson',
    data: GeoJsonURL,
  });

  map.addLayer({
    id: 'roads-layer',
    type: 'line',
    source: 'roads',
    paint: {
      'line-color': '#007AFF',
      'line-width': 3,
    },
  });
};

export default drawRoads;
