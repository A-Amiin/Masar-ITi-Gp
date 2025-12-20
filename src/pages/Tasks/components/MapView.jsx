import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


const RouteController = ({ customers, optimizeRoute }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    if (!optimizeRoute) return;

    const waypoints = customers
      .map((c) => {
        const lat = parseFloat(c.lat);
        const lng = parseFloat(c.lng);
        if (isNaN(lat) || isNaN(lng)) return null;
        return L.latLng(lat, lng);
      })
      .filter(Boolean);

    if (waypoints.length < 2) return;

    routingRef.current = L.Routing.control({
      waypoints,
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 5 }],
      },
    }).addTo(map);
  }, [optimizeRoute, customers, map]);

  return null;
};


const MapView = ({ customers = [], optimizeRoute }) => {
  return (
    <MapContainer
      center={[30.0444, 31.2357]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {customers.map((c) => {
        const lat = parseFloat(c.lat);
        const lng = parseFloat(c.lng);
        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <Marker key={c.id} position={[lat, lng]}>
            <Popup>
              <p className="font-semibold">{c.name}</p>
              <p>{c.activity}</p>
              <p className="text-sm text-muted-foreground">
                {c.classification}
              </p>
            </Popup>
          </Marker>
        );
      })}

  
      <RouteController
        customers={customers}
        optimizeRoute={optimizeRoute}
      />
    </MapContainer>
  );
};

export default MapView;
