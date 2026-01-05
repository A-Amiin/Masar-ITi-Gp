
import ChartsSection from "./components/charts/ChartsSection"
import NavDashboard from "./components/NavDashboard"
 import MapView from "./components/charts/MapView"
const Dashboard = () => {
  return (
    <div>
      <NavDashboard />
      <MapView />
      <ChartsSection />
    </div>
  )
}

export default Dashboard