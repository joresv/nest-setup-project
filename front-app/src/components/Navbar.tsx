import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>MyApp</h1>
          </Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Acceuil
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={location.pathname === '/profile' ? 'active' : ''}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
