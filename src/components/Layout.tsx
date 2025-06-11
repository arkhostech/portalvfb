import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  TrendingUp, 
  User,
  Menu,
  X,
  LogOut,
  Calculator,
  FolderOpen,
  BarChart3,
  Settings,
  MessageSquare,
  Bell
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clientes', href: '/clients', icon: Users },
    { name: 'Planos de Saúde', href: '/policies', icon: FileText },
    { name: 'Cotações', href: '/quotes', icon: Calculator },
    { name: 'Reembolsos', href: '/claims', icon: TrendingUp },
    { name: 'Comissões', href: '/commission', icon: BarChart3 },
    { name: 'Documentos', href: '/documents', icon: FolderOpen },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
  ]

  const bottomNavigation = [
    { name: 'Perfil', href: '/profile', icon: User },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ]

  const isActiveRoute = (href: string) => {
    return location.pathname === href || 
           (href !== '/dashboard' && location.pathname.startsWith(href))
  }

  return (
    <div className="min-h-screen bg-vfb-bg-primary">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-vfb-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-vfb-bg-card shadow-vfb-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-vfb-gray-200 bg-white">
          <div className="flex items-center justify-center w-full h-full">
            <img src="/vfblogo.png" alt="VFB Logo" className="max-h-16" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-vfb-text-secondary hover:bg-vfb-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-vfb-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-vfb-cyan-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-vfb-cyan-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-vfb-text-primary">
                {user?.email || 'Agent'}
              </p>
              <p className="text-xs text-vfb-text-tertiary">Agente de Seguros</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActiveRoute(item.href)
                    ? 'bg-vfb-blue-50 text-vfb-blue-900 border-r-2 border-vfb-blue-900'
                    : 'text-vfb-text-secondary hover:bg-vfb-gray-50 hover:text-vfb-text-primary'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  isActiveRoute(item.href) ? 'text-vfb-blue-900' : 'text-vfb-text-tertiary'
                }`} />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom fixed navigation */}
        <div className="absolute bottom-0 left-0 w-full bg-vfb-bg-card border-t border-vfb-gray-100 px-4 pt-4 pb-2 flex flex-col gap-1">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActiveRoute(item.href)
                  ? 'bg-vfb-blue-50 text-vfb-blue-900 border-r-2 border-vfb-blue-900'
                  : 'text-vfb-text-secondary hover:bg-vfb-gray-50 hover:text-vfb-text-primary'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                isActiveRoute(item.href) ? 'text-vfb-blue-900' : 'text-vfb-text-tertiary'
              }`} />
              {item.name}
            </Link>
          ))}
          <Button
            onClick={logout}
            variant="outline-primary"
            size="sm"
            className="w-full mt-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-vfb-gray-200 bg-vfb-bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-vfb-text-secondary hover:text-vfb-text-primary lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              {/* Breadcrumb will be here */}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <button className="p-2 text-vfb-text-tertiary hover:text-vfb-text-primary">
                <MessageSquare className="h-5 w-5" />
              </button>
              
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-vfb-gray-200" />
              
              <div className="text-sm">
                <p className="font-medium text-vfb-text-primary">Portal do Agente VFB</p>
                <p className="text-vfb-text-tertiary">Dashboard de Seguros de Saúde</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout 