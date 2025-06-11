import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Use mock values for development when env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mockproject.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock_anon_key_for_development'

// Create Supabase client with TypeScript support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Helper types for better DX
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> = 
  Database['public']['Enums'][T]

// Common table types
export type Agent = Tables<'agents'>
export type Client = Tables<'clients'>
export type Policy = Tables<'policies'>
export type Claim = Tables<'claims'>
export type Document = Tables<'documents'>

// Auth helpers
export const getCurrentUser = () => supabase.auth.getUser()
export const getCurrentSession = () => supabase.auth.getSession()

// RLS context helpers
export const getAgentId = async () => {
  const { data: { user } } = await getCurrentUser()
  return user?.id || null
}

// Database helpers with RLS
export const withRLS = async <T>(
  query: Promise<{ data: T | null; error: any }>
): Promise<T | null> => {
  const { data, error } = await query
  if (error) {
    console.error('Database error:', error)
    throw error
  }
  return data
} 