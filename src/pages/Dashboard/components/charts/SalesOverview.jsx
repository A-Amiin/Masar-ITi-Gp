import { Bar } from 'react-chartjs-2'
import { Card, CardContent } from '@/components/ui/card'
import { useChartsStore } from '@/store/useChartsStore'
import { useChartTheme } from '@/hooks/useChartTheme'

export function SalesOverview() {
  const { sales } = useChartsStore()
  const { textColor, gridColor } = useChartTheme()

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">نظرة عامة على المبيعات</h3>

        <Bar
          data={{
            labels: [
              'فبراير','مارس','أبريل','مايو','يونيو',
              'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر',
            ],
            datasets: [
              {
                label: 'المبيعات',
                data: sales,
                backgroundColor: '#1d4ed8',
                borderRadius: 8,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { labels: { color: textColor } } },
            scales: {
              x: { ticks: { color: textColor }, grid: { color: gridColor } },
              y: { ticks: { color: textColor }, grid: { color: gridColor } },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}