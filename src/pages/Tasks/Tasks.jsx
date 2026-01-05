// // import { useState, useEffect } from "react";
// // import MapView from "./components/MapView";
// // import AssignForm from "./components/AssignForm";
// // import StatsCard from "./components/StatsCard";

// // import { subscribeToCustomers } from "@/services/customers.service";

// // const Tasks = () => {
// //   const [customers, setCustomers] = useState([]);
// //   const [routeCustomers, setRouteCustomers] = useState([]);
// //   const [routePoints, setRoutePoints] = useState([]);

// //   useEffect(() => {
// //     const unsub = subscribeToCustomers(setCustomers);
// //     return () => unsub && unsub();
// //   }, []);
// // const effectiveCustomers = customers
// //   .map(c => ({
// //     ...c,
// //     lat: c.address?.latitude,
// //     lng: c.address?.longitude,
// //   }))
// //   .filter(
// //     c =>
// //       Number.isFinite(c.lat) &&
// //       Number.isFinite(c.lng)
// //   );

// //   const calculateDistance = (lat1, lng1, lat2, lng2) => {
// //     const R = 6371;
// //     const dLat = (lat2 - lat1) * Math.PI / 180;
// //     const dLng = (lng2 - lng1) * Math.PI / 180;
// //     const a =
// //       Math.sin(dLat / 2) ** 2 +
// //       Math.cos(lat1 * Math.PI / 180) *
// //         Math.cos(lat2 * Math.PI / 180) *
// //         Math.sin(dLng / 2) ** 2;
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //     return R * c;
// //   };

// //   const optimizeRouteSimple = (customers) => {
// //     if (customers.length < 2) return customers;

// //     const visited = new Set();
// //     const route = [];
// //     let current = customers[0];

// //     route.push(current);
// //     visited.add(current.id);

// //     while (route.length < customers.length) {
// //       let nearest = null;
// //       let minDist = Infinity;

// //       for (const customer of customers) {
// //         if (!visited.has(customer.id)) {
// //           const dist = calculateDistance(
// //             current.lat,
// //             current.lng,
// //             customer.lat,
// //             customer.lng
// //           );
// //           if (dist < minDist) {
// //             minDist = dist;
// //             nearest = customer;
// //           }
// //         }
// //       }

// //       if (!nearest) break;

// //       route.push(nearest);
// //       visited.add(nearest.id);
// //       current = nearest;
// //     }

// //     return route;
// //   };

// //   const fetchRouteFromOSRM = async (customers) => {
// //     if (customers.length < 2) return [];

// //     const coords = customers
// //       .map(c => `${c.lng},${c.lat}`)
// //       .join(";");

// //     const res = await fetch(
// //       `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
// //     );

// //     const data = await res.json();

// //     return data.routes[0].geometry.coordinates.map(
// //       ([lng, lat]) => [lat, lng]
// //     );
// //   };

// //   const handleOptimizeRoute = async () => {
// //     const optimized = optimizeRouteSimple(effectiveCustomers);
// //     setRouteCustomers(optimized);

// //     const route = await fetchRouteFromOSRM(optimized);
// //     setRoutePoints(route);
// //   };

// //   return (
// //     <div className="space-y-6" dir="rtl">
// //       <h1 className="text-lg font-semibold">توزيع المهام</h1>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         <div className="lg:col-span-2 h-[500px]">
// //          <MapView
// //   customers={customers}
// //   routePoints={routePoints}
// //   areasGeoJson={areasGeoJson}
// //   selectedAreaId={selectedArea}
// // />

// //         </div>

// //         <AssignForm onOptimizeRoute={handleOptimizeRoute} />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         <StatsCard title="معلقة" value="2" />
// //         <StatsCard title="مكتملة" value="14" />
// //         <StatsCard title="قيد التنفيذ" value="8" />
// //         <StatsCard title="المهام اليوم" value="24" />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Tasks;
// import { useState, useEffect } from "react";
// import MapView from "./components/MapView";
// import AssignForm from "./components/AssignForm";
// import StatsCard from "./components/StatsCard";

// import { subscribeToCustomers } from "@/services/customers.service";

// const Tasks = () => {
//   const [customers, setCustomers] = useState([]);
//   const [routeCustomers, setRouteCustomers] = useState([]);
//   const [routePoints, setRoutePoints] = useState([]);

