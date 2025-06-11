import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { user, login, loading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  if (user) {
    const redirectPath = user.role === 'admin' ? '/dashboard' : '/client/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    setIsSubmitting(true)
    
    try {
      await login(formData.email, formData.password)
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      toast.error('Credenciais inválidas. Tente novamente.')
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fillCredentials = (email: string, password: string) => {
    setFormData({ email, password })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vfb-blue-50 to-vfb-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vfb-blue-600 mx-auto"></div>
          <p className="mt-4 text-vfb-text-secondary">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vfb-blue-50 to-vfb-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-vfb-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">VFB</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-vfb-text-primary">
            VFB Health Portal
          </h2>
          <p className="mt-2 text-sm text-vfb-text-secondary">
            Portal para Agentes e Segurados
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-xl border border-vfb-gray-100">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-vfb-text-primary mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="relative block w-full rounded-lg border border-vfb-gray-300 px-4 py-3 text-vfb-text-primary placeholder-vfb-text-tertiary focus:z-10 focus:border-vfb-blue-500 focus:outline-none focus:ring-2 focus:ring-vfb-blue-200 transition-colors"
                placeholder="Digite seu email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-vfb-text-primary mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="relative block w-full rounded-lg border border-vfb-gray-300 px-4 py-3 text-vfb-text-primary placeholder-vfb-text-tertiary focus:z-10 focus:border-vfb-blue-500 focus:outline-none focus:ring-2 focus:ring-vfb-blue-200 transition-colors"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-lg bg-vfb-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-vfb-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vfb-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </>
              ) : (
                'Entrar no Portal'
              )}
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Admin Credentials */}
            <div className="text-center text-sm bg-vfb-blue-50 p-4 rounded-lg border border-vfb-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-vfb-blue-900">🏢 Acesso Administrador</p>
                <button
                  type="button"
                  onClick={() => fillCredentials('agent@vfb.com', 'password')}
                  className="text-xs bg-vfb-blue-600 text-white px-2 py-1 rounded hover:bg-vfb-blue-700 transition-colors"
                >
                  Usar
                </button>
              </div>
              <p className="text-vfb-blue-700">
                <span className="font-mono text-xs">agent@vfb.com</span> • <span className="font-mono text-xs">password</span>
              </p>
            </div>

            {/* Client Credentials */}
            <div className="text-center text-sm bg-vfb-cyan-50 p-4 rounded-lg border border-vfb-cyan-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-vfb-cyan-900">👤 Acesso Cliente</p>
                <button
                  type="button"
                  onClick={() => fillCredentials('client@vfb.com', 'password')}
                  className="text-xs bg-vfb-cyan-600 text-white px-2 py-1 rounded hover:bg-vfb-cyan-700 transition-colors"
                >
                  Usar
                </button>
              </div>
              <p className="text-vfb-cyan-700">
                <span className="font-mono text-xs">client@vfb.com</span> • <span className="font-mono text-xs">password</span>
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-vfb-text-tertiary">
                Outros clientes: joao.santos@email.com, ana.costa@email.com
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 