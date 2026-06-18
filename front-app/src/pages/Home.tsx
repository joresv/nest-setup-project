import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import '../App.css'

interface Session {
  userId: string | null
  isNew: boolean
}

interface Props {
  session: Session | null
}

function Home({ session }: Props) {
  return (
    <section id="center">
      <div className="hero">
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>
      <div>
        <h1>Bienvenue sur l'accueil</h1>
        <p>Ceci est la page d'accueil de l'application</p>
      </div>

      {session && (
        <div className="ticks">
          <p>Session : {session.isNew ? 'nouvelle session initialisée' : 'session existante'}</p>
          <p>Utilisateur : {session.userId ?? 'anonyme'}</p>
        </div>
      )}
    </section>
  )
}

export default Home
