import useInitTheme from "@/hooks/useInitTheme";
import AppRouter from "@/routes/AppRouter";

function App() {
const {toggleTheme} = useInitTheme();

  return (
    <AppRouter />
  )
}

export default App