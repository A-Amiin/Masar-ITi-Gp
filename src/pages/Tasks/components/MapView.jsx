import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({
  customers = [],        // كل العملاء
  areaCustomers = [],    // العملاء داخل المنطقة
  routePoints = [],
  areasGeoJson,
  selectedAreaId,
}) => {
  // IDs العملاء داخل المنطقة
  const areaCustomerIds = new Set(
    areaCustomers.map((c) => c.id)
  );

  return (
    <MapContainer
      center={[30.0444, 31.2357]}
      zoom={11}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ZoomControl position="topright" />

      {/* المناطق */}
      {areasGeoJson && (
        <GeoJSON
          data={areasGeoJson}
          style={(feature) => ({
            color:
              String(feature.id) === String(selectedAreaId)
                ? "#2563eb"
                : "#16a34a",
            weight: 2,
            fillOpacity: 0.35,
          })}
          onEachFeature={(feature, layer) => {
            layer.bindTooltip(
              feature.properties?.SHYK_ANA_1,
              { sticky: true }
            );
          }}
        />
      )}

      {/* كل العملاء */}
      {customers.map((c) => (
        <CircleMarker
          key={c.id}
          center={[c.lat, c.lng]}
          radius={5}
          pathOptions={{
            color: areaCustomerIds.has(c.id)
              ? "#2563eb"   // داخل المنطقة
              : "#9ca3af",  // خارج المنطقة
            fillColor: areaCustomerIds.has(c.id)
              ? "#3b82f6"
              : "#d1d5db",
            fillOpacity: 1,
          }}
        />
      ))}

      {/* المسار */}
      {routePoints.length > 1 && (
        <Polyline
          positions={routePoints}
          pathOptions={{
            color: "#0ea5e9",
            weight: 4,
          }}
        />
      )}
    </MapContainer>
  );
};

export default MapView;
