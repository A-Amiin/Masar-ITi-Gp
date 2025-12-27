import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CalendarDays, CheckCircle } from "lucide-react";

const TaskStat = ({ icon, label, value, bg }) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-lg ${bg}`}
  >
    <div className="p-2 bg-white rounded-md">{icon}</div>

    <div className="text-right">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const TasksReport = () => {
  return (
    <Card className="[direction:rtl]">
      <CardHeader>
        <CardTitle className="text-base">تقرير المهام</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TaskStat
            icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
            label="مهام جديدة"
            value="12"
            bg="bg-blue-50"
          />

          <TaskStat
            icon={<CalendarDays className="w-5 h-5 text-orange-600" />}
            label="مهام اليوم"
            value="24"
            bg="bg-orange-50"
          />

          <TaskStat
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            label="مهام مكتملة"
            value="548"
            bg="bg-green-50"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksReport;
