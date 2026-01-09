import { Pie } from "react-chartjs-2"
import { Card, CardContent } from "@/components/ui/card"
import { useChartTheme } from "@/hooks/useChartTheme"
import { useCrudService } from "@/hooks/useCrudService"
import { useMemo } from "react"

export function OrderStatus() {
  const { Items: orders, loading } = useCrudService("orders")
  const { textColor } = useChartTheme()

  const orderStatus = useMemo(() => {
    const statusCount = {
      completed: 0,
      assigned: 0,
      new: 0,
      failed: 0,
    }

    orders.forEach((order) => {
      if (statusCount[order.status] !== undefined) {
        statusCount[order.status] += 1
      }
    })

    return [
      statusCount.completed,
      statusCount.assigned,
      statusCount.new,
      statusCount.failed,
    ]
  }, [orders])

  if (loading) return <p>جاري التحميل...</p>

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 flex flex-col items-center">
        <h3 className="font-semibold mb-4">حالة الطلبات</h3>

        <Pie
          data={{
            labels: ["تم التوصيل", "قيد الشحن", "في الطريق", "الملغى"],
            datasets: [
              {
                data: orderStatus,
                backgroundColor: [
                  "#1d4ed8",
                  "#94a3b8",
                  "#06b6d4",
                  "#facc15",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: { color: textColor },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}