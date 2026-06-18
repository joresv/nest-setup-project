import { Link } from 'react-router-dom'
import type { Session } from '../hooks/useSession'
import '../App.css'

interface Props {
  session: Session | null
}

function Home({ session }: Props) {
  return (
    <section id="center">
      <div>
        <h1>Bienvenue sur MyApp</h1>
        {session?.userId ? (
          <p>Connecté en tant que <strong>{session.userId}</strong></p>
        ) : (
          <p>
            <Link to="/login">Connectez-vous</Link> pour accéder à votre espace.
          </p>
        )}
      </div>
    </section>
  )
}

export default Home
