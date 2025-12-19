import { Line } from 'react-chartjs-2'
import { Card, CardContent } from '@/components/ui/card'
import { useChartsStore } from '@/store/useChartsStore'
import { useChartTheme } from '@/hooks/useChartTheme'

export function TaskPerformance() {
  const { taskPerformance } = useChartsStore()
  const { textColor, gridColor } = useChartTheme()

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">أداء المهام</h3>

        <Line
          data={{
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [
              {
                label: 'مكتملة',
                data: taskPerformance.completed,
                borderColor: '#06b6d4',
                tension: 0.4,
              },
              {
                label: 'معلقة',
                data: taskPerformance.pending,
                borderColor: '#facc15',
                tension: 0.4,
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