import Navbar from "./components/Navbar"
import Slider from "./components/Slider"
import AboutSection from "./components/AboutSection"
import VideoSection from "./components/VideoSection"
import FeatureSection from "./components/FeatureSection"
import AudienceSection from "./components/AudienceSection"
import JoinUs from "./components/JoinUs"
import TestimonialsSection from "./components/TestimonialsSection"

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
      <TestimonialsSection />
    </div>
  )
}

export default Landing