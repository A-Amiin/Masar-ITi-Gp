import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ customers, routePoints }) => {
  return (
    <MapContainer
      center={customers[0] ? [customers[0].lat, customers[0].lng] : [30.06, 31.33]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {customers.map(c => (
        <Marker key={c.id} position={[c.lat, c.lng]} />
      ))}

      {routePoints.length > 1 && (
        <Polyline positions={routePoints} color="blue" weight={5} />
      )}
    </MapContainer>
  );
};

export default MapView;
