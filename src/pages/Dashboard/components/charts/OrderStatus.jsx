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
      on_the_way: 0,
      cancelled: 0,
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
      statusCount.on_the_way,
      statusCount.cancelled,
    ]
  }, [orders])

  if (loading) return <p>جاري التحميل...</p>

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 flex flex-col items-center">
        <h3 className="font-semibold mb-4">حالة الطلبات</h3>

        <Pie
          data={{
            labels: ["جديد", "قيد الشحن", "في الطريق", "تم التوصيل", "الملغي"],
            datasets: [
              {
                data: [
                  orderStatus[2],
                  orderStatus[1],
                  orderStatus[3],
                  orderStatus[0],
                  orderStatus[4],
                ],
                backgroundColor: [
                  "#22c55e",
                  "#93c5fd",
                  "#06b6d4",
                  "#16a34a",
                  "#ef4444",
                ],
                borderWidth: 2,
                borderColor: "#ffffff",
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: textColor,
                  font: {
                    size: 13,
                    weight: "500",
                  },
                  padding: 16,
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}