import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { useSession } from './hooks/useSession'
import './App.css'

function App() {
  const { session, loading, refresh, apiFetch } = useSession()

  if (loading) return null

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home session={session} refresh={refresh} apiFetch={apiFetch} />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
