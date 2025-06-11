import { useState } from 'react'
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Heart,
  Building2,
  Star,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Bell,
  Globe,
  CreditCard,
  FileText,
  Camera,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

  // Dados do usuário
  const userProfile = {
    personal: {
      firstName: 'Carlos',
      lastName: 'Silva',
      email: 'carlos.silva@email.com',
      phone: '(305) 555-0123',
      dateOfBirth: '15/03/1985',
      ssn: '***-**-4567',
      gender: 'Masculino',
      maritalStatus: 'Casado',
      preferredLanguage: 'Português'
    },
    address: {
      street: '1234 Ocean Drive',
      city: 'Miami',
      state: 'Florida',
      zipCode: '33139',
      country: 'Estados Unidos'
    },
    insurance: {
      memberId: 'OSC-FL-2024-001',
      groupNumber: 'VFB-CORP-2024',
      planName: 'Oscar Health PPO Familiar',
      carrier: 'Oscar Health',
      effectiveDate: '01/01/2024',
      renewalDate: '31/12/2024',
      tier: 'Family',
      primaryCarePhysician: 'Dr. Michael Rodriguez'
    },
    emergencyContacts: [
      {
        id: 1,
        name: 'Maria Silva',
        relationship: 'Esposa',
        phone: '(305) 555-0124',
        email: 'maria.silva@email.com',
        isPrimary: true
      },
      {
        id: 2,
        name: 'João Silva',
        relationship: 'Irmão',
        phone: '(305) 555-0125',
        email: 'joao.silva@email.com',
        isPrimary: false
      }
    ],
    dependents: [
      {
        id: 1,
        name: 'Ana Silva',
        relationship: 'Filha',
        dateOfBirth: '22/08/2010',
        memberId: 'OSC-FL-2024-001-01',
        isActive: true
      },
      {
        id: 2,
        name: 'Pedro Silva',
        relationship: 'Filho',
        dateOfBirth: '10/12/2012',
        memberId: 'OSC-FL-2024-001-02',
        isActive: true
      }
    ],
    preferences: {
      notifications: {
        email: true,
        sms: true,
        pushNotifications: true,
        claimUpdates: true,
        paymentReminders: true,
        preventiveCareReminders: true
      },
      privacy: {
        shareDataWithProviders: true,
        allowMarketingCommunications: false,
        dataRetentionPeriod: '7 years'
      }
    }
  }

  const tabs = [
    { id: 'personal', label: 'Informações Pessoais', icon: User },
    { id: 'insurance', label: 'Planos de Saúde', icon: Shield },
    { id: 'dependents', label: 'Dependentes', icon: Heart },
    { id: 'emergency', label: 'Contatos de Emergência', icon: Phone },
    { id: 'preferences', label: 'Preferências', icon: Bell }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 p-1 bg-vfb-cyan-500 rounded-full hover:bg-vfb-cyan-600">
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {userProfile.personal.firstName} {userProfile.personal.lastName}
              </h1>
              <p className="text-vfb-blue-100 mb-1">{userProfile.personal.email}</p>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-100 text-xs rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1 inline" />
                  Perfil Verificado
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-100 text-xs rounded-full">
                  Membro desde 2024
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2 inline" />
                Cancelar
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2 inline" />
                Editar Perfil
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200">
        <div className="border-b border-vfb-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-vfb-blue-500 text-vfb-blue-600'
                      : 'border-transparent text-vfb-text-tertiary hover:text-vfb-text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Informações Pessoais */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-vfb-text-primary">Informações Pessoais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-vfb-text-primary mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={userProfile.personal.firstName}
                    disabled={!isEditing}
                    className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 disabled:bg-vfb-gray-50 disabled:text-vfb-text-tertiary focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-vfb-text-primary mb-2">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    value={userProfile.personal.lastName}
                    disabled={!isEditing}
                    className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 disabled:bg-vfb-gray-50 disabled:text-vfb-text-tertiary focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-vfb-text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userProfile.personal.email}
                    disabled={!isEditing}
                    className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 disabled:bg-vfb-gray-50 disabled:text-vfb-text-tertiary focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-vfb-text-primary mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={userProfile.personal.phone}
                    disabled={!isEditing}
                    className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 disabled:bg-vfb-gray-50 disabled:text-vfb-text-tertiary focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-vfb-text-primary mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="text"
                    value={userProfile.personal.dateOfBirth}
                    disabled={!isEditing}
                    className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 disabled:bg-vfb-gray-50 disabled:text-vfb-text-tertiary focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-vfb-text-primary mb-2">
                    SSN
                  </label>
                  <input
                    type="text"
                    value={userProfile.personal.ssn}
                    disabled={true}
                    className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 bg-vfb-gray-50 text-vfb-text-tertiary"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4">
                  <button className="px-6 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
                    <Save className="h-4 w-4 mr-2 inline" />
                    Salvar Alterações
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-vfb-gray-300 text-vfb-text-primary rounded-lg hover:bg-vfb-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Planos de Saúde */}
          {activeTab === 'insurance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-vfb-text-primary">Planos de Saúde</h3>
                <button className="px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Adicionar Plano
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <InsuranceLogo carrier={userProfile.insurance.carrier} size="lg" />
                    <div>
                      <h4 className="text-lg font-semibold text-purple-800">
                        {userProfile.insurance.planName}
                      </h4>
                      <p className="text-sm text-purple-600">Plano Principal Ativo</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    <CheckCircle className="w-4 h-4 mr-1 inline" />
                    Ativo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-purple-600 mb-1">Member ID</p>
                    <p className="font-mono text-purple-800">{userProfile.insurance.memberId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 mb-1">Group Number</p>
                    <p className="font-mono text-purple-800">{userProfile.insurance.groupNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 mb-1">Tipo de Cobertura</p>
                    <p className="text-purple-800">{userProfile.insurance.tier}</p>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <FileText className="h-4 w-4 mr-2 inline" />
                    Ver Benefícios
                  </button>
                  <button className="px-4 py-2 bg-white border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors">
                    <CreditCard className="h-4 w-4 mr-2 inline" />
                    Ver Carteirinha
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dependentes */}
          {activeTab === 'dependents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-vfb-text-primary">Dependentes</h3>
                <button className="px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Adicionar Dependente
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProfile.dependents.map(dependent => (
                  <div key={dependent.id} className="border border-vfb-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-vfb-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-vfb-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-vfb-text-primary">{dependent.name}</h4>
                          <p className="text-sm text-vfb-text-tertiary">{dependent.relationship}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-vfb-text-tertiary hover:text-vfb-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-vfb-text-tertiary hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-vfb-text-tertiary">Data de Nascimento</p>
                        <p className="text-vfb-text-primary">{dependent.dateOfBirth}</p>
                      </div>
                      <div>
                        <p className="text-sm text-vfb-text-tertiary">Member ID</p>
                        <p className="font-mono text-vfb-text-primary">{dependent.memberId}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          dependent.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {dependent.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                        <button className="text-sm text-vfb-blue-600 hover:text-vfb-blue-700 font-medium">
                          Ver Carteirinha
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contatos de Emergência */}
          {activeTab === 'emergency' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-vfb-text-primary">Contatos de Emergência</h3>
                <button className="px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Adicionar Contato
                </button>
              </div>

              <div className="space-y-4">
                {userProfile.emergencyContacts.map(contact => (
                  <div key={contact.id} className="border border-vfb-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-vfb-gray-100 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-vfb-text-secondary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-vfb-text-primary">{contact.name}</h4>
                            {contact.isPrimary && (
                              <span className="px-2 py-1 bg-vfb-blue-100 text-vfb-blue-800 text-xs rounded-full">
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-vfb-text-tertiary mb-1">{contact.relationship}</p>
                          <div className="flex items-center space-x-4 text-sm text-vfb-text-secondary">
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {contact.phone}
                            </span>
                            <span className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {contact.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-vfb-text-tertiary hover:text-vfb-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-vfb-text-tertiary hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferências */}
          {activeTab === 'preferences' && (
            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-vfb-text-primary">Preferências e Configurações</h3>
              
              {/* Notificações */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-vfb-text-primary">Notificações</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-vfb-text-primary">Notificações por Email</p>
                      <p className="text-sm text-vfb-text-tertiary">Receber notificações importantes por email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={userProfile.preferences.notifications.email} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-vfb-text-primary">Lembretes de Pagamento</p>
                      <p className="text-sm text-vfb-text-tertiary">Receber lembretes de vencimento de mensalidades</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={userProfile.preferences.notifications.paymentReminders} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
                  <Save className="h-4 w-4 mr-2 inline" />
                  Salvar Preferências
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Segurança da Conta */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <h3 className="text-lg font-semibold text-vfb-text-primary mb-6">Segurança da Conta</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-vfb-text-primary mb-2">
                Senha Atual
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value="••••••••••••"
                  className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-vfb-text-tertiary hover:text-vfb-text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
              Alterar Senha
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Autenticação de Dois Fatores</p>
                  <p className="text-sm text-green-600">Ativa via SMS</p>
                </div>
              </div>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                Configurar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Sessões Ativas</p>
                  <p className="text-sm text-yellow-600">3 dispositivos conectados</p>
                </div>
              </div>
              <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                Gerenciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 