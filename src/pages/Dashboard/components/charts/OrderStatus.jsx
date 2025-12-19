import { Pie } from 'react-chartjs-2'
import { Card, CardContent } from '@/components/ui/card'
import { useChartsStore } from '@/store/useChartsStore'
import { useChartTheme } from '@/hooks/useChartTheme'

export function OrderStatus() {
  const { orderStatus } = useChartsStore()
  const { textColor } = useChartTheme()

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 flex flex-col items-center">
        <h3 className="font-semibold mb-4">حالة الطلبات</h3>

        <Pie
          data={{
            labels: ['تم التوصيل', 'قيد الشحن', 'في الطريق', 'الملغى'],
            datasets: [
              {
                data: orderStatus,
                backgroundColor: [
                  '#1d4ed8',
                  '#94a3b8',
                  '#06b6d4',
                  '#facc15',
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