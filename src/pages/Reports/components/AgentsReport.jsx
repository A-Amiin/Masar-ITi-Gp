import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "أحمد", orders: 120 },
  { name: "محمد", orders: 95 },
  { name: "علي", orders: 150 },
  { name: "سارة", orders: 80 },
  { name: "يوسف", orders: 110 },
];

const AgentsReport = () => {
  return (
    <Card className="[direction:rtl]">
      <CardHeader>
        <CardTitle className="text-base">تقرير المندوبين</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="orders"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentsReport;
