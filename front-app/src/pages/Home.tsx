import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import '../App.css'

function Home() {
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
      
      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Vos questions, réponses</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explorer Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                En savoir plus
              </a>
            </li>
          </ul>
        </div>
      </section>
    </section>
  )
}

export default Home
