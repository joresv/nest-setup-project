import { useEffect, useState } from 'react'

interface Session {
  userId: string | null
  isNew: boolean
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((data: Session) => setSession(data))
      .finally(() => setLoading(false))
  }, [])

  return { session, loading }
}
