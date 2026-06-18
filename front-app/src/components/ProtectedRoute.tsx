import { Navigate } from 'react-router-dom'
import type { Session } from '@/hooks/useSession'

interface Props {
  session: Session | null
  children: React.ReactNode
}

export function ProtectedRoute({ session, children }: Props) {
  if (!session?.userId) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
