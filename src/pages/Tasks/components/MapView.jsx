import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = ({
  customers = [],
  routePoints = [],
  areasGeoJson,
  selectedAreaId,
}) => {
  const areaStyle = (feature) => ({
    color:
      String(feature.id) === String(selectedAreaId)
        ? "#2563eb"
        : "#16a34a",
    weight: 2,
    fillOpacity: 0.35,
  });

  return (
    <MapContainer
      center={
        customers[0]
          ? [customers[0].lat, customers[0].lng]
          : [30.06, 31.33]
      }
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* مناطق GeoJSON */}
      {areasGeoJson && (
        <GeoJSON
          data={areasGeoJson}
          style={areaStyle}
          onEachFeature={(feature, layer) => {
            layer.bindTooltip(
              feature.properties?.SHYK_ANA_1,
              { sticky: true }
            );
          }}
        />
      )}

      {/* العملاء */}
      {customers.map((c) => (
        <Marker key={c.id} position={[c.lat, c.lng]} />
      ))}

      {/* المسار */}
      {routePoints.length > 1 && (
        <Polyline positions={routePoints} weight={5} />
      )}
    </MapContainer>
  );
};

export default MapView;
