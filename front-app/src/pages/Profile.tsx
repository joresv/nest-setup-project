import type { Session } from '../hooks/useSession'
import './Profile.css'

interface Props {
  session: Session
}

function Profile({ session }: Props) {
  return (
    <section id="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://i.pravatar.cc/150?img=1" alt="Profile Avatar" />
          </div>
          <div className="profile-info">
            <h1>Mon Profil</h1>
            <p className="username">@{session.userId}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Informations personnelles</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Nom d'utilisateur</label>
                <p>{session.userId}</p>
              </div>
              <div className="info-item">
                <label>Membre depuis</label>
                <p>Juin 2026</p>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-settings">Modifier le profil</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
