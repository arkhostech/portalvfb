# 🏥 VFB Health Portal - MVP

Portal escalável para agentes de seguro saúde nos EUA, construído com React + TypeScript + Tailwind CSS.

## 🚀 Stack Tecnológica

### Core (Confirmado)
- **Vite** - Build tool ultra-rápido
- **React 18** - Framework UI com JSX Transform
- **TypeScript** - Type safety para dados sensíveis
- **Tailwind CSS** - Design system consistente
- **React Router DOM** - Navegação SPA

### Backend Completo (Supabase)
- **PostgreSQL** - Database hospedado com RLS
- **Supabase Auth** - OAuth + session management nativo
- **Auto-generated API** - REST API baseada no schema
- **Real-time** - Subscriptions nativas para updates
- **Edge Functions** - Serverless functions
- **Storage** - Para documentos/arquivos

### Frontend Essencial
- **React Hook Form + Zod** - Formulários robustos com validação
- **Radix UI** - Componentes acessíveis enterprise
- **Lucide React** - Ícones consistentes
- **React Hot Toast** - Notificações elegantes

## 📁 Arquitetura Supabase + React

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── forms/          # Componentes de formulário
│   ├── charts/         # Gráficos e visualizações
│   └── Layout.tsx      # Layout principal
├── pages/              # Páginas/Views principais
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Login.tsx       # Autenticação
│   ├── Clients.tsx     # Gestão de clientes
│   ├── Policies.tsx    # Gestão de apólices
│   ├── Claims.tsx      # Gestão de sinistros
│   └── Profile.tsx     # Perfil do agente
├── hooks/              # Custom hooks Supabase
│   ├── useClients.ts   # Real-time clients com RLS
│   ├── usePolicies.ts  # Real-time policies com RLS
│   └── useClaims.ts    # Real-time claims com RLS
├── contexts/           # React Context
│   └── AuthContext.tsx # Supabase Auth Provider
├── lib/                # Configurações e utilitários
│   ├── supabase.ts     # Cliente Supabase + helpers
│   ├── database.types.ts # Types auto-geradas
│   ├── utils.ts        # Funções utilitárias
│   └── validations.ts  # Schemas Zod
├── types/              # Definições TypeScript
│   └── index.ts        # Tipos customizados
└── assets/             # Recursos estáticos

supabase/
├── migrations/         # Database migrations
├── functions/          # Edge Functions
└── README.md          # Setup RLS + SQL
```

## 🔧 Setup Inicial Completo

### 1. Instalação das Dependências

```bash
# Instalar dependências
npm install

# Ou usar yarn
yarn install
```

### 2. Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia dev server (porta 3000)

# Build & Produção
npm run build        # Build para produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # Verificar ESLint
npm run lint:fix     # Corrigir ESLint automaticamente
npm run format       # Formatar com Prettier
npm run type-check   # Verificar tipos TypeScript

# Testes
npm run test         # Executar testes
npm run test:ui      # Interface de testes
npm run test:coverage # Cobertura de testes
```

### 3. Configurações Incluídas

- ✅ **TypeScript** - Configuração strict + path mapping
- ✅ **ESLint** - Regras React + TypeScript otimizadas
- ✅ **Prettier** - Formatação consistente + Tailwind plugin
- ✅ **Tailwind CSS** - Design system enterprise + cores médicas
- ✅ **Vite** - Build otimizado + code splitting
- ✅ **Path Aliases** - Imports limpos (@/components, @/hooks, etc.)

## 🎨 VFB Design System

### Paleta de Cores Empresarial VFB
- **Primary Navy**: `#04345B` - Azul navy principal (confiança)
- **Accent Cyan**: `#1CABE0` - Azul claro (modernidade)
- **Primary Red**: `#DD1D2A` - Vermelho principal (urgência)
- **Warm Background**: `#FCF9F6` - Off-white acolhedor
- **Text Dark**: `#141314` - Quase preto (legibilidade)
- **Success Green**: `#10B981` - Aprovações/Sucessos
- **Warning Orange**: `#F59E0B` - Pendências/Alertas
- **Enterprise Grays**: Escalas neutras profissionais

### Documentação Completa
- 📖 **[Sistema de Cores VFB](docs/VFB-COLOR-SYSTEM.md)** - Guia completo
- 🎨 **[Exemplos Práticos](docs/VFB-EXAMPLES.md)** - Implementação imediata
- ♿ **WCAG AA Compliance** - Contraste verificado
- 🎯 **Brand Consistency** - Alinhado com identidade VFB

### Componentes Base
- Formulários com validação robusta
- Tabelas com paginação e filtros
- Modais acessíveis
- Cards com hover effects
- Loading states consistentes

## 🔐 Considerações de Segurança

### Dados Sensíveis (HIPAA Ready)
- Mascaramento de SSN (`***-**-1234`)
- Validação client-side rigorosa
- Estrutura preparada para criptografia
- Headers de segurança configurados

### Autenticação
- Store persistente com Zustand
- Mock inicial (desenvolvimento)
- Estrutura pronta para JWT/OAuth

## 📊 Performance

### Otimizações Incluídas
- Code splitting automático
- Bundle analysis no build
- Lazy loading de componentes
- Image optimization ready
- CSS purging (produção)

### Métricas Alvo
- **Lighthouse**: 90+ Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## ♿ Acessibilidade

### WCAG 2.1 AA Compliance
- Focus management
- Screen reader support
- Keyboard navigation
- Color contrast compliance
- Semantic HTML structure

## 🗺️ Roadmap de Implementação

### Fase 1: Core MVP (Semana 1-2)
1. ✅ Setup e configuração
2. 🔄 Sistema de autenticação
3. 🔄 Dashboard básico
4. 🔄 Gestão de clientes (CRUD)

### Fase 2: Funcionalidades Principais (Semana 3-4)
5. ⏳ Gestão de apólices
6. ⏳ Sistema de sinistros
7. ⏳ Relatórios básicos
8. ⏳ Perfil do agente

### Fase 3: Otimizações (Semana 5-6)
9. ⏳ Performance tuning
10. ⏳ Testes automatizados
11. ⏳ PWA features
12. ⏳ Deploy pipeline

### Fase 4: Escalabilidade (Futuro)
13. ⏳ Multi-tenancy
14. ⏳ Advanced analytics
15. ⏳ Mobile app
16. ⏳ API integrations

## 🚀 Próximos Passos

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar desenvolvimento
npm run dev

# 3. Abrir http://localhost:3000
```

### Setup Supabase (Primeiro)
```bash
# 1. Criar projeto no Supabase
# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# 3. Executar SQL do supabase/README.md
# 4. Configurar RLS policies

# Depois:
npm install && npm run dev
```

### Credenciais de Desenvolvimento
- **Email**: `agent@healthportal.com`
- **Senha**: Configurar no Supabase Auth

## 📞 Suporte

Para dúvidas sobre a arquitetura ou implementação, consulte:
- **Types**: `src/types/index.ts` - Definições completas
- **Utils**: `src/lib/utils.ts` - Funções utilitárias
- **Components**: `src/components/` - Componentes reutilizáveis

---

**Versão**: 0.1.0 MVP  
**Status**: 🚧 Em desenvolvimento  
**Última atualização**: Dezembro 2024 