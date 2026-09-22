import  {CoffeeHero}  from '../components/coffee-hero/Coffee_hero'
import { BrewingGuide } from '../components/index_components/BrewingGuide'
import Desc from '../components/index_components/Desc'
import { FeatureSection } from '../components/index_components/Feature'
import { VisitRoasteryBanner } from '../components/index_components/Roastery'

export default function Index() {
  return (
    <main>
      <CoffeeHero/>
      <Desc/>
      <FeatureSection/>
      <BrewingGuide/>
      <VisitRoasteryBanner/>
    </main>
  )
}
