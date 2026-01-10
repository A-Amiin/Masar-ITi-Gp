import { Bar } from "react-chartjs-2"
import { Card, CardContent } from "@/components/ui/card"
import { useChartTheme } from "@/hooks/useChartTheme"
import { useCrudService } from "@/hooks/useCrudService"
import { useMemo } from "react"

export function TopProducts() {
  const { Items: orders, loading } = useCrudService("orders")
  const { textColor, gridColor } = useChartTheme()

  const topProducts = useMemo(() => {
    const productsMap = {}

    orders.forEach((order) => {
      order.products?.forEach((product) => {
        if (!productsMap[product.id]) {
          productsMap[product.id] = {
            name: product.name,
            quantity: 0,
          }
        }

        productsMap[product.id].quantity += product.quantity
      })
    })

    return Object.values(productsMap)
      .sort((a, b) => a.quantity - b.quantity)
      .slice(0, 5)
  }, [orders])

  if (loading) return <p>جاري التحميل...</p>

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">المنتجات الأكثر طلبًا</h3>

        <Bar
          data={{
            labels: topProducts.map((p) => p.name),
            datasets: [
              {
                data: topProducts.map((p) => p.quantity),
                backgroundColor: "#facc15",
                borderRadius: 8,
              },
            ],
          }}
          options={{
            indexAxis: "y",
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                ticks: { color: textColor },
                grid: { color: gridColor },
              },
              y: {
                ticks: { color: textColor },
                grid: { display: false },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}