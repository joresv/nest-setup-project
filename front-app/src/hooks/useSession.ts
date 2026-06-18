import { useEffect, useState } from 'react'

export interface Session {
  userId: string | null
  isNew: boolean
  csrfToken: string
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = () =>
    fetch('/api/session')
      .then((res) => res.json())
      .then((data: Session) => setSession(data))
      .finally(() => setLoading(false))

  useEffect(() => { refresh() }, [])

  const apiFetch = (url: string, options: RequestInit = {}): Promise<Response> =>
    fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': session?.csrfToken ?? '',
        ...options.headers,
      },
    })

  return { session, loading, refresh, apiFetch }
}
