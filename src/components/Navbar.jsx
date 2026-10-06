import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMugSaucer, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentSession, logoutUser } from './auth_components/authSession';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [profilePath, setProfilePath] = useState('/profile');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getCurrentSession().then((session) => {
      if (!cancelled) {
        setAuthenticated(session !== null);
        setProfilePath(session?.account_type === 'admin' ? '/admin' : '/profile');
      }
    });

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logoutUser();
      setAuthenticated(false);
      setProfilePath('/profile');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoggingOut(false);
    }
  }

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

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD] ${isActive ? "text-[#FFEEDD] underline" : ""
                }`
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD] ${isActive ? "text-[#FFEEDD] underline" : ""
                }`
              }
            >
              Services
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-label uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD] ${isActive ? "text-[#FFEEDD] underline" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </li>

        </ul>
        <div className='flex text-xl gap-6'>

          <button>
            <Link to="/cart">
              <span></span>
              <FontAwesomeIcon icon={faBagShopping} className="p-3 rounded-2xl border border-white/10
             bg-white/5 backdrop-blur-md text-amber-500/90 shadow-lg cursor-pointer transition-all duration-300 
             hover:-translate-y-2.5 hover:bg-white/15 hover:border-amber-500/40 hover:text-amber-400 hover:shadow-amber-500/10" />

            </Link>

          </button>

          <button>
            <Link to={profilePath}>
              <FontAwesomeIcon icon={faUser} className="p-3 rounded-2xl border border-white/10
             bg-white/5 backdrop-blur-md text-amber-500/90 shadow-lg cursor-pointer transition-all duration-300 
             hover:-translate-y-2.5 hover:bg-white/15 hover:border-amber-500/40 hover:text-amber-400 hover:shadow-amber-500/10"/>
            </Link>
          </button>

          {authenticated && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              title="Log out"
              aria-label={loggingOut ? 'Logging out' : 'Log out'}
              className="p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-amber-500/90 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2.5 hover:bg-white/15 hover:border-amber-500/40 hover:text-amber-400 hover:shadow-amber-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
