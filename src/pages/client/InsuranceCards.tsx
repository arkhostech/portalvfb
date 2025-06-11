import { useState } from 'react'
import { 
  CreditCard,
  Download,
  Share2,
  Phone,
  QrCode,
  User,
  Heart,
  Shield,
  Building2,
  Star,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  ExternalLink,
  AlertTriangle
} from 'lucide-react'

export default function InsuranceCards() {
  const [selectedMember, setSelectedMember] = useState(0)
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0)

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

  // Dados dos membros da família
  const familyMembers = [
    {
      id: 1,
      name: 'Carlos Silva',
      relationship: 'Titular',
      dateOfBirth: '15/03/1985',
      memberId: 'OSC-FL-2024-001',
      groupNumber: 'VFB-CORP-2024',
      plans: [
        {
          name: 'Oscar Health PPO Familiar',
          carrier: 'Oscar Health',
          type: 'PPO',
          tier: 'Family',
          effectiveDate: '01/01/2024',
          renewalDate: '31/12/2024',
          cardColor: 'from-blue-700 to-blue-900',
          cardText: 'text-white',
          cardAccent: 'text-blue-200',
          cardBorder: 'border-blue-200',
          cardBg: 'bg-blue-50',
          cardBtn: 'bg-vfb-blue-600 hover:bg-vfb-blue-700',
          cardBtnOutline: 'border-vfb-blue-600 text-vfb-blue-700 hover:bg-vfb-blue-50',
          pdfUrl: '/documents/carteirinha-carlos-silva-oscar.pdf',
          coverage: {
            primary: 'Dr. Michael Rodriguez',
            primaryPhone: '(305) 555-0100',
            emergencyRoom: '$150 copay',
            urgentCare: '$50 copay',
            primaryCare: '$25 copay',
            specialist: '$40 copay',
            prescription: '$10/$30/$60'
          }
        },
        {
          name: 'Ameritas Dental Family',
          carrier: 'Ameritas',
          type: 'Dental',
          tier: 'Family',
          effectiveDate: '01/01/2024',
          renewalDate: '31/12/2024',
          cardColor: 'from-red-600 to-red-800',
          cardText: 'text-white',
          cardAccent: 'text-red-200',
          cardBorder: 'border-red-200',
          cardBg: 'bg-red-50',
          cardBtn: 'bg-red-600 hover:bg-red-700',
          cardBtnOutline: 'border-red-600 text-red-700 hover:bg-red-50',
          pdfUrl: '/documents/carteirinha-carlos-silva-ameritas.pdf',
          coverage: {
            primary: 'Dr. Paulo Mendes',
            primaryPhone: '(305) 555-0201',
            emergencyRoom: '$100 copay',
            urgentCare: '$40 copay',
            primaryCare: '$20 copay',
            specialist: '$35 copay',
            prescription: '$8/$25/$50'
          }
        }
      ],
      qrCode: 'https://portal.vfb.com/cards/verify/OSC-FL-2024-001'
    },
    {
      id: 2,
      name: 'Maria Silva',
      relationship: 'Cônjuge',
      dateOfBirth: '22/07/1987',
      memberId: 'OSC-FL-2024-001-SP',
      groupNumber: 'VFB-CORP-2024',
      plans: [
        {
          name: 'Oscar Health PPO Familiar',
          carrier: 'Oscar Health',
          type: 'PPO',
          tier: 'Family',
          effectiveDate: '01/01/2024',
          renewalDate: '31/12/2024',
          cardColor: 'from-blue-700 to-blue-900',
          cardText: 'text-white',
          cardAccent: 'text-blue-200',
          cardBorder: 'border-blue-200',
          cardBg: 'bg-blue-50',
          cardBtn: 'bg-vfb-blue-600 hover:bg-vfb-blue-700',
          cardBtnOutline: 'border-vfb-blue-600 text-vfb-blue-700 hover:bg-vfb-blue-50',
          pdfUrl: '/documents/carteirinha-maria-silva-oscar.pdf',
          coverage: {
            primary: 'Dr. Sarah Johnson',
            primaryPhone: '(305) 555-0101',
            emergencyRoom: '$150 copay',
            urgentCare: '$50 copay',
            primaryCare: '$25 copay',
            specialist: '$40 copay',
            prescription: '$10/$30/$60'
          }
        },
        {
          name: 'Ameritas Dental Family',
          carrier: 'Ameritas',
          type: 'Dental',
          tier: 'Family',
          effectiveDate: '01/01/2024',
          renewalDate: '31/12/2024',
          cardColor: 'from-red-600 to-red-800',
          cardText: 'text-white',
          cardAccent: 'text-red-200',
          cardBorder: 'border-red-200',
          cardBg: 'bg-red-50',
          cardBtn: 'bg-red-600 hover:bg-red-700',
          cardBtnOutline: 'border-red-600 text-red-700 hover:bg-red-50',
          pdfUrl: '/documents/carteirinha-maria-silva-ameritas.pdf',
          coverage: {
            primary: 'Dr. Paulo Mendes',
            primaryPhone: '(305) 555-0201',
            emergencyRoom: '$100 copay',
            urgentCare: '$40 copay',
            primaryCare: '$20 copay',
            specialist: '$35 copay',
            prescription: '$8/$25/$50'
          }
        }
      ],
      qrCode: 'https://portal.vfb.com/cards/verify/OSC-FL-2024-001-SP'
    },
    {
      id: 3,
      name: 'Ana Silva',
      relationship: 'Filha',
      dateOfBirth: '22/08/2010',
      memberId: 'OSC-FL-2024-001-01',
      groupNumber: 'VFB-CORP-2024',
      plans: [
        {
          name: 'Oscar Health PPO Familiar',
          carrier: 'Oscar Health',
          type: 'PPO',
          tier: 'Family',
          effectiveDate: '01/01/2024',
          renewalDate: '31/12/2024',
          cardColor: 'from-blue-700 to-blue-900',
          cardText: 'text-white',
          cardAccent: 'text-blue-200',
          cardBorder: 'border-blue-200',
          cardBg: 'bg-blue-50',
          cardBtn: 'bg-vfb-blue-600 hover:bg-vfb-blue-700',
          cardBtnOutline: 'border-vfb-blue-600 text-vfb-blue-700 hover:bg-vfb-blue-50',
          pdfUrl: '/documents/carteirinha-ana-silva-oscar.pdf',
          coverage: {
            primary: 'Dr. Patricia Lee (Pediatra)',
            primaryPhone: '(305) 555-0102',
            emergencyRoom: '$150 copay',
            urgentCare: '$50 copay',
            primaryCare: '$15 copay',
            specialist: '$30 copay',
            prescription: '$5/$15/$30'
          }
        },
        {
          name: 'Ameritas Dental Family',
          carrier: 'Ameritas',
          type: 'Dental',
          tier: 'Family',
          effectiveDate: '01/01/2024',
          renewalDate: '31/12/2024',
          cardColor: 'from-red-600 to-red-800',
          cardText: 'text-white',
          cardAccent: 'text-red-200',
          cardBorder: 'border-red-200',
          cardBg: 'bg-red-50',
          cardBtn: 'bg-red-600 hover:bg-red-700',
          cardBtnOutline: 'border-red-600 text-red-700 hover:bg-red-50',
          pdfUrl: '/documents/carteirinha-ana-silva-ameritas.pdf',
          coverage: {
            primary: 'Dr. Fernanda Souza',
            primaryPhone: '(305) 555-0202',
            emergencyRoom: '$100 copay',
            urgentCare: '$40 copay',
            primaryCare: '$15 copay',
            specialist: '$25 copay',
            prescription: '$5/$15/$30'
          }
        }
      ],
      qrCode: 'https://portal.vfb.com/cards/verify/OSC-FL-2024-001-01'
    }
  ]

  const currentMember = familyMembers[selectedMember]
  const selectedPlan = currentMember.plans[selectedPlanIdx]

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getCarrierTheme = (carrier: string) => {
    const themes = {
      'Oscar Health': {
        gradient: 'from-purple-600 to-purple-800',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        accent: 'text-purple-600'
      },
      'Florida Blue': {
        gradient: 'from-blue-600 to-blue-800',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        accent: 'text-blue-600'
      }
    }
    return themes[carrier as keyof typeof themes] || themes['Florida Blue']
  }

  const theme = getCarrierTheme(currentMember.plans[0].carrier)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Carteirinhas de Saúde</h1>
        <p className="text-vfb-blue-100">
          Acesse suas carteirinhas digitais, compartilhe com médicos e baixe quando precisar
        </p>
      </div>

      {/* Seletor de Membros */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <h2 className="text-lg font-semibold text-vfb-text-primary mb-4">Selecionar Membro da Família</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyMembers.map((member, index) => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(index)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMember === index
                  ? 'border-vfb-blue-500 bg-vfb-blue-50'
                  : 'border-vfb-gray-200 hover:border-vfb-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-vfb-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-vfb-text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-vfb-text-primary">{member.name}</p>
                  <p className="text-sm text-vfb-text-tertiary">{member.relationship}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Carteirinha Digital */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carteirinhas Digitais - Oscar e Ameritas */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-vfb-text-primary">Carteirinhas Digitais</h3>
          {currentMember.plans.map((plan, idx) => (
            <div key={plan.carrier} className="relative">
              {/* Carteirinha */}
              <div className={`bg-gradient-to-br ${plan.cardColor} rounded-lg p-4 text-white shadow-xl mx-auto w-full max-w-md min-h-[180px]`} style={{ aspectRatio: '1.6/1' }}>
                {/* Header da operadora */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <InsuranceLogo carrier={plan.carrier} size="md" />
                    <div>
                      <h4 className="font-bold text-base">{plan.carrier}</h4>
                      <p className="text-xs opacity-90">{plan.type} {plan.carrier === 'Oscar Health' ? 'Health Plan' : 'Dental Plan'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Válido até</p>
                    <p className="font-semibold">{plan.renewalDate}</p>
                  </div>
                </div>

                {/* Informações do membro */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs opacity-75 uppercase tracking-wide">Nome do Segurado</p>
                    <p className="font-bold text-base">{currentMember.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs opacity-75 uppercase tracking-wide">Member ID</p>
                      <p className="font-mono font-semibold">
                        {showSensitiveInfo ? currentMember.memberId : '•••••••••'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75 uppercase tracking-wide">Group</p>
                      <p className="font-mono font-semibold">
                        {showSensitiveInfo ? currentMember.groupNumber : '•••••••••'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs opacity-75 uppercase tracking-wide">Plano</p>
                    <p className="font-semibold">{plan.name}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-3 right-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Controles de Visibilidade */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                  className="p-2 bg-black/20 backdrop-blur-sm rounded-lg text-white hover:bg-black/30 transition-colors"
                  title={showSensitiveInfo ? 'Ocultar informações' : 'Mostrar informações'}
                >
                  {showSensitiveInfo ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Ações da Carteirinha */}
              <div className="max-w-md w-full mx-auto">
                <div className="flex gap-3 mt-3 w-full">
                  <button className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${plan.cardBtn} text-white`}
                    onClick={() => window.open(plan.pdfUrl, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-white">Baixar PDF</span>
                  </button>
                  <button className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 border rounded-lg text-sm font-semibold transition-colors ${plan.cardBtnOutline}`}>
                    <Share2 className="h-4 w-4" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informações Detalhadas */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-vfb-text-primary">Informações de Cobertura</h3>
          
          {/* Toggle de planos */}
          <div className="flex gap-2 mb-4">
            {currentMember.plans.map((plan, idx) => (
              <button
                key={plan.carrier}
                onClick={() => setSelectedPlanIdx(idx)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                  selectedPlanIdx === idx
                    ? plan.cardBtn + ' text-white border-transparent shadow'
                    : 'bg-white border-vfb-gray-200 text-vfb-text-primary hover:bg-vfb-gray-50'
                }`}
              >
                {plan.carrier}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-vfb-gray-200 p-6 space-y-6">
            {/* Médico de Família */}
            <div>
              <h4 className="font-semibold text-vfb-text-primary mb-3">Médico de Família</h4>
              <div className="bg-vfb-gray-50 rounded-lg p-4">
                <p className="font-medium text-vfb-text-primary">{selectedPlan.coverage.primary}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleCopy(selectedPlan.coverage.primaryPhone, 'phone')}
                    className="flex items-center text-sm text-vfb-blue-600 hover:text-vfb-blue-700"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    {selectedPlan.coverage.primaryPhone}
                    {copiedField === 'phone' ? (
                      <CheckCircle className="h-4 w-4 ml-1 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 ml-1" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Copays */}
            <div>
              <h4 className="font-semibold text-vfb-text-primary mb-3">Copagamentos</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-vfb-text-secondary">Consulta (Clínico Geral):</span>
                  <span className="font-medium text-vfb-text-primary">{selectedPlan.coverage.primaryCare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vfb-text-secondary">Especialista:</span>
                  <span className="font-medium text-vfb-text-primary">{selectedPlan.coverage.specialist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vfb-text-secondary">Pronto-Socorro:</span>
                  <span className="font-medium text-vfb-text-primary">{selectedPlan.coverage.emergencyRoom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vfb-text-secondary">Urgência:</span>
                  <span className="font-medium text-vfb-text-primary">{selectedPlan.coverage.urgentCare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vfb-text-secondary">Medicamentos:</span>
                  <span className="font-medium text-vfb-text-primary">{selectedPlan.coverage.prescription}</span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div>
              <h4 className="font-semibold text-vfb-text-primary mb-3">Verificação Digital</h4>
              <div className="flex items-center justify-center bg-white border-2 border-vfb-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-vfb-text-tertiary">
                    QR Code de Verificação
                  </p>
                  <button
                    onClick={() => handleCopy(currentMember.qrCode, 'qr')}
                    className="mt-2 text-sm text-vfb-blue-600 hover:text-vfb-blue-700 flex items-center mx-auto"
                  >
                    {copiedField === 'qr' ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruções de Uso */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Como Usar sua Carteirinha Digital</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-vfb-blue-600 text-white rounded-full flex items-center justify-center text-lg font-semibold mx-auto mb-3">
              1
            </div>
            <h4 className="font-medium text-vfb-text-primary mb-2">Apresente a Carteirinha</h4>
            <p className="text-sm text-vfb-text-secondary">
              Mostre a carteirinha digital ou o QR Code no médico ou farmácia
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-vfb-blue-600 text-white rounded-full flex items-center justify-center text-lg font-semibold mx-auto mb-3">
              2
            </div>
            <h4 className="font-medium text-vfb-text-primary mb-2">Verificação Instantânea</h4>
            <p className="text-sm text-vfb-text-secondary">
              Sua cobertura será verificada automaticamente em tempo real
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-vfb-blue-600 text-white rounded-full flex items-center justify-center text-lg font-semibold mx-auto mb-3">
              3
            </div>
            <h4 className="font-medium text-vfb-text-primary mb-2">Atendimento Direto</h4>
            <p className="text-sm text-vfb-text-secondary">
              Receba o atendimento sem complicações ou papelada extra
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Lembre-se</p>
              <p className="text-sm text-yellow-700">
                Sempre leve um documento de identidade junto com sua carteirinha digital para validação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 