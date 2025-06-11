import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function RoleBasedRedirect() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) return

    const currentPath = location.pathname
    
    // Se usuário é admin mas está em rota de cliente, redireciona para admin
    if (user.role === 'admin' && currentPath.startsWith('/client')) {
      navigate('/dashboard', { replace: true })
      return
    }
    
    // Se usuário é cliente mas está em rota de admin, redireciona para cliente
    if (user.role === 'client' && !currentPath.startsWith('/client')) {
      navigate('/client/dashboard', { replace: true })
      return
    }
    
    // Se está na raiz, redireciona para o dashboard apropriado
    if (currentPath === '/' || currentPath === '') {
      if (user.role === 'admin') {
        navigate('/dashboard', { replace: true })
      } else if (user.role === 'client') {
        navigate('/client/dashboard', { replace: true })
      }
    }
  }, [user, location.pathname, navigate])

  return null
} 