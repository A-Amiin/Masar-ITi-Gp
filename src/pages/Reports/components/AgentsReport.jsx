import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AgentsReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentsSales = async () => {
      try {
        const repsSnap = await getDocs(collection(db, "representative"));
        const result = [];

        for (const repDoc of repsSnap.docs) {
          const repData = repDoc.data();
          const repId = repDoc.id;

          const ordersSnap = await getDocs(
            collection(db, "representative", repId, "orders")
          );

          let totalSales = 0;

          ordersSnap.forEach((orderDoc) => {
            const order = orderDoc.data();
            if (order.status === "completed") {
              totalSales += order.totalPrice ?? 0;
            }
          });

          result.push({
            name: repData.nameAr || repData.name || "مندوب",
            sales: totalSales,
          });
        }

        setData(result);
      } catch (err) {
        console.error("Agents report error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentsSales();
  }, []);

  return (
    <Card className="[direction:rtl]">
      <CardHeader>
        <CardTitle className="text-base">تقرير المندوبين</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground text-center">
            جاري تحميل البيانات...
          </p>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="sales"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentsReport;
