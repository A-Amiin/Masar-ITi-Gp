import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Users, CheckCircle, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "إجمالي الطلبات",
    value: "1,245 طلب",
    icon: ShoppingCart,
  },
  {
    title: "المندوبين النشطون",
    value: "13 مندوب",
    icon: Users,
  },
  {
    title: "المهام المكتملة",
    value: "548 مهمة",
    icon: CheckCircle,
  },
  {
    title: "إجمالي المبيعات",
    value: "985,000 جنيه",
    icon: TrendingUp,
  },
];

export default function NavDashboard() {
  return (
    <div className="p-2 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <div className="flex gap-2">
          <Button variant="outline">اليوم</Button>
          <Button variant="outline">الأسبوع</Button>
          <Button className="bg-primary text-primary-foreground">الشهر</Button>
          <Button variant="outline">السنة</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card key={index} className="rounded-2xl">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-xl font-semibold">{item.value}</p>
              </div>
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-muted">
                <item.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}