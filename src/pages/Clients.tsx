import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { mockClients, Client } from '@/data/mockData'

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    active: 'bg-vfb-blue-50 text-vfb-blue-700 border-vfb-blue-200',
    inactive: 'bg-vfb-gray-50 text-vfb-gray-400 border-vfb-gray-200',
    pending: 'bg-vfb-cyan-50 text-vfb-cyan-700 border-vfb-cyan-200'
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border transition-colors ${styles[status as keyof typeof styles]}`}
      style={{ letterSpacing: 0.2 }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'premium'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [loading, setLoading] = useState(false)

  // Filter and sort clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = mockClients.filter(client => {
      const matchesSearch = 
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    // Sort clients
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number
      
      switch (sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`
          bValue = `${b.firstName} ${b.lastName}`
          break
        case 'joinDate':
          aValue = new Date(a.joinDate).getTime()
          bValue = new Date(b.joinDate).getTime()
          break
        case 'premium':
          aValue = a.monthlyPremium
          bValue = b.monthlyPremium
          break
        default:
          aValue = a.firstName
          bValue = b.firstName
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, statusFilter, sortBy, sortOrder])

  const handleSort = (field: 'name' | 'joinDate' | 'premium') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  // Skeleton loader for loading state
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-vfb-lg border border-vfb-gray-100 p-6 animate-pulse flex flex-col gap-4 min-h-[220px]">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-vfb-gray-100 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-vfb-gray-100 rounded w-2/3" />
          <div className="h-3 bg-vfb-gray-100 rounded w-1/3" />
        </div>
      </div>
      <div className="h-3 bg-vfb-gray-100 rounded w-1/2" />
      <div className="h-3 bg-vfb-gray-100 rounded w-1/4" />
      <div className="flex gap-2 mt-2">
        <div className="h-8 w-20 bg-vfb-gray-100 rounded" />
        <div className="h-8 w-20 bg-vfb-gray-100 rounded" />
      </div>
    </div>
  )

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-4xl font-extrabold text-vfb-blue-900 tracking-tight leading-tight mb-1">Clientes</h1>
          <p className="text-lg text-vfb-text-secondary font-medium">Gestão completa dos clientes e apólices do portal</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="outline-primary" size="sm" className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar
          </Button>
          <Button variant="primary" size="sm" className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-vfb-lg border border-vfb-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-vfb-text-tertiary" />
            <input
              type="text"
              placeholder="Buscar cliente por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-vfb-gray-300 bg-vfb-bg-card text-base focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500 transition-all placeholder:text-vfb-text-tertiary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-vfb-gray-300 bg-vfb-bg-card text-base focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500 transition-all"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="pending">Pendente</option>
            <option value="inactive">Inativo</option>
          </select>
          <Button variant="outline-primary" size="sm" className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="text-sm text-vfb-text-tertiary font-medium">Ordenar por:</span>
          <button
            onClick={() => handleSort('name')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${sortBy === 'name' ? 'bg-vfb-blue-100 text-vfb-blue-700' : 'hover:bg-vfb-gray-100 text-vfb-text-secondary'}`}
          >
            Nome {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('joinDate')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${sortBy === 'joinDate' ? 'bg-vfb-blue-100 text-vfb-blue-700' : 'hover:bg-vfb-gray-100 text-vfb-text-secondary'}`}
          >
            Data de Entrada {sortBy === 'joinDate' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('premium')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${sortBy === 'premium' ? 'bg-vfb-blue-100 text-vfb-blue-700' : 'hover:bg-vfb-gray-100 text-vfb-text-secondary'}`}
          >
            Prêmio {sortBy === 'premium' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-vfb-text-tertiary mt-2">
        <span>
          Exibindo <b>{filteredAndSortedClients.length}</b> de <b>{mockClients.length}</b> clientes
        </span>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredAndSortedClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-vfb-lg border border-vfb-gray-100 overflow-hidden group transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col min-h-[260px]"
            >
              <div className="p-7 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-4">
                  {client.avatar ? (
                    <img
                      src={client.avatar}
                      alt={`${client.firstName} ${client.lastName}`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-vfb-cyan-100 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-vfb-gray-100 flex items-center justify-center border-2 border-vfb-cyan-50">
                      <User className="h-7 w-7 text-vfb-cyan-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-extrabold text-vfb-blue-900 truncate">
                        {client.firstName} {client.lastName}
                      </span>
                      <StatusBadge status={client.status} />
                    </div>
                    <div className="flex items-center gap-3 text-vfb-text-tertiary text-sm font-medium">
                      <Mail className="h-4 w-4 mr-1 text-vfb-cyan-600" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-vfb-text-secondary text-sm font-medium">
                  <Phone className="h-4 w-4 text-vfb-blue-600" />
                  <span>{client.phone}</span>
                  <MapPin className="h-4 w-4 text-vfb-cyan-600 ml-4" />
                  <span>{client.address.city}</span>
                </div>
                <div className="flex items-center gap-4 text-vfb-text-secondary text-sm font-medium">
                  <Calendar className="h-4 w-4 text-vfb-gray-400" />
                  <span>Entrou em {new Date(client.joinDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex gap-6 mt-2">
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-extrabold text-vfb-blue-700 leading-tight">
                      {client.totalPolicies}
                    </span>
                    <span className="text-xs text-vfb-text-tertiary font-medium">Apólices</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-extrabold text-vfb-cyan-700 leading-tight">
                      {client.monthlyPremium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </span>
                    <span className="text-xs text-vfb-text-tertiary font-medium">Prêmio Mensal</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-7 py-4 border-t border-vfb-gray-100 bg-vfb-bg-card">
                <div className="flex gap-2">
                  <Link
                    to={`/clients/${client.id}`}
                    className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-vfb-blue-700 hover:bg-vfb-blue-50 transition-colors gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Ver
                  </Link>
                  <Link
                    to={`/clients/${client.id}/edit`}
                    className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-vfb-cyan-700 hover:bg-vfb-cyan-50 transition-colors gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Link>
                </div>
                <button
                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-vfb-red-700 hover:bg-vfb-red-50 transition-colors gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Clients 