import useInitTheme from "@/hooks/useInitTheme";
import AppRouter from "@/routes/AppRouter";
import '@/pages/Dashboard/components/charts/chartsSetup';

function App() {
const {toggleTheme} = useInitTheme();

  return (
    <AppRouter />
  )
}

export default App