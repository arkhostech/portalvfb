import { useState } from 'react'
import { 
  Settings as SettingsIcon,
  Database,
  Shield,
  Bell,
  Globe,
  Zap,
  Mail,
  Cloud,
  Users,
  Lock,
  Key,
  Webhook,
  Code,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Save,
  Edit,
  Trash2,
  Plus,
  X,
  Building2,
  Calendar,
  CreditCard,
  Phone,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)

  const [systemSettings, setSystemSettings] = useState({
    // Configurações Gerais
    siteName: 'VFB Insurance Portal',
    siteDescription: 'Portal de seguros de saúde para brasileiros na Flórida',
    supportEmail: 'support@vfbinsurance.com',
    timezone: 'America/New_York',
    language: 'pt-BR',
    currency: 'USD',
    
    // Configurações de Email
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'notifications@vfbinsurance.com',
    smtpPassword: '••••••••••••',
    emailFromName: 'VFB Insurance',
    emailFromAddress: 'noreply@vfbinsurance.com',
    
    // Configurações de Segurança
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireTwoFactor: false,
    allowPasswordReset: true,
    maxLoginAttempts: 5,
    loginCooldown: 15,
    
    // Configurações de API
    apiRateLimit: 1000,
    apiTimeout: 30,
    webhookSecret: 'vfb_webhook_secret_2024',
    
    // Configurações de Backup
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    
    // Configurações de Notificação
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    enablePushNotifications: true,
    notificationQueue: 'real-time',
    
    // Configurações de Performance
    cacheEnabled: true,
    cacheExpiry: 3600,
    compressionEnabled: true,
    minifyAssets: true
  })

  const sections = [
    { id: 'general', name: 'Configurações Gerais', icon: SettingsIcon },
    { id: 'email', name: 'Email e SMTP', icon: Mail },
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'api', name: 'API e Webhooks', icon: Code },
    { id: 'integrations', name: 'Integrações', icon: Zap },
    { id: 'backup', name: 'Backup e Recuperação', icon: Database },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'performance', name: 'Performance', icon: Activity }
  ]

  const handleSettingChange = (key: string, value: string | boolean | number) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSection = (section: string) => {
    // Aqui implementaria a lógica de salvamento
    setIsEditing(null)
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-vfb-text-primary">Informações do Sistema</h3>
          <Button 
            variant={isEditing === 'general' ? "primary" : "outline-primary"}
            size="sm"
            onClick={() => isEditing === 'general' ? handleSaveSection('general') : setIsEditing('general')}
          >
            {isEditing === 'general' ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing === 'general' ? 'Salvar' : 'Editar'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Nome do Sistema
            </label>
            <input
              type="text"
              value={systemSettings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
              disabled={isEditing !== 'general'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Email de Suporte
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <input
                type="email"
                value={systemSettings.supportEmail}
                onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                disabled={isEditing !== 'general'}
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Descrição do Sistema
            </label>
            <textarea
              value={systemSettings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              disabled={isEditing !== 'general'}
              rows={3}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Fuso Horário
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <select
                value={systemSettings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                disabled={isEditing !== 'general'}
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Idioma Padrão
            </label>
            <select
              value={systemSettings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              disabled={isEditing !== 'general'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (United States)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-vfb-text-primary mb-6">Status do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <div className="font-medium text-green-800">Database</div>
              <div className="text-sm text-green-600">Conectado</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <div className="font-medium text-green-800">Email Service</div>
              <div className="text-sm text-green-600">Operacional</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <div className="font-medium text-yellow-800">Storage</div>
              <div className="text-sm text-yellow-600">75% utilizado</div>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-vfb-text-primary">Configurações SMTP</h3>
          <Button 
            variant={isEditing === 'email' ? "primary" : "outline-primary"}
            size="sm"
            onClick={() => isEditing === 'email' ? handleSaveSection('email') : setIsEditing('email')}
          >
            {isEditing === 'email' ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing === 'email' ? 'Salvar' : 'Editar'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Servidor SMTP
            </label>
            <input
              type="text"
              value={systemSettings.smtpHost}
              onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
              disabled={isEditing !== 'email'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Porta SMTP
            </label>
            <input
              type="text"
              value={systemSettings.smtpPort}
              onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
              disabled={isEditing !== 'email'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Usuário SMTP
            </label>
            <input
              type="email"
              value={systemSettings.smtpUsername}
              onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
              disabled={isEditing !== 'email'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Senha SMTP
            </label>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={systemSettings.smtpPassword}
                onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
                disabled={isEditing !== 'email'}
                className="w-full p-3 pr-10 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-3 text-vfb-text-tertiary hover:text-vfb-text-secondary"
              >
                {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Nome do Remetente
            </label>
            <input
              type="text"
              value={systemSettings.emailFromName}
              onChange={(e) => handleSettingChange('emailFromName', e.target.value)}
              disabled={isEditing !== 'email'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Email do Remetente
            </label>
            <input
              type="email"
              value={systemSettings.emailFromAddress}
              onChange={(e) => handleSettingChange('emailFromAddress', e.target.value)}
              disabled={isEditing !== 'email'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-vfb-gray-200">
          <Button variant="outline-primary">
            <Mail className="h-4 w-4 mr-2" />
            Testar Configuração de Email
          </Button>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-vfb-text-primary">Configurações de Segurança</h3>
          <Button 
            variant={isEditing === 'security' ? "primary" : "outline-primary"}
            size="sm"
            onClick={() => isEditing === 'security' ? handleSaveSection('security') : setIsEditing('security')}
          >
            {isEditing === 'security' ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing === 'security' ? 'Salvar' : 'Editar'}
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
                Timeout de Sessão (minutos)
              </label>
              <input
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                disabled={isEditing !== 'security'}
                className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
                Tamanho Mínimo da Senha
              </label>
              <input
                type="number"
                value={systemSettings.passwordMinLength}
                onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                disabled={isEditing !== 'security'}
                className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
                Máx. Tentativas de Login
              </label>
              <input
                type="number"
                value={systemSettings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                disabled={isEditing !== 'security'}
                className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
                Cooldown de Login (minutos)
              </label>
              <input
                type="number"
                value={systemSettings.loginCooldown}
                onChange={(e) => handleSettingChange('loginCooldown', parseInt(e.target.value))}
                disabled={isEditing !== 'security'}
                className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-vfb-text-primary">Exigir Autenticação de Dois Fatores</div>
                <div className="text-sm text-vfb-text-tertiary">
                  Forçar todos os usuários a usar 2FA
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemSettings.requireTwoFactor}
                  onChange={(e) => handleSettingChange('requireTwoFactor', e.target.checked)}
                  disabled={isEditing !== 'security'}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-vfb-text-primary">Permitir Reset de Senha</div>
                <div className="text-sm text-vfb-text-tertiary">
                  Usuários podem resetar suas próprias senhas
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemSettings.allowPasswordReset}
                  onChange={(e) => handleSettingChange('allowPasswordReset', e.target.checked)}
                  disabled={isEditing !== 'security'}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAPISettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-vfb-text-primary">Configurações de API</h3>
          <Button 
            variant={isEditing === 'api' ? "primary" : "outline-primary"}
            size="sm"
            onClick={() => isEditing === 'api' ? handleSaveSection('api') : setIsEditing('api')}
          >
            {isEditing === 'api' ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing === 'api' ? 'Salvar' : 'Editar'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Rate Limit (req/min)
            </label>
            <input
              type="number"
              value={systemSettings.apiRateLimit}
              onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
              disabled={isEditing !== 'api'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Timeout (segundos)
            </label>
            <input
              type="number"
              value={systemSettings.apiTimeout}
              onChange={(e) => handleSettingChange('apiTimeout', parseInt(e.target.value))}
              disabled={isEditing !== 'api'}
              className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
              Webhook Secret
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-vfb-text-tertiary" />
              <input
                type="text"
                value={systemSettings.webhookSecret}
                onChange={(e) => handleSettingChange('webhookSecret', e.target.value)}
                disabled={isEditing !== 'api'}
                className="w-full pl-10 p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent disabled:bg-vfb-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-vfb-text-primary mb-4">Documentação da API</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-vfb-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-vfb-text-primary">API Swagger/OpenAPI</div>
              <div className="text-sm text-vfb-text-tertiary">
                Documentação interativa da API
              </div>
            </div>
            <Button variant="outline-primary" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Ver Documentação
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-vfb-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-vfb-text-primary">Logs de API</div>
              <div className="text-sm text-vfb-text-tertiary">
                Monitorar chamadas e erros da API
              </div>
            </div>
            <Button variant="outline-primary" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Ver Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-vfb-text-primary mb-6">Integrações de Terceiros</h3>
        
        <div className="space-y-4">
          {/* Supabase */}
          <div className="flex items-center justify-between p-4 border border-vfb-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-vfb-text-primary">Supabase</div>
                <div className="text-sm text-vfb-text-tertiary">Backend como serviço</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Conectado
              </span>
              <Button variant="ghost" size="sm">
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Oscar Health API */}
          <div className="flex items-center justify-between p-4 border border-vfb-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-vfb-text-primary">Oscar Health API</div>
                <div className="text-sm text-vfb-text-tertiary">Integração com operadora</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </span>
              <Button variant="ghost" size="sm">
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Florida Blue API */}
          <div className="flex items-center justify-between p-4 border border-vfb-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-vfb-text-primary">Florida Blue API</div>
                <div className="text-sm text-vfb-text-tertiary">Integração com operadora</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Configurando
              </span>
              <Button variant="ghost" size="sm">
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Payment Gateway */}
          <div className="flex items-center justify-between p-4 border border-vfb-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-vfb-text-primary">Payment Gateway</div>
                <div className="text-sm text-vfb-text-tertiary">Processamento de pagamentos</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <X className="w-3 h-3 mr-1" />
                Desconectado
              </span>
              <Button variant="outline-primary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Conectar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-vfb-text-primary">Configurações de Backup</h3>
          <Button variant="outline-primary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Backup Manual
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-vfb-text-primary">Backup Automático</div>
              <div className="text-sm text-vfb-text-tertiary">
                Realizar backups automaticamente
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.autoBackup}
                onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vfb-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vfb-blue-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
                Frequência de Backup
              </label>
              <select
                value={systemSettings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
              >
                <option value="hourly">A cada hora</option>
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-vfb-text-secondary mb-2">
                Retenção (dias)
              </label>
              <input
                type="number"
                value={systemSettings.backupRetention}
                onChange={(e) => handleSettingChange('backupRetention', parseInt(e.target.value))}
                className="w-full p-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Backups */}
      <div className="bg-white border border-vfb-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-vfb-text-primary mb-4">Backups Recentes</h3>
        <div className="space-y-3">
          {[
            { date: '24/11/2024 02:00', size: '2.4 GB', status: 'success' },
            { date: '23/11/2024 02:00', size: '2.3 GB', status: 'success' },
            { date: '22/11/2024 02:00', size: '2.2 GB', status: 'success' },
            { date: '21/11/2024 02:00', size: '2.1 GB', status: 'failed' }
          ].map((backup, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-vfb-gray-50 rounded-lg">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-vfb-text-tertiary mr-3" />
                <div>
                  <div className="font-medium text-vfb-text-primary">{backup.date}</div>
                  <div className="text-sm text-vfb-text-tertiary">{backup.size}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  backup.status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {backup.status === 'success' ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <X className="w-3 h-3 mr-1" />
                  )}
                  {backup.status === 'success' ? 'Sucesso' : 'Falha'}
                </span>
                {backup.status === 'success' && (
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings()
      case 'email':
        return renderEmailSettings()
      case 'security':
        return renderSecuritySettings()
      case 'api':
        return renderAPISettings()
      case 'integrations':
        return renderIntegrations()
      case 'backup':
        return renderBackupSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Configurações do Sistema</h1>
            <p className="text-vfb-blue-100">
              Configure e gerencie todas as configurações do sistema VFB Portal
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Recarregar
            </Button>
            <Button className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Exportar Configurações
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white border border-vfb-gray-200 rounded-lg overflow-hidden">
            <nav className="space-y-1 p-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                    activeSection === section.id
                      ? 'bg-vfb-blue-50 text-vfb-blue-700 border-l-4 border-vfb-blue-500'
                      : 'text-vfb-text-secondary hover:bg-vfb-gray-50 hover:text-vfb-text-primary'
                  }`}
                >
                  <section.icon className="h-5 w-5 mr-3" />
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  )
} 