import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'client'
  // Campos específicos para clientes
  clientId?: string
  policyNumbers?: string[]
  membershipId?: string
  groupNumber?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock users for demo purposes
const mockUsers: { [key: string]: User } = {
  // Admin/Agent user
  'agent@vfb.com': {
    id: 'admin-1',
    email: 'agent@vfb.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'admin'
  },
  // Client users
  'client@vfb.com': {
    id: 'client-1',
    email: 'client@vfb.com',
    firstName: 'Maria',
    lastName: 'Silva',
    role: 'client',
    clientId: 'client-001',
    policyNumbers: ['OSC-FL-2024-001', 'FB-BOS-2024-002'],
    membershipId: 'OSC123456789',
    groupNumber: 'VFB-FLORIDA-001'
  },
  'joao.santos@email.com': {
    id: 'client-2',
    email: 'joao.santos@email.com',
    firstName: 'João',
    lastName: 'Santos',
    role: 'client',
    clientId: 'client-002',
    policyNumbers: ['CHP-STD-2024-003'],
    membershipId: 'CHP987654321',
    groupNumber: 'VFB-CAPITAL-002'
  },
  'ana.costa@email.com': {
    id: 'client-3',
    email: 'ana.costa@email.com',
    firstName: 'Ana',
    lastName: 'Costa',
    role: 'client',
    clientId: 'client-003',
    policyNumbers: ['FHC-GOLD-2024-004', 'AMC-SILVER-2024-005'],
    membershipId: 'FHC555666777',
    groupNumber: 'VFB-HEALTH-003'
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would check for a valid token
        const savedUser = localStorage.getItem('vfb_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock login - in real app, this would call your auth API
      const user = mockUsers[email]
      
      if (user && password === 'password') {
        setUser(user)
        localStorage.setItem('vfb_user', JSON.stringify(user))
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vfb_user')
  }

  const value = {
    user,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 