import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";
import { useEffect, useMemo } from "react";

const HeatLayer = ({ points }) => {
  const map = useMap();

  // تحويل بيانات Firebase → HeatMap format
  const heatPoints = useMemo(() => {
    return points
      .filter(
        (p) =>
          p &&
          !isNaN(p.lat) &&
          !isNaN(p.lng)
      )
      .map((p) => [
        p.lat,
        p.lng,
        p.status === "completed" ? 1 : 0.6, // وزن أعلى للمكتمل
      ]);
  }, [points]);

  useEffect(() => {
    if (!heatPoints.length) return;

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 40,
      blur: 25,
      maxZoom: 7,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, heatPoints]);

  return null;
};

const SalesHeatMap = ({ points }) => {
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

      <HeatLayer points={points} />
    </MapContainer>
  );
};

export default SalesHeatMap;
