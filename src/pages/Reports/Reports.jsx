import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import StatCard from "./components/StatCard";
import SummaryRow from "./components/SummaryRow";

import {
  FileText,
  Users,
  CheckCircle,
  TrendingUp,
  Download,
  FileBarChart,
} from "lucide-react";

import SalesHeatMap from "./components/SalesHeatMap"
import TasksReport from "./components/TasksReport"

import AgentsReport from "./components/AgentsReport";
import { exportReportsToExcel } from "@/utils/exportReportsToExcel";



const Reports = () => {
  const [reportType, setReportType] = useState("sales");
  const [stats, setStats] = useState({
  deliveredOrders: 0,
  activeAgents: 0,
  completedToday: 0,
  totalSalesToday: 0,
});
const [salesSummary, setSalesSummary] = useState({
  today: 0,
  week: 0,
  month: 0,
  year: 0,
});

const [mapPoints, setMapPoints] = useState([]);

useEffect(() => {
  // ---------- Orders ----------
  const ordersRef = collection(db, "orders");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

 const unsubOrders = onSnapshot(ordersRef, (snapshot) => {
  let deliveredOrders = 0;
  let completedToday = 0;
  let totalSalesToday = 0;
  const points = [];
const now = new Date();
const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - now.getDay());
startOfWeek.setHours(0, 0, 0, 0);

const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const startOfYear = new Date(now.getFullYear(), 0, 1);

let today = 0;
let week = 0;
let month = 0;
let year = 0;

  snapshot.forEach((doc) => {
    const order = doc.data();
    const createdAt = order.createdAt?.toDate();

    if (order.customer?.lat && order.customer?.lng) {
      points.push({
        lat: order.customer.lat,
        lng: order.customer.lng,
        status: order.status,
      });
    }

    if (order.status === "completed") {
      deliveredOrders++;

      if (createdAt && createdAt >= startOfDay) {
        completedToday++;
        totalSalesToday += order.totalPrice ?? 0;
      }
    }
    if (order.status === "completed" && createdAt) {
  if (createdAt >= startOfDay) today += order.totalPrice ?? 0;
  if (createdAt >= startOfWeek) week += order.totalPrice ?? 0;
  if (createdAt >= startOfMonth) month += order.totalPrice ?? 0;
  if (createdAt >= startOfYear) year += order.totalPrice ?? 0;
}

  });
setSalesSummary({ today, week, month, year });

  setStats((prev) => ({
    ...prev,
    deliveredOrders,
    completedToday,
    totalSalesToday,
  }));

  setMapPoints(points);
});


  // ---------- Representatives ----------
  const repsRef = collection(db, "representative");

  const unsubReps = onSnapshot(repsRef, (snapshot) => {
    setStats((prev) => ({
      ...prev,
      activeAgents: snapshot.size,
    }));
  });

  return () => {
    unsubOrders();
    unsubReps();
  };
}, []);

  return (
    <div className="space-y-6" dir="rtl">

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">التقارير اليومية</h1>

        <div className="flex items-center gap-3">
       <Button
  size="sm"
  onClick={() =>
    exportReportsToExcel({
      stats,
      salesSummary,
    })
  }
>
  <Download className="w-4 h-4 ml-2" />
  تصدير
</Button>


          <Select>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="اليوم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="week">الأسبوع</SelectItem>
              <SelectItem value="month">الشهر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 [direction:ltr]">
  <StatCard
    icon={<FileText className="w-5 h-5 text-orange-500" />}
    title="الطلبات الموصلة"
    value={`${stats.deliveredOrders} طلب`}
    bg="bg-orange-50"
  />

  <StatCard
    icon={<Users className="w-5 h-5 text-cyan-500" />}
    title="المندوبين النشطين"
    value={`${stats.activeAgents} مندوب`}
    bg="bg-cyan-50"
  />

  <StatCard
    icon={<CheckCircle className="w-5 h-5 text-blue-500" />}
    title="المهام المكتملة اليوم"
    value={`${stats.completedToday} مهمة`}
    bg="bg-blue-50"
  />

  <StatCard
    icon={<TrendingUp className="w-5 h-5 text-green-500" />}
    title="إجمالي المبيعات اليوم"
    value={`${stats.totalSalesToday.toLocaleString()} جنيه`}
    bg="bg-green-50"
  />
</div>


<Card>
  <CardContent className="p-4 flex justify-start">
    <Select value={reportType} onValueChange={setReportType}>
<SelectTrigger className="w-56">

        <FileBarChart className="w-4 h-4 ml-2" />
        <SelectValue placeholder="اختر التقرير" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="sales">تقرير المبيعات</SelectItem>
        <SelectItem value="tasks">تقرير المهام</SelectItem>
        <SelectItem value="agents">تقرير المندوبين</SelectItem>
      </SelectContent>
    </Select>
  </CardContent>
</Card>


 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 [direction:ltr]">

  {reportType === "sales" && (
    <>
      {/* ملخص المبيعات */}
<Card className="[direction:rtl]">
  <CardHeader>
    <CardTitle className="text-base">ملخص المبيعات</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    <SummaryRow
      label="مبيعات اليوم"
      value={`${salesSummary.today.toLocaleString()} جنيه`}
    />
    <SummaryRow
      label="مبيعات الأسبوع"
      value={`${salesSummary.week.toLocaleString()} جنيه`}
    />
    <SummaryRow
      label="مبيعات الشهر"
      value={`${salesSummary.month.toLocaleString()} جنيه`}
    />
    <SummaryRow
      label="إجمالي السنة"
      value={`${salesSummary.year.toLocaleString()} جنيه`}
      highlight
    />
  </CardContent>
</Card>


      <Card className="[direction:rtl]">
        <CardHeader>
          <CardTitle className="text-base">نظرة عامة على المبيعات</CardTitle>
        </CardHeader>
        <CardContent>
       <SalesHeatMap points={mapPoints} />

        </CardContent>
      </Card>
    </>
  )}

{reportType === "tasks" && (
  <div className="lg:col-span-2">
    <TasksReport />
  </div>
)}

{reportType === "agents" && (
  <div className="lg:col-span-2">
    <AgentsReport />
  </div>
)}


</div>

    </div>
  );
};

export default Reports;
