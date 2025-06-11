import { useState } from 'react'
import { 
  Search,
  MapPin,
  Phone,
  Globe,
  Star,
  Filter,
  Shield,
  Heart,
  Building2,
  ChevronDown,
  Navigation
} from 'lucide-react'

export default function ProviderDirectory() {
  const [selectedNetwork, setSelectedNetwork] = useState('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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
      'Capital Health Plan': { bg: 'bg-green-100', color: 'text-green-600', icon: Building2 }
    }
    
    const config = carrierConfig[carrier as keyof typeof carrierConfig] || carrierConfig['Florida Blue']
    const Icon = config.icon
    
    return (
      <div className={`${sizes[size]} ${config.bg} rounded-md flex items-center justify-center flex-shrink-0`}>
        <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'} ${config.color}`} />
      </div>
    )
  }

  // Dados dos provedores médicos na Flórida
  const providers = [
    {
      id: 1,
      name: 'Dr. Michael Rodriguez',
      specialty: 'Clínico Geral',
      networks: ['Oscar Health', 'Florida Blue'],
      rating: 4.8,
      reviewCount: 127,
      address: '1425 Brickell Ave, Miami, FL 33131',
      phone: '(305) 555-0123',
      website: 'miamifamilycare.com',
      distance: '2.3 miles',
      acceptingNewPatients: true,
      languages: ['English', 'Spanish', 'Portuguese'],
      hospitalAffiliations: ['Jackson Memorial Hospital', 'Baptist Hospital of Miami']
    },
    {
      id: 2,
      name: 'Dr. Sarah Chen',
      specialty: 'Cardiologia',
      networks: ['Florida Blue', 'Capital Health Plan'],
      rating: 4.9,
      reviewCount: 89,
      address: '580 W 8th St, Jacksonville, FL 32209',
      phone: '(904) 555-0456',
      website: 'jaxcardiology.com',
      distance: '5.7 miles',
      acceptingNewPatients: true,
      languages: ['English', 'Mandarin'],
      hospitalAffiliations: ['Mayo Clinic Jacksonville', 'UF Health Jacksonville']
    },
    {
      id: 3,
      name: 'Dr. Amanda Thompson',
      specialty: 'Pediatria',
      networks: ['Oscar Health', 'Florida Blue'],
      rating: 4.7,
      reviewCount: 156,
      address: '2901 W Busch Blvd, Tampa, FL 33618',
      phone: '(813) 555-0789',
      website: 'tampakidshealth.com',
      distance: '3.1 miles',
      acceptingNewPatients: false,
      languages: ['English'],
      hospitalAffiliations: ['Tampa General Hospital', "St. Joseph's Children's Hospital"]
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Ortopedia',
      networks: ['Capital Health Plan'],
      rating: 4.6,
      reviewCount: 73,
      address: '1401 Centerville Rd, Tallahassee, FL 32308',
      phone: '(850) 555-0321',
      website: 'tallahasseeortho.com',
      distance: '1.8 miles',
      acceptingNewPatients: true,
      languages: ['English'],
      hospitalAffiliations: ['Tallahassee Memorial Hospital', 'Capital Regional Medical Center']
    },
    {
      id: 5,
      name: 'Dr. Lisa Martinez',
      specialty: 'Dermatologia',
      networks: ['Oscar Health', 'Florida Blue', 'Capital Health Plan'],
      rating: 4.8,
      reviewCount: 94,
      address: '9397 Crown Cove Cir, Orlando, FL 32827',
      phone: '(407) 555-0654',
      website: 'orlandoskincare.com',
      distance: '4.2 miles',
      acceptingNewPatients: true,
      languages: ['English', 'Spanish'],
      hospitalAffiliations: ['Orlando Health', 'AdventHealth Orlando']
    }
  ]

  const networks = [
    { value: 'all', label: 'Todas as Redes' },
    { value: 'Oscar Health', label: 'Oscar Network Florida' },
    { value: 'Florida Blue', label: 'Blue Options Network' },
    { value: 'Capital Health Plan', label: 'Capital Health Network' }
  ]

  const specialties = [
    { value: 'all', label: 'Todas as Especialidades' },
    { value: 'Clínico Geral', label: 'Clínico Geral' },
    { value: 'Cardiologia', label: 'Cardiologia' },
    { value: 'Pediatria', label: 'Pediatria' },
    { value: 'Ortopedia', label: 'Ortopedia' },
    { value: 'Dermatologia', label: 'Dermatologia' }
  ]

  // Filtrar provedores
  const filteredProviders = providers.filter(provider => {
    const matchesNetwork = selectedNetwork === 'all' || provider.networks.includes(selectedNetwork)
    const matchesSpecialty = selectedSpecialty === 'all' || provider.specialty === selectedSpecialty
    const matchesSearch = searchTerm === '' || 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesNetwork && matchesSpecialty && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Encontrar Médico</h1>
        <p className="text-vfb-blue-100">
          Encontre médicos e especialistas na sua rede credenciada
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Buscar médico ou especialidade
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-vfb-text-tertiary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: Dr. Silva, Cardiologia, Miami..."
                className="w-full pl-10 pr-4 py-2 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Rede Credenciada */}
          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Rede Credenciada
            </label>
            <div className="relative">
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full appearance-none bg-white border border-vfb-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
              >
                {networks.map(network => (
                  <option key={network.value} value={network.value}>
                    {network.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vfb-text-tertiary pointer-events-none" />
            </div>
          </div>

          {/* Especialidade */}
          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Especialidade
            </label>
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full appearance-none bg-white border border-vfb-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
              >
                {specialties.map(specialty => (
                  <option key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vfb-text-tertiary pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-vfb-text-primary">
            {filteredProviders.length} médicos encontrados
          </h2>
          <button className="flex items-center text-sm text-vfb-blue-600 hover:text-vfb-blue-700">
            <Navigation className="h-4 w-4 mr-1" />
            Ordenar por distância
          </button>
        </div>

        {/* Lista de Médicos */}
        <div className="space-y-4">
          {filteredProviders.map(provider => (
            <div key={provider.id} className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-vfb-text-primary">{provider.name}</h3>
                    {provider.acceptingNewPatients ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Aceitando novos pacientes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Lista de espera
                      </span>
                    )}
                  </div>
                  <p className="text-vfb-text-secondary font-medium mb-2">{provider.specialty}</p>
                  
                  {/* Redes Credenciadas */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-vfb-text-tertiary">Aceita:</span>
                    {provider.networks.map(network => (
                      <div key={network} className="flex items-center space-x-1">
                        <InsuranceLogo carrier={network} />
                        <span className="text-sm text-vfb-text-secondary">{network}</span>
                      </div>
                    ))}
                  </div>

                  {/* Avaliação */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-vfb-text-primary">{provider.rating}</span>
                      <span className="text-sm text-vfb-text-tertiary">({provider.reviewCount} avaliações)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-vfb-text-tertiary" />
                      <span className="text-sm text-vfb-text-tertiary">{provider.distance}</span>
                    </div>
                  </div>

                  {/* Informações de Contato */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-vfb-text-tertiary flex-shrink-0" />
                      <span className="text-sm text-vfb-text-secondary">{provider.address}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-vfb-text-tertiary" />
                        <span className="text-sm text-vfb-text-secondary">{provider.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-vfb-text-tertiary" />
                        <span className="text-sm text-vfb-blue-600">{provider.website}</span>
                      </div>
                    </div>
                  </div>

                  {/* Idiomas */}
                  <div className="mt-3">
                    <span className="text-sm text-vfb-text-tertiary">Idiomas: </span>
                    <span className="text-sm text-vfb-text-secondary">{provider.languages.join(', ')}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="ml-6 flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-vfb-blue-600 text-white text-sm font-medium rounded-lg hover:bg-vfb-blue-700 transition-colors">
                    Agendar Consulta
                  </button>
                  <button className="px-4 py-2 border border-vfb-gray-300 text-vfb-text-primary text-sm font-medium rounded-lg hover:bg-vfb-gray-50 transition-colors">
                    Ver Perfil
                  </button>
                </div>
              </div>

              {/* Hospitais Afiliados */}
              <div className="border-t border-vfb-gray-100 pt-3">
                <span className="text-sm text-vfb-text-tertiary">Hospitais afiliados: </span>
                <span className="text-sm text-vfb-text-secondary">{provider.hospitalAffiliations.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dica */}
      <div className="bg-vfb-blue-50 border border-vfb-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-vfb-blue-800 mb-2">💡 Dica Importante</h3>
        <p className="text-sm text-vfb-blue-700">
          Sempre confirme se o médico ainda aceita seu plano antes de agendar uma consulta. As redes credenciadas podem ser atualizadas regularmente.
        </p>
      </div>
    </div>
  )
} 