import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp,
  Eye, 
  Edit, 
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { mockClaims, getClientById, getPolicyById } from '@/data/mockData'

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    submitted: 'bg-vfb-cyan-50 text-vfb-cyan-600 border-vfb-cyan-200',
    processing: 'bg-warning-50 text-warning-600 border-warning-200',
    approved: 'bg-success-50 text-success-600 border-success-200',
    denied: 'bg-danger-50 text-danger-600 border-danger-200',
    paid: 'bg-vfb-blue-50 text-vfb-blue-600 border-vfb-blue-200'
  }
  
  const icons = {
    submitted: FileText,
    processing: Clock,
    approved: CheckCircle,
    denied: XCircle,
    paid: DollarSign
  }
  
  const Icon = icons[status as keyof typeof icons]
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Filter claims
  const filteredClaims = useMemo(() => {
    return mockClaims.filter(claim => {
      const client = getClientById(claim.clientId)
      const matchesSearch = client ? 
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.provider.toLowerCase().includes(searchTerm.toLowerCase())
        : false
      
      const matchesStatus = statusFilter === 'all' || claim.status === statusFilter
      const matchesType = typeFilter === 'all' || claim.type === typeFilter
      
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, statusFilter, typeFilter])

  const totalClaimAmount = filteredClaims.reduce((sum, claim) => sum + claim.amount, 0)
  const totalApprovedAmount = filteredClaims
    .filter(claim => claim.approvedAmount)
    .reduce((sum, claim) => sum + (claim.approvedAmount || 0), 0)

  const statusCounts = mockClaims.reduce((acc, claim) => {
    acc[claim.status] = (acc[claim.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-vfb-text-primary">Claims</h1>
          <p className="text-vfb-text-secondary mt-1">
            Track and manage insurance claims for your clients
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Claims</p>
              <p className="text-3xl font-bold text-vfb-text-primary">{mockClaims.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-vfb-blue-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Processing</p>
              <p className="text-3xl font-bold text-warning-600">{statusCounts.processing || 0}</p>
            </div>
            <Clock className="h-8 w-8 text-warning-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Approved</p>
              <p className="text-3xl font-bold text-success-600">{statusCounts.approved || 0}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
        </div>

        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Amount</p>
              <p className="text-3xl font-bold text-vfb-cyan-600">${totalClaimAmount.toLocaleString()}</p>
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
                placeholder="Search claims by client, claim number, or description..."
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
              <option value="submitted">Submitted</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
              <option value="paid">Paid</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500"
            >
              <option value="all">All Types</option>
              <option value="medical">Medical</option>
              <option value="dental">Dental</option>
              <option value="vision">Vision</option>
              <option value="prescription">Prescription</option>
            </select>

            <Button variant="outline-primary" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-vfb-text-secondary">
          <span>Showing {filteredClaims.length} of {mockClaims.length} claims</span>
          <div className="flex items-center space-x-4">
            <span>Total: ${totalClaimAmount.toLocaleString()}</span>
            <span>Approved: ${totalApprovedAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-vfb-bg-card rounded-lg shadow-vfb border border-vfb-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-vfb-gray-200">
            <thead className="bg-vfb-bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Claim Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Client & Policy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Type & Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-vfb-text-tertiary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-vfb-bg-card divide-y divide-vfb-gray-200">
              {filteredClaims.map((claim) => {
                const client = getClientById(claim.clientId)
                const policy = getPolicyById(claim.policyId)
                return (
                  <tr key={claim.id} className="hover:bg-vfb-bg-secondary transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-vfb-text-primary">{claim.claimNumber}</p>
                        <p className="text-sm text-vfb-text-secondary">{claim.description}</p>
                      </div>
                    </td>
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
                      <div>
                        <p className="text-sm font-medium text-vfb-text-primary capitalize">{claim.type}</p>
                        <p className="text-sm text-vfb-text-tertiary">{claim.provider}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-vfb-text-primary">
                          ${claim.amount.toLocaleString()}
                        </p>
                        {claim.approvedAmount && claim.approvedAmount !== claim.amount && (
                          <p className="text-sm text-success-600">
                            Approved: ${claim.approvedAmount.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={claim.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-vfb-text-primary">
                        {new Date(claim.submittedDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/claims/${claim.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {claim.status === 'processing' && (
                          <Button variant="primary" size="sm">
                            <CheckCircle className="h-4 w-4" />
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
      {filteredClaims.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-vfb-text-tertiary mx-auto mb-4" />
          <p className="text-lg text-vfb-text-secondary">No claims found</p>
          <p className="text-vfb-text-tertiary">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Alert for urgent claims */}
      {statusCounts.processing && statusCounts.processing > 3 && (
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-warning-600 mr-2" />
            <p className="text-sm font-medium text-warning-800">
              You have {statusCounts.processing} claims currently being processed. 
              Consider reviewing them for faster resolution.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Claims 