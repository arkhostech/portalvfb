import { useState, useEffect } from 'react'
import { supabase, type Client, getAgentId } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    fetchClients()
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('clients_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clients',
          filter: `agent_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Client change received:', payload)
          
          if (payload.eventType === 'INSERT') {
            setClients(prev => [...prev, payload.new as Client])
          } else if (payload.eventType === 'UPDATE') {
            setClients(prev =>
              prev.map(client =>
                client.id === payload.new.id ? (payload.new as Client) : client
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setClients(prev =>
              prev.filter(client => client.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const agentId = await getAgentId()
      
      if (!agentId) {
        throw new Error('No agent ID found')
      }

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setClients(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching clients')
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at' | 'agent_id'>) => {
    try {
      const agentId = await getAgentId()
      if (!agentId) throw new Error('No agent ID found')

      const { data, error } = await supabase
        .from('clients')
        .insert([{ ...clientData, agent_id: agentId }])
        .select()
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (err) {
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'Error creating client' 
      }
    }
  }

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (err) {
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'Error updating client' 
      }
    }
  }

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { error: null }
    } catch (err) {
      return { 
        error: err instanceof Error ? err.message : 'Error deleting client' 
      }
    }
  }

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id) || null
  }

  const searchClients = (query: string) => {
    if (!query.trim()) return clients
    
    const searchTerm = query.toLowerCase()
    return clients.filter(client =>
      client.first_name.toLowerCase().includes(searchTerm) ||
      client.last_name.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.phone.includes(searchTerm)
    )
  }

  const getClientsByStatus = (status: Client['status']) => {
    return clients.filter(client => client.status === status)
  }

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    getClientById,
    searchClients,
    getClientsByStatus,
    refetch: fetchClients,
  }
} 