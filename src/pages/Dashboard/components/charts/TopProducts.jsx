import { Bar } from 'react-chartjs-2'
import { Card, CardContent } from '@/components/ui/card'
import { useChartsStore } from '@/store/useChartsStore'
import { useChartTheme } from '@/hooks/useChartTheme'

export function TopProducts() {
  const { topProducts } = useChartsStore()
  const { textColor, gridColor } = useChartTheme()

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">المنتجات الأكثر مبيعًا</h3>

        <Bar
          data={{
            labels: ['شاي فاخر', 'حبوب البن', 'زيت الطبخ', 'أرز', 'سكر'],
            datasets: [
              {
                data: topProducts,
                backgroundColor: '#facc15',
                borderRadius: 8,
              },
            ],
          }}
          options={{
            indexAxis: 'y',
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: textColor }, grid: { color: gridColor } },
              y: { ticks: { color: textColor }, grid: { display: false } },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}