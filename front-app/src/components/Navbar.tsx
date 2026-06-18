import { Link, useLocation } from 'react-router-dom'
import type { Session } from '@/hooks/useSession'
import './Navbar.css'

interface Props {
  session: Session | null
  onLogout: () => void
}

function Navbar({ session, onLogout }: Props) {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/"><h1>MyApp</h1></Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/" className={isActive('/')}>Accueil</Link></li>
          {session?.userId ? (
            <>
              <li><Link to="/profile" className={isActive('/profile')}>Profil</Link></li>
              <li><Link to="/settings" className={isActive('/settings')}>Paramètres</Link></li>
              <li><button className="nav-logout" onClick={onLogout}>Déconnexion</button></li>
            </>
          ) : (
            <li><Link to="/login" className={isActive('/login')}>Connexion</Link></li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
