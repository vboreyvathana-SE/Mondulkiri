import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Index from './pages/Index'
import Test from '../service/Test'


export default function App() {

  return (
    <>
      <Navbar />
      <Index />
      <Footer />
      <div className='h-full bg-red-500 text-white'>
        <Test />
      </div>
    </>
  )
}
