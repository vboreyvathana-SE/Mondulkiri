import  {CoffeeHero}  from '../components/coffee-hero/Coffee_hero'
import { BrewingGuide } from '../components/index_desc/BrewingGuide'
import Desc from '../components/index_desc/Desc'
import { FeatureSection } from '../components/index_desc/Feature'
import { VisitRoasteryBanner } from '../components/index_desc/Roastery'

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
