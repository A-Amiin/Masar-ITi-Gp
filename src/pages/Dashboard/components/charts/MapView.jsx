import { MapContainer, TileLayer, CircleMarker, Polyline, ZoomControl } from "react-leaflet";
import { useMemo } from "react";
import "leaflet/dist/leaflet.css";

export default function MapView() {

  const center = useMemo(() => [30.0444, 31.2357], []);

  const agents = [
    {
      id: 1,
      name: "مندوب متصل",
      position: [30.0444, 31.2357],
      status: "online",
    },
    {
      id: 2,
      name: "مندوب غير متصل",
      position: [30.05, 31.22],
      status: "offline",
    },
  ];

  const route = [
    [30.0444, 31.2357],
    [30.047, 31.24],
    [30.05, 31.22],
  ];

  return (
    <div style={{ height: "600px", width: "100%", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={11}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

 
        <ZoomControl position="topright" />

  
        {agents.map((agent) => (
          <CircleMarker
            key={agent.id}
            center={agent.position}
            radius={8}
            pathOptions={{
              color: agent.status === "online" ? "#16a34a" : "#9ca3af",
              fillColor: agent.status === "online" ? "#22c55e" : "#d1d5db",
              fillOpacity: 1,
            }}
          />
        ))}

    
     
      </MapContainer>


      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          background: "#fff",
          padding: 12,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,.15)",
          fontSize: 14,
          zIndex: 999,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#22c55e"
          }} />
          مندوب متصل
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <span style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#d1d5db"
          }} />
          مندوب غير متصل
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <span style={{
            width: 24,
            height: 3,
            background: "#0ea5e9"
          }} />
          مسار المندوب
        </div>
      </div>
    </div>
  );
}
