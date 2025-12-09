import ExclusiveOffer from "../components/ExclusiveOffers"
import FeatureDestination from "../components/FeatureDestination"
import Hero from "../components/Hero"
import NewsLetter from "../components/NewsLetter"
import RecommendedHotels from "../components/RecommendedHotels"
import Testimonial from "../components/Testimonial"
import StatsCounter from "../components/StatsCounter"
import AmenitiesSelector from "../components/AmenitiesSelector" 

const Home = () => {
  return (
    <>
      <Hero />
      <StatsCounter/>
      <RecommendedHotels/>
      <FeatureDestination/>
      <ExclusiveOffer/>
      
     
      <AmenitiesSelector/>
      
      <Testimonial/>
      <NewsLetter/>
    </>
  )
}

export default Home