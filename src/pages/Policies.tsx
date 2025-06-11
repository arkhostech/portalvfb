import { useState } from 'react'
import { 
  Shield,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Download,
  Building2,
  Heart,
  Star,
  TrendingUp,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Policies() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCarrier, setSelectedCarrier] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPlan, setSelectedPlan] = useState('all')

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
      'Florida Health Care Plans': { bg: 'bg-orange-100', color: 'text-orange-600', icon: Star },
      'AmeriHealth Caritas Next': { bg: 'bg-red-100', color: 'text-red-600', icon: Heart }
    }
    
    const config = carrierConfig[carrier as keyof typeof carrierConfig] || carrierConfig['Florida Blue']
    const Icon = config.icon
    
    return (
      <div className={`${sizes[size]} ${config.bg} rounded-md flex items-center justify-center flex-shrink-0`}>
        <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'} ${config.color}`} />
      </div>
    )
  }

  // Status Badge
  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      'active': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Ativo' },
      'inactive': { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Inativo' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pendente' },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelado' },
      'suspended': { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle, label: 'Suspenso' }
    }
    
    const config = configs[status as keyof typeof configs] || configs['pending']
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    )
  }

  // Dados dos planos de saúde
  const policies = [
    {
      id: 'POL-2024-001',
      policyNumber: 'OSC-PPO-2024-001',
      carrier: 'Oscar Health',
      planName: 'Oscar Gold PPO',
      planType: 'PPO',
      status: 'active',
      clientName: 'Carlos Silva',
      clientId: 'CLI-001',
      effectiveDate: '01/01/2024',
      expirationDate: '31/12/2024',
      premium: '$485.50',
      deductible: '$2,500',
      familySize: 4,
      dependents: ['Maria Silva', 'Ana Silva', 'Pedro Silva'],
      coverage: {
        medical: true,
        dental: false,
        vision: true,
        pharmacy: true
      },
      lastPayment: '28/10/2024',
      nextPayment: '01/12/2024',
      broker: 'VFB Insurance'
    },
    {
      id: 'POL-2024-002',
      policyNumber: 'FB-SIL-2024-002',
      carrier: 'Florida Blue',
      planName: 'Florida Blue Silver',
      planType: 'HMO',
      status: 'active',
      clientName: 'Ana Rodriguez',
      clientId: 'CLI-002',
      effectiveDate: '01/03/2024',
      expirationDate: '28/02/2025',
      premium: '$425.00',
      deductible: '$3,000',
      familySize: 2,
      dependents: ['Miguel Rodriguez'],
      coverage: {
        medical: true,
        dental: true,
        vision: false,
        pharmacy: true
      },
      lastPayment: '01/11/2024',
      nextPayment: '01/12/2024',
      broker: 'VFB Insurance'
    },
    {
      id: 'POL-2024-003',
      policyNumber: 'CHP-BRO-2024-003',
      carrier: 'Capital Health Plan',
      planName: 'Capital Bronze Plus',
      planType: 'EPO',
      status: 'pending',
      clientName: 'Roberto Mendes',
      clientId: 'CLI-003',
      effectiveDate: '01/01/2025',
      expirationDate: '31/12/2025',
      premium: '$385.00',
      deductible: '$5,000',
      familySize: 1,
      dependents: [],
      coverage: {
        medical: true,
        dental: false,
        vision: false,
        pharmacy: true
      },
      lastPayment: null,
      nextPayment: '01/01/2025',
      broker: 'VFB Insurance'
    },
    {
      id: 'POL-2024-004',
      policyNumber: 'OSC-SIL-2024-004',
      carrier: 'Oscar Health',
      planName: 'Oscar Silver EPO',
      planType: 'EPO',
      status: 'active',
      clientName: 'Fernanda Costa',
      clientId: 'CLI-004',
      effectiveDate: '15/06/2024',
      expirationDate: '14/06/2025',
      premium: '$365.00',
      deductible: '$4,000',
      familySize: 3,
      dependents: ['João Costa', 'Lucia Costa'],
      coverage: {
        medical: true,
        dental: true,
        vision: true,
        pharmacy: true
      },
      lastPayment: '15/11/2024',
      nextPayment: '15/12/2024',
      broker: 'VFB Insurance'
    },
    {
      id: 'POL-2024-005',
      policyNumber: 'FB-GLD-2024-005',
      carrier: 'Florida Blue',
      planName: 'Florida Blue Gold',
      planType: 'PPO',
      status: 'suspended',
      clientName: 'Ricardo Santos',
      clientId: 'CLI-005',
      effectiveDate: '01/08/2024',
      expirationDate: '31/07/2025',
      premium: '$545.00',
      deductible: '$1,500',
      familySize: 5,
      dependents: ['Patricia Santos', 'Gabriel Santos', 'Sofia Santos', 'Lucas Santos'],
      coverage: {
        medical: true,
        dental: true,
        vision: true,
        pharmacy: true
      },
      lastPayment: '01/09/2024',
      nextPayment: '01/10/2024',
      broker: 'VFB Insurance'
    },
    {
      id: 'POL-2024-006',
      policyNumber: 'CHP-SIL-2024-006',
      carrier: 'Capital Health Plan',
      planName: 'Capital Silver',
      planType: 'HMO',
      status: 'cancelled',
      clientName: 'Eduardo Lima',
      clientId: 'CLI-006',
      effectiveDate: '01/04/2024',
      expirationDate: '30/09/2024',
      premium: '$405.00',
      deductible: '$3,500',
      familySize: 2,
      dependents: ['Carla Lima'],
      coverage: {
        medical: true,
        dental: false,
        vision: true,
        pharmacy: true
      },
      lastPayment: '01/08/2024',
      nextPayment: null,
      broker: 'VFB Insurance'
    }
  ]

  // Estatísticas
  const stats = {
    totalPolicies: policies.length,
    activePolicies: policies.filter(p => p.status === 'active').length,
    pendingPolicies: policies.filter(p => p.status === 'pending').length,
    totalPremium: policies
      .filter(p => p.status === 'active')
      .reduce((sum, p) => sum + parseFloat(p.premium.replace('$', '').replace(',', '')), 0),
    totalMembers: policies
      .filter(p => p.status === 'active')
      .reduce((sum, p) => sum + p.familySize, 0)
  }

  // Filtrar planos
  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = searchQuery === '' || 
      policy.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.planName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCarrier = selectedCarrier === 'all' || policy.carrier === selectedCarrier
    const matchesStatus = selectedStatus === 'all' || policy.status === selectedStatus
    const matchesPlan = selectedPlan === 'all' || policy.planType === selectedPlan
    
    return matchesSearch && matchesCarrier && matchesStatus && matchesPlan
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gestão de Planos de Saúde</h1>
            <p className="text-vfb-blue-100">
              Gerencie todas as apólices e planos de seguro saúde dos clientes
            </p>
          </div>
          <Button 
            className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Apólice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-vfb-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Total de Apólices</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{stats.totalPolicies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Apólices Ativas</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{stats.activePolicies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-cyan-100 rounded-lg">
              <Users className="h-6 w-6 text-vfb-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Total de Segurados</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{stats.totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Prêmios Mensais</p>
              <p className="text-2xl font-bold text-vfb-text-primary">${stats.totalPremium.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vfb-text-tertiary" />
            <input
              type="text"
              placeholder="Buscar por cliente, apólice ou plano..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCarrier}
            onChange={(e) => setSelectedCarrier(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="all">Todas as Operadoras</option>
            <option value="Oscar Health">Oscar Health</option>
            <option value="Florida Blue">Florida Blue</option>
            <option value="Capital Health Plan">Capital Health Plan</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="pending">Pendente</option>
            <option value="suspended">Suspenso</option>
            <option value="cancelled">Cancelado</option>
          </select>

          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os Tipos</option>
            <option value="PPO">PPO</option>
            <option value="HMO">HMO</option>
            <option value="EPO">EPO</option>
          </select>

          <Button variant="outline-primary" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>
      </div>

      {/* Policies Table */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-vfb-gray-200">
            <thead className="bg-vfb-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Cliente / Apólice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Vigência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Prêmio / Franquia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Segurados
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-vfb-gray-200">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-vfb-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-vfb-text-primary">
                        {policy.clientName}
                      </div>
                      <div className="text-sm text-vfb-text-tertiary">
                        {policy.policyNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <InsuranceLogo carrier={policy.carrier} />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-vfb-text-primary">
                          {policy.planName}
                        </div>
                        <div className="text-sm text-vfb-text-tertiary">
                          {policy.carrier} • {policy.planType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={policy.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-vfb-text-secondary">
                    <div>
                      <div>Início: {policy.effectiveDate}</div>
                      <div>Fim: {policy.expirationDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-vfb-text-secondary">
                    <div>
                      <div className="font-medium">{policy.premium}/mês</div>
                      <div>Franquia: {policy.deductible}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-vfb-text-tertiary mr-1" />
                      <span className="text-sm text-vfb-text-secondary">{policy.familySize}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Relatórios</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Gerar relatórios de apólices e performances
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Gerar
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Exportar Dados</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Exportar lista de apólices para Excel
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Renovações</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Gerenciar renovações pendentes
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Todas
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 