import { useState, useEffect } from "react";
import MapView from "./components/MapView";
import AssignForm from "./components/AssignForm";
import StatsCard from "./components/StatsCard";

import { subscribeToCustomers } from "@/services/customers.service";

const Tasks = () => {
  const [customers, setCustomers] = useState([]);
  const [routeCustomers, setRouteCustomers] = useState([]);
  const [routePoints, setRoutePoints] = useState([]);

  useEffect(() => {
    const unsub = subscribeToCustomers(setCustomers);
    return () => unsub && unsub();
  }, []);
const effectiveCustomers = customers
  .map(c => ({
    ...c,
    lat: c.address?.latitude,
    lng: c.address?.longitude,
  }))
  .filter(
    c =>
      Number.isFinite(c.lat) &&
      Number.isFinite(c.lng)
  );

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const optimizeRouteSimple = (customers) => {
    if (customers.length < 2) return customers;

    const visited = new Set();
    const route = [];
    let current = customers[0];

    route.push(current);
    visited.add(current.id);

    while (route.length < customers.length) {
      let nearest = null;
      let minDist = Infinity;

      for (const customer of customers) {
        if (!visited.has(customer.id)) {
          const dist = calculateDistance(
            current.lat,
            current.lng,
            customer.lat,
            customer.lng
          );
          if (dist < minDist) {
            minDist = dist;
            nearest = customer;
          }
        }
      }

      if (!nearest) break;

      route.push(nearest);
      visited.add(nearest.id);
      current = nearest;
    }

    return route;
  };

  const fetchRouteFromOSRM = async (customers) => {
    if (customers.length < 2) return [];

    const coords = customers
      .map(c => `${c.lng},${c.lat}`)
      .join(";");

    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
    );

    const data = await res.json();

    return data.routes[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );
  };

  const handleOptimizeRoute = async () => {
    const optimized = optimizeRouteSimple(effectiveCustomers);
    setRouteCustomers(optimized);

    const route = await fetchRouteFromOSRM(optimized);
    setRoutePoints(route);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-lg font-semibold">توزيع المهام</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[500px]">
          <MapView
            customers={effectiveCustomers}
            routePoints={routePoints}
          />
        </div>

        <AssignForm onOptimizeRoute={handleOptimizeRoute} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="معلقة" value="2" />
        <StatsCard title="مكتملة" value="14" />
        <StatsCard title="قيد التنفيذ" value="8" />
        <StatsCard title="المهام اليوم" value="24" />
      </div>
    </div>
  );
};

export default Tasks;
