import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapLayers = {
  poligonal: boolean;
  deter: boolean;
  ibama: boolean;
  indigena: boolean;
};

export type AreaMapHandle = {
  locate: () => void;
};

type Props = {
  center: [number, number];
  layers: MapLayers;
  onPick: (lat: number, lng: number) => void;
  base?: "satelite" | "rua";
};

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

const AreaMap = forwardRef<AreaMapHandle, Props>(function AreaMap(
  { center, layers, onPick, base = "satelite" },
  ref,
) {
  const holder = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const userAccuracyRef = useRef<L.Circle | null>(null);
  const groups = useRef<Record<keyof MapLayers, L.Layer | null>>({
    poligonal: null,
    deter: null,
    ibama: null,
    indigena: null,
  });
  const bases = useRef<{ satelite: L.Layer[]; rua: L.Layer[] }>({ satelite: [], rua: [] });
  const pickRef = useRef(onPick);
  pickRef.current = onPick;

  useEffect(() => {
    if (!holder.current || mapRef.current) return;

    const map = L.map(holder.current, { zoomControl: true, attributionControl: true }).setView(
      center,
      13,
    );
    mapRef.current = map;

    bases.current.satelite = [
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
    bases.current.rua = [
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }),
    ];
    bases.current[base].forEach((l) => l.addTo(map));

    groups.current.poligonal = L.polygon(POLIGONAL, {
      color: "#f5b301",
      weight: 2,
      fillOpacity: 0.12,
    }).bindTooltip("Processo 850.123/2019 · 982,4 ha");

    groups.current.deter = L.polygon(DETER, {
      color: "#ff6b3d",
      weight: 2,
      dashArray: "5 4",
      fillOpacity: 0.25,
    }).bindTooltip("Alerta DETER · 14,2 ha");

    groups.current.ibama = L.polygon(IBAMA, {
      color: "#e5484d",
      weight: 2,
      fillOpacity: 0.2,
    }).bindTooltip("Embargo IBAMA (vizinho)");

    groups.current.indigena = L.polygon(INDIGENA, {
      color: "#3ecf8e",
      weight: 2,
      fillOpacity: 0.15,
    }).bindTooltip("Terra Indígena (fora do ponto)");

    markerRef.current = L.circleMarker(center, {
      radius: 7,
      color: "#ffffff",
      weight: 2,
      fillColor: "#f5b301",
      fillOpacity: 1,
    }).addTo(map) as unknown as L.Marker;

    map.on("click", (e: L.LeafletMouseEvent) => {
      pickRef.current(e.latlng.lat, e.latlng.lng);
    });

    map.on("locationfound", (e: L.LocationEvent) => {
      if (!userMarkerRef.current) {
        userMarkerRef.current = L.circleMarker(e.latlng, {
          radius: 7,
          color: "#ffffff",
          weight: 2,
          fillColor: "#3b82f6",
          fillOpacity: 1,
        }).addTo(map);
        userAccuracyRef.current = L.circle(e.latlng, {
          radius: e.accuracy,
          color: "#3b82f6",
          weight: 1,
          fillOpacity: 0.12,
        }).addTo(map);
      } else {
        userMarkerRef.current.setLatLng(e.latlng);
        userAccuracyRef.current?.setLatLng(e.latlng).setRadius(e.accuracy);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    locate: () => {
      mapRef.current?.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    },
  }));

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    (["satelite", "rua"] as const).forEach((k) => {
      bases.current[k].forEach((l) => {
        if (k === base) l.addTo(map);
        else map.removeLayer(l);
      });
    });
  }, [base]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    (Object.keys(groups.current) as (keyof MapLayers)[]).forEach((key) => {
      const layer = groups.current[key];
      if (!layer) return;
      if (layers[key]) layer.addTo(map);
      else map.removeLayer(layer);
    });
  }, [layers]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    (markerRef.current as unknown as L.CircleMarker | null)?.setLatLng(center);
    map.panTo(center);
  }, [center]);

  return <div ref={holder} className="h-full w-full" />;
});

export default AreaMap;
