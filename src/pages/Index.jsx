import  {CoffeeHero}  from '../components/coffee-hero/Coffee_hero'
import { BrewingGuide } from '../components/index_components/BrewingGuide'
import Card from '../components/index_components/Card'
import Desc from '../components/index_components/Desc'
import { FeatureSection } from '../components/index_components/Feature'
import { VisitRoasteryBanner } from '../components/index_components/Roastery'

export default function Index() {
  return (
    <main>
      <CoffeeHero/>
      <Desc/>
      <Card/>
      <FeatureSection/>
      <BrewingGuide/>
      <VisitRoasteryBanner/>
    </main>
  )
}