//   // 🔹 GeoJSON + المنطقة المختارة
//   const [areasGeoJson, setAreasGeoJson] = useState(null);
//   const [selectedArea, setSelectedArea] = useState(null);

//   // العملاء
//   useEffect(() => {
//     const unsub = subscribeToCustomers(setCustomers);
//     return () => unsub && unsub();
//   }, []);

//   // تحميل المناطق من public/areas.json
//   useEffect(() => {
//     fetch("/areas.json")
//       .then((res) => res.json())
//       .then((data) => setAreasGeoJson(data))
//       .catch(console.error);
//   }, []);
//   console.log(
//   "RAW customers addresses:",
//   customers.map(c => c.address)
// );
// const effectiveCustomers = customers
//   .map((c) => {
//     const address = c.address;

//     const lat =
//       typeof address?.latitude === "number"
//         ? address.latitude
//         : address?._lat;

//     const lng =
//       typeof address?.longitude === "number"
//         ? address.longitude
//         : address?._long;

//     return {
//       ...c,
//       lat,
//       lng,
//     };
//   })
//   .filter(
//     (c) =>
//       Number.isFinite(c.lat) &&
//       Number.isFinite(c.lng)
//   );

// useEffect(() => {
//   console.log("RAW customers objects:", customers);
//   console.log("customers count:", customers.length);
// }, [customers]);

