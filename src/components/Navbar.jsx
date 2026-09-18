import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <header className="bg-linear-to-r from-[#120b08] to-[#18120f] text-white p-6 absolute top-0 left-0 right-0 z-10">
      <nav className="max-w-6xl mx-auto text-center flex justify-between items-center gap-2">
        <div>
          <Link to="/" className='flex justify-center items-center gap-2 text-xl'>
            <FontAwesomeIcon icon={faMugSaucer} className="text-black text-2xl p-3 bg-[#d99b43] rounded-2xl transition-all duration-300 hover:-translate-y-2.5" />
            <h1 className='text-xl font-head font-bold'>Mondulkiri Coffee</h1>
          </Link>
        </div>
        <ul className='flex justify-center items-center gap-5.5 text-[#837565]'>
          <li className='font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'><Link to="#">Products</Link></li>
          <li className='font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'><Link to="#">Services</Link></li>
          <li className='font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'><Link to="#">Contact</Link></li>
        </ul>
        <div className='flex text-xl gap-6'>
          <button>
            <FontAwesomeIcon icon={faBagShopping} className="p-3 rounded-2xl border border-white/10
             bg-white/5 backdrop-blur-md text-amber-500/90 shadow-lg cursor-pointer transition-all duration-300 
             hover:-translate-y-2.5 hover:bg-white/15 hover:border-amber-500/40 hover:text-amber-400 hover:shadow-amber-500/10" />
          </button>
          <button>
            <FontAwesomeIcon icon={faUser} className="p-3 rounded-2xl border border-white/10
             bg-white/5 backdrop-blur-md text-amber-500/90 shadow-lg cursor-pointer transition-all duration-300 
             hover:-translate-y-2.5 hover:bg-white/15 hover:border-amber-500/40 hover:text-amber-400 hover:shadow-amber-500/10"/>
          </button>
        </div>
      </nav>
    </header>
  )
}

