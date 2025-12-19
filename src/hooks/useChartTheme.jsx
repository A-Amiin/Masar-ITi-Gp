import useThemeStore from '@/store/themeStore'

export function useChartTheme() {
  const theme = useThemeStore((state) => state.theme)
  const isDark = theme === 'dark'

  return {
    textColor: isDark ? '#e5e7eb' : '#334155',
    gridColor: isDark ? '#374151' : '#e5e7eb',
  }
}