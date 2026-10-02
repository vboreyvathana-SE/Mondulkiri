import Header from '../components/service_components/Header'
import CafeModelling from '../components/service_components/CafeModelling'
import Partnership from '../components/service_components/Partnership'
import Review from '../components/service_components/Review'
import ServiceCard from '../components/service_components/ServiceCard'
import ServiceDesc from '../components/service_components/ServiceDesc'


export default function Service() {
  return (
    <main>
      <Header />
      <CafeModelling />
      <Partnership />
      <Review/>
      <ServiceCard/>
      <ServiceDesc/>
    </main>
  )
}
