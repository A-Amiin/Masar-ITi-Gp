import Navbar from "./components/Navbar"
import Slider from "./components/Slider"
import AboutSection from "./components/AboutSection"
import VideoSection from "./components/VideoSection"
import FeatureSection from "./components/FeatureSection"

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <VideoSection />
      <AboutSection />
      <FeatureSection />
    </div>
  )
}

export default Landing