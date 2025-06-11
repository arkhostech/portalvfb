import { useState } from 'react'
import { 
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Upload,
  FolderOpen,
  Calendar,
  User,
  Building2,
  Shield,
  Heart,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Paperclip,
  Mail,
  Archive,
  Trash2,
  Edit
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedClient, setSelectedClient] = useState('all')
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
      'VFB Insurance': { bg: 'bg-vfb-blue-100', color: 'text-vfb-blue-600', icon: Star }
    }
    
    const config = carrierConfig[carrier as keyof typeof carrierConfig] || carrierConfig['VFB Insurance']
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
      'approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Aprovado' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pendente' },
      'revision': { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle, label: 'Revisão' },
      'rejected': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejeitado' },
      'archived': { color: 'bg-gray-100 text-gray-800', icon: Archive, label: 'Arquivado' }
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

  // Tipo de documento badge
  const DocumentTypeBadge = ({ type }: { type: string }) => {
    const configs = {
      'policy': { color: 'bg-blue-100 text-blue-800', label: 'Apólice' },
      'claim': { color: 'bg-green-100 text-green-800', label: 'Reembolso' },
      'invoice': { color: 'bg-purple-100 text-purple-800', label: 'Fatura' },
      'medical': { color: 'bg-red-100 text-red-800', label: 'Médico' },
      'tax': { color: 'bg-orange-100 text-orange-800', label: 'Fiscal' },
      'legal': { color: 'bg-gray-100 text-gray-800', label: 'Jurídico' },
      'correspondence': { color: 'bg-cyan-100 text-cyan-800', label: 'Correspondência' }
    }
    
    const config = configs[type as keyof typeof configs] || configs['policy']
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Dados dos documentos
  const documents = [
    {
      id: 'DOC-2024-001',
      fileName: 'Apólice_Oscar_Health_Carlos_Silva.pdf',
      title: 'Apólice Oscar Health - Carlos Silva',
      type: 'policy',
      category: 'Apólices',
      status: 'approved',
      clientName: 'Carlos Silva',
      clientId: 'CLI-001',
      carrier: 'Oscar Health',
      uploadDate: '15/11/2024',
      lastModified: '15/11/2024',
      fileSize: '2.4 MB',
      pages: 12,
      uploadedBy: 'Admin VFB',
      description: 'Apólice completa do plano Oscar Gold PPO para família Silva',
      tags: ['apólice', 'oscar', 'família', 'ativo'],
      expiryDate: '31/12/2024',
      isConfidential: true
    },
    {
      id: 'DOC-2024-002',
      fileName: 'Reembolso_REI_2024_156_Consulta_Cardiologista.pdf',
      title: 'Reembolso Consulta Cardiologista',
      type: 'claim',
      category: 'Reembolsos',
      status: 'pending',
      clientName: 'Carlos Silva',
      clientId: 'CLI-001',
      carrier: 'Oscar Health',
      uploadDate: '12/11/2024',
      lastModified: '13/11/2024',
      fileSize: '1.2 MB',
      pages: 5,
      uploadedBy: 'Carlos Silva',
      description: 'Documentação para reembolso de consulta cardiológica',
      tags: ['reembolso', 'cardiologia', 'consulta'],
      expiryDate: null,
      isConfidential: true
    },
    {
      id: 'DOC-2024-003',
      fileName: 'Fatura_Novembro_2024_Ana_Rodriguez.pdf',
      title: 'Fatura Novembro 2024 - Ana Rodriguez',
      type: 'invoice',
      category: 'Faturas',
      status: 'approved',
      clientName: 'Ana Rodriguez',
      clientId: 'CLI-002',
      carrier: 'Florida Blue',
      uploadDate: '01/11/2024',
      lastModified: '01/11/2024',
      fileSize: '845 KB',
      pages: 3,
      uploadedBy: 'Sistema Automático',
      description: 'Fatura mensal do plano Florida Blue Silver',
      tags: ['fatura', 'florida-blue', 'mensal'],
      expiryDate: '01/12/2024',
      isConfidential: false
    },
    {
      id: 'DOC-2024-004',
      fileName: 'Exames_Laboratoriais_Roberto_Mendes.pdf',
      title: 'Exames Laboratoriais - Roberto Mendes',
      type: 'medical',
      category: 'Documentos Médicos',
      status: 'revision',
      clientName: 'Roberto Mendes',
      clientId: 'CLI-003',
      carrier: 'Capital Health Plan',
      uploadDate: '08/11/2024',
      lastModified: '10/11/2024',
      fileSize: '3.1 MB',
      pages: 8,
      uploadedBy: 'Roberto Mendes',
      description: 'Resultados de exames laboratoriais para pré-autorização',
      tags: ['exames', 'laboratorio', 'pre-autorizacao'],
      expiryDate: null,
      isConfidential: true
    },
    {
      id: 'DOC-2024-005',
      fileName: 'Contrato_Renovacao_Fernanda_Costa.pdf',
      title: 'Contrato de Renovação - Fernanda Costa',
      type: 'legal',
      category: 'Contratos',
      status: 'pending',
      clientName: 'Fernanda Costa',
      clientId: 'CLI-004',
      carrier: 'Oscar Health',
      uploadDate: '20/11/2024',
      lastModified: '21/11/2024',
      fileSize: '1.8 MB',
      pages: 15,
      uploadedBy: 'Admin VFB',
      description: 'Contrato de renovação anual do plano Oscar Silver EPO',
      tags: ['contrato', 'renovacao', 'oscar'],
      expiryDate: '15/06/2025',
      isConfidential: true
    },
    {
      id: 'DOC-2024-006',
      fileName: 'Documento_Fiscal_2023_Ricardo_Santos.pdf',
      title: 'Documento Fiscal 2023 - Ricardo Santos',
      type: 'tax',
      category: 'Documentos Fiscais',
      status: 'approved',
      clientName: 'Ricardo Santos',
      clientId: 'CLI-005',
      carrier: 'Florida Blue',
      uploadDate: '15/01/2024',
      lastModified: '15/01/2024',
      fileSize: '967 KB',
      pages: 4,
      uploadedBy: 'Departamento Fiscal',
      description: 'Comprovante de pagamentos para declaração de imposto de renda',
      tags: ['fiscal', 'imposto-renda', '2023'],
      expiryDate: null,
      isConfidential: false
    },
    {
      id: 'DOC-2024-007',
      fileName: 'Carta_Negativa_Cobertura_Eduardo_Lima.pdf',
      title: 'Carta de Negativa de Cobertura - Eduardo Lima',
      type: 'correspondence',
      category: 'Correspondências',
      status: 'approved',
      clientName: 'Eduardo Lima',
      clientId: 'CLI-006',
      carrier: 'Capital Health Plan',
      uploadDate: '05/11/2024',
      lastModified: '05/11/2024',
      fileSize: '524 KB',
      pages: 2,
      uploadedBy: 'Capital Health Plan',
      description: 'Notificação oficial de negativa de cobertura para procedimento',
      tags: ['negativa', 'correspondencia', 'capital'],
      expiryDate: null,
      isConfidential: true
    },
    {
      id: 'DOC-2024-008',
      fileName: 'Pre_Autorizacao_Cirurgia_Maria_Silva.pdf',
      title: 'Pré-autorização Cirurgia - Maria Silva',
      type: 'medical',
      category: 'Pré-autorizações',
      status: 'rejected',
      clientName: 'Maria Silva',
      clientId: 'CLI-001',
      carrier: 'Oscar Health',
      uploadDate: '18/11/2024',
      lastModified: '19/11/2024',
      fileSize: '2.2 MB',
      pages: 10,
      uploadedBy: 'Maria Silva',
      description: 'Solicitação de pré-autorização para cirurgia de vesícula',
      tags: ['pre-autorizacao', 'cirurgia', 'vesicula'],
      expiryDate: null,
      isConfidential: true
    }
  ]

  // Estatísticas
  const stats = {
    totalDocuments: documents.length,
    pendingDocuments: documents.filter(d => d.status === 'pending').length,
    approvedDocuments: documents.filter(d => d.status === 'approved').length,
    totalSize: documents.reduce((sum, doc) => {
      const size = parseFloat(doc.fileSize.split(' ')[0])
      const unit = doc.fileSize.split(' ')[1]
      return sum + (unit === 'MB' ? size : size / 1024)
    }, 0)
  }

  // Filtrar documentos
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus
    const matchesClient = selectedClient === 'all' || doc.clientName === selectedClient
    
    return matchesSearch && matchesCategory && matchesStatus && matchesClient
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gestão de Documentos</h1>
            <p className="text-vfb-blue-100">
              Centralize e gerencie todos os documentos dos clientes e operadoras
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-vfb-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Total de Documentos</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{stats.totalDocuments}</p>
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
              <p className="text-2xl font-bold text-vfb-text-primary">{stats.pendingDocuments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Aprovados</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{stats.approvedDocuments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-vfb-cyan-100 rounded-lg">
              <FolderOpen className="h-6 w-6 text-vfb-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-vfb-text-tertiary">Armazenamento</p>
              <p className="text-2xl font-bold text-vfb-text-primary">{stats.totalSize.toFixed(1)} MB</p>
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
              placeholder="Buscar documentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="all">Todas as Categorias</option>
            <option value="Apólices">Apólices</option>
            <option value="Reembolsos">Reembolsos</option>
            <option value="Faturas">Faturas</option>
            <option value="Documentos Médicos">Documentos Médicos</option>
            <option value="Contratos">Contratos</option>
            <option value="Documentos Fiscais">Documentos Fiscais</option>
            <option value="Correspondências">Correspondências</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os Status</option>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="revision">Em Revisão</option>
            <option value="rejected">Rejeitado</option>
            <option value="archived">Arquivado</option>
          </select>

          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os Clientes</option>
            <option value="Carlos Silva">Carlos Silva</option>
            <option value="Ana Rodriguez">Ana Rodriguez</option>
            <option value="Roberto Mendes">Roberto Mendes</option>
            <option value="Fernanda Costa">Fernanda Costa</option>
            <option value="Ricardo Santos">Ricardo Santos</option>
            <option value="Eduardo Lima">Eduardo Lima</option>
          </select>

          <Button variant="outline-primary" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-vfb-gray-200">
            <thead className="bg-vfb-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Cliente / Operadora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Categoria / Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Data / Tamanho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Upload por
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-vfb-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-vfb-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-vfb-gray-100 rounded-lg mr-3">
                        <FileText className="h-5 w-5 text-vfb-text-tertiary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-vfb-text-primary">
                          {doc.title}
                        </div>
                        <div className="text-sm text-vfb-text-tertiary">
                          {doc.fileName}
                        </div>
                        {doc.isConfidential && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                            Confidencial
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <InsuranceLogo carrier={doc.carrier} />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-vfb-text-primary">
                          {doc.clientName}
                        </div>
                        <div className="text-sm text-vfb-text-tertiary">
                          {doc.carrier}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <DocumentTypeBadge type={doc.type} />
                      <div>
                        <StatusBadge status={doc.status} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-vfb-text-secondary">
                    <div>
                      <div>Upload: {doc.uploadDate}</div>
                      <div className="flex items-center mt-1">
                        <span>{doc.fileSize}</span>
                        <span className="mx-1">•</span>
                        <span>{doc.pages} páginas</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-vfb-text-tertiary mr-2" />
                      <span className="text-sm text-vfb-text-secondary">{doc.uploadedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
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
              <h3 className="text-lg font-medium text-vfb-text-primary">Upload em Lote</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Carregar múltiplos documentos de uma vez
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Arquivos Expirando</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Documentos próximos do vencimento
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Lista
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Backup & Arquivo</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Realizar backup dos documentos
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              Backup
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 