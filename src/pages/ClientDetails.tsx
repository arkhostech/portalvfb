import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Calculator,
  TrendingUp,
  Plus,
  Edit,
  MoreVertical
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { 
  getClientById, 
  getPoliciesByClient, 
  getQuotesByClient, 
  getClaimsByClient,
  getDocumentsByClient
} from '@/data/mockData'

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>()
  const client = getClientById(id!)
  
  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-vfb-text-secondary">Client not found</p>
        <Link to="/clients" className="text-vfb-blue-600 hover:text-vfb-blue-900">
          Return to clients
        </Link>
      </div>
    )
  }

  const policies = getPoliciesByClient(id!)
  const quotes = getQuotesByClient(id!)
  const claims = getClaimsByClient(id!)
  const documents = getDocumentsByClient(id!)

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-vfb-text-secondary">
        <Link to="/clients" className="hover:text-vfb-blue-600">
          Clients
        </Link>
        <span>/</span>
        <span className="text-vfb-text-primary">{client.firstName} {client.lastName}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/clients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            {client.avatar ? (
              <img
                src={client.avatar}
                alt={`${client.firstName} ${client.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-vfb-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-vfb-blue-600" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-vfb-text-primary">
                {client.firstName} {client.lastName}
              </h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                client.status === 'active' ? 'bg-success-50 text-success-600' :
                client.status === 'pending' ? 'bg-warning-50 text-warning-600' :
                'bg-vfb-gray-50 text-vfb-gray-600'
              }`}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline-primary" size="sm">
            <Calculator className="mr-2 h-4 w-4" />
            New Quote
          </Button>
          <Button variant="primary" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Client
          </Button>
        </div>
      </div>

      {/* Client Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-vfb-text-tertiary" />
                <div>
                  <p className="text-sm text-vfb-text-tertiary">Email</p>
                  <p className="text-vfb-text-primary">{client.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-vfb-text-tertiary" />
                <div>
                  <p className="text-sm text-vfb-text-tertiary">Phone</p>
                  <p className="text-vfb-text-primary">{client.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-vfb-text-tertiary" />
                <div>
                  <p className="text-sm text-vfb-text-tertiary">Address</p>
                  <p className="text-vfb-text-primary">
                    {client.address.street}<br />
                    {client.address.city}, {client.address.state} {client.address.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-vfb-text-tertiary" />
                <div>
                  <p className="text-sm text-vfb-text-tertiary">Date of Birth</p>
                  <p className="text-vfb-text-primary">
                    {new Date(client.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-vfb-text-primary">Policies ({policies.length})</h3>
              <Button variant="outline-primary" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Policy
              </Button>
            </div>
            <div className="space-y-3">
              {policies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-bg-secondary transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      policy.status === 'active' ? 'bg-success-500' :
                      policy.status === 'pending' ? 'bg-warning-500' :
                      'bg-vfb-gray-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-vfb-text-primary">{policy.plan}</p>
                      <p className="text-sm text-vfb-text-secondary">{policy.provider} • {policy.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-vfb-text-primary">${policy.monthlyPremium}/mo</p>
                    <p className="text-sm text-vfb-text-tertiary">{policy.policyNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Claims */}
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Recent Claims ({claims.length})</h3>
            <div className="space-y-3">
              {claims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-4 border border-vfb-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-vfb-text-primary">{claim.description}</p>
                    <p className="text-sm text-vfb-text-secondary">{claim.provider} • {new Date(claim.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-vfb-text-primary">${claim.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      claim.status === 'approved' || claim.status === 'paid' ? 'bg-success-50 text-success-600' :
                      claim.status === 'processing' || claim.status === 'submitted' ? 'bg-warning-50 text-warning-600' :
                      'bg-danger-50 text-danger-600'
                    }`}>
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-vfb-blue-600">{client.totalPolicies}</p>
                <p className="text-sm text-vfb-text-tertiary">Active Policies</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600">${client.monthlyPremium.toLocaleString()}</p>
                <p className="text-sm text-vfb-text-tertiary">Monthly Premium</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning-600">{quotes.length}</p>
                <p className="text-sm text-vfb-text-tertiary">Pending Quotes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-vfb-cyan-600">{claims.length}</p>
                <p className="text-sm text-vfb-text-tertiary">Total Claims</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Documents ({documents.length})</h3>
            <div className="space-y-2">
              {documents.slice(0, 5).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-vfb-bg-secondary rounded">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-vfb-text-tertiary" />
                    <div>
                      <p className="text-sm font-medium text-vfb-text-primary truncate">{doc.name}</p>
                      <p className="text-xs text-vfb-text-tertiary">{doc.size}</p>
                    </div>
                  </div>
                  <button className="p-1 rounded hover:bg-vfb-gray-100">
                    <MoreVertical className="h-4 w-4 text-vfb-text-tertiary" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Client Timeline */}
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-vfb-text-primary">Client registered</p>
                  <p className="text-xs text-vfb-text-tertiary">{new Date(client.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              {policies.map((policy, index) => (
                <div key={policy.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-vfb-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-vfb-text-primary">Policy {policy.plan} added</p>
                    <p className="text-xs text-vfb-text-tertiary">{new Date(policy.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDetails 