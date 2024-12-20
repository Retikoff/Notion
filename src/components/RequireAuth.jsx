import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RequireAuth({ children }) {
  const { user, loading } = useSelector((store) => store)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user?.id) {
    return <Navigate to="/login" replace />
  }

  return children
}
