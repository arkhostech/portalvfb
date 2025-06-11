import { useState } from 'react'
import { 
  Search,
  MapPin,
  Star,
  Phone,
  Clock,
  Calendar,
  Filter,
  User,
  Heart,
  Shield,
  Building2,
  Navigation,
  CheckCircle,
  ExternalLink,
  Award,
  Users,
  ThumbsUp,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Brain,
  Baby,
  Eye,
  Scissors,
  Activity
} from 'lucide-react'

export default function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedInsurance, setSelectedInsurance] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null)

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

  // Especialidades médicas
  const specialties = [
    { id: 'all', name: 'Todas as Especialidades', icon: Stethoscope },
    { id: 'family', name: 'Medicina de Família', icon: Users },
    { id: 'internal', name: 'Clínica Médica', icon: Activity },
    { id: 'cardiology', name: 'Cardiologia', icon: Heart },
    { id: 'dermatology', name: 'Dermatologia', icon: User },
    { id: 'pediatrics', name: 'Pediatria', icon: Baby },
    { id: 'gynecology', name: 'Ginecologia', icon: User },
    { id: 'orthopedics', name: 'Ortopedia', icon: Stethoscope },
    { id: 'neurology', name: 'Neurologia', icon: Brain },
    { id: 'ophthalmology', name: 'Oftalmologia', icon: Eye },
    { id: 'surgery', name: 'Cirurgia Geral', icon: Scissors }
  ]

  // Lista de médicos
  const doctors = [
    {
      id: 1,
      name: 'Dr. Michael Rodriguez',
      specialty: 'Medicina de Família',
      rating: 4.9,
      reviewCount: 156,
      distance: '0.8 mi',
      address: '1234 Ocean Drive, Miami, FL 33139',
      phone: '(305) 555-0100',
      acceptedInsurance: ['Oscar Health', 'Florida Blue', 'Capital Health Plan'],
      languages: ['Inglês', 'Espanhol', 'Português'],
      education: 'University of Miami Miller School of Medicine',
      experience: '15 anos',
      nextAvailable: '2024-03-15',
      isAcceptingNewPatients: true,
      isInNetwork: true,
      copay: '$25',
      profileImage: '/doctors/dr-rodriguez.jpg',
      about: 'Dr. Rodriguez é especialista em medicina de família com foco em cuidados preventivos e medicina familiar. Atende pacientes de todas as idades.',
      credentials: ['Board Certified Family Medicine', 'Fellow American Academy of Family Physicians'],
      hospitalAffiliations: ['Jackson Memorial Hospital', 'Baptist Health South Florida']
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialty: 'Clínica Médica',
      rating: 4.8,
      reviewCount: 203,
      distance: '1.2 mi',
      address: '5678 Collins Avenue, Miami Beach, FL 33140',
      phone: '(305) 555-0101',
      acceptedInsurance: ['Oscar Health', 'Florida Blue'],
      languages: ['Inglês', 'Francês'],
      education: 'Harvard Medical School',
      experience: '12 anos',
      nextAvailable: '2024-03-18',
      isAcceptingNewPatients: true,
      isInNetwork: true,
      copay: '$40',
      profileImage: '/doctors/dr-johnson.jpg',
      about: 'Dr. Johnson é especialista em medicina interna com expertise em doenças crônicas e gerenciamento de condições complexas.',
      credentials: ['Board Certified Internal Medicine', 'ABIM Certified'],
      hospitalAffiliations: ['Mount Sinai Medical Center', 'Miami Beach Community Health Center']
    },
    {
      id: 3,
      name: 'Dr. Patricia Lee',
      specialty: 'Pediatria',
      rating: 4.9,
      reviewCount: 89,
      distance: '2.1 mi',
      address: '9012 Washington Avenue, Miami Beach, FL 33154',
      phone: '(305) 555-0102',
      acceptedInsurance: ['Oscar Health', 'Capital Health Plan', 'AmeriHealth Caritas Next'],
      languages: ['Inglês', 'Mandarim', 'Cantonês'],
      education: 'Johns Hopkins School of Medicine',
      experience: '18 anos',
      nextAvailable: '2024-03-20',
      isAcceptingNewPatients: true,
      isInNetwork: true,
      copay: '$15',
      profileImage: '/doctors/dr-lee.jpg',
      about: 'Dr. Lee é pediatra certificada especializada em desenvolvimento infantil e medicina adolescente.',
      credentials: ['Board Certified Pediatrics', 'Fellow American Academy of Pediatrics'],
      hospitalAffiliations: ['Nicklaus Children\'s Hospital', 'Joe DiMaggio Children\'s Hospital']
    },
    {
      id: 4,
      name: 'Dr. Carlos Mendoza',
      specialty: 'Cardiologia',
      rating: 4.7,
      reviewCount: 124,
      distance: '3.5 mi',
      address: '3456 Biscayne Boulevard, Miami, FL 33137',
      phone: '(305) 555-0103',
      acceptedInsurance: ['Florida Blue', 'Capital Health Plan'],
      languages: ['Inglês', 'Espanhol'],
      education: 'University of Florida College of Medicine',
      experience: '20 anos',
      nextAvailable: '2024-03-25',
      isAcceptingNewPatients: false,
      isInNetwork: true,
      copay: '$60',
      profileImage: '/doctors/dr-mendoza.jpg',
      about: 'Dr. Mendoza é cardiologista intervencionista com especialização em procedimentos cardíacos minimamente invasivos.',
      credentials: ['Board Certified Cardiology', 'Interventional Cardiology Fellowship'],
      hospitalAffiliations: ['Jackson Memorial Hospital', 'University of Miami Hospital']
    }
  ]

  // Filtrar médicos
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchQuery === '' || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'all' ||
      doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
    
    const matchesInsurance = selectedInsurance === '' ||
      doctor.acceptedInsurance.includes(selectedInsurance)
    
    return matchesSearch && matchesSpecialty && matchesInsurance
  })

  // Ordenar médicos
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance)
      case 'availability':
        return new Date(a.nextAvailable).getTime() - new Date(b.nextAvailable).getTime()
      default:
        return 0
    }
  })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-vfb-blue-900 to-vfb-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Encontrar Médicos</h1>
        <p className="text-vfb-blue-100">
          Encontre médicos na sua rede, compare avaliações e agende consultas
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome do médico ou especialidade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-vfb-gray-300 rounded-lg focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
          />
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Especialidade
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Localização
            </label>
            <input
              type="text"
              placeholder="Miami, FL"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Plano de Saúde
            </label>
            <select
              value={selectedInsurance}
              onChange={(e) => setSelectedInsurance(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="">Todos os Planos</option>
              <option value="Oscar Health">Oscar Health</option>
              <option value="Florida Blue">Florida Blue</option>
              <option value="Capital Health Plan">Capital Health Plan</option>
              <option value="AmeriHealth Caritas Next">AmeriHealth Caritas Next</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-vfb-text-primary mb-2">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-vfb-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-vfb-blue-500 focus:border-transparent"
            >
              <option value="distance">Distância</option>
              <option value="rating">Avaliação</option>
              <option value="availability">Disponibilidade</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-vfb-text-secondary">
            {sortedDoctors.length} médicos encontrados
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-vfb-blue-600 hover:text-vfb-blue-700 font-medium"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avançados
          </button>
        </div>
      </div>

      {/* Doctors List */}
      <div className="space-y-6">
        {sortedDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Doctor Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-vfb-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-vfb-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-vfb-text-primary">{doctor.name}</h3>
                      {doctor.isInNetwork && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          <CheckCircle className="w-3 h-3 mr-1 inline" />
                          Na Rede
                        </span>
                      )}
                      {!doctor.isAcceptingNewPatients && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Lista de Espera
                        </span>
                      )}
                    </div>
                    
                    <p className="text-vfb-blue-600 font-medium mb-2">{doctor.specialty}</p>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(doctor.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-vfb-text-secondary">
                          {doctor.rating} ({doctor.reviewCount} avaliações)
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-vfb-text-secondary">
                        <MapPin className="h-4 w-4 mr-1" />
                        {doctor.distance}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-vfb-text-secondary mb-1">Endereço</p>
                        <p className="text-sm text-vfb-text-primary">{doctor.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-vfb-text-secondary mb-1">Telefone</p>
                        <p className="text-sm text-vfb-text-primary">{doctor.phone}</p>
                      </div>
                    </div>

                    {/* Insurance Accepted */}
                    <div className="mb-4">
                      <p className="text-sm text-vfb-text-secondary mb-2">Planos Aceitos</p>
                      <div className="flex items-center space-x-2">
                        {doctor.acceptedInsurance.map(insurance => (
                          <div key={insurance} className="flex items-center space-x-1">
                            <InsuranceLogo carrier={insurance} size="sm" />
                            <span className="text-xs text-vfb-text-secondary">{insurance}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <p className="text-sm text-vfb-text-secondary mb-1">Idiomas</p>
                      <p className="text-sm text-vfb-text-primary">{doctor.languages.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="lg:col-span-1">
                <div className="bg-vfb-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <p className="text-sm text-vfb-text-secondary mb-1">Copagamento</p>
                    <p className="text-lg font-semibold text-vfb-text-primary">{doctor.copay}</p>
                  </div>

                  <div>
                    <p className="text-sm text-vfb-text-secondary mb-1">Próxima Disponibilidade</p>
                    <p className="text-sm text-vfb-text-primary">
                      {new Date(doctor.nextAvailable).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {doctor.isAcceptingNewPatients ? (
                      <button className="w-full px-4 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors">
                        <Calendar className="h-4 w-4 mr-2 inline" />
                        Agendar Consulta
                      </button>
                    ) : (
                      <button className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
                        <Clock className="h-4 w-4 mr-2 inline" />
                        Lista de Espera
                      </button>
                    )}
                    
                    <button className="w-full px-4 py-2 border border-vfb-gray-300 text-vfb-text-primary rounded-lg hover:bg-vfb-gray-50 transition-colors">
                      <Phone className="h-4 w-4 mr-2 inline" />
                      Ligar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Details */}
            <div className="mt-4 pt-4 border-t border-vfb-gray-200">
              <button
                onClick={() => setExpandedDoctor(expandedDoctor === doctor.id ? null : doctor.id)}
                className="flex items-center text-vfb-blue-600 hover:text-vfb-blue-700 font-medium"
              >
                {expandedDoctor === doctor.id ? (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Menos Detalhes
                  </>
                ) : (
                  <>
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Mais Detalhes
                  </>
                )}
              </button>

              {expandedDoctor === doctor.id && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-vfb-text-primary mb-2">Sobre o Médico</h4>
                    <p className="text-sm text-vfb-text-secondary">{doctor.about}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-vfb-text-primary mb-2">Formação</h4>
                      <p className="text-sm text-vfb-text-secondary mb-1">{doctor.education}</p>
                      <p className="text-sm text-vfb-text-secondary">{doctor.experience} de experiência</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-vfb-text-primary mb-2">Certificações</h4>
                      <ul className="text-sm text-vfb-text-secondary space-y-1">
                        {doctor.credentials.map((credential, index) => (
                          <li key={index} className="flex items-center">
                            <Award className="h-3 w-3 mr-2 text-vfb-blue-500" />
                            {credential}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-vfb-text-primary mb-2">Hospitais Afiliados</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.hospitalAffiliations.map((hospital, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-vfb-blue-100 text-vfb-blue-800 text-sm rounded-full"
                        >
                          {hospital}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedDoctors.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-12 text-center">
          <Stethoscope className="h-16 w-16 text-vfb-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-vfb-text-primary mb-2">
            Nenhum médico encontrado
          </h3>
          <p className="text-vfb-text-secondary mb-6">
            Tente ajustar seus filtros de busca para encontrar mais opções.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedSpecialty('')
              setSelectedInsurance('')
            }}
            className="px-6 py-2 bg-vfb-blue-600 text-white rounded-lg hover:bg-vfb-blue-700 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm border border-vfb-gray-200 p-6">
        <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">Links Úteis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="#"
            className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors"
          >
            <Navigation className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <div>
              <p className="font-medium text-vfb-text-primary">Direções</p>
              <p className="text-sm text-vfb-text-secondary">Como chegar ao consultório</p>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors"
          >
            <ThumbsUp className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <div>
              <p className="font-medium text-vfb-text-primary">Avaliações</p>
              <p className="text-sm text-vfb-text-secondary">Leia avaliações de pacientes</p>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center p-4 border border-vfb-gray-200 rounded-lg hover:bg-vfb-gray-50 transition-colors"
          >
            <ExternalLink className="h-5 w-5 text-vfb-blue-600 mr-3" />
            <div>
              <p className="font-medium text-vfb-text-primary">Site do Médico</p>
              <p className="text-sm text-vfb-text-secondary">Visite o site oficial</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
} 