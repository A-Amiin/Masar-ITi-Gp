import { create } from 'zustand'
import { firestoreCRUD } from '@/utils/firestoreCRUD'

const ordersCRUD = firestoreCRUD('orders')
const repsCRUD = firestoreCRUD('representative')

export const useChartsStore = create((set) => ({
  loading: false,

  taskPerformance: {
    completed: [85, 92, 88, 95, 90, 98],
    pending: [15, 8, 12, 5, 10, 4],
  },
  sales: [45000, 52000, 48000, 60000, 55000, 68000, 72000, 69000, 78000, 85000, 92000],
  topProducts: [1300, 1100, 950, 800, 750],
  orderStatus: [64, 7, 17, 12],

  repLabels: [],
  repOrdersCount: [],

  loadRepresentativePerformance: async () => {
    set({ loading: true })

    try {
      const [orders, reps] = await Promise.all([
        ordersCRUD.getItems(),
        repsCRUD.getItems(),
      ])

      // map: repId -> name
      const repMap = {}
      reps.forEach(rep => {
        repMap[rep.id] = rep.nameAr || rep.nameEn || 'مندوب'
      })

      // count orders
      const countMap = {}
      orders.forEach(order => {
        if (!order.representativeId) return

        countMap[order.representativeId] =
          (countMap[order.representativeId] || 0) + 1
      })

      const labels = []
      const data = []

      Object.keys(countMap).forEach(repId => {
        labels.push(repMap[repId] || 'مندوب غير معروف')
        data.push(countMap[repId])
      })

      set({
        repLabels: labels,
        repOrdersCount: data,
      })
    } catch (error) {
      console.error('Representative chart error:', error)
    } finally {
      set({ loading: false })
    }
  },
}))
