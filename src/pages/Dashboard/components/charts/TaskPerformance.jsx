import { Line } from 'react-chartjs-2'
import { Card, CardContent } from '@/components/ui/card'
import { useChartsStore } from '@/store/useChartsStore'
import { useChartTheme } from '@/hooks/useChartTheme'
import { useMemo } from 'react'

export function TaskPerformance() {
  const { taskPerformance } = useChartsStore()
  const { textColor, gridColor } = useChartTheme()

  const daysOfJanuary = useMemo(
    () => Array.from({ length: 31 }, (_, i) => i + 1),
    []
  )

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">أداء المهام خلال يناير 2026</h3>

        <Line
          data={{
            labels: daysOfJanuary,
            datasets: [
              {
                label: 'مكتملة',
                data: taskPerformance.completed,
                borderColor: '#16a34a', 
                backgroundColor: 'rgba(22,163,74,0.15)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
              },
              {
                label: 'معلقة (كل الحالات الأخرى)',
                data: taskPerformance.pending,
                borderColor: '#facc15',
                backgroundColor: 'rgba(250,204,21,0.15)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                  font: { size: 13, weight: '500' },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'أيام شهر يناير',
                  color: textColor,
                },
                ticks: { color: textColor },
                grid: { color: gridColor },
              },
              y: {
                min: 0,
                max: 50,
                ticks: {
                  stepSize: 5,
                  color: textColor,
                },
                grid: { color: gridColor },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}