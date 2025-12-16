import Navbar from "./components/Navbar"
import Slider from "./components/Slider"
import AboutSection from "./components/AboutSection"
import VideoSection from "./components/VideoSection"
import FeatureSection from "./components/FeatureSection"
import AudienceSection from "./components/AudienceSection"
import JoinUs from "./components/JoinUs"

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <VideoSection />
      <AboutSection />
      <FeatureSection />
      <AudienceSection />
      <JoinUs />
    </div>
  )
}

export default Landing