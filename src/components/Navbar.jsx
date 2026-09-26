import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full bg-[#120b08]/90 backdrop-blur-md border-b text-white border-white/10 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <div>
          <Link to="/" className='flex justify-center items-center gap-2 text-xl'>
            <FontAwesomeIcon icon={faMugSaucer} className="text-black text-2xl p-3 bg-[#d99b43] rounded-2xl transition-all duration-300 hover:-translate-y-2.5" />
            <h1 className='text-xl font-head font-bold'>Mondulkiri Coffee</h1>
          </Link>
        </div>
        <ul className='flex justify-center items-center gap-5.5 text-[#837565]'>
          <li className='font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'>
            <Link to="/products">Products</Link></li>
          <li className='font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'>
            <Link to="/services">Services</Link></li>
          <li className='font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'>
            <Link to="#">Contact</Link></li>
        </ul>
        <div className='flex text-xl gap-6'>
          <button>
            <Link to="/cart">
              <FontAwesomeIcon icon={faBagShopping} className="p-3 rounded-2xl border border-white/10
             bg-white/5 backdrop-blur-md text-amber-500/90 shadow-lg cursor-pointer transition-all duration-300 
             hover:-translate-y-2.5 hover:bg-white/15 hover:border-amber-500/40 hover:text-amber-400 hover:shadow-amber-500/10" />
            </Link>
          </button>
          <button>
            <Link to="profile">
              <FontAwesomeIcon icon={faUser} className="p-3 rounded-2xl border border-white/10
             bg-white/5 backdrop-blur-md text-amber-500/90 shadow-lg cursor-pointer transition-all duration-300 
             hover:-translate-y-2.5 hover:bg-white/15 hover:border-amber-500/40 hover:text-amber-400 hover:shadow-amber-500/10"/>
            </Link>
          </button>
        </div>
      </nav>
    </header>
  )
}

