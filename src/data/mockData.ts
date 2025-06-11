// Mock Data for VFB Health Insurance Portal

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  ssn: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  totalPolicies: number
  monthlyPremium: number
  avatar?: string
}

export interface Policy {
  id: string
  clientId: string
  policyNumber: string
  type: 'health' | 'dental' | 'vision' | 'life'
  provider: string
  plan: string
  status: 'active' | 'pending' | 'cancelled' | 'expired'
  startDate: string
  endDate: string
  monthlyPremium: number
  deductible: number
  coverage: number
  beneficiaries: string[]
}

export interface Quote {
  id: string
  clientId: string
  type: 'health' | 'dental' | 'vision' | 'life'
  provider: string
  plan: string
  monthlyPremium: number
  annualPremium: number
  deductible: number
  coverage: number
  status: 'pending' | 'sent' | 'accepted' | 'declined' | 'expired'
  createdDate: string
  sentDate?: string
  expiryDate: string
  notes?: string
}

export interface Claim {
  id: string
  clientId: string
  policyId: string
  claimNumber: string
  type: 'medical' | 'dental' | 'vision' | 'prescription'
  provider: string
  description: string
  amount: number
  approvedAmount?: number
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid'
  submittedDate: string
  processedDate?: string
  notes?: string
}

export interface Commission {
  id: string
  clientId: string
  policyId: string
  month: string
  amount: number
  rate: number
  status: 'pending' | 'paid' | 'disputed'
  paidDate?: string
  type: 'new_business' | 'renewal' | 'bonus'
}

export interface Document {
  id: string
  clientId: string
  name: string
  type: 'application' | 'policy' | 'claim' | 'medical_record' | 'id_copy' | 'other'
  size: string
  uploadedDate: string
  url?: string
}

export interface Metrics {
  totalClients: number
  totalPolicies: number
  activeQuotes: number
  monthlyCommission: number
  clientGrowth: number
  conversionRate: number
}

// Mock Data Generation
export const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-03-15',
    address: {
      street: '123 Main Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701'
    },
    ssn: '***-**-4567',
    status: 'active',
    joinDate: '2023-01-15',
    totalPolicies: 3,
    monthlyPremium: 850,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8fd?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1978-08-22',
    address: {
      street: '456 Oak Avenue',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201'
    },
    ssn: '***-**-5678',
    status: 'active',
    joinDate: '2022-11-03',
    totalPolicies: 2,
    monthlyPremium: 650,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1990-12-05',
    address: {
      street: '789 Pine Road',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001'
    },
    ssn: '***-**-6789',
    status: 'active',
    joinDate: '2023-04-20',
    totalPolicies: 4,
    monthlyPremium: 1200,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Williams',
    email: 'david.williams@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1982-06-18',
    address: {
      street: '321 Elm Street',
      city: 'San Antonio',
      state: 'TX',
      zipCode: '78201'
    },
    ssn: '***-**-7890',
    status: 'pending',
    joinDate: '2024-01-10',
    totalPolicies: 1,
    monthlyPremium: 450,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    firstName: 'Jessica',
    lastName: 'Brown',
    email: 'jessica.brown@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1987-09-30',
    address: {
      street: '654 Maple Drive',
      city: 'Fort Worth',
      state: 'TX',
      zipCode: '76101'
    },
    ssn: '***-**-8901',
    status: 'active',
    joinDate: '2023-07-12',
    totalPolicies: 2,
    monthlyPremium: 720,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '6',
    firstName: 'Robert',
    lastName: 'Davis',
    email: 'robert.davis@email.com',
    phone: '(555) 678-9012',
    dateOfBirth: '1975-04-14',
    address: {
      street: '987 Cedar Lane',
      city: 'El Paso',
      state: 'TX',
      zipCode: '79901'
    },
    ssn: '***-**-9012',
    status: 'active',
    joinDate: '2022-08-25',
    totalPolicies: 3,
    monthlyPremium: 980,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
]

export const mockPolicies: Policy[] = [
  {
    id: 'p1',
    clientId: '1',
    policyNumber: 'VFB-HLT-001',
    type: 'health',
    provider: 'Blue Cross Blue Shield',
    plan: 'Premium Gold',
    status: 'active',
    startDate: '2023-02-01',
    endDate: '2024-02-01',
    monthlyPremium: 450,
    deductible: 2500,
    coverage: 1000000,
    beneficiaries: ['Spouse', 'Child 1']
  },
  {
    id: 'p2',
    clientId: '1',
    policyNumber: 'VFB-DNT-001',
    type: 'dental',
    provider: 'Delta Dental',
    plan: 'Family Plus',
    status: 'active',
    startDate: '2023-02-01',
    endDate: '2024-02-01',
    monthlyPremium: 150,
    deductible: 100,
    coverage: 50000,
    beneficiaries: ['Self', 'Spouse', 'Child 1']
  },
  {
    id: 'p3',
    clientId: '2',
    policyNumber: 'VFB-HLT-002',
    type: 'health',
    provider: 'Aetna',
    plan: 'Standard Silver',
    status: 'active',
    startDate: '2022-12-01',
    endDate: '2023-12-01',
    monthlyPremium: 380,
    deductible: 3000,
    coverage: 750000,
    beneficiaries: ['Self']
  },
  {
    id: 'p4',
    clientId: '3',
    policyNumber: 'VFB-HLT-003',
    type: 'health',
    provider: 'United Healthcare',
    plan: 'Platinum Plus',
    status: 'active',
    startDate: '2023-05-01',
    endDate: '2024-05-01',
    monthlyPremium: 650,
    deductible: 1500,
    coverage: 2000000,
    beneficiaries: ['Self', 'Spouse', 'Child 1', 'Child 2']
  }
]

