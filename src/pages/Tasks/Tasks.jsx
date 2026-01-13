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
import { collection, doc, setDoc, serverTimestamp, onSnapshot  } from "firebase/firestore";
import { db } from "@/lib/firebase";


// Turf
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

const Tasks = () => {
  const [customers, setCustomers] = useState([]);
  const [routePoints, setRoutePoints] = useState([]);

  const [areasGeoJson, setAreasGeoJson] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
const [customerTasks, setCustomerTasks] = useState({});
const [stats, setStats] = useState({
  assigned: 0,
  completed: 0,
  failed: 0,
  total: 0,
});

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
      let lat = null;
      let lng = null;

      if (Array.isArray(c.address)) {
        lat = Number(c.address[0]);
        lng = Number(c.address[1]);
      } else if (
        c.address &&
        typeof c.address === "object"
      ) {
        lat = Number(c.address.lat ?? c.address.latitude);
        lng = Number(c.address.lng ?? c.address.longitude);
      }

      return {
        id: c.id,
        name: c.nameAr || c.name,
        phone: c.phone,
        lat,
        lng,
      };
    })
    .filter((c) => !Number.isNaN(c.lat) && !Number.isNaN(c.lng));
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

    try {
      const coords = ordered.map((c) => `${c.lng},${c.lat}`).join(";");
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
      );
      const data = await res.json();

      if (!data.routes?.length) return [];

      return data.routes[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
      );
    } catch (err) {
      console.error("OSRM error:", err);
      return [];
    }
  };

  /* =======================
     زر أفضل مسار
  ======================= */
  const handleOptimizeRoute = async () => {
    if (!selectedAreaId || !customersInsideArea.length) {
      setRoutePoints([]);
      return;
    }

    const ordered = optimizeRouteSimple(customersInsideArea);
    const route = await fetchRouteFromOSRM(ordered);
    setRoutePoints(route);
  };


const TASK_TYPE_LABELS = {
  return: "استرجاع",
  delivery: "توصيل",
};

const handleConfirmTask = async ({
  representativeId,
  area,
  customerTasks,
}) => {
  if (!representativeId || !area || !customerTasks) return;

  for (const customer of customersInsideArea) {
    const config = customerTasks[customer.id];
    if (!config || !config.products?.length) continue;

    const totalPrice = config.products.reduce(
      (sum, p) => sum + (p.price ?? 0) * (p.quantity ?? 1),
      0
    );

    const orderData = {
      status: "assigned",
      createdAt: serverTimestamp(),
      representativeId,
taskType: {
  key: config.taskType,
  label: TASK_TYPE_LABELS[config.taskType],
},


      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        lat: customer.lat,
        lng: customer.lng,
      },

      area: {
        id: area.id,
        name: area.properties?.SHYK_ANA_1,
      },

      products: config.products.map((p) => ({
        id: p.id,
        name: p.nameAr || p.nameEn,
        price: p.price,
        quantity: p.quantity,
      })),

      totalPrice,
    };

    const orderId = doc(collection(db, "orders")).id;

    // تحت المندوب
    await setDoc(
      doc(db, "representative", representativeId, "orders", orderId),
      orderData
    );

    // collection عامة
    await setDoc(
      doc(db, "orders", orderId),
      orderData
    );
  }
};



useEffect(() => {
  console.log("customers state:", customers);
}, [customers]);
useEffect(() => {
  const ordersRef = collection(db, "orders");

  const unsub = onSnapshot(ordersRef, (snapshot) => {
    let assigned = 0;
    let completed = 0;
    let failed = 0;

    snapshot.forEach((doc) => {
      const order = doc.data();

      if (order.status === "assigned") assigned++;
      if (order.status === "completed") completed++;
      if (order.status === "failed") failed++;
    });

    setStats({
      assigned,
      completed,
      failed,
      total: snapshot.size, // كل المهام
    });
  });

  return () => unsub();
}, []);

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-lg font-semibold">توزيع المهام</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[500px]">
          <MapView
            customers={effectiveCustomers}
            areaCustomers={customersInsideArea}
            routePoints={routePoints}
            areasGeoJson={areasGeoJson}
            selectedAreaId={selectedAreaId}
          />
        </div>

    <AssignForm
  customersInsideArea={customersInsideArea}
  onOptimizeRoute={handleOptimizeRoute}
  onAreaChange={setSelectedAreaId}
  onConfirmTask={handleConfirmTask}
/>

      </div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <StatsCard title="معلقة" value={stats.assigned} />
  <StatsCard title="مكتملة" value={stats.completed} />
  <StatsCard title="فاشلة" value={stats.failed} />
  <StatsCard title="المهام" value={stats.total} />
</div>

    </div>
  );
};

export default Tasks;
