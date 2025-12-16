import Navbar from "./components/Navbar"
import Slider from "./components/Slider"
import AboutSection from "./components/AboutSection"
import VideoSection from "./components/VideoSection"
import FeatureSection from "./components/FeatureSection"
import AudienceSection from "./components/AudienceSection"
import JoinUs from "./components/JoinUs"
import TestimonialsSection from "./components/TestimonialsSection"
import DaownloadApp from "./components/DownloadApp"
import ContactUs from "./components/ContactUs"
import Footer from "./components/Footer"

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
      <DaownloadApp />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Landing