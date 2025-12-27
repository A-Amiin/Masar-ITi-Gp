import { useState } from "react";

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


const Reports = () => {
  const [reportType, setReportType] = useState("sales");

  return (
    <div className="space-y-6" dir="rtl">

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">التقارير اليومية</h1>

        <div className="flex items-center gap-3">
          <Button size="sm">
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
          value="7 طلب"
          bg="bg-orange-50"
        />
        <StatCard
          icon={<Users className="w-5 h-5 text-cyan-500" />}
          title="المندوبين النشطين"
          value="13 مندوب"
          bg="bg-cyan-50"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5 text-blue-500" />}
          title="المهام المكتملة اليوم"
          value="24 مهمة"
          bg="bg-blue-50"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          title="إجمالي المبيعات اليوم"
          value="45,250 جنيه"
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
          <SummaryRow label="مبيعات اليوم" value="45,250 جنيه" />
          <SummaryRow label="مبيعات الأسبوع" value="312,400 جنيه" />
          <SummaryRow label="مبيعات الشهر" value="1,245,800 جنيه" />
          <SummaryRow
            label="إجمالي السنة"
            value="12,458,600 جنيه"
            highlight
          />
        </CardContent>
      </Card>

      <Card className="[direction:rtl]">
        <CardHeader>
          <CardTitle className="text-base">نظرة عامة على المبيعات</CardTitle>
        </CardHeader>
        <CardContent>
       <SalesHeatMap/>
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