export const mockQuotes: Quote[] = [
  {
    id: 'q1',
    clientId: '4',
    type: 'health',
    provider: 'Humana',
    plan: 'Essential Bronze',
    monthlyPremium: 320,
    annualPremium: 3840,
    deductible: 5000,
    coverage: 500000,
    status: 'sent',
    createdDate: '2024-01-15',
    sentDate: '2024-01-16',
    expiryDate: '2024-02-15',
    notes: 'Competitive pricing for young professional'
  },
  {
    id: 'q2',
    clientId: '5',
    type: 'dental',
    provider: 'MetLife',
    plan: 'Basic Care',
    monthlyPremium: 85,
    annualPremium: 1020,
    deductible: 50,
    coverage: 25000,
    status: 'pending',
    createdDate: '2024-01-20',
    expiryDate: '2024-02-20',
    notes: 'Waiting for medical history review'
  },
  {
    id: 'q3',
    clientId: '6',
    type: 'life',
    provider: 'New York Life',
    plan: 'Term Life 20',
    monthlyPremium: 180,
    annualPremium: 2160,
    deductible: 0,
    coverage: 500000,
    status: 'accepted',
    createdDate: '2024-01-10',
    sentDate: '2024-01-11',
    expiryDate: '2024-02-10',
    notes: 'Client accepted, processing enrollment'
  }
]

export const mockClaims: Claim[] = [
  {
    id: 'c1',
    clientId: '1',
    policyId: 'p1',
    claimNumber: 'CLM-2024-001',
    type: 'medical',
    provider: 'Austin Medical Center',
    description: 'Emergency room visit for chest pain',
    amount: 3500,
    approvedAmount: 2800,
    status: 'approved',
    submittedDate: '2024-01-05',
    processedDate: '2024-01-12',
    notes: 'Pre-authorization obtained, covered under emergency care'
  },
  {
    id: 'c2',
    clientId: '2',
    policyId: 'p3',
    claimNumber: 'CLM-2024-002',
    type: 'prescription',
    provider: 'CVS Pharmacy',
    description: 'Monthly diabetes medication',
    amount: 450,
    approvedAmount: 360,
    status: 'paid',
    submittedDate: '2024-01-08',
    processedDate: '2024-01-10',
    notes: 'Generic substitution applied'
  },
  {
    id: 'c3',
    clientId: '3',
    policyId: 'p4',
    claimNumber: 'CLM-2024-003',
    type: 'dental',
    provider: 'Smile Dental Group',
    description: 'Root canal procedure',
    amount: 1200,
    status: 'processing',
    submittedDate: '2024-01-18',
    notes: 'Waiting for pre-authorization approval'
  }
]

export const mockCommissions: Commission[] = [
  {
    id: 'cm1',
    clientId: '1',
    policyId: 'p1',
    month: '2024-01',
    amount: 225,
    rate: 0.05,
    status: 'paid',
    paidDate: '2024-02-01',
    type: 'renewal'
  },
  {
    id: 'cm2',
    clientId: '2',
    policyId: 'p3',
    month: '2024-01',
    amount: 190,
    rate: 0.05,
    status: 'paid',
    paidDate: '2024-02-01',
    type: 'renewal'
  },
  {
    id: 'cm3',
    clientId: '3',
    policyId: 'p4',
    month: '2024-01',
    amount: 975,
    rate: 0.15,
    status: 'pending',
    type: 'new_business'
  }
]

export const mockDocuments: Document[] = [
  {
    id: 'd1',
    clientId: '1',
    name: 'Health Insurance Application.pdf',
    type: 'application',
    size: '2.3 MB',
    uploadedDate: '2023-01-15'
  },
  {
    id: 'd2',
    clientId: '1',
    name: 'Medical Records - 2023.pdf',
    type: 'medical_record',
    size: '1.8 MB',
    uploadedDate: '2023-01-20'
  },
  {
    id: 'd3',
    clientId: '2',
    name: 'Driver License Copy.jpg',
    type: 'id_copy',
    size: '0.5 MB',
    uploadedDate: '2022-11-03'
  },
  {
    id: 'd4',
    clientId: '3',
    name: 'Policy Document - Premium Gold.pdf',
    type: 'policy',
    size: '3.2 MB',
    uploadedDate: '2023-05-01'
  }
]

export const mockMetrics: Metrics = {
  totalClients: 156,
  totalPolicies: 89,
  activeQuotes: 24,
  monthlyCommission: 18450,
  clientGrowth: 12.5,
  conversionRate: 68.5
}

// Helper functions
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id)
}

export const getPolicyById = (id: string): Policy | undefined => {
  return mockPolicies.find(policy => policy.id === id)
}

export const getPoliciesByClient = (clientId: string): Policy[] => {
  return mockPolicies.filter(policy => policy.clientId === clientId)
}

export const getQuotesByClient = (clientId: string): Quote[] => {
  return mockQuotes.filter(quote => quote.clientId === clientId)
}

export const getClaimsByClient = (clientId: string): Claim[] => {
  return mockClaims.filter(claim => claim.clientId === clientId)
}

export const getDocumentsByClient = (clientId: string): Document[] => {
  return mockDocuments.filter(doc => doc.clientId === clientId)
}

export const getCommissionsByClient = (clientId: string): Commission[] => {
  return mockCommissions.filter(commission => commission.clientId === clientId)
}

export const getQuoteById = (id: string): Quote | undefined => {
  return mockQuotes.find(quote => quote.id === id)
}

export const getClaimById = (id: string): Claim | undefined => {
  return mockClaims.find(claim => claim.id === id)
} 