# 🏥 VFB Health Portal - Supabase Setup

## 🔐 Row Level Security (RLS) Patterns

### Configuração Essencial para Dados de Saúde

O **RLS é CRÍTICO** para portais de seguro saúde - garante que agentes só vejam dados de seus próprios clientes.

## 📋 Database Schema

### 1. Agents Table
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role agent_role DEFAULT 'agent',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  commission_rate DECIMAL(5,4) DEFAULT 0.0500
);

-- RLS: Agentes só podem ver seu próprio perfil
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view own profile" ON agents
  FOR ALL USING (auth.uid() = id);
```

### 2. Clients Table
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  ssn_encrypted TEXT NOT NULL, -- Usar encrypt() do pgcrypto
  address_street TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_state TEXT NOT NULL,
  address_zip TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  emergency_contact_relationship TEXT NOT NULL,
  status client_status DEFAULT 'pending'
);

-- RLS: Agentes só veem clientes que eles gerenciam
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can manage own clients" ON clients
  FOR ALL USING (agent_id = auth.uid());
```

### 3. Policies Table
```sql
CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  policy_number TEXT UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('individual', 'family', 'group')),
  insurance_type TEXT NOT NULL CHECK (insurance_type IN ('medical', 'dental', 'vision', 'mental_health')),
  status policy_status DEFAULT 'pending',
  premium DECIMAL(10,2) NOT NULL,
  deductible DECIMAL(10,2) NOT NULL,
  copay DECIMAL(10,2) NOT NULL,
  coinsurance DECIMAL(5,2) NOT NULL,
  max_out_of_pocket DECIMAL(10,2) NOT NULL,
  effective_date DATE NOT NULL,
  expiration_date DATE NOT NULL
);

-- RLS: Agentes só veem apólices de seus clientes
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can manage policies for own clients" ON policies
  FOR ALL USING (agent_id = auth.uid());
```

### 4. Claims Table
```sql
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  claim_number TEXT UNIQUE NOT NULL,
  policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL,
  provider_npi TEXT NOT NULL,
  service_date DATE NOT NULL,
  submission_date DATE DEFAULT CURRENT_DATE,
  status claim_status DEFAULT 'submitted',
  amount DECIMAL(10,2) NOT NULL,
  approved_amount DECIMAL(10,2),
  paid_amount DECIMAL(10,2),
  diagnosis_codes TEXT[] NOT NULL,
  procedure_codes JSONB NOT NULL,
  notes TEXT
);

-- RLS: Agentes só veem sinistros de seus clientes
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can manage claims for own clients" ON claims
  FOR ALL USING (agent_id = auth.uid());
```

### 5. Documents Table (Storage)
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('id', 'medical_record', 'claim_form', 'policy_doc', 'other'))
);

-- RLS: Agentes só veem documentos de seus clientes
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can manage documents for own clients" ON documents
  FOR ALL USING (agent_id = auth.uid());
```

## 🔧 Enums & Custom Types

```sql
-- Create custom types
CREATE TYPE agent_role AS ENUM ('agent', 'manager', 'admin');
CREATE TYPE client_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE policy_status AS ENUM ('active', 'pending', 'cancelled', 'expired');
CREATE TYPE claim_status AS ENUM ('submitted', 'processing', 'approved', 'denied', 'paid');
```

## 🛡️ Security Functions

### Encryption para SSN
```sql
-- Enable pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function para criptografar SSN
CREATE OR REPLACE FUNCTION encrypt_ssn(ssn_plain TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(encrypt(ssn_plain::bytea, 'health_portal_secret', 'aes'), 'base64');
END;
$$ LANGUAGE plpgsql;

-- Function para descriptografar SSN (uso limitado)
CREATE OR REPLACE FUNCTION decrypt_ssn(ssn_encrypted TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN convert_from(decrypt(decode(ssn_encrypted, 'base64'), 'health_portal_secret', 'aes'), 'UTF8');
END;
$$ LANGUAGE plpgsql;
```

## 📊 Dashboard Views

### Agent Statistics View
```sql
CREATE VIEW agent_stats AS
SELECT 
  a.id as agent_id,
  a.first_name,
  a.last_name,
  COUNT(DISTINCT c.id) as total_clients,
  COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) as active_clients,
  COUNT(DISTINCT p.id) as total_policies,
  COUNT(DISTINCT CASE WHEN p.status = 'active' THEN p.id END) as active_policies,
  COUNT(DISTINCT CASE WHEN cl.status = 'pending' THEN cl.id END) as pending_claims,
  COALESCE(SUM(CASE WHEN p.status = 'active' THEN p.premium * a.commission_rate END), 0) as monthly_commission
FROM agents a
LEFT JOIN clients c ON c.agent_id = a.id
LEFT JOIN policies p ON p.agent_id = a.id
LEFT JOIN claims cl ON cl.agent_id = a.id
GROUP BY a.id, a.first_name, a.last_name;

-- RLS para view
ALTER VIEW agent_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view own stats" ON agent_stats
  FOR SELECT USING (agent_id = auth.uid());
```

## 🚀 Setup Inicial

### 1. Variáveis de Ambiente
```bash
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Configurar Auth
```sql
-- No Supabase Dashboard > Authentication > Settings
-- Enable email confirmations
-- Configure OAuth providers (Google, etc.)
-- Set site URL to your domain
```

### 3. Storage Buckets
```sql
-- Criar bucket para documentos
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- RLS para storage
CREATE POLICY "Agents can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Agents can view own documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 🔄 Real-time Subscriptions

### Configurar Realtime
```javascript
// Frontend - exemplo de subscription
const subscription = supabase
  .channel('clients_changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'clients',
    filter: `agent_id=eq.${userId}`
  }, (payload) => {
    // Handle real-time updates
  })
  .subscribe()
```

## 🧪 Sample Data (Development)

```sql
-- Inserir agente de teste
INSERT INTO agents (email, first_name, last_name, license_number, phone)
VALUES ('agent@healthportal.com', 'John', 'Smith', 'HL12345', '+1-555-123-4567');

-- Cliente de exemplo (após login)
INSERT INTO clients (agent_id, first_name, last_name, email, phone, date_of_birth, ssn_encrypted, address_street, address_city, address_state, address_zip, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship)
VALUES (auth.uid(), 'Maria', 'Silva', 'maria@email.com', '555-987-6543', '1985-06-15', encrypt_ssn('123-45-6789'), '123 Main St', 'New York', 'NY', '10001', 'João Silva', '555-111-2222', 'Spouse');
```

## 🛠️ Manutenção

### Backups Automáticos
- Supabase faz backup automático
- Configure Point-in-Time Recovery
- Teste restore procedures

### Monitoramento
- Track RLS policy performance
- Monitor database connections
- Set up alerts for errors

### Compliance HIPAA
- Enable audit logs
- Configure data retention
- Document access patterns
- Regular security reviews

---

**⚠️ IMPORTANTE**: Sempre teste as policies RLS em ambiente de desenvolvimento antes de aplicar em produção! 