//   const calculateDistance = (lat1, lng1, lat2, lng2) => {
//     const R = 6371;
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLng = ((lng2 - lng1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLng / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const optimizeRouteSimple = (customers) => {
//     if (customers.length < 2) return customers;

//     const visited = new Set();
//     const route = [];
//     let current = customers[0];

//     route.push(current);
//     visited.add(current.id);

//     while (route.length < customers.length) {
//       let nearest = null;
//       let minDist = Infinity;

//       for (const customer of customers) {
//         if (!visited.has(customer.id)) {
//           const dist = calculateDistance(
//             current.lat,
//             current.lng,
//             customer.lat,
//             customer.lng
//           );
//           if (dist < minDist) {
//             minDist = dist;
//             nearest = customer;
//           }
//         }
//       }

//       if (!nearest) break;

//       route.push(nearest);
//       visited.add(nearest.id);
//       current = nearest;
//     }

//     return route;
//   };

//   const fetchRouteFromOSRM = async (customers) => {
//     if (customers.length < 2) return [];

//     const coords = customers
//       .map((c) => `${c.lng},${c.lat}`)
//       .join(";");

//     const res = await fetch(
//       `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
//     );

//     const data = await res.json();

//     return data.routes[0].geometry.coordinates.map(
//       ([lng, lat]) => [lat, lng]
//     );
//   };

//   const handleOptimizeRoute = async () => {
//     const optimized = optimizeRouteSimple(effectiveCustomers);
//     setRouteCustomers(optimized);

//     const route = await fetchRouteFromOSRM(optimized);
//     setRoutePoints(route);
//   };
// console.log("effectiveCustomers:", effectiveCustomers.length);
// console.log("all customers:", customers.length);

//   return (
//     <div className="space-y-6" dir="rtl">
//       <h1 className="text-lg font-semibold">توزيع المهام</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 h-[500px]">
//           <MapView
//             customers={effectiveCustomers}
//             routePoints={routePoints}
//             areasGeoJson={areasGeoJson}
//             selectedAreaId={selectedArea}
//           />
//         </div>

//         <AssignForm
//           onOptimizeRoute={handleOptimizeRoute}
//           onAreaChange={setSelectedArea}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatsCard title="معلقة" value="2" />
//         <StatsCard title="مكتملة" value="14" />
//         <StatsCard title="قيد التنفيذ" value="8" />
//         <StatsCard title="المهام اليوم" value="24" />
//       </div>
//     </div>
//   );
// };

// export default Tasks;
import { useState, useEffect, useMemo } from "react";
import MapView from "./components/MapView";
import AssignForm from "./components/AssignForm";
import StatsCard from "./components/StatsCard";

import { subscribeToCustomers } from "@/services/customers.service";

// Firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Turf
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

const Tasks = () => {
  const [customers, setCustomers] = useState([]);
  const [routePoints, setRoutePoints] = useState([]);

  const [areasGeoJson, setAreasGeoJson] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  /* =======================
     تحميل العملاء
  ======================= */
  useEffect(() => {
    const unsub = subscribeToCustomers(setCustomers);
    return () => unsub && unsub();
  }, []);

  /* =======================
     تحميل المناطق
  ======================= */
  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then(setAreasGeoJson)
      .catch(console.error);
  }, []);

  /* =======================
     تجهيز العملاء lat / lng
  ======================= */
  const effectiveCustomers = useMemo(() => {
    return customers
      .map((c) => {
        const lat =
          typeof c.address?.latitude === "number"
            ? c.address.latitude
            : c.address?._lat;

        const lng =
          typeof c.address?.longitude === "number"
            ? c.address.longitude
            : c.address?._long;

        return { ...c, lat, lng };
      })
      .filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lng));
  }, [customers]);

  /* =======================
     المنطقة المختارة
  ======================= */
  const selectedAreaFeature = useMemo(() => {
    if (!areasGeoJson || !selectedAreaId) return null;
    return areasGeoJson.features.find(
      (f) => String(f.id) === String(selectedAreaId)
    );
  }, [areasGeoJson, selectedAreaId]);

  /* =======================
     العملاء داخل المنطقة
  ======================= */
  const customersInsideArea = useMemo(() => {
    if (!selectedAreaFeature) return [];
    return effectiveCustomers.filter((c) =>
      booleanPointInPolygon(point([c.lng, c.lat]), selectedAreaFeature)
    );
  }, [effectiveCustomers, selectedAreaFeature]);

  /* =======================
     حساب المسافة
  ======================= */
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  /* =======================
     ترتيب Nearest Neighbor
  ======================= */
  const optimizeRouteSimple = (list) => {
    if (list.length < 2) return list;
    const visited = new Set();
    const route = [];
    let current = list[0];

    route.push(current);
    visited.add(current.id);

    while (route.length < list.length) {
      let nearest = null;
      let min = Infinity;

      for (const c of list) {
        if (!visited.has(c.id)) {
          const d = calculateDistance(
            current.lat,
            current.lng,
            c.lat,
            c.lng
          );
          if (d < min) {
            min = d;
            nearest = c;
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

  /* =======================
     OSRM
  ======================= */
  const fetchRouteFromOSRM = async (ordered) => {
    if (ordered.length < 2) return [];
    const coords = ordered.map((c) => `${c.lng},${c.lat}`).join(";");
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
    );
    const data = await res.json();
    return data.routes[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );
  };

  /* =======================
     زر أفضل مسار
  ======================= */
  const handleOptimizeRoute = async () => {
    if (!customersInsideArea.length) return setRoutePoints([]);
    const ordered = optimizeRouteSimple(customersInsideArea);
    const route = await fetchRouteFromOSRM(ordered);
    setRoutePoints(route);
  };

  /* =======================
     🔥 تخزين المهمة
  ======================= */
  const handleConfirmTask = async ({
    agent,
    taskType,
    area,
    products,
  }) => {
    const totalPrice = products.reduce(
      (sum, p) => sum + (p.price ?? 0) * (p.quantity ?? 1),
      0
    );

    await addDoc(collection(db, "tasks"), {
      status: "assigned",
      taskType,
      createdAt: serverTimestamp(),

      agent: {
        id: agent.id,
        name: agent.name,
        phone: agent.phone,
      },

      area: {
        id: area.id,
        name: area.properties?.SHYK_ANA_1,
      },

      customers: customersInsideArea.map((c) => ({
        id: c.id,
        name: c.nameAr || c.name,
        lat: c.lat,
        lng: c.lng,
        phone: c.phone,
      })),

  route: routePoints.map(([lat, lng]) => ({
  lat,
  lng,
})),


      products: products.map((p) => ({
        id: p.id,
        name: p.nameAr || p.nameEn,
        price: p.price,
        quantity: p.quantity ?? 1,
      })),

      totalPrice,
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-lg font-semibold">توزيع المهام</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[500px]">
          <MapView
            customers={customersInsideArea}
            routePoints={routePoints}
            areasGeoJson={areasGeoJson}
            selectedAreaId={selectedAreaId}
          />
        </div>

        <AssignForm
          onOptimizeRoute={handleOptimizeRoute}
          onAreaChange={setSelectedAreaId}
          onConfirmTask={handleConfirmTask}
        />
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
