import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";
import { useEffect } from "react";

const heatPoints = [
  [30.0444, 31.2357, 0.9], 
  [30.0333, 31.2333, 0.8], 
  [31.2001, 29.9187, 0.7], 
  [30.7865, 31.0004, 0.6],
  [31.0409, 31.3785, 0.65], 
  [27.1809, 31.1837, 0.5],
  [26.5591, 31.6957, 0.4],
  [25.6872, 32.6396, 0.3],
];

const HeatLayer = () => {
  const map = useMap();
  const safeHeatPoints = heatPoints.filter(
  p =>
    Array.isArray(p) &&
    p.length >= 2 &&
    !isNaN(p[0]) &&
    !isNaN(p[1])
);

  useEffect(() => {
    const heatLayer = L.heatLayer(safeHeatPoints, {
      radius: 40,
      blur: 25,
      maxZoom: 7,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map]);

  return null;
};

const SalesHeatMap = () => {
  return (
    <MapContainer
      center={[26.8206, 30.8025]}
      zoom={6}
      style={{ height: "350px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <HeatLayer />
    </MapContainer>
  );
};

export default SalesHeatMap;
