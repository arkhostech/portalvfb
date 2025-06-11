import { useAuth } from '@/contexts/AuthContext'
import { 
  FileText, 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Download,
  Phone,
  Mail,
  Calendar,
  Building2,
  Heart,
  Star
} from 'lucide-react'

export default function ClientDashboard() {
  const { user } = useAuth()

  // Componente para logo das operadoras
  const InsuranceLogo = ({ carrier, size = 'sm' }: { carrier: string, size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12', 
      lg: 'w-16 h-16'
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
      <div className={`${sizes[size]} ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'} ${config.color}`} />
      </div>
    )
  }

  // Mock data específico do cliente com seguradoras reais da Flórida
  const clientData = {
    activePolicies: 2,
    totalCoverage: '$500.000',
    nextPayment: '15/01/2025',
    annualDeductible: '$1.250',
    recentClaims: [
      {
        id: 'REI-001',
        type: 'Consulta com Clínico Geral',
        date: '25/11/2024',
        status: 'approved',
        amount: '$30,00',
        carrier: 'Oscar Health',
        provider: 'Dr. Michael Johnson - Jacksonville Primary Care'
      },
      {
        id: 'REI-002', 
        type: 'Exames Laboratoriais',
        date: '20/11/2024',
        status: 'processing',
        amount: '$125,00',
        carrier: 'Florida Blue',
        provider: 'LabCorp - Miami Beach'
      }
    ],
    policies: [
      {
        number: 'OSC-FL-2024-001',
        type: 'Oscar Health PPO Familiar',
        carrier: 'Oscar Health',
        status: 'active',
        coverage: '$500.000',
        premium: '$385,00/mês',
        deductible: '$2.500',
        outOfPocket: '$7.500',
        copayPrimary: '$30',
        copaySpecialist: '$60',
        network: 'Oscar Network - Flórida',
        features: ['Telemedicina Grátis', 'App Oscar', 'Concierge Team']
      },
      {
        number: 'FB-BOS-2024-002',
        type: 'Florida Blue Blue Options Silver',
        carrier: 'Florida Blue',
        status: 'active', 
        coverage: '$2.000',
        premium: '$125,00/mês',
        deductible: '$1.500',
        outOfPocket: '$3.000',
        copayPrimary: '$25',
        copaySpecialist: '$50',
        network: 'Blue Options Network',
        features: ['Maior Rede da Flórida', 'Wellness Programs', 'Blue365 Deals']
      }
    ],
    upcomingAppointments: [
      {
        date: '2024-12-15',
        time: '14:30',
        doctor: 'Dr. Carlos Silva',
        specialty: 'Cardiologia'
      }
    ]
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      processing: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      denied: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    }
    
    const config = configs[status as keyof typeof configs]
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status === 'active' && 'Ativo'}
        {status === 'processing' && 'Em Análise'}
        {status === 'approved' && 'Aprovado/Pago'}
        {status === 'denied' && 'Negado'}
      </span>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Bem-vindo, {user?.firstName}!
        </h1>
        <p className="text-vfb-blue-100">
          Gerencie seus planos de saúde e reembolsos em um só lugar
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-vfb-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Planos Ativos</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{clientData.activePolicies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Limite de Cobertura Anual</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{clientData.totalCoverage}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Próximo Pagamento</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{clientData.nextPayment}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-cyan-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-vfb-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Restam da Franquia</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{clientData.annualDeductible}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meus Planos de Saúde */}
        <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200">
          <div className="p-6 border-b border-vfb-gray-200">
            <h2 className="text-lg font-semibold text-vfb-text-primary">Meus Planos de Saúde</h2>
          </div>
          <div className="p-6 space-y-4">
            {clientData.policies.map((policy) => (
              <div key={policy.number} className="border border-vfb-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <InsuranceLogo carrier={policy.carrier} size="md" />
                    <div>
                      <h3 className="font-medium text-vfb-text-primary">{policy.type}</h3>
                      <p className="text-sm text-vfb-text-tertiary">#{policy.number}</p>
                      <p className="text-xs text-vfb-text-tertiary">{policy.network}</p>
                    </div>
                  </div>
                  <StatusBadge status={policy.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-vfb-text-tertiary">Clínico Geral</p>
                    <p className="font-medium text-vfb-text-primary">{policy.copayPrimary} copay</p>
                  </div>
                  <div>
                    <p className="text-xs text-vfb-text-tertiary">Especialista</p>
                    <p className="font-medium text-vfb-text-primary">{policy.copaySpecialist} copay</p>
                  </div>
                  <div>
                    <p className="text-xs text-vfb-text-tertiary">Franquia Anual</p>
                    <p className="font-medium text-vfb-text-primary">{policy.deductible}</p>
                  </div>
                  <div>
                    <p className="text-xs text-vfb-text-tertiary">Mensalidade</p>
                    <p className="font-medium text-vfb-text-primary">{policy.premium}</p>
                  </div>
                </div>
                
                <div className="border-t border-vfb-gray-100 pt-3">
                  <p className="text-xs text-vfb-text-tertiary mb-2">Benefícios Especiais:</p>
                  <div className="flex flex-wrap gap-1">
                    {policy.features.map((feature, idx) => (
                      <span key={idx} className="inline-flex text-xs bg-vfb-blue-50 text-vfb-blue-700 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reembolsos Recentes */}
        <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200">
          <div className="p-6 border-b border-vfb-gray-200">
            <h2 className="text-lg font-semibold text-vfb-text-primary">Reembolsos Recentes</h2>
          </div>
          <div className="p-6 space-y-4">
            {clientData.recentClaims.map((claim) => (
              <div key={claim.id} className="border border-vfb-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <InsuranceLogo carrier={claim.carrier} size="sm" />
                    <div>
                      <h3 className="font-medium text-vfb-text-primary">{claim.type}</h3>
                      <p className="text-sm text-vfb-text-tertiary">{claim.date}</p>
                      <p className="text-xs text-vfb-text-tertiary">{claim.provider}</p>
                    </div>
                  </div>
                  <StatusBadge status={claim.status} />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-vfb-text-tertiary">Copay pago: </span>
                    <span className="font-medium text-vfb-text-primary">{claim.amount}</span>
                  </div>
                  <span className="text-xs text-vfb-text-tertiary">#{claim.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200">
        <div className="p-6 border-b border-vfb-gray-200">
          <h2 className="text-lg font-semibold text-vfb-text-primary">Ações Rápidas</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <Download className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <span className="text-sm font-medium text-vfb-text-primary">Ver Carteirinhas</span>
          </button>
          
          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <FileText className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <span className="text-sm font-medium text-vfb-text-primary">Solicitar Reembolso</span>
          </button>
          
          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <Phone className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <span className="text-sm font-medium text-vfb-text-primary">Encontrar Médico</span>
          </button>
          
          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <Mail className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <span className="text-sm font-medium text-vfb-text-primary">Verificar Benefícios</span>
          </button>
        </div>
      </div>
    </div>
  )
} 