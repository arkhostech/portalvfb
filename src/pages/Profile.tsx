import { useState } from 'react'
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Shield,
  Key,
  Bell,
  Globe,
  Camera,
  Edit,
  Save,
  X,
  Check,
  AlertTriangle,
  Lock,
  Smartphone,
  Calendar,
  CreditCard,
  Settings,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Informações pessoais
    firstName: 'João',
    lastName: 'Santos',
    email: 'joao.santos@vfbinsurance.com',
    phone: '+1 (305) 555-0123',
    mobile: '+1 (305) 555-0456',
    title: 'Administrador Geral',
    department: 'Administração',
    
    // Endereço
    address: '1200 Brickell Avenue',
    city: 'Miami',
    state: 'FL',
    zipCode: '33131',
    country: 'Estados Unidos',
    
    // Informações da empresa
    companyName: 'VFB Insurance Services',
    companyPhone: '+1 (305) 555-0100',
    companyEmail: 'contact@vfbinsurance.com',
    licenseNumber: 'FL-INS-2024-001',
    
    // Configurações
    language: 'pt-BR',
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'DD/MM/YYYY',
    
    // Notificações
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    
    // Segurança
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: 30
  })

  const tabs = [
    { id: 'personal', name: 'Informações Pessoais', icon: User },
    { id: 'company', name: 'Empresa', icon: Building },
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'preferences', name: 'Preferências', icon: Settings }
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Aqui implementaria a lógica de salvamento
    setIsEditing(false)
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-vfb-blue-100 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-vfb-blue-600" />
          </div>
          <button className="absolute bottom-0 right-0 p-1 bg-vfb-blue-500 text-white rounded-full hover:bg-vfb-blue-600">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-vfb-text-primary">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="text-vfb-text-secondary">{formData.title}</p>
          <p className="text-sm text-vfb-text-tertiary">{formData.department}</p>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Nome
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Sobrenome
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Telefone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Celular
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Cargo
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            disabled={!isEditing}
            className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="border-t border-vfb-gray-200 pt-6">
        <h4 className="text-lg font-medium text-vfb-text-primary mb-4">Endereço</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Endereço
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Cidade
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!isEditing}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Estado
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              disabled={!isEditing}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            >
              <option value="FL">Florida</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Nome da Empresa
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Licença de Seguros
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="text"
              value={formData.licenseNumber}
              disabled
              className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg bg-vfb-gray-50 text-vfb-text-tertiary"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Telefone da Empresa
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="tel"
              value={formData.companyPhone}
              onChange={(e) => handleInputChange('companyPhone', e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
            Email da Empresa
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="email"
              value={formData.companyEmail}
              onChange={(e) => handleInputChange('companyEmail', e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
        </div>
      </div>
      
      {/* Company Statistics */}
      <div className="border-t border-vfb-gray-200 pt-6">
        <h4 className="text-lg font-medium text-vfb-text-primary mb-4">Estatísticas da Empresa</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-vfb-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-vfb-text-primary">284</div>
            <div className="text-sm text-vfb-text-tertiary">Apólices Ativas</div>
          </div>
          <div className="bg-vfb-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-vfb-text-primary">$127.4K</div>
            <div className="text-sm text-vfb-text-tertiary">Receita Mensal</div>
          </div>
          <div className="bg-vfb-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-vfb-text-primary">94.2%</div>
            <div className="text-sm text-vfb-text-tertiary">Satisfação</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-vfb-text-primary mb-4">Alterar Senha</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Senha Atual
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                placeholder="Digite sua senha atual"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-vfb-text-tertiary hover:text-vfb-text-secondary"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Nova Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <input
                type="password"
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                placeholder="Digite sua nova senha"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <input
                type="password"
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
                placeholder="Confirme sua nova senha"
              />
            </div>
          </div>
          
          <Button variant="primary">
            Alterar Senha
          </Button>
        </div>
      </div>

      {/* Two Factor Authentication */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-medium text-vfb-text-primary">Autenticação de Dois Fatores</h4>
            <p className="text-sm text-vfb-text-tertiary">
              Adicione uma camada extra de segurança à sua conta
            </p>
          </div>
          <div className="flex items-center">
            {formData.twoFactorEnabled ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Check className="w-4 h-4 mr-1" />
                Ativado
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <X className="w-4 h-4 mr-1" />
                Desativado
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-vfb-gray-50 rounded-lg">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-vfb-text-tertiary mr-3" />
              <div>
                <div className="font-medium text-vfb-text-primary">Aplicativo Autenticador</div>
                <div className="text-sm text-vfb-text-tertiary">Google Authenticator ou similar</div>
              </div>
            </div>
            <Button variant={formData.twoFactorEnabled ? "outline-destructive" : "outline-primary"} size="sm">
              {formData.twoFactorEnabled ? "Desativar" : "Configurar"}
            </Button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-vfb-text-primary mb-4">Configurações de Segurança</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Alertas de Login</div>
              <div className="text-sm text-vfb-text-tertiary">
                Receber notificação quando alguém fizer login na sua conta
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.loginAlerts}
                onChange={(e) => handleInputChange('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Timeout de Sessão</div>
              <div className="text-sm text-vfb-text-tertiary">
                Deslogar automaticamente após inatividade
              </div>
            </div>
            <select
              value={formData.sessionTimeout}
              onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
              className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={60}>1 hora</option>
              <option value={120}>2 horas</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-vfb-text-primary mb-4">Preferências de Notificação</h4>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Notificações por Email</div>
              <div className="text-sm text-vfb-text-tertiary">
                Receber notificações importantes por email
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Notificações SMS</div>
              <div className="text-sm text-vfb-text-tertiary">
                Receber alertas urgentes por SMS
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.smsNotifications}
                onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Notificações Push</div>
              <div className="text-sm text-vfb-text-tertiary">
                Receber notificações no navegador
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.pushNotifications}
                onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Emails de Marketing</div>
              <div className="text-sm text-vfb-text-tertiary">
                Receber newsletters e ofertas especiais
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.marketingEmails}
                onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-vfb-text-primary mb-4">Preferências do Sistema</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Idioma
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (United States)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Fuso Horário
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Moeda
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="USD">USD - Dólar Americano</option>
              <option value="BRL">BRL - Real Brasileiro</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Formato de Data
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <select
                value={formData.dateFormat}
                onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Export */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-vfb-text-primary mb-4">Dados e Privacidade</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Exportar Dados</div>
              <div className="text-sm text-vfb-text-tertiary">
                Baixar uma cópia de todos os seus dados
              </div>
            </div>
            <Button variant="outline-primary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Excluir Conta</div>
              <div className="text-sm text-vfb-text-tertiary">
                Remover permanentemente sua conta e dados
              </div>
            </div>
            <Button variant="outline-destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo()
      case 'company':
        return renderCompanyInfo()
      case 'security':
        return renderSecurity()
      case 'notifications':
        return renderNotifications()
      case 'preferences':
        return renderPreferences()
      default:
        return renderPersonalInfo()
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Meu Perfil</h1>
            <p className="text-vfb-blue-100">
              Gerencie suas informações pessoais e configurações da conta
            </p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button 
                  className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button 
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </>
            ) : (
              <Button 
                className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg overflow-hidden">
        <div className="border-b border-vfb-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-vfb-blue-500 text-vfb-blue-600'
                    : 'border-transparent text-vfb-text-tertiary hover:text-vfb-text-secondary hover:border-vfb-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
} 