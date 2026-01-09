import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CalendarDays, CheckCircle } from "lucide-react";

const TaskStat = ({ icon, label, value, bg }) => (
  <div className={`flex items-center gap-3 p-4 rounded-lg ${bg}`}>
    <div className="p-2 bg-white rounded-md">{icon}</div>

    <div className="text-right">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const TasksReport = () => {
  const [stats, setStats] = useState({
    newTasks: 0,
    todayTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const unsub = onSnapshot(ordersRef, (snapshot) => {
      let newTasks = 0;
      let todayTasks = 0;
      let completedTasks = 0;

      snapshot.forEach((doc) => {
        const order = doc.data();
        const createdAt = order.createdAt?.toDate();

        if (order.status === "assigned") {
          newTasks++;
        }

        if (order.status === "completed") {
          completedTasks++;
        }

        if (createdAt && createdAt >= startOfDay) {
          todayTasks++;
        }
      });

      setStats({
        newTasks,
        todayTasks,
        completedTasks,
      });
    });

    return () => unsub();
  }, []);

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
            value={stats.newTasks}
            bg="bg-blue-50"
          />

          <TaskStat
            icon={<CalendarDays className="w-5 h-5 text-orange-600" />}
            label="مهام اليوم"
            value={stats.todayTasks}
            bg="bg-orange-50"
          />

          <TaskStat
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            label="مهام مكتملة"
            value={stats.completedTasks}
            bg="bg-green-50"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksReport;
