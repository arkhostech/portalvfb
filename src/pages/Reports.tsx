import { useState } from 'react'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  FileText,
  DollarSign,
  Users,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  PieChart,
  LineChart,
  Building2,
  Heart,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Mail,
  Share
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('current_month')
  const [selectedReport, setSelectedReport] = useState('overview')
  const [selectedCarrier, setSelectedCarrier] = useState('all')

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
      'All Carriers': { bg: 'bg-vfb-blue-100', color: 'text-vfb-blue-600', icon: Star }
    }
    
    const config = carrierConfig[carrier as keyof typeof carrierConfig] || carrierConfig['All Carriers']
    const Icon = config.icon
    
    return (
      <div className={`${sizes[size]} ${config.bg} rounded-md flex items-center justify-center flex-shrink-0`}>
        <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'} ${config.color}`} />
      </div>
    )
  }

  // Métricas principais
  const metrics = {
    totalRevenue: {
      current: 127450,
      previous: 118920,
      change: 7.2,
      trend: 'up'
    },
    activePolicies: {
      current: 284,
      previous: 267,
      change: 6.4,
      trend: 'up'
    },
    totalClaims: {
      current: 52,
      previous: 48,
      change: 8.3,
      trend: 'up'
    },
    satisfactionRate: {
      current: 94.2,
      previous: 92.8,
      change: 1.5,
      trend: 'up'
    }
  }

  // Dados de performance por operadora
  const carrierPerformance = [
    {
      carrier: 'Oscar Health',
      policies: 156,
      revenue: '$67,850',
      claims: 28,
      satisfaction: 95.1,
      growth: 8.5,
      trend: 'up'
    },
    {
      carrier: 'Florida Blue',
      policies: 89,
      revenue: '$38,920',
      claims: 15,
      satisfaction: 93.8,
      growth: 5.2,
      trend: 'up'
    },
    {
      carrier: 'Capital Health Plan',
      policies: 39,
      revenue: '$20,680',
      claims: 9,
      satisfaction: 92.5,
      growth: 3.1,
      trend: 'up'
    }
  ]

  // Relatórios disponíveis
  const availableReports = [
    {
      id: 'overview',
      name: 'Visão Geral',
      description: 'Métricas principais e KPIs do negócio',
      lastUpdate: '23/11/2024 14:30',
      icon: BarChart3,
      category: 'Dashboard'
    },
    {
      id: 'financial',
      name: 'Relatório Financeiro',
      description: 'Análise de receita, comissões e pagamentos',
      lastUpdate: '23/11/2024 09:15',
      icon: DollarSign,
      category: 'Financeiro'
    },
    {
      id: 'policies',
      name: 'Relatório de Apólices',
      description: 'Status e performance das apólices ativas',
      lastUpdate: '22/11/2024 16:45',
      icon: Shield,
      category: 'Apólices'
    },
    {
      id: 'claims',
      name: 'Relatório de Reembolsos',
      description: 'Análise de reembolsos e sinistros processados',
      lastUpdate: '22/11/2024 11:20',
      icon: FileText,
      category: 'Reembolsos'
    },
    {
      id: 'clients',
      name: 'Relatório de Clientes',
      description: 'Demographics e análise comportamental',
      lastUpdate: '21/11/2024 13:50',
      icon: Users,
      category: 'Clientes'
    },
    {
      id: 'carriers',
      name: 'Performance das Operadoras',
      description: 'Comparativo de performance entre operadoras',
      lastUpdate: '21/11/2024 10:30',
      icon: Building2,
      category: 'Operadoras'
    }
  ]

  // Dados dos gráficos
  const monthlyRevenue = [
    { month: 'Jan', revenue: 98500, policies: 210 },
    { month: 'Fev', revenue: 105200, policies: 225 },
    { month: 'Mar', revenue: 112800, policies: 240 },
    { month: 'Abr', revenue: 108300, policies: 235 },
    { month: 'Mai', revenue: 115600, policies: 248 },
    { month: 'Jun', revenue: 122400, policies: 262 },
    { month: 'Jul', revenue: 118900, policies: 255 },
    { month: 'Ago', revenue: 125300, policies: 267 },
    { month: 'Set', revenue: 119700, policies: 260 },
    { month: 'Out', revenue: 127100, policies: 275 },
    { month: 'Nov', revenue: 127450, policies: 284 }
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const MetricCard = ({ title, current, previous, change, trend, icon: Icon, format = 'number' }: any) => {
    const isPositive = trend === 'up'
    const formattedCurrent = format === 'currency' ? formatCurrency(current) : 
                           format === 'percentage' ? `${current}%` : current.toLocaleString()

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-vfb-text-tertiary">{title}</p>
            <p className="text-2xl font-bold text-vfb-text-primary mt-1">{formattedCurrent}</p>
          </div>
          <div className="p-2 bg-vfb-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-vfb-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}%
          </span>
          <span className="text-sm text-vfb-text-tertiary ml-1">vs mês anterior</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Relatórios e Analytics</h1>
            <p className="text-vfb-blue-100">
              Insights e métricas de performance do seu negócio
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button className="bg-white text-vfb-blue-900 hover:bg-vfb-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="current_month">Mês Atual</option>
            <option value="last_month">Mês Passado</option>
            <option value="quarter">Trimestre Atual</option>
            <option value="year">Ano Atual</option>
            <option value="custom">Período Personalizado</option>
          </select>

          <select
            value={selectedCarrier}
            onChange={(e) => setSelectedCarrier(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="all">Todas as Operadoras</option>
            <option value="Oscar Health">Oscar Health</option>
            <option value="Florida Blue">Florida Blue</option>
            <option value="Capital Health Plan">Capital Health Plan</option>
          </select>

          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="p-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          >
            <option value="overview">Visão Geral</option>
            <option value="financial">Financeiro</option>
            <option value="policies">Apólices</option>
            <option value="claims">Reembolsos</option>
            <option value="clients">Clientes</option>
          </select>

          <Button variant="outline-primary" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Período Personalizado
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Total"
          current={metrics.totalRevenue.current}
          previous={metrics.totalRevenue.previous}
          change={metrics.totalRevenue.change}
          trend={metrics.totalRevenue.trend}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="Apólices Ativas"
          current={metrics.activePolicies.current}
          previous={metrics.activePolicies.previous}
          change={metrics.activePolicies.change}
          trend={metrics.activePolicies.trend}
          icon={Shield}
        />
        <MetricCard
          title="Reembolsos Processados"
          current={metrics.totalClaims.current}
          previous={metrics.totalClaims.previous}
          change={metrics.totalClaims.change}
          trend={metrics.totalClaims.trend}
          icon={FileText}
        />
        <MetricCard
          title="Satisfação Cliente"
          current={metrics.satisfactionRate.current}
          previous={metrics.satisfactionRate.previous}
          change={metrics.satisfactionRate.change}
          trend={metrics.satisfactionRate.trend}
          icon={CheckCircle}
          format="percentage"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-vfb-text-primary">Receita Mensal</h3>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyRevenue.map((data, index) => {
              const height = (data.revenue / Math.max(...monthlyRevenue.map(d => d.revenue))) * 100
              return (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-vfb-blue-500 rounded-t-sm w-8 transition-all hover:bg-vfb-blue-600"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-vfb-text-tertiary mt-2">{data.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Carrier Performance */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-vfb-text-primary">Performance por Operadora</h3>
            <Button variant="ghost" size="sm">
              <PieChart className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {carrierPerformance.map((carrier, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-vfb-gray-50 rounded-lg">
                <div className="flex items-center">
                  <InsuranceLogo carrier={carrier.carrier} />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-vfb-text-primary">{carrier.carrier}</div>
                    <div className="text-sm text-vfb-text-tertiary">{carrier.policies} apólices</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-vfb-text-primary">{carrier.revenue}</div>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">{carrier.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-vfb-text-primary">Relatórios Disponíveis</h3>
          <Button variant="outline-primary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableReports.map((report) => (
            <div key={report.id} className="border border-vfb-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-vfb-blue-100 rounded-lg">
                  <report.icon className="h-5 w-5 text-vfb-blue-600" />
                </div>
                <span className="text-xs text-vfb-text-tertiary bg-vfb-gray-100 px-2 py-1 rounded">
                  {report.category}
                </span>
              </div>
              <h4 className="font-medium text-vfb-text-primary mb-1">{report.name}</h4>
              <p className="text-sm text-vfb-text-tertiary mb-3">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-vfb-text-tertiary">
                  Atualizado: {report.lastUpdate}
                </span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Alertas Automáticos</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Configurar notificações de performance
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Relatórios Agendados</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Automação de relatórios periódicos
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-vfb-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-vfb-text-primary">Compartilhamento</h3>
              <p className="text-sm text-vfb-text-tertiary">
                Compartilhar relatórios com equipe
              </p>
            </div>
            <Button variant="outline-primary" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 