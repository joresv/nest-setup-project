import { useState } from 'react'
import type { Session } from '../hooks/useSession'
import '../App.css'

interface Props {
  session: Session | null
  refresh: () => void
  apiFetch: (url: string, options?: RequestInit) => Promise<Response>
}

function Home({ session, refresh, apiFetch }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      refresh()
    } else {
      const data = await res.json()
      setError(data.message ?? 'Erreur de connexion')
    }
  }

  const handleLogout = async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' })
    refresh()
  }

  return (
    <section id="center">
      <div>
        <h1>Bienvenue sur l'accueil</h1>
      </div>

      <div className="ticks">
        {session?.userId ? (
          <div>
            <p>Connecté en tant que <strong>{session.userId}</strong></p>
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Se connecter</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        )}
      </div>
    </section>
  )
}

export default Home
