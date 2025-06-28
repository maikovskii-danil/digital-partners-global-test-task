import Maplibregl from 'maplibre-gl';

const drawRoute = (map: Maplibregl.Map, pathCoords: [number, number][]) => {
  if (map.getLayer('route-layer')) {
    map.removeLayer('route-layer');
  }

  if (map.getSource('route')) {
    map.removeSource('route');
  }

  map.addSource('route', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: pathCoords,
          },
          properties: {
            /* eslint-disable camelcase */
            Road_Type: 'Secondary',
            Sur_Type: '',
            /* eslint-enable camelcase */
            Route: '',
            Remark: '',
          },
        },
      ],
    },
  });

  map.addLayer({
    id: 'route-layer',
    type: 'line',
    source: 'route',
    paint: {
      'line-color': '#FF0000',
      'line-width': 4,
    },
  });
};

export default drawRoute;
