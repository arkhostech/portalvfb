import { useState } from 'react'
import { 
  Search,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Book,
  HeadphonesIcon,
  Users,
  Shield,
  CreditCard,
  Heart,
  Building2,
  Star,
  HelpCircle,
  PlayCircle,
  Globe
} from 'lucide-react'

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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

  // Categorias de ajuda
  const helpCategories = [
    { id: 'all', label: 'Todas as Categorias', icon: HelpCircle, count: 45 },
    { id: 'plans', label: 'Planos e Benefícios', icon: Shield, count: 12 },
    { id: 'claims', label: 'Reembolsos', icon: FileText, count: 8 },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard, count: 6 },
    { id: 'providers', label: 'Médicos e Rede', icon: Users, count: 10 },
    { id: 'account', label: 'Conta e Perfil', icon: Heart, count: 9 }
  ]

  // FAQs por categoria
  const faqs = [
    {
      id: 1,
      category: 'plans',
      question: 'Como posso verificar quais serviços estão cobertos pelo meu plano?',
      answer: 'Você pode verificar a cobertura do seu plano de várias formas: (1) Acessando a seção "Meus Planos de Saúde" no portal, (2) Baixando o certificado de cobertura em "Documentos", (3) Usando a ferramenta de verificação de benefícios, ou (4) Entrando em contato com o atendimento ao cliente.'
    },
    {
      id: 2,
      category: 'plans',
      question: 'Qual é a diferença entre PPO e HMO?',
      answer: 'PPO oferece mais flexibilidade para escolher médicos e não requer referência para especialistas, mas pode ter custos maiores. HMO requer um médico de família que coordena seus cuidados e referências para especialistas, mas geralmente tem custos menores.'
    },
    {
      id: 3,
      category: 'claims',
      question: 'Como solicitar um reembolso?',
      answer: 'Para solicitar um reembolso: (1) Acesse "Meus Reembolsos", (2) Clique em "Novo Reembolso", (3) Preencha as informações do serviço, (4) Anexe os recibos e documentos médicos, (5) Envie a solicitação. O processamento leva entre 5-10 dias úteis.'
    },
    {
      id: 4,
      category: 'payments',
      question: 'Como configurar o débito automático?',
      answer: 'Para configurar débito automático: (1) Vá em "Faturamento e Pagamentos", (2) Clique em "Adicionar Método de Pagamento", (3) Escolha cartão de crédito ou conta bancária, (4) Preencha as informações, (5) Ative o débito automático.'
    },
    {
      id: 5,
      category: 'providers',
      question: 'Como encontrar médicos na minha rede?',
      answer: 'Use o Diretório de Médicos no portal: (1) Acesse "Encontrar Médico", (2) Selecione sua operadora e especialidade, (3) Digite sua localização, (4) Filtre por avaliações e distância.'
    }
  ]

  // Contatos de suporte
  const supportContacts = [
    {
      id: 'phone',
      title: 'Telefone',
      subtitle: 'Fale conosco diretamente',
      details: '1-800-VFB-HELP (1-800-832-4357)',
      hours: 'Segunda a Sexta: 7h às 19h | Sábado: 8h às 16h',
      icon: Phone,
      action: 'Ligar Agora'
    },
    {
      id: 'chat',
      title: 'Chat Online',
      subtitle: 'Suporte instantâneo via chat',
      details: 'Disponível 24/7',
      hours: 'Resposta média: 2 minutos',
      icon: MessageCircle,
      action: 'Iniciar Chat'
    },
    {
      id: 'email',
      title: 'Email',
      subtitle: 'Envie sua dúvida por email',
      details: 'suporte@vfb.com',
      hours: 'Resposta em até 24 horas',
      icon: Mail,
      action: 'Enviar Email'
    }
  ]

  // Filtrar FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Central de Ajuda</h1>
        <p className="text-vfb-blue-100 mb-6">
          Encontre respostas para suas dúvidas e entre em contato conosco quando precisar
        </p>
        
        {/* Barra de Pesquisa */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquise suas dúvidas aqui..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border-0 text-vfb-text-primary placeholder-gray-400 focus:ring-2 focus:ring-vfb-cyan-400"
          />
        </div>
      </div>

      {/* Contatos de Suporte */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <h2 className="text-xl font-semibold text-vfb-text-primary mb-6">Entre em Contato</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportContacts.map(contact => {
            const Icon = contact.icon
            return (
              <div key={contact.id} className="border border-vfb-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-vfb-blue-100 rounded-lg mr-3">
                    <Icon className="h-6 w-6 text-vfb-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-vfb-text-primary">{contact.title}</h3>
                    <p className="text-sm text-vfb-text-tertiary">{contact.subtitle}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="font-medium text-vfb-text-primary">{contact.details}</p>
                  <p className="text-sm text-vfb-text-secondary">{contact.hours}</p>
                </div>
                
                <button className="w-full px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
                  {contact.action}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Categorias e FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar com Categorias */}
        <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
          <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Categorias</h3>
          
          <div className="space-y-2">
            {helpCategories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-vfb-blue-100 text-vfb-blue-700'
                      : 'hover:bg-vfb-gray-50 text-vfb-text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{category.label}</span>
                  </div>
                  <span className="text-xs bg-vfb-gray-200 text-vfb-text-tertiary px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-6">
              Perguntas Frequentes ({filteredFaqs.length})
            </h3>
            
            <div className="space-y-4">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="border border-vfb-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-vfb-gray-50 transition-colors"
                  >
                    <span className="font-medium text-vfb-text-primary pr-4">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="h-5 w-5 text-vfb-text-tertiary flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-vfb-text-tertiary flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <div className="border-t border-vfb-gray-100 pt-4">
                        <p className="text-vfb-text-secondary leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-vfb-text-tertiary mx-auto mb-4" />
                <p className="text-vfb-text-tertiary">Nenhuma pergunta encontrada para sua busca.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}
                  className="mt-2 text-vfb-blue-600 hover:text-vfb-blue-700 font-medium"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Informações por Operadora */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <h2 className="text-xl font-semibold text-vfb-text-primary mb-6">Suporte por Operadora</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center mb-3">
              <InsuranceLogo carrier="Oscar Health" size="md" />
              <h3 className="font-semibold text-purple-800 ml-3">Oscar Health</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-purple-700">
                <Phone className="h-4 w-4 inline mr-2" />
                1-855-672-2788
              </p>
              <p className="text-purple-700">
                <Globe className="h-4 w-4 inline mr-2" />
                oscar.com/help
              </p>
              <p className="text-purple-600">Atendimento 24/7</p>
            </div>
          </div>

          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center mb-3">
              <InsuranceLogo carrier="Florida Blue" size="md" />
              <h3 className="font-semibold text-blue-800 ml-3">Florida Blue</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-blue-700">
                <Phone className="h-4 w-4 inline mr-2" />
                1-800-352-2583
              </p>
              <p className="text-blue-700">
                <Globe className="h-4 w-4 inline mr-2" />
                floridablue.com/help
              </p>
              <p className="text-blue-600">Segunda a Sexta: 7h às 19h</p>
            </div>
          </div>

          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center mb-3">
              <InsuranceLogo carrier="Capital Health Plan" size="md" />
              <h3 className="font-semibold text-green-800 ml-3">Capital Health Plan</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-green-700">
                <Phone className="h-4 w-4 inline mr-2" />
                1-850-523-7441
              </p>
              <p className="text-green-700">
                <Globe className="h-4 w-4 inline mr-2" />
                capitalhealth.com/support
              </p>
              <p className="text-green-600">Segunda a Sexta: 8h às 17h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergências */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-red-200 rounded-lg mr-3">
            <AlertCircle className="h-6 w-6 text-red-700" />
          </div>
          <h3 className="text-lg font-semibold text-red-800">Em Caso de Emergência</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-red-800 mb-2">Emergências Médicas</h4>
            <p className="text-sm text-red-700 mb-3">
              Em situações de risco de vida, vá imediatamente ao pronto-socorro mais próximo ou ligue para 911.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Phone className="h-4 w-4 mr-2 inline" />
              Ligar 911
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-red-800 mb-2">Linha Direta VFB</h4>
            <p className="text-sm text-red-700 mb-3">
              Para emergências relacionadas ao seu plano de saúde ou autorização urgente de procedimentos.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Phone className="h-4 w-4 mr-2 inline" />
              1-800-VFB-URGENT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 