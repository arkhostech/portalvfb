import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Calculator,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { mockMetrics, mockClients, mockPolicies, mockQuotes, mockClaims } from '@/data/mockData'

// Status badge component
const StatusBadge = ({ status, children }: { status: string, children: React.ReactNode }) => {
  const styles = {
    active: 'bg-success-50 text-success-600 border-success-200',
    pending: 'bg-warning-50 text-warning-600 border-warning-200',
    processing: 'bg-info-50 text-info-600 border-info-200',
    approved: 'bg-success-50 text-success-600 border-success-200',
    sent: 'bg-vfb-cyan-50 text-vfb-cyan-600 border-vfb-cyan-200'
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || 'bg-vfb-gray-50 text-vfb-gray-600 border-vfb-gray-200'}`}>
      {children}
    </span>
  )
}

const Dashboard = () => {
  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'client',
      message: 'New client Emily Rodriguez registered',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'policy',
      message: 'Health policy approved for Sarah Johnson',
      time: '4 hours ago',
      status: 'approved'
    },
    {
      id: 3,
      type: 'claim',
      message: 'Dental claim processing for Michael Chen',
      time: '6 hours ago',
      status: 'processing'
    },
    {
      id: 4,
      type: 'quote',
      message: 'Vision quote sent to Jessica Williams',
      time: '1 day ago',
      status: 'sent'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-vfb-text-primary">Dashboard</h1>
          <p className="text-vfb-text-secondary mt-1">
            Welcome back! Here's your insurance business overview.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline-primary" size="sm">
            <Calculator className="mr-2 h-4 w-4" />
            New Quote
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Clients */}
        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Total Clients</p>
              <p className="text-3xl font-bold text-vfb-text-primary">{mockMetrics.totalClients}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-success-500" />
                <span className="text-sm text-success-600 font-medium">+{mockMetrics.clientGrowth}%</span>
                <span className="text-sm text-vfb-text-tertiary ml-2">vs last month</span>
              </div>
            </div>
            <div className="bg-vfb-blue-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-vfb-blue-900" />
            </div>
          </div>
        </div>

        {/* Total Policies */}
        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Active Policies</p>
              <p className="text-3xl font-bold text-vfb-text-primary">{mockMetrics.totalPolicies}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-success-500" />
                <span className="text-sm text-success-600 font-medium">+8.2%</span>
                <span className="text-sm text-vfb-text-tertiary ml-2">vs last month</span>
              </div>
            </div>
            <div className="bg-vfb-cyan-50 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-vfb-cyan-600" />
            </div>
          </div>
        </div>

        {/* Active Quotes */}
        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Active Quotes</p>
              <p className="text-3xl font-bold text-vfb-text-primary">{mockMetrics.activeQuotes}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-vfb-text-tertiary">
                  {mockMetrics.conversionRate}% conversion rate
                </span>
              </div>
            </div>
            <div className="bg-warning-50 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>

        {/* Monthly Commission */}
        <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-vfb-text-tertiary">Monthly Commission</p>
              <p className="text-3xl font-bold text-vfb-text-primary">
                ${mockMetrics.monthlyCommission.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-success-500" />
                <span className="text-sm text-success-600 font-medium">+15.3%</span>
                <span className="text-sm text-vfb-text-tertiary ml-2">vs last month</span>
              </div>
            </div>
            <div className="bg-success-50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/clients" 
                className="flex items-center p-3 rounded-lg border border-vfb-gray-200 hover:border-vfb-blue-300 hover:bg-vfb-blue-50 transition-colors group"
              >
                <Users className="h-5 w-5 text-vfb-text-tertiary group-hover:text-vfb-blue-600 mr-3" />
                <span className="text-sm font-medium text-vfb-text-primary group-hover:text-vfb-blue-900">
                  Manage Clients
                </span>
              </Link>
              
              <Link 
                to="/quotes" 
                className="flex items-center p-3 rounded-lg border border-vfb-gray-200 hover:border-vfb-cyan-300 hover:bg-vfb-cyan-50 transition-colors group"
              >
                <Calculator className="h-5 w-5 text-vfb-text-tertiary group-hover:text-vfb-cyan-600 mr-3" />
                <span className="text-sm font-medium text-vfb-text-primary group-hover:text-vfb-cyan-900">
                  Create Quote
                </span>
              </Link>
              
              <Link 
                to="/claims" 
                className="flex items-center p-3 rounded-lg border border-vfb-gray-200 hover:border-warning-300 hover:bg-warning-50 transition-colors group"
              >
                <TrendingUp className="h-5 w-5 text-vfb-text-tertiary group-hover:text-warning-600 mr-3" />
                <span className="text-sm font-medium text-vfb-text-primary group-hover:text-warning-900">
                  Review Claims
                </span>
              </Link>
              
              <Link 
                to="/commission" 
                className="flex items-center p-3 rounded-lg border border-vfb-gray-200 hover:border-success-300 hover:bg-success-50 transition-colors group"
              >
                <DollarSign className="h-5 w-5 text-vfb-text-tertiary group-hover:text-success-600 mr-3" />
                <span className="text-sm font-medium text-vfb-text-primary group-hover:text-success-900">
                  View Commission
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-vfb-text-primary">Recent Activity</h3>
              <Link to="/activity" className="text-sm text-vfb-blue-600 hover:text-vfb-blue-900">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-vfb-bg-secondary transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'client' && <Users className="h-4 w-4 text-vfb-blue-600" />}
                    {activity.type === 'policy' && <FileText className="h-4 w-4 text-vfb-cyan-600" />}
                    {activity.type === 'claim' && <TrendingUp className="h-4 w-4 text-warning-600" />}
                    {activity.type === 'quote' && <Calculator className="h-4 w-4 text-success-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-vfb-text-primary font-medium">
                      {activity.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-vfb-text-tertiary">{activity.time}</p>
                      <StatusBadge status={activity.status}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </StatusBadge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Goals */}
      <div className="bg-vfb-bg-card rounded-lg shadow-vfb p-6 border border-vfb-gray-100">
        <h3 className="text-lg font-semibold text-vfb-text-primary mb-6">Monthly Goals</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Clients Goal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-vfb-text-primary">New Clients</span>
              <span className="text-sm text-vfb-text-tertiary">12/20</span>
            </div>
            <div className="w-full bg-vfb-gray-200 rounded-full h-2 mb-1">
              <div className="bg-vfb-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
            <p className="text-xs text-vfb-text-tertiary">60% complete</p>
          </div>

          {/* Revenue Goal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-vfb-text-primary">Monthly Revenue</span>
              <span className="text-sm text-vfb-text-tertiary">$18k/$25k</span>
            </div>
            <div className="w-full bg-vfb-gray-200 rounded-full h-2 mb-1">
              <div className="bg-success-600 h-2 rounded-full" style={{width: '72%'}}></div>
            </div>
            <p className="text-xs text-vfb-text-tertiary">72% complete</p>
          </div>

          {/* Conversion Rate Goal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-vfb-text-primary">Conversion Rate</span>
              <span className="text-sm text-vfb-text-tertiary">68.5%/70%</span>
            </div>
            <div className="w-full bg-vfb-gray-200 rounded-full h-2 mb-1">
              <div className="bg-vfb-cyan-600 h-2 rounded-full" style={{width: '98%'}}></div>
            </div>
            <p className="text-xs text-vfb-text-tertiary">98% complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 