export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          first_name: string
          last_name: string
          license_number: string
          phone: string | null
          avatar_url: string | null
          role: 'agent' | 'manager' | 'admin'
          status: 'active' | 'inactive' | 'suspended'
          commission_rate: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          email: string
          first_name: string
          last_name: string
          license_number: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'agent' | 'manager' | 'admin'
          status?: 'active' | 'inactive' | 'suspended'
          commission_rate?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          first_name?: string
          last_name?: string
          license_number?: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'agent' | 'manager' | 'admin'
          status?: 'active' | 'inactive' | 'suspended'
          commission_rate?: number
        }
      }
      clients: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          agent_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string
          ssn_encrypted: string
          address_street: string
          address_city: string
          address_state: string
          address_zip: string
          emergency_contact_name: string
          emergency_contact_phone: string
          emergency_contact_relationship: string
          status: 'active' | 'inactive' | 'pending'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          agent_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string
          ssn_encrypted: string
          address_street: string
          address_city: string
          address_state: string
          address_zip: string
          emergency_contact_name: string
          emergency_contact_phone: string
          emergency_contact_relationship: string
          status?: 'active' | 'inactive' | 'pending'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          agent_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          date_of_birth?: string
          ssn_encrypted?: string
          address_street?: string
          address_city?: string
          address_state?: string
          address_zip?: string
          emergency_contact_name?: string
          emergency_contact_phone?: string
          emergency_contact_relationship?: string
          status?: 'active' | 'inactive' | 'pending'
        }
      }
      policies: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          policy_number: string
          client_id: string
          agent_id: string
          plan_type: 'individual' | 'family' | 'group'
          insurance_type: 'medical' | 'dental' | 'vision' | 'mental_health'
          status: 'active' | 'pending' | 'cancelled' | 'expired'
          premium: number
          deductible: number
          copay: number
          coinsurance: number
          max_out_of_pocket: number
          effective_date: string
          expiration_date: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          policy_number: string
          client_id: string
          agent_id: string
          plan_type: 'individual' | 'family' | 'group'
          insurance_type: 'medical' | 'dental' | 'vision' | 'mental_health'
          status?: 'active' | 'pending' | 'cancelled' | 'expired'
          premium: number
          deductible: number
          copay: number
          coinsurance: number
          max_out_of_pocket: number
          effective_date: string
          expiration_date: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          policy_number?: string
          client_id?: string
          agent_id?: string
          plan_type?: 'individual' | 'family' | 'group'
          insurance_type?: 'medical' | 'dental' | 'vision' | 'mental_health'
          status?: 'active' | 'pending' | 'cancelled' | 'expired'
          premium?: number
          deductible?: number
          copay?: number
          coinsurance?: number
          max_out_of_pocket?: number
          effective_date?: string
          expiration_date?: string
        }
      }
      claims: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          claim_number: string
          policy_id: string
          client_id: string
          agent_id: string
          provider_name: string
          provider_npi: string
          service_date: string
          submission_date: string
          status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid'
          amount: number
          approved_amount: number | null
          paid_amount: number | null
          diagnosis_codes: string[]
          procedure_codes: Json
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          claim_number: string
          policy_id: string
          client_id: string
          agent_id: string
          provider_name: string
          provider_npi: string
          service_date: string
          submission_date: string
          status?: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid'
          amount: number
          approved_amount?: number | null
          paid_amount?: number | null
          diagnosis_codes: string[]
          procedure_codes: Json
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          claim_number?: string
          policy_id?: string
          client_id?: string
          agent_id?: string
          provider_name?: string
          provider_npi?: string
          service_date?: string
          submission_date?: string
          status?: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid'
          amount?: number
          approved_amount?: number | null
          paid_amount?: number | null
          diagnosis_codes?: string[]
          procedure_codes?: Json
          notes?: string | null
        }
      }
      documents: {
        Row: {
          id: string
          created_at: string
          client_id: string | null
          policy_id: string | null
          claim_id: string | null
          agent_id: string
          file_name: string
          file_type: string
          file_size: number
          storage_path: string
          document_type: 'id' | 'medical_record' | 'claim_form' | 'policy_doc' | 'other'
        }
        Insert: {
          id?: string
          created_at?: string
          client_id?: string | null
          policy_id?: string | null
          claim_id?: string | null
          agent_id: string
          file_name: string
          file_type: string
          file_size: number
          storage_path: string
          document_type: 'id' | 'medical_record' | 'claim_form' | 'policy_doc' | 'other'
        }
        Update: {
          id?: string
          created_at?: string
          client_id?: string | null
          policy_id?: string | null
          claim_id?: string | null
          agent_id?: string
          file_name?: string
          file_type?: string
          file_size?: number
          storage_path?: string
          document_type?: 'id' | 'medical_record' | 'claim_form' | 'policy_doc' | 'other'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      agent_role: 'agent' | 'manager' | 'admin'
      client_status: 'active' | 'inactive' | 'pending'
      policy_status: 'active' | 'pending' | 'cancelled' | 'expired'
      claim_status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 