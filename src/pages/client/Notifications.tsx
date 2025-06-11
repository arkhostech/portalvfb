import { useState } from 'react'
import { 
  Bell,
  BellOff,
  Check,
  X,
  Filter,
  Search,
  Calendar,
  CreditCard,
  FileText,
  Heart,
  Shield,
  Building2,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Trash2,
  MarkAsUnread,
  Archive,
  Mail,
  Phone,
  Smartphone,
  Eye
} from 'lucide-react'

export default function Notifications() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showSettings, setShowSettings] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  // Componente para logo das operadoras
  const InsuranceLogo = ({ carrier, size = 'sm' }: { carrier: string, size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8', 
      lg: 'w-12 h-12'
    }
    
    const carrierConfig = {
      'Oscar Health': { bg: 'bg-purple-100', color: 'text-purple-600', icon: Heart },
      'Florida Blue': { bg: 'bg-blue-100', color: 'text-blue-600', icon: Shield },
      'Capital Health Plan': { bg: 'bg-green-100', color: 'text-green-600', icon: Building2 },
      'VFB Portal': { bg: 'bg-vfb-blue-100', color: 'text-vfb-blue-600', icon: Star }
    }
    
    const config = carrierConfig[carrier as keyof typeof carrierConfig] || carrierConfig['VFB Portal']
    const Icon = config.icon
    
    return (
      <div className={`${sizes[size]} ${config.bg} rounded-md flex items-center justify-center flex-shrink-0`}>
        <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'} ${config.color}`} />
      </div>
    )
  }

  // Categorias de notificações
  const categories = [
    { id: 'all', name: 'Todas as Notificações', count: 23 },
    { id: 'claims', name: 'Reembolsos', count: 6 },
    { id: 'appointments', name: 'Consultas', count: 4 },
    { id: 'policy', name: 'Apólice', count: 3 },
    { id: 'billing', name: 'Cobrança', count: 5 },
    { id: 'benefits', name: 'Benefícios', count: 3 },
    { id: 'system', name: 'Sistema', count: 2 }
  ]

  // Lista de notificações
  const notifications = [
    {
      id: 1,
      title: 'Reembolso Processado',
      category: 'claims',
      type: 'success',
      priority: 'high',
      status: 'unread',
      date: '2024-03-12T14:30:00',
      sender: 'Oscar Health',
      message: 'Seu reembolso #REI-2024-0156 no valor de $125.00 foi processado e será creditado em sua conta em até 2 dias úteis.',
      actionUrl: '/claims/REI-2024-0156',
      actionText: 'Ver Detalhes',
      metadata: {
        claimId: 'REI-2024-0156',
        amount: '$125.00'
      }
    },
    {
      id: 2,
      title: 'Lembrete de Consulta',
      category: 'appointments',
      type: 'info',
      priority: 'medium',
      status: 'unread',
      date: '2024-03-12T09:00:00',
      sender: 'VFB Portal',
      message: 'Você tem uma consulta agendada com Dr. Michael Rodriguez amanhã (13/03) às 14:00. Lembre-se de levar sua carteirinha.',
      actionUrl: '/appointments',
      actionText: 'Confirmar Presença',
      metadata: {
        doctorName: 'Dr. Michael Rodriguez',
        appointmentTime: '13/03/2024 14:00',
        location: '1234 Ocean Drive, Miami, FL'
      }
    },
    {
      id: 3,
      title: 'Cobertura de Medicamento Negada',
      category: 'benefits',
      type: 'warning',
      priority: 'high',
      status: 'unread',
      date: '2024-03-11T16:45:00',
      sender: 'Oscar Health',
      message: 'A cobertura para o medicamento Lipitor foi negada. Existe uma alternativa genérica disponível com custo reduzido.',
      actionUrl: '/benefits/medications',
      actionText: 'Ver Alternativas',
      metadata: {
        medicationName: 'Lipitor',
        reason: 'Medicamento não coberto'
      }
    },
    {
      id: 4,
      title: 'Nova Funcionalidade Disponível',
      category: 'system',
      type: 'info',
      priority: 'low',
      status: 'read',
      date: '2024-03-11T10:00:00',
      sender: 'VFB Portal',
      message: 'Agora você pode agendar consultas diretamente pelo portal! Experimente a nova funcionalidade de agendamento online.',
      actionUrl: '/find-doctors',
      actionText: 'Explorar',
      metadata: {}
    },
    {
      id: 5,
      title: 'Fatura Disponível',
      category: 'billing',
      type: 'info',
      priority: 'medium',
      status: 'read',
      date: '2024-03-10T08:00:00',
      sender: 'Oscar Health',
      message: 'Sua fatura de março no valor de $245.50 está disponível para pagamento. Vencimento: 15/03/2024.',
      actionUrl: '/billing',
      actionText: 'Pagar Agora',
      metadata: {
        amount: '$245.50',
        dueDate: '15/03/2024'
      }
    },
    {
      id: 6,
      title: 'Atualização de Apólice',
      category: 'policy',
      type: 'info',
      priority: 'medium',
      status: 'read',
      date: '2024-03-09T12:00:00',
      sender: 'Oscar Health',
      message: 'Sua apólice foi atualizada com novos benefícios de saúde mental. Consultas de terapia agora têm copagamento reduzido.',
      actionUrl: '/benefits',
      actionText: 'Ver Benefícios',
      metadata: {
        changeType: 'Benefício Adicionado'
      }
    },
    {
      id: 7,
      title: 'Consulta Reagendada',
      category: 'appointments',
      type: 'warning',
      priority: 'high',
      status: 'read',
      date: '2024-03-08T14:20:00',
      sender: 'Dr. Sarah Johnson',
      message: 'Sua consulta foi reagendada para 20/03/2024 às 10:30 devido a uma emergência médica. Pedimos desculpas pelo inconveniente.',
      actionUrl: '/appointments',
      actionText: 'Confirmar Novo Horário',
      metadata: {
        oldDate: '15/03/2024 15:00',
        newDate: '20/03/2024 10:30'
      }
    },
    {
      id: 8,
      title: 'Documentos Fiscais Disponíveis',
      category: 'system',
      type: 'info',
      priority: 'medium',
      status: 'read',
      date: '2024-03-07T09:30:00',
      sender: 'VFB Portal',
      message: 'Seus documentos fiscais de 2023 estão disponíveis para download na seção Documentos.',
      actionUrl: '/documents',
      actionText: 'Baixar Documentos',
      metadata: {
        year: '2023',
        documentCount: 4
      }
    }
  ]

  // Filtrar notificações
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.sender.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || notification.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getNotificationIcon = (type: string, category: string) => {
    if (type === 'success') return CheckCircle
    if (type === 'warning') return AlertTriangle
    if (type === 'error') return X
    
    switch (category) {
      case 'claims':
        return CreditCard
      case 'appointments':
        return Calendar
      case 'policy':
        return Shield
      case 'billing':
        return FileText
      case 'benefits':
        return Heart
      default:
        return Info
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-blue-600 bg-blue-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Agora há pouco'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    if (diffInHours < 48) return 'Ontem'
    
    return date.toLocaleDateString('pt-BR')
  }

  const markAsRead = (id: number) => {
    // Implementar lógica para marcar como lida
    console.log('Marcar como lida:', id)
  }

  const markAllAsRead = () => {
    // Implementar lógica para marcar todas como lidas
    console.log('Marcar todas como lidas')
  }

  const deleteNotification = (id: number) => {
    // Implementar lógica para deletar notificação
    console.log('Deletar notificação:', id)
  }

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    )
  }

  const unreadCount = notifications.filter(n => n.status === 'unread').length

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Notificações</h1>
            <p className="text-vfb-blue-100">
              Acompanhe todas as atualizações importantes sobre seu plano de saúde
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{unreadCount}</p>
              <p className="text-sm text-vfb-blue-100">Não lidas</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              Marcar Todas como Lidas
            </button>
            
            {selectedNotifications.length > 0 && (
              <>
                <button className="flex items-center px-4 py-2 border border-vfb-gray-300 text-vfb-text-primary rounded-lg hover:bg-vfb-gray-50 transition-colors">
                  <Archive className="h-4 w-4 mr-2" />
                  Arquivar ({selectedNotifications.length})
                </button>
                <button className="flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir ({selectedNotifications.length})
                </button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-vfb-text-secondary">
              {filteredNotifications.length} notificações
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar notificações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="all">Todas</option>
              <option value="unread">Não lidas</option>
              <option value="read">Lidas</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedStatus('all')
              }}
              className="w-full px-4 py-2 border border-vfb-gray-300 text-vfb-text-primary rounded-lg hover:bg-vfb-gray-50 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map(notification => {
          const Icon = getNotificationIcon(notification.type, notification.category)
          const isSelected = selectedNotifications.includes(notification.id)
          
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6 transition-all ${
                notification.status === 'unread' ? 'bg-blue-50/50 border-blue-200' : ''
              } ${isSelected ? 'ring-2 ring-vfb-blue-500' : ''}`}
            >
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectNotification(notification.id)}
                    className="h-4 w-4 text-vfb-blue-600 border-vfb-gray-300 rounded focus:ring-vfb-blue-500"
                  />
                </div>

                {/* Notification Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className={`font-semibold ${notification.status === 'unread' ? 'text-vfb-text-primary' : 'text-vfb-text-secondary'}`}>
                        {notification.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                      {notification.status === 'unread' && (
                        <div className="w-2 h-2 bg-vfb-blue-600 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-vfb-text-tertiary">
                        {formatDate(notification.date)}
                      </span>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-vfb-text-tertiary hover:text-vfb-blue-600 transition-colors"
                        title={notification.status === 'unread' ? 'Marcar como lida' : 'Marcar como não lida'}
                      >
                        {notification.status === 'unread' ? <Eye className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-vfb-text-tertiary hover:text-red-600 transition-colors"
                        title="Excluir notificação"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <InsuranceLogo carrier={notification.sender} size="sm" />
                    <span className="text-sm text-vfb-text-secondary">{notification.sender}</span>
                  </div>

                  <p className="text-vfb-text-secondary mb-4 leading-relaxed">
                    {notification.message}
                  </p>

                  {/* Metadata */}
                  {Object.keys(notification.metadata).length > 0 && (
                    <div className="bg-vfb-gray-50 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {Object.entries(notification.metadata).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-vfb-text-tertiary capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                            <span className="text-vfb-text-primary font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {notification.actionText && (
                    <button className="px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors text-sm">
                      {notification.actionText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* No Results */}
      {filteredNotifications.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-12 text-center">
          <Bell className="h-16 w-16 text-vfb-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-vfb-text-primary mb-2">
            Nenhuma notificação encontrada
          </h3>
          <p className="text-vfb-text-secondary mb-6">
            Tente ajustar seus filtros ou verifique novamente mais tarde.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedStatus('all')
            }}
            className="px-6 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowSettings(false)}></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-vfb-text-primary">
                    Configurações de Notificações
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-vfb-text-secondary hover:text-vfb-text-primary"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h4 className="text-sm font-medium text-vfb-text-primary mb-3 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Notificações por Email
                    </h4>
                    <div className="space-y-3">
                      {[
                        'Reembolsos processados',
                        'Lembretes de consultas',
                        'Atualizações de apólice',
                        'Faturas disponíveis'
                      ].map((item, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-vfb-blue-600 border-vfb-gray-300 rounded focus:ring-vfb-blue-500"
                          />
                          <span className="ml-3 text-sm text-vfb-text-secondary">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div>
                    <h4 className="text-sm font-medium text-vfb-text-primary mb-3 flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Notificações por SMS
                    </h4>
                    <div className="space-y-3">
                      {[
                        'Lembretes de consultas',
                        'Alertas urgentes',
                        'Confirmações de agendamento'
                      ].map((item, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={index < 2}
                            className="h-4 w-4 text-vfb-blue-600 border-vfb-gray-300 rounded focus:ring-vfb-blue-500"
                          />
                          <span className="ml-3 text-sm text-vfb-text-secondary">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h4 className="text-sm font-medium text-vfb-text-primary mb-3 flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Notificações Push
                    </h4>
                    <div className="space-y-3">
                      {[
                        'Todas as atualizações',
                        'Apenas urgentes',
                        'Lembretes de consultas'
                      ].map((item, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-vfb-blue-600 border-vfb-gray-300 rounded focus:ring-vfb-blue-500"
                          />
                          <span className="ml-3 text-sm text-vfb-text-secondary">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-vfb-blue-600 text-base font-medium text-white hover:bg-vfb-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vfb-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Salvar Configurações
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 