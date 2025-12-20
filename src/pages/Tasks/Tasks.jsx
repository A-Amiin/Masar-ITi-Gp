import { useState, useEffect } from "react";
import MapView from "./components/MapView";
import AssignForm from "./components/AssignForm";
import StatsCard from "./components/StatsCard";

// لو لسه موصلة Firebase
import { subscribeToCustomers } from "@/services/customers.service";

const Tasks = () => {
  const [customers, setCustomers] = useState([]);      // ✅ لازم
  const [optimizeRoute, setOptimizeRoute] = useState(false);

  // 🔄 تحميل النقط من Firebase
  useEffect(() => {
    const unsub = subscribeToCustomers(setCustomers);
    return () => unsub && unsub();
  }, []);
console.log("optimizeRoute:", optimizeRoute);

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-lg font-semibold">توزيع المهام</h1>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        



        <div className="lg:col-span-2">
          <MapView  customers={customers} optimizeRoute={optimizeRoute} />
        </div>


        <AssignForm  onOptimizeRoute={() => setOptimizeRoute(true)} />
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
