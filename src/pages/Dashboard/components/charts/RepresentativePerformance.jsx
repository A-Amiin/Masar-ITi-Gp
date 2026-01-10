import { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Card, CardContent } from '@/components/ui/card'
import { useChartsStore } from '@/store/useChartsStore'
import { useChartTheme } from '@/hooks/useChartTheme'

export function RepresentativePerformance() {
  const {
    repLabels,
    repOrdersCount,
    loadRepresentativePerformance,
  } = useChartsStore()

  const { textColor, gridColor } = useChartTheme()

  useEffect(() => {
    loadRepresentativePerformance()
  }, [])

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">
          أداء المندوبين (عدد الطلبات)
        </h3>

        <Bar
          data={{
            labels: repLabels,
            datasets: [
              {
                label: 'عدد الطلبات',
                data: repOrdersCount,
                backgroundColor: '#1d4ed8',
                borderRadius: 8,
              },
            ],
          }}
          options={{
            indexAxis: 'y', 
            responsive: true,
            plugins: {
              legend: { labels: { color: textColor } },
            },
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