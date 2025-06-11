// Authentication types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'agent' | 'manager' | 'admin'
  licenseNumber: string
  phone?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Client types
export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  ssn: string // Encrypted in real implementation
  address: Address
  emergencyContact: EmergencyContact
  status: 'active' | 'inactive' | 'pending'
  agentId: string
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country?: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

// Policy types
export interface Policy {
  id: string
  policyNumber: string
  clientId: string
  planType: 'individual' | 'family' | 'group'
  insuranceType: 'medical' | 'dental' | 'vision' | 'mental_health'
  status: 'active' | 'pending' | 'cancelled' | 'expired'
  premium: number
  deductible: number
  copay: number
  coinsurance: number
  maxOutOfPocket: number
  effectiveDate: string
  expirationDate: string
  beneficiaries: Beneficiary[]
  coverage: Coverage[]
  agentId: string
  createdAt: string
  updatedAt: string
}

export interface Beneficiary {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: string
  ssn: string
  isPrimary: boolean
}

export interface Coverage {
  id: string
  type: string
  description: string
  covered: boolean
  limit?: number
  percentage?: number
}

// Claims types
export interface Claim {
  id: string
  claimNumber: string
  policyId: string
  clientId: string
  providerId: string
  serviceDate: string
  submissionDate: string
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid'
  amount: number
  approvedAmount?: number
  paidAmount?: number
  diagnosis: string[]
  procedures: Procedure[]
  notes?: string
  documents: Document[]
  agentId: string
  createdAt: string
  updatedAt: string
}

export interface Procedure {
  code: string
  description: string
  amount: number
  quantity: number
}

export interface Document {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  uploadDate: string
  url: string
}

// Provider types
export interface Provider {
  id: string
  name: string
  npi: string
  specialty: string
  address: Address
  phone: string
  email?: string
  fax?: string
  isInNetwork: boolean
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ClientForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  ssn: string
  address: Address
  emergencyContact: EmergencyContact
}

export interface PolicyForm {
  clientId: string
  planType: Policy['planType']
  insuranceType: Policy['insuranceType']
  premium: number
  deductible: number
  copay: number
  coinsurance: number
  maxOutOfPocket: number
  effectiveDate: string
  expirationDate: string
  beneficiaries: Omit<Beneficiary, 'id'>[]
}

// UI types
export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => any
}

export interface FilterOption {
  label: string
  value: string
}

export interface DashboardStats {
  totalClients: number
  activeClients: number
  totalPolicies: number
  activePolicies: number
  pendingClaims: number
  monthlyCommission: number
  conversionRate: number
  avgPolicyValue: number
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon: any
  badge?: number
  children?: NavItem[]
}

// Error types
export interface AppError {
  message: string
  code?: string
  details?: any
}

// Search types
export interface SearchFilters {
  query?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  [key: string]: any
} 