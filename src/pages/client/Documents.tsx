import { useState } from 'react'
import { 
  FileText,
  Download,
  Search,
  Calendar,
  Filter,
  Eye,
  Share2,
  Archive,
  CheckCircle,
  Clock,
  AlertTriangle,
  FolderOpen,
  Heart,
  Shield,
  Building2,
  Star,
  CreditCard,
  Receipt,
  FileCheck,
  BookOpen,
  Printer,
  Mail
} from 'lucide-react'

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

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

  // Categorias de documentos
  const categories = [
    { id: 'all', name: 'Todos os Documentos', icon: FolderOpen, count: 24 },
    { id: 'insurance-cards', name: 'Carteirinhas', icon: CreditCard, count: 4 },
    { id: 'claims', name: 'Reembolsos', icon: Receipt, count: 8 },
    { id: 'policies', name: 'Apólices', icon: Shield, count: 3 },
    { id: 'benefits', name: 'Benefícios', icon: Heart, count: 5 },
    { id: 'tax', name: 'Fiscais', icon: FileCheck, count: 4 }
  ]

  // Lista de documentos
  const documents = [
    {
      id: 1,
      title: 'Carteirinha Oscar Health - Carlos Silva',
      category: 'insurance-cards',
      type: 'PDF',
      size: '1.2 MB',
      date: '2024-01-15',
      status: 'active',
      description: 'Carteirinha digital do plano Oscar Health PPO Familiar',
      carrier: 'Oscar Health',
      downloadUrl: '/documents/carteirinha-carlos-silva.pdf',
      pages: 1,
      isProtected: false,
      tags: ['carteirinha', 'oscar', 'ativo']
    },
    {
      id: 2,
      title: 'Reembolso #REI-2024-0156',
      category: 'claims',
      type: 'PDF',
      size: '856 KB',
      date: '2024-03-10',
      status: 'processed',
      description: 'Comprovante de reembolso - Consulta Dr. Rodriguez',
      carrier: 'Oscar Health',
      downloadUrl: '/documents/reembolso-rei-2024-0156.pdf',
      pages: 3,
      isProtected: false,
      tags: ['reembolso', 'processado', 'consulta'],
      amount: '$125.00'
    },
    {
      id: 3,
      title: 'Certificado de Cobertura 2024',
      category: 'policies',
      type: 'PDF',
      size: '2.8 MB',
      date: '2024-01-01',
      status: 'active',
      description: 'Certificado detalhado de cobertura do plano familiar',
      carrier: 'Oscar Health',
      downloadUrl: '/documents/certificado-cobertura-2024.pdf',
      pages: 24,
      isProtected: true,
      tags: ['certificado', 'cobertura', '2024']
    },
    {
      id: 4,
      title: 'Explicação de Benefícios - Janeiro 2024',
      category: 'benefits',
      type: 'PDF',
      size: '445 KB',
      date: '2024-02-01',
      status: 'active',
      description: 'Resumo mensal dos benefícios utilizados',
      carrier: 'Oscar Health',
      downloadUrl: '/documents/eob-janeiro-2024.pdf',
      pages: 2,
      isProtected: false,
      tags: ['eob', 'benefícios', 'janeiro']
    },
    {
      id: 5,
      title: 'Comprovante Anual de Pagamentos',
      category: 'tax',
      type: 'PDF',
      size: '320 KB',
      date: '2024-01-31',
      status: 'active',
      description: 'Comprovante para declaração de imposto de renda',
      carrier: 'Oscar Health',
      downloadUrl: '/documents/comprovante-pagamentos-2023.pdf',
      pages: 1,
      isProtected: false,
      tags: ['fiscal', 'pagamentos', '2023']
    },
    {
      id: 6,
      title: 'Reembolso #REI-2024-0142',
      category: 'claims',
      type: 'PDF',
      size: '1.1 MB',
      date: '2024-02-28',
      status: 'pending',
      description: 'Reembolso em análise - Exames laboratoriais',
      carrier: 'Oscar Health',
      downloadUrl: null,
      pages: 2,
      isProtected: false,
      tags: ['reembolso', 'pendente', 'exames'],
      amount: '$240.00'
    },
    {
      id: 7,
      title: 'Carteirinha Oscar Health - Maria Silva',
      category: 'insurance-cards',
      type: 'PDF',
      size: '1.2 MB',
      date: '2024-01-15',
      status: 'active',
      description: 'Carteirinha digital do cônjuge',
      carrier: 'Oscar Health',
      downloadUrl: '/documents/carteirinha-maria-silva.pdf',
      pages: 1,
      isProtected: false,
      tags: ['carteirinha', 'oscar', 'cônjuge']
    },
    {
      id: 8,
      title: 'Resumo de Benefícios',
      category: 'benefits',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-01-01',
      status: 'active',
      description: 'Resumo completo dos benefícios do plano',
      carrier: 'Oscar Health',
      downloadUrl: '/documents/resumo-beneficios-2024.pdf',
      pages: 8,
      isProtected: false,
      tags: ['benefícios', 'resumo', 'plano']
    }
  ]

  // Filtrar documentos
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus
    const matchesYear = selectedYear === 'all' || doc.date.startsWith(selectedYear)
    
    return matchesSearch && matchesCategory && matchesStatus && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'processed':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle
      case 'processed':
        return CheckCircle
      case 'pending':
        return Clock
      case 'expired':
        return AlertTriangle
      default:
        return FileText
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'processed':
        return 'Processado'
      case 'pending':
        return 'Pendente'
      case 'expired':
        return 'Expirado'
      default:
        return status
    }
  }

  const handleDownload = (document: typeof documents[0]) => {
    if (document.downloadUrl) {
      // Simulação de download
      const link = window.document.createElement('a')
      link.href = document.downloadUrl
      link.download = document.title
      link.click()
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Meus Documentos</h1>
        <p className="text-vfb-blue-100">
          Acesse, baixe e gerencie todos os seus documentos de saúde em um só lugar
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Total de Documentos</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{documents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Ativos</p>
              <p className="text-2xl font-bold text-vfb-text-primary">
                {documents.filter(d => d.status === 'active').length}
              </p>
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
              <p className="text-2xl font-bold text-vfb-text-primary">
                {documents.filter(d => d.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-cyan-100 rounded-lg">
              <Download className="h-6 w-6 text-vfb-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Downloads Este Mês</p>
              <p className="text-2xl font-bold text-vfb-text-primary">47</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                  {category.name}
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
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="processed">Processado</option>
              <option value="pending">Pendente</option>
              <option value="expired">Expirado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Ano
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Anos</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedStatus('all')
                setSelectedYear('2024')
              }}
              className="w-full px-4 py-2 border border-vfb-gray-300 text-vfb-text-primary rounded-lg hover:bg-vfb-gray-50 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-vfb-text-secondary">
            {filteredDocuments.length} documentos encontrados
          </p>
        </div>
      </div>

      {/* Categories Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
          <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Categorias</h3>
          
          <div className="space-y-2">
            {categories.map(category => {
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
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-xs bg-vfb-gray-200 text-vfb-text-tertiary px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredDocuments.map(document => {
            const StatusIcon = getStatusIcon(document.status)
            return (
              <div key={document.id} className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-vfb-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-vfb-text-secondary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-vfb-text-primary truncate">{document.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1 inline" />
                          {getStatusLabel(document.status)}
                        </span>
                        {document.isProtected && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            Protegido
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-vfb-text-secondary mb-3">{document.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-vfb-text-tertiary">Operadora</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <InsuranceLogo carrier={document.carrier} size="sm" />
                            <span className="text-sm text-vfb-text-primary">{document.carrier}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-vfb-text-tertiary">Data</p>
                          <p className="text-sm text-vfb-text-primary">
                            {new Date(document.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-vfb-text-tertiary">Tamanho</p>
                          <p className="text-sm text-vfb-text-primary">{document.size}</p>
                        </div>
                        <div>
                          <p className="text-xs text-vfb-text-tertiary">Páginas</p>
                          <p className="text-sm text-vfb-text-primary">{document.pages}</p>
                        </div>
                      </div>

                      {document.amount && (
                        <div className="mb-3">
                          <p className="text-xs text-vfb-text-tertiary">Valor</p>
                          <p className="text-lg font-semibold text-green-600">{document.amount}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {document.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-vfb-blue-50 text-vfb-blue-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {document.downloadUrl ? (
                      <>
                        <button
                          onClick={() => handleDownload(document)}
                          className="px-3 py-1 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors text-sm"
                        >
                          <Download className="h-4 w-4 mr-1 inline" />
                          Baixar
                        </button>
                        <button className="px-3 py-1 border border-vfb-gray-300 text-vfb-text-primary rounded-lg hover:bg-vfb-gray-50 transition-colors text-sm">
                          <Eye className="h-4 w-4 mr-1 inline" />
                          Visualizar
                        </button>
                        <button className="px-3 py-1 border border-vfb-gray-300 text-vfb-text-primary rounded-lg hover:bg-vfb-gray-50 transition-colors text-sm">
                          <Share2 className="h-4 w-4 mr-1 inline" />
                          Compartilhar
                        </button>
                      </>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm">
                        <Clock className="h-4 w-4 mr-1 inline" />
                        Processando
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* No Results */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-12 text-center">
          <Archive className="h-16 w-16 text-vfb-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-vfb-text-primary mb-2">
            Nenhum documento encontrado
          </h3>
          <p className="text-vfb-text-secondary mb-6">
            Tente ajustar seus filtros de busca para encontrar mais documentos.
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Ações Rápidas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <Printer className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-vfb-text-primary">Imprimir Todos</p>
              <p className="text-sm text-vfb-text-secondary">Imprimir documentos selecionados</p>
            </div>
          </button>

          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <Mail className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-vfb-text-primary">Enviar por Email</p>
              <p className="text-sm text-vfb-text-secondary">Enviar documentos por email</p>
            </div>
          </button>

          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <Archive className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-vfb-text-primary">Arquivar</p>
              <p className="text-sm text-vfb-text-secondary">Mover para arquivo</p>
            </div>
          </button>

          <button className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors">
            <BookOpen className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-vfb-text-primary">Solicitar Documento</p>
              <p className="text-sm text-vfb-text-secondary">Solicitar novo documento</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
} 