import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  ZoomControl,
  GeoJSON,
} from "react-leaflet";
import { useMemo, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function MapView() {
  const [agentsData, setAgentsData] = useState([]);
  const [areasGeoJson, setAreasGeoJson] = useState(null);

  const center = useMemo(() => [30.0444, 31.2357], []);

  // تحميل المناطق
  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then(setAreasGeoJson)
      .catch(console.error);
  }, []);

  // جلب المندوبين وأوردراتهم
  useEffect(() => {
    const fetchAgentsData = async () => {
      try {
        const repsSnap = await getDocs(collection(db, "representative"));
        const agents = [];

        for (const repDoc of repsSnap.docs) {
          const repData = repDoc.data();
          const repId = repDoc.id;

          // جلب الأوردرات للمندوب
          const ordersSnap = await getDocs(
            collection(db, "representative", repId, "orders")
          );

          const orders = [];
          ordersSnap.forEach((orderDoc) => {
            orders.push(orderDoc.data());
          });

          // تجميع الأوردرات حسب المنطقة
          const areasMap = {};
          orders.forEach((order) => {
            const areaId = order.area?.id;
            if (areaId) {
              if (!areasMap[areaId]) {
                areasMap[areaId] = {
                  area: order.area,
                  orders: [],
                };
              }
              areasMap[areaId].orders.push(order);
            }
          });

          // إضافة المندوب مع مناطقه
          agents.push({
            id: repId,
            name: repData.nameAr || repData.name || "مندوب",
            areas: Object.values(areasMap),
          });
        }

        setAgentsData(agents);
      } catch (error) {
        console.error("Error fetching agents data:", error);
      }
    };

    fetchAgentsData();
  }, []);

  // حساب موقع المندوب بناءً على مناطقه
  const agentsWithPositions = useMemo(() => {
    if (!areasGeoJson) return [];

    return agentsData
      .map((agent) => {
        // إذا كان لدى المندوب مناطق، احسب الموقع المتوسط
        if (agent.areas && agent.areas.length > 0) {
          const positions = agent.areas
            .map((areaData) => {
              const feature = areasGeoJson.features.find(
                (f) => String(f.id) === String(areaData.area.id)
              );
              if (feature && feature.geometry && feature.geometry.coordinates) {
                // حساب مركز المنطقة (centroid بسيط)
                const coords = feature.geometry.coordinates[0]; // افتراض polygon
                const lats = coords.map((c) => c[1]);
                const lngs = coords.map((c) => c[0]);
                const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
                const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
                return [avgLat, avgLng];
              }
              return null;
            })
            .filter(Boolean);

          if (positions.length > 0) {
            // متوسط المواقع
            const avgLat = positions.reduce((sum, pos) => sum + pos[0], 0) / positions.length;
            const avgLng = positions.reduce((sum, pos) => sum + pos[1], 0) / positions.length;
            return {
              ...agent,
              position: [avgLat, avgLng],
              status: "online", // افتراض أنهم متصلون إذا لديهم أوردرات
            };
          }
        }

        // إزالة المندوبين غير المتصلين (الذين ليس لديهم مناطق)
        return null;
      })
      .filter(Boolean); // إزالة القيم null
  }, [agentsData, areasGeoJson]);

  return (
    <div style={{ height: "600px", width: "100%", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={11}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ZoomControl position="topright" />

        {/* المندوبين */}
        {agentsWithPositions.map((agent) => (
          <CircleMarker
            key={agent.id}
            center={agent.position}
            radius={8}
            pathOptions={{
              color: agent.status === "online" ? "#16a34a" : "#9ca3af",
              fillColor:
                agent.status === "online" ? "#22c55e" : "#d1d5db",
              fillOpacity: 1,
            }}
          />
        ))}

        {/* المناطق */}
        {areasGeoJson && (
          <GeoJSON
            data={areasGeoJson}
            style={{
              color: "#3b82f6",
              weight: 2,
              opacity: 0.6,
              fillColor: "#3b82f6",
              fillOpacity: 0.1,
            }}
          />
        )}
      </MapContainer>

      {/* Legend */}
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
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          مندوب متصل
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 6,
          }}
        >
          <span
            style={{
              width: 24,
              height: 3,
              background: "#3b82f6",
            }}
          />
          المناطق
        </div>
      </div>
    </div>
  );
}
