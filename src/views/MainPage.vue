<template>
  <div class="flex flex-col gap-2 shadow-xl/20 w-[80%]">
    <div>Map</div>
    <div
      ref="map-ref"
      class="w-full h-[500px]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef } from 'vue';
import MapStyleURL from '@/assets/MapStyle.json?url';
import Maplibregl from 'maplibre-gl';
import drawRoads from '@/utils/drawRoads';
import drawRoute from '@/utils/drawRoute';

const mapRef = useTemplateRef('map-ref');
const map = shallowRef<Maplibregl.Map | null>(null);

/* eslint-disable no-magic-numbers */
const startCoords = shallowRef<[number, number]>([96.0836, 21.9162]);
const endCoords = shallowRef<[number, number]>([96.1836, 21.9222]);
const INITIAL_CENTER: [number, number] = [96.0836, 21.9162];
/* eslint-enable no-magic-numbers */
const INITIAL_ZOOM = 5;

const redrawPath = () => {
  if (!mapRef.value) {
    return;
  }

  if (!map.value) {
    return;
  }

  drawRoute(map.value, [startCoords.value, endCoords.value]);
};

onMounted(() => {
  if (!mapRef.value) {
    return;
  }

  map.value = new Maplibregl.Map({
    container: mapRef.value,
    style: MapStyleURL,
    center: INITIAL_CENTER,
    zoom: INITIAL_ZOOM,
  });

  map.value.on('load', () => {
    if (map.value instanceof Maplibregl.Map) {
      drawRoads(map.value);
      drawRoute(map.value, [startCoords.value, endCoords.value]);
    }
  });

  if (map.value instanceof Maplibregl.Map) {
    const startMarker = new Maplibregl.Marker({
      color: 'green',
      draggable: true,
    })
      .setLngLat(startCoords.value)
      .addTo(map.value);
    const endMarker = new Maplibregl.Marker({ color: 'red', draggable: true })
      .setLngLat(endCoords.value)
      .addTo(map.value);

    startMarker.on('dragend', () => {
      const lngLat = startMarker.getLngLat();
      startCoords.value = [lngLat.lng, lngLat.lat];
      redrawPath();
    });

    endMarker.on('dragend', () => {
      const lngLat = endMarker.getLngLat();
      endCoords.value = [lngLat.lng, lngLat.lat];
      redrawPath();
    });
  }
});
</script>
