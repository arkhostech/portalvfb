import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const signUpSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  licenseNumber: z.string().min(5, 'Número da licença é obrigatório'),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
})

// Client schemas
export const addressSchema = z.object({
  street: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'CEP inválido'),
})

export const emergencyContactSchema = z.object({
  name: z.string().min(2, 'Nome do contato é obrigatório'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Telefone inválido'),
  relationship: z.string().min(2, 'Relacionamento é obrigatório'),
})

export const clientSchema = z.object({
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Telefone inválido'),
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    return age >= 18 && age <= 120
  }, 'Cliente deve ter entre 18 e 120 anos'),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'SSN deve estar no formato 123-45-6789'),
  address: addressSchema,
  emergencyContact: emergencyContactSchema,
})

// Policy schemas
export const policySchema = z.object({
  clientId: z.string().uuid('Cliente é obrigatório'),
  planType: z.enum(['individual', 'family', 'group']),
  insuranceType: z.enum(['medical', 'dental', 'vision', 'mental_health']),
  premium: z.number().min(0, 'Prêmio deve ser positivo'),
  deductible: z.number().min(0, 'Franquia deve ser positiva'),
  copay: z.number().min(0, 'Copagamento deve ser positivo'),
  coinsurance: z.number().min(0).max(100, 'Cosseguro deve estar entre 0 e 100'),
  maxOutOfPocket: z.number().min(0, 'Limite de desembolso deve ser positivo'),
  effectiveDate: z.string().refine((date) => {
    return new Date(date) >= new Date()
  }, 'Data de vigência deve ser futura'),
  expirationDate: z.string(),
}).refine((data) => {
  return new Date(data.expirationDate) > new Date(data.effectiveDate)
}, {
  message: 'Data de expiração deve ser posterior à data de vigência',
  path: ['expirationDate'],
})

// Claim schemas
export const claimSchema = z.object({
  policyId: z.string().uuid('Apólice é obrigatória'),
  providerName: z.string().min(2, 'Nome do provedor é obrigatório'),
  providerNpi: z.string().regex(/^\d{10}$/, 'NPI deve ter 10 dígitos'),
  serviceDate: z.string().refine((date) => {
    const serviceDate = new Date(date)
    const today = new Date()
    return serviceDate <= today
  }, 'Data do serviço não pode ser futura'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  diagnosisCodes: z.array(z.string()).min(1, 'Pelo menos um código de diagnóstico é obrigatório'),
  procedureCodes: z.array(z.object({
    code: z.string().min(3, 'Código do procedimento é obrigatório'),
    description: z.string().min(5, 'Descrição do procedimento é obrigatória'),
    amount: z.number().min(0, 'Valor deve ser positivo'),
    quantity: z.number().min(1, 'Quantidade deve ser pelo menos 1'),
  })).min(1, 'Pelo menos um procedimento é obrigatório'),
  notes: z.string().optional(),
})

// Document schemas
export const documentSchema = z.object({
  fileName: z.string().min(1, 'Nome do arquivo é obrigatório'),
  fileType: z.string().min(1, 'Tipo do arquivo é obrigatório'),
  fileSize: z.number().max(10 * 1024 * 1024, 'Arquivo deve ter no máximo 10MB'),
  documentType: z.enum(['id', 'medical_record', 'claim_form', 'policy_doc', 'other']),
})

// Search and filter schemas
export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  status: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  insuranceType: z.string().optional(),
  planType: z.string().optional(),
})

// Types inferred from schemas
export type LoginForm = z.infer<typeof loginSchema>
export type SignUpForm = z.infer<typeof signUpSchema>
export type ClientForm = z.infer<typeof clientSchema>
export type PolicyForm = z.infer<typeof policySchema>
export type ClaimForm = z.infer<typeof claimSchema>
export type DocumentForm = z.infer<typeof documentSchema>
export type SearchFilters = z.infer<typeof searchFiltersSchema> 