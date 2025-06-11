import { useState } from 'react'
import { 
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
  Building2,
  Shield,
  Heart,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Receipt
} from 'lucide-react'

export default function Payments() {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedStatus, setSelectedStatus] = useState('all')

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

  // Status Badge para pagamentos
  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      'paid': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Pago' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pendente' },
      'overdue': { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Em Atraso' },
      'failed': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Falhou' },
      'processing': { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Processando' },
      'refunded': { color: 'bg-gray-100 text-gray-800', icon: ArrowDownRight, label: 'Reembolsado' }
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

  // Dados das mensalidades e faturas
  const payments = [
    {
      id: 'PAY-2024-12',
      type: 'premium',
      carrier: 'Oscar Health',
      description: 'Mensalidade Oscar PPO Familiar - Dezembro 2024',
      amount: '$485.50',
      dueDate: '01/12/2024',
      paidDate: null,
      status: 'pending',
      invoiceNumber: 'OSC-INV-2024-12',
      paymentMethod: null,
      autopay: true
    },
    {
      id: 'PAY-2024-11',
      type: 'premium',
      carrier: 'Oscar Health',
      description: 'Mensalidade Oscar PPO Familiar - Novembro 2024',
      amount: '$485.50',
      dueDate: '01/11/2024',
      paidDate: '28/10/2024',
      status: 'paid',
      invoiceNumber: 'OSC-INV-2024-11',
      paymentMethod: 'Cartão ****1234',
      autopay: true
    },
    {
      id: 'PAY-2024-10',
      type: 'premium',
      carrier: 'Oscar Health',
      description: 'Mensalidade Oscar PPO Familiar - Outubro 2024',
      amount: '$485.50',
      dueDate: '01/10/2024',
      paidDate: '28/09/2024',
      status: 'paid',
      invoiceNumber: 'OSC-INV-2024-10',
      paymentMethod: 'Cartão ****1234',
      autopay: true
    },
    {
      id: 'PAY-2024-09',
      type: 'deductible',
      carrier: 'Oscar Health',
      description: 'Pagamento de Franquia - Consulta Cardiologista',
      amount: '$90.00',
      dueDate: '15/11/2024',
      paidDate: '16/11/2024',
      status: 'paid',
      invoiceNumber: 'OSC-DED-2024-001',
      paymentMethod: 'Cartão ****5678',
      autopay: false
    },
    {
      id: 'PAY-2024-FB-11',
      type: 'premium',
      carrier: 'Florida Blue',
      description: 'Mensalidade Florida Blue Silver - Novembro 2024',
      amount: '$425.00',
      dueDate: '01/11/2024',
      paidDate: '01/11/2024',
      status: 'paid',
      invoiceNumber: 'FB-INV-2024-11',
      paymentMethod: 'Débito Automático',
      autopay: true
    },
    {
      id: 'PAY-2024-REF-001',
      type: 'refund',
      carrier: 'Oscar Health',
      description: 'Reembolso - Pagamento duplicado',
      amount: '$485.50',
      dueDate: null,
      paidDate: '05/11/2024',
      status: 'refunded',
      invoiceNumber: 'OSC-REF-2024-001',
      paymentMethod: 'Conta Bancária',
      autopay: false
    }
  ]

  // Métodos de pagamento cadastrados
  const paymentMethods = [
    {
      id: 'pm-001',
      type: 'credit_card',
      name: 'Visa ****1234',
      details: 'Expira em 05/2027',
      isDefault: true,
      autopayEnabled: true
    },
    {
      id: 'pm-002',
      type: 'credit_card',
      name: 'Mastercard ****5678',
      details: 'Expira em 08/2026',
      isDefault: false,
      autopayEnabled: false
    },
    {
      id: 'pm-003',
      type: 'bank_account',
      name: 'Conta Corrente ****9012',
      details: 'Wells Fargo Bank',
      isDefault: false,
      autopayEnabled: true
    }
  ]

  // Próximos pagamentos
  const upcomingPayments = [
    {
      carrier: 'Oscar Health',
      description: 'Mensalidade Dezembro 2024',
      amount: '$485.50',
      dueDate: '01/12/2024',
      daysUntilDue: 5
    },
    {
      carrier: 'Florida Blue',
      description: 'Mensalidade Dezembro 2024',
      amount: '$425.00',
      dueDate: '01/12/2024',
      daysUntilDue: 5
    }
  ]

  // Filtrar pagamentos
  const filteredPayments = payments.filter(payment => {
    const matchesYear = selectedYear === 'all' || payment.dueDate?.includes(selectedYear)
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus
    return matchesYear && matchesStatus
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Faturamento e Pagamentos</h1>
        <p className="text-vfb-blue-100">
          Gerencie suas mensalidades, métodos de pagamento e histórico financeiro
        </p>
      </div>

      {/* Próximos Pagamentos */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-vfb-text-primary">Próximos Pagamentos</h2>
          <button className="px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2 inline" />
            Fazer Pagamento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingPayments.map((payment, index) => (
            <div key={index} className="border border-vfb-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <InsuranceLogo carrier={payment.carrier} size="md" />
                  <div>
                    <h3 className="font-medium text-vfb-text-primary">{payment.description}</h3>
                    <p className="text-sm text-vfb-text-tertiary">Vence em {payment.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-vfb-text-primary">{payment.amount}</p>
                  <p className="text-sm text-vfb-text-tertiary">
                    {payment.daysUntilDue > 0 ? `${payment.daysUntilDue} dias` : 'Vencido'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-vfb-blue-600 text-white text-sm rounded-lg hover:bg-vfb-blue-700">
                  Pagar Agora
                </button>
                <button className="px-3 py-2 border border-vfb-gray-300 text-vfb-text-primary text-sm rounded-lg hover:bg-vfb-gray-50">
                  Ver Fatura
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Pagamentos em Dia</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{payments.filter(p => p.status === 'paid').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Pendentes</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{payments.filter(p => p.status === 'pending').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Pago 2024</p>
              <p className="text-2xl font-bold text-vfb-text-primary">$5,826</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-cyan-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-vfb-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Débito Automático</p>
              <p className="text-2xl font-bold text-vfb-text-primary">Ativo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Métodos de Pagamento */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-vfb-text-primary">Métodos de Pagamento</h2>
          <button className="px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2 inline" />
            Adicionar Método
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="border border-vfb-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-vfb-gray-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-vfb-text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-vfb-text-primary">{method.name}</h3>
                    <p className="text-sm text-vfb-text-tertiary">{method.details}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 text-vfb-text-tertiary hover:text-vfb-blue-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-vfb-text-tertiary hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {method.isDefault && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Padrão
                  </span>
                )}
                {method.autopayEnabled && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full ml-2">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    Débito Automático
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros e Histórico */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-vfb-text-primary">Histórico de Pagamentos</h2>
          <div className="flex space-x-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Anos</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="overdue">Em Atraso</option>
              <option value="failed">Falhou</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-vfb-gray-200">
                <th className="text-left py-3 px-4 font-medium text-vfb-text-primary">Descrição</th>
                <th className="text-left py-3 px-4 font-medium text-vfb-text-primary">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-vfb-text-primary">Vencimento</th>
                <th className="text-left py-3 px-4 font-medium text-vfb-text-primary">Status</th>
                <th className="text-left py-3 px-4 font-medium text-vfb-text-primary">Método</th>
                <th className="text-right py-3 px-4 font-medium text-vfb-text-primary">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vfb-gray-100">
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-vfb-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <InsuranceLogo carrier={payment.carrier} size="sm" />
                      <div>
                        <p className="font-medium text-vfb-text-primary">{payment.description}</p>
                        <p className="text-sm text-vfb-text-tertiary">#{payment.invoiceNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-vfb-text-primary">{payment.amount}</p>
                    {payment.type === 'refund' && (
                      <p className="text-xs text-green-600">Reembolso</p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-vfb-text-primary">{payment.dueDate || '-'}</p>
                    {payment.paidDate && (
                      <p className="text-sm text-green-600">Pago em {payment.paidDate}</p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-vfb-text-primary">{payment.paymentMethod || '-'}</p>
                    {payment.autopay && (
                      <p className="text-xs text-blue-600">Débito Automático</p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-vfb-text-tertiary hover:text-vfb-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-vfb-text-tertiary hover:text-vfb-blue-600">
                        <Download className="h-4 w-4" />
                      </button>
                      {payment.status === 'pending' && (
                        <button className="px-3 py-1 bg-vfb-blue-600 text-white text-sm rounded hover:bg-vfb-blue-700">
                          Pagar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configurações de Débito Automático */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-green-200 rounded-lg mr-3">
            <ArrowUpRight className="h-6 w-6 text-green-700" />
          </div>
          <h3 className="text-lg font-semibold text-green-800">Débito Automático</h3>
        </div>
        
        <p className="text-sm text-green-700 mb-4">
          Simplifique seus pagamentos com o débito automático. Suas mensalidades serão debitadas automaticamente do seu cartão ou conta bancária.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Oscar Health PPO</h4>
            <p className="text-sm text-green-700 mb-3">Débito Automático Ativo</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Visa ****1234</span>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                Alterar
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Florida Blue Silver</h4>
            <p className="text-sm text-green-700 mb-3">Débito Automático Ativo</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Conta ****9012</span>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                Alterar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Informações Importantes */}
      <div className="bg-vfb-blue-50 border border-vfb-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-vfb-blue-800 mb-4">💳 Informações sobre Pagamentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-vfb-blue-700">
          <div>
            <h4 className="font-medium mb-2">Prazos e Vencimentos:</h4>
            <ul className="space-y-1">
              <li>• Mensalidades vencem sempre no dia 1º</li>
              <li>• Período de carência: 10 dias após vencimento</li>
              <li>• Débito automático ocorre 3 dias antes do vencimento</li>
              <li>• Multa de 2% após o vencimento</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Métodos de Pagamento:</h4>
            <ul className="space-y-1">
              <li>• Cartão de crédito (Visa, Mastercard, American Express)</li>
              <li>• Débito automático em conta corrente</li>
              <li>• Transferência bancária (PIX disponível)</li>
              <li>• Boleto bancário (disponível mediante solicitação)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 