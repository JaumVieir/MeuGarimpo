<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapLayers = {
  poligonal: boolean;
  deter: boolean;
  ibama: boolean;
  indigena: boolean;
};

const props = withDefaults(
  defineProps<{
    center: [number, number];
    layers: MapLayers;
    base?: "satelite" | "rua";
  }>(),
  { base: "satelite" },
);

const emit = defineEmits<{ pick: [lat: number, lng: number] }>();

const POLIGONAL: [number, number][] = [
  [-6.0705, -56.3512],
  [-6.0688, -56.3221],
  [-6.0942, -56.3178],
  [-6.0985, -56.3468],
];

const DETER: [number, number][] = [
  [-6.0712, -56.3252],
  [-6.0705, -56.3168],
  [-6.0798, -56.3162],
  [-6.0806, -56.3248],
];

const IBAMA: [number, number][] = [
  [-6.1042, -56.3395],
  [-6.1035, -56.3288],
  [-6.1128, -56.3282],
  [-6.1136, -56.3389],
];

const INDIGENA: [number, number][] = [
  [-6.0402, -56.2905],
  [-6.0388, -56.2515],
  [-6.0752, -56.2482],
  [-6.0778, -56.2882],
];

const holder = ref<HTMLDivElement | null>(null);
let map: L.Map | null = null;
let markerRef: L.CircleMarker | null = null;
let userMarkerRef: L.CircleMarker | null = null;
let userAccuracyRef: L.Circle | null = null;
const groups: Record<keyof MapLayers, L.Layer | null> = {
  poligonal: null,
  deter: null,
  ibama: null,
  indigena: null,
};
const bases: { satelite: L.Layer[]; rua: L.Layer[] } = { satelite: [], rua: [] };

onMounted(() => {
  if (!holder.value || map) return;

  map = L.map(holder.value, { zoomControl: true, attributionControl: true }).setView(props.center, 13);

  bases.satelite = [
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Imagery © Esri" },
    ),
    L.tileLayer("https://stamen-tiles.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png", {
      maxZoom: 19,
      opacity: 0.9,
      attribution: "",
    }),
  ];
  bases.rua = [
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }),
  ];
  bases[props.base].forEach((l) => l.addTo(map!));

  groups.poligonal = L.polygon(POLIGONAL, {
    color: "#f5b301",
    weight: 2,
    fillOpacity: 0.12,
  }).bindTooltip("Processo 850.123/2019 · 982,4 ha");

  groups.deter = L.polygon(DETER, {
    color: "#ff6b3d",
    weight: 2,
    dashArray: "5 4",
    fillOpacity: 0.25,
  }).bindTooltip("Alerta DETER · 14,2 ha");

  groups.ibama = L.polygon(IBAMA, {
    color: "#e5484d",
    weight: 2,
    fillOpacity: 0.2,
  }).bindTooltip("Embargo IBAMA (vizinho)");

  groups.indigena = L.polygon(INDIGENA, {
    color: "#3ecf8e",
    weight: 2,
    fillOpacity: 0.15,
  }).bindTooltip("Terra Indígena (fora do ponto)");

  markerRef = L.circleMarker(props.center, {
    radius: 7,
    color: "#ffffff",
    weight: 2,
    fillColor: "#f5b301",
    fillOpacity: 1,
  }).addTo(map);

  map.on("click", (e: L.LeafletMouseEvent) => {
    emit("pick", e.latlng.lat, e.latlng.lng);
  });

  map.on("locationfound", (e: L.LocationEvent) => {
    if (!userMarkerRef) {
      userMarkerRef = L.circleMarker(e.latlng, {
        radius: 7,
        color: "#ffffff",
        weight: 2,
        fillColor: "#3b82f6",
        fillOpacity: 1,
      }).addTo(map!);
      userAccuracyRef = L.circle(e.latlng, {
        radius: e.accuracy,
        color: "#3b82f6",
        weight: 1,
        fillOpacity: 0.12,
      }).addTo(map!);
    } else {
      userMarkerRef.setLatLng(e.latlng);
      userAccuracyRef?.setLatLng(e.latlng).setRadius(e.accuracy);
    }
  });

  Object.keys(groups).forEach((key) => {
    const layer = groups[key as keyof MapLayers];
    if (!layer) return;
    if (props.layers[key as keyof MapLayers]) layer.addTo(map!);
  });
});

onUnmounted(() => {
  map?.remove();
  map = null;
});

watch(
  () => props.base,
  (base) => {
    if (!map) return;
    (["satelite", "rua"] as const).forEach((k) => {
      bases[k].forEach((l) => {
        if (k === base) l.addTo(map!);
        else map!.removeLayer(l);
      });
    });
  },
);

watch(
  () => props.layers,
  (layers) => {
    if (!map) return;
    (Object.keys(groups) as (keyof MapLayers)[]).forEach((key) => {
      const layer = groups[key];
      if (!layer) return;
      if (layers[key]) layer.addTo(map!);
      else map!.removeLayer(layer);
    });
  },
  { deep: true },
);

watch(
  () => props.center,
  (center) => {
    if (!map) return;
    markerRef?.setLatLng(center);
    map.panTo(center);
  },
);

defineExpose({
  locate: () => {
    map?.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
  },
});
</script>

<template>
  <div ref="holder" class="h-full w-full" />
</template>
