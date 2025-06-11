import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  Calculator,
  Eye, 
  Edit, 
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { mockQuotes, mockClients, getClientById } from '@/data/mockData'

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: 'bg-warning-50 text-warning-600 border-warning-200',
    sent: 'bg-vfb-cyan-50 text-vfb-cyan-600 border-vfb-cyan-200',
    accepted: 'bg-success-50 text-success-600 border-success-200',
    declined: 'bg-danger-50 text-danger-600 border-danger-200',
    expired: 'bg-vfb-gray-50 text-vfb-gray-600 border-vfb-gray-200'
  }
  
  const icons = {
    pending: Clock,
    sent: Send,
    accepted: CheckCircle,
    declined: XCircle,
    expired: AlertCircle
  }
  
  const Icon = icons[status as keyof typeof icons]
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const Quotes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Filter quotes
  const filteredQuotes = useMemo(() => {
    return mockQuotes.filter(quote => {
      const client = getClientById(quote.clientId)
      const matchesSearch = client ? 
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.plan.toLowerCase().includes(searchTerm.toLowerCase())
        : false
      
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter
      const matchesType = typeFilter === 'all' || quote.type === typeFilter
      
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, statusFilter, typeFilter])

  const totalQuoteValue = filteredQuotes.reduce((sum, quote) => sum + quote.monthlyPremium, 0)
  const statusCounts = mockQuotes.reduce((acc, quote) => {
    acc[quote.status] = (acc[quote.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-vfb-text-primary">Quotes</h1>
          <p className="text-vfb-text-secondary mt-1">
            Manage insurance quotes and proposals for your clients
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Quote
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Quotes</p>
              <p className="text-3xl font-bold text-vfb-text-primary">{mockQuotes.length}</p>
            </div>
            <Calculator className="h-8 w-8 text-vfb-blue-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Pending</p>
              <p className="text-3xl font-bold text-warning-600">{statusCounts.pending || 0}</p>
            </div>
            <Clock className="h-8 w-8 text-warning-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Accepted</p>
              <p className="text-3xl font-bold text-success-600">{statusCounts.accepted || 0}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Value</p>
              <p className="text-3xl font-bold text-vfb-cyan-600">${totalQuoteValue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-vfb-cyan-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vfb-text-tertiary" />
              <input
                type="text"
                placeholder="Search quotes by client, provider, or plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500"
            >
              <option value="all">All Types</option>
              <option value="health">Health</option>
              <option value="dental">Dental</option>
              <option value="vision">Vision</option>
              <option value="life">Life</option>
            </select>

            <Button variant="outline-primary" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-vfb-text-secondary">
          Showing {filteredQuotes.length} of {mockQuotes.length} quotes
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-vfb-bg-card rounded-lg shadow-vfb border border-vfb-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-vfb-gray-200">
            <thead className="bg-vfb-bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Type & Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-vfb-bg-card divide-y divide-vfb-gray-200">
              {filteredQuotes.map((quote) => {
                const client = getClientById(quote.clientId)
                return (
                  <tr key={quote.id} className="hover:bg-vfb-bg-secondary transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-vfb-text-primary">
                          {client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}
                        </p>
                        <p className="text-sm text-vfb-text-tertiary">
                          {client?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-vfb-text-primary">{quote.plan}</p>
                        <p className="text-sm text-vfb-text-tertiary capitalize">{quote.type} Insurance</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-vfb-text-primary">{quote.provider}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-vfb-text-primary">
                        ${quote.monthlyPremium.toLocaleString()}/mo
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-vfb-text-primary">
                          Created: {new Date(quote.createdDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-vfb-text-tertiary">
                          Expires: {new Date(quote.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/quotes/${quote.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {quote.status === 'pending' && (
                          <Button variant="primary" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <Calculator className="h-12 w-12 text-vfb-text-tertiary mx-auto mb-4" />
          <p className="text-lg text-vfb-text-secondary">No quotes found</p>
          <p className="text-vfb-text-tertiary">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default Quotes 