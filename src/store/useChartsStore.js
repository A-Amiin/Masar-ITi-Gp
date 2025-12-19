import { create } from 'zustand'


export const useChartsStore = create((set) => ({
loading: false,
taskPerformance: {
completed: [85, 92, 88, 95, 90, 98],
pending: [15, 8, 12, 5, 10, 4],
},
sales: [45000, 52000, 48000, 60000, 55000, 68000, 72000, 69000, 78000, 85000, 92000],
topProducts: [1300, 1100, 950, 800, 750],
orderStatus: [64, 7, 17, 12],
}))