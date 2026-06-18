import './Profile.css'

function Profile() {
  return (
    <section id="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://i.pravatar.cc/150?img=1" alt="Profile Avatar" />
          </div>
          <div className="profile-info">
            <h1>Mon Profil</h1>
            <p className="username">@utilisateur</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>À propos</h2>
            <p>
              Bienvenue sur votre page de profil. Ici, vous pouvez voir vos informations personnelles et gérer vos paramètres.
            </p>
          </div>

          <div className="profile-section">
            <h2>Informations personnelles</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Email:</label>
                <p>utilisateur@example.com</p>
              </div>
              <div className="info-item">
                <label>Lieu:</label>
                <p>France</p>
              </div>
              <div className="info-item">
                <label>Membre depuis:</label>
                <p>Juin 2026</p>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-edit">Modifier le profil</button>
            <button className="btn-settings">Paramètres</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
