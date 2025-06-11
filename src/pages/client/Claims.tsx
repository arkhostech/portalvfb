import { useState } from 'react'
import { 
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Download,
  Eye,
  Shield,
  Heart,
  Building2,
  Star,
  Search,
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Phone
} from 'lucide-react'

export default function Claims() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCarrier, setSelectedCarrier] = useState('all')

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

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      'approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Aprovado/Pago' },
      'processing': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Em Análise' },
      'denied': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Negado' },
      'pending_auth': { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'Aguardando Autorização' },
      'partial': { color: 'bg-orange-100 text-orange-800', icon: AlertCircle, label: 'Parcialmente Coberto' }
    }
    
    const config = configs[status as keyof typeof configs] || configs['processing']
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    )
  }

  // Dummy data para reembolsos
  const claims = [
    {
      id: 'REI-2024-001',
      carrier: 'Oscar Health',
      type: 'Consulta com Clínico Geral',
      provider: 'Dr. Michael Rodriguez - Miami Family Care',
      serviceDate: '15/11/2024',
      submittedDate: '16/11/2024',
      processedDate: '18/11/2024',
      status: 'approved',
      totalBilled: '$150.00',
      copayPaid: '$30.00',
      insurancePaid: '$120.00',
      yourResponsibility: '$0.00',
      diagnosis: 'Exame de rotina preventivo',
      claimNumber: 'OSC240001123',
      eobAvailable: true,
      receiptAvailable: true
    },
    {
      id: 'REI-2024-002',
      carrier: 'Florida Blue',
      type: 'Exames Laboratoriais',
      provider: 'LabCorp - Miami Beach',
      serviceDate: '20/11/2024',
      submittedDate: '21/11/2024',
      processedDate: null,
      status: 'processing',
      totalBilled: '$340.00',
      copayPaid: '$0.00',
      insurancePaid: null,
      yourResponsibility: null,
      diagnosis: 'Hemograma completo e perfil metabólico',
      claimNumber: 'FB240002456',
      eobAvailable: false,
      receiptAvailable: true
    },
    {
      id: 'REI-2024-003',
      carrier: 'Oscar Health',
      type: 'Consulta com Cardiologista',
      provider: 'Dr. Sarah Chen - Jacksonville Cardiology',
      serviceDate: '10/11/2024',
      submittedDate: '12/11/2024',
      processedDate: '15/11/2024',
      status: 'partial',
      totalBilled: '$450.00',
      copayPaid: '$60.00',
      insurancePaid: '$300.00',
      yourResponsibility: '$90.00',
      diagnosis: 'Consulta cardiológica - hipertensão',
      claimNumber: 'OSC240003789',
      eobAvailable: true,
      receiptAvailable: true
    },
    {
      id: 'REI-2024-004',
      carrier: 'Florida Blue',
      type: 'Radiografia do Tórax',
      provider: 'Miami Imaging Center',
      serviceDate: '05/11/2024',
      submittedDate: '06/11/2024',
      processedDate: '08/11/2024',
      status: 'denied',
      totalBilled: '$280.00',
      copayPaid: '$0.00',
      insurancePaid: '$0.00',
      yourResponsibility: '$280.00',
      diagnosis: 'Radiografia de tórax - rotina',
      claimNumber: 'FB240004012',
      eobAvailable: true,
      receiptAvailable: false,
      denialReason: 'Procedimento não coberto - não medicamente necessário'
    },
    {
      id: 'REI-2024-005',
      carrier: 'Oscar Health',
      type: 'Medicamentos Prescritos',
      provider: 'CVS Pharmacy #1234',
      serviceDate: '25/10/2024',
      submittedDate: '25/10/2024',
      processedDate: '26/10/2024',
      status: 'approved',
      totalBilled: '$120.00',
      copayPaid: '$15.00',
      insurancePaid: '$105.00',
      yourResponsibility: '$0.00',
      diagnosis: 'Medicação para hipertensão',
      claimNumber: 'OSC240005345',
      eobAvailable: true,
      receiptAvailable: true
    }
  ]

  // Filtrar reembolsos
  const filteredClaims = claims.filter(claim => {
    const matchesStatus = selectedStatus === 'all' || claim.status === selectedStatus
    const matchesCarrier = selectedCarrier === 'all' || claim.carrier === selectedCarrier
    return matchesStatus && matchesCarrier
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Meus Reembolsos</h1>
        <p className="text-vfb-blue-100">
          Acompanhe o status dos seus reembolsos e solicitações de cobertura
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Aprovados</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{claims.filter(c => c.status === 'approved').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Em Análise</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{claims.filter(c => c.status === 'processing').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Economizado</p>
              <p className="text-2xl font-bold text-vfb-text-primary">$525</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-cyan-100 rounded-lg">
              <Calendar className="h-6 w-6 text-vfb-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Este Ano</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{claims.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="approved">Aprovado/Pago</option>
              <option value="processing">Em Análise</option>
              <option value="denied">Negado</option>
              <option value="partial">Parcialmente Coberto</option>
              <option value="pending_auth">Aguardando Autorização</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Operadora
            </label>
            <select
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as Operadoras</option>
              <option value="Oscar Health">Oscar Health</option>
              <option value="Florida Blue">Florida Blue</option>
              <option value="Capital Health Plan">Capital Health Plan</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-vfb-blue-600 text-white font-medium rounded-lg hover:bg-vfb-blue-700 transition-colors">
              <FileText className="h-4 w-4 mr-2 inline" />
              Novo Reembolso
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Reembolsos */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-vfb-text-primary">
          {filteredClaims.length} reembolsos encontrados
        </h2>

        {filteredClaims.map(claim => (
          <div key={claim.id} className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <InsuranceLogo carrier={claim.carrier} size="md" />
                <div>
                  <h3 className="text-lg font-semibold text-vfb-text-primary">{claim.type}</h3>
                  <p className="text-sm text-vfb-text-tertiary">#{claim.id}</p>
                  <p className="text-sm text-vfb-text-secondary">{claim.provider}</p>
                </div>
              </div>
              <StatusBadge status={claim.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Datas */}
              <div className="space-y-3">
                <h4 className="font-medium text-vfb-text-primary">Informações do Serviço</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-vfb-text-tertiary">Data do Serviço:</span>
                    <span className="text-sm text-vfb-text-primary">{claim.serviceDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-vfb-text-tertiary">Enviado em:</span>
                    <span className="text-sm text-vfb-text-primary">{claim.submittedDate}</span>
                  </div>
                  {claim.processedDate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-vfb-text-tertiary">Processado em:</span>
                      <span className="text-sm text-vfb-text-primary">{claim.processedDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Valores */}
              <div className="space-y-3">
                <h4 className="font-medium text-vfb-text-primary">Valores</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-vfb-text-tertiary">Total Cobrado:</span>
                    <span className="text-sm text-vfb-text-primary font-medium">{claim.totalBilled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-vfb-text-tertiary">Copay Pago:</span>
                    <span className="text-sm text-vfb-text-primary font-medium">{claim.copayPaid}</span>
                  </div>
                  {claim.insurancePaid && (
                    <div className="flex justify-between">
                      <span className="text-sm text-vfb-text-tertiary">Seguro Pagou:</span>
                      <span className="text-sm text-green-600 font-medium">{claim.insurancePaid}</span>
                    </div>
                  )}
                  {claim.yourResponsibility && (
                    <div className="flex justify-between">
                      <span className="text-sm text-vfb-text-tertiary">Sua Responsabilidade:</span>
                      <span className="text-sm text-red-600 font-medium">{claim.yourResponsibility}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Diagnóstico */}
              <div className="space-y-3">
                <h4 className="font-medium text-vfb-text-primary">Detalhes Clínicos</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-vfb-text-tertiary">Diagnóstico:</span>
                    <p className="text-sm text-vfb-text-primary">{claim.diagnosis}</p>
                  </div>
                  <div>
                    <span className="text-sm text-vfb-text-tertiary">Número do Claim:</span>
                    <p className="text-sm text-vfb-text-primary font-mono">{claim.claimNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivo de Negação */}
            {claim.status === 'denied' && claim.denialReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-red-800 mb-2">Motivo da Negação:</h5>
                <p className="text-sm text-red-700">{claim.denialReason}</p>
              </div>
            )}

            {/* Ações */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-vfb-gray-100">
              {claim.eobAvailable && (
                <button className="flex items-center px-3 py-2 text-sm border border-vfb-gray-300 rounded-lg hover:bg-vfb-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar EOB
                </button>
              )}
              {claim.receiptAvailable && (
                <button className="flex items-center px-3 py-2 text-sm border border-vfb-gray-300 rounded-lg hover:bg-vfb-gray-50">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Recibo
                </button>
              )}
              <button className="flex items-center px-3 py-2 text-sm border border-vfb-gray-300 rounded-lg hover:bg-vfb-gray-50">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </button>
              {claim.status === 'denied' && (
                <button className="flex items-center px-3 py-2 text-sm bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Contestar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dicas */}
      <div className="bg-vfb-blue-50 border border-vfb-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-vfb-blue-800 mb-4">💡 Dicas para Reembolsos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-vfb-blue-700">
          <div>
            <h4 className="font-medium mb-2">Para acelerar o processo:</h4>
            <ul className="space-y-1">
              <li>• Sempre guarde todos os recibos originais</li>
              <li>• Envie documentos dentro de 90 dias do serviço</li>
              <li>• Verifique se o provedor está na sua rede</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Em caso de negação:</h4>
            <ul className="space-y-1">
              <li>• Você tem 180 dias para contestar</li>
              <li>• Solicite documentos médicos adicionais se necessário</li>
              <li>• Entre em contato com a operadora para esclarecimentos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 