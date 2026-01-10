import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Users, CheckCircle, TrendingUp } from "lucide-react";
import { useCrudService } from "@/hooks/useCrudService";
import { useMemo } from "react";

export default function NavDashboard() {
  const { Items: orders, loading: ordersLoading } =
    useCrudService("orders");

  const { Items: representatives } =
    useCrudService("representative");

  const stats = useMemo(() => {
    let completedTasks = 0;
    let totalSales = 0;

    orders.forEach((order) => {
      order.products?.forEach((product) => {
        if (product.status === "completed") {
          completedTasks += 1;
          totalSales += product.price * product.quantity;
        }
      });
    });

    return [
      {
        title: "إجمالي الطلبات",
        value: `${orders.length} طلب`,
        icon: ShoppingCart,
      },
      {
        title: "المندوبين النشطون",
        value: `${representatives.length} مندوب`,
        icon: Users,
      },
      {
        title: "المهام المكتملة",
        value: `${completedTasks} مهمة`,
        icon: CheckCircle,
      },
      {
        title: "إجمالي المبيعات",
        value: `${totalSales.toLocaleString()} جنيه`,
        icon: TrendingUp,
      },
    ];
  }, [orders, representatives]);

  if (ordersLoading) return <p>جاري التحميل...</p>;

  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card key={index} className="rounded-2xl">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>
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