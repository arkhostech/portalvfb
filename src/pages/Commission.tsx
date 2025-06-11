import { useState, useMemo } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Eye,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { mockCommissions, mockClients, mockPolicies, getClientById, getPolicyById } from '@/data/mockData'

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    paid: 'bg-success-50 text-success-600 border-success-200',
    pending: 'bg-warning-50 text-warning-600 border-warning-200',
    disputed: 'bg-danger-50 text-danger-600 border-danger-200'
  }
  
  const icons = {
    paid: CheckCircle,
    pending: Clock,
    disputed: AlertCircle
  }
  
  const Icon = icons[status as keyof typeof icons]
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const Commission = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter commissions
  const filteredCommissions = useMemo(() => {
    return mockCommissions.filter(commission => {
      const client = getClientById(commission.clientId)
      const policy = getPolicyById(commission.policyId)
      
      const matchesSearch = client ? 
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy?.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.month.includes(searchTerm)
        : false
      
      const matchesStatus = statusFilter === 'all' || commission.status === statusFilter
      const matchesType = typeFilter === 'all' || commission.type === typeFilter
      
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, statusFilter, typeFilter])

  // Calculate totals
  const totalCommission = filteredCommissions.reduce((sum, comm) => sum + comm.amount, 0)
  const paidCommission = filteredCommissions
    .filter(comm => comm.status === 'paid')
    .reduce((sum, comm) => sum + comm.amount, 0)
  const pendingCommission = filteredCommissions
    .filter(comm => comm.status === 'pending')
    .reduce((sum, comm) => sum + comm.amount, 0)

  const statusCounts = mockCommissions.reduce((acc, commission) => {
    acc[commission.status] = (acc[commission.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Monthly commission data for the last 6 months
  const monthlyData = [
    { month: '2024-01', amount: 14250 },
    { month: '2023-12', amount: 12890 },
    { month: '2023-11', amount: 15420 },
    { month: '2023-10', amount: 13760 },
    { month: '2023-09', amount: 16350 },
    { month: '2023-08', amount: 14670 }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-vfb-text-primary">Commission</h1>
          <p className="text-vfb-text-secondary mt-1">
            Track your earnings and commission payments
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline-primary" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Commission Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Commission</p>
              <p className="text-3xl font-bold text-vfb-text-primary">${totalCommission.toLocaleString()}</p>
              <p className="text-sm text-vfb-text-tertiary mt-1">This period</p>
            </div>
            <DollarSign className="h-8 w-8 text-vfb-blue-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Paid Commission</p>
              <p className="text-3xl font-bold text-success-600">${paidCommission.toLocaleString()}</p>
              <p className="text-sm text-success-600 mt-1">
                {statusCounts.paid || 0} payments
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Pending Commission</p>
              <p className="text-3xl font-bold text-warning-600">${pendingCommission.toLocaleString()}</p>
              <p className="text-sm text-warning-600 mt-1">
                {statusCounts.pending || 0} pending
              </p>
            </div>
            <Clock className="h-8 w-8 text-warning-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Average Rate</p>
              <p className="text-3xl font-bold text-vfb-cyan-600">8.2%</p>
              <p className="text-sm text-vfb-text-tertiary mt-1">Commission rate</p>
            </div>
            <TrendingUp className="h-8 w-8 text-vfb-cyan-600" />
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
        <h3 className="text-lg font-semibold text-vfb-text-primary mb-6">Monthly Commission Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {monthlyData.map((data, index) => (
            <div key={data.month} className="text-center">
              <div className="mb-2">
                <div 
                  className="bg-vfb-blue-100 rounded-lg mx-auto"
                  style={{
                    height: `${(data.amount / 20000) * 100}px`,
                    minHeight: '40px',
                    width: '40px'
                  }}
                ></div>
              </div>
              <p className="text-sm font-medium text-vfb-text-primary">${(data.amount / 1000).toFixed(1)}k</p>
              <p className="text-xs text-vfb-text-tertiary">
                {new Date(data.month + '-01').toLocaleDateString('en-US', { month: 'short' })}
              </p>
            </div>
          ))}
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
                placeholder="Search by client, policy, or month..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="disputed">Disputed</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500"
            >
              <option value="all">All Types</option>
              <option value="new_business">New Business</option>
              <option value="renewal">Renewal</option>
              <option value="bonus">Bonus</option>
            </select>

            <Button variant="outline-primary" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Advanced
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-vfb-text-secondary">
          <span>Showing {filteredCommissions.length} of {mockCommissions.length} commission records</span>
          <div className="flex items-center space-x-4">
            <span>Total: ${totalCommission.toLocaleString()}</span>
            <span>Paid: ${paidCommission.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Commission Table */}
      <div className="bg-vfb-bg-card rounded-lg shadow-vfb border border-vfb-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-vfb-gray-200">
            <thead className="bg-vfb-bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Client & Policy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Paid Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-vfb-bg-card divide-y divide-vfb-gray-200">
              {filteredCommissions.map((commission) => {
                const client = getClientById(commission.clientId)
                const policy = getPolicyById(commission.policyId)
                return (
                  <tr key={commission.id} className="hover:bg-vfb-bg-secondary transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-vfb-text-primary">
                          {client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}
                        </p>
                        <p className="text-sm text-vfb-text-tertiary">
                          {policy?.policyNumber || 'Unknown Policy'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-vfb-text-primary">
                        {new Date(commission.month + '-01').toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        commission.type === 'new_business' ? 'bg-vfb-blue-50 text-vfb-blue-600' :
                        commission.type === 'renewal' ? 'bg-vfb-cyan-50 text-vfb-cyan-600' :
                        'bg-success-50 text-success-600'
                      }`}>
                        {commission.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-vfb-text-primary">
                        {(commission.rate * 100).toFixed(1)}%
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-vfb-text-primary">
                        ${commission.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={commission.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-vfb-text-primary">
                        {commission.paidDate 
                          ? new Date(commission.paidDate).toLocaleDateString()
                          : '-'
                        }
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredCommissions.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-vfb-text-tertiary mx-auto mb-4" />
          <p className="text-lg text-vfb-text-secondary">No commission records found</p>
          <p className="text-vfb-text-tertiary">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Commission Summary */}
      <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
        <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Commission Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-vfb-blue-600">
              ${mockCommissions
                .filter(c => c.type === 'new_business')
                .reduce((sum, c) => sum + c.amount, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-vfb-text-tertiary">New Business</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-vfb-cyan-600">
              ${mockCommissions
                .filter(c => c.type === 'renewal')
                .reduce((sum, c) => sum + c.amount, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-vfb-text-tertiary">Renewals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success-600">
              ${mockCommissions
                .filter(c => c.type === 'bonus')
                .reduce((sum, c) => sum + c.amount, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-vfb-text-tertiary">Bonuses</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Commission 